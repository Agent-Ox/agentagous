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

OUTPUT = '/Users/thomasoxlee/agentagous/public/guides/how-to-hire-an-ai-agent.pdf'

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
    title='How to Hire an AI Agent for Your Business', author='WTF Agents',
)

cover_title = ParagraphStyle('cover_title', fontSize=32, leading=40, textColor=WHITE, fontName='Helvetica-Bold', alignment=TA_LEFT, spaceAfter=6)
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
step_num = ParagraphStyle('step_num', fontSize=32, leading=36, textColor=ORANGE, fontName='Helvetica-Bold', spaceAfter=2)

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
story.append(Paragraph('How to Hire an AI Agent', cover_title))
story.append(Paragraph('for Your Business', cover_sub))
story.append(Spacer(1, 4*mm))
story.append(rule())
story.append(Paragraph(
    'A practical, jargon-free guide for business owners. '
    'No code required. No prior AI experience needed. '
    'Just clear steps to deploy your first AI agent this week — '
    'and start getting your time back.',
    cover_desc))
story.append(Spacer(1, 32*mm))
story.append(zinc_rule())
story.append(Paragraph('WTF Agents · wtfagents.com · March 2026', cover_meta))
story.append(Paragraph('Part of the WTF Agents Guide Series · wtfagents.com/store', small))
story.append(PageBreak())

# ── SECTION 1 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Before you start — the right mindset', section_heading))
story.append(rule())
story.append(Paragraph(
    'Deploying AI agents in your business is not a technology project. '
    'It is a staffing decision.',
    body_lead))
story.append(Paragraph(
    'The mental model that works: treat AI agents like new hires. '
    'You would not give a brand new employee access to your entire company on day one. '
    'You would not give them a vague goal with no check-ins. '
    'You would not trust them to make major decisions without oversight — until they had earned it.',
    body))
story.append(Paragraph(
    'Apply the same thinking to agents. Start small. Define the role precisely. '
    'Give limited access. Review outputs. Build trust incrementally.',
    body))
story.append(Paragraph(
    'The businesses failing with AI agents are the ones that try to automate everything at once. '
    'The businesses winning are the ones that deploy one agent, in one area, '
    'get it working reliably, and then expand.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 2 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Step 1 — Find your highest-value repeatable task', section_heading))
story.append(rule())
story.append(Paragraph(
    'The best first AI agent is not the most ambitious one. '
    'It is the one that solves a specific, well-defined, repeatable problem.',
    body_lead))
story.append(Paragraph(
    'Ask yourself: what do I (or my team) do repeatedly that follows a predictable pattern? '
    'The answer to that question is where your first agent should go.',
    body))
story.append(Paragraph('High-value starting points for most businesses:', body))

tasks = [
    ('Customer support responses', 'Answering the same questions repeatedly. An agent can handle first-line support — answering FAQs, routing complex issues to humans, following up on tickets.'),
    ('Content creation', 'Writing social media posts, blog articles, email newsletters, product descriptions. An agent can produce a first draft; you refine and approve.'),
    ('Research and summarisation', 'Researching competitors, summarising industry news, compiling information from multiple sources. An agent can do this in minutes rather than hours.'),
    ('Data entry and processing', 'Extracting information from emails or documents and entering it into a spreadsheet or CRM. Tedious for humans; straightforward for agents.'),
    ('Email drafting', 'Writing first drafts of emails — proposals, follow-ups, updates. The agent drafts; you review and send.'),
    ('Scheduling and coordination', 'Managing calendar bookings, sending reminders, coordinating meeting times.'),
    ('Lead qualification', 'Reviewing inbound enquiries, asking qualifying questions, scoring leads before they reach a human salesperson.'),
]

for name, desc in tasks:
    story.append(Paragraph(f'<b>{name}</b> — {desc}',
        ParagraphStyle('task', fontSize=10.5, leading=17, textColor=ZINC_300, fontName='Helvetica', spaceAfter=6)))

story.append(Spacer(1, 4*mm))

# ── SECTION 3 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Step 2 — Choose the right type of agent', section_heading))
story.append(rule())
story.append(Paragraph(
    'Not all agents are right for all tasks. Here is a simple decision framework:',
    body))

decision = [
    [Paragraph('If you want to...', hs), Paragraph('Use this', hs), Paragraph('Cost', hs)],
    [Paragraph('Launch an AI-run company with no technical setup', cs), Paragraph('Polsia (polsia.com)', cs), Paragraph('$50/mo + 20% revenue share', cs)],
    [Paragraph('Deploy a personal AI assistant that takes actions via messaging apps', cs), Paragraph('OpenClaw (openclaw.ai)', cs), Paragraph('Free + LLM API costs', cs)],
    [Paragraph('Build a multi-agent team to run a business', cs), Paragraph('Paperclip (paperclip.ing)', cs), Paragraph('Free (self-hosted)', cs)],
    [Paragraph('Automate specific business workflows without coding', cs), Paragraph('Relevance AI (relevanceai.com)', cs), Paragraph('Free tier available', cs)],
    [Paragraph('Automate repetitive tasks and connect apps', cs), Paragraph('Zapier AI (zapier.com)', cs), Paragraph('From $19.99/mo', cs)],
    [Paragraph('Build a custom agent with full control', cs), Paragraph('Anthropic API + Claude', cs), Paragraph('Pay per token', cs)],
]

t = Table(decision, colWidths=[65*mm, 55*mm, 40*mm])
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), ZINC_800),
    ('GRID', (0,0), (-1,-1), 0.5, ZINC_600),
    ('PADDING', (0,0), (-1,-1), 8),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [DARK_BG, ZINC_900]),
]))
story.append(KeepTogether([t]))
story.append(Spacer(1, 4*mm))

# ── SECTION 4 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Step 3 — Write a clear job description for your agent', section_heading))
story.append(rule())
story.append(Paragraph(
    'This is the most important step most people skip.',
    body_lead))
story.append(Paragraph(
    'AI agents work best when given precise, well-defined instructions. '
    'Vague goals produce vague results. '
    'Before deploying an agent, write out — in plain English — exactly what you want it to do.',
    body))
story.append(Paragraph('A good agent job description includes:', body))
story.append(Paragraph('→  <b>The goal</b> — what outcome do you want? ("Respond to customer support emails within 2 hours")', bullet))
story.append(Paragraph('→  <b>The inputs</b> — what information does the agent receive? ("An inbound email from a customer")', bullet))
story.append(Paragraph('→  <b>The outputs</b> — what should the agent produce? ("A draft reply, flagged for human review if the issue is a refund request")', bullet))
story.append(Paragraph('→  <b>The constraints</b> — what should the agent NOT do? ("Never promise a refund without human approval")', bullet))
story.append(Paragraph('→  <b>The escalation path</b> — when should it involve a human? ("Any complaint that mentions a legal threat")', bullet))
story.append(Spacer(1, 3*mm))
story.append(Paragraph(
    'The more specific you are, the better the agent performs. '
    '"Handle customer support" is a bad brief. '
    '"Read inbound customer emails, identify the question type from this list of 12 categories, '
    'draft a reply using these templates, and flag any complaint mentioning a refund or legal issue '
    'for human review" is a good brief.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 5 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Step 4 — Start with read-only access', section_heading))
story.append(rule())
story.append(Paragraph(
    'The most common mistake when deploying agents: giving them too much access too soon.',
    body_lead))
story.append(Paragraph(
    'Start by giving your agent access to read information, not to take actions. '
    'Let it draft emails — do not let it send them. '
    'Let it suggest calendar bookings — do not let it confirm them. '
    'Let it write social posts — do not let it publish them.',
    body))
story.append(Paragraph(
    'Run in this "human-in-the-loop" mode for a week or two. '
    'Review everything the agent produces. '
    'Identify where it gets things right consistently, and where it makes mistakes.',
    body))
story.append(Paragraph(
    'Once you trust the agent\'s judgment in a specific area, '
    'you can expand its permissions incrementally. '
    'Never expand all at once.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 6 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Step 5 — Measure results honestly', section_heading))
story.append(rule())
story.append(Paragraph(
    'Define what success looks like before you deploy — not after.',
    body_lead))
story.append(Paragraph('For each agent you deploy, set a specific metric:', body))
story.append(Paragraph('→  Customer support agent: average response time, customer satisfaction score, escalation rate', bullet))
story.append(Paragraph('→  Content agent: posts published per week, engagement rate, time saved', bullet))
story.append(Paragraph('→  Research agent: hours saved per week, accuracy of outputs', bullet))
story.append(Paragraph('→  Lead qualification agent: leads qualified per day, conversion rate vs human qualification', bullet))
story.append(Spacer(1, 3*mm))
story.append(Paragraph(
    'Review these metrics weekly for the first month. '
    'If the agent is not delivering measurable value, adjust the brief before expanding its scope.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 7 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Real examples — what businesses are doing right now', section_heading))
story.append(rule())

examples = [
    ('E-commerce store (5 employees)', 'Deployed an agent to handle first-line customer support emails. The agent categorises enquiries, drafts replies using approved templates, and flags unusual requests for human review. Result: response time dropped from 6 hours to 20 minutes. 80% of emails handled without human involvement.'),
    ('Marketing agency (12 employees)', 'Deployed an agent to research clients\' industries and draft weekly content calendars. Copywriters now spend time on strategy and editing, not research. Result: capacity increased 40% without additional headcount.'),
    ('Accounting firm (3 partners)', 'Deployed an agent to summarise client emails and draft responses for partner review. Result: 2 hours per day saved per partner. Used the time to take on 3 additional clients.'),
    ('Solo consultant', 'Deployed OpenClaw as a personal assistant — briefing it via Telegram with research tasks, email drafts, and document summaries. Cost: approximately $30/month in LLM API costs. Time saved: 10+ hours per week.'),
    ('SaaS startup (8 people)', 'Deployed Claude Code to handle routine bug fixes and feature requests. Senior engineers now focus on architecture and complex problems. Result: shipped 3x more features in Q1 2026 with the same team.'),
]

for title, desc in examples:
    story.append(Paragraph(title, subheading))
    story.append(Paragraph(desc, body))

story.append(Spacer(1, 4*mm))

# ── SECTION 8 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The honest cost — what agents actually cost', section_heading))
story.append(rule())
story.append(Paragraph(
    'AI agents are significantly cheaper than human employees. '
    'But they are not free. Here is what to budget:',
    body))

costs = [
    [Paragraph('Agent type', hs), Paragraph('Monthly cost (approx)', hs), Paragraph('What drives the cost', hs)],
    [Paragraph('Polsia company', cs), Paragraph('$50/mo + 20% revenue', cs), Paragraph('Flat fee plus revenue share', cs)],
    [Paragraph('OpenClaw (personal)', cs), Paragraph('$20-100/mo', cs), Paragraph('Anthropic or OpenAI API usage', cs)],
    [Paragraph('Relevance AI', cs), Paragraph('$0-299/mo', cs), Paragraph('Free tier to enterprise plans', cs)],
    [Paragraph('Zapier AI', cs), Paragraph('$20-100/mo', cs), Paragraph('Task volume and plan tier', cs)],
    [Paragraph('Custom Claude agent', cs), Paragraph('$50-500/mo', cs), Paragraph('Token usage — depends heavily on task volume', cs)],
    [Paragraph('Claude Code', cs), Paragraph('$100-500/mo', cs), Paragraph('API token usage — intensive for large codebases', cs)],
]

t = Table(costs, colWidths=[42*mm, 45*mm, 73*mm])
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), ZINC_800),
    ('GRID', (0,0), (-1,-1), 0.5, ZINC_600),
    ('PADDING', (0,0), (-1,-1), 8),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [DARK_BG, ZINC_900]),
]))
story.append(KeepTogether([t]))
story.append(Spacer(1, 3*mm))
story.append(Paragraph(
    'For context: a part-time human assistant in the UK costs £1,500-2,500/month. '
    'A full-time junior employee costs £25,000-35,000/year. '
    'An agent handling equivalent work costs £50-500/month. '
    'The economics are not subtle.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 9 ────────────────────────────────────────────────────────────────
story.append(Paragraph('What agents cannot do — be honest with yourself', section_heading))
story.append(rule())
story.append(Paragraph(
    'AI agents are powerful. They are not magic. Here is what they cannot reliably do:',
    body))
story.append(Paragraph('→  Build genuine human relationships (clients, partners, key hires)', bullet))
story.append(Paragraph('→  Handle truly novel situations with no precedent', bullet))
story.append(Paragraph('→  Make judgment calls in highly regulated areas without human oversight', bullet))
story.append(Paragraph('→  Replace the strategic vision and creative direction of a founder', bullet))
story.append(Paragraph('→  Guarantee factual accuracy on topics outside their training', bullet))
story.append(Paragraph('→  Handle physical world tasks (no hands, no body)', bullet))
story.append(Spacer(1, 3*mm))
story.append(Paragraph(
    'The businesses that deploy agents most successfully are the ones that are clear-eyed '
    'about this. Use agents for what they are good at. Keep humans for what humans are good at. '
    'The boundary between the two is moving — but it has not disappeared.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 10 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Your action plan — what to do this week', section_heading))
story.append(rule())

steps = [
    ('Day 1', 'Write down the three most repetitive tasks in your business. Pick the one with the clearest inputs and outputs.'),
    ('Day 2', 'Write the "job description" for your first agent. Goal, inputs, outputs, constraints, escalation path.'),
    ('Day 3', 'Sign up for one platform from Step 2. Start with the free tier or lowest plan.'),
    ('Day 4-5', 'Configure the agent with your job description. Run it in read-only mode — review everything it produces.'),
    ('Week 2', 'Measure the output quality. Refine the brief where it is getting things wrong. Keep reviewing.'),
    ('Week 3-4', 'If quality is consistently good, expand permissions incrementally. Track the time saved.'),
    ('Month 2', 'Deploy a second agent in a different area. Build your agent team the same way you would build a human team — one role at a time.'),
]

for day, action in steps:
    story.append(Paragraph(f'<b>{day}</b> — {action}',
        ParagraphStyle('step', fontSize=10.5, leading=17, textColor=ZINC_300, fontName='Helvetica', spaceAfter=6)))

story.append(Spacer(1, 4*mm))
story.append(Paragraph(
    'The businesses that win with AI agents in 2026 are not the ones with the biggest budgets '
    'or the most technical teams. They are the ones that start now, learn fast, and iterate.',
    body_lead))
story.append(Spacer(1, 4*mm))

# ── GLOSSARY ─────────────────────────────────────────────────────────────────
story.append(Paragraph('Glossary', section_heading))
story.append(rule())

glossary = [
    ('AI Agent', 'Software that pursues goals autonomously — taking actions, using tools, and adapting without constant human instruction.'),
    ('Human-in-the-loop', 'A deployment mode where an agent produces outputs but a human reviews and approves before actions are taken.'),
    ('Polsia', 'A managed platform where AI agents build and run companies. $50/mo + 20% revenue share.'),
    ('OpenClaw', 'Free, open-source personal AI agent. Runs locally, takes instructions via messaging apps.'),
    ('Paperclip', 'Open-source multi-agent orchestration framework for running businesses with teams of AI agents.'),
    ('Relevance AI', 'No-code/low-code platform for building AI agents for specific business workflows. $37M raised.'),
    ('Zapier AI', 'Major automation platform with AI agent capabilities. Connects thousands of apps.'),
    ('Claude', 'Anthropic\'s AI model. Powers OpenClaw, Claude Code, and many business agent deployments.'),
    ('API key', 'Your credential for accessing an AI model\'s API. Required for OpenClaw, Claude Code, and custom builds.'),
    ('Token', 'The unit AI models use to process text. You pay for API usage in tokens. Roughly 0.75 words per token.'),
    ('MCP (Model Context Protocol)', 'The open standard connecting AI agents to external tools. Invented by Anthropic.'),
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
story.append(Paragraph(
    'You now know how to hire an agent. Here is the full context behind the tools you are using.',
    body))
story.append(Spacer(1, 4*mm))

next_guides = [
    ('WTF is an AI Agent', 'The deep dive on what agents actually are — how they think, plan, and act.', 'wtfagents.com/store'),
    ('WTF is OpenClaw', 'The viral open-source agent. Full story including security considerations.', 'wtfagents.com/store'),
    ('WTF is Claude', 'The AI model powering most of the agents in this guide.', 'wtfagents.com/store'),
    ('WTF is the Agentic Economy', 'The big picture — where your new agent fits in a $52B+ market.', 'wtfagents.com/store'),
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
    '<b>Scan to browse all guides</b>\n\nAll 11 WTF Agents guides at wtfagents.com/store\n\n$7 each · Bundles from $29 · Instant PDF download\n\nAlso: 1,293+ real AI companies at wtfagents.com/companies',
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
