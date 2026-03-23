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

OUTPUT = '/Users/thomasoxlee/agentagous/public/guides/wtf-is-an-llm.pdf'

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
    title='WTF is an LLM', author='WTF Agents',
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
story.append(Paragraph('LLM?', cover_sub))
story.append(Spacer(1, 4*mm))
story.append(rule())
story.append(Paragraph(
    'Large Language Models are the engines powering ChatGPT, Claude, Gemini, and every AI agent '
    'in the agentic economy. Here is what they actually are — explained simply, '
    'without a single equation.',
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
    'A Large Language Model (LLM) is a type of AI that has been trained on enormous amounts of text '
    'and learned to predict — with remarkable accuracy — what words should come next.',
    body_lead))
story.append(Paragraph(
    'That sounds simple. The implications are not. '
    'From that single capability — predicting the next word — emerge the ability to write, reason, '
    'summarise, translate, code, explain, debate, and plan. '
    'It is one of the most surprising and consequential developments in the history of computing.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 2 ────────────────────────────────────────────────────────────────
story.append(Paragraph('How does predicting words create intelligence?', section_heading))
story.append(rule())
story.append(Paragraph(
    'This is the question that confuses most people. "Predicting the next word" sounds like autocomplete '
    'on your phone. It is not. Here is why.',
    body))
story.append(Paragraph(
    'To accurately predict what word comes next in a sentence, you have to understand the sentence. '
    'To understand the sentence, you have to understand the paragraph. '
    'To understand the paragraph, you have to understand the topic, the context, the nuance.',
    body))
story.append(Paragraph(
    'When researchers trained models on trillions of words of human text — '
    'books, articles, websites, code, scientific papers, conversations — '
    'the models did not just learn to string words together. '
    'They learned to represent meaning. They built internal models of how concepts relate to each other.',
    body))
story.append(Paragraph(
    'The result was not a glorified autocomplete. '
    'It was a system that could reason about problems it had never seen before, '
    'write in styles it had never been explicitly taught, '
    'and explain concepts across dozens of languages and domains.',
    body_lead))
story.append(Spacer(1, 4*mm))

# ── SECTION 3 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Where did LLMs come from?', section_heading))
story.append(rule())
story.append(Paragraph(
    'The story of LLMs is surprisingly recent and moves fast:',
    body))

cell_style = ParagraphStyle('cs', fontSize=8.5, leading=13, textColor=ZINC_300, fontName='Helvetica')
head_style = ParagraphStyle('hs', fontSize=8.5, leading=13, textColor=ORANGE, fontName='Helvetica-Bold')
timeline = [
    ('2017', 'Google researchers publish "Attention Is All You Need" — the paper introducing the Transformer architecture, the technical foundation of all modern LLMs.'),
    ('2018', 'Google releases BERT. OpenAI releases GPT-1. The race begins.'),
    ('2020', 'OpenAI releases GPT-3 — 175 billion parameters, shockingly capable. Developers begin building on it via API.'),
    ('2022', 'OpenAI releases ChatGPT (GPT-3.5). 100 million users in 2 months. Anthropic founded; releases Claude.'),
    ('2023', 'GPT-4 released. Open-source models (LLaMA, Mistral) emerge. AutoGPT goes viral as the first autonomous agent attempt.'),
    ('2024', 'Models capable enough for reliable agentic use. Anthropic publishes MCP. The agentic economy begins.'),
    ('2025–26', 'Claude Opus 4.6 (75.6% SWE-bench), Gemini 3.1 Pro (80.6%), GPT-5.4. Multi-hour autonomous tasks become reliable.'),
]

table_data = [[Paragraph('Year', head_style), Paragraph('What happened', head_style)]] + [[Paragraph(y, head_style), Paragraph(d, cell_style)] for y, d in timeline]
t = Table(table_data, colWidths=[22*mm, 138*mm])
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

# ── SECTION 4 ────────────────────────────────────────────────────────────────
story.append(Paragraph('The main LLMs in 2026 — who makes what', section_heading))
story.append(rule())
story.append(Paragraph(
    'There are three dominant LLM providers and a growing ecosystem of open-source alternatives:',
    body))

llms = [
    ('Claude (Anthropic)',
     'Anthropic\'s flagship model family. Current version: Claude 4.6, with Opus (most powerful) '
     'and Sonnet (faster, more affordable) variants. '
     'Claude Opus 4.6 scores 75.6% on SWE-bench — the standard benchmark for software engineering tasks. '
     'Claude is the default model for OpenClaw and widely used in agent frameworks. '
     'Anthropic\'s focus on safety and Constitutional AI training makes Claude the preferred choice '
     'for agentic deployments where reliability and honesty matter. '
     'Context window: up to 1 million tokens (beta). '
     'Anthropic valuation: $380 billion.'),
    ('GPT-5.4 (OpenAI)',
     'OpenAI\'s latest flagship model as of March 2026. '
     'Native computer use capability. 1 million token context window in Codex. '
     'Powers ChatGPT, which remains the most widely used consumer AI product in the world. '
     'OpenAI also released Codex — an autonomous coding agent built on GPT-5.4. '
     'OpenAI valuation: $300 billion+.'),
    ('Gemini 3.1 Pro (Google DeepMind)',
     'Google\'s flagship model. Currently holds the highest score on SWE-bench Verified (80.6%). '
     'Deeply integrated with Google\'s ecosystem — Search, Workspace, Android. '
     'Google also created the Agent2Agent (A2A) protocol for agent interoperability. '
     'Available via Google Cloud (Vertex AI).'),
    ('Open-source models (LLaMA, Mistral, DeepSeek)',
     'A growing ecosystem of models that anyone can run on their own hardware. '
     'Meta\'s LLaMA family is the most widely used. Mistral (French AI lab) produces '
     'highly efficient smaller models. DeepSeek (Chinese) produced models that competed '
     'with GPT-4 at a fraction of the training cost — a significant moment in early 2025. '
     'OpenClaw supports DeepSeek as an alternative to Claude or GPT.'),
]

for title, desc in llms:
    story.append(Paragraph(title, subheading))
    story.append(Paragraph(desc, body))

story.append(Spacer(1, 4*mm))

# ── SECTION 5 ────────────────────────────────────────────────────────────────
story.append(Paragraph('What LLMs are good at — and bad at', section_heading))
story.append(rule())

table_data = [
    ['LLMs are good at', 'LLMs are bad at'],
    ['Writing in any style or tone', 'Precise arithmetic (they approximate)'],
    ['Summarising long documents', 'Real-time information (training data has a cutoff)'],
    ['Writing and explaining code', 'Guaranteed factual accuracy (they can "hallucinate")'],
    ['Translating between languages', 'Knowing what they don\'t know'],
    ['Reasoning through multi-step problems', 'Consistent behaviour on identical inputs'],
    ['Generating creative ideas', 'Tasks requiring persistent memory by default'],
    ['Explaining complex topics simply', 'Physical world interaction (without agent tools)'],
]
t = Table(table_data, colWidths=[83*mm, 83*mm])
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), ZINC_800),
    ('TEXTCOLOR', (0,0), (-1,0), ORANGE),
    ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
    ('TEXTCOLOR', (0,1), (-1,-1), ZINC_300),
    ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
    ('FONTSIZE', (0,0), (-1,-1), 8.5),
    ('LEADING', (0,0), (-1,-1), 14),
    ('GRID', (0,0), (-1,-1), 0.5, ZINC_600),
    ('PADDING', (0,0), (-1,-1), 8),
    ('WORDWRAP', (0,0), (-1,-1), 1),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [DARK_BG, ZINC_900]),
]))
story.append(KeepTogether([t]))
story.append(Spacer(1, 4*mm))

# ── SECTION 6 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Hallucination — the most important limitation', section_heading))
story.append(rule())
story.append(Paragraph(
    'The most important thing to understand about LLMs is hallucination: '
    'the tendency to produce confident, plausible-sounding text that is factually wrong.',
    body_lead))
story.append(Paragraph(
    'This happens because LLMs do not "know" facts the way a database does. '
    'They generate text based on patterns learned during training. '
    'When asked about something outside their training data, or at the edge of their knowledge, '
    'they sometimes generate text that sounds right but is not.',
    body))
story.append(Paragraph(
    'A lawyer once submitted a legal brief to a US court that cited cases generated by ChatGPT. '
    'The cases did not exist. The judge was not amused.',
    body))
story.append(Paragraph(
    'This is why human oversight of AI agents remains important — especially for high-stakes decisions. '
    'The models are getting better at knowing what they do not know, but they are not perfect. '
    'Treat LLM outputs as a very capable first draft, not a final source of truth.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 7 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Parameters, tokens, and context windows', section_heading))
story.append(rule())
story.append(Paragraph(
    'Three technical terms come up constantly when people discuss LLMs. '
    'Here is what they actually mean:',
    body))

story.append(Paragraph('Parameters', subheading))
story.append(Paragraph(
    'Parameters are the numerical values inside the model that were adjusted during training. '
    'GPT-3 had 175 billion parameters. Modern frontier models have trillions. '
    'More parameters generally means more capability — but also more cost to run. '
    'In plain English: parameters are roughly analogous to the "size" of the model\'s brain.',
    body))

story.append(Paragraph('Tokens', subheading))
story.append(Paragraph(
    'LLMs do not process words — they process tokens. A token is roughly 3–4 characters, '
    'or about 0.75 words. "Hello, how are you?" is about 6 tokens. '
    'You pay for AI API usage in tokens — both the tokens you send (input) and the tokens '
    'the model generates (output). A typical page of text is around 500 tokens.',
    body))

story.append(Paragraph('Context window', subheading))
story.append(Paragraph(
    'The context window is how much text an LLM can "see" at once — '
    'the conversation history, the document you shared, the instructions you gave. '
    'Early models had tiny context windows (4,000 tokens = about 3 pages of text). '
    'Claude Opus 4.6 has a 1 million token context window — roughly 750,000 words, '
    'or the equivalent of several full novels. '
    'This is why modern agents can work with entire codebases or long documents at once.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 8 ────────────────────────────────────────────────────────────────
story.append(Paragraph('Constitutional AI — Anthropic\'s approach to safety', section_heading))
story.append(rule())
story.append(Paragraph(
    'Different companies train their LLMs differently. Anthropic\'s approach — '
    'Constitutional AI — is worth understanding because it directly affects '
    'how Claude behaves as an agent.',
    body))
story.append(Paragraph(
    'Constitutional AI is a training technique where the model is given a set of principles '
    '(a "constitution") and trained to critique and revise its own outputs against those principles. '
    'The result is a model that is more reliably helpful, honest, and harmless — '
    'not because it is restricted, but because it has internalised values.',
    body))
story.append(Paragraph(
    'This matters for agentic use because an agent running autonomously for hours needs to '
    'make judgment calls constantly. A model trained with Constitutional AI is more likely '
    'to handle edge cases sensibly — declining to take actions that could cause harm, '
    'flagging ambiguous situations for human review, and being honest about its limitations.',
    body))
story.append(Spacer(1, 4*mm))

# ── SECTION 9 ────────────────────────────────────────────────────────────────
story.append(Paragraph('LLMs and the agentic economy', section_heading))
story.append(rule())
story.append(Paragraph(
    'The LLM is the brain of every AI agent. Without it, an agent is just a '
    'set of if-then rules — useful but brittle. With it, the agent can:',
    body))
story.append(Paragraph('→  Understand ambiguous instructions and figure out what you actually meant.', bullet))
story.append(Paragraph('→  Handle situations it was not explicitly programmed for.', bullet))
story.append(Paragraph('→  Generate plans for achieving goals, not just execute fixed scripts.', bullet))
story.append(Paragraph('→  Read and understand unstructured data — emails, documents, web pages.', bullet))
story.append(Paragraph('→  Communicate its results in natural language.', bullet))
story.append(Spacer(1, 3*mm))
story.append(Paragraph(
    'The rapid improvement of LLMs over the past three years — from GPT-3 in 2020 to '
    'Claude 4.6 and Gemini 3.1 in 2026 — is the primary reason the agentic economy '
    'is happening now rather than ten years from now. '
    'The models crossed a threshold of capability that made autonomous, reliable action possible.',
    body))
story.append(Spacer(1, 4*mm))

# ── GLOSSARY ─────────────────────────────────────────────────────────────────
story.append(Paragraph('Glossary', section_heading))
story.append(rule())

glossary = [
    ('LLM (Large Language Model)', 'An AI trained on vast amounts of text to predict and generate language. The brain inside ChatGPT, Claude, and Gemini.'),
    ('Transformer', 'The neural network architecture that underlies all modern LLMs. Introduced by Google in 2017.'),
    ('Parameters', 'The numerical values inside an LLM adjusted during training. More parameters = generally more capable.'),
    ('Token', 'The unit LLMs use to process text. Roughly 3–4 characters or 0.75 words. You pay for API usage in tokens.'),
    ('Context window', 'How much text an LLM can process at once. Claude Opus 4.6: up to 1 million tokens.'),
    ('Hallucination', 'When an LLM generates confident but factually incorrect text. A key limitation to understand.'),
    ('Constitutional AI', 'Anthropic\'s technique for training models to be helpful, honest, and harmless using a set of principles.'),
    ('SWE-bench', 'The standard benchmark for measuring LLM performance on real software engineering tasks.'),
    ('Fine-tuning', 'Training an existing LLM further on a specific dataset to improve performance on a specific task.'),
    ('Inference', 'Running an LLM to generate a response. The "thinking" part, as opposed to training.'),
    ('Open-source model', 'An LLM whose weights are publicly available — anyone can run it. Examples: LLaMA, Mistral, DeepSeek.'),
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
    'Now you know what LLMs are. Here is the rest of the WTF Agents series.',
    body))
story.append(Spacer(1, 4*mm))

next_guides = [
    ('WTF is Claude', 'The LLM powering most of the agentic economy. Deep dive on Anthropic\'s flagship model.', 'wtfagents.com/store'),
    ('WTF is an AI Agent', 'How LLMs become agents — the tools, loops, and protocols that make it possible.', 'wtfagents.com/store'),
    ('WTF is the Agentic Economy', 'The big picture — market size, major players, real numbers.', 'wtfagents.com/store'),
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
