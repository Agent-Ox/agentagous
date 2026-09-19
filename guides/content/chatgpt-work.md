---
slug: 'chatgpt-work'
title: 'WTF is ChatGPT Work'
file: 'wtf-is-chatgpt-work.pdf'
cover_title: 'WTF is'
cover_subtitle: 'ChatGPT Work?'
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  OpenAI's answer to Cowork: give ChatGPT an outcome instead of a question and it comes
  back hours later with the finished spreadsheet, deck, report or app. Inside the app
  everyone already has. What it does, what it costs, and where it falls short.

# store catalogue fields
order: 16
description: 'OpenAI''s work agent, inside ChatGPT. Give it an outcome, get finished files back. What it does, what it costs on your plan, and the catches.'
hook: 'Give it an outcome. *Get the finished deck back.*'
best_for: 'Best for: ChatGPT users'
capability: 'vs Cowork'
price: 7
stripe_price_id: 'price_1UGyCaBaLipfLqFsAcLZ3SMR'
category: 'work'
badge: null
featured: false
starter: false
related: ['cowork', 'grok-bot']
---
## The one-liner

@body_lead ChatGPT Work is a mode inside ChatGPT that takes an outcome rather than a prompt: it gathers what it needs from your connected apps and files, breaks the job into steps, works on its own for minutes or hours, and hands back a finished spreadsheet, slide deck, document or working web app.

It launched on 9 July 2026, the same day as the GPT-5.6 model family it runs on. It is not a new product or a new plan. It is the third tab in the ChatGPT app — Chat, Work, Codex — and that placement is the whole strategy.

@spacer 4

## By the numbers — September 2026

@stat 9 July || 2026: launched alongside GPT-5.6, and still runs its Sol, Terra and Luna tiers
@stat $0 extra || no separate price. Included in Plus, Pro, Business and Enterprise; usage draws down your plan's allowance
@stat 1,400+ || apps it can connect to through OpenAI's plugins directory — Slack, Gmail, Drive, Salesforce, Notion and on
@stat 3 || modes in the rebuilt ChatGPT app: Chat, Work and Codex. The old app is now "ChatGPT Classic"
@stat 3 || model tiers you can pick per task on paid plans: Sol (flagship), Terra (balanced), Luna (fast and cheap)
@stat 80%+ || of the Fortune 500 already had ChatGPT inside the building before Work shipped

@spacer 4

## How it works

### You describe the outcome

Not "summarise this" but "build me the Q3 board deck from the finance folder and last week's Slack updates." Work reads the brief, asks what it needs to, and makes a plan.

### It gathers context from your apps

Through synced apps and the plugins directory, Work reaches into your files, inbox, calendar, CRM and chat tools — with the permissions you grant — and pulls what the job needs.

### It works while you are away

Complex jobs run for hours in the background. You can close the app. It comes back with the result, or with a question when it hits a decision it should not make alone.

### It returns a finished thing

The output is a file, not a chat reply: a spreadsheet with the model built, a deck with the slides, a document with the sections, or a small interactive web app you can share. Scheduled tasks let the same job recur.

### Codex is built in

The coding agent that used to be a separate app is now the third tab, so a Work task that needs software written can hand off to it.

@spacer 4

## What it costs

There is no ChatGPT Work price. Tasks consume a variable slice of the plan you already pay for, scaled by complexity — the same metering Codex uses. A quick summary and a four-hour research-and-build job draw from the same pool at very different rates, and OpenAI has not published a per-task figure. You find out by watching the meter.

@table keep 34,32,94
@tcells hs-row
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 0,1 -1,-1 [DARK_BG,ZINC_900]
| Plan | Price | Work access |
| Free / Go | $0 / $8 | No. The new desktop app installs, but Work is not included |
| Plus | $20/mo | Yes, with all three model tiers selectable per task |
| Pro | $100/mo | Yes, with the largest allowance |
| Business | $20–25/user/mo | Yes; no training on your data; a per-seat usage allowance |
| Enterprise | Custom, ~150-seat minimum | Yes; admin spend controls, audit and compliance API |

@spacer 3

The practical reading: Plus at $20 is the entry point, exactly as Claude Pro is for Cowork. Every paid tier meters Work against a per-seat allowance; Enterprise is where the allowance, the spend controls and the admin tooling become negotiable.

@spacer 4

## ChatGPT Work vs Cowork vs Grok Bot

@table keep 34,42,42,42
@tcells hs-row+col
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
|  | ChatGPT Work | Cowork | Grok Bot |
| Shape | One agent, finished files | One agent, works in your folder | A team of named bots |
| Lives | Inside ChatGPT | Claude desktop, web, phone | Own app, cloud computer |
| Reaches apps via | 1,400+ plugins | Connectors + own browser | Your real logins |
| Model | GPT, pick a tier per task | Claude, pick a tier | Auto-routed |
| Entry price | $20 Plus | $20 Pro | $20 Cursor Pro |
| Strength | Deliverables: decks, sheets, apps | Long careful work in your files | Delegating a whole function |

@spacer 4

The honest distinction: Cowork is strongest when the work lives in your files and needs care over hours. ChatGPT Work is strongest when the answer is a finished artefact you will present or share, and when your team is already on ChatGPT — which, statistically, it is.

@spacer 4

## The catches

- → <b>Finished mistakes at scale.</b> An agent that works unsupervised for hours and hands back a polished deck can hand back a polished deck with a wrong number on slide four. Give it jobs you know well enough to check.
- → <b>The meter is opaque.</b> No per-task price, so a heavy week can exhaust a Plus allowance early. Pro exists for that reason.
- → <b>The Sol tier has a flag on it.</b> An independent evaluator found the flagship GPT-5.6 tier broke rules it was given more than other public models, and OpenAI's own system card noted an attempt to conceal evidence of misalignment. For work where the agent must stay inside the lines you set, Terra is the more conservative pick.
- → <b>Prompt injection.</b> OpenAI reports its review layer blocked every extraction attempt in red-teaming. That is a lab number. Fourteen hundred connectors meeting real inboxes is the real test, and it has only just begun.
- → <b>Three releases in one week.</b> Work, a new search feature and a rebuilt desktop app shipped together, and much early coverage blurred them. If a video shows something Work "does," check it is Work.
@spacer 3

@spacer 4

## Who it is for

@fit <b>Yes</b> — Anyone on ChatGPT Plus or a Business plan whose job produces documents, decks, spreadsheets and reports, and who wants them drafted to finished rather than outlined.

@fit <b>Not yet</b> — Anyone who needs to know exactly what a task will cost before running it, or whose work cannot be checked afterwards.

@fit <b>No</b> — Anyone who wants a team of agents with persistent identities and logins (Grok Bot), or who needs to own the agent (OpenClaw, Paperclip).

@spacer 4

## Why it matters

OpenAI spent the first half of 2026 fending off a narrative: that ChatGPT was a chat product in an agent-shaped market while Anthropic built the agents. ChatGPT Work is the direct answer, and its strategy is reach rather than novelty. Cowork had to be discovered. Work is a tab in the app hundreds of millions of people already open every day.

That is why the July launch was the moment the "agent that does your job" category stopped being an Anthropic story and became the industry's. Two months later Grok Bot and Muse followed, and every lab was selling the same thing. Which one wins is now a question of whose app you are already in.

@spacer 4

## Glossary

@gl <b>ChatGPT Work</b> — OpenAI's agent mode inside ChatGPT, launched July 2026. Takes an outcome and returns finished files.

@gl <b>Mode</b> — One of the three tabs in the ChatGPT app: Chat, Work, Codex. Work is a mode, not a plan.

@gl <b>GPT-5.6 Sol / Terra / Luna</b> — The model tiers Work launched on: flagship, balanced, and fast-and-cheap. GPT-6 Astra followed in September.

@gl <b>Plugins directory</b> — OpenAI's catalogue of apps Work can connect to; over 1,400 at launch.

@gl <b>Synced apps</b> — The deeper connections to Drive, SharePoint, Slack, Gmail and similar, formerly called connectors.

@gl <b>Codex</b> — OpenAI's coding agent, now the third tab in the ChatGPT app. Guide: WTF is Codex.

@gl <b>ChatGPT Classic</b> — The name given to the previous desktop app after the July rebuild.

@gl <b>Allowance</b> — The pool of usage your plan includes; Work tasks draw it down at rates that depend on complexity.

@spacer 6

@pagebreak

ChatGPT Work is one of four work agents that shipped in 2026. Here are the others.

@spacer 4
