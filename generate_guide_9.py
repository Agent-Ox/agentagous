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

OUTPUT = '/Users/thomasoxlee/agentagous/public/guides/wtf-is-claude.pdf'

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
    title='WTF is Claude', author='WTF Agents',
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
story.append(Paragraph('Claude?', cover_sub))
story.append(Spacer(1, 4*mm))
story.append(rule())
story.append(Paragraph(
    'The AI model powering OpenClaw, Claude Code, and much of the agentic economy. '
    'Built by Anthropic with safety at its core. '
    'As of March 2026, one of the most capable and widely deployed AI models in the world.',
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
    'Claude is Anthropic\'s AI model — a Large Language Model trained to be helpful, honest, '
    'and harmless, with a particular focus on safety and reliability for agentic use.',
    body_lead))
story.append(Paragraph(
    'It is the brain inside OpenClaw (the most-starred open-source agent), '
    'the engine behind Claude Code (the most-loved coding tool among developers), '
    'and one of the three frontier models competing at the top of every major AI benchmark.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 2 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The model family — what\'s available in March 2026', section_heading))
story.append(rule())
story.append(Paragraph(
    'Claude is not a single model — it is a family of models at different price and capability points:',
    body))

models = [
    ('Claude Opus 4.6', 'The most powerful model in the family. Best for complex reasoning, long autonomous tasks, and demanding agentic workflows. SWE-bench score: 75.6% (real software engineering tasks). Context window: up to 1 million tokens (beta). Output: up to 128,000 tokens.'),
    ('Claude Sonnet 4.6', 'The mid-tier model. Faster than Opus, more affordable, with strong agentic capabilities. Best for most business use cases where you need capability without Opus-level cost.'),
    ('Claude Haiku 4.x', 'The fastest and most cost-effective model. Best for high-volume, lower-complexity tasks where speed and cost matter more than raw capability.'),
]

for name, desc in models:
    story.append(Paragraph(name, subheading))
    story.append(Paragraph(desc, body))

story.append(Spacer(1, 4*mm))

# ── SECTION 3 ────────────────────────────────────────────────────────────────
story.append(Paragraph('How Claude compares to the competition', section_heading))
story.append(rule())
story.append(Paragraph(
    'As of March 2026, three frontier models compete at the top of AI benchmarks:',
    body))

comparison = [
    [Paragraph('Model', hs), Paragraph('Made by', hs), Paragraph('SWE-bench', hs), Paragraph('Key strength', hs)],
    [Paragraph('Claude Opus 4.6', cs), Paragraph('Anthropic', cs), Paragraph('75.6%', cs), Paragraph('Agentic reliability, safety, honesty', cs)],
    [Paragraph('Gemini 3.1 Pro', cs), Paragraph('Google', cs), Paragraph('80.6%', cs), Paragraph('Highest benchmark score, Google ecosystem', cs)],
    [Paragraph('GPT-5.4', cs), Paragraph('OpenAI', cs), Paragraph('57.7%*', cs), Paragraph('Native computer use, consumer reach', cs)],
]

t = Table(comparison, colWidths=[38*mm, 28*mm, 25*mm, 69*mm])
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), ZINC_800),
    ('GRID', (0,0), (-1,-1), 0.5, ZINC_600),
    ('PADDING', (0,0), (-1,-1), 8),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [DARK_BG, ZINC_900]),
]))
story.append(KeepTogether([t]))
story.append(Spacer(1, 3*mm))
story.append(Paragraph('* GPT-5.4 SWE-bench Pro score. Benchmark methodologies vary.', small))
story.append(Spacer(1, 4*mm))
story.append(Paragraph(
    'Raw benchmark scores tell part of the story. What they do not capture: '
    'Claude\'s reputation for being more honest, more nuanced, and more reliable '
    'in real-world agentic deployments. Developers building serious autonomous systems '
    'consistently report Claude behaving more predictably than alternatives — '
    'declining harmful requests more gracefully, flagging ambiguity rather than guessing, '
    'and handling edge cases more sensibly.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 4 ────────────────────────────────────────────────────────────────
story.append(Paragraph('What Claude can actually do', section_heading))
story.append(rule())

capabilities = [
    ('Write and edit', 'Any style, any length, any format. Essays, code, emails, legal documents, marketing copy, technical documentation. Claude adapts to context better than almost any other model.'),
    ('Reason through complex problems', 'Multi-step logical problems, mathematical reasoning, strategic analysis. Claude thinks through problems step by step rather than pattern-matching to a quick answer.'),
    ('Read and analyse long documents', 'With a 1 million token context window (beta), Claude can read entire codebases, long legal documents, or research papers in a single session.'),
    ('Write, debug, and explain code', 'Across all major programming languages. Claude Code (the agentic version) takes this further — it reads codebases, writes code, runs tests, and commits to Git autonomously.'),
    ('Use tools via MCP', 'Browse the web, read files, query databases, call APIs, send emails — through the Model Context Protocol that Anthropic invented.'),
    ('Maintain long conversations', 'Unlike models with small context windows, Claude can maintain coherent conversations and task execution over very long sessions — critical for autonomous agent work.'),
    ('Be honest about uncertainty', 'A genuinely unusual capability: Claude is trained to say "I don\'t know" rather than confidently hallucinate. Constitutional AI makes this more reliable than in competing models.'),
]

for cap, desc in capabilities:
    story.append(Paragraph(f'<b>{cap}</b> — {desc}',
        ParagraphStyle('cap', fontSize=10.5, leading=17, textColor=ZINC_300, fontName='Helvetica', spaceAfter=6)))

story.append(Spacer(1, 4*mm))

# ── SECTION 5 ────────────────────────────────────────────────────────────────
story.append(Paragraph('What makes Claude different — Constitutional AI in practice', section_heading))
story.append(rule())
story.append(Paragraph(
    'Every major AI model is trained to be helpful. '
    'What makes Claude different is how it was trained to handle the hard cases.',
    body))
story.append(Paragraph(
    'Constitutional AI (CAI) — Anthropic\'s training technique — gives Claude a set of '
    'principles to evaluate its own outputs against. The result is a model that:',
    body))
story.append(Paragraph('→  Declines harmful requests more gracefully — explaining why rather than just refusing.', bullet))
story.append(Paragraph('→  Flags ambiguity rather than making assumptions that could cause downstream problems.', bullet))
story.append(Paragraph('→  Maintains consistent values across different phrasings of the same request.', bullet))
story.append(Paragraph('→  Is more honest about what it does not know.', bullet))
story.append(Spacer(1, 3*mm))
story.append(Paragraph(
    'For agentic use — where Claude is running autonomously for hours, making judgment calls '
    'constantly without human supervision — these properties matter enormously. '
    'An agent that hallucinates confidently, makes assumptions silently, '
    'or behaves inconsistently is a dangerous agent. '
    'Claude\'s training makes it significantly more reliable in these scenarios.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 6 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Claude\'s role in the agentic economy', section_heading))
story.append(rule())
story.append(Paragraph(
    'Claude is not just a chatbot. It is the infrastructure of the agentic economy.',
    body_lead))

roles = [
    ('OpenClaw\'s default LLM', 'The most-starred open-source agent project uses Claude as its primary model. 247,000 GitHub stars worth of developers are building with Claude under the hood.'),
    ('Claude Code', 'Anthropic\'s own agentic coding tool — ranked "most loved" by 46% of developers in 2026, ahead of Cursor (19%) and GitHub Copilot (9%).'),
    ('Paperclip integration', 'Paperclip — the multi-agent company orchestration framework — lists Claude Code as a primary supported agent.'),
    ('Thousands of applications', 'Via the Anthropic API, Claude powers customer service agents, research tools, writing assistants, legal analysis tools, and more across thousands of businesses.'),
    ('AWS and Google Cloud', 'Available via Amazon Bedrock and Google Vertex AI — the two largest enterprise cloud platforms. This means Claude is accessible inside existing enterprise infrastructure without new vendor relationships.'),
]

for name, desc in roles:
    story.append(Paragraph(f'<b>{name}</b> — {desc}',
        ParagraphStyle('role', fontSize=10.5, leading=17, textColor=ZINC_300, fontName='Helvetica', spaceAfter=6)))

story.append(Spacer(1, 4*mm))

# ── SECTION 7 ────────────────────────────────────────────────────────────────
story.append(Paragraph('How to access Claude', section_heading))
story.append(rule())

access = [
    ('Claude.ai', 'The consumer chat interface. Free tier available; Claude Pro ($20/month) for higher limits and priority access.'),
    ('Anthropic API', 'Direct API access for developers. Pay per token. Pricing varies by model (Haiku cheapest, Opus most expensive).'),
    ('Amazon Bedrock', 'Claude via AWS. For teams already in the AWS ecosystem.'),
    ('Google Vertex AI', 'Claude via Google Cloud. For teams already in the Google ecosystem.'),
    ('OpenClaw', 'Free. Connects to Claude via your own Anthropic API key.'),
    ('Claude Code', 'Available as a command-line tool. Requires an Anthropic API key.'),
]

for name, desc in access:
    story.append(Paragraph(f'<b>{name}</b> — {desc}',
        ParagraphStyle('acc', fontSize=10.5, leading=17, textColor=ZINC_300, fontName='Helvetica', spaceAfter=6)))

story.append(Spacer(1, 4*mm))

# ── GLOSSARY ─────────────────────────────────────────────────────────────────
story.append(Paragraph('Glossary', section_heading))
story.append(rule())

glossary = [
    ('Claude', 'Anthropic\'s AI model family. Includes Opus (most powerful), Sonnet (balanced), and Haiku (fastest).'),
    ('Claude Opus 4.6', 'The flagship model. 75.6% SWE-bench, 1M token context window, 128K output tokens.'),
    ('Constitutional AI (CAI)', 'Anthropic\'s training technique. Gives Claude principles to evaluate its own outputs. Makes Claude more reliable and honest.'),
    ('SWE-bench', 'The industry benchmark for AI coding ability. Measures how well a model can solve real software engineering problems.'),
    ('Context window', 'How much text Claude can process at once. Claude Opus 4.6: up to 1 million tokens (beta) — enough for entire codebases.'),
    ('MCP (Model Context Protocol)', 'The open standard Claude uses to connect to external tools. Invented by Anthropic, now an open standard.'),
    ('Claude Code', 'The agentic version of Claude for coding. Reads codebases, writes code, runs tests, commits to Git — autonomously.'),
    ('Anthropic API', 'Developer access to Claude. Pay per token. Required for OpenClaw, Paperclip, and custom agent builds.'),
    ('Amazon Bedrock', 'AWS\'s managed AI service. Hosts Claude for enterprise teams in the AWS ecosystem.'),
    ('Token', 'The unit Claude uses to process text. Roughly 0.75 words. You pay for API usage in tokens.'),
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
story.append(Paragraph('Claude is the model. Here is everything around it.', body))
story.append(Spacer(1, 4*mm))

next_guides = [
    ('WTF is Claude Code', 'Claude acting as an autonomous developer. The full story on the most-loved coding agent.', 'wtfagents.com/store'),
    ('WTF is Anthropic', 'The company that built Claude. The founding story, the safety mission, the $380B valuation.', 'wtfagents.com/store'),
    ('WTF is an LLM', 'The technical foundation behind Claude. Plain English, no maths.', 'wtfagents.com/store'),
    ('WTF is OpenClaw', 'The viral open-source agent that uses Claude as its default brain.', 'wtfagents.com/store'),
    ('WTF is an AI Agent', 'What Claude becomes when it is given tools, memory, and a goal.', 'wtfagents.com/store'),
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
