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
        'section_heading': ParagraphStyle('section_heading', fontSize=20, leading=26, textColor=ORANGE,
                                          fontName='Helvetica-Bold', spaceBefore=12, spaceAfter=4),
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
                                  fontName='Helvetica', spaceAfter=8, leftIndent=8),
        'cta_h': ParagraphStyle('cta_h', fontSize=14, leading=20, textColor=WHITE,
                                fontName='Helvetica-Bold', spaceAfter=4),
        'cta_link': ParagraphStyle('cta_link', fontSize=11, leading=16, textColor=ORANGE,
                                   fontName='Helvetica-Bold', spaceAfter=10),
        'qr_text': ParagraphStyle('qr_text', fontSize=10, leading=16, textColor=ZINC_300,
                                  fontName='Helvetica', spaceAfter=4),
    }
    return s


def rule(color=ORANGE, thickness=2):
    return HRFlowable(width='100%', thickness=thickness, color=color, spaceAfter=8, spaceBefore=2)


def zinc_rule():
    return HRFlowable(width='100%', thickness=0.5, color=ZINC_600, spaceAfter=6, spaceBefore=6)


def make_qr(url):
    qr = qrcode.QRCode(version=2, error_correction=qrcode.constants.ERROR_CORRECT_H,
                       box_size=6, border=2)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color='#f97316', back_color='#09090b')
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)
    return RLImage(buf, width=38 * mm, height=38 * mm)


def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(DARK_BG)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    canvas.setFillColor(ORANGE)
    canvas.rect(0, H - 3, W, 3, fill=1, stroke=0)
    canvas.setFillColor(ZINC_600)
    canvas.setFont('Helvetica', 8)
    canvas.drawCentredString(W / 2, 8 * mm, f'wtfagents.com  ·  Page {doc.page}  ·  © 2026 WTF Agents')
    canvas.restoreState()


# ── front-matter ─────────────────────────────────────────────────────────────
FM_RE = re.compile(r'^---\s*\n(.*?)\n---\s*\n', re.S)


def parse_front_matter(text):
    m = FM_RE.match(text)
    if not m:
        raise ValueError('missing front-matter')
    meta = yaml.safe_load(m.group(1)) or {}
    return meta, text[m.end():]


# ── body dialect ─────────────────────────────────────────────────────────────
TABLE_DIRECTIVE = re.compile(r'^@table\s*(keep)?\s*([\d.,\s]*)$')


def parse_body(body_text, S):
    """Turn the dialect into a list of flowables."""
    flow = []
    lines = body_text.split('\n')
    i = 0
    para_buf = []

    def flush():
        if para_buf:
            txt = ' '.join(x.strip() for x in para_buf).strip()
            if txt:
                flow.append(Paragraph(txt, S['body']))
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
            flow.append(Paragraph(stripped[3:].strip(), S['section_heading']))
            flow.append(rule())
        elif stripped.startswith('### '):
            flush()
            flow.append(Paragraph(stripped[4:].strip(), S['subheading']))
        elif stripped.startswith('> '):
            flush()
            flow.append(Paragraph(stripped[2:].strip(), S['callout']))
        elif stripped.startswith('- '):
            flush()
            flow.append(Paragraph(stripped[2:].strip(), S['bullet']))
        elif TABLE_DIRECTIVE.match(stripped):
            flush()
            m = TABLE_DIRECTIVE.match(stripped)
            keep = bool(m.group(1))
            widths = [float(x) * mm for x in m.group(2).replace(' ', '').split(',') if x]
            spec, cmds, rows, i = _collect_table(lines, i + 1)
            flow.append(_build_table(spec, cmds, rows, widths, S, keep))
            continue
        elif stripped.startswith('@'):
            flush()
            i = _directive(stripped, flow, S, lines, i)
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


def _directive(stripped, flow, S, lines, i):
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
        flow.append(Paragraph(num.strip(), S['stat_num']))
        flow.append(Paragraph(lbl.strip(), S['stat_lbl']))
    elif name in S:
        flow.append(Paragraph(rest, S[name]))
    else:
        raise ValueError(f'unknown directive @{name}')
    return i + 1



# ── cross-links ──────────────────────────────────────────────────────────────
HUB_SLUG = 'agentic-economy'
PRACTICAL_SLUG = 'hire-agent'
CROSSLINK_COUNT = 5
STORE_URL = 'wtfagents.com/store'


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
             Paragraph(meta.get('cover_meta', 'WTF Agents · wtfagents.com'), S['cover_meta']),
             Paragraph('Part of the WTF Agents Guide Series · wtfagents.com/store', S['small']),
             PageBreak()]
    return flow


QR_URL = 'https://wtfagents.com/store'
QR_TEXT = ('<b>Scan to browse all guides</b>\n\nEvery WTF Agents guide at wtfagents.com/store\n\n'
           '$7 each · Starter Pack $29 · Complete Pack $49 — all 12 guides\n\n'
           'Also free: the live AI company directory at wtfagents.com/companies')
CTA_HEAD = 'Want the rest of the series?'
CTA_BODY = ('Every WTF Agents guide is written the same way — plain English, no hype, no jargon. '
            'Buy them individually at $7, or take the Starter Pack for $29 and the Complete Pack '
            'for $49, which includes all twelve.')
CTA_LINK = '<link href="https://wtfagents.com/store" color="#f97316">wtfagents.com/store →</link>'
FOOTER_1 = 'WTF Agents · wtfagents.com · The autonomous company economy is here. WTF is happening.'
FOOTER_2 = '© 2026 WTF Agents. All rights reserved.'


def build_closing(meta, S, metas):
    flow = []
    for target in compute_crosslinks(meta['slug'], metas):
        t = metas[target]
        flow.append(Paragraph(f"<b>{t['title']}</b>", S['ng_title']))
        flow.append(Paragraph(t['description'], S['ng_desc']))
        flow.append(Paragraph(
            f'<link href="https://{STORE_URL}" color="#f97316">{STORE_URL}</link>', S['ng_link']))

    flow.append(zinc_rule())
    flow.append(Spacer(1, 4 * mm))
    flow.append(Paragraph(CTA_HEAD, S['cta_h']))
    flow.append(Paragraph(CTA_BODY, S['body']))
    flow.append(Paragraph(CTA_LINK, S['cta_link']))
    flow.append(zinc_rule())
    flow.append(Spacer(1, 6 * mm))

    qr_table = Table([[make_qr(QR_URL), Paragraph(QR_TEXT, S['qr_text'])]],
                     colWidths=[45 * mm, 115 * mm])
    qr_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    flow.append(qr_table)
    flow.append(Spacer(1, 8 * mm))
    flow.append(zinc_rule())
    flow.append(Paragraph(FOOTER_1, S['footer_s']))
    flow.append(Paragraph(FOOTER_2, S['footer_s']))
    return flow


# ── entry point ──────────────────────────────────────────────────────────────
def render(md_path, out_dir=DEFAULT_OUT, metas=None):
    meta, body = parse_front_matter(open(md_path).read())
    metas = metas if metas is not None else load_all_meta()
    S = _styles(meta.get('cover_title_size', 38))

    out_path = os.path.join(out_dir, meta['file'])
    doc = SimpleDocTemplate(
        out_path, pagesize=A4,
        leftMargin=20 * mm, rightMargin=20 * mm,
        topMargin=22 * mm, bottomMargin=22 * mm,
        title=meta['title'], author='WTF Agents',
    )
    story = build_cover(meta, S) + parse_body(body, S) + build_closing(meta, S, metas)
    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
    return out_path


def all_content_files():
    return sorted(os.path.join(CONTENT_DIR, f)
                  for f in os.listdir(CONTENT_DIR) if f.endswith('.md'))


def main():
    ap = argparse.ArgumentParser(description='Render WTF Agents guide PDFs.')
    ap.add_argument('slugs', nargs='*', help='slugs to render (default: all)')
    ap.add_argument('--out', default=DEFAULT_OUT, help='output directory')
    args = ap.parse_args()

    os.makedirs(args.out, exist_ok=True)
    files = all_content_files()
    if args.slugs:
        wanted = set(args.slugs)
        files = [f for f in files if os.path.basename(f)[:-3] in wanted]
        missing = wanted - {os.path.basename(f)[:-3] for f in files}
        if missing:
            sys.exit(f'unknown slug(s): {", ".join(sorted(missing))}')

    metas = load_all_meta()
    for f in files:
        path = render(f, args.out, metas)
        print(f'✓ {os.path.basename(path)}')

    mappath = write_crosslink_map(metas)
    print(f'✓ {os.path.relpath(mappath, REPO)}')


if __name__ == '__main__':
    main()
