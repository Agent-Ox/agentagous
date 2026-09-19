---
slug: 'zapier'
title: 'WTF is Zapier'
file: 'wtf-is-zapier.pdf'
cover_title: 'WTF is'
cover_subtitle: 'Zapier?'
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  The automation tool that connects nine thousand apps without code, built profitably on
  $1.3 million of funding, now selling agents and the plug behind them. What it does, what
  a task costs, why the bill creeps, and when to move to n8n.

# store catalogue fields
order: 34
description: 'The automation platform most small businesses start with. Zaps, tasks, the new Agents product and MCP, what it costs at volume, and when to leave.'
price: 7
stripe_price_id: 'price_1UHR60BaLipfLqFsddRHLsG3'
category: 'work'
badge: null
featured: false
starter: false
related: ['n8n', 'hire-agent']
hook: "Nine thousand apps, no code. *Watch the task count.*"
best_for: "Best for: non-technical teams"
capability: "Tasks, Agents, MCP"
---
## The one-liner

@body_lead Zapier connects apps to each other without code: when something happens in one (a form is filled, an email arrives, a payment lands), it does something in another (adds a row, sends a message, creates a task). Each connection is a Zap; each step that moves data is a task; you pay for tasks.

It is where most small businesses do their first automation, because it connects to more things than anything else and asks nothing of you but a browser. In 2026 it also sells agents, and the plug that lets other agents use its nine thousand integrations.

@spacer 4

## By the numbers — September 2026

@stat 9,000+ || apps connected, with 30,000-plus actions available to agents through MCP — the moat nobody has matched
@stat $420M || annualised revenue reported for Q1 2026; the company itself last published $310M two years ago
@stat $1.3M || total venture funding ever raised, in 2012. Profitable since 2014. Valued at $5B in a 2021 secondary
@stat 3.4M+ || businesses on the platform; about 69% of the Fortune 1000 use it somewhere
@stat 81B+ || tasks automated to date; 500M+ AI tasks by June 2026
@stat $0 / $29.99 / $69 || Free (100 tasks), Professional (750), Team (2,000) — Team is the whole plan, not a seat; Enterprise custom
@stat 400 / 1,500 || activities a month on Zapier Agents free and paid ($400 a year) — the standalone agent product

@spacer 4

## What it actually does

@cap <b>Zaps</b> — Trigger, then steps. "When a Typeform is submitted, add the lead to HubSpot, send a Slack message, and create a Google Sheets row." Built by clicking, in minutes.

@cap <b>Tasks</b> — The billing unit: every step that moves data counts. Triggers, filters and built-in formatting are free; a five-step Zap that fires a hundred times a month is roughly 400 tasks.

@cap <b>AI steps inside Zaps</b> — Classify, extract, summarise, generate, as ordinary steps that consume ordinary tasks. Call Claude or GPT mid-workflow without a separate bill.

@cap <b>Zapier Agents</b> — The standalone agent product: give it a goal and access to your apps, and it decides the steps. Billed in activities, not tasks: 400 free, 1,500 for $400 a year. An activity is not a run — one is counted each time the agent uses a tool, searches the web or queries a knowledge source, so a single run can spend several.

@cap <b>Tables, Interfaces, Canvas</b> — A database, simple forms and pages, and a whiteboard for mapping workflows, so the whole small-business stack can live in Zapier.

@cap <b>MCP server, SDK, CLI</b> — Since 2026: any agent that speaks MCP (Claude, ChatGPT, OpenClaw, Cowork) can use Zapier's integrations as tools. This is the strategic move: Zapier as the hands for everyone else's agent.

@cap <b>Enterprise</b> — SOC 2, SSO, admin controls, AWS Marketplace, and contracts that run into six figures for large deployments.

@spacer 4

## What it costs — and why the bill creeps

@table keep 34,38,88
@tcells hs-row
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 0,1 -1,-1 [DARK_BG,ZINC_900]
| Plan | Price | Includes |
| Free | $0 | 100 tasks, two-step Zaps only |
| Professional | from $29.99/mo ($19.99 annual) | 750 tasks, multi-step Zaps, AI steps; tiers run to two million tasks and $3,389 a month |
| Team | from $69/mo annual, $103.50 monthly | 2,000 tasks for the whole plan, not per seat; shared workspace, admin, up to 25 users |
| Enterprise | Custom | Governance, SSO, volume; typically five to six figures a year |
| Zapier Agents | $0 or $400/yr | 400 or 1,500 activities a month; no Zaps plan required |

@spacer 3

Nobody decides to overpay Zapier; it creeps. A business starts at $20 a month, delighted. It adds a Zap for abandoned carts, one for supplier emails, one for order sync, one for review requests. Eighteen months later the bill is several hundred a month, because every step of every Zap counts every time it runs. Above roughly a thousand multi-step runs a month, execution-priced n8n costs a fraction; below it, Zapier's ease is worth the difference.

@body_lead The rule: count steps times runs before you build, and audit the task report quarterly.

@spacer 4

## Zapier vs n8n vs Make

@table keep 34,42,42,42
@tcells hs-row+col
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
|  | Zapier | n8n | Make |
| Billing unit | Task (each step) | Execution (whole run) | Operation (each step, cheaper) |
| Integrations | 9,000+ | 500+ native, any API | 2,000+ |
| Setup | Minutes, no code | A week, some code | An hour |
| Self-host | No | Yes | No |
| Agents | Zapier Agents (activities) | Agent node, local models | AI Agents |
| Best for | Getting started, breadth, non-technical teams | Volume, control, privacy | Visual complexity on a budget |

@spacer 4

Zapier is the on-ramp and, for most non-technical businesses, the destination. It is the one on this list that a person with no engineering appetite will still be running in three years.

@spacer 4

## The catches

- → <b>Task creep.</b> The cost of a Zap is invisible until the invoice. Multi-step Zaps at volume are the expensive case; know your count.
- → <b>Two things called "agent."</b> AI steps inside Zaps bill as tasks; the Zapier Agents product bills activities on its own cap, with no overage rate. Blog posts quoting a $3 or $20 agent price describe a model that no longer exists.
- → <b>Agents are non-deterministic.</b> Zapier's own FAQ says the same input does not guarantee the same output, and Agents does not yet honour Enterprise app restrictions. Fine for judgement tasks; not for anything auditable.
- → <b>Revenue is a forecast.</b> Zapier has not published a number since $310M. The $420M is from a secondary-sale pitch. Solid company either way; treat precise figures with care.
- → <b>Being the hands has a price.</b> If every agent uses Zapier's integrations through MCP, Zapier becomes infrastructure, which is a good business and a less visible one. Watch whether the consumer product keeps its attention.
@spacer 3

@spacer 4

## Who it is for

@fit <b>Yes</b> — Any small business or operator wiring apps together for the first time, and anyone whose team is non-technical. Professional at $29.99 covers most shops for a long time.

@fit <b>Not yet</b> — Anyone past a few hundred dollars a month or with data that must stay in-house. That is the n8n conversation.

@fit <b>No</b> — Anyone who wants an agent to run the business (Polsia, NanoCorp) rather than to connect its parts.

@spacer 4

## Why it matters

Zapier built the biggest integration catalogue in software on $1.3 million and never raised again, which is the least fashionable and most durable story in this series. Its 2026 bet is the interesting one: if agents are going to act in the world, someone has to own the nine thousand connections they act through, and Zapier has spent fourteen years building them. n8n is now valued higher on an eighth of the revenue, which says where investors think automation is going. Zapier is where most of it still happens.

@spacer 4

## Glossary

@gl <b>Zapier</b> — No-code automation platform connecting 9,000+ apps. San Francisco, founded 2011. Profitable, bootstrapped, ~$5B valuation.

@gl <b>Zap</b> — An automated workflow: a trigger and one or more steps.

@gl <b>Task</b> — Zapier's billing unit: one per action step that moves data, per run.

@gl <b>Activity</b> — The billing unit for Zapier Agents: one each time the agent uses a tool, searches the web or queries a knowledge source. A run can spend several.

@gl <b>Zapier Agents</b> — The standalone agent product; goal in, steps decided by the agent. Free or $400 a year.

@gl <b>AI steps</b> — Classify, extract, summarise, generate inside a Zap; billed as tasks.

@gl <b>Tables / Interfaces / Canvas</b> — Zapier's database, forms and whiteboard products.

@gl <b>MCP server</b> — Zapier's 2026 plug letting outside agents use its integrations as tools.

@gl <b>n8n / Make</b> — The two main alternatives: open-source execution-priced, and visual operation-priced.

@spacer 6

@pagebreak

## Liked this? Go deeper.

Zapier is where automation starts. Here is where it goes next.

@spacer 4
