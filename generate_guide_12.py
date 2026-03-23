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

OUTPUT = '/Users/thomasoxlee/agentagous/public/guides/wtf-is-cowork.pdf'

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
    title='WTF is Cowork', author='WTF Agents',
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
story.append(Paragraph('Cowork?', cover_sub))
story.append(Spacer(1, 4*mm))
story.append(rule())
story.append(Paragraph(
    'Claude Code was for developers. Cowork is for everyone else. '
    'The Anthropic product that wiped $285 billion off enterprise software stocks — '
    'and then powered Microsoft\'s next big enterprise bet. '
    'Here is what it actually is and why it matters.',
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
    'Cowork is Anthropic\'s desktop AI agent for non-developers — '
    'a tool that lets Claude read, edit, create, and organise files directly on your computer, '
    'execute multi-step tasks autonomously, and connect to your existing tools, '
    'all without touching a command line.',
    body_lead))
story.append(Paragraph(
    'Anthropic\'s own framing says it best: '
    '"Chat changed how we get answers. Claude Code transformed how developers build software. '
    'Now, Cowork brings that same execution power to everyone."',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 2 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The evolution — Chat → Code → Cowork', section_heading))
story.append(rule())
story.append(Paragraph(
    'To understand Cowork you need to understand the three-stage evolution of Claude:',
    body))

evolution = [
    [Paragraph('Stage', hs), Paragraph('Product', hs), Paragraph('Who it\'s for', hs), Paragraph('What it does', hs)],
    [Paragraph('1', cs), Paragraph('Claude Chat', cs), Paragraph('Everyone', cs), Paragraph('Answers questions. You ask, it responds. Reactive, not autonomous.', cs)],
    [Paragraph('2', cs), Paragraph('Claude Code', cs), Paragraph('Developers', cs), Paragraph('Autonomous coding agent. Reads codebases, writes code, runs tests, commits to Git. Requires command line.', cs)],
    [Paragraph('3', cs), Paragraph('Cowork', cs), Paragraph('Everyone', cs), Paragraph('Autonomous desktop agent. Reads and edits files, executes multi-step tasks, connects to apps. No command line needed.', cs)],
]

t = Table(evolution, colWidths=[12*mm, 30*mm, 35*mm, 83*mm])
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), ZINC_800),
    ('GRID', (0,0), (-1,-1), 0.5, ZINC_600),
    ('PADDING', (0,0), (-1,-1), 8),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [DARK_BG, ZINC_900]),
]))
story.append(KeepTogether([t]))
story.append(Spacer(1, 4*mm))
story.append(Paragraph(
    'The pattern Anthropic spotted: when they released Claude Code, they expected developers '
    'to use it for coding. They did — and then immediately started using it for everything else. '
    'Organising files, writing reports, processing data, automating workflows. '
    'Cowork is the formalisation of that behaviour, made accessible without technical prerequisites.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 3 ────────────────────────────────────────────────────────────────
story.append(Paragraph('How Cowork actually works', section_heading))
story.append(rule())
story.append(Paragraph(
    'Cowork lives inside the Claude Desktop app — available for Mac and Windows. '
    'You access it by clicking the Cowork tab at the top of the app, next to Chat.',
    body))

story.append(Paragraph('Step 1: Grant folder access', subheading))
story.append(Paragraph(
    'You point Cowork at a folder on your computer. '
    'This is the boundary — Claude can only read and modify files within that folder. '
    'Start with something low-stakes: a Downloads folder, a project folder, a research directory. '
    'You control exactly what Claude can and cannot touch.',
    body))

story.append(Paragraph('Step 2: Describe the task', subheading))
story.append(Paragraph(
    'In plain English. No special syntax, no commands. Just describe what you want done. '
    'Examples that work right now:',
    body))
story.append(Paragraph('→  "Organise this folder. Sort files by type, rename generic ones based on content, flag duplicates."', bullet))
story.append(Paragraph('→  "Pull the expense figures from all these receipt screenshots and create a summary spreadsheet."', bullet))
story.append(Paragraph('→  "Read all these research notes and write a 2-page briefing document."', bullet))
story.append(Paragraph('→  "Find all the client emails in this folder and extract the action items into a to-do list."', bullet))
story.append(Paragraph('→  "Take this raw data CSV and generate a formatted report with charts."', bullet))
story.append(Spacer(1, 3*mm))

story.append(Paragraph('Step 3: Claude plans and executes', subheading))
story.append(Paragraph(
    'Cowork makes a plan, shows it to you, and then executes it step by step. '
    'You can see what it is doing in the Progress panel. '
    'You can pause or redirect mid-task if needed. '
    'For significant actions — deleting files, sending emails — Cowork asks for confirmation first.',
    body))

story.append(Paragraph('Step 4: Results land in your folder', subheading))
story.append(Paragraph(
    'No copy-pasting from a chat window. No downloading outputs. '
    'The finished files are in your folder, exactly where you need them.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 4 ────────────────────────────────────────────────────────────────
story.append(Paragraph('What makes Cowork different from just using Claude Chat', section_heading))
story.append(rule())
story.append(Paragraph(
    'This is the question most people ask. The difference is significant:',
    body))

comparison = [
    [Paragraph('', hs), Paragraph('Claude Chat', hs), Paragraph('Cowork', hs)],
    [Paragraph('File access', cs), Paragraph('You paste content into the chat', cs), Paragraph('Claude reads files directly from your computer', cs)],
    [Paragraph('Output', cs), Paragraph('Text in a chat window — you copy it', cs), Paragraph('Files created directly in your folder', cs)],
    [Paragraph('Multi-step tasks', cs), Paragraph('One response at a time — you direct each step', cs), Paragraph('Claude plans and executes all steps autonomously', cs)],
    [Paragraph('Memory', cs), Paragraph('Forgets between conversations', cs), Paragraph('Projects keep context, files, and instructions persistent', cs)],
    [Paragraph('App connections', cs), Paragraph('Limited', cs), Paragraph('Connects to Gmail, Google Drive, Notion, Slack, and hundreds more via connectors', cs)],
    [Paragraph('Works while you\'re away', cs), Paragraph('No', cs), Paragraph('Yes — scheduled recurring tasks run automatically', cs)],
]

t = Table(comparison, colWidths=[35*mm, 60*mm, 65*mm])
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

# ── SECTION 5 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The features — what Cowork can do in March 2026', section_heading))
story.append(rule())

features = [
    ('File operations',
     'Read, edit, create, rename, organise, and delete files in your designated folder. '
     'Process any file type Claude can understand: documents, spreadsheets, PDFs, images, CSVs, emails.'),
    ('Projects',
     'Create a persistent workspace tied to a folder. Your files, instructions, and task history '
     'stay in one place across sessions. Instead of starting fresh every time, your project '
     'remembers what it has done and what is next. Launched March 20, 2026.'),
    ('Scheduled tasks',
     'Set recurring tasks that run automatically. "Every Monday morning, pull last week\'s sales data '
     'from this folder and generate a summary report." Cowork runs it without you being present. '
     'Launched February 25, 2026.'),
    ('Connectors',
     'Link Cowork to external services: Gmail, Google Drive, DocuSign, FactSet, Notion, Slack, '
     'AWS, n8n, and hundreds more via a connector marketplace. '
     'A connector that pulls data from Gmail can now save that data directly to your local folder. '
     'Desktop extensions have deeper system access than web connectors.'),
    ('Skills',
     'Install skills — modular capabilities — that improve Cowork\'s ability to create specific '
     'types of output: documents, presentations, spreadsheets. You can also create a SKILL.md file '
     'in your folder with your brand voice or standard processes and Cowork will use it every time.'),
    ('Claude in Chrome pairing',
     'Pair Cowork with Claude in Chrome and it gains browser access. '
     'Now it can research the web, pull live data, fill in forms, and complete tasks that '
     'require internet access — all as part of the same autonomous workflow.'),
    ('Plugin marketplace',
     'A full plugin marketplace launched for Team and Enterprise plans in early 2026. '
     'Plugins encode institutional knowledge and workflows across domains: financial analysis, '
     'engineering, HR, and more. Admins can deploy them across their organisation.'),
]

for title, desc in features:
    story.append(Paragraph(title, subheading))
    story.append(Paragraph(desc, body))

story.append(Spacer(1, 4*mm))

# ── SECTION 6 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The market reaction — why stocks fell $285 billion', section_heading))
story.append(rule())
story.append(Paragraph(
    'When Cowork launched in January 2026, enterprise software stocks fell sharply. '
    'The iShares Expanded Tech-Software Sector ETF dropped nearly 5% in a single day. '
    'Combined, enterprise software companies shed an estimated $285 billion in market value '
    'in the days following the launch.',
    body_lead))
story.append(Paragraph(
    'The reason: investors looked at what Cowork can do and compared it to what they were '
    'paying enterprise software companies to do. File management. Document creation. '
    'Data extraction. Report generation. Workflow automation. '
    'These are the core functions of dozens of $10–50/user/month SaaS products.',
    body))
story.append(Paragraph(
    'A knowledge worker with Cowork can now automate tasks that previously required '
    'separate tools for project management, document processing, data analysis, '
    'and workflow automation — all from one desktop agent.',
    body))
story.append(Paragraph(
    'The stocks recovered somewhat when Microsoft announced it was building '
    'Copilot Cowork on top of Anthropic\'s technology — '
    'suggesting the incumbents would adapt rather than be replaced entirely. '
    'But the signal was clear: the knowledge work software market has been permanently disrupted.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 7 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Microsoft Copilot Cowork — the enterprise version', section_heading))
story.append(rule())
story.append(Paragraph(
    'In March 2026, Microsoft launched Copilot Cowork — a cloud-based AI agent '
    'powered by Anthropic\'s Claude that executes multi-step tasks across Microsoft 365.',
    body))
story.append(Paragraph(
    'The difference from consumer Cowork: Copilot Cowork runs in the cloud inside '
    'Microsoft 365\'s infrastructure and has access to the full graph of enterprise work data — '
    'Outlook emails, Teams conversations, calendar history, SharePoint files, Excel workbooks. '
    'Rather than working on a local folder, it works across an entire organisation\'s data.',
    body))
story.append(Paragraph(
    'Price: $30/user/month, or included in the new Microsoft 365 E7 bundle at $99/user/month. '
    'Currently in Research Preview, with broader access expected late March 2026.',
    body))
story.append(Paragraph(
    'The significance: despite a $13 billion investment in OpenAI, Microsoft built its '
    'newest flagship M365 feature on Anthropic\'s Claude. '
    'This is the clearest signal yet that Claude is the enterprise-preferred model — '
    'not because Microsoft doesn\'t have access to GPT, but because it chose Claude anyway.',
    body_lead))
story.append(Spacer(1, 4*mm))

# ── SECTION 8 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Real use cases — what people are actually doing with it', section_heading))
story.append(rule())

use_cases = [
    ('Finance and accounting',
     'Point Cowork at a folder of receipt screenshots. It extracts all expense data, '
     'categorises by type, and generates a formatted expense report. '
     'Tasks that took a finance assistant an hour now take Cowork five minutes.'),
    ('Research and analysis',
     'Feed Cowork a folder of research notes, articles, and PDFs. '
     'Ask it to synthesise the key findings into a briefing document. '
     'It reads everything, identifies themes, and writes the document — '
     'citing sources from the files it read.'),
    ('Content operations',
     'Give Cowork a brand voice SKILL.md file and a folder of raw content briefs. '
     'Ask it to draft all ten blog posts. It writes in your brand voice, '
     'formats correctly, and saves them as Word documents ready for review.'),
    ('Data processing',
     'Drop a messy CSV export into the folder. '
     'Ask Cowork to clean it, standardise the formatting, remove duplicates, '
     'and generate a summary report with charts. No spreadsheet skills required.'),
    ('File organisation',
     'The classic first use case. Give Cowork your Downloads folder. '
     'It sorts by type, renames files based on their actual content, '
     'flags duplicates, and creates logical subfolders. '
     'Most users hit their first "wow" moment within ten minutes of trying this.'),
    ('Scheduled intelligence',
     'Connect Cowork to your email via the Gmail connector. '
     'Set a recurring task: every morning at 8am, read all emails received overnight, '
     'extract action items, and create a prioritised to-do list in your project folder. '
     'You wake up to a briefing that was prepared while you slept.'),
]

for title, desc in use_cases:
    story.append(Paragraph(title, subheading))
    story.append(Paragraph(desc, body))

story.append(Spacer(1, 4*mm))

# ── SECTION 9 ────────────────────────────────────────────────────────────────
story.append(Paragraph('How to get access', section_heading))
story.append(rule())

access_data = [
    [Paragraph('Plan', hs), Paragraph('Access', hs), Paragraph('Price', hs)],
    [Paragraph('Claude Pro', cs), Paragraph('Full Cowork access', cs), Paragraph('$20/month', cs)],
    [Paragraph('Claude Max', cs), Paragraph('Full Cowork access + higher limits', cs), Paragraph('$100–200/month', cs)],
    [Paragraph('Claude Team', cs), Paragraph('Full Cowork access + admin controls', cs), Paragraph('$25–30/user/month', cs)],
    [Paragraph('Claude Enterprise', cs), Paragraph('Full Cowork + plugin marketplace + analytics API', cs), Paragraph('Custom pricing', cs)],
    [Paragraph('Microsoft 365 E7', cs), Paragraph('Copilot Cowork (cloud-based, M365 integrated)', cs), Paragraph('$99/user/month', cs)],
    [Paragraph('Free tier', cs), Paragraph('Not available — Cowork is paid only', cs), Paragraph('—', cs)],
]

t = Table(access_data, colWidths=[35*mm, 80*mm, 45*mm])
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
    'To get started: download Claude Desktop from claude.com/download. '
    'Subscribe to Claude Pro or higher. Open the app and click the Cowork tab.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 10 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The honest limitations', section_heading))
story.append(rule())
story.append(Paragraph(
    'Cowork is genuinely powerful. It is also still a research preview, '
    'and it has real limitations worth knowing:',
    body))
story.append(Paragraph('→  <b>Folder boundary only.</b> Claude can only access the folder you designate. It cannot reach outside it without explicit permission.', bullet))
story.append(Paragraph('→  <b>App needs to stay open.</b> Cowork runs locally and needs the Claude Desktop window active. It cannot run completely in the background yet (though scheduled tasks partially address this).', bullet))
story.append(Paragraph('→  <b>Hallucination risk remains.</b> Cowork can misread file contents or make incorrect assumptions about what a task requires. Always review outputs before acting on them.', bullet))
story.append(Paragraph('→  <b>Security considerations.</b> Days after launch, a data exfiltration vulnerability was reported in Cowork. Anthropic patched it. Be thoughtful about which connectors you install and what folders you grant access to.', bullet))
story.append(Paragraph('→  <b>External drive support is limited.</b> Early users report Cowork works best with local folders, not external drives or network storage. Anthropic has indicated this may be addressed in future updates.', bullet))
story.append(Paragraph('→  <b>Still maturing.</b> Projects, scheduled tasks, and the plugin marketplace are all recent additions (January–March 2026). Expect further changes and improvements.', bullet))
story.append(Spacer(1, 4*mm))

# ── SECTION 11 ────────────────────────────────────────────────────────────────
story.append(Paragraph('What Cowork means for the agentic economy', section_heading))
story.append(rule())
story.append(Paragraph(
    'Claude Code proved agents could replace developer time. '
    'Cowork is the thesis applied to every knowledge worker.',
    body_lead))
story.append(Paragraph(
    'The administrative layer of every business — the file management, the data processing, '
    'the report generation, the inbox management, the scheduling — '
    'is now automatable by a non-technical person with a $20/month subscription.',
    body))
story.append(Paragraph(
    'The barrier to running a lean, agent-powered business has never been lower. '
    'A solo founder with Cowork, Claude Code, and OpenClaw has the operational capacity '
    'of a team of five. A small business owner with Cowork has an always-on assistant '
    'that never sleeps, never forgets, and costs less than a gym membership.',
    body))
story.append(Paragraph(
    'The HBR research published in early 2026 noted that companies are already making '
    'headcount decisions based on AI\'s potential, not just its demonstrated performance. '
    'Cowork is part of why. It is not a future prediction — it is a current product '
    'that current businesses are using to do real work right now.',
    body))
story.append(Spacer(1, 4*mm))

# ── GLOSSARY ─────────────────────────────────────────────────────────────────
story.append(Paragraph('Glossary', section_heading))
story.append(rule())

glossary = [
    ('Cowork', 'Anthropic\'s autonomous desktop AI agent. Part of the Claude Desktop app. Reads, edits, and creates files on your computer and executes multi-step tasks without command-line skills.'),
    ('Claude Desktop', 'The desktop application from Anthropic. Available for Mac and Windows. Contains Chat, Code, and Cowork modes. Download at claude.com/download.'),
    ('Projects (Cowork)', 'A persistent workspace tied to a folder — keeps files, instructions, and task history in one place across sessions. Launched March 20, 2026.'),
    ('Scheduled tasks', 'Recurring tasks that Cowork runs automatically on a set schedule — daily, weekly, or custom timing. Launched February 25, 2026.'),
    ('Connectors', 'Integrations that link Cowork to external services — Gmail, Google Drive, DocuSign, Slack, Notion, and hundreds more.'),
    ('Skills', 'Modular capabilities installed into Cowork. Including custom SKILL.md files you create to encode your brand voice or standard processes.'),
    ('Claude in Chrome', 'Anthropic\'s browser agent. When paired with Cowork, gives it web access for tasks requiring live internet data.'),
    ('Copilot Cowork', 'Microsoft\'s enterprise version of Cowork — cloud-based, running across Microsoft 365. Powered by Anthropic\'s Claude. $30/user/month. Launched March 2026.'),
    ('Research Preview', 'Anthropic\'s term for a product that is live and available but still being actively developed and improved.'),
    ('Claude Code', 'The developer-facing autonomous coding agent that Cowork is built on. Requires command-line skills. Cowork is the non-technical equivalent.'),
    ('Knowledge worker', 'Someone whose job primarily involves creating, processing, or managing information — as opposed to physical labour. Cowork is specifically designed for this category.'),
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
story.append(Paragraph('Cowork is built on Claude and sits alongside Claude Code. Here is the full picture.', body))
story.append(Spacer(1, 4*mm))

next_guides = [
    ('WTF is Claude Code', 'The developer version of what Cowork does. If Cowork is the automatic, Claude Code is the manual — more powerful, more technical.', 'wtfagents.com/store'),
    ('WTF is Claude', 'The AI model powering Cowork, Claude Code, and the entire agentic economy.', 'wtfagents.com/store'),
    ('WTF is Anthropic', 'The company that built Cowork. The $380B lab behind the tools reshaping knowledge work.', 'wtfagents.com/store'),
    ('WTF is an AI Agent', 'What Cowork actually is under the hood — how agents plan, act, and iterate.', 'wtfagents.com/store'),
    ('How to Hire an AI Agent for Your Business', 'Practical guide to deploying Cowork and other agents in your business this week.', 'wtfagents.com/store'),
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
    '<b>Scan to browse all guides</b>\n\nAll WTF Agents guides at wtfagents.com/store\n\n$7 each · Bundles from $29 · Instant PDF download',
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
