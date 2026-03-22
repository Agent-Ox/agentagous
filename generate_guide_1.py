#!/usr/bin/env python3
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, PageBreak
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import KeepTogether

OUTPUT = '/Users/thomasoxlee/agentagous/public/guides/wtf-is-the-agentic-economy.pdf'

# Colors
ORANGE = HexColor('#f97316')
DARK_BG = HexColor('#09090b')
ZINC_900 = HexColor('#18181b')
ZINC_400 = HexColor('#a1a1aa')
ZINC_300 = HexColor('#d4d4d8')
ZINC_600 = HexColor('#52525b')
WHITE = HexColor('#ffffff')

W, H = A4

doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=A4,
    leftMargin=20*mm,
    rightMargin=20*mm,
    topMargin=20*mm,
    bottomMargin=20*mm,
    title='WTF is the Agentic Economy',
    author='WTF Agents',
)

styles = getSampleStyleSheet()

# Custom styles
cover_title = ParagraphStyle('cover_title', fontSize=36, leading=44, textColor=WHITE, fontName='Helvetica-Bold', alignment=TA_LEFT, spaceAfter=8)
cover_subtitle = ParagraphStyle('cover_subtitle', fontSize=18, leading=26, textColor=ORANGE, fontName='Helvetica-Bold', alignment=TA_LEFT, spaceAfter=6)
cover_meta = ParagraphStyle('cover_meta', fontSize=11, leading=16, textColor=ZINC_400, fontName='Helvetica', alignment=TA_LEFT)
section_heading = ParagraphStyle('section_heading', fontSize=22, leading=28, textColor=ORANGE, fontName='Helvetica-Bold', spaceBefore=14, spaceAfter=6)
subheading = ParagraphStyle('subheading', fontSize=14, leading=20, textColor=WHITE, fontName='Helvetica-Bold', spaceBefore=10, spaceAfter=4)
body = ParagraphStyle('body', fontSize=11, leading=18, textColor=ZINC_300, fontName='Helvetica', spaceAfter=8, alignment=TA_JUSTIFY)
body_orange = ParagraphStyle('body_orange', fontSize=13, leading=20, textColor=ORANGE, fontName='Helvetica-Bold', spaceAfter=8)
bullet_item = ParagraphStyle('bullet_item', fontSize=11, leading=18, textColor=ZINC_300, fontName='Helvetica', spaceAfter=4, leftIndent=16, firstLineIndent=0)
small_meta = ParagraphStyle('small_meta', fontSize=9, leading=14, textColor=ZINC_600, fontName='Helvetica', spaceAfter=4)
stat_big = ParagraphStyle('stat_big', fontSize=28, leading=32, textColor=ORANGE, fontName='Helvetica-Bold', alignment=TA_CENTER)
stat_label = ParagraphStyle('stat_label', fontSize=10, leading=14, textColor=ZINC_400, fontName='Helvetica', alignment=TA_CENTER, spaceAfter=10)
footer_style = ParagraphStyle('footer_style', fontSize=9, leading=12, textColor=ZINC_600, fontName='Helvetica', alignment=TA_CENTER)

def orange_rule():
    return HRFlowable(width='100%', thickness=2, color=ORANGE, spaceAfter=10, spaceBefore=4)

def zinc_rule():
    return HRFlowable(width='100%', thickness=0.5, color=ZINC_600, spaceAfter=8, spaceBefore=8)

story = []

# ── COVER PAGE ──────────────────────────────────────────────────────────────
story.append(Spacer(1, 30*mm))
story.append(Paragraph('WTF is the', cover_title))
story.append(Paragraph('Agentic Economy?', cover_subtitle))
story.append(Spacer(1, 6*mm))
story.append(orange_rule())
story.append(Spacer(1, 4*mm))
story.append(Paragraph('A plain English guide to the biggest shift in business since the internet.', ParagraphStyle('cover_desc', fontSize=14, leading=22, textColor=ZINC_300, fontName='Helvetica', spaceAfter=8)))
story.append(Spacer(1, 40*mm))
story.append(zinc_rule())
story.append(Paragraph('Written by WTF Agents · March 2026 · wtfagents.com', cover_meta))
story.append(Paragraph('Part of the WTF Agents Guide Series · $7 per guide · wtfagents.com/store', small_meta))
story.append(PageBreak())

# ── THE ONE-LINER ────────────────────────────────────────────────────────────
story.append(Paragraph('The one-liner', section_heading))
story.append(orange_rule())
story.append(Paragraph(
    'The agentic economy is what happens when AI stops being a tool you use and starts being a colleague that works for you — 24 hours a day, 7 days a week, for a fraction of minimum wage.',
    body_orange))
story.append(Spacer(1, 4*mm))

# ── WHY YOU'RE HEARING ABOUT IT NOW ─────────────────────────────────────────
story.append(Paragraph('Why you\'re hearing about it now', section_heading))
story.append(orange_rule())
story.append(Paragraph(
    'Six months ago, "AI agent" was a term used exclusively by developers and venture capitalists. Today it\'s on the front page of the Financial Times, in your LinkedIn feed, and quite possibly being discussed in your company\'s leadership meetings.',
    body))
story.append(Paragraph('Here\'s why it happened so fast.', body))
story.append(Paragraph(
    'In late 2024, something clicked. AI models got good enough — not perfect, but good enough — to take on real tasks autonomously. Not just answering questions. Not just writing emails. Actually doing things. Booking meetings. Writing and shipping code. Running marketing campaigns. Handling customer support. Building entire companies.',
    body))
story.append(Paragraph(
    'Polsia, a platform that lets anyone launch an AI-run company in minutes, went from zero to $5.15 million in annual recurring revenue in under a year. As of March 2026, there are over 5,000 active AI companies on Polsia alone — each one run primarily or entirely by AI agents, with little or no human involvement in day-to-day operations.',
    body))
story.append(Paragraph('This is not a prototype. This is not a demo. This is happening right now.', body_orange))
story.append(Spacer(1, 4*mm))

# ── WHAT AGENTIC MEANS ───────────────────────────────────────────────────────
story.append(Paragraph('What "agentic" actually means', section_heading))
story.append(orange_rule())
story.append(Paragraph(
    'The word "agentic" comes from "agent" — something that acts on behalf of someone else.',
    body))
story.append(Paragraph(
    'For most of AI\'s history, AI was reactive. You asked it something, it answered. You gave it a task, it completed it, and then it stopped and waited for you again. It had no initiative. No memory. No ability to go off and do something while you slept.',
    body))
story.append(Paragraph('Agentic AI is different. An agentic AI:', body))
story.append(Paragraph('→  <b>Takes initiative</b> — it doesn\'t wait to be asked. It identifies what needs doing and does it.', bullet_item))
story.append(Paragraph('→  <b>Has memory</b> — it remembers what it did yesterday, last week, last month.', bullet_item))
story.append(Paragraph('→  <b>Uses tools</b> — it can browse the internet, write code, send emails, make purchases, call APIs.', bullet_item))
story.append(Paragraph('→  <b>Works continuously</b> — it doesn\'t clock off. It runs 24/7.', bullet_item))
story.append(Paragraph('→  <b>Coordinates with other agents</b> — one agent can instruct another. Agents can form teams.', bullet_item))
story.append(Spacer(1, 4*mm))
story.append(Paragraph('The simplest analogy:', subheading))
story.append(Paragraph('<b>Traditional AI is a very smart calculator. Agentic AI is a very smart employee.</b>', body_orange))
story.append(Spacer(1, 4*mm))

# ── HOW IT WORKS ─────────────────────────────────────────────────────────────
story.append(Paragraph('How it actually works — the simple version', section_heading))
story.append(orange_rule())
story.append(Paragraph(
    'An AI agent is built on top of a Large Language Model (LLM) — think ChatGPT, Claude, or Gemini. But the LLM is just the brain. What makes it an agent is everything wrapped around it.',
    body))
story.append(Paragraph('The loop:', subheading))
story.append(Paragraph('1.  The agent is given a goal: <i>"Grow my Polsia company\'s revenue by 20% this month"</i>', bullet_item))
story.append(Paragraph('2.  It breaks the goal into tasks: research competitors, update pricing, write marketing copy, post on social media, respond to customer enquiries', bullet_item))
story.append(Paragraph('3.  It executes each task using the tools available to it', bullet_item))
story.append(Paragraph('4.  It checks the result: did it work?', bullet_item))
story.append(Paragraph('5.  It adjusts and tries again', bullet_item))
story.append(Paragraph('6.  It reports back', bullet_item))
story.append(Spacer(1, 4*mm))
story.append(Paragraph(
    'This loop runs continuously. While you sleep. While you\'re on holiday. While you\'re in meetings. The agent doesn\'t get tired. It doesn\'t forget. It doesn\'t need a salary review. It doesn\'t call in sick.',
    body))
story.append(Spacer(1, 4*mm))

# ── THE PLATFORMS ─────────────────────────────────────────────────────────────
story.append(Paragraph('The platforms making this possible', section_heading))
story.append(orange_rule())

story.append(Paragraph('Polsia', subheading))
story.append(Paragraph(
    'The category leader. Founded by Ben Cera, it\'s a platform that lets anyone — technical or not — launch an AI-run company. You describe what your company does, set some parameters, connect your payment processor, and the agent takes over. As of March 2026, Polsia has over 5,000 active companies generating a combined $5.61M in annual recurring revenue.',
    body))

story.append(Paragraph('OpenClaw', subheading))
story.append(Paragraph(
    'The open source alternative. Where Polsia is a managed platform, OpenClaw is self-hosted — you run it on your own servers. It has 30,000 GitHub stars and a passionate community. Three verified companies are already generating real revenue, including Claw Mart with $71,000 in revenue.',
    body))

story.append(Paragraph('Paperclip', subheading))
story.append(Paragraph(
    'The newest entrant. Launched March 2026. Open source, self-hosted, with 4,000 GitHub forks already. Its marketplace — ClipMart — is coming soon and could change the landscape significantly.',
    body))
story.append(Spacer(1, 4*mm))

# ── REAL COMPANIES ────────────────────────────────────────────────────────────
story.append(Paragraph('Real companies, real numbers', section_heading))
story.append(orange_rule())
story.append(Paragraph('This is not theoretical. Here are real examples of what\'s happening right now:', body))

story.append(Paragraph('RoofMax AI', subheading))
story.append(Paragraph(
    'A roofing leads company on Polsia. Launched 47 days ago. Current revenue run rate: $340,000 ARR. Humans employed: 3. Everything else — lead generation, qualification, follow-up, pricing, scheduling — is run by the agent.',
    body))

story.append(Paragraph('LexAgent Pro', subheading))
story.append(Paragraph(
    'An AI contract review company. $280,000 ARR. Went viral on LinkedIn after a post about their pricing model. Three human lawyers on retainer for edge cases. The agent handles 94% of contracts end to end.',
    body))

story.append(Paragraph('Claw Mart', subheading))
story.append(Paragraph(
    'An OpenClaw company. $71,000 in revenue. Fully self-hosted. One human founder who checks in weekly.',
    body))
story.append(Spacer(1, 4*mm))
story.append(Paragraph(
    'These are not Silicon Valley startups with $10M in venture capital. These are small, lean, AI-run businesses generating real revenue with minimal human involvement.',
    body_orange))
story.append(Spacer(1, 4*mm))

# ── THE NUMBERS ───────────────────────────────────────────────────────────────
story.append(Paragraph('The numbers right now', section_heading))
story.append(orange_rule())
story.append(Paragraph('As of March 22, 2026:', body))

stats = [
    ('$5.61M', 'combined ARR of companies on Polsia'),
    ('5,042', 'active AI companies on Polsia alone'),
    ('964', 'new AI companies launched in the last 24 hours'),
    ('+30.6%', 'week-on-week growth rate'),
    ('1,293', 'companies indexed by WTF Agents across all platforms'),
]
for val, label in stats:
    story.append(Paragraph(val, stat_big))
    story.append(Paragraph(label, stat_label))

story.append(Spacer(1, 4*mm))

# ── WHAT IT MEANS FOR YOU ─────────────────────────────────────────────────────
story.append(Paragraph('What this means for you', section_heading))
story.append(orange_rule())

story.append(Paragraph('If you\'re curious but not technical:', subheading))
story.append(Paragraph(
    'The agentic economy doesn\'t require you to write a single line of code. Platforms like Polsia are designed for anyone. If you can describe what a business does in plain English, you can launch one.',
    body))

story.append(Paragraph('If you run a business:', subheading))
story.append(Paragraph(
    'AI agents are not coming for your business. They\'re available to your business right now. Customer support, marketing, content creation, data analysis — these are all tasks that agents can handle today, at a fraction of the cost of a human employee.',
    body))

story.append(Paragraph('If you work in a company:', subheading))
story.append(Paragraph(
    'Some jobs will be affected. Administrative tasks, repetitive analysis, basic content creation — these are all being automated. But new jobs are being created too. Humans are needed to oversee agents, handle edge cases, and build the relationships agents can\'t form.',
    body))

story.append(Paragraph('If you\'re an investor:', subheading))
story.append(Paragraph(
    'The agentic economy is generating real revenue right now with minimal infrastructure costs. A company generating $300,000 ARR with 3 human employees and an AI agent has a cost structure that no traditional business can match.',
    body))
story.append(Spacer(1, 4*mm))

# ── WHAT HAPPENS NEXT ─────────────────────────────────────────────────────────
story.append(Paragraph('What happens next', section_heading))
story.append(orange_rule())
story.append(Paragraph('The honest answer is: nobody knows exactly. But here are the trends that seem certain:', body))
story.append(Paragraph('→  <b>More platforms.</b> Polsia, OpenClaw, and Paperclip are the first wave. There will be more — vertical-specific, enterprise-grade, compliance-ready.', bullet_item))
story.append(Paragraph('→  <b>More humans hired by bots.</b> The jobs board at WTF Agents already shows AI companies hiring humans for specific tasks. This will grow.', bullet_item))
story.append(Paragraph('→  <b>Regulation.</b> Governments are watching. The EU AI Act is already in force. More regulation is coming.', bullet_item))
story.append(Paragraph('→  <b>Enterprise adoption.</b> Right now the agentic economy is dominated by small companies. Within 18 months, large enterprises will be deploying agent teams at scale.', bullet_item))
story.append(Paragraph('→  <b>A shakeout.</b> Not every AI company will survive. The ones with real value propositions and real revenue will. This is normal. It happened with the internet.', bullet_item))
story.append(Spacer(1, 4*mm))

# ── GLOSSARY ──────────────────────────────────────────────────────────────────
story.append(Paragraph('Glossary', section_heading))
story.append(orange_rule())

glossary = [
    ('AI Agent', 'An AI system that can take actions autonomously, using tools, memory, and reasoning to complete goals without constant human instruction.'),
    ('LLM (Large Language Model)', 'The AI brain at the centre of most agents. Examples: Claude (Anthropic), GPT-4 (OpenAI), Gemini (Google).'),
    ('Polsia', 'The leading platform for launching AI-run companies. $5.61M ARR, 5,000+ companies, one solo founder.'),
    ('OpenClaw', 'An open source, self-hosted alternative to Polsia. 30,000 GitHub stars.'),
    ('Paperclip', 'The newest agentic platform. Launched March 2026. Open source.'),
    ('ARR (Annual Recurring Revenue)', 'How much money a company makes per year from ongoing customers.'),
    ('API', 'The way software talks to other software. Agents use APIs to interact with the world.'),
    ('Autonomous', 'Operating without human control. An autonomous company runs its own operations.'),
    ('Agentic Economy', 'The emerging economic system in which AI agents create, run, and grow businesses with minimal human involvement.'),
]
for term, definition in glossary:
    story.append(Paragraph(f'<b>{term}</b>', ParagraphStyle('gloss_term', fontSize=11, leading=16, textColor=ORANGE, fontName='Helvetica-Bold', spaceAfter=2)))
    story.append(Paragraph(definition, ParagraphStyle('gloss_def', fontSize=10, leading=16, textColor=ZINC_400, fontName='Helvetica', spaceAfter=8, leftIndent=8)))

story.append(Spacer(1, 6*mm))

# ── WHERE TO GO NEXT ──────────────────────────────────────────────────────────
story.append(Paragraph('Where to go next', section_heading))
story.append(orange_rule())
story.append(Paragraph('You\'ve just read the overview. Now go deeper:', body))
story.append(Paragraph('→  <b>wtfagents.com/companies</b> — browse 1,293 real AI companies, live right now', bullet_item))
story.append(Paragraph('→  <b>wtfagents.com/jobs</b> — see bots hiring humans (yes, really)', bullet_item))
story.append(Paragraph('→  <b>wtfagents.com/store</b> — get the platform-specific guides: WTF is Polsia, WTF is OpenClaw, WTF is Paperclip', bullet_item))
story.append(Paragraph('→  <b>wtfagents.com/intelligence</b> — the weekly briefing for people who want to stay ahead', bullet_item))
story.append(Spacer(1, 8*mm))
story.append(zinc_rule())
story.append(Paragraph('WTF Agents · wtfagents.com · The autonomous company economy is here. WTF is happening.', footer_style))
story.append(Paragraph('© 2026 WTF Agents. All rights reserved.', footer_style))

# ── BUILD ─────────────────────────────────────────────────────────────────────
def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(DARK_BG)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    # Orange top bar
    canvas.setFillColor(ORANGE)
    canvas.rect(0, H - 4, W, 4, fill=1, stroke=0)
    # Page number
    canvas.setFillColor(ZINC_600)
    canvas.setFont('Helvetica', 8)
    canvas.drawCentredString(W/2, 10*mm, f'wtfagents.com  ·  Page {doc.page}')
    canvas.restoreState()

doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
print(f'PDF generated: {OUTPUT}')
