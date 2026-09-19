---
slug: 'agentforce'
title: 'WTF is Agentforce'
file: 'wtf-is-agentforce.pdf'
cover_title: 'WTF is'
cover_subtitle: 'Agentforce?'
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  Salesforce's agents for big companies: support, sales and field service bots inside the
  CRM 150,000 businesses already run. A billion dollars of revenue, four pricing models in
  two years, and fewer than one customer in ten at scale. What it is and what it costs.

# store catalogue fields
order: 33
description: 'The enterprise incumbent''s agent platform. What it does inside Salesforce, the four ways it bills, the pay-per-resolution turn, and why most deployments stall.'
price: 7
stripe_price_id: 'price_1UHQp0BaLipfLqFsTkduvoBT'
category: 'work'
badge: null
featured: false
starter: false
related: ['whos-who', 'hire-agent']
hook: "Agents for big companies. *Billed four different ways.*"
best_for: "Best for: Salesforce shops"
capability: "Pricing decoded"
---
## The one-liner

@body_lead Agentforce is Salesforce's platform for building and running AI agents inside its own products: a support agent that resolves tickets, a sales agent that qualifies leads, a field-service agent that schedules technicians, all with access to the customer data Salesforce already holds.

It is the enterprise answer to everything else in this series. Where a solo founder installs OpenClaw, a company with ten thousand support cases a day buys Agentforce, because its agents already know the customer, the order and the contract.

@spacer 4

## By the numbers — September 2026

@stat $1.2B || annualised revenue reported on 27 May 2026, up 205% year on year; $540M and 330% growth six months earlier
@stat 18,500 || deals closed by early 2026, about 9,500 of them paid — roughly 6% of Salesforce's 150,000-plus customers
@stat <10% || of customers who have scaled Agentforce beyond a pilot, per independent 2026 research
@stat 5–11 months || the typical implementation timeline reported for a production deployment
@stat 4 || billing models shipped since launch: per conversation, Flex Credits, per user, and since July, per resolution
@stat $2 || per conversation, or per autonomous resolution on the newest model; $500 per 100,000 Flex Credits
@stat $125 → $550+ || per user per month for add-on licences and the bundled Agentforce 1 Editions

@spacer 4

## What it actually does

@cap <b>Service agents</b> — Answer customers over chat, email and, with Agentforce Voice, the phone. Look up orders, process returns, escalate to a human with the context attached. The Help Agent, generally available since July 2026, is billed only when it resolves a case end to end — Salesforce runs it on its own help site, where it has taken 4.3 million enquiries and resolved about 70%.

@cap <b>Sales agents</b> — Qualify inbound leads, answer product questions, book meetings, nudge stalled deals, all logged in the CRM.

@cap <b>Field service and industry agents</b> — Scheduling, dispatch, and vertical agents for banking, health, retail and the public sector.

@cap <b>Agent Builder</b> — A low-code tool for defining what an agent may do, which data it may see, and when it must hand off. The guardrails are the product for a regulated buyer.

@cap <b>Data Cloud</b> — The unified customer record the agents draw on; Salesforce's real advantage over anyone bolting an agent onto a help desk.

@cap <b>Employee agents</b> — Internal: HR questions, IT tickets, sales coaching, inside Slack and the Salesforce apps.

@spacer 3

@body_lead The pitch that lands in a boardroom: the agent already has the customer's history, the pricing and the rules, because it lives where they live. The pitch that lands less often: it works out of the box.

@spacer 4

## What it costs — the four models

Salesforce has changed how it charges more in two years than most enterprise vendors do in a decade. All four are live.

@table keep 40,38,82
@tcells hs-row
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 0,1 -1,-1 [DARK_BG,ZINC_900]
| Model | Price | Notes |
| Per conversation | $2 each | The 2024 original; customer-facing agents only; simple, and unclear what one "conversation" is |
| Flex Credits | $500 per 100,000 | Half a cent a credit; a standard action costs 20 and a voice action 30, so about $0.10 and $0.15; pre-purchase, pay-as-you-go or pre-commit |
| Per user | $5/user/mo licence, or $125–150 add-on; Agentforce 1 Editions from $550 | The $5 seat is metered against Flex Credits; the add-on is unmetered for employees; Editions bundle 2.5M credits a year |
| Per resolution | $2 per resolved case | July 2026, Help Agent: nothing charged if the customer asks for a human, leaves negative feedback, or abandons |

@spacer 3

The rule of thumb Salesforce's own maths implies: a conversation with more than about twenty actions is cheaper per conversation; fewer, and Flex Credits win. Voice adds a telephony cost on top. And all of it sits on a Service Cloud or Sales Cloud subscription you already pay for.

@spacer 4

## Agentforce vs the field

@table keep 34,42,42,42
@tcells hs-row+col
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
|  | Agentforce | Sierra and the specialists | Cowork / ChatGPT Work |
| Buyer | Enterprises on Salesforce | Enterprises, any CRM | Individuals and teams |
| Data | Salesforce's customer record | Integrates into yours | Your files and apps |
| Pricing | Four models | Outcome-based | $20 a seat |
| Setup | Months, partners | Months | Minutes |
| Strength | Already where the data is | Focus, results-based pricing | Speed, cost, no procurement |

@spacer 4

Sierra, founded by former Salesforce co-CEO Bret Taylor, is the sharpest rival: pay per resolved case from day one, and past $150 million in revenue on it. Agentforce's July move to per-resolution billing is the response.

@spacer 4

## The catches

- → <b>Most deployments stall.</b> Under a tenth of customers are at scale; five to eleven months to production is normal; independent research finds a meaningful share of enterprise agent projects return negative ROI at twelve months. Agentforce is not exempt.
- → <b>The pricing moves under you.</b> Four billing models in two years, all still live. Sign shorter terms, and get a re-pricing clause.
- → <b>It needs Salesforce underneath.</b> Service Cloud or Sales Cloud first, Data Cloud for the good version. If you are not already a Salesforce shop, this is not your entry point to agents.
- → <b>"Conversation" and "action" are contractual words.</b> One customer question can trigger several billable actions. Define the units before the pilot.
- → <b>Partners do the work.</b> Most implementations run through consultancies. Budget for that, not just the licences.
@spacer 3

@spacer 4

## Who it is for

@fit <b>Yes</b> — Companies already running Salesforce with high-volume support or sales workflows and a team that can spend months on a deployment. Start with Help Agent on per-resolution pricing; it is the one model where you pay only for what worked.

@fit <b>Not yet</b> — Salesforce customers without Data Cloud or a clean customer record. Fix the data first; the agent is only as good as it.

@fit <b>No</b> — Anyone not on Salesforce, or any business small enough that a $20 work agent and a support inbox cover it.

@spacer 4

## Why it matters

Agentforce is where the agentic economy meets the Fortune 500: not a founder installing something, but a procurement team signing a multi-year contract. Its billion dollars of revenue is the largest single proof that big companies will pay for agents. Its sub-10% scale rate is the largest single proof of how far most of them are from using what they bought. Both numbers are the enterprise market in 2026, and the gap between them is where the next two years happen.

@spacer 4

## Glossary

@gl <b>Agentforce</b> — Salesforce's platform for AI agents inside its CRM and service products. Launched 2024.

@gl <b>Service Cloud / Sales Cloud</b> — The Salesforce products Agentforce runs on top of; a prerequisite.

@gl <b>Data Cloud</b> — Salesforce's unified customer data layer; what makes the agents useful.

@gl <b>Flex Credits</b> — Agentforce's consumption currency: $500 per 100,000, twenty credits to a standard action, thirty to a voice one.

@gl <b>Per resolution</b> — The July 2026 billing model: $2 only when an agent fully resolves a case, and nothing when it does not.

@gl <b>Agentforce 1 Editions</b> — Bundled per-user licences from $550 a month including credits.

@gl <b>Agent Builder</b> — The low-code tool for defining an agent's scope, data access and hand-off rules.

@gl <b>Sierra</b> — Bret Taylor's agent company and Agentforce's outcome-priced rival.

@gl <b>Implementation partner</b> — The consultancy most enterprises hire to deploy Agentforce.

@spacer 6

@pagebreak

## Liked this? Go deeper.

Agentforce is the enterprise end. Here is the map it sits on, and how a smaller business hires an agent instead.

@spacer 4
