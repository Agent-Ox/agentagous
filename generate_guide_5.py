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

OUTPUT = '/Users/thomasoxlee/agentagous/public/guides/wtf-is-polsia.pdf'

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
    title='WTF is Polsia', author='WTF Agents',
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
caveat = ParagraphStyle('caveat', fontSize=10, leading=16, textColor=ZINC_400, fontName='Helvetica-Oblique', spaceAfter=6, leftIndent=10, borderPadding=6)
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
story.append(Paragraph('Polsia?', cover_sub))
story.append(Spacer(1, 4*mm))
story.append(rule())
story.append(Paragraph(
    'A solo founder. Zero employees. Over 1,000 AI-run companies. '
    'Claims of $1.5M ARR in 30 days. Is it real? Is it hype? '
    'This guide separates the facts from the noise.',
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
    'Polsia is a managed platform where you pay a monthly fee, describe a business idea, '
    'and AI agents build and run the company for you — marketing, coding, customer support, '
    'operations — with minimal or zero human involvement.',
    body_lead))
story.append(Paragraph(
    'The founder\'s tagline: "AI that runs your company while you sleep."',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 2 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Who built it and why', section_heading))
story.append(rule())
story.append(Paragraph(
    'Polsia was built by Ben Cera — also referred to as Ben Broca in some professional contexts — '
    'a Columbia University graduate based in San Francisco. '
    'He is a solo founder. Polsia has no employees beyond him.',
    body))
story.append(Paragraph(
    'The idea is straightforward: if an AI can write code, create marketing copy, '
    'handle customer enquiries, and analyse financial data — why not point all of those '
    'capabilities at a single goal and let them run a business autonomously?',
    body))
story.append(Paragraph(
    'Polsia launched publicly on Product Hunt in February 2026 and generated significant '
    'attention in the startup and AI communities.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 3 ────────────────────────────────────────────────────────────────
story.append(Paragraph('How it works', section_heading))
story.append(rule())

steps = [
    ('You pay', '$50/month per company. Polsia also takes a 20% revenue share from any revenue your company generates.'),
    ('You describe', 'You tell Polsia what your company does — the product, the target customer, the problem it solves.'),
    ('Agents take over', 'Polsia\'s AI agents handle: market research, product development, website creation, content marketing, customer communications, financial reporting.'),
    ('You monitor', 'You can check in on your company\'s progress. But the day-to-day is handled without you.'),
    ('Revenue flows', 'If the company generates revenue, Polsia takes 20%. You keep 80%.'),
]

table_data = [['Step', 'What happens']] + [[s, d] for s, d in steps]
t = Table(table_data, colWidths=[25*mm, 135*mm])
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), ZINC_800),
    ('TEXTCOLOR', (0,0), (-1,0), ORANGE),
    ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
    ('FONTNAME', (0,1), (0,-1), 'Helvetica-Bold'),
    ('TEXTCOLOR', (0,1), (0,-1), ORANGE),
    ('TEXTCOLOR', (1,1), (-1,-1), ZINC_300),
    ('FONTNAME', (1,1), (-1,-1), 'Helvetica'),
    ('FONTSIZE', (0,0), (-1,-1), 9),
    ('LEADING', (0,0), (-1,-1), 14),
    ('GRID', (0,0), (-1,-1), 0.5, ZINC_600),
    ('PADDING', (0,0), (-1,-1), 6),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [DARK_BG, ZINC_900]),
]))
story.append(t)
story.append(Spacer(1, 4*mm))

# ── SECTION 4 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The numbers — what\'s verified and what isn\'t', section_heading))
story.append(rule())
story.append(Paragraph(
    'This is the section that matters most. Polsia has made significant claims. '
    'Here is what we know, what we don\'t, and what the sceptics say.',
    body))

story.append(Paragraph('What the founder claims:', subheading))
story.append(Paragraph('→  $1 million ARR within 30 days of launch', bullet))
story.append(Paragraph('→  $1.5 million ARR within approximately 6 weeks', bullet))
story.append(Paragraph('→  1,000–1,300+ autonomous companies running on the platform', bullet))
story.append(Paragraph('→  Zero employees beyond himself', bullet))
story.append(Spacer(1, 3*mm))

story.append(Paragraph('What is independently verifiable:', subheading))
story.append(Paragraph(
    '→  The platform is real and operational. WTF Agents tracks 1,293+ companies via '
    'Polsia\'s public API at polsia.imrat.com/api/data.',
    bullet))
story.append(Paragraph(
    '→  The live API returns real data: company names, descriptions, URLs — '
    'all on *.polsia.app subdomains.',
    bullet))
story.append(Paragraph(
    '→  Ben Cera has appeared on multiple credible podcasts (Mixergy, YouTube interviews) '
    'and given consistent accounts.',
    bullet))
story.append(Spacer(1, 3*mm))

story.append(Paragraph('What is not independently verified:', subheading))
story.append(Paragraph(
    '→  The ARR figures come exclusively from the founder. No audited financials have been published.',
    bullet))
story.append(Paragraph(
    '→  The maths raises questions: 1,300 companies × $50/month = $65,000/month = $780,000 ARR. '
    'To reach $1.5M ARR, either pricing is tiered higher for some customers, '
    'revenue share is counted, or the figures include committed contracts not yet realised.',
    bullet))
story.append(Paragraph(
    '→  Reddit communities (r/SaaS, r/AgentsOfAI) have debated the claims extensively, '
    'with sceptics questioning the quality and revenue-generating ability of the AI-run companies.',
    bullet))
story.append(Spacer(1, 3*mm))

story.append(Paragraph(
    'Our verdict: Polsia is a real, operational platform with a genuine model. '
    'The specific ARR claims are unverified and should be treated as founder claims, not facts. '
    'What is not in doubt is that the concept works at some level — '
    'AI agents building and running small companies is real and happening.',
    body_lead))
story.append(Spacer(1, 4*mm))

# ── SECTION 5 ────────────────────────────────────────────────────────────────
story.append(Paragraph('What kinds of companies does Polsia build?', section_heading))
story.append(rule())
story.append(Paragraph(
    'WTF Agents indexes Polsia companies across multiple categories. '
    'Based on live data from the Polsia API, the most common types are:',
    body))

categories = [
    ('SaaS & Dev Tools', 'Software products targeting developers and businesses. Often simple tools with clear value propositions.'),
    ('Sales & Outreach', 'Companies offering B2B lead generation, cold email, and sales automation services.'),
    ('Content & Media', 'Content creation services, newsletters, blogs, and media products.'),
    ('Health & Wellness', 'AI-powered health tracking, nutrition planning, and wellness coaching.'),
    ('E-commerce', 'Online stores and product aggregators.'),
    ('Finance & Analytics', 'Financial analysis tools, budgeting apps, and data services.'),
    ('Trades & Field Ops', 'Services targeting tradespeople — roofing, construction, field services.'),
]

for cat, desc in categories:
    story.append(Paragraph(f'<b>{cat}</b> — {desc}',
        ParagraphStyle('cat', fontSize=10, leading=16, textColor=ZINC_300, fontName='Helvetica', spaceAfter=5)))

story.append(Spacer(1, 4*mm))

# ── SECTION 6 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The honest limitations', section_heading))
story.append(rule())
story.append(Paragraph(
    'Polsia is genuinely interesting. It is also genuinely early and genuinely limited. '
    'Here is what you should know before getting excited:',
    body))

story.append(Paragraph('Quality varies enormously', subheading))
story.append(Paragraph(
    'Browse the Polsia company directory at wtfagents.com/companies and you will see the range. '
    'Some companies have clear value propositions, decent websites, and real-looking products. '
    'Others are thin wrappers — generic landing pages with minimal differentiation. '
    'The AI does not guarantee quality. It guarantees execution of whatever brief it is given.',
    body))

story.append(Paragraph('Revenue is not guaranteed', subheading))
story.append(Paragraph(
    'Building a company and generating revenue are different things. '
    'Polsia\'s agents can build, market, and operate — but customers still have to choose '
    'to pay for whatever the company is selling. '
    'Many Polsia companies are operational but generating little or no revenue.',
    body))

story.append(Paragraph('You are paying $50/month plus 20% of revenue', subheading))
story.append(Paragraph(
    'This is worth thinking about carefully. At scale, the 20% revenue share is significant. '
    'A company generating $10,000/month pays Polsia $2,000. '
    'Whether that is worth it depends entirely on what you would otherwise spend '
    'to operate the company with human labour.',
    body))

story.append(Paragraph('No moat', subheading))
story.append(Paragraph(
    'Multiple Reddit discussions have raised the same concern: '
    'if Polsia can build your company, it can build the same company for your competitor. '
    'The platform does not create defensible businesses by itself — '
    'the human founder still needs to bring the insight, the positioning, and the relationships.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 7 ────────────────────────────────────────────────────────────────
story.append(Paragraph('How Polsia fits in the bigger picture', section_heading))
story.append(rule())
story.append(Paragraph(
    'Polsia is best understood as the scrappy indie end of the agentic economy — '
    'not the enterprise end.',
    body_lead))
story.append(Paragraph(
    'Salesforce Agentforce has 5,000+ enterprise customers. '
    'Klarna\'s AI agents replaced 700 employees\' worth of customer service. '
    'These are the big-budget, big-company deployments.',
    body))
story.append(Paragraph(
    'Polsia is for the one-person founder who wants to launch something with minimal capital '
    'and see if it gets traction. It is a low-cost experiment machine. '
    'At $50/month, the cost of trying is essentially nothing.',
    body))
story.append(Paragraph(
    'In that framing, the ARR debate matters less. '
    'The real story is that you can now launch a functioning business in a day, '
    'for $50/month, with no employees, and see if the market responds. '
    'That has never been possible before.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 8 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The Polsia API — how WTF Agents uses it', section_heading))
story.append(rule())
story.append(Paragraph(
    'Polsia exposes a public API at polsia.imrat.com/api/data that returns live data '
    'on the companies running on the platform.',
    body))
story.append(Paragraph(
    'WTF Agents polls this API every 60 seconds. The homepage stats you see on wtfagents.com — '
    'live ARR, active companies, companies launched today, week-on-week growth — '
    'come directly from this API in real time.',
    body))
story.append(Paragraph(
    'This is genuinely unusual. Most platforms do not expose this kind of live operational data publicly. '
    'The fact that Polsia does is either a sign of confidence in the numbers — '
    'or a sign that the numbers are not quite what they appear.',
    body))
story.append(Spacer(1, 4*mm))

# ── GLOSSARY ─────────────────────────────────────────────────────────────────
story.append(Paragraph('Glossary', section_heading))
story.append(rule())

glossary = [
    ('Polsia', 'A managed platform where AI agents build and run companies autonomously. Founded by Ben Cera, launched February 2026.'),
    ('ARR (Annual Recurring Revenue)', 'The annualised value of recurring subscription revenue. The standard measure of a SaaS business\'s size.'),
    ('Revenue share', 'A model where a platform takes a percentage of the revenue generated by companies on its platform. Polsia takes 20%.'),
    ('Product Hunt', 'A website where new tech products are launched and voted on by the community. A common first distribution channel for startups.'),
    ('polsia.imrat.com/api/data', 'Polsia\'s public API endpoint. Returns live data on companies, ARR, and growth metrics.'),
    ('Polsia company', 'A business built and operated by Polsia\'s AI agents, accessible via a *.polsia.app subdomain.'),
    ('Solo founder', 'A startup founder with no co-founders. Ben Cera runs Polsia alone.'),
    ('Managed platform', 'A service where the provider handles the technical infrastructure and operations. Contrast with self-hosted (OpenClaw, Paperclip).'),
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
    'Polsia is one piece of the agentic economy puzzle. Here is the rest of the picture.',
    body))
story.append(Spacer(1, 4*mm))

next_guides = [
    ('WTF is OpenClaw', 'The viral open-source agent — very different from Polsia. 247K GitHub stars, security controversies, OpenAI involvement.', 'wtfagents.com/store'),
    ('WTF is Paperclip', 'The orchestration framework for running multi-agent companies. The infrastructure layer.', 'wtfagents.com/store'),
    ('WTF is the Agentic Economy', 'The big picture — where Polsia fits in the $52B+ market.', 'wtfagents.com/store'),
    ('WTF is an AI Agent', 'What is actually doing the work inside Polsia. The full explanation.', 'wtfagents.com/store'),
    ('How to Hire an AI Agent for Your Business', 'Practical guide to deploying agents — including alternatives to Polsia.', 'wtfagents.com/store'),
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
    '<b>Scan to browse all guides</b>\n\nAll 11 WTF Agents guides at wtfagents.com/store\n\n$7 each · Bundles from $29 · Instant PDF download\n\nAlso: browse 1,293+ real AI companies live at wtfagents.com/companies',
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
