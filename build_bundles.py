#!/usr/bin/env python3
"""Build the bundle PDFs by merging the single-guide PDFs behind a cover page.

Bundle composition must match BUNDLES in lib/guides.ts.
Run after regenerate_all_guides.py:  python3 build_bundles.py
"""
import io
import os
import sys

from pypdf import PdfWriter, PdfReader
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer

BASE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(BASE, 'guides'))
import bundles as _BUNDLE_CONFIG  # noqa: E402
from linkify import link_footer, linkify  # noqa: E402
GUIDES_DIR = os.path.join(BASE, 'public', 'guides')

# Palette from DESIGN.md — the bundle cover has to move with the guides it
# wraps, or a red guide sits behind an orange cover.
sys.path.insert(0, os.path.join(BASE, 'guides'))
import style_pilot  # noqa: E402

# Register before any ParagraphStyle is constructed: reportlab resolves the
# family/bold mapping while parsing, not while drawing.
style_pilot.register_fonts()

ORANGE = style_pilot.ACCENT            # name kept; the value is the accent
DARK_BG = style_pilot.CANVAS
ZINC_400 = style_pilot.MUTED
ZINC_300 = style_pilot.BODY
ZINC_600 = style_pilot.DIM
WHITE = style_pilot.TEXT
W, H = A4

# Guide order, titles, filenames and bundle membership all come from the
# front-matter in guides/content/*.md — the same source the renderer uses.
def _load_guides():
    import yaml
    content_dir = os.path.join(BASE, 'guides', 'content')
    metas = []
    for fn in sorted(os.listdir(content_dir)):
        if fn.endswith('.md'):
            text = open(os.path.join(content_dir, fn)).read()
            metas.append(yaml.safe_load(text.split('---', 2)[1]))
    metas.sort(key=lambda m: m.get('order', 999))
    return metas


_METAS = {m['slug']: m for m in _load_guides()}
GUIDE_FILES = {slug: (m['title'], m['file']) for slug, m in _METAS.items()}

# Bundle definitions come from guides/bundles.py, the same config the renderer
# and the store catalogue read.
BUNDLES = [
    {
        'file': b['file'],
        'title': b['cover_title'],
        'subtitle': b['cover_subtitle'],
        'blurb': b['blurb'],
        'includes': _BUNDLE_CONFIG.includes(b, _METAS),
    }
    # resolve() fills in the guide count the copy refers to, from the same
    # catalogue that decides membership, so the cover can never claim a number
    # the contents page contradicts.
    for b in map(lambda b: _BUNDLE_CONFIG.resolve(b, _METAS), _BUNDLE_CONFIG.BUNDLES)
]


def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(DARK_BG)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    # One corner glow, as on every guide page. No top bar: DESIGN.md §6.2.
    from reportlab.lib.colors import Color
    for i in range(26, 0, -1):
        t = i / 26.0
        canvas.setFillColor(Color(184 / 255, 38 / 255, 27 / 255, alpha=0.055 * (1 - t) ** 1.6))
        canvas.circle(W, H, 95 * mm * t, fill=1, stroke=0)
    canvas.setFillColor(ZINC_600)
    canvas.setStrokeColor(ZINC_600)
    link_footer(canvas, 'wtfagents.com  ·  © 2026 WTF Agents', W / 2, 8 * mm,
                font=style_pilot.REG)
    canvas.restoreState()


def build_cover(bundle):
    """Render the cover + contents page to an in-memory PDF."""
    buf = io.BytesIO()
    doc = SimpleDocTemplate(
        buf, pagesize=A4,
        leftMargin=20 * mm, rightMargin=20 * mm,
        topMargin=22 * mm, bottomMargin=22 * mm,
        title=f"{bundle['title']} {bundle['subtitle']}", author='WTF Agents',
    )
    cover_title = ParagraphStyle('cover_title', fontSize=38, leading=46, textColor=WHITE,
                                 fontName=style_pilot.BOLD, alignment=TA_LEFT, spaceAfter=6)
    cover_sub = ParagraphStyle('cover_sub', fontSize=16, leading=24, textColor=ORANGE,
                               fontName=style_pilot.BOLD, alignment=TA_LEFT, spaceAfter=6)
    cover_desc = ParagraphStyle('cover_desc', fontSize=13, leading=21, textColor=ZINC_300,
                                fontName=style_pilot.REG, spaceAfter=6)
    cover_meta = ParagraphStyle('cover_meta', fontSize=10, leading=15, textColor=ZINC_400,
                                fontName=style_pilot.REG, alignment=TA_LEFT)
    small = ParagraphStyle('small', fontSize=9, leading=14, textColor=ZINC_600, fontName=style_pilot.REG)
    contents_h = ParagraphStyle('contents_h', fontSize=13, leading=19, textColor=WHITE,
                                fontName=style_pilot.BOLD, spaceBefore=8, spaceAfter=6)
    item = ParagraphStyle('item', fontSize=11, leading=18, textColor=ZINC_300, fontName=style_pilot.REG)

    def rule(color=ORANGE, w=2):
        return HRFlowable(width='100%', thickness=w, color=color, spaceBefore=2, spaceAfter=2)

    story = [
        Spacer(1, 20 * mm),
        Paragraph(bundle['title'], cover_title),
        Paragraph(bundle['subtitle'], cover_sub),
        Spacer(1, 4 * mm),
        rule(),
        Spacer(1, 3 * mm),
        Paragraph(bundle['blurb'], cover_desc),
        Spacer(1, 10 * mm),
        Paragraph(f"What's inside — {len(bundle['includes'])} guides", contents_h),
        rule(HexColor('#27272a'), 1),
        Spacer(1, 2 * mm),
    ]
    for i, slug in enumerate(bundle['includes'], 1):
        story.append(Paragraph(f"{i}.&nbsp;&nbsp;{GUIDE_FILES[slug][0]}", item))
    story += [
        Spacer(1, 12 * mm),
        HRFlowable(width='100%', thickness=1, color=HexColor('#27272a'), spaceBefore=2, spaceAfter=2),
        Paragraph(linkify('WTF Agents · wtfagents.com'), cover_meta),
        Paragraph(linkify('Part of the WTF Agents Guide Series · wtfagents.com'), small),
    ]
    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
    buf.seek(0)
    return buf


def main():
    missing = [f for _, f in GUIDE_FILES.values()
               if not os.path.exists(os.path.join(GUIDES_DIR, f))]
    if missing:
        sys.exit(f'ERROR: missing source guide PDFs: {missing}')

    for bundle in BUNDLES:
        writer = PdfWriter()
        for page in PdfReader(build_cover(bundle)).pages:
            writer.add_page(page)
        for slug in bundle['includes']:
            title, filename = GUIDE_FILES[slug]
            reader = PdfReader(os.path.join(GUIDES_DIR, filename))
            start = len(writer.pages)
            for page in reader.pages:
                writer.add_page(page)
            writer.add_outline_item(title, start)

        # Every guide PDF carries its own Montserrat subset, so a merged bundle
        # arrives with one copy per guide — 54 embedded font programs in the
        # complete pack, of which only 18 are actually distinct. Deduplicating
        # identical objects collapses those, and the shared page resources with
        # them. Subsets that genuinely differ (a guide using a glyph no other
        # guide uses) are left alone, which is why this does not get to one
        # copy per weight.
        writer.compress_identical_objects(remove_identicals=True, remove_orphans=True)

        out = os.path.join(GUIDES_DIR, bundle['file'])
        with open(out, 'wb') as fh:
            writer.write(fh)
        size_kb = os.path.getsize(out) / 1024
        print(f"✓ {bundle['file']} — {len(bundle['includes'])} guides, "
              f"{len(writer.pages)} pages, {size_kb:.0f} KB")


if __name__ == '__main__':
    main()
