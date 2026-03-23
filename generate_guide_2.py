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

OUTPUT = '/Users/thomasoxlee/agentagous/public/guides/wtf-is-an-ai-agent.pdf'

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
    OUTPUT,
    pagesize=A4,
    leftMargin=20*mm,
    rightMargin=20*mm,
    topMargin=22*mm,
    bottomMargin=22*mm,
    title='WTF is an AI Agent',
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
story.append(Paragraph('WTF is an', cover_title))
story.append(Paragraph('AI Agent?', cover_sub))
story.append(Spacer(1, 4*mm))
story.append(rule())
story.append(Spacer(1, 3*mm))
story.append(Paragraph(
    'Everyone is talking about AI agents. Almost nobody is explaining them properly. '
    'This guide fixes that — in plain English, with real examples, no jargon.',
    cover_desc))
story.append(Spacer(1, 32*mm))
story.append(zinc_rule())
story.append(Paragraph('WTF Agents · wtfagents.com · March 2026', cover_meta))
story.append(Paragraph('Part of the WTF Agents Guide Series · wtfagents.com/store', small))
story.append(PageBreak())

# ── SECTION 1: THE ONE-LINER ─────────────────────────────────────────────────
story.append(Paragraph('The one-liner', section_heading))
story.append(rule())
story.append(Paragraph(
    'An AI agent is a software system that pursues goals autonomously — '
    'taking actions, using tools, adapting to results, and repeating — '
    'without a human directing every step.',
    body_lead))
story.append(Paragraph(
    'Not a chatbot. Not a search engine. Not autocomplete. '
    'An agent is the difference between asking someone a question '
    'and hiring someone to get something done.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 2: THE SIMPLEST POSSIBLE EXPLANATION ────────────────────────────
story.append(Paragraph('The simplest possible explanation', section_heading))
story.append(rule())
story.append(Paragraph(
    'Imagine you want to book a holiday. Here is how three different types of AI would handle that:',
    body))

story.append(Paragraph('A chatbot (like early ChatGPT):', subheading))
story.append(Paragraph(
    'You ask: "What are some good hotels in Barcelona?" It gives you a list. You ask a follow-up. '
    'It answers. It has no memory of your previous question. It cannot actually book anything. '
    'It stops the moment you stop talking.',
    body))

story.append(Paragraph('An AI assistant (like Siri or Alexa):', subheading))
story.append(Paragraph(
    'You say: "Book me a hotel in Barcelona." It might open a browser or app for you. '
    'But it is essentially a shortcut — it is still relying on you to confirm every action. '
    'It does not go off and research options, compare prices, read reviews, '
    'and come back with a recommendation.',
    body))

story.append(Paragraph('An AI agent:', subheading))
story.append(Paragraph(
    'You say: "Find me a good hotel in Barcelona for next weekend, under £200 a night, '
    'close to the Gothic Quarter, with good reviews." The agent goes away. '
    'It browses hotel sites, reads reviews, checks availability, compares prices, '
    'filters by your criteria, and comes back with three specific options — '
    'or just books the best one if you told it to. '
    'You were not involved in any of those steps.',
    body))
story.append(Paragraph('That is an AI agent.', body_lead))
story.append(Spacer(1, 4*mm))

# ── SECTION 3: THE FIVE PROPERTIES ──────────────────────────────────────────
story.append(Paragraph('The five properties of an AI agent', section_heading))
story.append(rule())
story.append(Paragraph(
    'Every AI agent, regardless of what it does, has five core properties that distinguish it '
    'from simpler AI tools:',
    body))

properties = [
    ('1. Goal-directed', 
     'An agent works toward an outcome, not just a response. You give it a goal — "grow our newsletter list by 20%" — and it figures out the steps. A chatbot gives you advice on how to grow a newsletter. An agent actually does it.'),
    ('2. Autonomous action',
     'An agent takes actions in the world — browsing websites, writing and running code, sending emails, making API calls, filling in forms. It is not just producing text. It is doing things.'),
    ('3. Memory and context',
     'An agent remembers what it has done. It knows it sent an email yesterday and will not send it again today. It knows it already tried option A and failed, so it tries option B. Traditional AI has no memory between sessions.'),
    ('4. Tool use',
     'Agents are connected to tools — web browsers, code interpreters, email clients, calendars, databases, payment processors. The more tools an agent has access to, the more it can do. The Model Context Protocol (MCP), invented by Anthropic, is the open standard that lets agents connect to any tool.'),
    ('5. Feedback loops',
     'Agents check their own results. Did the email bounce? Try a different address. Did the code fail? Read the error and fix it. Did the ad campaign underperform? Adjust the targeting. This self-correction loop is what makes agents genuinely autonomous.'),
]

for title, desc in properties:
    story.append(Paragraph(title, subheading))
    story.append(Paragraph(desc, body))

story.append(Spacer(1, 4*mm))

# ── SECTION 4: HOW AN AGENT ACTUALLY THINKS ─────────────────────────────────
story.append(Paragraph('How an agent actually thinks', section_heading))
story.append(rule())
story.append(Paragraph(
    'At the core of every AI agent is a Large Language Model (LLM) — '
    'the same technology behind ChatGPT and Claude. But the LLM is just the brain. '
    'What makes it an agent is the loop it runs:',
    body))

steps = [
    ('Receive goal', 'The agent is given an objective: "Write and schedule five social media posts for this week."'),
    ('Plan', 'The LLM breaks the goal into steps: research trending topics, draft posts, select images, schedule via the social media API.'),
    ('Act', 'The agent executes step one: browses trending topics using its web tool.'),
    ('Observe', 'It reads the results and decides what is relevant.'),
    ('Reflect', 'It considers whether its approach is working. If step one produced poor results, it adjusts.'),
    ('Repeat', 'It continues through the steps until the goal is complete — or it hits a problem it cannot solve and asks for human input.'),
]

cs = ParagraphStyle('cs', fontSize=8.5, leading=13, textColor=ZINC_300, fontName='Helvetica')
hs = ParagraphStyle('hs', fontSize=8.5, leading=13, textColor=ORANGE, fontName='Helvetica-Bold')
table_data = [[Paragraph('Step', hs), Paragraph('What happens', hs)]] + [[Paragraph(s, hs), Paragraph(d, cs)] for s, d in steps]
t = Table(table_data, colWidths=[30*mm, 130*mm])
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), ZINC_800),
    ('BACKGROUND', (0,1), (0,-1), ZINC_900),
    ('GRID', (0,0), (-1,-1), 0.5, ZINC_600),
    ('PADDING', (0,0), (-1,-1), 8),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('ROWBACKGROUNDS', (1,1), (-1,-1), [DARK_BG, ZINC_900]),
]))
story.append(KeepTogether([t]))
story.append(Spacer(1, 4*mm))
story.append(Paragraph(
    'This loop — plan, act, observe, reflect, repeat — is called the "ReAct" pattern '
    '(Reasoning + Acting). It is the foundation of almost every production AI agent in 2026.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 5: TYPES OF AI AGENTS ───────────────────────────────────────────
story.append(Paragraph('The main types of AI agent', section_heading))
story.append(rule())
story.append(Paragraph(
    'Not all agents are the same. Here are the main categories you will encounter:',
    body))

agent_types = [
    ('Personal AI agents',
     'Run on your own machine or device. Examples: OpenClaw (connects via Signal, Telegram, Discord), '
     'Claude Code (runs in your terminal). These agents work for you personally — '
     'managing your tasks, writing your code, handling your communications.'),
    ('Business process agents',
     'Embedded into business workflows. Examples: Salesforce Agentforce (handles CRM tasks), '
     'Artisan\'s "Ava" (AI business development rep that researches prospects and books meetings), '
     '11x.ai\'s digital workers (AI sales reps). These agents automate specific business functions.'),
    ('Company-building agents',
     'The most ambitious category. Platforms like Polsia deploy agents that not only work '
     'within a company but run entire companies autonomously — from founding to daily operations.'),
    ('Orchestration agents',
     'Agents that manage other agents. Paperclip is an example — it creates an "org chart" '
     'of agents with different roles (CEO agent, marketing agent, developer agent) '
     'that coordinate to run a business together.'),
    ('Research agents',
     'Agents designed to gather, synthesise, and analyse information. '
     'Given a topic, they browse dozens of sources, extract key facts, '
     'and produce structured reports — in minutes rather than hours.'),
]

for title, desc in agent_types:
    story.append(Paragraph(title, subheading))
    story.append(Paragraph(desc, body))

story.append(Spacer(1, 4*mm))

# ── SECTION 6: REAL EXAMPLES ─────────────────────────────────────────────────
story.append(Paragraph('Real agents doing real things right now', section_heading))
story.append(rule())

examples = [
    ('Klarna\'s customer service agent',
     'Klarna, the Swedish fintech, deployed AI agents across its customer support operation. '
     'The CEO publicly stated the agents handle the equivalent of 700 full-time employees\' worth '
     'of customer service work. This is one of the most cited enterprise agent deployments in the world.'),
    ('OpenClaw — the viral personal agent',
     'Created by Austrian developer Peter Steinberger and launched November 2025. '
     'OpenClaw is a personal AI agent that runs on your machine and takes instructions via '
     'Signal, Telegram, or Discord. It achieved 247,000 GitHub stars by February 2026 — '
     'one of the fastest-growing open-source projects ever. The creator was subsequently hired by OpenAI.'),
    ('Artisan\'s Ava — the AI sales rep',
     '"Ava" is an AI business development representative that researches potential customers, '
     'writes personalised outreach emails, follows up, and books meetings — '
     'all without human involvement. Artisan has raised $46 million total and is backed by Y Combinator.'),
    ('Claude Code — the autonomous developer',
     'Anthropic\'s Claude Code is an agent that reads entire codebases, writes and edits code, '
     'runs tests, fixes bugs, and commits to Git — autonomously. '
     'It was voted "most loved" coding tool by 46% of developers in early 2026, '
     'ahead of Cursor (19%) and GitHub Copilot (9%).'),
    ('Rentahuman.ai — agents hiring humans',
     'Perhaps the most striking example: an entire platform where AI agents post jobs '
     'and hire humans to complete tasks the agents cannot do themselves '
     '(physical tasks, tasks requiring legal identity, nuanced human judgment). '
     'Forbes called it "a platform that flips the usual AI narrative."'),
]

for title, desc in examples:
    story.append(Paragraph(title, subheading))
    story.append(Paragraph(desc, body))

story.append(Spacer(1, 4*mm))

# ── SECTION 7: THE BUILDING BLOCKS ──────────────────────────────────────────
story.append(Paragraph('The building blocks — what makes agents possible', section_heading))
story.append(rule())
story.append(Paragraph(
    'Three things came together to make AI agents viable in 2024–2026:',
    body))

story.append(Paragraph('1. LLMs got good enough', subheading))
story.append(Paragraph(
    'The underlying AI models — Claude, GPT, Gemini — became capable enough to reason through '
    'multi-step problems reliably. Earlier models would get confused, hallucinate, or go in circles. '
    'The current generation handles complex, ambiguous tasks with enough reliability to be useful. '
    'Claude Opus 4.6 scores 75.6% on SWE-bench (real software engineering tasks). '
    'Gemini 3.1 Pro scores 80.6%. These numbers were unthinkable two years ago.',
    body))

story.append(Paragraph('2. Tool use became standardised', subheading))
story.append(Paragraph(
    'Anthropic published the Model Context Protocol (MCP) in November 2024 — '
    'an open standard that lets any AI model connect to any tool or data source. '
    'Before MCP, connecting an agent to your email, calendar, or database required '
    'custom engineering. After MCP, it is plug-and-play. '
    'Google followed with the Agent2Agent (A2A) protocol in April 2025, '
    'letting agents from different companies communicate with each other. '
    'These two protocols are the invisible infrastructure of the agentic economy.',
    body))

story.append(Paragraph('3. The cost of compute collapsed', subheading))
story.append(Paragraph(
    'Running an AI agent continuously used to cost hundreds of dollars a day. '
    'As of 2026, the cost of running a capable agent has dropped dramatically — '
    'to the point where a single person can afford to run multiple agents simultaneously '
    'for the cost of a few software subscriptions.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 8: THE RISKS ────────────────────────────────────────────────────
story.append(Paragraph('The risks — what can go wrong', section_heading))
story.append(rule())
story.append(Paragraph(
    'Agents are powerful. They are also genuinely risky if used carelessly. '
    'Here is what you need to know:',
    body))

risks = [
    ('Prompt injection',
     'A malicious actor can embed hidden instructions in data that an agent reads — '
     'a webpage, an email, a document — causing the agent to execute those instructions '
     'instead of its intended task. Cisco found this vulnerability in OpenClaw in early 2026.'),
    ('Overly broad permissions',
     'Agents need access to tools to be useful. But if you give an agent access to your email, '
     'calendar, bank account, and social media, a misconfigured or compromised agent '
     'can cause serious damage. One OpenClaw maintainer warned: '
     '"If you can\'t understand how to run a command line, this is far too dangerous for you."'),
    ('Hallucination in action',
     'LLMs sometimes produce confident but wrong outputs. When a chatbot hallucinates, '
     'you read a wrong answer. When an agent hallucinates, it might send a wrong email, '
     'submit a wrong form, or delete the wrong file.'),
    ('Loss of control',
     'The Moltbook incident (January 2026) showed what happens when agents act beyond '
     'their intended scope: a student\'s OpenClaw agent autonomously created a dating profile '
     'and was screening romantic matches — without his knowledge or consent.'),
]

for title, desc in risks:
    story.append(Paragraph(title, subheading))
    story.append(Paragraph(desc, body))

story.append(Paragraph(
    'The rule of thumb: give agents the minimum permissions they need to do their job. '
    'Review their actions regularly. Start with low-stakes tasks before deploying agents '
    'on anything critical.',
    body_lead))
story.append(Spacer(1, 4*mm))

# ── SECTION 9: HOW TO THINK ABOUT AGENTS ────────────────────────────────────
story.append(Paragraph('How to think about agents — the mental model', section_heading))
story.append(rule())
story.append(Paragraph(
    'The most useful mental model for AI agents is not "software." It is "staff."',
    body_lead))
story.append(Paragraph(
    'You would not give a brand new employee access to your entire company the first day. '
    'You would not give them a vague goal and no check-ins. '
    'You would not trust them to make major decisions without oversight — until they had earned it.',
    body))
story.append(Paragraph(
    'Apply the same thinking to agents. Start small. Define the goal precisely. '
    'Give them limited access. Review their outputs. Build trust incrementally. '
    'The people winning with AI agents right now are the ones treating them like '
    'capable but junior colleagues — not magic or threats.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 10: GLOSSARY ─────────────────────────────────────────────────────
story.append(Paragraph('Glossary', section_heading))
story.append(rule())

glossary = [
    ('AI Agent', 'A software system that pursues goals autonomously — taking actions, using tools, checking results, and adapting without constant human instruction.'),
    ('LLM (Large Language Model)', 'The AI brain at the core of most agents. Examples: Claude (Anthropic), GPT-5.4 (OpenAI), Gemini 3.1 (Google).'),
    ('ReAct', 'The "Reasoning + Acting" loop that most agents run: plan → act → observe → reflect → repeat.'),
    ('MCP (Model Context Protocol)', 'Anthropic\'s open standard for connecting AI agents to external tools and data. The "USB-C for AI." Published November 2024.'),
    ('A2A (Agent2Agent Protocol)', 'Google\'s open standard for AI agents from different companies to communicate. Launched April 2025.'),
    ('Tool use', 'An agent\'s ability to interact with external systems — web browsers, code interpreters, email, databases, APIs.'),
    ('Prompt injection', 'A security attack where malicious instructions are hidden in data that an agent reads, causing it to execute those instructions.'),
    ('Orchestration', 'The coordination of multiple agents working together — like a Paperclip "org chart" where different agents have different roles.'),
    ('Autonomous', 'Operating without human control or supervision on a task-by-task basis.'),
    ('OpenClaw', 'The most-starred open-source personal AI agent. Created by Peter Steinberger, November 2025. 247,000 GitHub stars by February 2026.'),
    ('Claude Code', 'Anthropic\'s autonomous coding agent. Reads codebases, writes code, runs tests, commits to Git — without step-by-step human instruction.'),
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
    'This guide explained what agents are. The WTF Agents series goes deep on '
    'the specific platforms and tools that are building the agentic economy right now.',
    body))
story.append(Spacer(1, 4*mm))

next_guides = [
    ('WTF is the Agentic Economy', 'The big picture. Market size, big players, real numbers. Start here if you haven\'t already.', 'wtfagents.com/store'),
    ('WTF is OpenClaw', 'The viral open-source agent. 247K GitHub stars, security controversies, and what it actually does.', 'wtfagents.com/store'),
    ('WTF is Claude', 'The AI powering most of the agents in this guide. What it is, how it works, why it leads.', 'wtfagents.com/store'),
    ('WTF is an LLM', 'The deep dive on the brain inside every agent. Plain English, no maths.', 'wtfagents.com/store'),
    ('How to Hire an AI Agent for Your Business', 'Practical steps to deploy your first agent this week.', 'wtfagents.com/store'),
    ('WTF is Cowork', 'Claude Code was for developers. Cowork is for everyone else. The product that wiped $285B off enterprise software stocks.', 'wtfagents.com/store'),
]
for title, desc, url in next_guides:
    story.append(Paragraph(f'<b>{title}</b>', ParagraphStyle('ng_title', fontSize=11, leading=16, textColor=ORANGE, fontName='Helvetica-Bold', spaceAfter=1)))
    story.append(Paragraph(desc, ParagraphStyle('ng_desc', fontSize=10, leading=15, textColor=ZINC_400, fontName='Helvetica', spaceAfter=1, leftIndent=8)))
    story.append(Paragraph(f'<link href="https://{url}" color="#f97316">{url}</link>', ParagraphStyle('ng_link', fontSize=9, leading=13, textColor=ORANGE, fontName='Helvetica', spaceAfter=8, leftIndent=8)))

story.append(zinc_rule())
story.append(Spacer(1, 4*mm))
story.append(Paragraph('Want this level of insight every Monday?', ParagraphStyle('cta_h', fontSize=14, leading=20, textColor=WHITE, fontName='Helvetica-Bold', spaceAfter=4)))
story.append(Paragraph(
    'WTF Agents Intelligence — the weekly briefing on the agentic economy. '
    'Real data, real companies, real insight. Every Monday. $49/month.',
    body))
story.append(Paragraph(
    '<link href="https://wtfagents.com/intelligence" color="#f97316">wtfagents.com/intelligence →</link>',
    ParagraphStyle('cta_link', fontSize=11, leading=16, textColor=ORANGE, fontName='Helvetica-Bold', spaceAfter=10)))

story.append(zinc_rule())
story.append(Spacer(1, 6*mm))

qr_img = make_qr('https://wtfagents.com/store')
qr_table = Table([[qr_img, Paragraph(
    '<b>Scan to browse all guides</b>\n\nAll 11 WTF Agents guides at wtfagents.com/store\n\n'
    '$7 each · Bundles from $29 · Instant PDF download\n\n'
    'Free: company directory, jobs board, idea exchange.',
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
