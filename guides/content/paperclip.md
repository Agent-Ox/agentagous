---
slug: 'paperclip'
title: 'WTF is Paperclip'
file: 'wtf-is-paperclip.pdf'
cover_title: 'WTF is'
cover_subtitle: 'Paperclip?'
cover_meta: 'WTF Agents · wtfagents.com · March 2026'
subtitle: >-
  If OpenClaw is a single AI employee and Polsia is a managed company service, Paperclip
  is the org chart. The open-source framework for running entire companies with teams of
  AI agents — each with a role, a set of tools, and a goal.

# store catalogue fields
order: 6
description: 'Org charts for AI agents. Teams of agents, not one.'
price: 7
category: 'platforms'
badge: null
featured: false
relatedTool: 'paperclip'
related: ['openclaw', 'claude']
starter: false
---
## The one-liner

@body_lead Paperclip is an open-source orchestration framework that lets you build a multi-agent "company org chart" — assigning roles, workflows, and goals across multiple AI agents that coordinate together to run a business.

Tagline: "Any agent, any runtime, one org chart."

It is not a managed service like Polsia. It is not a single personal agent like OpenClaw. It is infrastructure — the coordination layer that sits above individual agents and makes them work as a team.

@spacer 4

## The key insight — agents need coordination

Running a company — even a small one — requires multiple types of work happening simultaneously. A developer building the product. A marketer generating leads. A support agent handling customers. A finance agent tracking revenue.

A single AI agent can do any one of these things. But coordinating all of them — making sure the developer knows what the marketer is promising, that the support agent knows what the product can do, that the finance agent tracks what the sales agent closes — requires something more than a single agent.

@body_lead That is what Paperclip does. It gives each agent a role, connects them, and coordinates their work toward a shared goal.

@spacer 4

## How it works

Paperclip is built on Node.js with a React UI. You self-host it — it runs on your own machine or server.

### The org chart model

You define your company as an org chart. Each node in the chart is an agent with:

- → A role (CEO, Marketing Lead, Developer, Support Agent)
- → A set of tools (web browser, code editor, email, database access)
- → A goal (grow revenue, ship features, resolve tickets)
- → Reporting lines (which agents it coordinates with)
@spacer 3

### The runtime

Paperclip is "runtime agnostic" — it does not care which AI agents or tools you use. You can plug in Claude Code for development, OpenClaw for communications, Cursor for code editing, and any other MCP-compatible tool. The framework coordinates them regardless of origin.

### Supported agents and tools

From the Paperclip GitHub release notes:

- → Claude Code (Anthropic)
- → OpenClaw
- → Cursor (AI code editor)
- → OpenCode
- → Codex (OpenAI)
- → Pi (Inflection AI)
@spacer 4

## ClipMart — the killer feature coming soon

@body_lead The most anticipated feature in Paperclip is ClipMart — a marketplace listed as "COMING SOON" on the GitHub repository as of March 2026.

The description from the GitHub README:

@quote "Download and run entire companies with one click. Browse pre-built company templates — full org structures, agent configs, and skills — and import them into your Paperclip instance in seconds."

If ClipMart delivers on this promise, it means you will be able to download a pre-built "roofing company" or "content agency" or "SaaS analytics tool" — complete with the full agent org chart, configured tools, and pre-written workflows — and be running it within minutes.

This would make Paperclip the most powerful self-hosted alternative to Polsia — with the added advantage of owning everything yourself and paying no revenue share.

@spacer 4

## The GitHub story

@body_lead Paperclip accumulated 13,500 GitHub stars within days of its open-source launch — a remarkable velocity that signals significant developer interest.

The founder of Paperclip has not been publicly identified in available press as of March 2026. The project is listed under the "paperclipai" GitHub organisation. This anonymity is unusual for a project of this scale — but not unprecedented in the open-source world.

Active releases are available on GitHub at github.com/paperclipai/paperclip. The community is growing. The codebase is being actively maintained.

@spacer 4

## Paperclip vs OpenClaw vs Polsia

@table 33,47,42,45
@tcells raw
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,0 0,-1 ZINC_800
@tstyle TEXTCOLOR 0,0 -1,0 ORANGE
@tstyle TEXTCOLOR 0,0 0,-1 ORANGE
@tstyle FONTNAME 0,0 -1,0 Helvetica-Bold
@tstyle FONTNAME 0,0 0,-1 Helvetica-Bold
@tstyle TEXTCOLOR 1,1 -1,-1 ZINC_300
@tstyle FONTNAME 1,1 -1,-1 Helvetica
@tstyle FONTSIZE 0,0 -1,-1 8.5
@tstyle LEADING 0,0 -1,-1 13
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 5
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 0,1 -1,-1 [DARK_BG,ZINC_900]
|  | Paperclip | OpenClaw | Polsia |
| What it is | Multi-agent orchestration framework | Personal AI agent | Managed company platform |
| Runs where | Your servers (self-hosted) | Your machine | Polsia's servers |
| Cost | Free (open source) | Free (+ LLM costs) | $50/mo + 20% revenue |
| Number of agents | Many (org chart) | One | Many (managed) |
| Technical level | High (developer) | Medium (CLI) | Low (no-code) |
| Best for | Building multi-agent companies | Personal automation | Quick company launch |
| Open source | Yes | Yes (MIT) | No |

@spacer 4

## Who is Paperclip for?

### Developers building AI-native companies

If you are technical and want to build something real — not a demo, not a prototype — Paperclip gives you the infrastructure to coordinate multiple agents at production scale. You own everything. You pay no revenue share. You have full control.

### Founders who want to move fast

Once ClipMart launches, Paperclip becomes accessible to non-developers — download a company template, configure it, run it. The technical barrier drops significantly.

### Enterprises building custom agent workflows

Paperclip's "any agent, any runtime" philosophy makes it attractive for enterprises that want to build on their existing tools — connecting existing Claude Code deployments, OpenClaw agents, and custom tools into a coordinated system.

### Not for:

Complete beginners who want a no-code solution right now. For that, Polsia is the better starting point.

@spacer 4

## The bigger picture — orchestration is the next battleground

@body_lead As AI agents become more capable, the question shifts from "can an agent do this task?" to "how do you coordinate many agents doing many tasks?"

Paperclip is not alone in this space. CrewAI and LangGraph are the dominant open-source orchestration frameworks in the broader developer community. Google's Agent Development Kit (ADK) is the enterprise entry. Salesforce Agentforce is the CRM-native approach.

What makes Paperclip interesting is its focus on the specific use case of running companies — not just workflows. The org chart metaphor is intuitive, ClipMart has genuine viral potential, and the open-source community is active.

Watch this space. Paperclip launched in March 2026 with 13,500 GitHub stars in days. By the time you read this, the numbers will be higher.

@spacer 4

## Glossary

@gl <b>Paperclip</b> — Open-source multi-agent orchestration framework. Build and run companies with teams of AI agents. Self-hosted.

@gl <b>Orchestration</b> — The coordination of multiple AI agents working together — assigning roles, managing communication, directing toward shared goals.

@gl <b>ClipMart</b> — Paperclip's upcoming marketplace for pre-built company templates. Download and run an entire AI company with one click.

@gl <b>Org chart model</b> — Paperclip's approach: each agent is a node in a company org chart with a defined role, tools, and reporting lines.

@gl <b>Runtime agnostic</b> — Paperclip works with any AI agent or tool — it does not require a specific LLM or agent platform.

@gl <b>Self-hosted</b> — Software you run on your own servers, as opposed to a managed service run by the provider.

@gl <b>CrewAI</b> — A competing open-source multi-agent orchestration framework, widely used in the developer community.

@gl <b>LangGraph</b> — The advanced version of LangChain for building stateful, multi-agent workflows. A major competitor to Paperclip.

@gl <b>Node.js</b> — The JavaScript runtime that Paperclip's server is built on.

@gl <b>MCP-compatible</b> — Supports the Model Context Protocol — Anthropic's open standard for connecting agents to tools and data.

@spacer 6

@pagebreak

## Liked this? Go deeper.

Paperclip is one piece. Here is the full picture.

@spacer 4
