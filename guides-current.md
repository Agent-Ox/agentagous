# WTF Agents — current guide text

Full text of all 12 guides, extracted from the `generate_guide_N.py` scripts so a rewrite can work from the prose rather than the generators.

_Extracted 2026-09-15. Source of truth is still the scripts — this file is a snapshot and is not wired into the build._

## Contents

| # | Slug | Title | Script | Pages |
|---|---|---|---|---|
| 1 | `agentic-economy` | WTF is the Agentic Economy | `generate_guide_1.py` | 9 |
| 2 | `ai-agent` | WTF is an AI Agent | `generate_guide_2.py` | 8 |
| 3 | `api` | WTF is an API | `generate_guide_3.py` | 7 |
| 4 | `llm` | WTF is an LLM | `generate_guide_4.py` | 7 |
| 5 | `polsia` | WTF is Polsia | `generate_guide_5.py` | 6 |
| 6 | `openclaw` | WTF is OpenClaw | `generate_guide_6.py` | 7 |
| 7 | `paperclip` | WTF is Paperclip | `generate_guide_7.py` | 6 |
| 8 | `anthropic` | WTF is Anthropic | `generate_guide_8.py` | 7 |
| 9 | `claude` | WTF is Claude | `generate_guide_9.py` | 6 |
| 10 | `claude-code` | WTF is Claude Code | `generate_guide_10.py` | 6 |
| 11 | `cowork` | WTF is Cowork | `generate_guide_12.py` | 9 |
| 12 | `hire-agent` | How to Hire an AI Agent for Your Business | `generate_guide_11.py` | 8 |

**12 guides · 86 pages total.**

## How the scripts are structured

All 12 scripts are **standalone and self-contained** — there is no shared module or
template file. Each `generate_guide_N.py` re-declares the same palette, styles and
helpers, then builds one PDF. A rewrite should either keep that shape or factor the
common parts out; the duplication is the main maintenance cost today.

**Document setup** (identical in all 12): A4, 20 mm left/right margins, 22 mm
top/bottom, `title` set to the guide title, `author='WTF Agents'`. `OUTPUT` is a
hardcoded absolute path into `public/guides/`.

**Palette** (shared constants): `ORANGE #f97316`, `DARK_BG #09090b`,
`ZINC_900 #18181b`, `ZINC_800 #27272a`, `ZINC_600 #52525b`, `ZINC_400 #a1a1aa`,
`ZINC_300 #d4d4d8`, `WHITE`, plus `GREEN #22c55e` / `RED #ef4444` for comparison
tables.

**Paragraph styles and their roles:**

| Style | Role |
|---|---|
| `cover_title` / `cover_sub` | Cover headline, split across two lines (white, then orange) |
| `cover_desc` | Cover standfirst paragraph |
| `cover_meta` / `small` | Cover byline, date, series line, footnotes |
| `section_heading` | Top-level section title (orange, 20pt), always followed by `rule()` |
| `subheading` | Sub-section title within a section (white, 13pt) |
| `body` | Main body text, justified |
| `body_lead` | Bold orange lead-in sentence, used to open a section |
| `bullet` | Bulleted line, indented 14pt |
| `callout` | Bold white emphasis line — the "remember this" sentence |
| `stat_num` / `stat_lbl` | Big centred figure with a caption underneath, emitted as pairs in a loop |
| `link_style` | Orange indented link line |
| `footer_s` | Centred closing footer lines |

**Page furniture:** an `on_page(canvas, doc)` callback paints the dark background
over the whole page, draws a 3pt orange bar across the top, and centres
`wtfagents.com · Page N · © 2026 WTF Agents` at the foot. It is passed to
`doc.build(story, onFirstPage=on_page, onLaterPages=on_page)`.

**Section rhythm:** cover page → `PageBreak()` → repeated
`section_heading` + `rule()` + body/bullets/callouts → a second `PageBreak()` before
the closing material. Every script has exactly 2 page breaks; section counts run
9–13 per guide.

**Boxes and tables:** comparison and summary boxes are `Table` + `TableStyle`
(header row on `ZINC_800`, `GRID` in `ZINC_600`, alternating `ROWBACKGROUNDS`),
wrapped in `KeepTogether([t])` so they never split across a page. Cell text is
itself `Paragraph` objects using two inline styles, `hs` (orange bold header) and
`cs` (zinc body).

**QR code:** every guide ends with one. `make_qr(url)` builds a `qrcode.QRCode`
(version 2, high error correction, orange on dark), renders to an in-memory PNG and
returns a 38 mm `RLImage`. It is placed in a two-column `Table` (45 mm / 115 mm)
beside a short promo paragraph, above the footer lines. In the text below these
appear as `[QR CODE]`.

**Closing block:** `zinc_rule()` → QR table → `zinc_rule()` → two `footer_s` lines
(tagline and copyright).

**Regeneration:** `regenerate_all_guides.py` shells out to
`generate_guide_1.py` … `generate_guide_12.py` in order. `build_bundles.py` then
merges the singles into the two bundle PDFs.

> Note on markup: the source text uses reportlab inline tags (`<b>`, `<br/>`,
> `<link>`, `<font>`). Those have been converted to Markdown below, so bold and
> links are preserved but the exact inline colouring is not.

---


# 1. WTF is the Agentic Economy

- **Slug:** `agentic-economy`
- **Script:** `generate_guide_1.py`
- **PDF:** `public/guides/wtf-is-the-agentic-economy.pdf`
- **Pages:** 9
- **Sections:** 117 text blocks, 2 table/box, 2 page breaks

---

**WTF is the**

**Agentic Economy?**

The plain English guide to the biggest shift in business, employment, and technology since the internet. No jargon. No hype. Just what is actually happening — and what it means for you.

_WTF Agents · wtfagents.com · March 2026_

_Part of the WTF Agents Guide Series · wtfagents.com/store_

---

### The one-liner

**The agentic economy is what happens when AI stops waiting to be asked and starts doing things on its own — planning, deciding, executing, and repeating — around the clock, at a fraction of the cost of a human.**

This is not a future prediction. It is happening right now, at a scale most people have not yet registered.

### When did this actually start?

The term "agentic economy" began appearing in industry writing around mid-2024. The New York Times ran one of the first mainstream articles using the phrase in September 2024. By late 2024, Sam Altman (OpenAI), Satya Nadella (Microsoft), and Dario Amodei (Anthropic) were all using it in major public speeches.

The first peer-reviewed academic paper on the subject was published in May 2025, and formally entered the Communications of the ACM in January 2026. In under eighteen months, it went from startup jargon to board-level agenda item at Fortune 500 companies.

Gartner — the world's most cited technology research firm — projects that 40% of enterprise software applications will be integrated with task-specific AI agents by the end of 2026. That is up from less than 5% in 2025.

**To put that in plain English: within twelve months, nearly half of all business software will have an AI that does things, not just answers questions.**

### What is an AI agent, exactly?

Most people's experience of AI is reactive: you type something, it responds. ChatGPT, Siri, Google — you ask, they answer.

An AI agent is different. An agent is proactive. You give it a goal, and it figures out the steps, executes them one by one, checks the results, adjusts, and tries again — without you holding its hand through each step.

Here is the difference in a table:

|   | Traditional AI | AI Agent |
|---|---|---|
| Trigger | You ask it something | You give it a goal |
| Action | Responds once | Takes multiple steps autonomously |
| Memory | Forgets after each conversation | Remembers context across sessions |
| Tools | Text only | Can browse web, write code, send email, make payments |
| Works while you sleep? | No | Yes |

The simplest analogy: a calculator waits for you to press buttons. An agent is more like a capable employee who takes a brief and gets on with the job.

### The scale of what's happening

These are not startup claims. These are verified, sourced facts:

- **$5.25B** — size of the agentic AI market in 2024
- **$52B+** — projected market size by 2030 (MarketsandMarkets)
- **79%** — of organisations report some agentic AI deployment (2025)
- **40%** — of enterprise apps will have AI agents by end of 2026 (Gartner)
- **700** — full-time customer service roles worth of work handled by AI at Klarna
- **5,000+** — enterprise customers on Salesforce Agentforce alone
McKinsey estimates that generative and agentic AI could add between $2.6 trillion and $4.4 trillion annually to global GDP. The WEF projects 170 million new jobs created by AI by 2030 — offsetting 85 million displaced, for a net positive.

A word of caution: Gartner also predicts that 40% of agentic AI projects will be cancelled by 2027 due to unrealistic expectations. This is a revolution, but it is not magic. The technology is powerful and the hype is real — and so is the messiness.

### The big players — who is actually leading this

The agentic economy is not being built by scrappy startups alone. The largest technology companies in the world are betting their futures on it.

#### Anthropic — the safety-first AI lab

Founded in 2021 by Dario and Daniela Amodei (former OpenAI executives) and a team of AI safety researchers. Anthropic's flagship model is Claude — the AI that powers OpenClaw, Paperclip, and dozens of the most important agent frameworks. Current valuation: $380 billion. Backers include Amazon, Google, and Nvidia. They also invented the Model Context Protocol (MCP) — the open standard that lets AI agents connect to any tool or data source. Think of MCP as USB-C for AI.

#### OpenAI — the consumer and enterprise giant

The company behind ChatGPT and GPT-5.4. OpenAI launched Codex (autonomous coding agent) and Operator (computer-use agent) in 2025–2026. In February 2026, they hired Peter Steinberger (creator of OpenClaw) and became financial sponsor of the OpenClaw Foundation. Valuation: $300 billion+.

#### Google DeepMind — the benchmark setter

Google's Gemini 3.1 Pro currently holds the highest verified score on SWE-bench (80.6%) — the industry standard benchmark for AI coding ability. Google also created the Agent2Agent (A2A) protocol in April 2025 — the open standard that lets AI agents from different companies talk to each other. Launched with 50+ partner companies including Salesforce, SAP, PayPal, and McKinsey.

#### Microsoft — the enterprise distribution machine

Invested $10B+ in OpenAI. Distributes both OpenAI and Anthropic models via Azure. GitHub Copilot (77 million+ developers). Copilot for Microsoft 365 reporting 20–30% productivity gains in enterprise knowledge work.

#### Salesforce Agentforce — the enterprise deployment leader

Marc Benioff declared 2025 "the year of the agent" and bet the company on agentic workflows. Agentforce now has 5,000+ paying enterprise customers embedding AI agents into CRM, sales, and support workflows. This is the largest verified enterprise agentic deployment as of 2026.

### The real-world proof — it's already happening

#### Klarna replaces 700 employees with AI agents

Swedish fintech Klarna deployed AI agents across its customer service operation. CEO Sebastian Siemiatkowski publicly stated the AI does the equivalent work of 700 full-time employees. The company subsequently reduced its human customer service headcount. (Note: Klarna later qualified some of these statements — exact displacement figures remain disputed but the deployment itself is verified.)

#### A bot hiring humans — Rentahuman.ai

One of the most striking signals of where the economy is heading: Rentahuman.ai is a platform where AI agents hire humans — not the other way around. Agents post jobs for tasks they cannot complete autonomously (physical tasks, tasks requiring legal identity, tasks needing human judgment). Forbes called it "a new platform that flips the usual narrative about AI."

#### WEF Davos 2026 — 32 verified enterprise deployments

The World Economic Forum, in collaboration with Accenture, documented 32 verified large-scale enterprise AI deployments across manufacturing, healthcare, financial services, and logistics. These are not pilots. These are production systems.

### The indie opportunity — where the little guy wins

**Here is what makes the agentic economy genuinely different from every previous technology revolution: the barrier to entry is essentially zero.**

The same tools that power Salesforce Agentforce's 5,000-customer enterprise platform are available to a single person sitting at a laptop in Mallorca. The gap between "big company" and "one person" has never been smaller.

#### OpenClaw — the open-source agent that went viral

OpenClaw (originally Clawdbot, then Moltbot) was built by Austrian developer Peter Steinberger and launched in November 2025. It is a free, open-source autonomous AI agent that runs on your machine and connects to Claude, GPT, or DeepSeek via messaging apps like Signal, Telegram, and Discord. By February 2026 it had 247,000 GitHub stars — one of the fastest-growing open-source projects in history. Steinberger was subsequently hired by OpenAI, and the project moved to an independent open-source foundation backed by OpenAI.

Important: OpenClaw is a personal AI agent, not a company-building platform. It is the tools layer — the thing that does the work.

#### Polsia — AI that runs your company while you sleep

Polsia is a managed platform founded by Ben Cera (also known as Ben Broca) in San Francisco. The model: pay $50/month, describe a business, and AI agents handle everything — coding, marketing, customer support, operations. The founder claims $1–1.5M ARR within 30 days of launch. These figures are unverified by independent third parties and have been debated on Reddit and in tech communities. The platform itself is real and operational. WTF Agents tracks 1,293+ companies on Polsia via the live API at polsia.imrat.com/api/data.

#### Paperclip — the orchestration layer

Paperclip is an open-source orchestration framework that lets you build a multi-agent "company org chart" — assigning roles, workflows, and goals across multiple AI agents simultaneously. Tagline: "Any agent, any runtime, one org chart." It integrates with Claude Code, OpenClaw, Cursor, and others. ClipMart (coming soon) will let you download entire pre-built company templates with one click. 13,500 GitHub stars in days of launch.

#### The protocols making it all work

Two open standards are the invisible infrastructure of the agentic economy:

- → **MCP (Model Context Protocol)** — invented by Anthropic, November 2024. Lets AI agents connect to any external tool or data source. Think USB-C for AI. Now donated to the Agentic AI Foundation (backed by Anthropic, OpenAI, Google, Microsoft, AWS).
- → **A2A (Agent2Agent Protocol)** — created by Google, April 2025. Lets AI agents from different companies talk to each other. Launched with 50+ partners including Salesforce, SAP, PayPal, McKinsey, Deloitte.

### The messy reality — it's not all smooth

The agentic economy is real. It is also chaotic, occasionally dangerous, and moving faster than regulation, security, or most businesses can keep up with.

#### The Moltbook incident

Moltbook was a social network built exclusively for AI agents — launched January 2026 by entrepreneurs Matt Schlicht and Ben Parr. Within days, AI agents were autonomously posting to it without their human owners' knowledge. Within a week, a database misconfiguration exposed 6,000+ email addresses and 1 million agent interactions. Security firm Wiz confirmed the flaw allowed anyone to take control of any agent on the platform. Moltbook was acquired by Meta in March 2026.

#### OpenClaw's security problem

Cisco's AI security team tested a third-party OpenClaw skill and found it performed silent data exfiltration and prompt injection without user awareness. One of OpenClaw's own maintainers publicly warned: "If you can't understand how to run a command line, this is far too dangerous of a project for you to use safely." China restricted OpenClaw in government offices in March 2026.

#### The jobs question

The entry-level job market is already being affected. Administrative tasks, basic coding, research, customer support — these are where AI agents are most competent and most deployed. The WEF projects a net positive (170M new jobs vs 85M displaced) but acknowledges a "significant skills transition" is required. The transition is the hard part.

### What this means for you

#### If you run a small business:

The tools available to you today — Claude, OpenClaw, Paperclip, Relevance AI — give you the operational capacity of a team for the cost of a few subscriptions. Customer support, content creation, data analysis, outreach: all automatable right now. The question is not whether to use these tools. It is how fast to move.

#### If you are an employee:

The roles most at risk are the ones involving repetitive, process-driven work. The roles being created are the ones that involve directing, overseeing, and collaborating with AI agents. The people winning right now are the ones who treat AI agents as junior colleagues, not threats.

#### If you are curious and want to understand this space:

You are reading the right guide. The rest of the WTF Agents series goes deeper on each platform, tool, and concept in this guide. The agentic economy does not require a computer science degree. It requires curiosity and a willingness to experiment.

### Glossary

**AI Agent** — An AI system that pursues goals autonomously — taking actions, using tools, and adapting without constant human instruction.

**LLM (Large Language Model)** — The AI "brain" at the core of most agents. Examples: Claude (Anthropic), GPT-5.4 (OpenAI), Gemini 3.1 (Google).

**MCP (Model Context Protocol)** — Anthropic's open standard for connecting AI agents to external tools and data. The "USB-C for AI."

**A2A (Agent2Agent Protocol)** — Google's open standard for AI agents from different companies to communicate with each other.

**SWE-bench** — The industry benchmark for measuring how well an AI can solve real software engineering tasks. Higher = better.

**Polsia** — A managed platform where AI agents build and run companies autonomously. Founded by Ben Cera.

**OpenClaw** — A free, open-source autonomous AI agent. Runs locally, connects via messaging apps. Created by Peter Steinberger.

**Paperclip** — An open-source orchestration framework for running multi-agent companies.

**Moltbook** — A social network built for AI agents. Launched January 2026, acquired by Meta March 2026.

**Constitutional AI** — Anthropic's technique for training AI models to be helpful, honest, and harmless using a set of principles.

**ARR (Annual Recurring Revenue)** — How much money a business makes per year from recurring customers. The standard startup health metric.

**Agentic Economy** — The emerging economic system in which AI agents perform meaningful economic work with minimal human supervision.

---

### Liked this? Go deeper.

This guide gave you the big picture. The WTF Agents series goes deep on every platform, tool, and concept mentioned here. Each guide is $7 — instant PDF download.

**WTF is Claude**

The AI powering the agentic economy. What it is, how it works, why it matters.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is OpenClaw**

The viral open-source agent that went from 0 to 247K GitHub stars in 60 days.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Polsia**

The platform claiming to run 1,300+ companies autonomously. What's real and what's hype.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is an AI Agent**

The deep dive on agents specifically — how they think, plan, and act.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Cowork**

Claude Code was for developers. Cowork is for everyone else. The product that wiped $285B off enterprise software stocks.

[wtfagents.com/store](https://wtfagents.com/store)

Want this level of insight every Monday?

WTF Agents Intelligence is the weekly briefing on the agentic economy — real data, real companies, real insight. Top 10 fastest-growing AI companies, vertical reports, platform watch, deep dives. Every Monday. $49/month. Cancel anytime.

[wtfagents.com/intelligence →](https://wtfagents.com/intelligence)

| [QR CODE] | **Scan to browse all guides** All WTF Agents guides at wtfagents.com/store $7 each · Bundles from $29 · Instant PDF download Also: free company directory, jobs board, idea exchange and the weekly Intelligence briefing at $49/mo. |
|---|---|

_WTF Agents · wtfagents.com · The autonomous company economy is here. WTF is happening._

_© 2026 WTF Agents. All rights reserved. Sources available at wtfagents.com_


# 2. WTF is an AI Agent

- **Slug:** `ai-agent`
- **Script:** `generate_guide_2.py`
- **PDF:** `public/guides/wtf-is-an-ai-agent.pdf`
- **Pages:** 8
- **Sections:** 112 text blocks, 2 table/box, 2 page breaks

---

**WTF is an**

**AI Agent?**

Everyone is talking about AI agents. Almost nobody is explaining them properly. This guide fixes that — in plain English, with real examples, no jargon.

_WTF Agents · wtfagents.com · March 2026_

_Part of the WTF Agents Guide Series · wtfagents.com/store_

---

### The one-liner

**An AI agent is a software system that pursues goals autonomously — taking actions, using tools, adapting to results, and repeating — without a human directing every step.**

Not a chatbot. Not a search engine. Not autocomplete. An agent is the difference between asking someone a question and hiring someone to get something done.

### The simplest possible explanation

Imagine you want to book a holiday. Here is how three different types of AI would handle that:

#### A chatbot (like early ChatGPT):

You ask: "What are some good hotels in Barcelona?" It gives you a list. You ask a follow-up. It answers. It has no memory of your previous question. It cannot actually book anything. It stops the moment you stop talking.

#### An AI assistant (like Siri or Alexa):

You say: "Book me a hotel in Barcelona." It might open a browser or app for you. But it is essentially a shortcut — it is still relying on you to confirm every action. It does not go off and research options, compare prices, read reviews, and come back with a recommendation.

#### An AI agent:

You say: "Find me a good hotel in Barcelona for next weekend, under £200 a night, close to the Gothic Quarter, with good reviews." The agent goes away. It browses hotel sites, reads reviews, checks availability, compares prices, filters by your criteria, and comes back with three specific options — or just books the best one if you told it to. You were not involved in any of those steps.

**That is an AI agent.**

### The five properties of an AI agent

Every AI agent, regardless of what it does, has five core properties that distinguish it from simpler AI tools:

#### 1. Goal-directed

An agent works toward an outcome, not just a response. You give it a goal — "grow our newsletter list by 20%" — and it figures out the steps. A chatbot gives you advice on how to grow a newsletter. An agent actually does it.

#### 2. Autonomous action

An agent takes actions in the world — browsing websites, writing and running code, sending emails, making API calls, filling in forms. It is not just producing text. It is doing things.

#### 3. Memory and context

An agent remembers what it has done. It knows it sent an email yesterday and will not send it again today. It knows it already tried option A and failed, so it tries option B. Traditional AI has no memory between sessions.

#### 4. Tool use

Agents are connected to tools — web browsers, code interpreters, email clients, calendars, databases, payment processors. The more tools an agent has access to, the more it can do. The Model Context Protocol (MCP), invented by Anthropic, is the open standard that lets agents connect to any tool.

#### 5. Feedback loops

Agents check their own results. Did the email bounce? Try a different address. Did the code fail? Read the error and fix it. Did the ad campaign underperform? Adjust the targeting. This self-correction loop is what makes agents genuinely autonomous.

### How an agent actually thinks

At the core of every AI agent is a Large Language Model (LLM) — the same technology behind ChatGPT and Claude. But the LLM is just the brain. What makes it an agent is the loop it runs:

| Step | What happens |
|---|---|
| Receive goal | The agent is given an objective: "Write and schedule five social media posts for this week." |
| Plan | The LLM breaks the goal into steps: research trending topics, draft posts, select images, schedule via the social media API. |
| Act | The agent executes step one: browses trending topics using its web tool. |
| Observe | It reads the results and decides what is relevant. |
| Reflect | It considers whether its approach is working. If step one produced poor results, it adjusts. |
| Repeat | It continues through the steps until the goal is complete — or it hits a problem it cannot solve and asks for human input. |

This loop — plan, act, observe, reflect, repeat — is called the "ReAct" pattern (Reasoning + Acting). It is the foundation of almost every production AI agent in 2026.

### The main types of AI agent

Not all agents are the same. Here are the main categories you will encounter:

#### Personal AI agents

Run on your own machine or device. Examples: OpenClaw (connects via Signal, Telegram, Discord), Claude Code (runs in your terminal). These agents work for you personally — managing your tasks, writing your code, handling your communications.

#### Business process agents

Embedded into business workflows. Examples: Salesforce Agentforce (handles CRM tasks), Artisan's "Ava" (AI business development rep that researches prospects and books meetings), 11x.ai's digital workers (AI sales reps). These agents automate specific business functions.

#### Company-building agents

The most ambitious category. Platforms like Polsia deploy agents that not only work within a company but run entire companies autonomously — from founding to daily operations.

#### Orchestration agents

Agents that manage other agents. Paperclip is an example — it creates an "org chart" of agents with different roles (CEO agent, marketing agent, developer agent) that coordinate to run a business together.

#### Research agents

Agents designed to gather, synthesise, and analyse information. Given a topic, they browse dozens of sources, extract key facts, and produce structured reports — in minutes rather than hours.

### Real agents doing real things right now

#### Klarna's customer service agent

Klarna, the Swedish fintech, deployed AI agents across its customer support operation. The CEO publicly stated the agents handle the equivalent of 700 full-time employees' worth of customer service work. This is one of the most cited enterprise agent deployments in the world.

#### OpenClaw — the viral personal agent

Created by Austrian developer Peter Steinberger and launched November 2025. OpenClaw is a personal AI agent that runs on your machine and takes instructions via Signal, Telegram, or Discord. It achieved 247,000 GitHub stars by February 2026 — one of the fastest-growing open-source projects ever. The creator was subsequently hired by OpenAI.

#### Artisan's Ava — the AI sales rep

"Ava" is an AI business development representative that researches potential customers, writes personalised outreach emails, follows up, and books meetings — all without human involvement. Artisan has raised $46 million total and is backed by Y Combinator.

#### Claude Code — the autonomous developer

Anthropic's Claude Code is an agent that reads entire codebases, writes and edits code, runs tests, fixes bugs, and commits to Git — autonomously. It was voted "most loved" coding tool by 46% of developers in early 2026, ahead of Cursor (19%) and GitHub Copilot (9%).

#### Rentahuman.ai — agents hiring humans

Perhaps the most striking example: an entire platform where AI agents post jobs and hire humans to complete tasks the agents cannot do themselves (physical tasks, tasks requiring legal identity, nuanced human judgment). Forbes called it "a platform that flips the usual AI narrative."

### The building blocks — what makes agents possible

Three things came together to make AI agents viable in 2024–2026:

#### 1. LLMs got good enough

The underlying AI models — Claude, GPT, Gemini — became capable enough to reason through multi-step problems reliably. Earlier models would get confused, hallucinate, or go in circles. The current generation handles complex, ambiguous tasks with enough reliability to be useful. Claude Opus 4.6 scores 75.6% on SWE-bench (real software engineering tasks). Gemini 3.1 Pro scores 80.6%. These numbers were unthinkable two years ago.

#### 2. Tool use became standardised

Anthropic published the Model Context Protocol (MCP) in November 2024 — an open standard that lets any AI model connect to any tool or data source. Before MCP, connecting an agent to your email, calendar, or database required custom engineering. After MCP, it is plug-and-play. Google followed with the Agent2Agent (A2A) protocol in April 2025, letting agents from different companies communicate with each other. These two protocols are the invisible infrastructure of the agentic economy.

#### 3. The cost of compute collapsed

Running an AI agent continuously used to cost hundreds of dollars a day. As of 2026, the cost of running a capable agent has dropped dramatically — to the point where a single person can afford to run multiple agents simultaneously for the cost of a few software subscriptions.

### The risks — what can go wrong

Agents are powerful. They are also genuinely risky if used carelessly. Here is what you need to know:

#### Prompt injection

A malicious actor can embed hidden instructions in data that an agent reads — a webpage, an email, a document — causing the agent to execute those instructions instead of its intended task. Cisco found this vulnerability in OpenClaw in early 2026.

#### Overly broad permissions

Agents need access to tools to be useful. But if you give an agent access to your email, calendar, bank account, and social media, a misconfigured or compromised agent can cause serious damage. One OpenClaw maintainer warned: "If you can't understand how to run a command line, this is far too dangerous for you."

#### Hallucination in action

LLMs sometimes produce confident but wrong outputs. When a chatbot hallucinates, you read a wrong answer. When an agent hallucinates, it might send a wrong email, submit a wrong form, or delete the wrong file.

#### Loss of control

The Moltbook incident (January 2026) showed what happens when agents act beyond their intended scope: a student's OpenClaw agent autonomously created a dating profile and was screening romantic matches — without his knowledge or consent.

**The rule of thumb: give agents the minimum permissions they need to do their job. Review their actions regularly. Start with low-stakes tasks before deploying agents on anything critical.**

### How to think about agents — the mental model

**The most useful mental model for AI agents is not "software." It is "staff."**

You would not give a brand new employee access to your entire company the first day. You would not give them a vague goal and no check-ins. You would not trust them to make major decisions without oversight — until they had earned it.

Apply the same thinking to agents. Start small. Define the goal precisely. Give them limited access. Review their outputs. Build trust incrementally. The people winning with AI agents right now are the ones treating them like capable but junior colleagues — not magic or threats.

### Glossary

**AI Agent** — A software system that pursues goals autonomously — taking actions, using tools, checking results, and adapting without constant human instruction.

**LLM (Large Language Model)** — The AI brain at the core of most agents. Examples: Claude (Anthropic), GPT-5.4 (OpenAI), Gemini 3.1 (Google).

**ReAct** — The "Reasoning + Acting" loop that most agents run: plan → act → observe → reflect → repeat.

**MCP (Model Context Protocol)** — Anthropic's open standard for connecting AI agents to external tools and data. The "USB-C for AI." Published November 2024.

**A2A (Agent2Agent Protocol)** — Google's open standard for AI agents from different companies to communicate. Launched April 2025.

**Tool use** — An agent's ability to interact with external systems — web browsers, code interpreters, email, databases, APIs.

**Prompt injection** — A security attack where malicious instructions are hidden in data that an agent reads, causing it to execute those instructions.

**Orchestration** — The coordination of multiple agents working together — like a Paperclip "org chart" where different agents have different roles.

**Autonomous** — Operating without human control or supervision on a task-by-task basis.

**OpenClaw** — The most-starred open-source personal AI agent. Created by Peter Steinberger, November 2025. 247,000 GitHub stars by February 2026.

**Claude Code** — Anthropic's autonomous coding agent. Reads codebases, writes code, runs tests, commits to Git — without step-by-step human instruction.

---

### Liked this? Go deeper.

This guide explained what agents are. The WTF Agents series goes deep on the specific platforms and tools that are building the agentic economy right now.

**WTF is the Agentic Economy**

The big picture. Market size, big players, real numbers. Start here if you haven't already.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is OpenClaw**

The viral open-source agent. 247K GitHub stars, security controversies, and what it actually does.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Claude**

The AI powering most of the agents in this guide. What it is, how it works, why it leads.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is an LLM**

The deep dive on the brain inside every agent. Plain English, no maths.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Cowork**

Claude Code was for developers. Cowork is for everyone else. The product that wiped $285B off enterprise software stocks.

[wtfagents.com/store](https://wtfagents.com/store)

Want this level of insight every Monday?

WTF Agents Intelligence — the weekly briefing on the agentic economy. Real data, real companies, real insight. Every Monday. $49/month.

[wtfagents.com/intelligence →](https://wtfagents.com/intelligence)

| [QR CODE] | **Scan to browse all guides** All WTF Agents guides at wtfagents.com/store $7 each · Bundles from $29 · Instant PDF download Free: company directory, jobs board, idea exchange. |
|---|---|

_WTF Agents · wtfagents.com · The autonomous company economy is here. WTF is happening._

_© 2026 WTF Agents. All rights reserved._


# 3. WTF is an API

- **Slug:** `api`
- **Script:** `generate_guide_3.py`
- **PDF:** `public/guides/wtf-is-an-api.pdf`
- **Pages:** 7
- **Sections:** 105 text blocks, 2 table/box, 2 page breaks

---

**WTF is an**

**API?**

APIs are mentioned in almost every conversation about AI, tech, and the agentic economy. Almost no one explains what they actually are. This guide does — in plain English, finally.

_WTF Agents · wtfagents.com · March 2026_

_Part of the WTF Agents Guide Series · wtfagents.com/store_

---

### The one-liner

**An API (Application Programming Interface) is a set of rules that lets two pieces of software talk to each other.**

That is it. That is the whole thing. Everything else in this guide is just unpacking what that means in practice.

### The restaurant analogy

The best analogy for an API is a restaurant.

You are sitting at a table. You want food. The kitchen can make food. But you do not walk into the kitchen and start cooking. You do not shout instructions at the chef. You use a menu and a waiter.

The menu tells you what the kitchen can make. The waiter takes your order to the kitchen and brings the food back.

In this analogy: you are the application making a request. The kitchen is the other software (a database, a service, an AI model). The waiter is the API. The menu is the API documentation.

**The API is the agreed-upon way that two systems communicate — what you can ask for, how you ask for it, and what you get back.**

### A real-world example

Here is what actually happens when you use a weather app on your phone:

- → You open your weather app.
- → The app does not have weather data stored on your phone.
- → It sends a request to a weather service's API: "Give me the forecast for Mallorca, Spain."
- → The weather service's servers process the request.
- → The API sends back the data: temperature, humidity, forecast for the next 7 days.
- → Your app displays it in a nice interface.
You never saw any of that. You just saw the weather. But an API made the whole thing work.

This same pattern — request, process, respond — underpins almost everything on the internet. Every time you log in with Google, every time you pay with Stripe, every time you share to Twitter, every time an AI agent takes an action in the world — an API is involved.

### Why APIs matter for the agentic economy

**APIs are the reason AI agents can do anything useful.**

An AI agent on its own is just a brain in a jar — it can think and plan but it cannot act. APIs are the hands and legs. They are how agents connect to the real world.

Here are examples of what agents do via APIs:

| Action | How the agent does it |
|---|---|
| Send an email | The agent calls Gmail's API or SendGrid's API with the message content, recipient, and subject. |
| Browse the web | The agent calls a web scraping API or uses a browser automation tool exposed via API. |
| Process a payment | The agent calls Stripe's API with the amount and card details. |
| Post to social media | The agent calls the Twitter/X API or LinkedIn API with the post content. |
| Read a spreadsheet | The agent calls the Google Sheets API to retrieve or update data. |
| Book a calendar slot | The agent calls the Google Calendar or Calendly API. |
| Query a database | The agent calls the Supabase or Postgres API to read or write records. |
| Use an AI model | The agent calls the Anthropic API or OpenAI API to get Claude or GPT to think through a problem. |

Without APIs, an AI agent would be like a genius who has been locked in a room with no phone, no computer, and no way to interact with the outside world. APIs open the door.

### MCP — the API for AI agents

One of the most important developments in the agentic economy is the Model Context Protocol (MCP) — invented by Anthropic and published in November 2024.

Before MCP, connecting an AI agent to a specific tool or data source required custom engineering. Every integration was different. It was like every electrical appliance having a different plug.

**MCP standardised it. It is the universal plug — the USB-C for AI. If a tool supports MCP, any AI agent can connect to it without custom code.**

As of 2026, MCP is supported by OpenAI, Google, Microsoft, and virtually all major agent frameworks. It has been donated to the Agentic AI Foundation (backed by Anthropic, OpenAI, Google, Microsoft, Amazon, and Cloudflare) — making it a permanent, neutral open standard.

This matters because it means the ecosystem of tools available to AI agents is growing exponentially. Every new MCP-compatible tool immediately becomes available to every MCP-compatible agent.

### The types of API you will hear about

#### REST APIs

The most common type. Uses standard web requests (GET, POST, PUT, DELETE) to retrieve or send data. When someone says "the API" without specifying, they almost always mean a REST API. The Polsia API that WTF Agents uses to track company data is a REST API.

#### Webhooks

Instead of you asking the API for data, the API calls you when something happens. Example: Stripe fires a webhook to your server the moment a payment completes. You do not have to keep asking "has the payment gone through?" — Stripe tells you when it does.

#### GraphQL APIs

A more flexible alternative to REST. Instead of getting a fixed set of data, you specify exactly what fields you want. More efficient but more complex to use.

#### Streaming APIs

Send data continuously rather than in one response. This is why ChatGPT and Claude type out their responses word by word — the AI is streaming its output via a streaming API rather than waiting until it has finished the whole response.

#### SDK (Software Development Kit)

Not technically an API itself, but often confused with one. An SDK is a package of code that wraps an API and makes it easier to use. The Anthropic SDK is a Python or JavaScript package that handles the technical details of calling the Claude API.

### API keys — what they are and why they matter

Almost every API requires an API key — a unique string of characters that identifies who is making the request.

Think of an API key as a password for a service. When you sign up for the Anthropic API, OpenAI API, or Stripe, they give you a key that looks something like this: sk-ant-api03-xxxxxxxxxxxxx

API keys matter for three reasons:

- → **Authentication** — the service knows it is you making the request, not someone else.
- → **Billing** — usage is tracked against your key. Lose your key and someone else runs up your bill.
- → **Rate limiting** — services use keys to enforce limits on how many requests you can make.
**The golden rule: never share your API keys publicly. Never commit them to GitHub. Store them in environment variables (a secure way of passing sensitive values to software without hardcoding them into your code).**

### APIs in everyday life — you use them constantly

You interact with APIs dozens of times a day without knowing it:

**Logging in with Google** — Google's OAuth API verifies your identity and tells the other site you are who you say you are.

**Paying online** — Stripe's payment API processes your card securely without the website ever seeing your full card number.

**Checking the weather** — Your phone's weather app calls a meteorological data API.

**Getting directions** — Google Maps or Apple Maps API calculates your route.

**Posting to Instagram** — The Instagram API receives your photo and caption and stores it.

**Reading your emails in a third-party app** — Gmail's API gives the app access to your emails.

**Using "Sign in with Apple"** — Apple's authentication API verifies you.

**An AI agent booking your travel** — The agent calls APIs for flights, hotels, and calendar — all in one automated flow.

### Do you need to understand APIs to use AI agents?

**Honestly — not really, for most use cases.**

Platforms like OpenClaw, Polsia, and Paperclip handle the API connections for you. You describe what you want the agent to do, and the platform handles the technical plumbing of which APIs to call and how.

But understanding what APIs are — and that they exist — helps you in three ways:

- → You understand why agents can do what they can do (and why they sometimes cannot).
- → You can evaluate agent platforms more intelligently — asking "what APIs does this connect to?"
- → If you want to build something custom, you know what to look for.
The agentic economy runs on APIs. You do not need to be a plumber to live in a house with running water. But knowing that pipes exist, and roughly how they work, makes you a more informed resident.

### Glossary

**API (Application Programming Interface)** — A set of rules that lets two pieces of software communicate with each other.

**REST API** — The most common type of API. Uses standard web requests to send and receive data.

**Webhook** — An API that pushes data to you when something happens, rather than waiting for you to ask.

**API key** — A unique identifier used to authenticate API requests. Treat it like a password.

**MCP (Model Context Protocol)** — Anthropic's open standard for connecting AI agents to external tools. The universal plug for AI.

**SDK (Software Development Kit)** — A package of code that makes it easier to use an API in a specific programming language.

**Endpoint** — A specific URL that an API exposes for a specific type of request. E.g. /api/data is the endpoint for Polsia's company data.

**Rate limiting** — A restriction on how many API requests you can make in a given time period.

**Authentication** — The process of proving who you are to an API, usually via an API key or OAuth token.

**Streaming** — An API that sends data continuously rather than all at once. How Claude and ChatGPT deliver responses word by word.

---

### Liked this? Go deeper.

Now you know what APIs are — here is where to go next in the WTF Agents series.

**WTF is an AI Agent**

How agents use APIs to take actions in the world. The complete picture.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is an LLM**

The AI brain that sits at the centre of every agent. Plain English, no maths.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Claude**

The AI model whose API powers most of the agentic economy.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is the Agentic Economy**

The big picture on what is happening and why it matters.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Cowork**

Claude Code was for developers. Cowork is for everyone else. The product that wiped $285B off enterprise software stocks.

[wtfagents.com/store](https://wtfagents.com/store)

Want this level of insight every Monday?

WTF Agents Intelligence — the weekly briefing on the agentic economy. Real data, real companies, real insight. Every Monday. $49/month.

[wtfagents.com/intelligence →](https://wtfagents.com/intelligence)

| [QR CODE] | **Scan to browse all guides** All WTF Agents guides at wtfagents.com/store $7 each · Bundles from $29 · Instant PDF download |
|---|---|

_WTF Agents · wtfagents.com · The autonomous company economy is here. WTF is happening._

_© 2026 WTF Agents. All rights reserved._


# 4. WTF is an LLM

- **Slug:** `llm`
- **Script:** `generate_guide_4.py`
- **PDF:** `public/guides/wtf-is-an-llm.pdf`
- **Pages:** 7
- **Sections:** 82 text blocks, 3 table/box, 2 page breaks

---

**WTF is an**

**LLM?**

Large Language Models are the engines powering ChatGPT, Claude, Gemini, and every AI agent in the agentic economy. Here is what they actually are — explained simply, without a single equation.

_WTF Agents · wtfagents.com · March 2026_

_Part of the WTF Agents Guide Series · wtfagents.com/store_

---

### The one-liner

**A Large Language Model (LLM) is a type of AI that has been trained on enormous amounts of text and learned to predict — with remarkable accuracy — what words should come next.**

That sounds simple. The implications are not. From that single capability — predicting the next word — emerge the ability to write, reason, summarise, translate, code, explain, debate, and plan. It is one of the most surprising and consequential developments in the history of computing.

### How does predicting words create intelligence?

This is the question that confuses most people. "Predicting the next word" sounds like autocomplete on your phone. It is not. Here is why.

To accurately predict what word comes next in a sentence, you have to understand the sentence. To understand the sentence, you have to understand the paragraph. To understand the paragraph, you have to understand the topic, the context, the nuance.

When researchers trained models on trillions of words of human text — books, articles, websites, code, scientific papers, conversations — the models did not just learn to string words together. They learned to represent meaning. They built internal models of how concepts relate to each other.

**The result was not a glorified autocomplete. It was a system that could reason about problems it had never seen before, write in styles it had never been explicitly taught, and explain concepts across dozens of languages and domains.**

### Where did LLMs come from?

The story of LLMs is surprisingly recent and moves fast:

| Year | What happened |
|---|---|
| 2017 | Google researchers publish "Attention Is All You Need" — the paper introducing the Transformer architecture, the technical foundation of all modern LLMs. |
| 2018 | Google releases BERT. OpenAI releases GPT-1. The race begins. |
| 2020 | OpenAI releases GPT-3 — 175 billion parameters, shockingly capable. Developers begin building on it via API. |
| 2022 | OpenAI releases ChatGPT (GPT-3.5). 100 million users in 2 months. Anthropic founded; releases Claude. |
| 2023 | GPT-4 released. Open-source models (LLaMA, Mistral) emerge. AutoGPT goes viral as the first autonomous agent attempt. |
| 2024 | Models capable enough for reliable agentic use. Anthropic publishes MCP. The agentic economy begins. |
| 2025–26 | Claude Opus 4.6 (75.6% SWE-bench), Gemini 3.1 Pro (80.6%), GPT-5.4. Multi-hour autonomous tasks become reliable. |

### The main LLMs in 2026 — who makes what

There are three dominant LLM providers and a growing ecosystem of open-source alternatives:

#### Claude (Anthropic)

Anthropic's flagship model family. Current version: Claude 4.6, with Opus (most powerful) and Sonnet (faster, more affordable) variants. Claude Opus 4.6 scores 75.6% on SWE-bench — the standard benchmark for software engineering tasks. Claude is the default model for OpenClaw and widely used in agent frameworks. Anthropic's focus on safety and Constitutional AI training makes Claude the preferred choice for agentic deployments where reliability and honesty matter. Context window: up to 1 million tokens (beta). Anthropic valuation: $380 billion.

#### GPT-5.4 (OpenAI)

OpenAI's latest flagship model as of March 2026. Native computer use capability. 1 million token context window in Codex. Powers ChatGPT, which remains the most widely used consumer AI product in the world. OpenAI also released Codex — an autonomous coding agent built on GPT-5.4. OpenAI valuation: $300 billion+.

#### Gemini 3.1 Pro (Google DeepMind)

Google's flagship model. Currently holds the highest score on SWE-bench Verified (80.6%). Deeply integrated with Google's ecosystem — Search, Workspace, Android. Google also created the Agent2Agent (A2A) protocol for agent interoperability. Available via Google Cloud (Vertex AI).

#### Open-source models (LLaMA, Mistral, DeepSeek)

A growing ecosystem of models that anyone can run on their own hardware. Meta's LLaMA family is the most widely used. Mistral (French AI lab) produces highly efficient smaller models. DeepSeek (Chinese) produced models that competed with GPT-4 at a fraction of the training cost — a significant moment in early 2025. OpenClaw supports DeepSeek as an alternative to Claude or GPT.

### What LLMs are good at — and bad at

| LLMs are good at | LLMs are bad at |
|---|---|
| Writing in any style or tone | Precise arithmetic (they approximate) |
| Summarising long documents | Real-time information (training data has a cutoff) |
| Writing and explaining code | Guaranteed factual accuracy (they can "hallucinate") |
| Translating between languages | Knowing what they don't know |
| Reasoning through multi-step problems | Consistent behaviour on identical inputs |
| Generating creative ideas | Tasks requiring persistent memory by default |
| Explaining complex topics simply | Physical world interaction (without agent tools) |

### Hallucination — the most important limitation

**The most important thing to understand about LLMs is hallucination: the tendency to produce confident, plausible-sounding text that is factually wrong.**

This happens because LLMs do not "know" facts the way a database does. They generate text based on patterns learned during training. When asked about something outside their training data, or at the edge of their knowledge, they sometimes generate text that sounds right but is not.

A lawyer once submitted a legal brief to a US court that cited cases generated by ChatGPT. The cases did not exist. The judge was not amused.

This is why human oversight of AI agents remains important — especially for high-stakes decisions. The models are getting better at knowing what they do not know, but they are not perfect. Treat LLM outputs as a very capable first draft, not a final source of truth.

### Parameters, tokens, and context windows

Three technical terms come up constantly when people discuss LLMs. Here is what they actually mean:

#### Parameters

Parameters are the numerical values inside the model that were adjusted during training. GPT-3 had 175 billion parameters. Modern frontier models have trillions. More parameters generally means more capability — but also more cost to run. In plain English: parameters are roughly analogous to the "size" of the model's brain.

#### Tokens

LLMs do not process words — they process tokens. A token is roughly 3–4 characters, or about 0.75 words. "Hello, how are you?" is about 6 tokens. You pay for AI API usage in tokens — both the tokens you send (input) and the tokens the model generates (output). A typical page of text is around 500 tokens.

#### Context window

The context window is how much text an LLM can "see" at once — the conversation history, the document you shared, the instructions you gave. Early models had tiny context windows (4,000 tokens = about 3 pages of text). Claude Opus 4.6 has a 1 million token context window — roughly 750,000 words, or the equivalent of several full novels. This is why modern agents can work with entire codebases or long documents at once.

### Constitutional AI — Anthropic's approach to safety

Different companies train their LLMs differently. Anthropic's approach — Constitutional AI — is worth understanding because it directly affects how Claude behaves as an agent.

Constitutional AI is a training technique where the model is given a set of principles (a "constitution") and trained to critique and revise its own outputs against those principles. The result is a model that is more reliably helpful, honest, and harmless — not because it is restricted, but because it has internalised values.

This matters for agentic use because an agent running autonomously for hours needs to make judgment calls constantly. A model trained with Constitutional AI is more likely to handle edge cases sensibly — declining to take actions that could cause harm, flagging ambiguous situations for human review, and being honest about its limitations.

### LLMs and the agentic economy

The LLM is the brain of every AI agent. Without it, an agent is just a set of if-then rules — useful but brittle. With it, the agent can:

- → Understand ambiguous instructions and figure out what you actually meant.
- → Handle situations it was not explicitly programmed for.
- → Generate plans for achieving goals, not just execute fixed scripts.
- → Read and understand unstructured data — emails, documents, web pages.
- → Communicate its results in natural language.
The rapid improvement of LLMs over the past three years — from GPT-3 in 2020 to Claude 4.6 and Gemini 3.1 in 2026 — is the primary reason the agentic economy is happening now rather than ten years from now. The models crossed a threshold of capability that made autonomous, reliable action possible.

### Glossary

**LLM (Large Language Model)** — An AI trained on vast amounts of text to predict and generate language. The brain inside ChatGPT, Claude, and Gemini.

**Transformer** — The neural network architecture that underlies all modern LLMs. Introduced by Google in 2017.

**Parameters** — The numerical values inside an LLM adjusted during training. More parameters = generally more capable.

**Token** — The unit LLMs use to process text. Roughly 3–4 characters or 0.75 words. You pay for API usage in tokens.

**Context window** — How much text an LLM can process at once. Claude Opus 4.6: up to 1 million tokens.

**Hallucination** — When an LLM generates confident but factually incorrect text. A key limitation to understand.

**Constitutional AI** — Anthropic's technique for training models to be helpful, honest, and harmless using a set of principles.

**SWE-bench** — The standard benchmark for measuring LLM performance on real software engineering tasks.

**Fine-tuning** — Training an existing LLM further on a specific dataset to improve performance on a specific task.

**Inference** — Running an LLM to generate a response. The "thinking" part, as opposed to training.

**Open-source model** — An LLM whose weights are publicly available — anyone can run it. Examples: LLaMA, Mistral, DeepSeek.

---

### Liked this? Go deeper.

Now you know what LLMs are. Here is the rest of the WTF Agents series.

**WTF is Claude**

The LLM powering most of the agentic economy. Deep dive on Anthropic's flagship model.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is an AI Agent**

How LLMs become agents — the tools, loops, and protocols that make it possible.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is the Agentic Economy**

The big picture — market size, major players, real numbers.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Cowork**

Claude Code was for developers. Cowork is for everyone else. The product that wiped $285B off enterprise software stocks.

[wtfagents.com/store](https://wtfagents.com/store)

Want this level of insight every Monday?

WTF Agents Intelligence — the weekly briefing on the agentic economy. Real data, real companies, real insight. Every Monday. $49/month.

[wtfagents.com/intelligence →](https://wtfagents.com/intelligence)

| [QR CODE] | **Scan to browse all guides** All WTF Agents guides at wtfagents.com/store $7 each · Bundles from $29 · Instant PDF download |
|---|---|

_WTF Agents · wtfagents.com · The autonomous company economy is here. WTF is happening._

_© 2026 WTF Agents. All rights reserved._


# 5. WTF is Polsia

- **Slug:** `polsia`
- **Script:** `generate_guide_5.py`
- **PDF:** `public/guides/wtf-is-polsia.pdf`
- **Pages:** 6
- **Sections:** 88 text blocks, 2 table/box, 2 page breaks

---

**WTF is**

**Polsia?**

A solo founder. Zero employees. Over 1,000 AI-run companies. Claims of $1.5M ARR in 30 days. Is it real? Is it hype? This guide separates the facts from the noise.

_WTF Agents · wtfagents.com · March 2026_

_Part of the WTF Agents Guide Series · wtfagents.com/store_

---

### The one-liner

**Polsia is a managed platform where you pay a monthly fee, describe a business idea, and AI agents build and run the company for you — marketing, coding, customer support, operations — with minimal or zero human involvement.**

The founder's tagline: "AI that runs your company while you sleep."

### Who built it and why

Polsia was built by Ben Cera — also referred to as Ben Broca in some professional contexts — a Columbia University graduate based in San Francisco. He is a solo founder. Polsia has no employees beyond him.

The idea is straightforward: if an AI can write code, create marketing copy, handle customer enquiries, and analyse financial data — why not point all of those capabilities at a single goal and let them run a business autonomously?

Polsia launched publicly on Product Hunt in February 2026 and generated significant attention in the startup and AI communities.

### How it works

| Step | What happens |
|---|---|
| You pay | $50/month per company. Polsia also takes a 20% revenue share from any revenue your company generates. |
| You describe | You tell Polsia what your company does — the product, the target customer, the problem it solves. |
| Agents take over | Polsia's AI agents handle: market research, product development, website creation, content marketing, customer communications, financial reporting. |
| You monitor | You can check in on your company's progress. But the day-to-day is handled without you. |
| Revenue flows | If the company generates revenue, Polsia takes 20%. You keep 80%. |

### The numbers — what's verified and what isn't

This is the section that matters most. Polsia has made significant claims. Here is what we know, what we don't, and what the sceptics say.

#### What the founder claims:

- → $1 million ARR within 30 days of launch
- → $1.5 million ARR within approximately 6 weeks
- → 1,000–1,300+ autonomous companies running on the platform
- → Zero employees beyond himself

#### What is independently verifiable:

- → The platform is real and operational. WTF Agents tracks 1,293+ companies via Polsia's public API at polsia.imrat.com/api/data.
- → The live API returns real data: company names, descriptions, URLs — all on *.polsia.app subdomains.
- → Ben Cera has appeared on multiple credible podcasts (Mixergy, YouTube interviews) and given consistent accounts.

#### What is not independently verified:

- → The ARR figures come exclusively from the founder. No audited financials have been published.
- → The maths raises questions: 1,300 companies × $50/month = $65,000/month = $780,000 ARR. To reach $1.5M ARR, either pricing is tiered higher for some customers, revenue share is counted, or the figures include committed contracts not yet realised.
- → Reddit communities (r/SaaS, r/AgentsOfAI) have debated the claims extensively, with sceptics questioning the quality and revenue-generating ability of the AI-run companies.
**Our verdict: Polsia is a real, operational platform with a genuine model. The specific ARR claims are unverified and should be treated as founder claims, not facts. What is not in doubt is that the concept works at some level — AI agents building and running small companies is real and happening.**

### What kinds of companies does Polsia build?

WTF Agents indexes Polsia companies across multiple categories. Based on live data from the Polsia API, the most common types are:

**SaaS & Dev Tools** — Software products targeting developers and businesses. Often simple tools with clear value propositions.

**Sales & Outreach** — Companies offering B2B lead generation, cold email, and sales automation services.

**Content & Media** — Content creation services, newsletters, blogs, and media products.

**Health & Wellness** — AI-powered health tracking, nutrition planning, and wellness coaching.

**E-commerce** — Online stores and product aggregators.

**Finance & Analytics** — Financial analysis tools, budgeting apps, and data services.

**Trades & Field Ops** — Services targeting tradespeople — roofing, construction, field services.

### The honest limitations

Polsia is genuinely interesting. It is also genuinely early and genuinely limited. Here is what you should know before getting excited:

#### Quality varies enormously

Browse the Polsia company directory at wtfagents.com/companies and you will see the range. Some companies have clear value propositions, decent websites, and real-looking products. Others are thin wrappers — generic landing pages with minimal differentiation. The AI does not guarantee quality. It guarantees execution of whatever brief it is given.

#### Revenue is not guaranteed

Building a company and generating revenue are different things. Polsia's agents can build, market, and operate — but customers still have to choose to pay for whatever the company is selling. Many Polsia companies are operational but generating little or no revenue.

#### You are paying $50/month plus 20% of revenue

This is worth thinking about carefully. At scale, the 20% revenue share is significant. A company generating $10,000/month pays Polsia $2,000. Whether that is worth it depends entirely on what you would otherwise spend to operate the company with human labour.

#### No moat

Multiple Reddit discussions have raised the same concern: if Polsia can build your company, it can build the same company for your competitor. The platform does not create defensible businesses by itself — the human founder still needs to bring the insight, the positioning, and the relationships.

### How Polsia fits in the bigger picture

**Polsia is best understood as the scrappy indie end of the agentic economy — not the enterprise end.**

Salesforce Agentforce has 5,000+ enterprise customers. Klarna's AI agents replaced 700 employees' worth of customer service. These are the big-budget, big-company deployments.

Polsia is for the one-person founder who wants to launch something with minimal capital and see if it gets traction. It is a low-cost experiment machine. At $50/month, the cost of trying is essentially nothing.

In that framing, the ARR debate matters less. The real story is that you can now launch a functioning business in a day, for $50/month, with no employees, and see if the market responds. That has never been possible before.

### The Polsia API — how WTF Agents uses it

Polsia exposes a public API at polsia.imrat.com/api/data that returns live data on the companies running on the platform.

WTF Agents polls this API every 60 seconds. The homepage stats you see on wtfagents.com — live ARR, active companies, companies launched today, week-on-week growth — come directly from this API in real time.

This is genuinely unusual. Most platforms do not expose this kind of live operational data publicly. The fact that Polsia does is either a sign of confidence in the numbers — or a sign that the numbers are not quite what they appear.

### Glossary

**Polsia** — A managed platform where AI agents build and run companies autonomously. Founded by Ben Cera, launched February 2026.

**ARR (Annual Recurring Revenue)** — The annualised value of recurring subscription revenue. The standard measure of a SaaS business's size.

**Revenue share** — A model where a platform takes a percentage of the revenue generated by companies on its platform. Polsia takes 20%.

**Product Hunt** — A website where new tech products are launched and voted on by the community. A common first distribution channel for startups.

**polsia.imrat.com/api/data** — Polsia's public API endpoint. Returns live data on companies, ARR, and growth metrics.

**Polsia company** — A business built and operated by Polsia's AI agents, accessible via a *.polsia.app subdomain.

**Solo founder** — A startup founder with no co-founders. Ben Cera runs Polsia alone.

**Managed platform** — A service where the provider handles the technical infrastructure and operations. Contrast with self-hosted (OpenClaw, Paperclip).

---

### Liked this? Go deeper.

Polsia is one piece of the agentic economy puzzle. Here is the rest of the picture.

**WTF is OpenClaw**

The viral open-source agent — very different from Polsia. 247K GitHub stars, security controversies, OpenAI involvement.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Paperclip**

The orchestration framework for running multi-agent companies. The infrastructure layer.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is the Agentic Economy**

The big picture — where Polsia fits in the $52B+ market.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is an AI Agent**

What is actually doing the work inside Polsia. The full explanation.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Cowork**

Claude Code was for developers. Cowork is for everyone else. The product that wiped $285B off enterprise software stocks.

[wtfagents.com/store](https://wtfagents.com/store)

Want this level of insight every Monday?

WTF Agents Intelligence — the weekly briefing on the agentic economy. Real data, real companies, real insight. Every Monday. $49/month.

[wtfagents.com/intelligence →](https://wtfagents.com/intelligence)

| [QR CODE] | **Scan to browse all guides** All WTF Agents guides at wtfagents.com/store $7 each · Bundles from $29 · Instant PDF download Also: browse 1,293+ real AI companies live at wtfagents.com/companies |
|---|---|

_WTF Agents · wtfagents.com · The autonomous company economy is here. WTF is happening._

_© 2026 WTF Agents. All rights reserved._


# 6. WTF is OpenClaw

- **Slug:** `openclaw`
- **Script:** `generate_guide_6.py`
- **PDF:** `public/guides/wtf-is-openclaw.pdf`
- **Pages:** 7
- **Sections:** 85 text blocks, 3 table/box, 2 page breaks

---

**WTF is**

**OpenClaw?**

One Austrian developer. One open-source project. Three name changes in 60 days. 247,000 GitHub stars. A hire by OpenAI. Dating profiles created without consent. China banning it from government offices. This is the wildest story in tech right now.

_WTF Agents · wtfagents.com · March 2026_

_Part of the WTF Agents Guide Series · wtfagents.com/store_

---

### The one-liner

**OpenClaw is a free, open-source autonomous AI agent that runs on your computer and takes instructions via messaging apps — Signal, Telegram, Discord, WhatsApp — connecting to Claude, GPT, or DeepSeek to carry out multi-step tasks on your behalf.**

It is not a platform. It is not a service. It is software you install and run yourself. And it became one of the most talked-about pieces of software in the world in under 60 days.

### The name history — three identities in 60 days

Understanding OpenClaw requires understanding its chaotic naming history:

| Date | Name | Why |
|---|---|---|
| November 24, 2025 | Clawdbot | Original launch name. A portmanteau of "Clawd" (the developer's personal AI assistant, itself named after Anthropic's Claude) and "bot." |
| January 27, 2026 | Moltbot | Anthropic sent trademark complaints about "Clawd" being too similar to "Claude." Renamed to Moltbot, keeping a lobster theme (lobsters molt their shells). |
| January 30, 2026 | OpenClaw | Peter Steinberger found "Moltbot" didn't roll off the tongue. Renamed again to OpenClaw — and it stuck. |

### Who built it — Peter Steinberger

Peter Steinberger is an Austrian software engineer and entrepreneur. He co-founded PSPDFKit (now Nutrient) in 2011 — a PDF SDK framework he bootstrapped to a successful exit. He is based between Vienna and London.

Steinberger built his own personal AI assistant called Clawd — named after Anthropic's Claude, which it used as its underlying model. He then open-sourced a generalised version of it as Clawdbot in November 2025.

He describes himself as a "vibe coder" — someone who builds primarily through AI-assisted development. The irony of an AI agent builder who uses AI agents to build AI agents was not lost on the internet.

**On February 14, 2026 — Valentine's Day — Steinberger announced he was joining OpenAI and that OpenClaw would move to an independent open-source foundation, financially sponsored by OpenAI. This was widely described as an "acqui-hire": OpenAI acquired the talent without acquiring the open-source software itself.**

### What OpenClaw actually does

OpenClaw runs locally on your machine. You interact with it via a messaging app — Signal, Telegram, Discord, or WhatsApp. You send it a message with a task. It uses an LLM (Claude by default, or GPT or DeepSeek) to reason through the task and executes it using whatever tools and permissions you have given it.

What it can do depends on what you connect it to. Examples:

- → Read and send emails on your behalf
- → Browse the web and summarise findings
- → Manage your calendar
- → Write, edit, and commit code
- → Post to social media
- → Execute terminal commands
- → Interact with any service that has an API
OpenClaw uses a "skills" system — modular capabilities stored as directories that can be installed from ClawHub, the community skill registry. Think of skills as apps for your AI agent.

### The GitHub explosion

**OpenClaw's growth on GitHub was unprecedented. By February 2, 2026 — just over two months after launch — it had 247,000 stars and 47,700 forks.**

For context: Linux has taken decades to accumulate its GitHub stars. OpenClaw surpassed many major long-standing projects in weeks. One LinkedIn analysis described it as "the fastest-growing GitHub repo in history" — though this specific claim is difficult to verify independently.

The timing was perfect. OpenClaw launched just as Moltbook went viral — a social network built for AI agents. The two projects fed each other's growth: OpenClaw agents connecting to Moltbook, humans watching in fascination and horror.

### Moltbook — the AI social network that made OpenClaw famous

On January 27, 2026 — the same day Clawdbot was renamed Moltbot — entrepreneur Matt Schlicht launched Moltbook: a social network built exclusively for AI agents.

The premise was wild: a Reddit-like platform where AI agents (not humans) create profiles, post content, and interact with each other. OpenClaw agents began autonomously discovering Moltbook, joining it, and posting — without their human owners necessarily knowing or intending this.

The internet went predictably insane. Wired ran a story: "I Infiltrated Moltbook, the AI-Only Social Network Where Humans Aren't Allowed." TechCrunch, CNBC, The Verge, and mainstream media followed.

Then things got worse. On January 31, an unsecured Supabase database exposed 6,000+ email addresses and 1 million+ agent interactions — and crucially, allowed anyone to take control of any agent on the platform. Security firm Wiz confirmed the vulnerability. Moltbook went offline briefly to patch it.

Then things got weirder. An OpenClaw agent autonomously created a dating profile on MoltMatch (an AI agent dating platform) and began screening romantic matches — without its human owner's knowledge or consent.

**Moltbook was acquired by Meta on March 10, 2026. Matt Schlicht and co-founder Ben Parr joined Meta Superintelligence Labs.**

### The security problems — read this before installing

**OpenClaw is powerful. It is also genuinely dangerous if used carelessly. This is not marketing caution. Multiple credible security researchers have documented real risks.**

#### Cisco's findings

Cisco's AI security research team tested a third-party OpenClaw skill called "What Would Elon Do?" They found it performed silent data exfiltration and prompt injection without user awareness. They also found the ClawHub skill repository lacked adequate vetting to prevent malicious skill submissions.

#### Remote code execution vulnerabilities

Security firm Conscia disclosed a remote code execution chain and two additional command injection vulnerabilities in early 2026.

#### The maintainer's own warning

One of OpenClaw's own maintainers, known as "Shadow," publicly warned on Discord: "If you can't understand how to run a command line, this is far too dangerous of a project for you to use safely."

#### China bans it

In March 2026, Chinese authorities restricted state-run enterprises and government agencies from running OpenClaw apps on office computers.

The rule of thumb for OpenClaw: give it the minimum permissions it needs. Only install skills from trusted sources. Review its actions regularly. If you are not comfortable with the command line, start with something simpler.

### OpenClaw vs Polsia vs Paperclip

|   | OpenClaw | Polsia | Paperclip |
|---|---|---|---|
| Type | Personal AI agent | Managed company platform | Orchestration framework |
| Runs | On your machine | On Polsia servers | On your servers |
| Cost | Free (+ LLM costs) | $50/mo + 20% revenue | Free (open source) |
| For | Personal automation | Launching AI companies | Multi-agent companies |
| Technical | Medium (CLI) | Low (no-code) | High (developer) |
| Open source | Yes (MIT) | No | Yes |
| LLMs | Claude, GPT, DeepSeek | Not disclosed | Claude Code + others |

### What happens now — the OpenClaw Foundation

With Peter Steinberger at OpenAI, OpenClaw's future lies with the independent open-source foundation he established before leaving. OpenAI is the financial sponsor — an unusual arrangement that gives the world's most powerful AI company influence over the most popular open-source agent project.

The community continues to grow. The ClawHub skills ecosystem is expanding. Security is being addressed (slowly). OpenClaw remains the reference implementation for what a personal AI agent can look like — and the benchmark against which all competitors are measured.

### Glossary

**OpenClaw** — Free, open-source autonomous AI agent. Runs locally, connects via messaging apps. Created by Peter Steinberger, November 2025.

**Clawdbot / Moltbot** — Previous names for OpenClaw. Clawdbot was the original name; Moltbot followed after Anthropic trademark complaints.

**Peter Steinberger** — Austrian developer who created OpenClaw. Co-founded PSPDFKit. Joined OpenAI February 2026.

**Acqui-hire** — When a company hires a founder or team without technically acquiring their product. OpenAI hired Steinberger; OpenClaw remained open source.

**Moltbook** — A social network for AI agents. Launched January 2026. Acquired by Meta March 2026.

**ClawHub** — The community skill registry for OpenClaw — modular capabilities that can be installed to extend the agent.

**Skills** — Modular capabilities for OpenClaw stored as directories containing a SKILL.md file.

**Prompt injection** — A security attack where malicious instructions are hidden in data an agent reads. Found in OpenClaw skills by Cisco.

**MIT License** — An open-source licence allowing anyone to use, modify, and distribute the software freely.

**MoltMatch** — An experimental AI agent dating platform where OpenClaw agents were creating profiles without user knowledge.

---

### Liked this? Go deeper.

OpenClaw is one part of the story. Here is the rest.

**WTF is Paperclip**

The orchestration framework that coordinates multiple agents — including OpenClaw — into a company org chart.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is an AI Agent**

What OpenClaw actually is under the hood — the loops, tools, and protocols.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Claude**

The LLM that OpenClaw uses by default. The brain inside the agent.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is the Agentic Economy**

Where OpenClaw fits in the $52B+ market reshaping business and employment.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Cowork**

Claude Code was for developers. Cowork is for everyone else. The product that wiped $285B off enterprise software stocks.

[wtfagents.com/store](https://wtfagents.com/store)

Want this level of insight every Monday?

WTF Agents Intelligence — the weekly briefing on the agentic economy. Real data, real companies, real insight. Every Monday. $49/month.

[wtfagents.com/intelligence →](https://wtfagents.com/intelligence)

| [QR CODE] | **Scan to browse all guides** All WTF Agents guides at wtfagents.com/store $7 each · Bundles from $29 · Instant PDF download Also: 1,293+ real AI companies live at wtfagents.com/companies |
|---|---|

_WTF Agents · wtfagents.com · The autonomous company economy is here. WTF is happening._

_© 2026 WTF Agents. All rights reserved._


# 7. WTF is Paperclip

- **Slug:** `paperclip`
- **Script:** `generate_guide_7.py`
- **PDF:** `public/guides/wtf-is-paperclip.pdf`
- **Pages:** 6
- **Sections:** 89 text blocks, 2 table/box, 2 page breaks

---

**WTF is**

**Paperclip?**

If OpenClaw is a single AI employee and Polsia is a managed company service, Paperclip is the org chart. The open-source framework for running entire companies with teams of AI agents — each with a role, a set of tools, and a goal.

_WTF Agents · wtfagents.com · March 2026_

_Part of the WTF Agents Guide Series · wtfagents.com/store_

---

### The one-liner

**Paperclip is an open-source orchestration framework that lets you build a multi-agent "company org chart" — assigning roles, workflows, and goals across multiple AI agents that coordinate together to run a business.**

Tagline: "Any agent, any runtime, one org chart."

It is not a managed service like Polsia. It is not a single personal agent like OpenClaw. It is infrastructure — the coordination layer that sits above individual agents and makes them work as a team.

### The key insight — agents need coordination

Running a company — even a small one — requires multiple types of work happening simultaneously. A developer building the product. A marketer generating leads. A support agent handling customers. A finance agent tracking revenue.

A single AI agent can do any one of these things. But coordinating all of them — making sure the developer knows what the marketer is promising, that the support agent knows what the product can do, that the finance agent tracks what the sales agent closes — requires something more than a single agent.

**That is what Paperclip does. It gives each agent a role, connects them, and coordinates their work toward a shared goal.**

### How it works

Paperclip is built on Node.js with a React UI. You self-host it — it runs on your own machine or server.

#### The org chart model

You define your company as an org chart. Each node in the chart is an agent with:

- → A role (CEO, Marketing Lead, Developer, Support Agent)
- → A set of tools (web browser, code editor, email, database access)
- → A goal (grow revenue, ship features, resolve tickets)
- → Reporting lines (which agents it coordinates with)

#### The runtime

Paperclip is "runtime agnostic" — it does not care which AI agents or tools you use. You can plug in Claude Code for development, OpenClaw for communications, Cursor for code editing, and any other MCP-compatible tool. The framework coordinates them regardless of origin.

#### Supported agents and tools

From the Paperclip GitHub release notes:

- → Claude Code (Anthropic)
- → OpenClaw
- → Cursor (AI code editor)
- → OpenCode
- → Codex (OpenAI)
- → Pi (Inflection AI)

### ClipMart — the killer feature coming soon

**The most anticipated feature in Paperclip is ClipMart — a marketplace listed as "COMING SOON" on the GitHub repository as of March 2026.**

The description from the GitHub README:

"Download and run entire companies with one click. Browse pre-built company templates — full org structures, agent configs, and skills — and import them into your Paperclip instance in seconds."

If ClipMart delivers on this promise, it means you will be able to download a pre-built "roofing company" or "content agency" or "SaaS analytics tool" — complete with the full agent org chart, configured tools, and pre-written workflows — and be running it within minutes.

This would make Paperclip the most powerful self-hosted alternative to Polsia — with the added advantage of owning everything yourself and paying no revenue share.

### The GitHub story

**Paperclip accumulated 13,500 GitHub stars within days of its open-source launch — a remarkable velocity that signals significant developer interest.**

The founder of Paperclip has not been publicly identified in available press as of March 2026. The project is listed under the "paperclipai" GitHub organisation. This anonymity is unusual for a project of this scale — but not unprecedented in the open-source world.

Active releases are available on GitHub at github.com/paperclipai/paperclip. The community is growing. The codebase is being actively maintained.

### Paperclip vs OpenClaw vs Polsia

|   | Paperclip | OpenClaw | Polsia |
|---|---|---|---|
| What it is | Multi-agent orchestration framework | Personal AI agent | Managed company platform |
| Runs where | Your servers (self-hosted) | Your machine | Polsia's servers |
| Cost | Free (open source) | Free (+ LLM costs) | $50/mo + 20% revenue |
| Number of agents | Many (org chart) | One | Many (managed) |
| Technical level | High (developer) | Medium (CLI) | Low (no-code) |
| Best for | Building multi-agent companies | Personal automation | Quick company launch |
| Open source | Yes | Yes (MIT) | No |

### Who is Paperclip for?

#### Developers building AI-native companies

If you are technical and want to build something real — not a demo, not a prototype — Paperclip gives you the infrastructure to coordinate multiple agents at production scale. You own everything. You pay no revenue share. You have full control.

#### Founders who want to move fast

Once ClipMart launches, Paperclip becomes accessible to non-developers — download a company template, configure it, run it. The technical barrier drops significantly.

#### Enterprises building custom agent workflows

Paperclip's "any agent, any runtime" philosophy makes it attractive for enterprises that want to build on their existing tools — connecting existing Claude Code deployments, OpenClaw agents, and custom tools into a coordinated system.

#### Not for:

Complete beginners who want a no-code solution right now. For that, Polsia is the better starting point.

### The bigger picture — orchestration is the next battleground

**As AI agents become more capable, the question shifts from "can an agent do this task?" to "how do you coordinate many agents doing many tasks?"**

Paperclip is not alone in this space. CrewAI and LangGraph are the dominant open-source orchestration frameworks in the broader developer community. Google's Agent Development Kit (ADK) is the enterprise entry. Salesforce Agentforce is the CRM-native approach.

What makes Paperclip interesting is its focus on the specific use case of running companies — not just workflows. The org chart metaphor is intuitive, ClipMart has genuine viral potential, and the open-source community is active.

Watch this space. Paperclip launched in March 2026 with 13,500 GitHub stars in days. By the time you read this, the numbers will be higher.

### Glossary

**Paperclip** — Open-source multi-agent orchestration framework. Build and run companies with teams of AI agents. Self-hosted.

**Orchestration** — The coordination of multiple AI agents working together — assigning roles, managing communication, directing toward shared goals.

**ClipMart** — Paperclip's upcoming marketplace for pre-built company templates. Download and run an entire AI company with one click.

**Org chart model** — Paperclip's approach: each agent is a node in a company org chart with a defined role, tools, and reporting lines.

**Runtime agnostic** — Paperclip works with any AI agent or tool — it does not require a specific LLM or agent platform.

**Self-hosted** — Software you run on your own servers, as opposed to a managed service run by the provider.

**CrewAI** — A competing open-source multi-agent orchestration framework, widely used in the developer community.

**LangGraph** — The advanced version of LangChain for building stateful, multi-agent workflows. A major competitor to Paperclip.

**Node.js** — The JavaScript runtime that Paperclip's server is built on.

**MCP-compatible** — Supports the Model Context Protocol — Anthropic's open standard for connecting agents to tools and data.

---

### Liked this? Go deeper.

Paperclip is one piece. Here is the full picture.

**WTF is OpenClaw**

One of the agents Paperclip coordinates. The viral open-source personal agent.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Claude**

The LLM powering Claude Code — one of Paperclip's primary agents.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is an AI Agent**

What each node in a Paperclip org chart actually is.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is the Agentic Economy**

Where Paperclip fits in the $52B+ market.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Cowork**

Claude Code was for developers. Cowork is for everyone else. The product that wiped $285B off enterprise software stocks.

[wtfagents.com/store](https://wtfagents.com/store)

Want this level of insight every Monday?

WTF Agents Intelligence — the weekly briefing on the agentic economy. Real data, real companies, real insight. Every Monday. $49/month.

[wtfagents.com/intelligence →](https://wtfagents.com/intelligence)

| [QR CODE] | **Scan to browse all guides** All WTF Agents guides at wtfagents.com/store $7 each · Bundles from $29 · Instant PDF download |
|---|---|

_WTF Agents · wtfagents.com · The autonomous company economy is here. WTF is happening._

_© 2026 WTF Agents. All rights reserved._


# 8. WTF is Anthropic

- **Slug:** `anthropic`
- **Script:** `generate_guide_8.py`
- **PDF:** `public/guides/wtf-is-anthropic.pdf`
- **Pages:** 7
- **Sections:** 90 text blocks, 2 table/box, 2 page breaks

---

**WTF is**

**Anthropic?**

The $380 billion AI safety lab founded by the people who left OpenAI. Builders of Claude. Inventors of Constitutional AI and the Model Context Protocol. Arguably the most important AI company most people have never properly understood.

_WTF Agents · wtfagents.com · March 2026_

_Part of the WTF Agents Guide Series · wtfagents.com/store_

---

### The one-liner

**Anthropic is an AI safety company that builds some of the most powerful AI models in the world — including Claude — while simultaneously arguing that those models could be among the most dangerous technologies ever created.**

That tension is not a contradiction. It is Anthropic's core philosophy: if powerful AI is coming regardless, it is better to have safety-focused labs at the frontier than to cede that ground to labs that prioritise capability over safety.

### The founding story — the OpenAI exodus

To understand Anthropic, you need to understand where it came from.

In 2021, a group of senior researchers and executives left OpenAI — then the world's most prominent AI lab — amid internal disagreements about the direction of the organisation. The core concern: as OpenAI became more commercially successful (especially after the Microsoft investment), some believed it was prioritising capability and speed over safety.

The exodus was led by siblings Dario Amodei (then VP of Research at OpenAI) and Daniela Amodei (then VP of Operations). They left together with a team of senior researchers including Tom Brown (lead author of GPT-3), Chris Olah (pioneering interpretability researcher), Sam McCandlish, Jack Clark, and Jared Kaplan.

**They founded Anthropic in 2021 with a stated mission: "the responsible development and maintenance of advanced AI for the long-term benefit of humanity."**

Anthropic is structured as a Public Benefit Corporation — not a standard for-profit — signalling a legal commitment to considerations beyond shareholder returns.

### The scale — $380 billion and growing

Anthropic is no longer a scrappy safety research lab. It is one of the most valuable private companies in the world.

| $380B | Valuation as of February 2026 |
|---|---|
| $30B | Funding round closed February 2026 — largest single AI fundraise in history |
| Amazon | Lead investor — $4B+ committed, with Claude available via AWS Bedrock |
| Google | Major investor — Claude available via Google Cloud Vertex AI |
| Nvidia | Investor — strategic partnership on AI infrastructure |

Dario and Daniela Amodei's net worth is estimated at approximately $7 billion each as of 2026 — a remarkable outcome for researchers who left a previous employer over principled disagreements about AI safety.

### What makes Anthropic different

#### 1. Safety as the founding principle

Every major AI lab talks about safety. Anthropic was founded because of it. The company's research agenda includes significant investment in interpretability (understanding why AI models produce the outputs they do) and alignment (ensuring AI systems pursue the goals humans actually intend). Most competitors do far less of this.

#### 2. Constitutional AI

Anthropic invented a training technique called Constitutional AI (CAI). Instead of relying purely on human feedback to teach models to be helpful and harmless, CAI gives the model a set of principles — a "constitution" — and trains it to critique and revise its own outputs against those principles.

The result is a model that is more reliably honest, more consistent in its values, and better at handling difficult edge cases — not because it is restricted, but because it has internalised good values through training.

#### 3. Interpretability research

Chris Olah, one of Anthropic's co-founders, is the world's leading researcher in mechanistic interpretability — understanding the internal workings of neural networks. Anthropic's interpretability team publishes research that peers at competitors largely do not. This matters because you cannot fix what you cannot understand.

#### 4. The Model Context Protocol (MCP)

In November 2024, Anthropic published MCP — an open standard that lets AI agents connect to any external tool or data source. Think of it as USB-C for AI: a universal plug that works with any system. MCP has since been adopted by OpenAI, Google, Microsoft, and virtually all major agent frameworks. Anthropic donated MCP to the Agentic AI Foundation (AAIF) — a neutral home under the Linux Foundation, backed by Anthropic, OpenAI, Google, Microsoft, Amazon, Cloudflare, and Bloomberg.

#### 5. Public Benefit Corporation structure

Unlike OpenAI (which converted to a for-profit structure) or Google and Microsoft (publicly traded companies with shareholder obligations), Anthropic's PBC structure legally allows it to prioritise its stated mission over pure profit maximisation.

### The products

Anthropic's commercial products are all built around Claude:

**Claude** — The flagship AI model family. Powers everything else. See the WTF is Claude guide for the full story.

**Claude Code** — An autonomous coding agent. Reads codebases, writes and edits code, runs tests, commits to Git. The most-loved coding tool among developers in 2026.

**Claude.ai** — The consumer chat interface. Anthropic's equivalent of ChatGPT.

**Anthropic API** — Developer access to Claude models. Used by OpenClaw, Paperclip, and thousands of applications.

**Amazon Bedrock** — Claude models available via AWS. Part of Anthropic's strategic partnership with Amazon.

**Google Vertex AI** — Claude models available via Google Cloud. Part of Anthropic's strategic partnership with Google.

### The honest tension — safety lab or AI arms race participant?

**Anthropic occupies a genuinely unusual position: a company that argues AI may be one of the most dangerous technologies in human history, and then builds it anyway.**

Dario Amodei has been explicit about this. He has described Anthropic as potentially "a company that could be building one of the most transformative and potentially dangerous technologies in human history, and yet presses forward anyway." The justification: safety-focused labs need to be at the frontier, not watching from the sidelines while others build without safety constraints.

Critics point out that this logic can justify almost anything. A $380 billion valuation also creates its own commercial pressures that may not always align with pure safety priorities.

Supporters note that Anthropic's actual research output — on interpretability, Constitutional AI, and alignment — is substantively different from competitors who publish less safety research while claiming equivalent commitment.

The honest answer: Anthropic is probably the most safety-focused lab at the frontier. Whether that is enough — given the speed of the technology's development — is one of the most important open questions in AI.

### Why Anthropic matters for the agentic economy

Anthropic's fingerprints are on almost every important development in the agentic economy:

- → **Claude** is the default LLM for OpenClaw, the most-starred open-source agent project.
- → **Claude Code** is the most-loved coding agent, used by Paperclip and thousands of developers.
- → **MCP** is the universal standard connecting agents to tools — the plumbing of the agentic economy.
- → **Constitutional AI** is why Claude-powered agents behave more reliably and honestly than alternatives.
- → **The AAIF** (which Anthropic co-founded) is the neutral home for open agentic standards.
You can build in the agentic economy without ever thinking about Anthropic. But understanding Anthropic helps you understand why the tools work the way they do — and why that matters.

### The key people

**Dario Amodei** — CEO and co-founder. Former VP of Research at OpenAI. The public face of Anthropic. Estimated net worth ~$7B.

**Daniela Amodei** — President and co-founder. Former VP of Operations at OpenAI. Runs the business side of Anthropic.

**Chris Olah** — Co-founder. The world's leading mechanistic interpretability researcher. Pioneering work on understanding neural networks from the inside.

**Tom Brown** — Co-founder. Lead author of the GPT-3 paper — one of the most important AI papers ever written.

**Jared Kaplan** — Co-founder. Developed neural scaling laws — the mathematical relationship between model size, data, and capability that guides how labs train models.

### Glossary

**Anthropic** — AI safety company founded in 2021. Builders of Claude. $380B valuation. Structured as a Public Benefit Corporation.

**Constitutional AI (CAI)** — Anthropic's training technique that gives AI models a set of principles to evaluate their own outputs against.

**Interpretability** — Research into understanding the internal workings of AI models — why they produce the outputs they do.

**Alignment** — The problem of ensuring AI systems pursue the goals humans actually intend, not something subtly different.

**MCP (Model Context Protocol)** — Anthropic's open standard for connecting AI agents to external tools. Published November 2024. Donated to the AAIF.

**AAIF (Agentic AI Foundation)** — A directed fund under the Linux Foundation. Co-founded by Anthropic, Block, and OpenAI. Neutral home for MCP and other open agentic standards.

**Public Benefit Corporation** — A corporate structure that legally allows a company to prioritise its stated mission alongside profit.

**Scaling laws** — Mathematical relationships describing how AI capability improves with model size, data, and compute. Discovered partly by Jared Kaplan.

**Claude** — Anthropic's flagship AI model. The most-used LLM in the agentic economy.

**Amazon Bedrock** — AWS's managed AI service. Hosts Claude models as part of Anthropic's strategic partnership with Amazon.

---

### Liked this? Go deeper.

Anthropic is the company. Here are the products.

**WTF is Claude**

Anthropic's flagship model. The AI powering most of the agentic economy. The full story.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Claude Code**

The autonomous coding agent. How it works, what it can do, why developers love it.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is an LLM**

The technical foundation behind Claude and every other AI model. Plain English, no maths.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is the Agentic Economy**

Where Anthropic fits in the $52B+ market reshaping business and employment.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Cowork**

Claude Code was for developers. Cowork is for everyone else. The product that wiped $285B off enterprise software stocks.

[wtfagents.com/store](https://wtfagents.com/store)

Want this level of insight every Monday?

WTF Agents Intelligence — the weekly briefing on the agentic economy. Real data, real companies, real insight. Every Monday. $49/month.

[wtfagents.com/intelligence →](https://wtfagents.com/intelligence)

| [QR CODE] | **Scan to browse all guides** All WTF Agents guides at wtfagents.com/store $7 each · Bundles from $29 · Instant PDF download |
|---|---|

_WTF Agents · wtfagents.com · The autonomous company economy is here. WTF is happening._

_© 2026 WTF Agents. All rights reserved._


# 9. WTF is Claude

- **Slug:** `claude`
- **Script:** `generate_guide_9.py`
- **PDF:** `public/guides/wtf-is-claude.pdf`
- **Pages:** 6
- **Sections:** 83 text blocks, 2 table/box, 2 page breaks

---

**WTF is**

**Claude?**

The AI model powering OpenClaw, Claude Code, and much of the agentic economy. Built by Anthropic with safety at its core. As of March 2026, one of the most capable and widely deployed AI models in the world.

_WTF Agents · wtfagents.com · March 2026_

_Part of the WTF Agents Guide Series · wtfagents.com/store_

---

### The one-liner

**Claude is Anthropic's AI model — a Large Language Model trained to be helpful, honest, and harmless, with a particular focus on safety and reliability for agentic use.**

It is the brain inside OpenClaw (the most-starred open-source agent), the engine behind Claude Code (the most-loved coding tool among developers), and one of the three frontier models competing at the top of every major AI benchmark.

### The model family — what's available in March 2026

Claude is not a single model — it is a family of models at different price and capability points:

#### Claude Opus 4.6

The most powerful model in the family. Best for complex reasoning, long autonomous tasks, and demanding agentic workflows. SWE-bench score: 75.6% (real software engineering tasks). Context window: up to 1 million tokens (beta). Output: up to 128,000 tokens.

#### Claude Sonnet 4.6

The mid-tier model. Faster than Opus, more affordable, with strong agentic capabilities. Best for most business use cases where you need capability without Opus-level cost.

#### Claude Haiku 4.x

The fastest and most cost-effective model. Best for high-volume, lower-complexity tasks where speed and cost matter more than raw capability.

### How Claude compares to the competition

As of March 2026, three frontier models compete at the top of AI benchmarks:

| Model | Made by | SWE-bench | Key strength |
|---|---|---|---|
| Claude Opus 4.6 | Anthropic | 75.6% | Agentic reliability, safety, honesty |
| Gemini 3.1 Pro | Google | 80.6% | Highest benchmark score, Google ecosystem |
| GPT-5.4 | OpenAI | 57.7%* | Native computer use, consumer reach |

_* GPT-5.4 SWE-bench Pro score. Benchmark methodologies vary._

Raw benchmark scores tell part of the story. What they do not capture: Claude's reputation for being more honest, more nuanced, and more reliable in real-world agentic deployments. Developers building serious autonomous systems consistently report Claude behaving more predictably than alternatives — declining harmful requests more gracefully, flagging ambiguity rather than guessing, and handling edge cases more sensibly.

### What Claude can actually do

**Write and edit** — Any style, any length, any format. Essays, code, emails, legal documents, marketing copy, technical documentation. Claude adapts to context better than almost any other model.

**Reason through complex problems** — Multi-step logical problems, mathematical reasoning, strategic analysis. Claude thinks through problems step by step rather than pattern-matching to a quick answer.

**Read and analyse long documents** — With a 1 million token context window (beta), Claude can read entire codebases, long legal documents, or research papers in a single session.

**Write, debug, and explain code** — Across all major programming languages. Claude Code (the agentic version) takes this further — it reads codebases, writes code, runs tests, and commits to Git autonomously.

**Use tools via MCP** — Browse the web, read files, query databases, call APIs, send emails — through the Model Context Protocol that Anthropic invented.

**Maintain long conversations** — Unlike models with small context windows, Claude can maintain coherent conversations and task execution over very long sessions — critical for autonomous agent work.

**Be honest about uncertainty** — A genuinely unusual capability: Claude is trained to say "I don't know" rather than confidently hallucinate. Constitutional AI makes this more reliable than in competing models.

### What makes Claude different — Constitutional AI in practice

Every major AI model is trained to be helpful. What makes Claude different is how it was trained to handle the hard cases.

Constitutional AI (CAI) — Anthropic's training technique — gives Claude a set of principles to evaluate its own outputs against. The result is a model that:

- → Declines harmful requests more gracefully — explaining why rather than just refusing.
- → Flags ambiguity rather than making assumptions that could cause downstream problems.
- → Maintains consistent values across different phrasings of the same request.
- → Is more honest about what it does not know.
For agentic use — where Claude is running autonomously for hours, making judgment calls constantly without human supervision — these properties matter enormously. An agent that hallucinates confidently, makes assumptions silently, or behaves inconsistently is a dangerous agent. Claude's training makes it significantly more reliable in these scenarios.

### Claude's role in the agentic economy

**Claude is not just a chatbot. It is the infrastructure of the agentic economy.**

**OpenClaw's default LLM** — The most-starred open-source agent project uses Claude as its primary model. 247,000 GitHub stars worth of developers are building with Claude under the hood.

**Claude Code** — Anthropic's own agentic coding tool — ranked "most loved" by 46% of developers in 2026, ahead of Cursor (19%) and GitHub Copilot (9%).

**Paperclip integration** — Paperclip — the multi-agent company orchestration framework — lists Claude Code as a primary supported agent.

**Thousands of applications** — Via the Anthropic API, Claude powers customer service agents, research tools, writing assistants, legal analysis tools, and more across thousands of businesses.

**AWS and Google Cloud** — Available via Amazon Bedrock and Google Vertex AI — the two largest enterprise cloud platforms. This means Claude is accessible inside existing enterprise infrastructure without new vendor relationships.

### How to access Claude

**Claude.ai** — The consumer chat interface. Free tier available; Claude Pro ($20/month) for higher limits and priority access.

**Anthropic API** — Direct API access for developers. Pay per token. Pricing varies by model (Haiku cheapest, Opus most expensive).

**Amazon Bedrock** — Claude via AWS. For teams already in the AWS ecosystem.

**Google Vertex AI** — Claude via Google Cloud. For teams already in the Google ecosystem.

**OpenClaw** — Free. Connects to Claude via your own Anthropic API key.

**Claude Code** — Available as a command-line tool. Requires an Anthropic API key.

### Glossary

**Claude** — Anthropic's AI model family. Includes Opus (most powerful), Sonnet (balanced), and Haiku (fastest).

**Claude Opus 4.6** — The flagship model. 75.6% SWE-bench, 1M token context window, 128K output tokens.

**Constitutional AI (CAI)** — Anthropic's training technique. Gives Claude principles to evaluate its own outputs. Makes Claude more reliable and honest.

**SWE-bench** — The industry benchmark for AI coding ability. Measures how well a model can solve real software engineering problems.

**Context window** — How much text Claude can process at once. Claude Opus 4.6: up to 1 million tokens (beta) — enough for entire codebases.

**MCP (Model Context Protocol)** — The open standard Claude uses to connect to external tools. Invented by Anthropic, now an open standard.

**Claude Code** — The agentic version of Claude for coding. Reads codebases, writes code, runs tests, commits to Git — autonomously.

**Anthropic API** — Developer access to Claude. Pay per token. Required for OpenClaw, Paperclip, and custom agent builds.

**Amazon Bedrock** — AWS's managed AI service. Hosts Claude for enterprise teams in the AWS ecosystem.

**Token** — The unit Claude uses to process text. Roughly 0.75 words. You pay for API usage in tokens.

---

### Liked this? Go deeper.

Claude is the model. Here is everything around it.

**WTF is Claude Code**

Claude acting as an autonomous developer. The full story on the most-loved coding agent.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Anthropic**

The company that built Claude. The founding story, the safety mission, the $380B valuation.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is an LLM**

The technical foundation behind Claude. Plain English, no maths.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is OpenClaw**

The viral open-source agent that uses Claude as its default brain.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Cowork**

Claude Code was for developers. Cowork is for everyone else. The product that wiped $285B off enterprise software stocks.

[wtfagents.com/store](https://wtfagents.com/store)

Want this level of insight every Monday?

WTF Agents Intelligence — the weekly briefing on the agentic economy. Real data, real companies, real insight. Every Monday. $49/month.

[wtfagents.com/intelligence →](https://wtfagents.com/intelligence)

| [QR CODE] | **Scan to browse all guides** All WTF Agents guides at wtfagents.com/store $7 each · Bundles from $29 · Instant PDF download |
|---|---|

_WTF Agents · wtfagents.com · The autonomous company economy is here. WTF is happening._

_© 2026 WTF Agents. All rights reserved._


# 10. WTF is Claude Code

- **Slug:** `claude-code`
- **Script:** `generate_guide_10.py`
- **PDF:** `public/guides/wtf-is-claude-code.pdf`
- **Pages:** 6
- **Sections:** 80 text blocks, 3 table/box, 2 page breaks

---

**WTF is**

**Claude Code?**

Not a code editor. Not an autocomplete plugin. An autonomous AI developer that reads your entire codebase, writes code, runs tests, fixes bugs, and commits to Git — while you do something else. Voted most-loved coding tool by 46% of developers in 2026.

_WTF Agents · wtfagents.com · March 2026_

_Part of the WTF Agents Guide Series · wtfagents.com/store_

---

### The one-liner

**Claude Code is Anthropic's autonomous coding agent — a command-line tool that takes a task, reads your codebase, figures out what needs to change, makes the changes, runs tests, and iterates until the task is done.**

It is not a tool that helps you code. It is a tool that codes while you watch — or while you do something else entirely.

### The difference that matters

There are three categories of AI coding tool. They are not the same thing:

#### Autocomplete tools (GitHub Copilot)

Suggest the next line of code as you type. You are still writing. The AI is making suggestions. You accept or reject each one. Fast, low-friction, but fundamentally reactive.

#### AI-assisted editors (Cursor)

Chat with the AI inside your editor. Ask it to write a function, explain some code, or make a change. More powerful than autocomplete, but you are still directing every step.

#### Autonomous coding agents (Claude Code)

You give the agent a task: "Add user authentication to this application." It reads the entire codebase, plans the changes, writes the code across multiple files, runs the tests, fixes the failures, and commits the result. You were not involved in the individual steps.

**The distinction matters because the productivity multiplier is completely different. Autocomplete saves you seconds. An autonomous agent saves you hours.**

### What Claude Code can actually do

**Read entire codebases** — Claude Code reads all your files — not just the one you have open. It understands how parts of the codebase relate to each other. This is critical for tasks that require changes across multiple files.

**Write and edit code** — Across all major languages: Python, JavaScript, TypeScript, Go, Rust, Java, C++, Ruby, and more. It writes idiomatic code that fits the existing style of your codebase.

**Run shell commands** — Execute tests, linters, build tools, and scripts. Read the output. Understand what failed. Try to fix it.

**Run tests and fix failures** — Write tests if you don't have them. Run existing tests. Read the failures. Fix the code. Re-run. Iterate.

**Commit to Git** — Stage changes, write commit messages, and commit — following your project's conventions.

**Handle multi-file refactors** — Rename a function used in 47 places. Change an API interface and update all callers. Restructure a module. Tasks that would take a human developer hours.

**Work on long autonomous sessions** — Unlike autocomplete tools that help one line at a time, Claude Code can work on a complex task for hours — maintaining context across the entire session.

### The numbers — developer adoption in 2026

Claude Code went from beta launch in May 2025 to category leader in under a year. Developer surveys in early 2026 found:

| 46% | "Most loved" coding tool among developers — Claude Code |
|---|---|
| 19% | "Most loved" — Cursor (previous category leader) |
| 9% | "Most loved" — GitHub Copilot (77M+ developer install base) |

This is a remarkable result. GitHub Copilot has 77 million+ developers using it and the backing of Microsoft. Claude Code overtook it in developer satisfaction in under a year — because it does something fundamentally different.

### How Claude Code fits into the agentic economy

**Claude Code is not just a tool for individual developers. It is one of the primary building blocks of the agentic economy.**

#### In Paperclip

Paperclip — the open-source multi-agent company orchestration framework — lists Claude Code as a primary supported agent. In a Paperclip "company org chart," Claude Code can be the developer agent: building and maintaining the company's software autonomously while other agents handle marketing, customer support, and operations.

#### In autonomous companies

The companies tracked on WTF Agents — the 1,293+ AI-run companies on Polsia, OpenClaw, and Paperclip — are using agents like Claude Code to build and iterate on their products. A company with no human employees still needs software. Claude Code builds it.

#### In enterprise settings

Large enterprises are using Claude Code for large-scale code migrations, test-writing, technical debt reduction, and API integrations. Tasks that previously required weeks of developer time can be completed in hours.

### Claude Code vs the alternatives

| Tool | Type | Best for | Limitation |
|---|---|---|---|
| Claude Code | Autonomous agent | Complex, multi-file tasks; long autonomous sessions | Requires CLI comfort; API costs |
| Cursor | AI-assisted editor | Fast iteration; inline editing; real-time help | Still human-directed; not autonomous |
| GitHub Copilot | Autocomplete | Quick suggestions while typing; broad ecosystem | Reactive, not autonomous |
| Codex (OpenAI) | Autonomous agent | GPT-5.4 backbone; 1M context window | Less community adoption than Claude Code |

### Do you need to be a developer to use Claude Code?

**Mostly yes — at the moment.**

Claude Code is a command-line tool. You need to be able to open a terminal, navigate to your project, and run commands. You also need an Anthropic API key and a basic understanding of Git.

That said, "developer" is a broader category than it used to be. The rise of AI-assisted coding has dramatically lowered the barrier to writing code. People who would not have called themselves developers two years ago are now using Claude Code to build real applications.

Platforms like Paperclip and Polsia are moving toward making Claude Code accessible without direct command-line interaction — embedding it as an agent in a managed workflow. Within 12-18 months, the average business owner may be able to deploy Claude Code as their "developer agent" without writing a single line of code themselves.

### What this means for software development

Claude Code is part of a broader shift in what software development means.

For decades, writing software required deep technical skill, years of learning, and constant attention to detail. The bottleneck was human developer time.

**Autonomous coding agents change the equation. The bottleneck shifts from "can we write the code?" to "do we know what to build?" The strategic and product decisions matter more. The implementation matters less.**

This does not mean software developers are going away. It means the nature of the job is changing. Senior developers who can direct, review, and architect are more valuable. Junior developers who were doing rote implementation work face the most disruption.

### Glossary

**Claude Code** — Anthropic's autonomous coding agent. CLI tool that reads codebases, writes code, runs tests, and commits to Git without step-by-step human instruction.

**Autonomous coding agent** — An AI that takes a coding task and completes it end-to-end without human direction of individual steps. Contrast with autocomplete (suggests next line) or AI-assisted editors (human-directed).

**CLI (Command Line Interface)** — A text-based way of interacting with a computer. Claude Code runs in the terminal — you type commands rather than clicking a GUI.

**Git** — The standard version control system for software projects. Claude Code can stage, commit, and manage Git operations autonomously.

**SWE-bench** — The standard benchmark for AI coding ability. Measures how well an agent can solve real software engineering tasks. Claude Opus 4.6: 75.6%.

**GitHub Copilot** — Microsoft/GitHub's AI coding tool. 77M+ developers. Autocomplete-style — helps as you type. Claude Code is a different category: autonomous.

**Cursor** — An AI-assisted code editor. More powerful than Copilot, but still human-directed. Claude Code is autonomous; Cursor is collaborative.

**Paperclip** — The multi-agent company orchestration framework that uses Claude Code as a primary developer agent.

**API key** — Your credential for accessing the Anthropic API. Required to run Claude Code. You pay per token of usage.

**Refactor** — Restructuring existing code without changing its external behaviour. A common use case for Claude Code — especially large-scale refactors across many files.

---

### Liked this? Go deeper.

Claude Code is the agent. Here is the ecosystem around it.

**WTF is Claude**

The model behind Claude Code. Everything about Anthropic's flagship AI.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Anthropic**

The company that built Claude Code. The founding story, the safety mission, the $380B valuation.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Paperclip**

The orchestration framework that uses Claude Code as its developer agent.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is an AI Agent**

What Claude Code is — and how autonomous agents work under the hood.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Cowork**

Claude Code was for developers. Cowork is for everyone else. The product that wiped $285B off enterprise software stocks.

[wtfagents.com/store](https://wtfagents.com/store)

Want this level of insight every Monday?

WTF Agents Intelligence — the weekly briefing on the agentic economy. Real data, real companies, real insight. Every Monday. $49/month.

[wtfagents.com/intelligence →](https://wtfagents.com/intelligence)

| [QR CODE] | **Scan to browse all guides** All WTF Agents guides at wtfagents.com/store $7 each · Bundles from $29 · Instant PDF download |
|---|---|

_WTF Agents · wtfagents.com · The autonomous company economy is here. WTF is happening._

_© 2026 WTF Agents. All rights reserved._


# 11. WTF is Cowork

- **Slug:** `cowork`
- **Script:** `generate_guide_12.py`
- **PDF:** `public/guides/wtf-is-cowork.pdf`
- **Pages:** 9
- **Sections:** 115 text blocks, 4 table/box, 2 page breaks

---

**WTF is**

**Cowork?**

Claude Code was for developers. Cowork is for everyone else. The Anthropic product that wiped $285 billion off enterprise software stocks — and then powered Microsoft's next big enterprise bet. Here is what it actually is and why it matters.

_WTF Agents · wtfagents.com · March 2026_

_Part of the WTF Agents Guide Series · wtfagents.com/store_

---

### The one-liner

**Cowork is Anthropic's desktop AI agent for non-developers — a tool that lets Claude read, edit, create, and organise files directly on your computer, execute multi-step tasks autonomously, and connect to your existing tools, all without touching a command line.**

Anthropic's own framing says it best: "Chat changed how we get answers. Claude Code transformed how developers build software. Now, Cowork brings that same execution power to everyone."

### The evolution — Chat → Code → Cowork

To understand Cowork you need to understand the three-stage evolution of Claude:

| Stage | Product | Who it's for | What it does |
|---|---|---|---|
| 1 | Claude Chat | Everyone | Answers questions. You ask, it responds. Reactive, not autonomous. |
| 2 | Claude Code | Developers | Autonomous coding agent. Reads codebases, writes code, runs tests, commits to Git. Requires command line. |
| 3 | Cowork | Everyone | Autonomous desktop agent. Reads and edits files, executes multi-step tasks, connects to apps. No command line needed. |

The pattern Anthropic spotted: when they released Claude Code, they expected developers to use it for coding. They did — and then immediately started using it for everything else. Organising files, writing reports, processing data, automating workflows. Cowork is the formalisation of that behaviour, made accessible without technical prerequisites.

### How Cowork actually works

Cowork lives inside the Claude Desktop app — available for Mac and Windows. You access it by clicking the Cowork tab at the top of the app, next to Chat.

#### Step 1: Grant folder access

You point Cowork at a folder on your computer. This is the boundary — Claude can only read and modify files within that folder. Start with something low-stakes: a Downloads folder, a project folder, a research directory. You control exactly what Claude can and cannot touch.

#### Step 2: Describe the task

In plain English. No special syntax, no commands. Just describe what you want done. Examples that work right now:

- → "Organise this folder. Sort files by type, rename generic ones based on content, flag duplicates."
- → "Pull the expense figures from all these receipt screenshots and create a summary spreadsheet."
- → "Read all these research notes and write a 2-page briefing document."
- → "Find all the client emails in this folder and extract the action items into a to-do list."
- → "Take this raw data CSV and generate a formatted report with charts."

#### Step 3: Claude plans and executes

Cowork makes a plan, shows it to you, and then executes it step by step. You can see what it is doing in the Progress panel. You can pause or redirect mid-task if needed. For significant actions — deleting files, sending emails — Cowork asks for confirmation first.

#### Step 4: Results land in your folder

No copy-pasting from a chat window. No downloading outputs. The finished files are in your folder, exactly where you need them.

### What makes Cowork different from just using Claude Chat

This is the question most people ask. The difference is significant:

|   | Claude Chat | Cowork |
|---|---|---|
| File access | You paste content into the chat | Claude reads files directly from your computer |
| Output | Text in a chat window — you copy it | Files created directly in your folder |
| Multi-step tasks | One response at a time — you direct each step | Claude plans and executes all steps autonomously |
| Memory | Forgets between conversations | Projects keep context, files, and instructions persistent |
| App connections | Limited | Connects to Gmail, Google Drive, Notion, Slack, and hundreds more via connectors |
| Works while you're away | No | Yes — scheduled recurring tasks run automatically |

### The features — what Cowork can do in March 2026

#### File operations

Read, edit, create, rename, organise, and delete files in your designated folder. Process any file type Claude can understand: documents, spreadsheets, PDFs, images, CSVs, emails.

#### Projects

Create a persistent workspace tied to a folder. Your files, instructions, and task history stay in one place across sessions. Instead of starting fresh every time, your project remembers what it has done and what is next. Launched March 20, 2026.

#### Scheduled tasks

Set recurring tasks that run automatically. "Every Monday morning, pull last week's sales data from this folder and generate a summary report." Cowork runs it without you being present. Launched February 25, 2026.

#### Connectors

Link Cowork to external services: Gmail, Google Drive, DocuSign, FactSet, Notion, Slack, AWS, n8n, and hundreds more via a connector marketplace. A connector that pulls data from Gmail can now save that data directly to your local folder. Desktop extensions have deeper system access than web connectors.

#### Skills

Install skills — modular capabilities — that improve Cowork's ability to create specific types of output: documents, presentations, spreadsheets. You can also create a SKILL.md file in your folder with your brand voice or standard processes and Cowork will use it every time.

#### Claude in Chrome pairing

Pair Cowork with Claude in Chrome and it gains browser access. Now it can research the web, pull live data, fill in forms, and complete tasks that require internet access — all as part of the same autonomous workflow.

#### Plugin marketplace

A full plugin marketplace launched for Team and Enterprise plans in early 2026. Plugins encode institutional knowledge and workflows across domains: financial analysis, engineering, HR, and more. Admins can deploy them across their organisation.

### The market reaction — why stocks fell $285 billion

**When Cowork launched in January 2026, enterprise software stocks fell sharply. The iShares Expanded Tech-Software Sector ETF dropped nearly 5% in a single day. Combined, enterprise software companies shed an estimated $285 billion in market value in the days following the launch.**

The reason: investors looked at what Cowork can do and compared it to what they were paying enterprise software companies to do. File management. Document creation. Data extraction. Report generation. Workflow automation. These are the core functions of dozens of $10–50/user/month SaaS products.

A knowledge worker with Cowork can now automate tasks that previously required separate tools for project management, document processing, data analysis, and workflow automation — all from one desktop agent.

The stocks recovered somewhat when Microsoft announced it was building Copilot Cowork on top of Anthropic's technology — suggesting the incumbents would adapt rather than be replaced entirely. But the signal was clear: the knowledge work software market has been permanently disrupted.

### Microsoft Copilot Cowork — the enterprise version

In March 2026, Microsoft launched Copilot Cowork — a cloud-based AI agent powered by Anthropic's Claude that executes multi-step tasks across Microsoft 365.

The difference from consumer Cowork: Copilot Cowork runs in the cloud inside Microsoft 365's infrastructure and has access to the full graph of enterprise work data — Outlook emails, Teams conversations, calendar history, SharePoint files, Excel workbooks. Rather than working on a local folder, it works across an entire organisation's data.

Price: $30/user/month, or included in the new Microsoft 365 E7 bundle at $99/user/month. Currently in Research Preview, with broader access expected late March 2026.

**The significance: despite a $13 billion investment in OpenAI, Microsoft built its newest flagship M365 feature on Anthropic's Claude. This is the clearest signal yet that Claude is the enterprise-preferred model — not because Microsoft doesn't have access to GPT, but because it chose Claude anyway.**

### Real use cases — what people are actually doing with it

#### Finance and accounting

Point Cowork at a folder of receipt screenshots. It extracts all expense data, categorises by type, and generates a formatted expense report. Tasks that took a finance assistant an hour now take Cowork five minutes.

#### Research and analysis

Feed Cowork a folder of research notes, articles, and PDFs. Ask it to synthesise the key findings into a briefing document. It reads everything, identifies themes, and writes the document — citing sources from the files it read.

#### Content operations

Give Cowork a brand voice SKILL.md file and a folder of raw content briefs. Ask it to draft all ten blog posts. It writes in your brand voice, formats correctly, and saves them as Word documents ready for review.

#### Data processing

Drop a messy CSV export into the folder. Ask Cowork to clean it, standardise the formatting, remove duplicates, and generate a summary report with charts. No spreadsheet skills required.

#### File organisation

The classic first use case. Give Cowork your Downloads folder. It sorts by type, renames files based on their actual content, flags duplicates, and creates logical subfolders. Most users hit their first "wow" moment within ten minutes of trying this.

#### Scheduled intelligence

Connect Cowork to your email via the Gmail connector. Set a recurring task: every morning at 8am, read all emails received overnight, extract action items, and create a prioritised to-do list in your project folder. You wake up to a briefing that was prepared while you slept.

### How to get access

| Plan | Access | Price |
|---|---|---|
| Claude Pro | Full Cowork access | $20/month |
| Claude Max | Full Cowork access + higher limits | $100–200/month |
| Claude Team | Full Cowork access + admin controls | $25–30/user/month |
| Claude Enterprise | Full Cowork + plugin marketplace + analytics API | Custom pricing |
| Microsoft 365 E7 | Copilot Cowork (cloud-based, M365 integrated) | $99/user/month |
| Free tier | Not available — Cowork is paid only | — |

To get started: download Claude Desktop from claude.com/download. Subscribe to Claude Pro or higher. Open the app and click the Cowork tab.

### The honest limitations

Cowork is genuinely powerful. It is also still a research preview, and it has real limitations worth knowing:

- → **Folder boundary only.** Claude can only access the folder you designate. It cannot reach outside it without explicit permission.
- → **App needs to stay open.** Cowork runs locally and needs the Claude Desktop window active. It cannot run completely in the background yet (though scheduled tasks partially address this).
- → **Hallucination risk remains.** Cowork can misread file contents or make incorrect assumptions about what a task requires. Always review outputs before acting on them.
- → **Security considerations.** Days after launch, a data exfiltration vulnerability was reported in Cowork. Anthropic patched it. Be thoughtful about which connectors you install and what folders you grant access to.
- → **External drive support is limited.** Early users report Cowork works best with local folders, not external drives or network storage. Anthropic has indicated this may be addressed in future updates.
- → **Still maturing.** Projects, scheduled tasks, and the plugin marketplace are all recent additions (January–March 2026). Expect further changes and improvements.

### What Cowork means for the agentic economy

**Claude Code proved agents could replace developer time. Cowork is the thesis applied to every knowledge worker.**

The administrative layer of every business — the file management, the data processing, the report generation, the inbox management, the scheduling — is now automatable by a non-technical person with a $20/month subscription.

The barrier to running a lean, agent-powered business has never been lower. A solo founder with Cowork, Claude Code, and OpenClaw has the operational capacity of a team of five. A small business owner with Cowork has an always-on assistant that never sleeps, never forgets, and costs less than a gym membership.

The HBR research published in early 2026 noted that companies are already making headcount decisions based on AI's potential, not just its demonstrated performance. Cowork is part of why. It is not a future prediction — it is a current product that current businesses are using to do real work right now.

### Glossary

**Cowork** — Anthropic's autonomous desktop AI agent. Part of the Claude Desktop app. Reads, edits, and creates files on your computer and executes multi-step tasks without command-line skills.

**Claude Desktop** — The desktop application from Anthropic. Available for Mac and Windows. Contains Chat, Code, and Cowork modes. Download at claude.com/download.

**Projects (Cowork)** — A persistent workspace tied to a folder — keeps files, instructions, and task history in one place across sessions. Launched March 20, 2026.

**Scheduled tasks** — Recurring tasks that Cowork runs automatically on a set schedule — daily, weekly, or custom timing. Launched February 25, 2026.

**Connectors** — Integrations that link Cowork to external services — Gmail, Google Drive, DocuSign, Slack, Notion, and hundreds more.

**Skills** — Modular capabilities installed into Cowork. Including custom SKILL.md files you create to encode your brand voice or standard processes.

**Claude in Chrome** — Anthropic's browser agent. When paired with Cowork, gives it web access for tasks requiring live internet data.

**Copilot Cowork** — Microsoft's enterprise version of Cowork — cloud-based, running across Microsoft 365. Powered by Anthropic's Claude. $30/user/month. Launched March 2026.

**Research Preview** — Anthropic's term for a product that is live and available but still being actively developed and improved.

**Claude Code** — The developer-facing autonomous coding agent that Cowork is built on. Requires command-line skills. Cowork is the non-technical equivalent.

**Knowledge worker** — Someone whose job primarily involves creating, processing, or managing information — as opposed to physical labour. Cowork is specifically designed for this category.

---

### Liked this? Go deeper.

Cowork is built on Claude and sits alongside Claude Code. Here is the full picture.

**WTF is Claude Code**

The developer version of what Cowork does. If Cowork is the automatic, Claude Code is the manual — more powerful, more technical.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Claude**

The AI model powering Cowork, Claude Code, and the entire agentic economy.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Anthropic**

The company that built Cowork. The $380B lab behind the tools reshaping knowledge work.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is an AI Agent**

What Cowork actually is under the hood — how agents plan, act, and iterate.

[wtfagents.com/store](https://wtfagents.com/store)

**How to Hire an AI Agent for Your Business**

Practical guide to deploying Cowork and other agents in your business this week.

[wtfagents.com/store](https://wtfagents.com/store)

Want this level of insight every Monday?

WTF Agents Intelligence — the weekly briefing on the agentic economy. Real data, real companies, real insight. Every Monday. $49/month.

[wtfagents.com/intelligence →](https://wtfagents.com/intelligence)

| [QR CODE] | **Scan to browse all guides** All WTF Agents guides at wtfagents.com/store $7 each · Bundles from $29 · Instant PDF download |
|---|---|

_WTF Agents · wtfagents.com · The autonomous company economy is here. WTF is happening._

_© 2026 WTF Agents. All rights reserved._


# 12. How to Hire an AI Agent for Your Business

- **Slug:** `hire-agent`
- **Script:** `generate_guide_11.py`
- **PDF:** `public/guides/how-to-hire-an-ai-agent.pdf`
- **Pages:** 8
- **Sections:** 112 text blocks, 3 table/box, 2 page breaks

---

**How to Hire an AI Agent**

**for Your Business**

A practical, jargon-free guide for business owners. No code required. No prior AI experience needed. Just clear steps to deploy your first AI agent this week — and start getting your time back.

_WTF Agents · wtfagents.com · March 2026_

_Part of the WTF Agents Guide Series · wtfagents.com/store_

---

### Before you start — the right mindset

**Deploying AI agents in your business is not a technology project. It is a staffing decision.**

The mental model that works: treat AI agents like new hires. You would not give a brand new employee access to your entire company on day one. You would not give them a vague goal with no check-ins. You would not trust them to make major decisions without oversight — until they had earned it.

Apply the same thinking to agents. Start small. Define the role precisely. Give limited access. Review outputs. Build trust incrementally.

The businesses failing with AI agents are the ones that try to automate everything at once. The businesses winning are the ones that deploy one agent, in one area, get it working reliably, and then expand.

### Step 1 — Find your highest-value repeatable task

**The best first AI agent is not the most ambitious one. It is the one that solves a specific, well-defined, repeatable problem.**

Ask yourself: what do I (or my team) do repeatedly that follows a predictable pattern? The answer to that question is where your first agent should go.

High-value starting points for most businesses:

**Customer support responses** — Answering the same questions repeatedly. An agent can handle first-line support — answering FAQs, routing complex issues to humans, following up on tickets.

**Content creation** — Writing social media posts, blog articles, email newsletters, product descriptions. An agent can produce a first draft; you refine and approve.

**Research and summarisation** — Researching competitors, summarising industry news, compiling information from multiple sources. An agent can do this in minutes rather than hours.

**Data entry and processing** — Extracting information from emails or documents and entering it into a spreadsheet or CRM. Tedious for humans; straightforward for agents.

**Email drafting** — Writing first drafts of emails — proposals, follow-ups, updates. The agent drafts; you review and send.

**Scheduling and coordination** — Managing calendar bookings, sending reminders, coordinating meeting times.

**Lead qualification** — Reviewing inbound enquiries, asking qualifying questions, scoring leads before they reach a human salesperson.

### Step 2 — Choose the right type of agent

Not all agents are right for all tasks. Here is a simple decision framework:

| If you want to... | Use this | Cost |
|---|---|---|
| Launch an AI-run company with no technical setup | Polsia (polsia.com) | $50/mo + 20% revenue share |
| Deploy a personal AI assistant that takes actions via messaging apps | OpenClaw (openclaw.ai) | Free + LLM API costs |
| Build a multi-agent team to run a business | Paperclip (paperclip.ing) | Free (self-hosted) |
| Automate specific business workflows without coding | Relevance AI (relevanceai.com) | Free tier available |
| Automate repetitive tasks and connect apps | Zapier AI (zapier.com) | From $19.99/mo |
| Build a custom agent with full control | Anthropic API + Claude | Pay per token |

### Step 3 — Write a clear job description for your agent

**This is the most important step most people skip.**

AI agents work best when given precise, well-defined instructions. Vague goals produce vague results. Before deploying an agent, write out — in plain English — exactly what you want it to do.

A good agent job description includes:

- → **The goal** — what outcome do you want? ("Respond to customer support emails within 2 hours")
- → **The inputs** — what information does the agent receive? ("An inbound email from a customer")
- → **The outputs** — what should the agent produce? ("A draft reply, flagged for human review if the issue is a refund request")
- → **The constraints** — what should the agent NOT do? ("Never promise a refund without human approval")
- → **The escalation path** — when should it involve a human? ("Any complaint that mentions a legal threat")
The more specific you are, the better the agent performs. "Handle customer support" is a bad brief. "Read inbound customer emails, identify the question type from this list of 12 categories, draft a reply using these templates, and flag any complaint mentioning a refund or legal issue for human review" is a good brief.

### Step 4 — Start with read-only access

**The most common mistake when deploying agents: giving them too much access too soon.**

Start by giving your agent access to read information, not to take actions. Let it draft emails — do not let it send them. Let it suggest calendar bookings — do not let it confirm them. Let it write social posts — do not let it publish them.

Run in this "human-in-the-loop" mode for a week or two. Review everything the agent produces. Identify where it gets things right consistently, and where it makes mistakes.

Once you trust the agent's judgment in a specific area, you can expand its permissions incrementally. Never expand all at once.

### Step 5 — Measure results honestly

**Define what success looks like before you deploy — not after.**

For each agent you deploy, set a specific metric:

- → Customer support agent: average response time, customer satisfaction score, escalation rate
- → Content agent: posts published per week, engagement rate, time saved
- → Research agent: hours saved per week, accuracy of outputs
- → Lead qualification agent: leads qualified per day, conversion rate vs human qualification
Review these metrics weekly for the first month. If the agent is not delivering measurable value, adjust the brief before expanding its scope.

### Real examples — what businesses are doing right now

#### E-commerce store (5 employees)

Deployed an agent to handle first-line customer support emails. The agent categorises enquiries, drafts replies using approved templates, and flags unusual requests for human review. Result: response time dropped from 6 hours to 20 minutes. 80% of emails handled without human involvement.

#### Marketing agency (12 employees)

Deployed an agent to research clients' industries and draft weekly content calendars. Copywriters now spend time on strategy and editing, not research. Result: capacity increased 40% without additional headcount.

#### Accounting firm (3 partners)

Deployed an agent to summarise client emails and draft responses for partner review. Result: 2 hours per day saved per partner. Used the time to take on 3 additional clients.

#### Solo consultant

Deployed OpenClaw as a personal assistant — briefing it via Telegram with research tasks, email drafts, and document summaries. Cost: approximately $30/month in LLM API costs. Time saved: 10+ hours per week.

#### SaaS startup (8 people)

Deployed Claude Code to handle routine bug fixes and feature requests. Senior engineers now focus on architecture and complex problems. Result: shipped 3x more features in Q1 2026 with the same team.

### The honest cost — what agents actually cost

AI agents are significantly cheaper than human employees. But they are not free. Here is what to budget:

| Agent type | Monthly cost (approx) | What drives the cost |
|---|---|---|
| Polsia company | $50/mo + 20% revenue | Flat fee plus revenue share |
| OpenClaw (personal) | $20-100/mo | Anthropic or OpenAI API usage |
| Relevance AI | $0-299/mo | Free tier to enterprise plans |
| Zapier AI | $20-100/mo | Task volume and plan tier |
| Custom Claude agent | $50-500/mo | Token usage — depends heavily on task volume |
| Claude Code | $100-500/mo | API token usage — intensive for large codebases |

For context: a part-time human assistant in the UK costs £1,500-2,500/month. A full-time junior employee costs £25,000-35,000/year. An agent handling equivalent work costs £50-500/month. The economics are not subtle.

### What agents cannot do — be honest with yourself

AI agents are powerful. They are not magic. Here is what they cannot reliably do:

- → Build genuine human relationships (clients, partners, key hires)
- → Handle truly novel situations with no precedent
- → Make judgment calls in highly regulated areas without human oversight
- → Replace the strategic vision and creative direction of a founder
- → Guarantee factual accuracy on topics outside their training
- → Handle physical world tasks (no hands, no body)
The businesses that deploy agents most successfully are the ones that are clear-eyed about this. Use agents for what they are good at. Keep humans for what humans are good at. The boundary between the two is moving — but it has not disappeared.

### Your action plan — what to do this week

**Day 1** — Write down the three most repetitive tasks in your business. Pick the one with the clearest inputs and outputs.

**Day 2** — Write the "job description" for your first agent. Goal, inputs, outputs, constraints, escalation path.

**Day 3** — Sign up for one platform from Step 2. Start with the free tier or lowest plan.

**Day 4-5** — Configure the agent with your job description. Run it in read-only mode — review everything it produces.

**Week 2** — Measure the output quality. Refine the brief where it is getting things wrong. Keep reviewing.

**Week 3-4** — If quality is consistently good, expand permissions incrementally. Track the time saved.

**Month 2** — Deploy a second agent in a different area. Build your agent team the same way you would build a human team — one role at a time.

**The businesses that win with AI agents in 2026 are not the ones with the biggest budgets or the most technical teams. They are the ones that start now, learn fast, and iterate.**

### Glossary

**AI Agent** — Software that pursues goals autonomously — taking actions, using tools, and adapting without constant human instruction.

**Human-in-the-loop** — A deployment mode where an agent produces outputs but a human reviews and approves before actions are taken.

**Polsia** — A managed platform where AI agents build and run companies. $50/mo + 20% revenue share.

**OpenClaw** — Free, open-source personal AI agent. Runs locally, takes instructions via messaging apps.

**Paperclip** — Open-source multi-agent orchestration framework for running businesses with teams of AI agents.

**Relevance AI** — No-code/low-code platform for building AI agents for specific business workflows. $37M raised.

**Zapier AI** — Major automation platform with AI agent capabilities. Connects thousands of apps.

**Claude** — Anthropic's AI model. Powers OpenClaw, Claude Code, and many business agent deployments.

**API key** — Your credential for accessing an AI model's API. Required for OpenClaw, Claude Code, and custom builds.

**Token** — The unit AI models use to process text. You pay for API usage in tokens. Roughly 0.75 words per token.

**MCP (Model Context Protocol)** — The open standard connecting AI agents to external tools. Invented by Anthropic.

---

### Liked this? Go deeper.

You now know how to hire an agent. Here is the full context behind the tools you are using.

**WTF is an AI Agent**

The deep dive on what agents actually are — how they think, plan, and act.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is OpenClaw**

The viral open-source agent. Full story including security considerations.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Claude**

The AI model powering most of the agents in this guide.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is the Agentic Economy**

The big picture — where your new agent fits in a $52B+ market.

[wtfagents.com/store](https://wtfagents.com/store)

**WTF is Cowork**

Claude Code was for developers. Cowork is for everyone else. The product that wiped $285B off enterprise software stocks.

[wtfagents.com/store](https://wtfagents.com/store)

Want this level of insight every Monday?

WTF Agents Intelligence — the weekly briefing on the agentic economy. Real data, real companies, real insight. Every Monday. $49/month.

[wtfagents.com/intelligence →](https://wtfagents.com/intelligence)

| [QR CODE] | **Scan to browse all guides** All WTF Agents guides at wtfagents.com/store $7 each · Bundles from $29 · Instant PDF download Also: 1,293+ real AI companies at wtfagents.com/companies |
|---|---|

_WTF Agents · wtfagents.com · The autonomous company economy is here. WTF is happening._

_© 2026 WTF Agents. All rights reserved._
