#!/usr/bin/env python3
"""Shared renderer for the WTF Agents guide PDFs.

One renderer, one markdown file per guide in guides/content/<slug>.md. Replaces
the twelve near-identical generate_guide_N.py scripts.

Usage:
    python3 guides/render.py                # render every guide
    python3 guides/render.py polsia claude  # render named slugs
    python3 guides/render.py --out /tmp/x   # render elsewhere (for diffing)

Content format: YAML front-matter, then a body in the line-oriented dialect
documented in guides/README.md. Inline reportlab markup (<b>, <link>, <font>)
is passed through verbatim.
"""
import argparse
import io
import os
import re
import sys

import yaml
import qrcode

import bundles as BUNDLE_CONFIG
from linkify import href, link_footer, linkify
from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (HRFlowable, Image as RLImage, KeepTogether,
                                PageBreak, Paragraph, SimpleDocTemplate, Spacer,
                                Table, TableStyle)

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
CONTENT_DIR = os.path.join(HERE, 'content')
DEFAULT_OUT = os.path.join(REPO, 'public', 'guides')

# ── palette ──────────────────────────────────────────────────────────────────
ORANGE = HexColor('#f97316')
DARK_BG = HexColor('#09090b')
ZINC_900 = HexColor('#18181b')
ZINC_800 = HexColor('#27272a')
ZINC_600 = HexColor('#52525b')
ZINC_400 = HexColor('#a1a1aa')
ZINC_300 = HexColor('#d4d4d8')
WHITE = HexColor('#ffffff')
GREEN = HexColor('#22c55e')
RED = HexColor('#ef4444')

W, H = A4

# ── optional style hooks ─────────────────────────────────────────────────────
# A style module (see style_pilot.py) may install builders here to change how
# particular flowables are constructed. While every entry is None the renderer
# behaves exactly as it always has — which is what keeps the 24 guides that are
# not part of the design pilot byte-for-byte identical.
HOOKS = {'stat': None, 'heading': None, 'table': None, 'glossary': None}

# Colour for in-text guide-title links. The pilot style overrides it with the
# accent; classic leaves it orange.
LINK_COLOR = ['#f97316']


def reset_hooks():
    for k in HOOKS:
        HOOKS[k] = None
    LINK_COLOR[0] = '#f97316'


# ── style registry ───────────────────────────────────────────────────────────
# Lifted verbatim from the generate_guide_N.py scripts, which declared these
# identically in all twelve files.
def _styles(cover_title_size=38):
    s = {
        'cover_title': ParagraphStyle('cover_title', fontSize=cover_title_size,
                                      leading=cover_title_size + 8, textColor=WHITE,
                                      fontName='Helvetica-Bold', alignment=TA_LEFT, spaceAfter=6),
        'cover_sub': ParagraphStyle('cover_sub', fontSize=16, leading=24, textColor=ORANGE,
                                    fontName='Helvetica-Bold', alignment=TA_LEFT, spaceAfter=6),
        'cover_desc': ParagraphStyle('cover_desc', fontSize=13, leading=21, textColor=ZINC_300,
                                     fontName='Helvetica', spaceAfter=6),
        'cover_meta': ParagraphStyle('cover_meta', fontSize=10, leading=15, textColor=ZINC_400,
                                     fontName='Helvetica', alignment=TA_LEFT),
        # keepWithNext stops a section heading being stranded at the foot of a
        # page. The rule that follows it carries the same flag (set in
        # parse_body) so the pair binds to the body text, not just to each other.
        'section_heading': ParagraphStyle('section_heading', fontSize=20, leading=26, textColor=ORANGE,
                                          fontName='Helvetica-Bold', spaceBefore=12, spaceAfter=4,
                                          keepWithNext=True),
        'subheading': ParagraphStyle('subheading', fontSize=13, leading=19, textColor=WHITE,
                                     fontName='Helvetica-Bold', spaceBefore=8, spaceAfter=3),
        'body': ParagraphStyle('body', fontSize=10.5, leading=17, textColor=ZINC_300,
                               fontName='Helvetica', spaceAfter=7, alignment=TA_JUSTIFY),
        'body_lead': ParagraphStyle('body_lead', fontSize=12, leading=19, textColor=ORANGE,
                                    fontName='Helvetica-Bold', spaceAfter=8),
        'bullet': ParagraphStyle('bullet', fontSize=10.5, leading=17, textColor=ZINC_300,
                                 fontName='Helvetica', spaceAfter=4, leftIndent=14),
        'small': ParagraphStyle('small', fontSize=9, leading=13, textColor=ZINC_600,
                                fontName='Helvetica', spaceAfter=3),
        'stat_num': ParagraphStyle('stat_num', fontSize=26, leading=30, textColor=ORANGE,
                                   fontName='Helvetica-Bold', alignment=TA_CENTER),
        'stat_lbl': ParagraphStyle('stat_lbl', fontSize=9, leading=13, textColor=ZINC_400,
                                   fontName='Helvetica', alignment=TA_CENTER, spaceAfter=8),
        'footer_s': ParagraphStyle('footer_s', fontSize=8.5, leading=12, textColor=ZINC_600,
                                   fontName='Helvetica', alignment=TA_CENTER),
        'link_style': ParagraphStyle('link_style', fontSize=10.5, leading=17, textColor=ORANGE,
                                     fontName='Helvetica', spaceAfter=4, leftIndent=14),
        'callout': ParagraphStyle('callout', fontSize=11, leading=17, textColor=WHITE,
                                  fontName='Helvetica-Bold', spaceAfter=6, leftIndent=10),
        'quote': ParagraphStyle('quote', fontSize=11, leading=17, textColor=ORANGE,
                                fontName='Helvetica-Oblique', spaceAfter=8, leftIndent=12,
                                rightIndent=12),
        'caveat': ParagraphStyle('caveat', fontSize=10, leading=16, textColor=ZINC_400,
                                 fontName='Helvetica-Oblique', spaceAfter=6, leftIndent=10,
                                 borderPadding=6),
        'gl': ParagraphStyle('gl', fontSize=10, leading=16, textColor=ZINC_300,
                             fontName='Helvetica', spaceAfter=5),
        'cap': ParagraphStyle('cap', fontSize=10.5, leading=17, textColor=ZINC_300,
                              fontName='Helvetica', spaceAfter=6),
        'cat': ParagraphStyle('cat', fontSize=10, leading=16, textColor=ZINC_300,
                              fontName='Helvetica', spaceAfter=5),
        'ev': ParagraphStyle('ev', fontSize=10, leading=16, textColor=ZINC_300,
                             fontName='Helvetica', spaceAfter=5),
        'task': ParagraphStyle('task', fontSize=10.5, leading=17, textColor=ZINC_300,
                               fontName='Helvetica', spaceAfter=6),
        'step': ParagraphStyle('step', fontSize=10.5, leading=17, textColor=ZINC_300,
                               fontName='Helvetica', spaceAfter=6),
        'step_num': ParagraphStyle('step_num', fontSize=32, leading=36, textColor=ORANGE,
                                   fontName='Helvetica-Bold', spaceAfter=2),
        'prod': ParagraphStyle('prod', fontSize=10.5, leading=17, textColor=ZINC_300,
                               fontName='Helvetica', spaceAfter=6),
        'acc': ParagraphStyle('acc', fontSize=10.5, leading=17, textColor=ZINC_300,
                              fontName='Helvetica', spaceAfter=6),
        'person': ParagraphStyle('person', fontSize=10.5, leading=17, textColor=ZINC_300,
                                 fontName='Helvetica', spaceAfter=6),
        'role': ParagraphStyle('role', fontSize=10.5, leading=17, textColor=ZINC_300,
                               fontName='Helvetica', spaceAfter=6),
        # table cell styles
        'hs': ParagraphStyle('hs', fontSize=8.5, leading=13, textColor=ORANGE, fontName='Helvetica-Bold'),
        'cs': ParagraphStyle('cs', fontSize=8.5, leading=13, textColor=ZINC_300, fontName='Helvetica'),
        'hs2': ParagraphStyle('hs2', fontSize=8, leading=12, textColor=ORANGE, fontName='Helvetica-Bold'),
        'cs2': ParagraphStyle('cs2', fontSize=8, leading=12, textColor=ZINC_300, fontName='Helvetica'),
        # closing block
        'ng_title': ParagraphStyle('ng_title', fontSize=11, leading=16, textColor=ORANGE,
                                   fontName='Helvetica-Bold', spaceAfter=1),
        'ng_desc': ParagraphStyle('ng_desc', fontSize=10, leading=15, textColor=ZINC_400,
                                  fontName='Helvetica', spaceAfter=1, leftIndent=8),
        'ng_link': ParagraphStyle('ng_link', fontSize=9, leading=13, textColor=ORANGE,
                                  fontName='Helvetica', spaceAfter=5, leftIndent=8),
        'cta_h': ParagraphStyle('cta_h', fontSize=14, leading=20, textColor=WHITE,
                                fontName='Helvetica-Bold', spaceAfter=4),
        'cta_link': ParagraphStyle('cta_link', fontSize=11, leading=16, textColor=ORANGE,
                                   fontName='Helvetica-Bold', spaceAfter=6),
        'qr_text': ParagraphStyle('qr_text', fontSize=10, leading=16, textColor=ZINC_300,
                                  fontName='Helvetica', spaceAfter=4),
    }
    # @fit is an alias for @role: same styling, different semantic name in content.
    s['fit'] = s['role']
    return s


def rule(color=ORANGE, thickness=2):
    return HRFlowable(width='100%', thickness=thickness, color=color, spaceAfter=8, spaceBefore=2)


def zinc_rule():
    return HRFlowable(width='100%', thickness=0.5, color=ZINC_600, spaceAfter=6, spaceBefore=6)


def make_qr(url, fill='#f97316', back='#09090b'):
    qr = qrcode.QRCode(version=2, error_correction=qrcode.constants.ERROR_CORRECT_H,
                       box_size=6, border=2)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color=fill, back_color=back)
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)
    return RLImage(buf, width=34 * mm, height=34 * mm)


def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(DARK_BG)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    canvas.setFillColor(ORANGE)
    canvas.rect(0, H - 3, W, 3, fill=1, stroke=0)
    canvas.setFillColor(ZINC_600)
    canvas.setStrokeColor(ZINC_600)
    link_footer(canvas, f'wtfagents.com  ·  Page {doc.page}  ·  © 2026 WTF Agents',
                W / 2, 8 * mm)
    canvas.restoreState()


# ── front-matter ─────────────────────────────────────────────────────────────
FM_RE = re.compile(r'^---\s*\n(.*?)\n---\s*\n', re.S)

# The closing "Go deeper" page is fixed in every respect except the five blurbs,
# which come from the linked guides' descriptions. Long descriptions push the
# QR block and sign-off onto a page of their own, so the length is capped.
DESCRIPTION_MAX = 160


def validate_description(meta):
    desc = meta.get('description', '')
    if len(desc) > DESCRIPTION_MAX:
        raise ValueError(
            f"{meta.get('slug', '?')}: description is {len(desc)} characters, "
            f"max {DESCRIPTION_MAX}. Long descriptions overflow the closing page.")
    return desc


def parse_front_matter(text):
    m = FM_RE.match(text)
    if not m:
        raise ValueError('missing front-matter')
    meta = yaml.safe_load(m.group(1)) or {}
    return meta, text[m.end():]


# ── body dialect ─────────────────────────────────────────────────────────────
TABLE_DIRECTIVE = re.compile(r'^@table\s*(keep)?\s*([\d.,\s]*)$')


def parse_body(body_text, S, linker=None):
    """Turn the dialect into a list of flowables.

    `linker` is a callable (text, style_name) -> text applied to body paragraphs
    so catalogue guide titles become store links.
    """
    def L(text, style_name):
        return linker(text, style_name) if linker else text
    flow = []
    lines = body_text.split('\n')
    i = 0
    para_buf = []

    def flush():
        if para_buf:
            txt = ' '.join(x.strip() for x in para_buf).strip()
            if txt:
                flow.append(Paragraph(L(txt, 'body'), S['body']))
            para_buf.clear()

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        if not stripped:
            flush()
            i += 1
            continue

        if stripped.startswith('## '):
            flush()
            if HOOKS['heading']:
                flow.extend(HOOKS['heading'](stripped[3:].strip(), S))
            else:
                flow.append(Paragraph(stripped[3:].strip(), S['section_heading']))
                heading_rule = rule()
                heading_rule.keepWithNext = 1
                flow.append(heading_rule)
        elif stripped.startswith('### '):
            flush()
            flow.append(Paragraph(stripped[4:].strip(), S['subheading']))
        elif stripped.startswith('> '):
            flush()
            flow.append(Paragraph(L(stripped[2:].strip(), 'callout'), S['callout']))
        elif stripped.startswith('- '):
            flush()
            flow.append(Paragraph(L(stripped[2:].strip(), 'bullet'), S['bullet']))
        elif TABLE_DIRECTIVE.match(stripped):
            flush()
            m = TABLE_DIRECTIVE.match(stripped)
            keep = bool(m.group(1))
            widths = [float(x) * mm for x in m.group(2).replace(' ', '').split(',') if x]
            spec, cmds, rows, i = _collect_table(lines, i + 1)
            table = _build_table(spec, cmds, rows, widths, S, keep)
            if HOOKS['table']:
                table = HOOKS['table'](table, S)
            # keepWithNext does not reliably chain from a heading into a
            # KeepTogether, so when a table follows a heading directly, bind the
            # heading and its rule into the same block and move them together.
            if _ends_with_heading(flow, S):
                heading_rule = flow.pop()
                heading = flow.pop()
                inner = table.__dict__.get('_content', [table]) if isinstance(table, KeepTogether) else [table]
                flow.append(KeepTogether([heading, heading_rule] + list(inner)))
            else:
                flow.append(table)
            continue
        elif stripped.startswith('@'):
            flush()
            i = _directive(stripped, flow, S, lines, i, L)
            continue
        else:
            para_buf.append(stripped)
        i += 1

    flush()
    return flow


PALETTE = {
    'ORANGE': ORANGE, 'DARK_BG': DARK_BG, 'ZINC_900': ZINC_900, 'ZINC_800': ZINC_800,
    'ZINC_600': ZINC_600, 'ZINC_400': ZINC_400, 'ZINC_300': ZINC_300, 'WHITE': WHITE,
    'GREEN': GREEN, 'RED': RED,
}



def _ends_with_heading(flow, S):
    """True when the last two flowables are a section heading and its rule."""
    if len(flow) < 2:
        return False
    para, hr = flow[-2], flow[-1]
    return (isinstance(para, Paragraph)
            and getattr(para.style, 'name', '') == 'section_heading'
            and isinstance(hr, HRFlowable))


def _collect_table(lines, i):
    """Reads @tcells / @tstyle directives then the pipe rows."""
    spec, cmds, rows = 'hs-row', [], []
    while i < len(lines):
        raw = lines[i].strip()
        if raw.startswith('@tcells '):
            spec = raw[len('@tcells '):].strip()
        elif raw.startswith('@tstyle '):
            cmds.append(raw[len('@tstyle '):].strip())
        elif raw.startswith('|'):
            cells = [c.strip() for c in raw.strip('|').split('|')]
            if not all(re.fullmatch(r':?-{2,}:?', c) for c in cells if c):
                rows.append(cells)
        else:
            break
        i += 1
    return spec, cmds, rows, i


def _coord(tok):
    x, y = tok.split(',')
    return (int(x), int(y))


def _val(tok):
    if tok.startswith('[') and tok.endswith(']'):
        return [_val(t) for t in tok[1:-1].split(',')]
    if tok in PALETTE:
        return PALETTE[tok]
    try:
        return int(tok) if re.fullmatch(r'-?\d+', tok) else float(tok)
    except ValueError:
        return tok


def _parse_cmd(text):
    parts = text.split()
    return tuple([parts[0], _coord(parts[1]), _coord(parts[2])] + [_val(p) for p in parts[3:]])


def _cell_style(spec, r, c, S):
    if spec == 'raw':
        return None
    if spec == 'hs-row':
        return S['hs'] if r == 0 else S['cs']
    if spec == 'hs-row+col':
        return S['hs'] if (r == 0 or c == 0) else S['cs']
    grid = [row.split(',') for row in spec.split('|')]
    return S[grid[r][c]]


def _build_table(spec, cmds, rows, widths, S, keep):
    data = []
    for r, row in enumerate(rows):
        out_row = []
        for c, cell in enumerate(row):
            st = _cell_style(spec, r, c, S)
            out_row.append(cell if st is None else Paragraph(cell, st))
        data.append(out_row)
    t = Table(data, colWidths=widths or None)
    if cmds:
        t.setStyle(TableStyle([_parse_cmd(x) for x in cmds]))
    return KeepTogether([t]) if keep else t


def _directive(stripped, flow, S, lines, i, L=None):
    L = L or (lambda t, n: t)
    parts = stripped[1:].split(' ', 1)
    name = parts[0]
    rest = parts[1].strip() if len(parts) > 1 else ''

    if name == 'spacer':
        flow.append(Spacer(1, float(rest or 4) * mm))
    elif name == 'rule':
        flow.append(rule())
    elif name == 'zinc_rule':
        flow.append(zinc_rule())
    elif name == 'pagebreak':
        flow.append(PageBreak())
    elif name == 'stat':
        num, _, lbl = rest.partition('||')
        if HOOKS['stat']:
            flow.append(HOOKS['stat'](num.strip(), lbl.strip(), S))
        else:
            flow.append(Paragraph(num.strip(), S['stat_num']))
            flow.append(Paragraph(lbl.strip(), S['stat_lbl']))
    elif name == 'gl' and HOOKS['glossary']:
        flow.append(HOOKS['glossary'](L(rest, 'gl'), S))
    elif name in S:
        flow.append(Paragraph(L(rest, name), S[name]))
    else:
        raise ValueError(f'unknown directive @{name}')
    return i + 1



# ── cross-links ──────────────────────────────────────────────────────────────
HUB_SLUG = 'agentic-economy'
PRACTICAL_SLUG = 'hire-agent'
CROSSLINK_COUNT = 5
STORE_URL = 'wtfagents.com/store'
# Each guide now has a page of its own, so a guide title links to that page
# rather than to a store anchor. The homepage is the store.
SITE_URL = 'wtfagents.com'
GUIDE_URL = 'https://wtfagents.com/guides/{slug}'


def guide_url(slug):
    return GUIDE_URL.format(slug=slug)


def load_all_meta():
    """Front-matter for every guide, keyed by slug, in catalogue order."""
    metas = {}
    for path in all_content_files():
        meta, _ = parse_front_matter(open(path).read())
        metas[meta['slug']] = meta
    return dict(sorted(metas.items(), key=lambda kv: kv[1].get('order', 999)))


def compute_crosslinks(slug, metas):
    """The five "Go deeper" targets for one guide.

    Slots, in order: two editorial picks from `related`, one same-category
    sibling, the hub guide, then the practical guide. Self is always skipped,
    duplicates collapse, and short lists backfill from the same category first
    and then from anything left in catalogue order.
    """
    me = metas[slug]
    picks = []

    def add(candidate):
        # `candidate in metas` is what makes a forward reference safe: a related
        # slug for a guide that has not been written yet is skipped here and the
        # backfill below takes the slot, so the list is always CROSSLINK_COUNT long.
        if (candidate and candidate != slug and candidate in metas
                and candidate not in picks and len(picks) < CROSSLINK_COUNT):
            picks.append(candidate)

    for rel in (me.get('related') or [])[:2]:
        add(rel)

    same_category = [s for s, m in metas.items() if m['category'] == me['category']]
    for sibling in same_category:
        if sibling not in picks and sibling != slug:
            add(sibling)
            break

    add(HUB_SLUG)
    add(PRACTICAL_SLUG)

    for candidate in same_category:
        add(candidate)
    for candidate in metas:
        add(candidate)

    return picks


def write_crosslink_map(metas, path=None):
    """Human-readable record of what the generator produced."""
    path = path or os.path.join(HERE, 'crosslinks.md')
    lines = ['# Guide cross-links', '',
             'Generated by `guides/render.py` — do not edit by hand.', '',
             'Each guide closes with five "Go deeper" links. Slots are: two editorial picks',
             f'from `related`, one same-category sibling, `{HUB_SLUG}` as the hub, then',
             f'`{PRACTICAL_SLUG}`; self is skipped, duplicates collapse, and short lists',
             'backfill from the same category and then from anything remaining.', '',
             '| Guide | Category | 1 | 2 | 3 | 4 | 5 |',
             '|---|---|---|---|---|---|---|']
    for slug, meta in metas.items():
        targets = compute_crosslinks(slug, metas)
        cells = ' | '.join(f'`{t}`' for t in targets)
        lines.append(f"| `{slug}` | {meta['category']} | {cells} |")
    lines.append('')
    with open(path, 'w') as fh:
        fh.write('\n'.join(lines))
    return path



# ── cross-guide title links ──────────────────────────────────────────────────
ORANGE_HEX = '#f97316'
# The store page has no per-guide anchors today, so every title links to the
# store index. If cards gain ids later, give a guide `store_anchor: true` in its
# front-matter and it will link to /store#<slug> instead.
def store_href(meta):
    if meta.get('store_anchor'):
        return f'{href(STORE_URL)}#{meta["slug"]}'
    return href(STORE_URL)


# Styles where a guide title must not become a link: headings, the cover, and
# the bold term at the head of a glossary entry (handled separately below).
NO_TITLE_LINK = {'section_heading', 'subheading', 'cover_title', 'cover_sub',
                 'cover_desc', 'cover_meta'}

_LINK_SPLIT = re.compile(r'(<link\b.*?</link>)', re.S)
_GL_TERM = re.compile(r'\s*<b>.*?</b>', re.S)


class TitleIndex:
    """Guide titles, plus the shorter terms a guide claims via `link_terms`.

    A title links on every mention. A term — "MCP", say — links only on its
    first mention in a guide, because a bare acronym can appear a dozen times
    and linking each one turns the prose into a rash.
    """

    def __init__(self, rx, slug_of, term_rx=None, term_slug=None):
        self.rx = rx
        self.slug_of = slug_of
        self.term_rx = term_rx
        self.term_slug = term_slug or {}

    def sub(self, repl, text):
        return self.rx.sub(repl, text)


def title_pattern(metas, exclude_slug=None):
    """Regex matching any catalogue guide title, longest first.

    Longest-first ordering matters: "WTF is Claude" is a prefix of "WTF is
    Claude Code", and the longer title must win.
    """
    pairs = sorted(((m['title'], s) for s, m in metas.items() if s != exclude_slug),
                   key=lambda p: len(p[0]), reverse=True)
    if not pairs:
        return None

    terms = sorted(((t, s) for s, m in metas.items() if s != exclude_slug
                    for t in (m.get('link_terms') or [])),
                   key=lambda p: len(p[0]), reverse=True)
    term_rx = re.compile(r'\b(?:' + '|'.join(re.escape(t) for t, _ in terms) + r')\b') if terms else None

    return TitleIndex(
        re.compile('(?:' + '|'.join(re.escape(t) for t, _ in pairs) + ')'),
        {t: s for t, s in pairs},
        term_rx,
        {t: s for t, s in terms})


def link_guide_titles(text, pattern, target, style_name, used=None):
    """Link catalogue guide titles, and claimed terms, inside one paragraph.

    Each title resolves to its own guide page; `target` is only the fallback
    for a title the pattern knows but the map does not. `used` carries the
    terms already linked earlier in this guide, so a term links once.
    """
    if pattern is None or style_name in NO_TITLE_LINK:
        return text

    prefix = ''
    if style_name == 'gl':
        # leave the glossary term itself unlinked; link only its definition
        match = _GL_TERM.match(text)
        if match:
            prefix, text = text[:match.end()], text[match.end():]

    slug_of = pattern.slug_of

    def repl(m):
        slug = slug_of.get(m.group(0))
        dest = guide_url(slug) if slug else target
        return f'<link href="{dest}" color="{LINK_COLOR[0]}">{m.group(0)}</link>'

    def term_repl(m):
        term = m.group(0)
        if used is None or term in used:
            return term
        used.add(term)
        return (f'<link href="{guide_url(pattern.term_slug[term])}" '
                f'color="{LINK_COLOR[0]}">{term}</link>')

    parts = _LINK_SPLIT.split(text)
    for i in range(0, len(parts), 2):      # odd indices are existing <link> runs
        parts[i] = pattern.sub(repl, parts[i])
    text = ''.join(parts)

    if pattern.term_rx is not None:
        parts = _LINK_SPLIT.split(text)
        for i in range(0, len(parts), 2):
            parts[i] = pattern.term_rx.sub(term_repl, parts[i])
        text = ''.join(parts)

    return prefix + text


# ── cover and closing ────────────────────────────────────────────────────────
def build_cover(meta, S):
    flow = [Spacer(1, 20 * mm),
            Paragraph(meta['cover_title'], S['cover_title']),
            Paragraph(meta['cover_subtitle'], S['cover_sub']),
            Spacer(1, 4 * mm),
            rule()]
    if meta.get('cover_gap'):
        flow.append(Spacer(1, float(meta['cover_gap']) * mm))
    flow += [Paragraph(meta['subtitle'].strip(), S['cover_desc']),
             Spacer(1, 32 * mm),
             zinc_rule(),
             Paragraph(linkify(meta.get('cover_meta', 'WTF Agents · wtfagents.com')), S['cover_meta']),
             Paragraph(linkify('Part of the WTF Agents Guide Series · wtfagents.com'), S['small']),
             PageBreak()]
    return flow


QR_URL = 'https://wtfagents.com'
CTA_HEAD = 'Want the rest of the series?'


def _prices(metas):
    """Single-guide price from the catalogue, bundle prices from bundles.py."""
    single = min(m['price'] for m in metas.values())
    return (single,
            BUNDLE_CONFIG.by_slug('starter-pack')['price'],
            BUNDLE_CONFIG.by_slug('complete-pack')['price'])


def qr_text(metas):
    single, starter, complete = _prices(metas)
    return linkify(
        '<b>Scan to browse all guides · wtfagents.com</b>\n\n'
        f'${single} each · Starter Pack ${starter} · Complete Pack ${complete} — '
        'every guide in the series')


def cta_body(metas):
    single, starter, complete = _prices(metas)
    return ('Every WTF Agents guide is written the same way — plain English, no hype, no jargon. '
            f'Buy them individually at ${single}, or take the Starter Pack for ${starter} '
            f'or the Complete Pack for ${complete} with every guide in the series.')
CTA_LINK = '<link href="https://wtfagents.com" color="#f97316">wtfagents.com →</link>'

def build_closing(meta, S, metas):
    flow = []
    for target in compute_crosslinks(meta['slug'], metas):
        t = metas[target]
        flow.append(Paragraph(
            f'<link href="{href(STORE_URL)}"><b>{t["title"]}</b></link>', S['ng_title']))
        flow.append(Paragraph(t['description'], S['ng_desc']))
        flow.append(Paragraph(
            f'<link href="https://{STORE_URL}" color="#f97316">{STORE_URL}</link>', S['ng_link']))

    flow.append(zinc_rule())
    flow.append(Spacer(1, 4 * mm))
    flow.append(Paragraph(CTA_HEAD, S['cta_h']))
    flow.append(Paragraph(cta_body(metas), S['body']))
    flow.append(Paragraph(CTA_LINK, S['cta_link']))
    flow.append(zinc_rule())
    flow.append(Spacer(1, 3 * mm))

    qr_table = Table([[make_qr(QR_URL), Paragraph(qr_text(metas), S['qr_text'])]],
                     colWidths=[45 * mm, 115 * mm])
    qr_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    # The QR block closes the guide. The page footer drawn by on_page() already
    # carries the URL and the copyright line, so nothing is repeated here.
    # Kept in a KeepTogether so it cannot split onto a page of its own.
    flow.append(KeepTogether([qr_table]))
    return flow


# ── entry point ──────────────────────────────────────────────────────────────
def render(md_path, out_dir=DEFAULT_OUT, metas=None, style='pilot'):
    meta, body = parse_front_matter(open(md_path).read())
    validate_description(meta)
    metas = metas if metas is not None else load_all_meta()

    out_path = os.path.join(out_dir, meta['file'])
    doc = SimpleDocTemplate(
        out_path, pagesize=A4,
        leftMargin=20 * mm, rightMargin=20 * mm,
        topMargin=22 * mm, bottomMargin=22 * mm,
        title=meta['title'], author='WTF Agents',
    )
    pattern = title_pattern(metas, exclude_slug=meta['slug'])
    target = store_href(meta)
    linked_terms = set()   # a claimed term links once per guide
    linker = lambda text, style_name: link_guide_titles(
        text, pattern, target, style_name, linked_terms)

    if style == 'pilot':
        # The shipping design. Hooks are installed for this render only and
        # cleared afterwards, so switching styles mid-batch cannot leak one
        # into the other.
        import style_pilot
        style_pilot.install(sys.modules[__name__])
        try:
            S = style_pilot.styles(meta.get('cover_title_size', 34))
            order = sorted(metas, key=lambda s: metas[s].get('order', 999))
            index = order.index(meta['slug']) + 1
            story = (style_pilot.build_cover(meta, S, metas, index, len(order))
                     + parse_body(body, S, linker)
                     # No extra break: the content already ends with @pagebreak
                     # before its "Go deeper" heading, so the closing flows onto
                     # that page rather than leaving a near-empty one behind.
                     + style_pilot.build_closing(
                         meta, S, metas, compute_crosslinks(meta['slug'], metas), _prices(metas),
                         # Accent ink on a light tile: standard dark-on-light orientation, so it
                         # decodes without a scanner having to invert it.
                         qr=make_qr(QR_URL, fill='#E4484C', back='#F7F7F7'),
                         qr_caption=qr_text(metas)))
            doc.build(story, onFirstPage=style_pilot.on_cover,
                      onLaterPages=style_pilot.on_page)
        finally:
            reset_hooks()
        return out_path

    S = _styles(meta.get('cover_title_size', 38))
    story = (build_cover(meta, S)
             + parse_body(body, S, linker)
             + build_closing(meta, S, metas))
    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
    return out_path


def all_content_files():
    return sorted(os.path.join(CONTENT_DIR, f)
                  for f in os.listdir(CONTENT_DIR) if f.endswith('.md'))


def main():
    ap = argparse.ArgumentParser(description='Render WTF Agents guide PDFs.')
    ap.add_argument('slugs', nargs='*', help='slugs to render (default: all)')
    ap.add_argument('--out', default=DEFAULT_OUT, help='output directory')
    ap.add_argument('--style', default='pilot', choices=['classic', 'pilot'],
                    help='pilot is the shipping design (DESIGN.md); classic is '
                         'the previous orange style, kept for comparison')
    args = ap.parse_args()

    os.makedirs(args.out, exist_ok=True)
    files = all_content_files()
    if args.slugs:
        # Match on the slug in the front-matter, not the filename. They are
        # usually the same, but the filename is free to differ — claude-model.md
        # holds slug 'claude' — and the front-matter is the source of truth
        # everywhere else in the pipeline.
        wanted = set(args.slugs)
        slug_of = {f: parse_front_matter(open(f, encoding='utf-8').read())[0]['slug']
                   for f in files}
        files = [f for f in files if slug_of[f] in wanted]
        missing = wanted - {slug_of[f] for f in files}
        if missing:
            sys.exit(f'unknown slug(s): {", ".join(sorted(missing))}')

    metas = load_all_meta()
    for f in files:
        path = render(f, args.out, metas, style=args.style)
        print(f'✓ {os.path.basename(path)}')

    mappath = write_crosslink_map(metas)
    print(f'✓ {os.path.relpath(mappath, REPO)}')


if __name__ == '__main__':
    main()
