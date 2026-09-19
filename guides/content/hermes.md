---
slug: 'hermes'
title: 'WTF is Hermes Agent'
file: 'wtf-is-hermes-agent.pdf'
cover_title: 'WTF is'
cover_subtitle: 'Hermes Agent?'
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  The open-source agent that gets better the longer it runs: it writes its own skills,
  keeps its own memory, and builds a model of you across sessions. From a research lab,
  on a $5 server, and the closest thing OpenClaw has to a rival. What it is and who should run it.

# store catalogue fields
order: 30
description: 'Nous Research''s self-improving open-source agent. The learning loop, the memory, what it costs to run, and how it compares with OpenClaw and Muse.'
price: 7
stripe_price_id: 'price_1UHQQRBaLipfLqFstWQHJmcf'
category: 'personal'
badge: null
featured: false
starter: false
related: ['openclaw', 'meta-muse']
hook: "The agent that *writes its own skills.*"
best_for: "Best for: owning your agent"
capability: "vs OpenClaw, honestly"
---
## The one-liner

@body_lead Hermes Agent is an open-source personal agent from Nous Research, a lab better known for training open models. It runs on your own server, talks to you over Telegram, WhatsApp, Slack, Discord or Signal, and, unlike every other agent in this series, it learns: after a hard task it writes a reusable skill, improves that skill when it uses it again, and keeps a deepening memory of who you are.

It launched on 25 February 2026 and became the fastest-growing agent project of the year. OpenClaw has the users; Hermes has the architecture people now measure agents against.

@spacer 4

## By the numbers — September 2026

@stat 25 Feb || 2026: released under the MIT licence. 95,000 GitHub stars in seven weeks; 247,000 by September
@stat 118+ || bundled skills at v0.10, plus the ones the agent writes for itself
@stat 40% || faster on repeated research tasks once an agent has 20 or more self-made skills, per independent benchmarks
@stat 6+ || messaging channels from one gateway: Telegram, WhatsApp, Slack, Discord, Signal, and the terminal
@stat $0 || for the software; a $5–10 monthly server if you want it always on, plus whatever your model provider charges
@stat $20 || per month for Nous Portal Plus: $22 of credits, 300+ models and the tool gateway. Super is $100, Ultra $200
@stat 4 Critical || and nine High-severity findings in the default configuration, in an independent audit published 11 April 2026; CVEs have followed

@spacer 4

## What makes it different — the learning loop

Every other agent starts each session from scratch, plus whatever notes you configured. Hermes closes a loop.

- → <b>Skills from experience.</b> After a complex task, the agent writes down how it did it as a reusable skill. Next time, it uses the skill instead of working it out again.
- → <b>Skills that improve.</b> Using a skill and hitting a snag updates the skill. They get sharper with use.
- → <b>Three layers of memory.</b> A curated long-term memory the agent maintains itself, searchable session history, and a model of you (preferences, context, how you like things done) that deepens over time.
- → <b>Nudges to persist.</b> It periodically prompts itself to save what matters, so knowledge does not evaporate at the end of a session.
@spacer 3

@body_lead The practical effect is the one nobody else offers: an agent that is measurably better in month three than in week one, without you retraining anything.

@spacer 4

## What it actually does

@cap <b>Everything a personal agent does</b> — Research, drafts, summaries, browsing (full browser automation: navigate, click, type, screenshot), code execution in a sandbox, file handling, image generation, text-to-speech, vision.

@cap <b>Scheduled work</b> — A built-in scheduler in natural language: daily reports, nightly backups, weekly audits, a morning briefing, delivered to whichever channel you like, unattended.

@cap <b>Sub-agents</b> — Spawns isolated agents for parallel workstreams, each with its own conversation and terminal. Hireable into Paperclip out of the box.

@cap <b>Any model</b> — Nous's own Hermes models, Claude, GPT, Gemini, open models via OpenRouter, or a local model on your own hardware. Switch with one command; no code changes.

@cap <b>Runs anywhere</b> — Linux, macOS, Windows, Android via Termux, a $5 VPS, a GPU box, serverless. A desktop app arrived in 2026 for people who want a window rather than a terminal.

@cap <b>Nous Portal</b> — Optional. One login for a model plus the tool gateway (search, images, speech, browser), from $20 a month; Portal Cloud offers one-click hosted instances billed hourly.

@spacer 4

## Hermes vs OpenClaw vs Muse

@table keep 34,42,42,42
@tcells hs-row+col
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
|  | Hermes | OpenClaw | Meta Muse |
| Who makes it | Nous Research, a lab | A foundation, ex-Steinberger | Meta |
| Learns over time | Yes — the point | Memory, not a learning loop | Meta's memory, Meta's terms |
| Users | 247,000 stars; a developer crowd | 3M+ active, mainstream | Consumer scale |
| Skills | 118 bundled + self-written | Large community marketplace | None; fixed features |
| Setup | Real, technical | Real, getting easier | None |
| Cost | Free + model; $20 Portal optional | Free + model | Free tier, $20, $100 |
| Data | Yours | Yours | Meta's |

@spacer 4

The honest split: OpenClaw is the popular one with the biggest ecosystem and the native mobile apps. Hermes is the better-architected one — the memory and learning design is genuinely ahead of the field — and developers have been migrating to it since spring. Its security record is not part of the pitch; see the catches. Muse is for people who want none of the setup and accept Meta holding the keys.

@spacer 4

## What it costs to run

The software is free. The bill is the model and the server.

@table keep 44,36,80
@tcells hs-row
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 0,1 -1,-1 [DARK_BG,ZINC_900]
| Route | Roughly | Notes |
| Laptop only | Model API costs | Runs when the laptop does |
| $5–10 VPS, always on | $5–10 + model | The normal setup; a cheap open model keeps tasks at cents each |
| Nous Portal Plus | $20/mo | Includes $22 of credits; 300+ models and the tool gateway |
| Portal Cloud | Hourly from credits | Hosted instance, no server to run |
| Frontier model heavy use | $30–100+/mo | Claude or GPT on every task adds up; route routine work to a cheap model |

@spacer 3

A complex task on a budget model costs around thirty cents; on a frontier model a few dollars. The learning loop cuts repeated tasks over time, which is a real cost lever nobody else has.

@spacer 4

## The catches

- → <b>You run it.</b> A server, updates, a model key, and the first hour of setup. The desktop app and Portal Cloud soften this; they do not remove it.
- → <b>Version 0.x.</b> Releases every two weeks with real changes. Pin a version and read the notes before upgrading; the pace that makes it good makes it move.
- → <b>Security is the weak point, not the strength.</b> The April 2026 audit found four Critical and nine High-severity issues in the default configuration, including unrestricted shell execution and persistent skill injection. CVEs have kept coming since, one of them a remote-code-execution flaw with a published proof of concept. Run it in Docker, turn off any auto-approval bypass, restrict what it can write to, keep it patched — and review the skills it wrote itself before letting them send or spend.
- → <b>Enterprise features are arriving, not arrived.</b> Team agents, access controls and audit logging are on the roadmap; for a company deployment, wait or add your own.
- → <b>Star counts are not users.</b> The growth numbers are developer enthusiasm, which is real, and not the same as three million people using it daily. OpenClaw still has the crowd.
@spacer 3

@spacer 4

## Who it is for

@fit <b>Yes</b> — Anyone comfortable with a terminal who wants to own their agent, keep their data, and have it improve with use. The best choice in this series for a technical solo operator.

@fit <b>Not yet</b> — Anyone who wants mobile-first, zero-setup, or a marketplace of thousands of community skills (OpenClaw), or no setup at all (Muse).

@fit <b>No</b> — Anyone who wants an agent to run a business for them rather than to be their assistant.

@spacer 4

## Why it matters

Hermes is the first widely used agent built on the premise that an assistant should get better the longer you have it. Every other agent in this series is as good on day one as it will ever be until its maker ships an update. If the learning loop becomes standard, and its adoption curve says it will, the agents people keep will be the ones that have learned them, and switching will cost more than a subscription. That is a new kind of lock-in, and for once it favours the software you own.

@spacer 4

## Glossary

@gl <b>Hermes Agent</b> — Open-source, self-improving personal agent from Nous Research, released February 2026 under MIT.

@gl <b>Nous Research</b> — The AI lab behind Hermes; known for open models, reportedly in talks at a $1.5B valuation.

@gl <b>Learning loop</b> — The mechanism by which the agent writes skills from experience, improves them in use, and persists memory.

@gl <b>Skill</b> — A reusable, written-down procedure the agent follows. Bundled, community, or self-created. Compatible with the agentskills.io standard.

@gl <b>Three-layer memory</b> — Curated long-term notes, searchable session history, and a model of the user.

@gl <b>Gateway</b> — The single process that connects the agent to Telegram, WhatsApp, Slack, Discord, Signal and the CLI.

@gl <b>Nous Portal</b> — The optional paid backbone: model access and a tool gateway from $20/month; Portal Cloud hosts instances.

@gl <b>Sub-agent</b> — An isolated child agent spawned for a parallel task.

@gl <b>VPS</b> — A cheap virtual server, the usual home for an always-on agent.

@spacer 6

@pagebreak

## Liked this? Go deeper.

Hermes is the agent that learns. Here are the ones it competes with, and the org chart it can join.

@spacer 4
