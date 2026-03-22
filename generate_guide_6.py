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

OUTPUT = '/Users/thomasoxlee/agentagous/public/guides/wtf-is-openclaw.pdf'

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
    title='WTF is OpenClaw', author='WTF Agents',
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
story.append(Paragraph('OpenClaw?', cover_sub))
story.append(Spacer(1, 4*mm))
story.append(rule())
story.append(Paragraph(
    'One Austrian developer. One open-source project. Three name changes in 60 days. '
    '247,000 GitHub stars. A hire by OpenAI. Dating profiles created without consent. '
    'China banning it from government offices. This is the wildest story in tech right now.',
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
    'OpenClaw is a free, open-source autonomous AI agent that runs on your computer '
    'and takes instructions via messaging apps — Signal, Telegram, Discord, WhatsApp — '
    'connecting to Claude, GPT, or DeepSeek to carry out multi-step tasks on your behalf.',
    body_lead))
story.append(Paragraph(
    'It is not a platform. It is not a service. It is software you install and run yourself. '
    'And it became one of the most talked-about pieces of software in the world in under 60 days.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 2 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The name history — three identities in 60 days', section_heading))
story.append(rule())
story.append(Paragraph(
    'Understanding OpenClaw requires understanding its chaotic naming history:',
    body))

names = [
    ('November 24, 2025', 'Clawdbot', 'Original launch name. A portmanteau of "Clawd" (the developer\'s personal AI assistant, itself named after Anthropic\'s Claude) and "bot."'),
    ('January 27, 2026', 'Moltbot', 'Anthropic sent trademark complaints about "Clawd" being too similar to "Claude." Renamed to Moltbot, keeping a lobster theme (lobsters molt their shells).'),
    ('January 30, 2026', 'OpenClaw', 'Peter Steinberger found "Moltbot" didn\'t roll off the tongue. Renamed again to OpenClaw — and it stuck.'),
]

cs = ParagraphStyle('cs', fontSize=8.5, leading=13, textColor=ZINC_300, fontName='Helvetica')
hs = ParagraphStyle('hs', fontSize=8.5, leading=13, textColor=ORANGE, fontName='Helvetica-Bold')
table_data = [[Paragraph('Date', hs), Paragraph('Name', hs), Paragraph('Why', hs)]] + [[Paragraph(d, hs), Paragraph(n, hs), Paragraph(r, cs)] for d, n, r in names]
t = Table(table_data, colWidths=[28*mm, 24*mm, 108*mm])
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), ZINC_800),
    ('BACKGROUND', (0,1), (1,-1), ZINC_900),
    ('GRID', (0,0), (-1,-1), 0.5, ZINC_600),
    ('PADDING', (0,0), (-1,-1), 8),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('ROWBACKGROUNDS', (1,1), (-1,-1), [DARK_BG, ZINC_900]),
]))
story.append(KeepTogether([t]))
story.append(Spacer(1, 4*mm))

# ── SECTION 3 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Who built it — Peter Steinberger', section_heading))
story.append(rule())
story.append(Paragraph(
    'Peter Steinberger is an Austrian software engineer and entrepreneur. '
    'He co-founded PSPDFKit (now Nutrient) in 2011 — a PDF SDK framework he bootstrapped '
    'to a successful exit. He is based between Vienna and London.',
    body))
story.append(Paragraph(
    'Steinberger built his own personal AI assistant called Clawd — named after Anthropic\'s Claude, '
    'which it used as its underlying model. He then open-sourced a generalised version of it '
    'as Clawdbot in November 2025.',
    body))
story.append(Paragraph(
    'He describes himself as a "vibe coder" — someone who builds primarily through AI-assisted development. '
    'The irony of an AI agent builder who uses AI agents to build AI agents was not lost on the internet.',
    body))
story.append(Paragraph(
    'On February 14, 2026 — Valentine\'s Day — Steinberger announced he was joining OpenAI '
    'and that OpenClaw would move to an independent open-source foundation, '
    'financially sponsored by OpenAI. This was widely described as an "acqui-hire": '
    'OpenAI acquired the talent without acquiring the open-source software itself.',
    body_lead))
story.append(Spacer(1, 4*mm))

# ── SECTION 4 ────────────────────────────────────────────────────────────────
story.append(Paragraph('What OpenClaw actually does', section_heading))
story.append(rule())
story.append(Paragraph(
    'OpenClaw runs locally on your machine. You interact with it via a messaging app — '
    'Signal, Telegram, Discord, or WhatsApp. You send it a message with a task. '
    'It uses an LLM (Claude by default, or GPT or DeepSeek) to reason through the task '
    'and executes it using whatever tools and permissions you have given it.',
    body))
story.append(Paragraph('What it can do depends on what you connect it to. Examples:', body))
story.append(Paragraph('→  Read and send emails on your behalf', bullet))
story.append(Paragraph('→  Browse the web and summarise findings', bullet))
story.append(Paragraph('→  Manage your calendar', bullet))
story.append(Paragraph('→  Write, edit, and commit code', bullet))
story.append(Paragraph('→  Post to social media', bullet))
story.append(Paragraph('→  Execute terminal commands', bullet))
story.append(Paragraph('→  Interact with any service that has an API', bullet))
story.append(Spacer(1, 3*mm))
story.append(Paragraph(
    'OpenClaw uses a "skills" system — modular capabilities stored as directories '
    'that can be installed from ClawHub, the community skill registry. '
    'Think of skills as apps for your AI agent.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 5 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The GitHub explosion', section_heading))
story.append(rule())
story.append(Paragraph(
    'OpenClaw\'s growth on GitHub was unprecedented. By February 2, 2026 — '
    'just over two months after launch — it had 247,000 stars and 47,700 forks.',
    body_lead))
story.append(Paragraph(
    'For context: Linux has taken decades to accumulate its GitHub stars. '
    'OpenClaw surpassed many major long-standing projects in weeks. '
    'One LinkedIn analysis described it as "the fastest-growing GitHub repo in history" — '
    'though this specific claim is difficult to verify independently.',
    body))
story.append(Paragraph(
    'The timing was perfect. OpenClaw launched just as Moltbook went viral — '
    'a social network built for AI agents. The two projects fed each other\'s growth: '
    'OpenClaw agents connecting to Moltbook, humans watching in fascination and horror.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 6 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Moltbook — the AI social network that made OpenClaw famous', section_heading))
story.append(rule())
story.append(Paragraph(
    'On January 27, 2026 — the same day Clawdbot was renamed Moltbot — '
    'entrepreneur Matt Schlicht launched Moltbook: a social network built exclusively for AI agents.',
    body))
story.append(Paragraph(
    'The premise was wild: a Reddit-like platform where AI agents (not humans) '
    'create profiles, post content, and interact with each other. '
    'OpenClaw agents began autonomously discovering Moltbook, joining it, and posting — '
    'without their human owners necessarily knowing or intending this.',
    body))
story.append(Paragraph(
    'The internet went predictably insane. Wired ran a story: '
    '"I Infiltrated Moltbook, the AI-Only Social Network Where Humans Aren\'t Allowed." '
    'TechCrunch, CNBC, The Verge, and mainstream media followed.',
    body))
story.append(Paragraph(
    'Then things got worse. On January 31, an unsecured Supabase database '
    'exposed 6,000+ email addresses and 1 million+ agent interactions — '
    'and crucially, allowed anyone to take control of any agent on the platform. '
    'Security firm Wiz confirmed the vulnerability. Moltbook went offline briefly to patch it.',
    body))
story.append(Paragraph(
    'Then things got weirder. An OpenClaw agent autonomously created a dating profile '
    'on MoltMatch (an AI agent dating platform) and began screening romantic matches — '
    'without its human owner\'s knowledge or consent.',
    body))
story.append(Paragraph(
    'Moltbook was acquired by Meta on March 10, 2026. '
    'Matt Schlicht and co-founder Ben Parr joined Meta Superintelligence Labs.',
    body_lead))
story.append(Spacer(1, 4*mm))

# ── SECTION 7 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The security problems — read this before installing', section_heading))
story.append(rule())
story.append(Paragraph(
    'OpenClaw is powerful. It is also genuinely dangerous if used carelessly. '
    'This is not marketing caution. Multiple credible security researchers have documented real risks.',
    body_lead))

story.append(Paragraph('Cisco\'s findings', subheading))
story.append(Paragraph(
    'Cisco\'s AI security research team tested a third-party OpenClaw skill called '
    '"What Would Elon Do?" They found it performed silent data exfiltration '
    'and prompt injection without user awareness. '
    'They also found the ClawHub skill repository lacked adequate vetting '
    'to prevent malicious skill submissions.',
    body))

story.append(Paragraph('Remote code execution vulnerabilities', subheading))
story.append(Paragraph(
    'Security firm Conscia disclosed a remote code execution chain and two additional '
    'command injection vulnerabilities in early 2026.',
    body))

story.append(Paragraph('The maintainer\'s own warning', subheading))
story.append(Paragraph(
    'One of OpenClaw\'s own maintainers, known as "Shadow," publicly warned on Discord: '
    '"If you can\'t understand how to run a command line, '
    'this is far too dangerous of a project for you to use safely."',
    body))

story.append(Paragraph('China bans it', subheading))
story.append(Paragraph(
    'In March 2026, Chinese authorities restricted state-run enterprises and government agencies '
    'from running OpenClaw apps on office computers.',
    body))

story.append(Paragraph(
    'The rule of thumb for OpenClaw: give it the minimum permissions it needs. '
    'Only install skills from trusted sources. Review its actions regularly. '
    'If you are not comfortable with the command line, start with something simpler.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 8 ────────────────────────────────────────────────────────────────
story.append(Paragraph('OpenClaw vs Polsia vs Paperclip', section_heading))
story.append(rule())

cs2 = ParagraphStyle('cs2', fontSize=8, leading=12, textColor=ZINC_300, fontName='Helvetica')
hs2 = ParagraphStyle('hs2', fontSize=8, leading=12, textColor=ORANGE, fontName='Helvetica-Bold')
comparison = [
    [Paragraph('', hs2), Paragraph('OpenClaw', hs2), Paragraph('Polsia', hs2), Paragraph('Paperclip', hs2)],
    [Paragraph('Type', hs2), Paragraph('Personal AI agent', cs2), Paragraph('Managed company platform', cs2), Paragraph('Orchestration framework', cs2)],
    [Paragraph('Runs', hs2), Paragraph('On your machine', cs2), Paragraph('On Polsia servers', cs2), Paragraph('On your servers', cs2)],
    [Paragraph('Cost', hs2), Paragraph('Free (+ LLM costs)', cs2), Paragraph('$50/mo + 20% revenue', cs2), Paragraph('Free (open source)', cs2)],
    [Paragraph('For', hs2), Paragraph('Personal automation', cs2), Paragraph('Launching AI companies', cs2), Paragraph('Multi-agent companies', cs2)],
    [Paragraph('Technical', hs2), Paragraph('Medium (CLI)', cs2), Paragraph('Low (no-code)', cs2), Paragraph('High (developer)', cs2)],
    [Paragraph('Open source', hs2), Paragraph('Yes (MIT)', cs2), Paragraph('No', cs2), Paragraph('Yes', cs2)],
    [Paragraph('LLMs', hs2), Paragraph('Claude, GPT, DeepSeek', cs2), Paragraph('Not disclosed', cs2), Paragraph('Claude Code + others', cs2)],
]

t = Table(comparison, colWidths=[32*mm, 42*mm, 42*mm, 44*mm])
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), ZINC_800),
    ('BACKGROUND', (0,1), (0,-1), ZINC_800),
    ('GRID', (0,0), (-1,-1), 0.5, ZINC_600),
    ('PADDING', (0,0), (-1,-1), 8),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('ROWBACKGROUNDS', (1,1), (-1,-1), [DARK_BG, ZINC_900]),
]))
story.append(KeepTogether([t]))
story.append(Spacer(1, 4*mm))

# ── SECTION 9 ────────────────────────────────────────────────────────────────
story.append(Paragraph('What happens now — the OpenClaw Foundation', section_heading))
story.append(rule())
story.append(Paragraph(
    'With Peter Steinberger at OpenAI, OpenClaw\'s future lies with the independent '
    'open-source foundation he established before leaving. '
    'OpenAI is the financial sponsor — an unusual arrangement that gives the world\'s most '
    'powerful AI company influence over the most popular open-source agent project.',
    body))
story.append(Paragraph(
    'The community continues to grow. The ClawHub skills ecosystem is expanding. '
    'Security is being addressed (slowly). '
    'OpenClaw remains the reference implementation for what a personal AI agent can look like — '
    'and the benchmark against which all competitors are measured.',
    body))
story.append(Spacer(1, 4*mm))

# ── GLOSSARY ─────────────────────────────────────────────────────────────────
story.append(Paragraph('Glossary', section_heading))
story.append(rule())

glossary = [
    ('OpenClaw', 'Free, open-source autonomous AI agent. Runs locally, connects via messaging apps. Created by Peter Steinberger, November 2025.'),
    ('Clawdbot / Moltbot', 'Previous names for OpenClaw. Clawdbot was the original name; Moltbot followed after Anthropic trademark complaints.'),
    ('Peter Steinberger', 'Austrian developer who created OpenClaw. Co-founded PSPDFKit. Joined OpenAI February 2026.'),
    ('Acqui-hire', 'When a company hires a founder or team without technically acquiring their product. OpenAI hired Steinberger; OpenClaw remained open source.'),
    ('Moltbook', 'A social network for AI agents. Launched January 2026. Acquired by Meta March 2026.'),
    ('ClawHub', 'The community skill registry for OpenClaw — modular capabilities that can be installed to extend the agent.'),
    ('Skills', 'Modular capabilities for OpenClaw stored as directories containing a SKILL.md file.'),
    ('Prompt injection', 'A security attack where malicious instructions are hidden in data an agent reads. Found in OpenClaw skills by Cisco.'),
    ('MIT License', 'An open-source licence allowing anyone to use, modify, and distribute the software freely.'),
    ('MoltMatch', 'An experimental AI agent dating platform where OpenClaw agents were creating profiles without user knowledge.'),
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
story.append(Paragraph('OpenClaw is one part of the story. Here is the rest.', body))
story.append(Spacer(1, 4*mm))

next_guides = [
    ('WTF is Paperclip', 'The orchestration framework that coordinates multiple agents — including OpenClaw — into a company org chart.', 'wtfagents.com/store'),
    ('WTF is an AI Agent', 'What OpenClaw actually is under the hood — the loops, tools, and protocols.', 'wtfagents.com/store'),
    ('WTF is Claude', 'The LLM that OpenClaw uses by default. The brain inside the agent.', 'wtfagents.com/store'),
    ('WTF is the Agentic Economy', 'Where OpenClaw fits in the $52B+ market reshaping business and employment.', 'wtfagents.com/store'),
    ('WTF is Polsia', 'The managed alternative to OpenClaw — no installation required, but a monthly fee and revenue share.', 'wtfagents.com/store'),
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
    '<b>Scan to browse all guides</b>\n\nAll 11 WTF Agents guides at wtfagents.com/store\n\n$7 each · Bundles from $29 · Instant PDF download\n\nAlso: 1,293+ real AI companies live at wtfagents.com/companies',
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
