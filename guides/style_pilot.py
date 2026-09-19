#!/usr/bin/env python3
"""The red/Montserrat pilot style for the guide PDFs — see DESIGN.md.

Opt-in only. `render.py --style pilot <slug>` installs the hooks below; every
other run leaves render.HOOKS empty and produces exactly the output it always
did. Nothing in here is imported unless the flag is passed.

Values are the ones measured off the reference screenshots and recorded in
DESIGN.md; where a number appears here it should match that document.
"""
import os

from reportlab.lib.colors import HexColor, Color
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (HRFlowable, KeepTogether, PageBreak, Paragraph,
                                Spacer, Table, TableStyle)

HERE = os.path.dirname(os.path.abspath(__file__))
FONT_DIR = os.path.join(HERE, 'fonts')

# ── palette (DESIGN.md §1) ───────────────────────────────────────────────────
ACCENT = HexColor('#E4484C')
ACCENT_BRIGHT = HexColor('#E93E42')
INK_ON_ACCENT = HexColor('#1A0507')
CANVAS = HexColor('#0A0405')
CARD = HexColor('#0A0506')
TEXT = HexColor('#F7F7F7')      # headings / white
BODY = HexColor('#B1B1B1')      # running text
MUTED = HexColor('#928F8E')     # counters, captions
DIM = HexColor('#6B6867')
STROKE = Color(228 / 255, 72 / 255, 76 / 255, alpha=0.55)
HAIRLINE = Color(228 / 255, 72 / 255, 76 / 255, alpha=0.35)

W, H = A4
REG, BOLD = 'Montserrat', 'Montserrat-Bold'


def register_fonts():
    """Embed the two weights. Montserrat is the reference match — DESIGN.md §4."""
    if REG in pdfmetrics.getRegisteredFontNames():
        return
    pdfmetrics.registerFont(TTFont(REG, os.path.join(FONT_DIR, 'Montserrat-Regular.ttf')))
    pdfmetrics.registerFont(TTFont(BOLD, os.path.join(FONT_DIR, 'Montserrat-Bold.ttf')))
    # Without the family mapping, inline <b> in the guide dialect resolves to
    # Helvetica-Bold rather than Montserrat — the content uses <b> heavily, so
    # this is what stops half the bold text falling out of the typeface.
    pdfmetrics.registerFontFamily(REG, normal=REG, bold=BOLD, italic=REG, boldItalic=BOLD)


# ── page furniture ───────────────────────────────────────────────────────────
def on_page(canvas, doc):
    """Black field, one corner glow, hairline footer. DESIGN.md §1 and §6.1."""
    canvas.saveState()
    canvas.setFillColor(CANVAS)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)

    # The glow: concentric discs falling off steeply, bottom-left so it never
    # sits behind the body column, which starts at the top of the page.
    cx, cy = 0, 0
    for i in range(26, 0, -1):
        t = i / 26.0
        r = 78 * mm * t
        canvas.setFillColor(Color(184 / 255, 38 / 255, 27 / 255, alpha=0.05 * (1 - t) ** 1.6))
        canvas.circle(cx, cy, r, fill=1, stroke=0)

    canvas.setFillColor(DIM)
    canvas.setFont(REG, 8)
    canvas.drawCentredString(W / 2, 11 * mm, f'wtfagents.com  ·  Page {doc.page}  ·  © 2026 WTF Agents')
    canvas.restoreState()


def on_cover(canvas, doc):
    """Cover page: the glow moves to the top-right, away from the title block."""
    canvas.saveState()
    canvas.setFillColor(CANVAS)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    for i in range(26, 0, -1):
        t = i / 26.0
        canvas.setFillColor(Color(184 / 255, 38 / 255, 27 / 255, alpha=0.055 * (1 - t) ** 1.6))
        canvas.circle(W, H, 95 * mm * t, fill=1, stroke=0)
    canvas.setFillColor(DIM)
    canvas.setFont(REG, 8)
    canvas.drawCentredString(W / 2, 11 * mm, '© 2026 WTF Agents')
    canvas.restoreState()


# ── styles ───────────────────────────────────────────────────────────────────
def styles(cover_title_size=34):
    """Same keys as render._styles so parse_body works unchanged."""
    register_fonts()

    def P(name, **kw):
        kw.setdefault('fontName', REG)
        return ParagraphStyle(name, **kw)

    s = {
        'cover_title': P('cover_title', fontSize=cover_title_size, leading=cover_title_size + 6,
                         textColor=TEXT, fontName=BOLD, alignment=TA_LEFT, spaceAfter=2),
        'cover_sub': P('cover_sub', fontSize=cover_title_size, leading=cover_title_size + 6,
                       textColor=ACCENT_BRIGHT, fontName=BOLD, alignment=TA_LEFT, spaceAfter=6),
        'cover_desc': P('cover_desc', fontSize=12, leading=20, textColor=BODY, spaceAfter=6),
        'cover_meta': P('cover_meta', fontSize=9, leading=14, textColor=MUTED, alignment=TA_LEFT),
        'counter': P('counter', fontSize=9, leading=12, textColor=MUTED, fontName=BOLD),
        'section_heading': P('section_heading', fontSize=17, leading=23, textColor=TEXT,
                             fontName=BOLD, spaceBefore=12, spaceAfter=4, keepWithNext=True),
        'subheading': P('subheading', fontSize=12, leading=18, textColor=TEXT, fontName=BOLD,
                        spaceBefore=8, spaceAfter=3),
        'body': P('body', fontSize=10, leading=17, textColor=BODY, spaceAfter=7),
        'body_lead': P('body_lead', fontSize=11.5, leading=19, textColor=TEXT, fontName=BOLD,
                       spaceAfter=8),
        'bullet': P('bullet', fontSize=10, leading=17, textColor=BODY, spaceAfter=4, leftIndent=14),
        'small': P('small', fontSize=8.5, leading=13, textColor=DIM, spaceAfter=3),
        'stat_num': P('stat_num', fontSize=22, leading=26, textColor=ACCENT_BRIGHT, fontName=BOLD,
                      alignment=TA_LEFT),
        'stat_lbl': P('stat_lbl', fontSize=8.5, leading=12.5, textColor=MUTED, alignment=TA_LEFT),
        'footer_s': P('footer_s', fontSize=8, leading=12, textColor=DIM, alignment=TA_CENTER),
        'link_style': P('link_style', fontSize=10, leading=17, textColor=ACCENT, spaceAfter=4,
                        leftIndent=14),
        'callout': P('callout', fontSize=10.5, leading=17, textColor=TEXT, fontName=BOLD,
                     spaceAfter=6, leftIndent=10),
        'quote': P('quote', fontSize=10.5, leading=17, textColor=TEXT, spaceAfter=8, leftIndent=12,
                   rightIndent=12),
        'caveat': P('caveat', fontSize=9.5, leading=16, textColor=BODY, spaceAfter=6, leftIndent=10),
        'gl': P('gl', fontSize=9.5, leading=15, textColor=BODY, spaceAfter=5),
        'hs': P('hs', fontSize=8, leading=12, textColor=ACCENT, fontName=BOLD),
        'cs': P('cs', fontSize=8, leading=12, textColor=BODY),
        'hs2': P('hs2', fontSize=7.5, leading=11, textColor=ACCENT, fontName=BOLD),
        'cs2': P('cs2', fontSize=7.5, leading=11, textColor=BODY),
        'ng_title': P('ng_title', fontSize=10.5, leading=15, textColor=TEXT, fontName=BOLD,
                      spaceAfter=2),
        'ng_desc': P('ng_desc', fontSize=9, leading=14, textColor=BODY, spaceAfter=2),
        'ng_link': P('ng_link', fontSize=8.5, leading=12, textColor=ACCENT, spaceAfter=4),
        'cta_h': P('cta_h', fontSize=15, leading=21, textColor=TEXT, fontName=BOLD, spaceAfter=6),
        'cta_link': P('cta_link', fontSize=11, leading=16, textColor=ACCENT, fontName=BOLD,
                      spaceAfter=6),
        'qr_text': P('qr_text', fontSize=9.5, leading=15, textColor=BODY, spaceAfter=4),
        'pill': P('pill', fontSize=9, leading=13, textColor=TEXT, fontName=BOLD,
                  alignment=TA_CENTER),
        'badge': P('badge', fontSize=10, leading=14, textColor=INK_ON_ACCENT, fontName=BOLD,
                   alignment=TA_CENTER),
    }
    # Every remaining body-ish directive shares the body treatment, exactly as
    # the classic registry does.
    for k in ('cap', 'cat', 'ev', 'task', 'step', 'prod', 'acc', 'person', 'role'):
        s[k] = P(k, fontSize=10, leading=17, textColor=BODY, spaceAfter=6)
    s['fit'] = s['role']
    s['step_num'] = P('step_num', fontSize=26, leading=30, textColor=ACCENT, fontName=BOLD,
                      spaceAfter=2)
    return s


# ── the card primitive (DESIGN.md §2) ────────────────────────────────────────
def card(content, width=None, pad=9, radius=9, border=HAIRLINE, bg=CARD):
    """A hairline-bordered, rounded, near-black card wrapping any flowables."""
    width = width or (W - 40 * mm)
    t = Table([[content]], colWidths=[width])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), bg),
        ('BOX', (0, 0), (-1, -1), 0.7, border),
        ('ROUNDEDCORNERS', [radius, radius, radius, radius]),
        ('LEFTPADDING', (0, 0), (-1, -1), pad + 3),
        ('RIGHTPADDING', (0, 0), (-1, -1), pad + 3),
        ('TOPPADDING', (0, 0), (-1, -1), pad),
        ('BOTTOMPADDING', (0, 0), (-1, -1), pad),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    return t


def counter_row(label, n=None, total=None, width=None):
    """Red rule, gap, spaced caps, red slash — DESIGN.md §3."""
    register_fonts()
    # A plain ' '.join collapses in reportlab's Paragraph parser and the
    # tracking vanishes; non-breaking spaces survive.
    spaced = '\u00a0'.join(label.upper().replace(' ', '\u00a0\u00a0'))
    txt = spaced
    if n is not None:
        txt += ('\u00a0\u00a0\u00a0' + '\u00a0'.join(f'{n:02d}')
                + '\u00a0\u00a0<font color="#E4484C">/</font>\u00a0\u00a0'
                + '\u00a0'.join(str(total)))
    p = Paragraph(txt, ParagraphStyle('ctr', fontName=BOLD, fontSize=8.5, leading=12,
                                      textColor=MUTED))
    t = Table([[_rule_cell(), p]], colWidths=[16 * mm, (width or (W - 40 * mm)) - 16 * mm])
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (0, 0), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    return t


def _rule_cell():
    return HRFlowable(width=12 * mm, thickness=1.6, color=ACCENT, spaceBefore=0, spaceAfter=0,
                      hAlign='LEFT')


# ── hooks ────────────────────────────────────────────────────────────────────
def stat_card(num, lbl, S):
    """Each @stat becomes a small card: red number, zinc caption."""
    inner = [Paragraph(num, S['stat_num']), Spacer(1, 1.5 * mm), Paragraph(lbl, S['stat_lbl'])]
    return card(inner, pad=8, radius=8)


def heading_block(text, S):
    """White heading with the red rule beneath — DESIGN.md §4."""
    p = Paragraph(text, S['section_heading'])
    r = HRFlowable(width='100%', thickness=1.6, color=ACCENT, spaceBefore=3, spaceAfter=9)
    r.keepWithNext = 1
    return [p, r]


def table_card(table, S):
    """Restyle a built table to the hairline-card treatment.

    `_build_table` hands back a bare Table, or a KeepTogether wrapping one when
    the directive carried `keep`. Unwrap, restyle, rewrap.
    """
    if isinstance(table, KeepTogether):
        inner = table.__dict__.get('_content', [])
        return KeepTogether([table_card(x, S) if isinstance(x, Table) else x for x in inner])
    if not isinstance(table, Table):
        return table
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), CARD),
        ('BACKGROUND', (0, 0), (-1, 0), Color(228 / 255, 72 / 255, 76 / 255, alpha=0.10)),
        ('BOX', (0, 0), (-1, -1), 0.7, HAIRLINE),
        ('INNERGRID', (0, 0), (-1, -1), 0.4, Color(1, 1, 1, alpha=0.07)),
        ('ROUNDEDCORNERS', [9, 9, 9, 9]),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
        ('LEFTPADDING', (0, 0), (-1, -1), 9),
        ('RIGHTPADDING', (0, 0), (-1, -1), 9),
    ]))
    return table


def glossary_card(text, S):
    """Glossary entries get the same hairline card."""
    return card([Paragraph(text, S['gl'])], pad=7, radius=8)


def install(render):
    render.HOOKS['stat'] = stat_card
    render.HOOKS['heading'] = heading_block
    render.HOOKS['table'] = table_card
    render.HOOKS['glossary'] = glossary_card


# ── cover ────────────────────────────────────────────────────────────────────
def build_cover(meta, S, metas, index=None, total=None):
    """The cover laid out as a reference card — DESIGN.md §2."""
    register_fonts()
    inner_w = W - 40 * mm
    flow = [
        Spacer(1, 6 * mm),
        Paragraph('\u00a0'.join('WTF\u00a0AGENTS'),
                  ParagraphStyle('wm', fontName=BOLD, fontSize=8.5, leading=12, textColor=TEXT)),
        Spacer(1, 40 * mm),
    ]
    if index:
        flow += [counter_row('Guide', index, total, width=inner_w), Spacer(1, 7 * mm)]
    flow += [
        Paragraph(meta['cover_title'], S['cover_title']),
        Paragraph(meta['cover_subtitle'], S['cover_sub']),
        Spacer(1, 8 * mm),
        card([Paragraph(meta['subtitle'].strip(), S['cover_desc'])], pad=11, radius=10),
        Spacer(1, 38 * mm),
        Paragraph('wtfagents.com', S['cover_meta']),
        PageBreak(),
    ]
    return flow


# ── closing ──────────────────────────────────────────────────────────────────
def build_closing(meta, S, metas, crosslinks, prices):
    """CTA card with the two bundle pills, then five mini cards."""
    register_fonts()
    inner_w = W - 40 * mm
    single, starter, complete = prices

    pills = Table(
        [[_pill(f'Starter Pack  ${starter}', S), _pill(f'Complete Pack  ${complete}', S)]],
        colWidths=[(inner_w - 24) / 2] * 2)
    pills.setStyle(TableStyle([
        ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (0, 0), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))

    cta = card([
        Paragraph('Get the rest of the series', S['cta_h']),
        Paragraph(f'Every WTF Agents guide is written the same way — plain English, no hype, '
                  f'no jargon. ${single} each, or take a bundle.', S['body']),
        Spacer(1, 4 * mm),
        pills,
        Spacer(1, 4 * mm),
        Paragraph('<link href="https://wtfagents.com/store" color="#E4484C">'
                  'wtfagents.com/store →</link>', S['cta_link']),
    ], pad=12, radius=10)

    flow = [counter_row('Go deeper', width=inner_w), Spacer(1, 6 * mm), cta, Spacer(1, 9 * mm)]
    for slug in crosslinks:
        t = metas[slug]
        flow.append(card([
            Paragraph(t['title'], S['ng_title']),
            Paragraph(t['description'], S['ng_desc']),
        ], pad=8, radius=8))
        flow.append(Spacer(1, 4 * mm))
    return flow


def _pill(text, S):
    t = Table([[Paragraph(text, S['pill'])]])
    t.setStyle(TableStyle([
        ('BOX', (0, 0), (-1, -1), 0.7, STROKE),
        ('ROUNDEDCORNERS', [11, 11, 11, 11]),
        ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
        ('LEFTPADDING', (0, 0), (-1, -1), 10), ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    return t
