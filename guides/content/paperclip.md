---
slug: 'paperclip'
title: 'WTF is Paperclip'
file: 'wtf-is-paperclip.pdf'
cover_title: 'WTF is'
cover_subtitle: 'Paperclip?'
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  An org chart for AI agents. Roles, reporting lines, budgets and approvals — for a team
  where nobody is human. Open-source, self-hosted, and quietly becoming the way people
  actually run more than one agent at a time.

# store catalogue fields
order: 6
description: 'The open-source app for managing a team of AI agents like a company: org chart, budgets, approvals. What it is, what it is not, and who should run it.'
price: 7
stripe_price_id: 'price_1UGyCQBaLipfLqFs6YQYfl0w'
category: 'platforms'
badge: '🧑‍💼 Agent teams'
featured: false
starter: false
related: ['openclaw', 'polsia']
---
## The one-liner

@body_lead Paperclip is open-source software that lets you run AI agents the way a company runs employees: an org chart with roles and reporting lines, a budget for each agent, tasks that flow down and results that flow up, and a human at the top who approves what matters.

Its own tagline has softened since launch — from "zero-human companies" to "the app people use to manage AI agents for work" — but the idea is the same. Once you have more than one agent, you need a way to manage them. Paperclip is that way.

@spacer 4

## By the numbers — September 2026

@stat 4 March || 2026: public launch. Under three weeks to 30,000 GitHub stars
@stat ~70,000 || GitHub stars by June, among the fastest-growing agent projects ever released
@stat 100+ || contributors; releases roughly every two weeks, the latest on 2 September
@stat 8 || agent types it can hire out of the box: Claude Code, Codex, Gemini CLI, Cursor, Hermes, OpenClaw, Pi, OpenCode
@stat $0 || cost of the software. MIT licence. You pay only for the agents' model usage
@stat ~60 || forkable company templates on ClipMart, Paperclip's marketplace
@stat 0 || disclosed funding rounds. Built by a pseudonymous developer, "dotta," and a community

@spacer 4

## The problem it solves

One agent is easy. You open Claude Code, or OpenClaw, or Cowork, and you talk to it.

Five agents are chaos. Five terminal windows. Five separate memories that do not know what the others have done. Two of them doing the same task. One of them stuck since Tuesday. No idea what any of it is costing. Nobody enforcing quality. This is what most people hit within a week of trying to run a business on agents, and it is why so many "AI-run company" experiments end as a pile of abandoned sessions.

@body_lead Paperclip's answer is to stop treating agents as tools you operate and start treating them as staff you manage.

@spacer 4

## How it works

You install Paperclip on your own machine or server. It runs a local web dashboard. In it, you create a company.

### Hire agents into roles

Each agent gets a job title, a reporting line and a written brief. "Marketing lead, reports to CEO." "Backend engineer, reports to CTO." The CEO can itself be an agent, with you above it as the board.

Paperclip is agent-agnostic. Its own phrase: "If it can receive a heartbeat, it's hired." Claude Code for engineering, Codex or Gemini CLI for other tasks, Hermes for research, OpenClaw for anything that needs a personal agent's tools, all under one org chart, each on whichever model suits the job and the budget.

### Work flows as issues

Tasks are tickets, like a Jira or Linear board. A goal goes in at the top; the CEO agent breaks it into issues and assigns them down the chart. Agents pick up their issues, do the work, comment on the thread, hand off, and close. Parent and child tasks, dependencies and blockers are all tracked, and an agent that is blocked wakes the agent that can unblock it.

### Heartbeats keep it alive

Each agent runs on a schedule, a "heartbeat." Every tick it checks its inbox, does the next thing, and reports. Watchdogs review tasks that have stalled so you do not have to. It runs while you sleep, but on a leash.

### Budgets and approvals

Every agent has a spending cap. Anything sensitive — a payment, a deploy, a public post — can be gated behind human approval, and approvals sit in one queue. Execution policies define what an agent may do without asking. You set the leash length.

### Teams, sandboxes, plugins

Since summer 2026 Paperclip supports multiple human users with their own credentials, a company-wide timeline of what every agent did and when, isolated sandbox environments for agents to work in, a plugin system for adding new agent types, and an MCP server so other tools can drive Paperclip itself.

@spacer 4

## Paperclip vs Polsia vs OpenClaw

These three get confused constantly. They are different layers.

@table keep 34,42,42,42
@tcells hs-row+col
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
|  | Paperclip | Polsia | OpenClaw |
| What it is | Manager for a team of agents | Platform that runs a company for you | A single personal agent |
| Who hosts it | You | Polsia | You |
| Cost | Free + model usage | $20–1,000/mo + fees | Free + model usage |
| Who picks the agents | You, any vendor | Polsia's fixed team | It is the agent |
| Control | Full — code, data, budgets | Limited — their infra, their fees | Full |
| Effort | High: setup and management | Low: subscribe and read reports | Medium |

@spacer 4

Polsia is the managed hotel. Paperclip is the house you build and run. OpenClaw is one very capable employee, who can also be hired into a Paperclip org.

@spacer 4

## ClipMart — fork a company

At launch Paperclip announced ClipMart, a marketplace for AI-agent companies. It has since shipped at clipmart.ai, and the pitch is "fork an AI company, launch in 60 seconds."

Instead of designing an org chart from scratch, you pick a template — a marketing agency, a SaaS startup, an e-commerce store, a media company — and fork it into your own Paperclip. The template comes with the roles, the briefs, the reporting lines and an estimate of how many agents it runs and what they cost. Around sixty templates across marketing, SaaS, e-commerce, agency, media and finance were listed at time of writing, and anyone can submit their own.

Two things worth knowing. Forking a company is not the same as having customers, which is the trap in every "launch in 60 seconds" pitch in this series. And a template is only as good as the briefs inside it; read them before you hire.

@spacer 4

## The reality check

@body_lead Paperclip is the most serious open-source answer to "how do I run more than one agent," and it is not a product for people who want a button.

### What is genuinely good

- → The org-chart model works. People who use it describe the mental shift from "prompting an AI" to "managing a team," and that shift is the point.
- → Agent-agnostic for real. Mix Claude, OpenAI, Google and open models by role and cost.
- → Governance is built in, not bolted on: budgets, approvals, execution policies, audit timeline.
- → It builds itself. The creator runs Paperclip's own development through a Paperclip company, and the release cadence backs that up.
- → No lock-in, no account, no vendor. Your data and code stay on your machine.
@spacer 3

### What is not

- → Self-hosted means you host it. A server, PostgreSQL, Node.js, and you doing the updates. A hosted cloud version has been on the roadmap all year and had not launched at time of writing.
- → The agents are only as good as their briefs. Paperclip organises work; it does not make an agent competent at it.
- → No disclosed team, funding or company behind it beyond a pseudonym and a community. That is how great open-source projects start and also how some stall.
- → It is a control plane, not a business. Nothing about Paperclip finds customers. See the Polsia guide for how that usually goes.
@spacer 3

@spacer 4

## Who Paperclip is for

@fit <b>Yes</b> — Founders and operators already running two or more agents who are losing track. Developers comfortable with a terminal and a server. Anyone who wants to own the whole stack rather than rent it.

@fit <b>Not yet</b> — Anyone who has not run a single agent successfully. Start with OpenClaw or Cowork, get one thing working, then come back.

@fit <b>No</b> — Anyone who wants "AI runs my business" as a subscription with no setup. That is Polsia, with all the trade-offs in that guide.

@spacer 4

## Glossary

@gl <b>Paperclip</b> — Open-source, self-hosted software for managing AI agents as an org chart with roles, budgets and approvals. Launched March 2026.

@gl <b>Orchestration</b> — Coordinating multiple agents so they work together without duplication or chaos. What Paperclip does.

@gl <b>Control plane</b> — The layer that manages and governs agents, as opposed to the agents themselves. Paperclip's own description of its role.

@gl <b>Heartbeat</b> — The scheduled tick on which an agent checks for work and acts. Any agent that can receive one can be hired into Paperclip.

@gl <b>Adapter</b> — The connector that lets a particular agent type (Claude Code, Codex, OpenClaw…) work inside Paperclip.

@gl <b>Issue</b> — A unit of work on the board: assigned, threaded, tracked, closed. Paperclip's equivalent of a task or ticket.

@gl <b>Execution policy</b> — The rules for what an agent may do without human approval.

@gl <b>Watchdog</b> — An automated check that reviews stalled tasks and wakes or escalates them.

@gl <b>ClipMart</b> — Paperclip's marketplace of forkable AI-company templates at clipmart.ai. Pick a template, launch it into your own Paperclip.

@gl <b>MIT licence</b> — A permissive open-source licence. Free to use, modify and sell, with attribution.

@gl <b>Self-hosted</b> — Software you install and run on your own machine or server, rather than a service someone else runs for you.

@spacer 6

@pagebreak

## Liked this? Go deeper.

Paperclip manages agents. Here are the agents, and the alternatives.

@spacer 4
