#!/usr/bin/env python3
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, PageBreak, Table, TableStyle, KeepTogether
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors
import qrcode
import io
from reportlab.platypus import Image as RLImage

OUTPUT = '/Users/thomasoxlee/agentagous/public/guides/wtf-is-the-agentic-economy.pdf'

ORANGE = HexColor('#f97316')
DARK_BG = HexColor('#09090b')
ZINC_900 = HexColor('#18181b')
ZINC_800 = HexColor('#27272a')
ZINC_400 = HexColor('#a1a1aa')
ZINC_300 = HexColor('#d4d4d8')
ZINC_600 = HexColor('#52525b')
WHITE = HexColor('#ffffff')
GREEN = HexColor('#22c55e')
RED = HexColor('#ef4444')

W, H = A4

doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=A4,
    leftMargin=20*mm,
    rightMargin=20*mm,
    topMargin=22*mm,
    bottomMargin=22*mm,
    title='WTF is the Agentic Economy',
    author='WTF Agents',
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
stat_num = ParagraphStyle('stat_num', fontSize=26, leading=30, textColor=ORANGE, fontName='Helvetica-Bold', alignment=TA_CENTER)
stat_lbl = ParagraphStyle('stat_lbl', fontSize=9, leading=13, textColor=ZINC_400, fontName='Helvetica', alignment=TA_CENTER, spaceAfter=8)
footer_s = ParagraphStyle('footer_s', fontSize=8.5, leading=12, textColor=ZINC_600, fontName='Helvetica', alignment=TA_CENTER)
link_style = ParagraphStyle('link_style', fontSize=10.5, leading=17, textColor=ORANGE, fontName='Helvetica', spaceAfter=4, leftIndent=14)
callout = ParagraphStyle('callout', fontSize=11, leading=17, textColor=WHITE, fontName='Helvetica-Bold', spaceAfter=6, leftIndent=10)

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

# ══════════════════════════════════════════════════════════════════════════════
# COVER
# ══════════════════════════════════════════════════════════════════════════════
story.append(Spacer(1, 20*mm))
story.append(Paragraph('WTF is the', cover_title))
story.append(Paragraph('Agentic Economy?', cover_sub))
story.append(Spacer(1, 4*mm))
story.append(rule())
story.append(Spacer(1, 3*mm))
story.append(Paragraph(
    'The plain English guide to the biggest shift in business, employment, and technology since the internet. '
    'No jargon. No hype. Just what is actually happening — and what it means for you.',
    cover_desc))
story.append(Spacer(1, 32*mm))
story.append(zinc_rule())
story.append(Paragraph('WTF Agents · wtfagents.com · March 2026', cover_meta))
story.append(Paragraph('Part of the WTF Agents Guide Series · wtfagents.com/store', small))
story.append(PageBreak())

# ══════════════════════════════════════════════════════════════════════════════
# SECTION 1: THE ONE-LINER
# ══════════════════════════════════════════════════════════════════════════════
story.append(Paragraph('The one-liner', section_heading))
story.append(rule())
story.append(Paragraph(
    'The agentic economy is what happens when AI stops waiting to be asked and starts doing things on its own — '
    'planning, deciding, executing, and repeating — around the clock, at a fraction of the cost of a human.',
    body_lead))
story.append(Paragraph(
    'This is not a future prediction. It is happening right now, at a scale most people have not yet registered.',
    body))
story.append(Spacer(1, 4*mm))

# ══════════════════════════════════════════════════════════════════════════════
# SECTION 2: WHEN DID THIS START?
# ══════════════════════════════════════════════════════════════════════════════
story.append(Paragraph('When did this actually start?', section_heading))
story.append(rule())
story.append(Paragraph(
    'The term "agentic economy" began appearing in industry writing around mid-2024. The New York Times ran one of '
    'the first mainstream articles using the phrase in September 2024. By late 2024, Sam Altman (OpenAI), '
    'Satya Nadella (Microsoft), and Dario Amodei (Anthropic) were all using it in major public speeches.',
    body))
story.append(Paragraph(
    'The first peer-reviewed academic paper on the subject was published in May 2025, and formally entered the '
    'Communications of the ACM in January 2026. In under eighteen months, it went from startup jargon to '
    'board-level agenda item at Fortune 500 companies.',
    body))
story.append(Paragraph(
    'Gartner — the world\'s most cited technology research firm — projects that 40% of enterprise software '
    'applications will be integrated with task-specific AI agents by the end of 2026. '
    'That is up from less than 5% in 2025.',
    body))
story.append(Paragraph('To put that in plain English: within twelve months, nearly half of all business software will have an AI that does things, not just answers questions.', body_lead))
story.append(Spacer(1, 4*mm))

# ══════════════════════════════════════════════════════════════════════════════
# SECTION 3: WHAT IS AN AI AGENT?
# ══════════════════════════════════════════════════════════════════════════════
story.append(Paragraph('What is an AI agent, exactly?', section_heading))
story.append(rule())
story.append(Paragraph(
    'Most people\'s experience of AI is reactive: you type something, it responds. ChatGPT, Siri, Google — '
    'you ask, they answer.',
    body))
story.append(Paragraph(
    'An AI agent is different. An agent is proactive. You give it a goal, and it figures out the steps, '
    'executes them one by one, checks the results, adjusts, and tries again — without you holding its hand '
    'through each step.',
    body))
story.append(Paragraph('Here is the difference in a table:', body))

table_data = [
    ['', 'Traditional AI', 'AI Agent'],
    ['Trigger', 'You ask it something', 'You give it a goal'],
    ['Action', 'Responds once', 'Takes multiple steps autonomously'],
    ['Memory', 'Forgets after each conversation', 'Remembers context across sessions'],
    ['Tools', 'Text only', 'Can browse web, write code, send email, make payments'],
    ['Works while you sleep?', 'No', 'Yes'],
]
cs = ParagraphStyle('cs', fontSize=8.5, leading=13, textColor=ZINC_300, fontName='Helvetica')
hs = ParagraphStyle('hs', fontSize=8.5, leading=13, textColor=ORANGE, fontName='Helvetica-Bold')
table_data = [[Paragraph(c[0], hs) if i==0 else Paragraph(c[0], hs) for i,c in enumerate([r])] if False else
    [Paragraph(cell, hs if ri==0 or ci==0 else cs) for ci, cell in enumerate(row)]
    for ri, row in enumerate(table_data)]
t = Table(table_data, colWidths=[40*mm, 60*mm, 60*mm])
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), ZINC_800),
    ('BACKGROUND', (0,1), (0,-1), ZINC_800),
    ('GRID', (0,0), (-1,-1), 0.5, ZINC_600),
    ('PADDING', (0,0), (-1,-1), 8),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('ROWBACKGROUNDS', (1,1), (-1,-1), [DARK_BG, ZINC_900]),
]))
story.append(KeepTogether([t]))
story.append(Spacer(1, 6*mm))
story.append(Paragraph(
    'The simplest analogy: a calculator waits for you to press buttons. An agent is more like a capable '
    'employee who takes a brief and gets on with the job.',
    body))
story.append(Spacer(1, 4*mm))

# ══════════════════════════════════════════════════════════════════════════════
# SECTION 4: THE SCALE OF WHAT'S HAPPENING
# ══════════════════════════════════════════════════════════════════════════════
story.append(Paragraph('The scale of what\'s happening', section_heading))
story.append(rule())
story.append(Paragraph('These are not startup claims. These are verified, sourced facts:', body))

stats = [
    ('$5.25B', 'size of the agentic AI market in 2024'),
    ('$52B+', 'projected market size by 2030 (MarketsandMarkets)'),
    ('79%', 'of organisations report some agentic AI deployment (2025)'),
    ('40%', 'of enterprise apps will have AI agents by end of 2026 (Gartner)'),
    ('700', 'full-time customer service roles worth of work handled by AI at Klarna'),
    ('5,000+', 'enterprise customers on Salesforce Agentforce alone'),
]
for num, lbl in stats:
    story.append(Paragraph(num, stat_num))
    story.append(Paragraph(lbl, stat_lbl))

story.append(Paragraph(
    'McKinsey estimates that generative and agentic AI could add between $2.6 trillion and $4.4 trillion '
    'annually to global GDP. The WEF projects 170 million new jobs created by AI by 2030 — '
    'offsetting 85 million displaced, for a net positive.',
    body))
story.append(Paragraph(
    'A word of caution: Gartner also predicts that 40% of agentic AI projects will be cancelled by 2027 '
    'due to unrealistic expectations. This is a revolution, but it is not magic. The technology is powerful '
    'and the hype is real — and so is the messiness.',
    body))
story.append(Spacer(1, 4*mm))

# ══════════════════════════════════════════════════════════════════════════════
# SECTION 5: THE BIG PLAYERS
# ══════════════════════════════════════════════════════════════════════════════
story.append(Paragraph('The big players — who is actually leading this', section_heading))
story.append(rule())
story.append(Paragraph(
    'The agentic economy is not being built by scrappy startups alone. The largest technology companies in '
    'the world are betting their futures on it.',
    body))

story.append(Paragraph('Anthropic — the safety-first AI lab', subheading))
story.append(Paragraph(
    'Founded in 2021 by Dario and Daniela Amodei (former OpenAI executives) and a team of AI safety '
    'researchers. Anthropic\'s flagship model is Claude — the AI that powers OpenClaw, Paperclip, '
    'and dozens of the most important agent frameworks. Current valuation: $380 billion. '
    'Backers include Amazon, Google, and Nvidia. They also invented the '
    'Model Context Protocol (MCP) — the open standard that lets AI agents connect to any tool or '
    'data source. Think of MCP as USB-C for AI.',
    body))

story.append(Paragraph('OpenAI — the consumer and enterprise giant', subheading))
story.append(Paragraph(
    'The company behind ChatGPT and GPT-5.4. OpenAI launched Codex (autonomous coding agent) and '
    'Operator (computer-use agent) in 2025–2026. In February 2026, they hired Peter Steinberger '
    '(creator of OpenClaw) and became financial sponsor of the OpenClaw Foundation. '
    'Valuation: $300 billion+.',
    body))

story.append(Paragraph('Google DeepMind — the benchmark setter', subheading))
story.append(Paragraph(
    'Google\'s Gemini 3.1 Pro currently holds the highest verified score on SWE-bench (80.6%) — '
    'the industry standard benchmark for AI coding ability. Google also created the Agent2Agent (A2A) '
    'protocol in April 2025 — the open standard that lets AI agents from different companies talk to '
    'each other. Launched with 50+ partner companies including Salesforce, SAP, PayPal, and McKinsey.',
    body))

story.append(Paragraph('Microsoft — the enterprise distribution machine', subheading))
story.append(Paragraph(
    'Invested $10B+ in OpenAI. Distributes both OpenAI and Anthropic models via Azure. '
    'GitHub Copilot (77 million+ developers). Copilot for Microsoft 365 reporting 20–30% '
    'productivity gains in enterprise knowledge work.',
    body))

story.append(Paragraph('Salesforce Agentforce — the enterprise deployment leader', subheading))
story.append(Paragraph(
    'Marc Benioff declared 2025 "the year of the agent" and bet the company on agentic workflows. '
    'Agentforce now has 5,000+ paying enterprise customers embedding AI agents into CRM, '
    'sales, and support workflows. This is the largest verified enterprise agentic deployment as of 2026.',
    body))
story.append(Spacer(1, 4*mm))

# ══════════════════════════════════════════════════════════════════════════════
# SECTION 6: THE REAL-WORLD PROOF
# ══════════════════════════════════════════════════════════════════════════════
story.append(Paragraph('The real-world proof — it\'s already happening', section_heading))
story.append(rule())

story.append(Paragraph('Klarna replaces 700 employees with AI agents', subheading))
story.append(Paragraph(
    'Swedish fintech Klarna deployed AI agents across its customer service operation. CEO Sebastian '
    'Siemiatkowski publicly stated the AI does the equivalent work of 700 full-time employees. '
    'The company subsequently reduced its human customer service headcount. '
    '(Note: Klarna later qualified some of these statements — exact displacement figures remain disputed '
    'but the deployment itself is verified.)',
    body))

story.append(Paragraph('A bot hiring humans — Rentahuman.ai', subheading))
story.append(Paragraph(
    'One of the most striking signals of where the economy is heading: Rentahuman.ai is a platform where '
    'AI agents hire humans — not the other way around. Agents post jobs for tasks they cannot complete '
    'autonomously (physical tasks, tasks requiring legal identity, tasks needing human judgment). '
    'Forbes called it "a new platform that flips the usual narrative about AI."',
    body))

story.append(Paragraph('WEF Davos 2026 — 32 verified enterprise deployments', subheading))
story.append(Paragraph(
    'The World Economic Forum, in collaboration with Accenture, documented 32 verified large-scale '
    'enterprise AI deployments across manufacturing, healthcare, financial services, and logistics. '
    'These are not pilots. These are production systems.',
    body))
story.append(Spacer(1, 4*mm))

# ══════════════════════════════════════════════════════════════════════════════
# SECTION 7: THE INDIE OPPORTUNITY
# ══════════════════════════════════════════════════════════════════════════════
story.append(Paragraph('The indie opportunity — where the little guy wins', section_heading))
story.append(rule())
story.append(Paragraph(
    'Here is what makes the agentic economy genuinely different from every previous technology revolution: '
    'the barrier to entry is essentially zero.',
    body_lead))
story.append(Paragraph(
    'The same tools that power Salesforce Agentforce\'s 5,000-customer enterprise platform are available '
    'to a single person sitting at a laptop in Mallorca. The gap between "big company" and "one person" '
    'has never been smaller.',
    body))

story.append(Paragraph('OpenClaw — the open-source agent that went viral', subheading))
story.append(Paragraph(
    'OpenClaw (originally Clawdbot, then Moltbot) was built by Austrian developer Peter Steinberger '
    'and launched in November 2025. It is a free, open-source autonomous AI agent that runs on your '
    'machine and connects to Claude, GPT, or DeepSeek via messaging apps like Signal, Telegram, '
    'and Discord. By February 2026 it had 247,000 GitHub stars — one of the fastest-growing open-source '
    'projects in history. Steinberger was subsequently hired by OpenAI, and the project moved to an '
    'independent open-source foundation backed by OpenAI.',
    body))
story.append(Paragraph(
    'Important: OpenClaw is a personal AI agent, not a company-building platform. It is the tools layer — '
    'the thing that does the work.',
    body))

story.append(Paragraph('Polsia — AI that runs your company while you sleep', subheading))
story.append(Paragraph(
    'Polsia is a managed platform founded by Ben Cera (also known as Ben Broca) in San Francisco. '
    'The model: pay $50/month, describe a business, and AI agents handle everything — coding, marketing, '
    'customer support, operations. The founder claims $1–1.5M ARR within 30 days of launch. '
    'These figures are unverified by independent third parties and have been debated on Reddit and '
    'in tech communities. The platform itself is real and operational. '
    'WTF Agents tracks 1,293+ companies on Polsia via the live API at polsia.imrat.com/api/data.',
    body))

story.append(Paragraph('Paperclip — the orchestration layer', subheading))
story.append(Paragraph(
    'Paperclip is an open-source orchestration framework that lets you build a multi-agent "company '
    'org chart" — assigning roles, workflows, and goals across multiple AI agents simultaneously. '
    'Tagline: "Any agent, any runtime, one org chart." It integrates with Claude Code, OpenClaw, '
    'Cursor, and others. ClipMart (coming soon) will let you download entire pre-built company '
    'templates with one click. 13,500 GitHub stars in days of launch.',
    body))

story.append(Paragraph('The protocols making it all work', subheading))
story.append(Paragraph(
    'Two open standards are the invisible infrastructure of the agentic economy:',
    body))
story.append(Paragraph(
    '→  <b>MCP (Model Context Protocol)</b> — invented by Anthropic, November 2024. '
    'Lets AI agents connect to any external tool or data source. Think USB-C for AI. '
    'Now donated to the Agentic AI Foundation (backed by Anthropic, OpenAI, Google, Microsoft, AWS).',
    bullet))
story.append(Paragraph(
    '→  <b>A2A (Agent2Agent Protocol)</b> — created by Google, April 2025. '
    'Lets AI agents from different companies talk to each other. '
    'Launched with 50+ partners including Salesforce, SAP, PayPal, McKinsey, Deloitte.',
    bullet))
story.append(Spacer(1, 4*mm))

# ══════════════════════════════════════════════════════════════════════════════
# SECTION 8: THE MESSY REALITY
# ══════════════════════════════════════════════════════════════════════════════
story.append(Paragraph('The messy reality — it\'s not all smooth', section_heading))
story.append(rule())
story.append(Paragraph(
    'The agentic economy is real. It is also chaotic, occasionally dangerous, and moving faster than '
    'regulation, security, or most businesses can keep up with.',
    body))

story.append(Paragraph('The Moltbook incident', subheading))
story.append(Paragraph(
    'Moltbook was a social network built exclusively for AI agents — launched January 2026 by '
    'entrepreneurs Matt Schlicht and Ben Parr. Within days, AI agents were autonomously posting '
    'to it without their human owners\' knowledge. Within a week, a database misconfiguration '
    'exposed 6,000+ email addresses and 1 million agent interactions. Security firm Wiz confirmed '
    'the flaw allowed anyone to take control of any agent on the platform. '
    'Moltbook was acquired by Meta in March 2026.',
    body))

story.append(Paragraph('OpenClaw\'s security problem', subheading))
story.append(Paragraph(
    'Cisco\'s AI security team tested a third-party OpenClaw skill and found it performed silent '
    'data exfiltration and prompt injection without user awareness. One of OpenClaw\'s own maintainers '
    'publicly warned: "If you can\'t understand how to run a command line, this is far too dangerous '
    'of a project for you to use safely." China restricted OpenClaw in government offices in March 2026.',
    body))

story.append(Paragraph('The jobs question', subheading))
story.append(Paragraph(
    'The entry-level job market is already being affected. Administrative tasks, basic coding, '
    'research, customer support — these are where AI agents are most competent and most deployed. '
    'The WEF projects a net positive (170M new jobs vs 85M displaced) but acknowledges a '
    '"significant skills transition" is required. The transition is the hard part.',
    body))
story.append(Spacer(1, 4*mm))

# ══════════════════════════════════════════════════════════════════════════════
# SECTION 9: WHAT IT MEANS FOR YOU
# ══════════════════════════════════════════════════════════════════════════════
story.append(Paragraph('What this means for you', section_heading))
story.append(rule())

story.append(Paragraph('If you run a small business:', subheading))
story.append(Paragraph(
    'The tools available to you today — Claude, OpenClaw, Paperclip, Relevance AI — give you the '
    'operational capacity of a team for the cost of a few subscriptions. Customer support, content '
    'creation, data analysis, outreach: all automatable right now. The question is not whether to '
    'use these tools. It is how fast to move.',
    body))

story.append(Paragraph('If you are an employee:', subheading))
story.append(Paragraph(
    'The roles most at risk are the ones involving repetitive, process-driven work. The roles being '
    'created are the ones that involve directing, overseeing, and collaborating with AI agents. '
    'The people winning right now are the ones who treat AI agents as junior colleagues, not threats.',
    body))

story.append(Paragraph('If you are curious and want to understand this space:', subheading))
story.append(Paragraph(
    'You are reading the right guide. The rest of the WTF Agents series goes deeper on each '
    'platform, tool, and concept in this guide. The agentic economy does not require a '
    'computer science degree. It requires curiosity and a willingness to experiment.',
    body))
story.append(Spacer(1, 4*mm))

# ══════════════════════════════════════════════════════════════════════════════
# SECTION 10: GLOSSARY
# ══════════════════════════════════════════════════════════════════════════════
story.append(Paragraph('Glossary', section_heading))
story.append(rule())

glossary = [
    ('AI Agent', 'An AI system that pursues goals autonomously — taking actions, using tools, and adapting without constant human instruction.'),
    ('LLM (Large Language Model)', 'The AI "brain" at the core of most agents. Examples: Claude (Anthropic), GPT-5.4 (OpenAI), Gemini 3.1 (Google).'),
    ('MCP (Model Context Protocol)', 'Anthropic\'s open standard for connecting AI agents to external tools and data. The "USB-C for AI."'),
    ('A2A (Agent2Agent Protocol)', 'Google\'s open standard for AI agents from different companies to communicate with each other.'),
    ('SWE-bench', 'The industry benchmark for measuring how well an AI can solve real software engineering tasks. Higher = better.'),
    ('Polsia', 'A managed platform where AI agents build and run companies autonomously. Founded by Ben Cera.'),
    ('OpenClaw', 'A free, open-source autonomous AI agent. Runs locally, connects via messaging apps. Created by Peter Steinberger.'),
    ('Paperclip', 'An open-source orchestration framework for running multi-agent companies.'),
    ('Moltbook', 'A social network built for AI agents. Launched January 2026, acquired by Meta March 2026.'),
    ('Constitutional AI', 'Anthropic\'s technique for training AI models to be helpful, honest, and harmless using a set of principles.'),
    ('ARR (Annual Recurring Revenue)', 'How much money a business makes per year from recurring customers. The standard startup health metric.'),
    ('Agentic Economy', 'The emerging economic system in which AI agents perform meaningful economic work with minimal human supervision.'),
]
for term, definition in glossary:
    story.append(Paragraph(
        f'<b>{term}</b> — {definition}',
        ParagraphStyle('gl', fontSize=10, leading=16, textColor=ZINC_300, fontName='Helvetica',
                      spaceAfter=5, leftIndent=0)))

story.append(Spacer(1, 6*mm))

# ══════════════════════════════════════════════════════════════════════════════
# READ NEXT / BUY MORE GUIDES
# ══════════════════════════════════════════════════════════════════════════════
story.append(PageBreak())
story.append(Paragraph('Liked this? Go deeper.', section_heading))
story.append(rule())
story.append(Paragraph(
    'This guide gave you the big picture. The WTF Agents series goes deep on every platform, '
    'tool, and concept mentioned here. Each guide is $7 — instant PDF download.',
    body))
story.append(Spacer(1, 4*mm))

next_guides = [
    ('WTF is Claude', 'The AI powering the agentic economy. What it is, how it works, why it matters.', 'wtfagents.com/store'),
    ('WTF is OpenClaw', 'The viral open-source agent that went from 0 to 247K GitHub stars in 60 days.', 'wtfagents.com/store'),
    ('WTF is Polsia', 'The platform claiming to run 1,300+ companies autonomously. What\'s real and what\'s hype.', 'wtfagents.com/store'),
    ('WTF is an AI Agent', 'The deep dive on agents specifically — how they think, plan, and act.', 'wtfagents.com/store'),
    ('WTF is Cowork', 'Claude Code was for developers. Cowork is for everyone else. The product that wiped $285B off enterprise software stocks.', 'wtfagents.com/store'),
]
for title, desc, url in next_guides:
    story.append(Paragraph(f'<b>{title}</b>', ParagraphStyle('ng_title', fontSize=11, leading=16, textColor=ORANGE, fontName='Helvetica-Bold', spaceAfter=1)))
    story.append(Paragraph(desc, ParagraphStyle('ng_desc', fontSize=10, leading=15, textColor=ZINC_400, fontName='Helvetica', spaceAfter=1, leftIndent=8)))
    story.append(Paragraph(f'<link href="https://{url}" color="#f97316">{url}</link>', ParagraphStyle('ng_link', fontSize=9, leading=13, textColor=ORANGE, fontName='Helvetica', spaceAfter=8, leftIndent=8)))

story.append(zinc_rule())
story.append(Spacer(1, 4*mm))

# Intelligence CTA
story.append(Paragraph('Want this level of insight every Monday?', ParagraphStyle('cta_h', fontSize=14, leading=20, textColor=WHITE, fontName='Helvetica-Bold', spaceAfter=4)))
story.append(Paragraph(
    'WTF Agents Intelligence is the weekly briefing on the agentic economy — real data, real companies, '
    'real insight. Top 10 fastest-growing AI companies, vertical reports, platform watch, deep dives. '
    'Every Monday. $49/month. Cancel anytime.',
    body))
story.append(Paragraph(
    '<link href="https://wtfagents.com/intelligence" color="#f97316">wtfagents.com/intelligence →</link>',
    ParagraphStyle('cta_link', fontSize=11, leading=16, textColor=ORANGE, fontName='Helvetica-Bold', spaceAfter=10)))

story.append(zinc_rule())
story.append(Spacer(1, 6*mm))

# QR CODE + footer
qr_img = make_qr('https://wtfagents.com/store')
qr_table = Table([[qr_img, Paragraph(
    '<b>Scan to browse all guides</b>\n\nAll WTF Agents guides at wtfagents.com/store\n\n'
    '$7 each · Bundles from $29 · Instant PDF download\n\n'
    'Also: free company directory, jobs board, idea exchange\n'
    'and the weekly Intelligence briefing at $49/mo.',
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
story.append(Paragraph('© 2026 WTF Agents. All rights reserved. Sources available at wtfagents.com', footer_s))

# ══════════════════════════════════════════════════════════════════════════════
# PAGE BACKGROUND + NUMBERS
# ══════════════════════════════════════════════════════════════════════════════
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
