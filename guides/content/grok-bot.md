---
slug: 'grok-bot'
title: 'WTF is Grok Bot'
file: 'wtf-is-grok-bot.pdf'
cover_title: 'WTF is'
cover_subtitle: 'Grok Bot?'
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  A team of named AI teammates that sign into your real apps, work on their own cloud
  computer around the clock, and report to a Chief of Staff bot. From the company that
  now owns SpaceX, xAI and Cursor. What it is, what it costs, and the catch.

# store catalogue fields
order: 15
description: 'Elon Musk''s work agent: a team of bots with their own cloud computer and your real logins, coordinated by a Chief of Staff. What it does, costs and risks.'
price: 7
stripe_price_id: 'price_1UGyCZBaLipfLqFsj6hkAD68'
category: 'work'
badge: '🆕 New'
featured: false
starter: false
related: ['cowork', 'openclaw']
---
## The one-liner

@body_lead Grok Bot is a set of always-on AI teammates. You give each one a name, a role and access to your tools; it signs in with your real logins, works on a cloud computer that keeps running after you close your laptop, and comes back with finished work — or with a question when it needs your sign-off.

The pitch line is "AI teammates you can give real work to." The distinctive move is the team: a researcher bot, a writer bot, an inbox bot, and a Chief of Staff bot that coordinates them so you do not have to.

@spacer 4

## By the numbers — September 2026

@stat 11 Aug || 2026: early beta launch, macOS, Windows and iPhone. No Linux client, no Android yet
@stat 1 || cloud computer per account, shared by all your bots — files, browser sessions and logins pooled
@stat $20–300 || per month: bundled with Cursor plans from Pro upward and with SuperGrok Heavy at the top. No standalone price, no free tier
@stat $60B || what SpaceX paid for Cursor in June, after absorbing xAI in February. Grok Bot is the first joint product
@stat 10–20 || bots one SpaceXAI engineer runs under a single Chief of Staff, automating what she says is 90% of her routine
@stat 0 || model picker. Tasks are routed to models automatically; you cannot choose or pin one

@spacer 4

## How it works

### Bots, not chats

You create a bot, give it a name and a job — "Researcher," "Inbox," "Ops" — and tell it what it may sign into. From then on you message it like a colleague, in a thread or a group chat with other bots.

### Real logins, not integrations

This is the big design choice. Most work agents connect to your tools through official APIs and connectors. Grok Bot signs in to the app the way you would, with your credentials, and uses it the way you would. If a tool has a login screen, a bot can use it, including the internal systems and legacy tools no connector exists for.

### One computer in the cloud

All your bots share a persistent virtual machine on SpaceXAI's servers: a file system, a terminal, a browser, exactly as you left it. The work happens there, not on your device, which is why it continues while your laptop is shut. Launch coverage often said each bot gets its own computer; SpaceXAI's own documentation says they share one, and that separate bots should not be treated as a security boundary.

### The Chief of Staff

Put one bot above the others and tell it to coordinate. Internally SpaceXAI runs a Chief of Staff over specialists for recruiting, expenses, operations and bug fixes. Early testers who expected this to fall over found it worked out of the box: hand a project to the coordinator and it delegates, collects and reports.

### Teach a task once

Record yourself doing a workflow on screen. Grok Bot turns the recording into a reusable skill it can run on its own, no code, no integration. Skills and scheduled routines round it out, as in Cowork.

@spacer 4

## What it costs

There is no Grok Bot subscription. Access comes bundled with plans you buy for something else:

@table keep 44,32,84
@tcells hs-row
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 0,1 -1,-1 [DARK_BG,ZINC_900]
| Plan | Price | Notes |
| Cursor Pro | $20/mo | Entry point since late August; a weekly usage allowance |
| Cursor Pro+ / Ultra | $60 / $200/mo | Higher limits |
| Cursor Teams Premium | $120/seat/mo | Central billing, analytics, single sign-on |
| SuperGrok Heavy | ~$300/mo | Through the Grok app; the original launch tier |

@spacer 3

Usage is metered in agent steps and tokens on top of the allowance, and SpaceXAI has not published what drives consumption. A routine that polls every fifteen minutes runs ninety-six times a day. Watch the meter in week one.

@spacer 4

## Grok Bot vs Cowork vs OpenClaw

@table keep 34,42,42,42
@tcells hs-row+col
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
|  | Grok Bot | Cowork | OpenClaw |
| Shape | A team of named bots | One agent, many tasks | One agent you configure |
| Reaches your apps via | Your real logins | Connectors + its own browser | Whatever you wire up |
| Runs on | SpaceXAI's cloud | Your desktop or Claude's cloud | Your machine |
| Model | Auto-routed, no choice | Claude, your pick of tier | Any, your choice |
| Cost | Bundled, $20–300 | $20 Claude plan | Free + model usage |
| Best for | Delegating a whole function | Files, documents, analysis | Owning the whole thing |

@spacer 4

The comparison people keep making: "like OpenClaw, but easy, reliable and less scary." That is the product in one line, with the caveats below.

@spacer 4

## The catches

- → <b>Your logins are the integration.</b> Bots hold your real credentials and act in your accounts. That is the reach and the risk in one sentence. SpaceXAI documents an approval model for consequential actions; it has not published data-retention terms, and the audit view was promised rather than shipped at launch.
- → <b>One computer, no walls.</b> Because all bots share one machine, a bot tricked by a malicious page has the same access as every other bot. Do not give a low-trust bot high-trust logins.
- → <b>You do not pick the model.</b> Tasks route automatically, billing follows whichever model served the request, and SpaceXAI has said it does not plan to add a picker. Early testers found the router uneven.
- → <b>Bundled pricing hides the bill.</b> No standalone plan, no free tier, and usage on top of the allowance. The cheap $20 entry is a Cursor plan, which makes sense if you code and less if you do not.
- → <b>It is a beta from a company mid-merger.</b> SpaceX absorbed xAI in February and Cursor in June; Cursor loses OpenAI's models in November. Expect the product and the pricing to move.
@spacer 3

@spacer 4

## Who it is for

@fit <b>Yes</b> — Operators with repetitive, multi-step digital chores across several apps — inbox triage, expenses, CRM updates, bookings, returns — who are already on Cursor or Grok and want to delegate a function, not a task.

@fit <b>Not yet</b> — Anyone whose work is regulated or high-stakes and cannot be supervised step by step, or who needs to know which model is touching their data.

@fit <b>No</b> — Anyone who wants an agent they own and control. That is OpenClaw or Paperclip.

@spacer 4

## Why it matters

Grok Bot is the fourth "team of agents does your job" product to ship in 2026 and the one that leans hardest into the office metaphor: named colleagues, a boss bot, a shared computer, group chats. It is also the first product of a company that now owns a rocket manufacturer, a frontier lab and the most popular AI code editor, with a stated plan to consolidate the stack.

Whether it is the best work agent is a question for a year from now. Whether it is the most ambitious consumer bet on agents as staff is already answered.

@spacer 4

## Glossary

@gl <b>Grok Bot</b> — SpaceXAI's work agent: named, persistent bots that sign into your apps and work on a shared cloud computer. Beta since August 2026.

@gl <b>SpaceXAI</b> — The entity that emerged from SpaceX absorbing xAI in February 2026 and Cursor in June. Builder of Grok and Grok Bot.

@gl <b>Chief of Staff bot</b> — A bot placed above other bots to delegate, coordinate and report. Grok Bot's orchestration layer.

@gl <b>Credential-holding agent</b> — An agent that signs in with your real logins rather than through sandboxed APIs. Grok Bot's core design.

@gl <b>Cloud computer</b> — The persistent virtual machine, with browser, files and terminal, that all your bots share.

@gl <b>Teach-a-task</b> — Record a workflow once on screen; the bot turns it into a reusable skill.

@gl <b>Routine</b> — A scheduled, recurring task a bot runs without being asked.

@gl <b>Cursor</b> — The AI code editor, bought by SpaceX for $60 billion, through which most Grok Bot subscriptions are sold.

@spacer 6

@pagebreak

## Liked this? Go deeper.

Grok Bot is one of four work agents that shipped this year. Here are the others, and the model behind it.

@spacer 4
