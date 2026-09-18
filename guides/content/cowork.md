---
slug: 'cowork'
title: 'WTF is Cowork'
file: 'wtf-is-cowork.pdf'
cover_title: 'WTF is'
cover_subtitle: 'Cowork?'
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  Claude Code was for developers. Cowork is for everyone else. The Anthropic product that
  rattled enterprise software stocks, became Microsoft's flagship agent, and now runs in
  the cloud, on your phone, and in its own browser. What it is and why it matters.

# store catalogue fields
order: 10
description: 'Claude Code was for developers. Cowork is for everyone else. What it does, what it costs, and how it changed the work-agent market.'
price: 7
stripe_price_id: 'price_1UGyCUBaLipfLqFs0nW7xDYT'
category: 'claude'
badge: null
featured: false
starter: false
related: ['claude-code', 'hire-agent']
---
## The one-liner

@body_lead Cowork is Anthropic's desktop AI agent for non-developers — a tool that lets Claude read, edit, create, and organise files directly on your computer, execute multi-step tasks autonomously, and connect to your existing tools, all without touching a command line.

Anthropic's own framing says it best: "Chat changed how we get answers. Claude Code transformed how developers build software. Now, Cowork brings that same execution power to everyone."

@spacer 4

## By the numbers — September 2026

@stat 12 Jan || 2026: launched as a research preview. Generally available on Mac and Windows since April, web and phone since July
@stat 90%+ || of Cowork sessions are not software development, per Anthropic's own analysis of 1.2 million sessions
@stat 26 Aug || 2026: Cowork gets its own built-in browser. Claude in Chrome goes generally available the same week
@stat $20 || per month — included in Claude Pro and every paid plan above it. Not on the free tier
@stat 11 || official Anthropic plugins for sales, finance, legal, marketing and more, plus a marketplace of third-party ones
@stat June || 2026: Microsoft's Copilot Cowork, built on Claude, goes live worldwide in Microsoft 365

@spacer 4

## The evolution — Chat → Code → Cowork

To understand Cowork you need to understand the three-stage evolution of Claude:

@table keep 12,30,35,83
@tcells hs-row
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 0,1 -1,-1 [DARK_BG,ZINC_900]
| Stage | Product | Who it's for | What it does |
| 1 | Claude Chat | Everyone | Answers questions. You ask, it responds. Reactive, not autonomous. |
| 2 | Claude Code | Developers | Autonomous coding agent. Reads codebases, writes code, runs tests, commits to Git. Requires command line. |
| 3 | Cowork | Everyone | Autonomous desktop agent. Reads and edits files, executes multi-step tasks, connects to apps. No command line needed. |

@spacer 4

The pattern Anthropic spotted: when they released Claude Code, they expected developers to use it for coding. They did — and then immediately started using it for everything else. Organising files, writing reports, processing data, automating workflows. Cowork is the formalisation of that behaviour, made accessible without technical prerequisites.

@spacer 4

## How Cowork actually works

Cowork lives inside the Claude Desktop app for Mac and Windows, and since July 2026 also on claude.ai in a browser and in the Claude phone app. You access it by clicking the Cowork tab, next to Chat. Sessions run against your Claude account, so a task started on the desktop keeps running after you close the laptop, and you can check on it from your phone.

### Step 1: Grant folder access

You point Cowork at a folder on your computer. This is the boundary — Claude can only read and modify files within that folder. Start with something low-stakes: a Downloads folder, a project folder, a research directory. You control exactly what Claude can and cannot touch.

### Step 2: Describe the task

In plain English. No special syntax, no commands. Just describe what you want done. Examples that work right now:

- → "Organise this folder. Sort files by type, rename generic ones based on content, flag duplicates."
- → "Pull the expense figures from all these receipt screenshots and create a summary spreadsheet."
- → "Read all these research notes and write a 2-page briefing document."
- → "Find all the client emails in this folder and extract the action items into a to-do list."
- → "Take this raw data CSV and generate a formatted report with charts."
@spacer 3

### Step 3: Claude plans and executes

Cowork makes a plan, shows it to you, and then executes it step by step. You can see what it is doing in the Progress panel. You can pause or redirect mid-task if needed. For significant actions — deleting files, sending emails — Cowork asks for confirmation first.

### Step 4: Results land in your folder

No copy-pasting from a chat window. No downloading outputs. The finished files are in your folder, exactly where you need them.

@spacer 4

## What makes Cowork different from just using Claude Chat

This is the question most people ask. The difference is significant:

@table keep 35,60,65
@tcells hs-row
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
|  | Claude Chat | Cowork |
| File access | You paste content into the chat | Claude reads files directly from your computer |
| Output | Text in a chat window — you copy it | Files created directly in your folder |
| Multi-step tasks | One response at a time — you direct each step | Claude plans and executes all steps autonomously |
| Memory | Forgets between conversations | Projects keep context, files, and instructions persistent |
| App connections | Limited | Connects to Gmail, Google Drive, Notion, Slack, and hundreds more via connectors |
| Works while you're away | No | Yes — scheduled recurring tasks run automatically |

@spacer 4

## The features — what Cowork can do

### File operations

Read, edit, create, rename, organise, and delete files in your designated folder. Process any file type Claude can understand: documents, spreadsheets, PDFs, images, CSVs, emails.

### Projects

A persistent workspace tied to a folder. Your files, instructions, and task history stay in one place across sessions. Instead of starting fresh every time, your project remembers what it has done and what is next.

### Scheduled tasks

Recurring tasks that run automatically. "Every Monday morning, pull last week's sales data from this folder and generate a summary report." Since the move to cloud sessions, scheduled tasks fire even with no device online.

### Connectors

Link Cowork to external services: Gmail and Google Workspace, Microsoft 365 (Outlook, OneDrive, SharePoint, Teams), Slack, Jira, Notion, DocuSign, and hundreds more via the connector marketplace. Desktop extensions have deeper system access than web connectors.

### Skills

Install skills — modular capabilities — that improve Cowork's output for specific formats: documents, presentations, spreadsheets. You can also write a SKILL.md file with your brand voice or standard process and Cowork uses it every time.

### The built-in browser

Since August 2026 Cowork has its own Chromium browser in a side panel of the desktop app. When a task involves a website, the browser opens, Claude navigates, fills forms and finishes the job — separate from your own browser and logins. If you would rather it work inside your own signed-in Chrome, Claude in Chrome does that and is now available on every paid plan; a safety classifier checks each action before it is taken.

### Computer use

Cowork can see your screen and drive any application on your machine, not just the browser. Useful for tools that have no connector: a niche internal system, a desktop app, anything with buttons.

### Plugins

Role-specific bundles of skills, prompts and connectors. Anthropic publishes its own — sales, finance, legal, marketing, and a Claude for Financial Advisors plugin covering onboarding, meeting prep and portfolio reviews — and a marketplace carries third-party ones. Plugins run on whatever plan you already have; nothing extra to buy from Anthropic.

### Dispatch

Control a desktop Cowork session from your phone: approve a step, redirect, or read the result on the move.

@spacer 4

## The market reaction — why software stocks fell

@body_lead When Cowork launched in January 2026, and again when its plugins landed, enterprise software stocks fell sharply. The iShares Expanded Tech-Software Sector ETF dropped nearly 5% in a single day, and analysts put the combined loss across enterprise software companies in the hundreds of billions of dollars.

The reason: investors looked at what Cowork can do and compared it to what they were paying enterprise software companies to do. File management. Document creation. Data extraction. Report generation. Workflow automation. These are the core functions of dozens of $10–50/user/month SaaS products.

A knowledge worker with Cowork can now automate tasks that previously required separate tools for project management, document processing, data analysis, and workflow automation — all from one desktop agent.

The stocks recovered somewhat when Microsoft announced it was building Copilot Cowork on top of Anthropic's technology — suggesting the incumbents would adapt rather than be replaced entirely. But the signal was clear: the knowledge work software market has been permanently disrupted.

@spacer 4

## Microsoft Copilot Cowork — the enterprise version

Microsoft announced Copilot Cowork in March 2026 and made it generally available worldwide in June: a cloud-based agent, powered by Anthropic's Claude, that executes multi-step tasks across Microsoft 365.

The difference from consumer Cowork: Copilot Cowork runs inside Microsoft 365's own infrastructure with access to the full graph of enterprise work data — Outlook, Teams, calendars, SharePoint, Excel. Rather than working on a local folder, it works across an entire organisation's data.

It ships as a $30 per user per month add-on, or inside the Microsoft 365 E7 bundle.

@body_lead The significance: despite a $13 billion investment in OpenAI, Microsoft built its flagship Microsoft 365 agent on Anthropic's Claude — and then took it to general availability. Not because Microsoft lacks access to GPT, but because it chose Claude anyway.

@spacer 4

## Real use cases — what people are actually doing with it

### Finance and accounting

Point Cowork at a folder of receipt screenshots. It extracts all expense data, categorises by type, and generates a formatted expense report. Tasks that took a finance assistant an hour now take Cowork five minutes.

### Research and analysis

Feed Cowork a folder of research notes, articles, and PDFs. Ask it to synthesise the key findings into a briefing document. It reads everything, identifies themes, and writes the document — citing sources from the files it read.

### Content operations

Give Cowork a brand voice SKILL.md file and a folder of raw content briefs. Ask it to draft all ten blog posts. It writes in your brand voice, formats correctly, and saves them as Word documents ready for review.

### Data processing

Drop a messy CSV export into the folder. Ask Cowork to clean it, standardise the formatting, remove duplicates, and generate a summary report with charts. No spreadsheet skills required.

### File organisation

The classic first use case. Give Cowork your Downloads folder. It sorts by type, renames files based on their actual content, flags duplicates, and creates logical subfolders. Most users hit their first "wow" moment within ten minutes of trying this.

### Scheduled intelligence

Connect Cowork to your email via the Gmail connector. Set a recurring task: every morning at 8am, read all emails received overnight, extract action items, and create a prioritised to-do list in your project folder. You wake up to a briefing that was prepared while you slept.

@spacer 4

## How to get access

@table keep 35,80,45
@tcells hs-row
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 0,1 -1,-1 [DARK_BG,ZINC_900]
| Plan | Access | Price |
| Claude Pro | Full Cowork access | $20/month |
| Claude Max | Full Cowork access + 5x or 20x the limits | $100 or $200/month |
| Claude Team | Full Cowork access + admin controls | $25–30/user/month |
| Claude Enterprise | Full Cowork + admin controls, audit logs, smart reports | Custom pricing |
| Microsoft Copilot Cowork | Cloud-based, Microsoft 365 integrated | $30/user/month add-on, or in the E7 bundle |
| Free tier | Not available — Cowork is paid only | — |

@spacer 3

To get started: subscribe to Claude Pro or higher, then open Cowork in the desktop app (claude.com/download), on claude.ai, or in the Claude phone app.

@spacer 4

## The honest limitations

Cowork is genuinely powerful. It also has real limitations worth knowing:

- → <b>Folder boundary only.</b> Claude can only access the folder you designate. It cannot reach outside it without explicit permission — and that is a feature. In one widely reported case about 15,000 family photos were deleted while Cowork tidied a desktop, and were recovered only through a 30-day cloud restore.
- → <b>It burns through usage.</b> Agent tasks use far more of your plan's allowance than chat does. Pro is the entry point; heavy daily use tends to need Max.
- → <b>Hallucination risk remains.</b> Cowork can misread file contents or make incorrect assumptions about what a task requires. Always review outputs before acting on them.
- → <b>Security considerations.</b> Days after launch, a data exfiltration vulnerability was reported and patched. Prompt injection — hidden instructions in a web page or document the agent reads — is the unsolved problem for every agent with browser access. Be thoughtful about connectors and folders.
- → <b>The desktop browser needs the desktop.</b> From the web or your phone, Claude can drive the built-in browser only while your desktop app is open. Without it, Claude in Chrome is the browser route.
- → <b>It keeps changing.</b> Cowork has shipped a major capability most months of 2026. Expect the feature list in this guide to be out of date before the next one.
@spacer 4

## What Cowork means for the agentic economy

@body_lead Claude Code proved agents could replace developer time. Cowork is the thesis applied to every knowledge worker.

The administrative layer of every business — the file management, the data processing, the report generation, the inbox management, the scheduling — is now automatable by a non-technical person with a $20/month subscription.

The barrier to running a lean, agent-powered business has never been lower. A solo founder with Cowork, Claude Code, and OpenClaw has the operational capacity of a team of five. A small business owner with Cowork has an always-on assistant that never sleeps, never forgets, and costs less than a gym membership.

The HBR research published in early 2026 noted that companies are already making headcount decisions based on AI's potential, not just its demonstrated performance. Cowork is part of why. It is not a future prediction — it is a current product that current businesses are using to do real work right now.

@spacer 4

## Glossary

@gl <b>Cowork</b> — Anthropic's autonomous desktop AI agent. Part of the Claude Desktop app. Reads, edits, and creates files on your computer and executes multi-step tasks without command-line skills.

@gl <b>Claude Desktop</b> — The desktop application from Anthropic for Mac and Windows. Contains Chat, Code, and Cowork modes, and Cowork's built-in browser. Download at claude.com/download.

@gl <b>Projects (Cowork)</b> — A persistent workspace tied to a folder — keeps files, instructions, and task history in one place across sessions.

@gl <b>Scheduled tasks</b> — Recurring tasks that Cowork runs automatically on a set schedule — daily, weekly, or custom timing.

@gl <b>Connectors</b> — Integrations that link Cowork to external services — Gmail, Google Drive, DocuSign, Slack, Notion, and hundreds more.

@gl <b>Skills</b> — Modular capabilities installed into Cowork. Including custom SKILL.md files you create to encode your brand voice or standard processes.

@gl <b>Claude in Chrome</b> — Anthropic's agent inside your own Chrome browser, generally available on all paid plans. The alternative to Cowork's built-in browser when you want it working where you are already signed in.

@gl <b>Copilot Cowork</b> — Microsoft's enterprise version of Cowork — cloud-based, running across Microsoft 365. Powered by Anthropic's Claude. $30/user/month. Generally available since June 2026.

@gl <b>Claude Code</b> — The developer-facing autonomous coding agent that Cowork is built on. Requires command-line skills. Cowork is the non-technical equivalent.

@gl <b>Knowledge worker</b> — Someone whose job primarily involves creating, processing, or managing information — as opposed to physical labour. Cowork is specifically designed for this category.

@spacer 6

@pagebreak

## Liked this? Go deeper.

Cowork is built on Claude and sits alongside Claude Code. Here is the full picture.

@spacer 4
