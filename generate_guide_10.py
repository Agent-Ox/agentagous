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

OUTPUT = '/Users/thomasoxlee/agentagous/public/guides/wtf-is-claude-code.pdf'

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
    title='WTF is Claude Code', author='WTF Agents',
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
story.append(Paragraph('Claude Code?', cover_sub))
story.append(Spacer(1, 4*mm))
story.append(rule())
story.append(Paragraph(
    'Not a code editor. Not an autocomplete plugin. An autonomous AI developer '
    'that reads your entire codebase, writes code, runs tests, fixes bugs, and commits to Git — '
    'while you do something else. Voted most-loved coding tool by 46% of developers in 2026.',
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
    'Claude Code is Anthropic\'s autonomous coding agent — a command-line tool that takes '
    'a task, reads your codebase, figures out what needs to change, makes the changes, '
    'runs tests, and iterates until the task is done.',
    body_lead))
story.append(Paragraph(
    'It is not a tool that helps you code. It is a tool that codes while you watch — '
    'or while you do something else entirely.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 2 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The difference that matters', section_heading))
story.append(rule())
story.append(Paragraph(
    'There are three categories of AI coding tool. They are not the same thing:',
    body))

tools = [
    ('Autocomplete tools (GitHub Copilot)', 'Suggest the next line of code as you type. You are still writing. The AI is making suggestions. You accept or reject each one. Fast, low-friction, but fundamentally reactive.'),
    ('AI-assisted editors (Cursor)', 'Chat with the AI inside your editor. Ask it to write a function, explain some code, or make a change. More powerful than autocomplete, but you are still directing every step.'),
    ('Autonomous coding agents (Claude Code)', 'You give the agent a task: "Add user authentication to this application." It reads the entire codebase, plans the changes, writes the code across multiple files, runs the tests, fixes the failures, and commits the result. You were not involved in the individual steps.'),
]

for name, desc in tools:
    story.append(Paragraph(name, subheading))
    story.append(Paragraph(desc, body))

story.append(Paragraph(
    'The distinction matters because the productivity multiplier is completely different. '
    'Autocomplete saves you seconds. An autonomous agent saves you hours.',
    body_lead))
story.append(Spacer(1, 4*mm))

# ── SECTION 3 ────────────────────────────────────────────────────────────────
story.append(Paragraph('What Claude Code can actually do', section_heading))
story.append(rule())

capabilities = [
    ('Read entire codebases', 'Claude Code reads all your files — not just the one you have open. It understands how parts of the codebase relate to each other. This is critical for tasks that require changes across multiple files.'),
    ('Write and edit code', 'Across all major languages: Python, JavaScript, TypeScript, Go, Rust, Java, C++, Ruby, and more. It writes idiomatic code that fits the existing style of your codebase.'),
    ('Run shell commands', 'Execute tests, linters, build tools, and scripts. Read the output. Understand what failed. Try to fix it.'),
    ('Run tests and fix failures', 'Write tests if you don\'t have them. Run existing tests. Read the failures. Fix the code. Re-run. Iterate.'),
    ('Commit to Git', 'Stage changes, write commit messages, and commit — following your project\'s conventions.'),
    ('Handle multi-file refactors', 'Rename a function used in 47 places. Change an API interface and update all callers. Restructure a module. Tasks that would take a human developer hours.'),
    ('Work on long autonomous sessions', 'Unlike autocomplete tools that help one line at a time, Claude Code can work on a complex task for hours — maintaining context across the entire session.'),
]

for cap, desc in capabilities:
    story.append(Paragraph(f'<b>{cap}</b> — {desc}',
        ParagraphStyle('cap', fontSize=10.5, leading=17, textColor=ZINC_300, fontName='Helvetica', spaceAfter=6)))

story.append(Spacer(1, 4*mm))

# ── SECTION 4 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The numbers — developer adoption in 2026', section_heading))
story.append(rule())
story.append(Paragraph(
    'Claude Code went from beta launch in May 2025 to category leader in under a year. '
    'Developer surveys in early 2026 found:',
    body))

stats = [
    [Paragraph('46%', hs), Paragraph('"Most loved" coding tool among developers — Claude Code', cs)],
    [Paragraph('19%', hs), Paragraph('"Most loved" — Cursor (previous category leader)', cs)],
    [Paragraph('9%', hs), Paragraph('"Most loved" — GitHub Copilot (77M+ developer install base)', cs)],
]

t = Table(stats, colWidths=[20*mm, 140*mm])
t.setStyle(TableStyle([
    ('GRID', (0,0), (-1,-1), 0.5, ZINC_600),
    ('BACKGROUND', (0,0), (-1,-1), ZINC_900),
    ('PADDING', (0,0), (-1,-1), 10),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('ROWBACKGROUNDS', (0,0), (-1,-1), [ZINC_900, DARK_BG]),
]))
story.append(KeepTogether([t]))
story.append(Spacer(1, 3*mm))
story.append(Paragraph(
    'This is a remarkable result. GitHub Copilot has 77 million+ developers using it '
    'and the backing of Microsoft. Claude Code overtook it in developer satisfaction '
    'in under a year — because it does something fundamentally different.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 5 ────────────────────────────────────────────────────────────────
story.append(Paragraph('How Claude Code fits into the agentic economy', section_heading))
story.append(rule())
story.append(Paragraph(
    'Claude Code is not just a tool for individual developers. '
    'It is one of the primary building blocks of the agentic economy.',
    body_lead))

story.append(Paragraph('In Paperclip', subheading))
story.append(Paragraph(
    'Paperclip — the open-source multi-agent company orchestration framework — '
    'lists Claude Code as a primary supported agent. In a Paperclip "company org chart," '
    'Claude Code can be the developer agent: building and maintaining the company\'s software '
    'autonomously while other agents handle marketing, customer support, and operations.',
    body))

story.append(Paragraph('In autonomous companies', subheading))
story.append(Paragraph(
    'The companies tracked on WTF Agents — the 1,293+ AI-run companies on Polsia, OpenClaw, '
    'and Paperclip — are using agents like Claude Code to build and iterate on their products. '
    'A company with no human employees still needs software. Claude Code builds it.',
    body))

story.append(Paragraph('In enterprise settings', subheading))
story.append(Paragraph(
    'Large enterprises are using Claude Code for large-scale code migrations, '
    'test-writing, technical debt reduction, and API integrations. '
    'Tasks that previously required weeks of developer time can be completed in hours.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 6 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Claude Code vs the alternatives', section_heading))
story.append(rule())

comparison = [
    [Paragraph('Tool', hs), Paragraph('Type', hs), Paragraph('Best for', hs), Paragraph('Limitation', hs)],
    [Paragraph('Claude Code', cs), Paragraph('Autonomous agent', cs), Paragraph('Complex, multi-file tasks; long autonomous sessions', cs), Paragraph('Requires CLI comfort; API costs', cs)],
    [Paragraph('Cursor', cs), Paragraph('AI-assisted editor', cs), Paragraph('Fast iteration; inline editing; real-time help', cs), Paragraph('Still human-directed; not autonomous', cs)],
    [Paragraph('GitHub Copilot', cs), Paragraph('Autocomplete', cs), Paragraph('Quick suggestions while typing; broad ecosystem', cs), Paragraph('Reactive, not autonomous', cs)],
    [Paragraph('Codex (OpenAI)', cs), Paragraph('Autonomous agent', cs), Paragraph('GPT-5.4 backbone; 1M context window', cs), Paragraph('Less community adoption than Claude Code', cs)],
]

t = Table(comparison, colWidths=[30*mm, 30*mm, 55*mm, 45*mm])
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), ZINC_800),
    ('GRID', (0,0), (-1,-1), 0.5, ZINC_600),
    ('PADDING', (0,0), (-1,-1), 8),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [DARK_BG, ZINC_900]),
]))
story.append(KeepTogether([t]))
story.append(Spacer(1, 4*mm))

# ── SECTION 7 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Do you need to be a developer to use Claude Code?', section_heading))
story.append(rule())
story.append(Paragraph(
    'Mostly yes — at the moment.',
    body_lead))
story.append(Paragraph(
    'Claude Code is a command-line tool. You need to be able to open a terminal, '
    'navigate to your project, and run commands. You also need an Anthropic API key '
    'and a basic understanding of Git.',
    body))
story.append(Paragraph(
    'That said, "developer" is a broader category than it used to be. '
    'The rise of AI-assisted coding has dramatically lowered the barrier to writing code. '
    'People who would not have called themselves developers two years ago '
    'are now using Claude Code to build real applications.',
    body))
story.append(Paragraph(
    'Platforms like Paperclip and Polsia are moving toward making Claude Code accessible '
    'without direct command-line interaction — embedding it as an agent in a managed workflow. '
    'Within 12-18 months, the average business owner may be able to deploy Claude Code '
    'as their "developer agent" without writing a single line of code themselves.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 8 ────────────────────────────────────────────────────────────────
story.append(Paragraph('What this means for software development', section_heading))
story.append(rule())
story.append(Paragraph(
    'Claude Code is part of a broader shift in what software development means.',
    body))
story.append(Paragraph(
    'For decades, writing software required deep technical skill, years of learning, '
    'and constant attention to detail. The bottleneck was human developer time.',
    body))
story.append(Paragraph(
    'Autonomous coding agents change the equation. The bottleneck shifts from '
    '"can we write the code?" to "do we know what to build?" '
    'The strategic and product decisions matter more. The implementation matters less.',
    body_lead))
story.append(Paragraph(
    'This does not mean software developers are going away. '
    'It means the nature of the job is changing. Senior developers who can direct, '
    'review, and architect are more valuable. Junior developers who were doing '
    'rote implementation work face the most disruption.',
    body))
story.append(Spacer(1, 4*mm))

# ── GLOSSARY ─────────────────────────────────────────────────────────────────
story.append(Paragraph('Glossary', section_heading))
story.append(rule())

glossary = [
    ('Claude Code', 'Anthropic\'s autonomous coding agent. CLI tool that reads codebases, writes code, runs tests, and commits to Git without step-by-step human instruction.'),
    ('Autonomous coding agent', 'An AI that takes a coding task and completes it end-to-end without human direction of individual steps. Contrast with autocomplete (suggests next line) or AI-assisted editors (human-directed).'),
    ('CLI (Command Line Interface)', 'A text-based way of interacting with a computer. Claude Code runs in the terminal — you type commands rather than clicking a GUI.'),
    ('Git', 'The standard version control system for software projects. Claude Code can stage, commit, and manage Git operations autonomously.'),
    ('SWE-bench', 'The standard benchmark for AI coding ability. Measures how well an agent can solve real software engineering tasks. Claude Opus 4.6: 75.6%.'),
    ('GitHub Copilot', 'Microsoft/GitHub\'s AI coding tool. 77M+ developers. Autocomplete-style — helps as you type. Claude Code is a different category: autonomous.'),
    ('Cursor', 'An AI-assisted code editor. More powerful than Copilot, but still human-directed. Claude Code is autonomous; Cursor is collaborative.'),
    ('Paperclip', 'The multi-agent company orchestration framework that uses Claude Code as a primary developer agent.'),
    ('API key', 'Your credential for accessing the Anthropic API. Required to run Claude Code. You pay per token of usage.'),
    ('Refactor', 'Restructuring existing code without changing its external behaviour. A common use case for Claude Code — especially large-scale refactors across many files.'),
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
story.append(Paragraph('Claude Code is the agent. Here is the ecosystem around it.', body))
story.append(Spacer(1, 4*mm))

next_guides = [
    ('WTF is Claude', 'The model behind Claude Code. Everything about Anthropic\'s flagship AI.', 'wtfagents.com/store'),
    ('WTF is Anthropic', 'The company that built Claude Code. The founding story, the safety mission, the $380B valuation.', 'wtfagents.com/store'),
    ('WTF is Paperclip', 'The orchestration framework that uses Claude Code as its developer agent.', 'wtfagents.com/store'),
    ('WTF is an AI Agent', 'What Claude Code is — and how autonomous agents work under the hood.', 'wtfagents.com/store'),
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
