---
slug: 'n8n'
title: 'WTF is n8n'
file: 'wtf-is-n8n.pdf'
cover_title: 'WTF is'
cover_subtitle: 'n8n?'
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  The open-source automation layer solo builders wire their agents with: one workflow, one
  execution, any number of steps, on a $5 server if you want. What it does, why it beats
  Zapier at volume, when it doesn't, and what a $5.2 billion valuation says about it.

# store catalogue fields
order: 29
description: 'The open-source automation platform under thousands of agent stacks. Executions vs tasks, self-hosting, the AI Agent node, and when Zapier is the right call.'
price: 7
stripe_price_id: 'price_1UHQFfBaLipfLqFsFFNuxNMT'
category: 'work'
badge: null
featured: false
starter: false
related: ['hire-agent', 'mcp']
hook: "Zapier's rival, open-source, *on a $5 server.*"
best_for: "Best for: wiring agents together"
capability: "Executions vs tasks"
---
## The one-liner

@body_lead n8n is a workflow automation platform: a visual canvas where a trigger (a form submitted, an email received, a schedule) flows through steps (call an AI model, look up a record, send a message, update a sheet) to an outcome, without code — or with as much code as you like. It is open-source, runs on your own server if you want, and has become the plumbing under a large share of the indie agent stacks in this series.

Its billing model is the whole argument: one execution is one complete run of a workflow, however many steps. Zapier bills every step.

@spacer 4

## By the numbers — September 2026

@stat $5.2B || valuation after SAP's strategic investment, announced 12 May 2026 — double the $2.5B of the October 2025 Series C
@stat 1.7M || monthly active builders, and more than 1,400 enterprise customers, per the company
@stat 1 || execution billed per workflow run, whatever its length — versus one task per step at Zapier
@stat €20 / €50 || per month for Starter (2,500 executions) and Pro (10,000), billed annually — workflows, steps and users are unlimited on every plan
@stat $0 || for the self-hosted Community Edition: no execution, workflow or user limits; you pay for the server
@stat 500+ || native integrations, plus an HTTP node that reaches any API — versus 8,000-plus at Zapier
@stat 2.0 || the January 2026 release that made agents first-class: an Agent node with tool-calling, memory and retries

@spacer 4

## What it actually does

@cap <b>Workflows on a canvas</b> — Nodes connected by lines. A trigger starts it, each node transforms or acts, branches and loops handle the logic. Readable by a non-developer, editable by one after a week.

@cap <b>The AI Agent node</b> — Since 2.0: a node that runs a model with tools, memory and retry logic. Point it at Claude, GPT or a local model via Ollama, give it tools from other nodes, and it decides the steps. This is where n8n stopped being "Zapier but cheaper" and became an agent runtime.

@cap <b>Any API</b> — The HTTP node talks to anything with a REST or GraphQL interface, including systems no integration exists for: your accountant's practice software, a client's internal tool, a niche SaaS. Zapier waits for someone to build the connector; n8n lets you.

@cap <b>Code when you want it</b> — JavaScript or Python inside a node, for the 5% of steps that need it. The rest stays visual.

@cap <b>Self-hosting</b> — Run it on a $5–20 virtual server, in Docker, and keep every byte of data inside your own infrastructure. The reason regulated businesses pick it.

@cap <b>Databases, files, MCP</b> — First-class Postgres, MongoDB and Redis; file handling; and MCP support so agents elsewhere can call n8n workflows as tools and n8n agents can use MCP servers.

@cap <b>Templates</b> — Thousands of community workflows to start from: lead scoring, content pipelines, inbox triage, the standard shapes of small-business automation.

@spacer 4

## What it costs — and the maths that decides it

@table keep 40,40,80
@tcells hs-row
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 0,1 -1,-1 [DARK_BG,ZINC_900]
| Plan | Price (annual) | Includes |
| Community (self-hosted) | €0 + server | Unlimited everything; you run it |
| Starter (cloud) | €20/mo | 2,500 executions; workflows, steps and users unlimited |
| Pro (cloud) | €50/mo | 10,000 executions, more concurrency and projects |
| Business (cloud) | €667/mo | 40,000 executions, SSO, Git, governance |
| Enterprise | Custom | Self-hosted with support, or cloud at volume |

@spacer 3

n8n dropped its active-workflow caps: every paid plan now carries unlimited workflows, steps and users, and only executions, concurrency and projects are metered. So the comparison that matters is per workflow run. Take a ten-step lead-qualification flow that fires a thousand times a month: on n8n that is 1,000 executions, inside the Starter plan. On Zapier it is 10,000 tasks, well past the Professional plan's 750 and into a tier ten times the price. Self-hosted, it is the server bill and nothing else.

@body_lead Below about a thousand multi-step runs a month, the difference is small and Zapier's ease wins. Above it, n8n wins by a wide margin. Count your steps and your runs before choosing.

@spacer 4

## n8n vs Zapier vs Make

@table keep 34,42,42,42
@tcells hs-row+col
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
|  | n8n | Zapier | Make |
| Billing unit | Execution (whole run) | Task (each step) | Operation (each step, cheaper) |
| Integrations | 500+ native, any API | 8,000+ | 2,000+ |
| Self-host | Yes, free | No | No |
| AI agents | Agent node, local models | Zapier Agents | AI Agents |
| Learning curve | Real: a week | Gentle | Medium |
| Best for | Volume, control, data privacy, agents | Speed, non-technical operators | Visual complexity on a budget |

@spacer 4

Zapier is the right first tool for most small businesses: it is easier, it connects to more things, and up to about $100 a month of spend the time it saves pays for itself. n8n is what you move to when the bill passes $200, the data must stay in-house, or you want a real agent with memory and tools rather than a packaged assistant.

@spacer 4

## The catches

- → <b>Free means you host it.</b> Updates, backups, SSL, uptime and the 11pm "why did it stop" are yours. If nobody on the team can run a server, the Community Edition is not free; it costs your evenings. Cloud plans exist for that reason.
- → <b>The learning curve is real.</b> Data mapping between nodes, expressions and error handling are harder than Zapier. Expect a week of friction before it pays back.
- → <b>Fewer connectors.</b> Five hundred native integrations against Zapier's eight thousand. The HTTP node covers the gap if you can read an API document.
- → <b>Agents amplify mistakes.</b> A workflow that emails a thousand people runs a thousand times whether the logic was right or not. Test with a small trigger, and use 2.0's human-in-the-loop tool gates in front of anything that deletes, sends or spends.
- → <b>SAP is now an investor.</b> A strategic minority stake, not control, and the real substance is distribution: n8n's canvas is being embedded in SAP's Joule Studio. Good for enterprise credibility; watch whether the roadmap tilts toward SAP customers and away from the solo builder who made it.
@spacer 3

@spacer 4

## Who it is for

@fit <b>Yes</b> — Solo founders and small teams with someone comfortable running a server or paying €20 for cloud, whose automations have grown past a handful of simple zaps, and who want agents with memory and tools inside their workflows.

@fit <b>Not yet</b> — Anyone with fewer than a few hundred workflow runs a month and no technical appetite. Zapier, and revisit when the bill or the data question forces it.

@fit <b>No</b> — Anyone who wants an agent to run their business for them (that is Polsia or NanoCorp) rather than a system to wire their own.

@spacer 4

## Why it matters

Every agent in this series needs a way to be triggered, to reach the next tool, and to hand off. n8n is that connective tissue for the part of the agentic economy that is not run by a hyperscaler: open-source, self-hostable, execution-priced, and now with agents as a native node. That a company built on "you can run it yourself for free" is worth $5.2 billion with SAP on the cap table says how much of the real work in this economy happens in workflows nobody outside the business ever sees.

@spacer 4

## Glossary

@gl <b>n8n</b> — Open-source workflow automation platform, Berlin, founded 2019. Self-hostable or cloud; execution-based pricing. $5.2B valuation.

@gl <b>Workflow</b> — A trigger plus a chain of nodes that transform data and take actions.

@gl <b>Node</b> — One step in a workflow: an integration, a transformation, a code block, an agent.

@gl <b>Execution</b> — One complete run of a workflow, however many nodes. n8n's billing unit.

@gl <b>Task</b> — Zapier's billing unit: one per step, per run.

@gl <b>AI Agent node</b> — n8n's node that runs a model with tools, memory and retries, and decides the steps itself.

@gl <b>HTTP node</b> — The node that calls any API, covering integrations n8n does not ship natively.

@gl <b>Self-hosted / Community Edition</b> — Running n8n on your own server; free, unlimited, your responsibility.

@gl <b>Ollama</b> — A way to run open-weight models locally; n8n's Agent node can use them, keeping data off any cloud.

@gl <b>Make</b> — The third major automation platform; visual, operation-priced, cheaper than Zapier at volume.

@spacer 6

@pagebreak

## Liked this? Go deeper.

n8n is the wiring. Here is what it connects.

@spacer 4
