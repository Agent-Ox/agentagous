#!/usr/bin/env python3
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, PageBreak, Table, TableStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
import qrcode
import io
from reportlab.platypus import Image as RLImage

OUTPUT = '/Users/thomasoxlee/agentagous/public/guides/wtf-is-paperclip.pdf'

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
    title='WTF is Paperclip', author='WTF Agents',
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
story.append(Paragraph('Paperclip?', cover_sub))
story.append(Spacer(1, 4*mm))
story.append(rule())
story.append(Paragraph(
    'If OpenClaw is a single AI employee and Polsia is a managed company service, '
    'Paperclip is the org chart. The open-source framework for running entire companies '
    'with teams of AI agents — each with a role, a set of tools, and a goal.',
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
    'Paperclip is an open-source orchestration framework that lets you build a multi-agent '
    '"company org chart" — assigning roles, workflows, and goals across multiple AI agents '
    'that coordinate together to run a business.',
    body_lead))
story.append(Paragraph(
    'Tagline: "Any agent, any runtime, one org chart."',
    body))
story.append(Paragraph(
    'It is not a managed service like Polsia. It is not a single personal agent like OpenClaw. '
    'It is infrastructure — the coordination layer that sits above individual agents '
    'and makes them work as a team.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 2 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The key insight — agents need coordination', section_heading))
story.append(rule())
story.append(Paragraph(
    'Running a company — even a small one — requires multiple types of work happening simultaneously. '
    'A developer building the product. A marketer generating leads. '
    'A support agent handling customers. A finance agent tracking revenue.',
    body))
story.append(Paragraph(
    'A single AI agent can do any one of these things. '
    'But coordinating all of them — making sure the developer knows what the marketer is promising, '
    'that the support agent knows what the product can do, '
    'that the finance agent tracks what the sales agent closes — '
    'requires something more than a single agent.',
    body))
story.append(Paragraph(
    'That is what Paperclip does. It gives each agent a role, connects them, '
    'and coordinates their work toward a shared goal.',
    body_lead))
story.append(Spacer(1, 4*mm))

# ── SECTION 3 ────────────────────────────────────────────────────────────────
story.append(Paragraph('How it works', section_heading))
story.append(rule())
story.append(Paragraph(
    'Paperclip is built on Node.js with a React UI. You self-host it — '
    'it runs on your own machine or server.',
    body))

story.append(Paragraph('The org chart model', subheading))
story.append(Paragraph(
    'You define your company as an org chart. Each node in the chart is an agent with:',
    body))
story.append(Paragraph('→  A role (CEO, Marketing Lead, Developer, Support Agent)', bullet))
story.append(Paragraph('→  A set of tools (web browser, code editor, email, database access)', bullet))
story.append(Paragraph('→  A goal (grow revenue, ship features, resolve tickets)', bullet))
story.append(Paragraph('→  Reporting lines (which agents it coordinates with)', bullet))
story.append(Spacer(1, 3*mm))

story.append(Paragraph('The runtime', subheading))
story.append(Paragraph(
    'Paperclip is "runtime agnostic" — it does not care which AI agents or tools you use. '
    'You can plug in Claude Code for development, OpenClaw for communications, '
    'Cursor for code editing, and any other MCP-compatible tool. '
    'The framework coordinates them regardless of origin.',
    body))

story.append(Paragraph('Supported agents and tools', subheading))
story.append(Paragraph('From the Paperclip GitHub release notes:', body))
story.append(Paragraph('→  Claude Code (Anthropic)', bullet))
story.append(Paragraph('→  OpenClaw', bullet))
story.append(Paragraph('→  Cursor (AI code editor)', bullet))
story.append(Paragraph('→  OpenCode', bullet))
story.append(Paragraph('→  Codex (OpenAI)', bullet))
story.append(Paragraph('→  Pi (Inflection AI)', bullet))
story.append(Spacer(1, 4*mm))

# ── SECTION 4 ────────────────────────────────────────────────────────────────
story.append(Paragraph('ClipMart — the killer feature coming soon', section_heading))
story.append(rule())
story.append(Paragraph(
    'The most anticipated feature in Paperclip is ClipMart — a marketplace listed as '
    '"COMING SOON" on the GitHub repository as of March 2026.',
    body_lead))
story.append(Paragraph(
    'The description from the GitHub README:',
    body))
story.append(Paragraph(
    '"Download and run entire companies with one click. Browse pre-built company templates — '
    'full org structures, agent configs, and skills — and import them into your '
    'Paperclip instance in seconds."',
    ParagraphStyle('quote', fontSize=11, leading=17, textColor=ORANGE, fontName='Helvetica-Oblique',
                  spaceAfter=8, leftIndent=12, rightIndent=12)))
story.append(Paragraph(
    'If ClipMart delivers on this promise, it means you will be able to download '
    'a pre-built "roofing company" or "content agency" or "SaaS analytics tool" — '
    'complete with the full agent org chart, configured tools, and pre-written workflows — '
    'and be running it within minutes.',
    body))
story.append(Paragraph(
    'This would make Paperclip the most powerful self-hosted alternative to Polsia — '
    'with the added advantage of owning everything yourself and paying no revenue share.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 5 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The GitHub story', section_heading))
story.append(rule())
story.append(Paragraph(
    'Paperclip accumulated 13,500 GitHub stars within days of its open-source launch — '
    'a remarkable velocity that signals significant developer interest.',
    body_lead))
story.append(Paragraph(
    'The founder of Paperclip has not been publicly identified in available press as of March 2026. '
    'The project is listed under the "paperclipai" GitHub organisation. '
    'This anonymity is unusual for a project of this scale — '
    'but not unprecedented in the open-source world.',
    body))
story.append(Paragraph(
    'Active releases are available on GitHub at github.com/paperclipai/paperclip. '
    'The community is growing. The codebase is being actively maintained.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 6 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Paperclip vs OpenClaw vs Polsia', section_heading))
story.append(rule())

comparison = [
    ['', 'Paperclip', 'OpenClaw', 'Polsia'],
    ['What it is', 'Multi-agent orchestration framework', 'Personal AI agent', 'Managed company platform'],
    ['Runs where', 'Your servers (self-hosted)', 'Your machine', 'Polsia\'s servers'],
    ['Cost', 'Free (open source)', 'Free (+ LLM costs)', '$50/mo + 20% revenue'],
    ['Number of agents', 'Many (org chart)', 'One', 'Many (managed)'],
    ['Technical level', 'High (developer)', 'Medium (CLI)', 'Low (no-code)'],
    ['Best for', 'Building multi-agent companies', 'Personal automation', 'Quick company launch'],
    ['Open source', 'Yes', 'Yes (MIT)', 'No'],
]

t = Table(comparison, colWidths=[33*mm, 47*mm, 42*mm, 45*mm])
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), ZINC_800),
    ('BACKGROUND', (0,0), (0,-1), ZINC_800),
    ('TEXTCOLOR', (0,0), (-1,0), ORANGE),
    ('TEXTCOLOR', (0,0), (0,-1), ORANGE),
    ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
    ('FONTNAME', (0,0), (0,-1), 'Helvetica-Bold'),
    ('TEXTCOLOR', (1,1), (-1,-1), ZINC_300),
    ('FONTNAME', (1,1), (-1,-1), 'Helvetica'),
    ('FONTSIZE', (0,0), (-1,-1), 8.5),
    ('LEADING', (0,0), (-1,-1), 13),
    ('GRID', (0,0), (-1,-1), 0.5, ZINC_600),
    ('PADDING', (0,0), (-1,-1), 5),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [DARK_BG, ZINC_900]),
]))
story.append(t)
story.append(Spacer(1, 4*mm))

# ── SECTION 7 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Who is Paperclip for?', section_heading))
story.append(rule())

story.append(Paragraph('Developers building AI-native companies', subheading))
story.append(Paragraph(
    'If you are technical and want to build something real — not a demo, not a prototype — '
    'Paperclip gives you the infrastructure to coordinate multiple agents at production scale. '
    'You own everything. You pay no revenue share. You have full control.',
    body))

story.append(Paragraph('Founders who want to move fast', subheading))
story.append(Paragraph(
    'Once ClipMart launches, Paperclip becomes accessible to non-developers — '
    'download a company template, configure it, run it. '
    'The technical barrier drops significantly.',
    body))

story.append(Paragraph('Enterprises building custom agent workflows', subheading))
story.append(Paragraph(
    'Paperclip\'s "any agent, any runtime" philosophy makes it attractive for enterprises '
    'that want to build on their existing tools — connecting existing Claude Code deployments, '
    'OpenClaw agents, and custom tools into a coordinated system.',
    body))

story.append(Paragraph('Not for:', subheading))
story.append(Paragraph(
    'Complete beginners who want a no-code solution right now. '
    'For that, Polsia is the better starting point.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 8 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The bigger picture — orchestration is the next battleground', section_heading))
story.append(rule())
story.append(Paragraph(
    'As AI agents become more capable, the question shifts from '
    '"can an agent do this task?" to "how do you coordinate many agents doing many tasks?"',
    body_lead))
story.append(Paragraph(
    'Paperclip is not alone in this space. CrewAI and LangGraph are the dominant '
    'open-source orchestration frameworks in the broader developer community. '
    'Google\'s Agent Development Kit (ADK) is the enterprise entry. '
    'Salesforce Agentforce is the CRM-native approach.',
    body))
story.append(Paragraph(
    'What makes Paperclip interesting is its focus on the specific use case of '
    'running companies — not just workflows. The org chart metaphor is intuitive, '
    'ClipMart has genuine viral potential, and the open-source community is active.',
    body))
story.append(Paragraph(
    'Watch this space. Paperclip launched in March 2026 with 13,500 GitHub stars in days. '
    'By the time you read this, the numbers will be higher.',
    body))
story.append(Spacer(1, 4*mm))

# ── GLOSSARY ─────────────────────────────────────────────────────────────────
story.append(Paragraph('Glossary', section_heading))
story.append(rule())

glossary = [
    ('Paperclip', 'Open-source multi-agent orchestration framework. Build and run companies with teams of AI agents. Self-hosted.'),
    ('Orchestration', 'The coordination of multiple AI agents working together — assigning roles, managing communication, directing toward shared goals.'),
    ('ClipMart', 'Paperclip\'s upcoming marketplace for pre-built company templates. Download and run an entire AI company with one click.'),
    ('Org chart model', 'Paperclip\'s approach: each agent is a node in a company org chart with a defined role, tools, and reporting lines.'),
    ('Runtime agnostic', 'Paperclip works with any AI agent or tool — it does not require a specific LLM or agent platform.'),
    ('Self-hosted', 'Software you run on your own servers, as opposed to a managed service run by the provider.'),
    ('CrewAI', 'A competing open-source multi-agent orchestration framework, widely used in the developer community.'),
    ('LangGraph', 'The advanced version of LangChain for building stateful, multi-agent workflows. A major competitor to Paperclip.'),
    ('Node.js', 'The JavaScript runtime that Paperclip\'s server is built on.'),
    ('MCP-compatible', 'Supports the Model Context Protocol — Anthropic\'s open standard for connecting agents to tools and data.'),
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
story.append(Paragraph('Paperclip is one piece. Here is the full picture.', body))
story.append(Spacer(1, 4*mm))

next_guides = [
    ('WTF is OpenClaw', 'One of the agents Paperclip coordinates. The viral open-source personal agent.', 'wtfagents.com/store'),
    ('WTF is Claude', 'The LLM powering Claude Code — one of Paperclip\'s primary agents.', 'wtfagents.com/store'),
    ('WTF is an AI Agent', 'What each node in a Paperclip org chart actually is.', 'wtfagents.com/store'),
    ('WTF is the Agentic Economy', 'Where Paperclip fits in the $52B+ market.', 'wtfagents.com/store'),
    ('How to Hire an AI Agent for Your Business', 'Practical guide including when to use Paperclip vs the alternatives.', 'wtfagents.com/store'),
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
