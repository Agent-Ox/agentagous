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
GUIDES_DIR = os.path.join(BASE, 'public', 'guides')

# Same palette as generate_guide_*.py
ORANGE = HexColor('#f97316')
DARK_BG = HexColor('#09090b')
ZINC_400 = HexColor('#a1a1aa')
ZINC_300 = HexColor('#d4d4d8')
ZINC_600 = HexColor('#52525b')
WHITE = HexColor('#ffffff')
W, H = A4

# slug -> (title, filename). Mirrors GUIDES in lib/guides.ts.
GUIDE_FILES = {
    'agentic-economy': ('WTF is the Agentic Economy', 'wtf-is-the-agentic-economy.pdf'),
    'ai-agent': ('WTF is an AI Agent', 'wtf-is-an-ai-agent.pdf'),
    'api': ('WTF is an API', 'wtf-is-an-api.pdf'),
    'llm': ('WTF is an LLM', 'wtf-is-an-llm.pdf'),
    'polsia': ('WTF is Polsia', 'wtf-is-polsia.pdf'),
    'openclaw': ('WTF is OpenClaw', 'wtf-is-openclaw.pdf'),
    'paperclip': ('WTF is Paperclip', 'wtf-is-paperclip.pdf'),
    'anthropic': ('WTF is Anthropic', 'wtf-is-anthropic.pdf'),
    'claude': ('WTF is Claude', 'wtf-is-claude.pdf'),
    'claude-code': ('WTF is Claude Code', 'wtf-is-claude-code.pdf'),
    'cowork': ('WTF is Cowork', 'wtf-is-cowork.pdf'),
    'hire-agent': ('How to Hire an AI Agent for Your Business', 'how-to-hire-an-ai-agent.pdf'),
}

BUNDLES = [
    {
        'file': 'agentic-economy-starter-pack.pdf',
        'title': 'The Agentic Economy',
        'subtitle': 'Starter Pack',
        'blurb': 'Five guides that take you from "WTF is going on" to hiring your first agent. '
                 'No jargon. No hype. Just what is actually happening — and what to do about it.',
        'includes': ['agentic-economy', 'ai-agent', 'llm', 'claude', 'hire-agent'],
    },
    {
        'file': 'complete-wtf-agents-pack.pdf',
        'title': 'The Complete',
        'subtitle': 'WTF Agents Pack',
        'blurb': 'Every WTF Agents guide in one file. The agentic economy, the platforms running it, '
                 'the AI behind it, and how to put it to work in your own business.',
        'includes': list(GUIDE_FILES.keys()),
    },
]


def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(DARK_BG)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    canvas.setFillColor(ORANGE)
    canvas.rect(0, H - 3, W, 3, fill=1, stroke=0)
    canvas.setFillColor(ZINC_600)
    canvas.setFont('Helvetica', 8)
    canvas.drawCentredString(W / 2, 8 * mm, 'wtfagents.com  ·  © 2026 WTF Agents')
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
                                 fontName='Helvetica-Bold', alignment=TA_LEFT, spaceAfter=6)
    cover_sub = ParagraphStyle('cover_sub', fontSize=16, leading=24, textColor=ORANGE,
                               fontName='Helvetica-Bold', alignment=TA_LEFT, spaceAfter=6)
    cover_desc = ParagraphStyle('cover_desc', fontSize=13, leading=21, textColor=ZINC_300,
                                fontName='Helvetica', spaceAfter=6)
    cover_meta = ParagraphStyle('cover_meta', fontSize=10, leading=15, textColor=ZINC_400,
                                fontName='Helvetica', alignment=TA_LEFT)
    small = ParagraphStyle('small', fontSize=9, leading=14, textColor=ZINC_600, fontName='Helvetica')
    contents_h = ParagraphStyle('contents_h', fontSize=13, leading=19, textColor=WHITE,
                                fontName='Helvetica-Bold', spaceBefore=8, spaceAfter=6)
    item = ParagraphStyle('item', fontSize=11, leading=18, textColor=ZINC_300, fontName='Helvetica')

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
        Paragraph('WTF Agents · wtfagents.com', cover_meta),
        Paragraph('Part of the WTF Agents Guide Series · wtfagents.com/store', small),
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

        out = os.path.join(GUIDES_DIR, bundle['file'])
        with open(out, 'wb') as fh:
            writer.write(fh)
        size_kb = os.path.getsize(out) / 1024
        print(f"✓ {bundle['file']} — {len(bundle['includes'])} guides, "
              f"{len(writer.pages)} pages, {size_kb:.0f} KB")


if __name__ == '__main__':
    main()
