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

OUTPUT = '/Users/thomasoxlee/agentagous/public/guides/wtf-is-an-api.pdf'

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
    title='WTF is an API', author='WTF Agents',
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
story.append(Paragraph('WTF is an', cover_title))
story.append(Paragraph('API?', cover_sub))
story.append(Spacer(1, 4*mm))
story.append(rule())
story.append(Paragraph(
    'APIs are mentioned in almost every conversation about AI, tech, and the agentic economy. '
    'Almost no one explains what they actually are. This guide does — in plain English, finally.',
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
    'An API (Application Programming Interface) is a set of rules that lets two pieces of software talk to each other.',
    body_lead))
story.append(Paragraph(
    'That is it. That is the whole thing. Everything else in this guide is just unpacking what that means in practice.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 2 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The restaurant analogy', section_heading))
story.append(rule())
story.append(Paragraph(
    'The best analogy for an API is a restaurant.',
    body))
story.append(Paragraph(
    'You are sitting at a table. You want food. The kitchen can make food. '
    'But you do not walk into the kitchen and start cooking. You do not shout instructions at the chef. '
    'You use a menu and a waiter.',
    body))
story.append(Paragraph(
    'The menu tells you what the kitchen can make. '
    'The waiter takes your order to the kitchen and brings the food back.',
    body))
story.append(Paragraph(
    'In this analogy: you are the application making a request. '
    'The kitchen is the other software (a database, a service, an AI model). '
    'The waiter is the API. The menu is the API documentation.',
    body))
story.append(Paragraph(
    'The API is the agreed-upon way that two systems communicate — '
    'what you can ask for, how you ask for it, and what you get back.',
    body_lead))
story.append(Spacer(1, 4*mm))

# ── SECTION 3 ────────────────────────────────────────────────────────────────
story.append(Paragraph('A real-world example', section_heading))
story.append(rule())
story.append(Paragraph('Here is what actually happens when you use a weather app on your phone:', body))
story.append(Paragraph('→  You open your weather app.', bullet))
story.append(Paragraph('→  The app does not have weather data stored on your phone.', bullet))
story.append(Paragraph('→  It sends a request to a weather service\'s API: "Give me the forecast for Mallorca, Spain."', bullet))
story.append(Paragraph('→  The weather service\'s servers process the request.', bullet))
story.append(Paragraph('→  The API sends back the data: temperature, humidity, forecast for the next 7 days.', bullet))
story.append(Paragraph('→  Your app displays it in a nice interface.', bullet))
story.append(Spacer(1, 3*mm))
story.append(Paragraph(
    'You never saw any of that. You just saw the weather. '
    'But an API made the whole thing work.',
    body))
story.append(Paragraph(
    'This same pattern — request, process, respond — underpins almost everything on the internet. '
    'Every time you log in with Google, every time you pay with Stripe, every time you share to Twitter, '
    'every time an AI agent takes an action in the world — an API is involved.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 4 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Why APIs matter for the agentic economy', section_heading))
story.append(rule())
story.append(Paragraph(
    'APIs are the reason AI agents can do anything useful.',
    body_lead))
story.append(Paragraph(
    'An AI agent on its own is just a brain in a jar — it can think and plan but it cannot act. '
    'APIs are the hands and legs. They are how agents connect to the real world.',
    body))
story.append(Paragraph('Here are examples of what agents do via APIs:', body))

api_examples = [
    ('Send an email', 'The agent calls Gmail\'s API or SendGrid\'s API with the message content, recipient, and subject.'),
    ('Browse the web', 'The agent calls a web scraping API or uses a browser automation tool exposed via API.'),
    ('Process a payment', 'The agent calls Stripe\'s API with the amount and card details.'),
    ('Post to social media', 'The agent calls the Twitter/X API or LinkedIn API with the post content.'),
    ('Read a spreadsheet', 'The agent calls the Google Sheets API to retrieve or update data.'),
    ('Book a calendar slot', 'The agent calls the Google Calendar or Calendly API.'),
    ('Query a database', 'The agent calls the Supabase or Postgres API to read or write records.'),
    ('Use an AI model', 'The agent calls the Anthropic API or OpenAI API to get Claude or GPT to think through a problem.'),
]

table_data = [['Action', 'How the agent does it']] + [[a, d] for a, d in api_examples]
t = Table(table_data, colWidths=[45*mm, 115*mm])
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
story.append(Paragraph(
    'Without APIs, an AI agent would be like a genius who has been locked in a room with no phone, '
    'no computer, and no way to interact with the outside world. APIs open the door.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 5 ────────────────────────────────────────────────────────────────
story.append(Paragraph('MCP — the API for AI agents', section_heading))
story.append(rule())
story.append(Paragraph(
    'One of the most important developments in the agentic economy is the '
    'Model Context Protocol (MCP) — invented by Anthropic and published in November 2024.',
    body))
story.append(Paragraph(
    'Before MCP, connecting an AI agent to a specific tool or data source required custom engineering. '
    'Every integration was different. It was like every electrical appliance having a different plug.',
    body))
story.append(Paragraph(
    'MCP standardised it. It is the universal plug — the USB-C for AI. '
    'If a tool supports MCP, any AI agent can connect to it without custom code.',
    body_lead))
story.append(Paragraph(
    'As of 2026, MCP is supported by OpenAI, Google, Microsoft, and virtually all major '
    'agent frameworks. It has been donated to the Agentic AI Foundation '
    '(backed by Anthropic, OpenAI, Google, Microsoft, Amazon, and Cloudflare) — '
    'making it a permanent, neutral open standard.',
    body))
story.append(Paragraph(
    'This matters because it means the ecosystem of tools available to AI agents '
    'is growing exponentially. Every new MCP-compatible tool immediately becomes '
    'available to every MCP-compatible agent.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 6 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The types of API you will hear about', section_heading))
story.append(rule())

api_types = [
    ('REST APIs',
     'The most common type. Uses standard web requests (GET, POST, PUT, DELETE) to retrieve or '
     'send data. When someone says "the API" without specifying, they almost always mean a REST API. '
     'The Polsia API that WTF Agents uses to track company data is a REST API.'),
    ('Webhooks',
     'Instead of you asking the API for data, the API calls you when something happens. '
     'Example: Stripe fires a webhook to your server the moment a payment completes. '
     'You do not have to keep asking "has the payment gone through?" — '
     'Stripe tells you when it does.'),
    ('GraphQL APIs',
     'A more flexible alternative to REST. Instead of getting a fixed set of data, '
     'you specify exactly what fields you want. More efficient but more complex to use.'),
    ('Streaming APIs',
     'Send data continuously rather than in one response. '
     'This is why ChatGPT and Claude type out their responses word by word — '
     'the AI is streaming its output via a streaming API rather than waiting '
     'until it has finished the whole response.'),
    ('SDK (Software Development Kit)',
     'Not technically an API itself, but often confused with one. '
     'An SDK is a package of code that wraps an API and makes it easier to use. '
     'The Anthropic SDK is a Python or JavaScript package that handles '
     'the technical details of calling the Claude API.'),
]

for title, desc in api_types:
    story.append(Paragraph(title, subheading))
    story.append(Paragraph(desc, body))

story.append(Spacer(1, 4*mm))

# ── SECTION 7 ────────────────────────────────────────────────────────────────
story.append(Paragraph('API keys — what they are and why they matter', section_heading))
story.append(rule())
story.append(Paragraph(
    'Almost every API requires an API key — a unique string of characters that identifies who is making the request.',
    body))
story.append(Paragraph(
    'Think of an API key as a password for a service. '
    'When you sign up for the Anthropic API, OpenAI API, or Stripe, '
    'they give you a key that looks something like this: sk-ant-api03-xxxxxxxxxxxxx',
    body))
story.append(Paragraph('API keys matter for three reasons:', body))
story.append(Paragraph('→  <b>Authentication</b> — the service knows it is you making the request, not someone else.', bullet))
story.append(Paragraph('→  <b>Billing</b> — usage is tracked against your key. Lose your key and someone else runs up your bill.', bullet))
story.append(Paragraph('→  <b>Rate limiting</b> — services use keys to enforce limits on how many requests you can make.', bullet))
story.append(Spacer(1, 3*mm))
story.append(Paragraph(
    'The golden rule: never share your API keys publicly. Never commit them to GitHub. '
    'Store them in environment variables (a secure way of passing sensitive values to software '
    'without hardcoding them into your code).',
    body_lead))
story.append(Spacer(1, 4*mm))

# ── SECTION 8 ────────────────────────────────────────────────────────────────
story.append(Paragraph('APIs in everyday life — you use them constantly', section_heading))
story.append(rule())
story.append(Paragraph(
    'You interact with APIs dozens of times a day without knowing it:',
    body))

everyday = [
    ('Logging in with Google', 'Google\'s OAuth API verifies your identity and tells the other site you are who you say you are.'),
    ('Paying online', 'Stripe\'s payment API processes your card securely without the website ever seeing your full card number.'),
    ('Checking the weather', 'Your phone\'s weather app calls a meteorological data API.'),
    ('Getting directions', 'Google Maps or Apple Maps API calculates your route.'),
    ('Posting to Instagram', 'The Instagram API receives your photo and caption and stores it.'),
    ('Reading your emails in a third-party app', 'Gmail\'s API gives the app access to your emails.'),
    ('Using "Sign in with Apple"', 'Apple\'s authentication API verifies you.'),
    ('An AI agent booking your travel', 'The agent calls APIs for flights, hotels, and calendar — all in one automated flow.'),
]

for action, desc in everyday:
    story.append(Paragraph(f'<b>{action}</b> — {desc}',
        ParagraphStyle('ev', fontSize=10, leading=16, textColor=ZINC_300, fontName='Helvetica', spaceAfter=5)))

story.append(Spacer(1, 4*mm))

# ── SECTION 9 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Do you need to understand APIs to use AI agents?', section_heading))
story.append(rule())
story.append(Paragraph(
    'Honestly — not really, for most use cases.',
    body_lead))
story.append(Paragraph(
    'Platforms like OpenClaw, Polsia, and Paperclip handle the API connections for you. '
    'You describe what you want the agent to do, and the platform handles the technical '
    'plumbing of which APIs to call and how.',
    body))
story.append(Paragraph(
    'But understanding what APIs are — and that they exist — helps you in three ways:',
    body))
story.append(Paragraph('→  You understand why agents can do what they can do (and why they sometimes cannot).', bullet))
story.append(Paragraph('→  You can evaluate agent platforms more intelligently — asking "what APIs does this connect to?"', bullet))
story.append(Paragraph('→  If you want to build something custom, you know what to look for.', bullet))
story.append(Spacer(1, 3*mm))
story.append(Paragraph(
    'The agentic economy runs on APIs. You do not need to be a plumber to live in a house with running water. '
    'But knowing that pipes exist, and roughly how they work, makes you a more informed resident.',
    body))
story.append(Spacer(1, 4*mm))

# ── GLOSSARY ─────────────────────────────────────────────────────────────────
story.append(Paragraph('Glossary', section_heading))
story.append(rule())

glossary = [
    ('API (Application Programming Interface)', 'A set of rules that lets two pieces of software communicate with each other.'),
    ('REST API', 'The most common type of API. Uses standard web requests to send and receive data.'),
    ('Webhook', 'An API that pushes data to you when something happens, rather than waiting for you to ask.'),
    ('API key', 'A unique identifier used to authenticate API requests. Treat it like a password.'),
    ('MCP (Model Context Protocol)', 'Anthropic\'s open standard for connecting AI agents to external tools. The universal plug for AI.'),
    ('SDK (Software Development Kit)', 'A package of code that makes it easier to use an API in a specific programming language.'),
    ('Endpoint', 'A specific URL that an API exposes for a specific type of request. E.g. /api/data is the endpoint for Polsia\'s company data.'),
    ('Rate limiting', 'A restriction on how many API requests you can make in a given time period.'),
    ('Authentication', 'The process of proving who you are to an API, usually via an API key or OAuth token.'),
    ('Streaming', 'An API that sends data continuously rather than all at once. How Claude and ChatGPT deliver responses word by word.'),
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
    'Now you know what APIs are — here is where to go next in the WTF Agents series.',
    body))
story.append(Spacer(1, 4*mm))

next_guides = [
    ('WTF is an AI Agent', 'How agents use APIs to take actions in the world. The complete picture.', 'wtfagents.com/store'),
    ('WTF is an LLM', 'The AI brain that sits at the centre of every agent. Plain English, no maths.', 'wtfagents.com/store'),
    ('WTF is Claude', 'The AI model whose API powers most of the agentic economy.', 'wtfagents.com/store'),
    ('WTF is the Agentic Economy', 'The big picture on what is happening and why it matters.', 'wtfagents.com/store'),
    ('How to Hire an AI Agent for Your Business', 'Practical steps to deploy your first agent this week.', 'wtfagents.com/store'),
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
