#!/usr/bin/env python3
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, PageBreak, Table, TableStyle, KeepTogether
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
import qrcode
import io
from reportlab.platypus import Image as RLImage

OUTPUT = '/Users/thomasoxlee/agentagous/public/guides/wtf-is-anthropic.pdf'

ORANGE = HexColor('#f97316')
DARK_BG = HexColor('#09090b')
ZINC_900 = HexColor('#18181b')
ZINC_800 = HexColor('#27272a')
ZINC_400 = HexColor('#a1a1aa')
ZINC_300 = HexColor('#d4d4d8')
ZINC_600 = HexColor('#52525b')
WHITE = HexColor('#ffffff')

W, H = A4

doc = SimpleDocTemplate(
    OUTPUT, pagesize=A4,
    leftMargin=20*mm, rightMargin=20*mm,
    topMargin=22*mm, bottomMargin=22*mm,
    title='WTF is Anthropic', author='WTF Agents',
)

cover_title = ParagraphStyle('cover_title', fontSize=38, leading=46, textColor=WHITE, fontName='Helvetica-Bold', alignment=TA_LEFT, spaceAfter=6)
cover_sub = ParagraphStyle('cover_sub', fontSize=16, leading=24, textColor=ORANGE, fontName='Helvetica-Bold', alignment=TA_LEFT, spaceAfter=6)
cover_desc = ParagraphStyle('cover_desc', fontSize=13, leading=21, textColor=ZINC_300, fontName='Helvetica', spaceAfter=6)
cover_meta = ParagraphStyle('cover_meta', fontSize=10, leading=15, textColor=ZINC_400, fontName='Helvetica', alignment=TA_LEFT)
section_heading = ParagraphStyle('section_heading', fontSize=20, leading=26, textColor=ORANGE, fontName='Helvetica-Bold', spaceBefore=12, spaceAfter=4)
subheading = ParagraphStyle('subheading', fontSize=13, leading=19, textColor=WHITE, fontName='Helvetica-Bold', spaceBefore=8, spaceAfter=3)
body = ParagraphStyle('body', fontSize=10.5, leading=17, textColor=ZINC_300, fontName='Helvetica', spaceAfter=7, alignment=TA_JUSTIFY)
body_lead = ParagraphStyle('body_lead', fontSize=12, leading=19, textColor=ORANGE, fontName='Helvetica-Bold', spaceAfter=8)
bullet = ParagraphStyle('bullet', fontSize=10.5, leading=17, textColor=ZINC_300, fontName='Helvetica', spaceAfter=4, leftIndent=14)
small = ParagraphStyle('small', fontSize=9, leading=13, textColor=ZINC_600, fontName='Helvetica', spaceAfter=3)
footer_s = ParagraphStyle('footer_s', fontSize=8.5, leading=12, textColor=ZINC_600, fontName='Helvetica', alignment=TA_CENTER)
cs = ParagraphStyle('cs', fontSize=8.5, leading=13, textColor=ZINC_300, fontName='Helvetica')
hs = ParagraphStyle('hs', fontSize=8.5, leading=13, textColor=ORANGE, fontName='Helvetica-Bold')

def rule(color=ORANGE, thickness=2):
    return HRFlowable(width='100%', thickness=thickness, color=color, spaceAfter=8, spaceBefore=2)

def zinc_rule():
    return HRFlowable(width='100%', thickness=0.5, color=ZINC_600, spaceAfter=6, spaceBefore=6)

def make_qr(url):
    qr = qrcode.QRCode(version=2, error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=6, border=2)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color='#f97316', back_color='#09090b')
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)
    return RLImage(buf, width=38*mm, height=38*mm)

story = []

# ── COVER ────────────────────────────────────────────────────────────────────
story.append(Spacer(1, 20*mm))
story.append(Paragraph('WTF is', cover_title))
story.append(Paragraph('Anthropic?', cover_sub))
story.append(Spacer(1, 4*mm))
story.append(rule())
story.append(Paragraph(
    'The $380 billion AI safety lab founded by the people who left OpenAI. '
    'Builders of Claude. Inventors of Constitutional AI and the Model Context Protocol. '
    'Arguably the most important AI company most people have never properly understood.',
    cover_desc))
story.append(Spacer(1, 32*mm))
story.append(zinc_rule())
story.append(Paragraph('WTF Agents · wtfagents.com · March 2026', cover_meta))
story.append(Paragraph('Part of the WTF Agents Guide Series · wtfagents.com/store', small))
story.append(PageBreak())

# ── SECTION 1 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The one-liner', section_heading))
story.append(rule())
story.append(Paragraph(
    'Anthropic is an AI safety company that builds some of the most powerful AI models in the world — '
    'including Claude — while simultaneously arguing that those models could be among the most '
    'dangerous technologies ever created.',
    body_lead))
story.append(Paragraph(
    'That tension is not a contradiction. It is Anthropic\'s core philosophy: '
    'if powerful AI is coming regardless, it is better to have safety-focused labs at the frontier '
    'than to cede that ground to labs that prioritise capability over safety.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 2 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The founding story — the OpenAI exodus', section_heading))
story.append(rule())
story.append(Paragraph(
    'To understand Anthropic, you need to understand where it came from.',
    body))
story.append(Paragraph(
    'In 2021, a group of senior researchers and executives left OpenAI — '
    'then the world\'s most prominent AI lab — amid internal disagreements about '
    'the direction of the organisation. The core concern: as OpenAI became more '
    'commercially successful (especially after the Microsoft investment), '
    'some believed it was prioritising capability and speed over safety.',
    body))
story.append(Paragraph(
    'The exodus was led by siblings Dario Amodei (then VP of Research at OpenAI) '
    'and Daniela Amodei (then VP of Operations). They left together with a team of '
    'senior researchers including Tom Brown (lead author of GPT-3), Chris Olah '
    '(pioneering interpretability researcher), Sam McCandlish, Jack Clark, and Jared Kaplan.',
    body))
story.append(Paragraph(
    'They founded Anthropic in 2021 with a stated mission: '
    '"the responsible development and maintenance of advanced AI for the long-term benefit of humanity."',
    body_lead))
story.append(Paragraph(
    'Anthropic is structured as a Public Benefit Corporation — not a standard for-profit — '
    'signalling a legal commitment to considerations beyond shareholder returns.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 3 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The scale — $380 billion and growing', section_heading))
story.append(rule())
story.append(Paragraph(
    'Anthropic is no longer a scrappy safety research lab. It is one of the most valuable '
    'private companies in the world.',
    body))

stats = [
    ('$380B', 'Valuation as of February 2026'),
    ('$30B', 'Funding round closed February 2026 — largest single AI fundraise in history'),
    ('Amazon', 'Lead investor — $4B+ committed, with Claude available via AWS Bedrock'),
    ('Google', 'Major investor — Claude available via Google Cloud Vertex AI'),
    ('Nvidia', 'Investor — strategic partnership on AI infrastructure'),
]

table_data = [[Paragraph(v, hs), Paragraph(l, cs)] for v, l in stats]
t = Table(table_data, colWidths=[35*mm, 125*mm])
t.setStyle(TableStyle([
    ('GRID', (0,0), (-1,-1), 0.5, ZINC_600),
    ('BACKGROUND', (0,0), (-1,-1), ZINC_900),
    ('PADDING', (0,0), (-1,-1), 10),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('ROWBACKGROUNDS', (0,0), (-1,-1), [ZINC_900, DARK_BG]),
]))
story.append(KeepTogether([t]))
story.append(Spacer(1, 4*mm))
story.append(Paragraph(
    'Dario and Daniela Amodei\'s net worth is estimated at approximately $7 billion each '
    'as of 2026 — a remarkable outcome for researchers who left a previous employer '
    'over principled disagreements about AI safety.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 4 ────────────────────────────────────────────────────────────────
story.append(Paragraph('What makes Anthropic different', section_heading))
story.append(rule())

story.append(Paragraph('1. Safety as the founding principle', subheading))
story.append(Paragraph(
    'Every major AI lab talks about safety. Anthropic was founded because of it. '
    'The company\'s research agenda includes significant investment in interpretability '
    '(understanding why AI models produce the outputs they do) and alignment '
    '(ensuring AI systems pursue the goals humans actually intend). '
    'Most competitors do far less of this.',
    body))

story.append(Paragraph('2. Constitutional AI', subheading))
story.append(Paragraph(
    'Anthropic invented a training technique called Constitutional AI (CAI). '
    'Instead of relying purely on human feedback to teach models to be helpful and harmless, '
    'CAI gives the model a set of principles — a "constitution" — '
    'and trains it to critique and revise its own outputs against those principles.',
    body))
story.append(Paragraph(
    'The result is a model that is more reliably honest, more consistent in its values, '
    'and better at handling difficult edge cases — not because it is restricted, '
    'but because it has internalised good values through training.',
    body))

story.append(Paragraph('3. Interpretability research', subheading))
story.append(Paragraph(
    'Chris Olah, one of Anthropic\'s co-founders, is the world\'s leading researcher in '
    'mechanistic interpretability — understanding the internal workings of neural networks. '
    'Anthropic\'s interpretability team publishes research that peers at competitors largely do not. '
    'This matters because you cannot fix what you cannot understand.',
    body))

story.append(Paragraph('4. The Model Context Protocol (MCP)', subheading))
story.append(Paragraph(
    'In November 2024, Anthropic published MCP — an open standard that lets AI agents '
    'connect to any external tool or data source. '
    'Think of it as USB-C for AI: a universal plug that works with any system. '
    'MCP has since been adopted by OpenAI, Google, Microsoft, and virtually all major '
    'agent frameworks. Anthropic donated MCP to the Agentic AI Foundation (AAIF) — '
    'a neutral home under the Linux Foundation, backed by Anthropic, OpenAI, Google, '
    'Microsoft, Amazon, Cloudflare, and Bloomberg.',
    body))

story.append(Paragraph('5. Public Benefit Corporation structure', subheading))
story.append(Paragraph(
    'Unlike OpenAI (which converted to a for-profit structure) or Google and Microsoft '
    '(publicly traded companies with shareholder obligations), '
    'Anthropic\'s PBC structure legally allows it to prioritise its stated mission '
    'over pure profit maximisation.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 5 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The products', section_heading))
story.append(rule())
story.append(Paragraph(
    'Anthropic\'s commercial products are all built around Claude:',
    body))

products = [
    ('Claude', 'The flagship AI model family. Powers everything else. See the WTF is Claude guide for the full story.'),
    ('Claude Code', 'An autonomous coding agent. Reads codebases, writes and edits code, runs tests, commits to Git. The most-loved coding tool among developers in 2026.'),
    ('Claude.ai', 'The consumer chat interface. Anthropic\'s equivalent of ChatGPT.'),
    ('Anthropic API', 'Developer access to Claude models. Used by OpenClaw, Paperclip, and thousands of applications.'),
    ('Amazon Bedrock', 'Claude models available via AWS. Part of Anthropic\'s strategic partnership with Amazon.'),
    ('Google Vertex AI', 'Claude models available via Google Cloud. Part of Anthropic\'s strategic partnership with Google.'),
]

for name, desc in products:
    story.append(Paragraph(f'<b>{name}</b> — {desc}',
        ParagraphStyle('prod', fontSize=10.5, leading=17, textColor=ZINC_300, fontName='Helvetica', spaceAfter=6)))

story.append(Spacer(1, 4*mm))

# ── SECTION 6 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The honest tension — safety lab or AI arms race participant?', section_heading))
story.append(rule())
story.append(Paragraph(
    'Anthropic occupies a genuinely unusual position: a company that argues AI may be '
    'one of the most dangerous technologies in human history, and then builds it anyway.',
    body_lead))
story.append(Paragraph(
    'Dario Amodei has been explicit about this. He has described Anthropic as potentially '
    '"a company that could be building one of the most transformative and potentially '
    'dangerous technologies in human history, and yet presses forward anyway." '
    'The justification: safety-focused labs need to be at the frontier, '
    'not watching from the sidelines while others build without safety constraints.',
    body))
story.append(Paragraph(
    'Critics point out that this logic can justify almost anything. '
    'A $380 billion valuation also creates its own commercial pressures '
    'that may not always align with pure safety priorities.',
    body))
story.append(Paragraph(
    'Supporters note that Anthropic\'s actual research output — '
    'on interpretability, Constitutional AI, and alignment — '
    'is substantively different from competitors who publish less safety research '
    'while claiming equivalent commitment.',
    body))
story.append(Paragraph(
    'The honest answer: Anthropic is probably the most safety-focused lab at the frontier. '
    'Whether that is enough — given the speed of the technology\'s development — '
    'is one of the most important open questions in AI.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 7 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Why Anthropic matters for the agentic economy', section_heading))
story.append(rule())
story.append(Paragraph(
    'Anthropic\'s fingerprints are on almost every important development in the agentic economy:',
    body))
story.append(Paragraph('→  <b>Claude</b> is the default LLM for OpenClaw, the most-starred open-source agent project.', bullet))
story.append(Paragraph('→  <b>Claude Code</b> is the most-loved coding agent, used by Paperclip and thousands of developers.', bullet))
story.append(Paragraph('→  <b>MCP</b> is the universal standard connecting agents to tools — the plumbing of the agentic economy.', bullet))
story.append(Paragraph('→  <b>Constitutional AI</b> is why Claude-powered agents behave more reliably and honestly than alternatives.', bullet))
story.append(Paragraph('→  <b>The AAIF</b> (which Anthropic co-founded) is the neutral home for open agentic standards.', bullet))
story.append(Spacer(1, 3*mm))
story.append(Paragraph(
    'You can build in the agentic economy without ever thinking about Anthropic. '
    'But understanding Anthropic helps you understand why the tools work the way they do — '
    'and why that matters.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 8 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The key people', section_heading))
story.append(rule())

people = [
    ('Dario Amodei', 'CEO and co-founder. Former VP of Research at OpenAI. The public face of Anthropic. Estimated net worth ~$7B.'),
    ('Daniela Amodei', 'President and co-founder. Former VP of Operations at OpenAI. Runs the business side of Anthropic.'),
    ('Chris Olah', 'Co-founder. The world\'s leading mechanistic interpretability researcher. Pioneering work on understanding neural networks from the inside.'),
    ('Tom Brown', 'Co-founder. Lead author of the GPT-3 paper — one of the most important AI papers ever written.'),
    ('Jared Kaplan', 'Co-founder. Developed neural scaling laws — the mathematical relationship between model size, data, and capability that guides how labs train models.'),
]

for name, desc in people:
    story.append(Paragraph(f'<b>{name}</b> — {desc}',
        ParagraphStyle('person', fontSize=10.5, leading=17, textColor=ZINC_300, fontName='Helvetica', spaceAfter=6)))

story.append(Spacer(1, 4*mm))

# ── GLOSSARY ─────────────────────────────────────────────────────────────────
story.append(Paragraph('Glossary', section_heading))
story.append(rule())

glossary = [
    ('Anthropic', 'AI safety company founded in 2021. Builders of Claude. $380B valuation. Structured as a Public Benefit Corporation.'),
    ('Constitutional AI (CAI)', 'Anthropic\'s training technique that gives AI models a set of principles to evaluate their own outputs against.'),
    ('Interpretability', 'Research into understanding the internal workings of AI models — why they produce the outputs they do.'),
    ('Alignment', 'The problem of ensuring AI systems pursue the goals humans actually intend, not something subtly different.'),
    ('MCP (Model Context Protocol)', 'Anthropic\'s open standard for connecting AI agents to external tools. Published November 2024. Donated to the AAIF.'),
    ('AAIF (Agentic AI Foundation)', 'A directed fund under the Linux Foundation. Co-founded by Anthropic, Block, and OpenAI. Neutral home for MCP and other open agentic standards.'),
    ('Public Benefit Corporation', 'A corporate structure that legally allows a company to prioritise its stated mission alongside profit.'),
    ('Scaling laws', 'Mathematical relationships describing how AI capability improves with model size, data, and compute. Discovered partly by Jared Kaplan.'),
    ('Claude', 'Anthropic\'s flagship AI model. The most-used LLM in the agentic economy.'),
    ('Amazon Bedrock', 'AWS\'s managed AI service. Hosts Claude models as part of Anthropic\'s strategic partnership with Amazon.'),
]

for term, definition in glossary:
    story.append(Paragraph(
        f'<b>{term}</b> — {definition}',
        ParagraphStyle('gl', fontSize=10, leading=16, textColor=ZINC_300, fontName='Helvetica', spaceAfter=5)))

story.append(Spacer(1, 6*mm))

# ── READ NEXT ────────────────────────────────────────────────────────────────
story.append(PageBreak())
story.append(Paragraph('Liked this? Go deeper.', section_heading))
story.append(rule())
story.append(Paragraph('Anthropic is the company. Here are the products.', body))
story.append(Spacer(1, 4*mm))

next_guides = [
    ('WTF is Claude', 'Anthropic\'s flagship model. The AI powering most of the agentic economy. The full story.', 'wtfagents.com/store'),
    ('WTF is Claude Code', 'The autonomous coding agent. How it works, what it can do, why developers love it.', 'wtfagents.com/store'),
    ('WTF is an LLM', 'The technical foundation behind Claude and every other AI model. Plain English, no maths.', 'wtfagents.com/store'),
    ('WTF is the Agentic Economy', 'Where Anthropic fits in the $52B+ market reshaping business and employment.', 'wtfagents.com/store'),
    ('WTF is Cowork', 'Claude Code was for developers. Cowork is for everyone else. The product that wiped $285B off enterprise software stocks.', 'wtfagents.com/store'),
]
for title, desc, url in next_guides:
    story.append(Paragraph(f'<b>{title}</b>', ParagraphStyle('ng_title', fontSize=11, leading=16, textColor=ORANGE, fontName='Helvetica-Bold', spaceAfter=1)))
    story.append(Paragraph(desc, ParagraphStyle('ng_desc', fontSize=10, leading=15, textColor=ZINC_400, fontName='Helvetica', spaceAfter=1, leftIndent=8)))
    story.append(Paragraph(f'<link href="https://{url}" color="#f97316">{url}</link>', ParagraphStyle('ng_link', fontSize=9, leading=13, textColor=ORANGE, fontName='Helvetica', spaceAfter=8, leftIndent=8)))

story.append(zinc_rule())
story.append(Spacer(1, 4*mm))
story.append(Paragraph('Want this level of insight every Monday?', ParagraphStyle('cta_h', fontSize=14, leading=20, textColor=WHITE, fontName='Helvetica-Bold', spaceAfter=4)))
story.append(Paragraph('WTF Agents Intelligence — the weekly briefing on the agentic economy. Real data, real companies, real insight. Every Monday. $49/month.', body))
story.append(Paragraph('<link href="https://wtfagents.com/intelligence" color="#f97316">wtfagents.com/intelligence →</link>',
    ParagraphStyle('cta_link', fontSize=11, leading=16, textColor=ORANGE, fontName='Helvetica-Bold', spaceAfter=10)))
story.append(zinc_rule())
story.append(Spacer(1, 6*mm))

qr_img = make_qr('https://wtfagents.com/store')
qr_table = Table([[qr_img, Paragraph(
    '<b>Scan to browse all guides</b>\n\nAll 11 WTF Agents guides at wtfagents.com/store\n\n$7 each · Bundles from $29 · Instant PDF download',
    ParagraphStyle('qr_text', fontSize=10, leading=16, textColor=ZINC_300, fontName='Helvetica', spaceAfter=4)
)]], colWidths=[45*mm, 115*mm])
qr_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ('TOPPADDING', (0,0), (-1,-1), 0),
    ('BOTTOMPADDING', (0,0), (-1,-1), 0),
]))
story.append(qr_table)
story.append(Spacer(1, 8*mm))
story.append(zinc_rule())
story.append(Paragraph('WTF Agents · wtfagents.com · The autonomous company economy is here. WTF is happening.', footer_s))
story.append(Paragraph('© 2026 WTF Agents. All rights reserved.', footer_s))

def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(DARK_BG)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    canvas.setFillColor(ORANGE)
    canvas.rect(0, H - 3, W, 3, fill=1, stroke=0)
    canvas.setFillColor(ZINC_600)
    canvas.setFont('Helvetica', 8)
    canvas.drawCentredString(W/2, 8*mm, f'wtfagents.com  ·  Page {doc.page}  ·  © 2026 WTF Agents')
    canvas.restoreState()

doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
print(f'✓ PDF generated: {OUTPUT}')
