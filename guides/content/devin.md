---
slug: 'devin'
title: 'WTF is Devin'
file: 'wtf-is-devin.pdf'
cover_title: 'WTF is'
cover_subtitle: 'Devin?'
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  The "first AI software engineer": a cloud agent that takes a ticket and returns working
  software, from a company valued at $47 billion that says it writes 95% of its own code with it.
  What it does, why the price fell from $500 to $20, and how it compares.

# store catalogue fields
order: 28
description: 'Cognition''s autonomous software engineer. From $500 to $20 a month, the Windsurf acquisition, ACUs explained, and how it compares with Claude Code and Codex.'
price: 7
stripe_price_id: 'price_1UHQ63BaLipfLqFsBj1Cy6BI'
category: 'work'
badge: null
featured: false
starter: false
related: ['claude-code', 'codex']
hook: "Hand it the ticket. *Get the software back.*"
best_for: "Best for: delegating whole tasks"
capability: "ACUs and pricing"
---
## The one-liner

@body_lead Devin is an autonomous software engineer in the cloud: you give it a task — a bug, a feature, a migration — and it plans, writes, tests, fixes and opens the pull request, then messages you when it is done or stuck. It was the first product to make that claim in 2024 and the one everyone measured against.

Two years on it is cheaper, better, and part of a bigger company: Cognition bought the Windsurf editor, raised at $47 billion, and says Devin now writes about 95% of Cognition's own code — up from 89% at the May round, and a quarter of its pull requests in 2025.

That last number is worth holding at arm's length. It is the company's own figure, self-reported by CEO Scott Wu, and it counts code committed rather than engineering done: the specifying, reviewing and deciding still sit with people. As a trend line it is the most interesting thing Cognition publishes. As a benchmark it is unaudited.

@spacer 4

## By the numbers — September 2026

@stat $47B || the valuation Bloomberg reported on 2 September 2026, for a ~$1B round still in talks — up from $26B in May and $10.2B a year ago
@stat ~$900M || annualised revenue, more than double the $492M of May 2026; Devin alone was $73M in June 2025, before Windsurf
@stat $500 → $20 || the monthly price cut with the Devin 2.0 relaunch in April 2025; Max at $200, Teams from $80
@stat 1 ACU || Devin's unit of work, roughly 15 minutes of autonomous engineering
@stat July 2025 || Cognition buys Windsurf after OpenAI's $3B bid collapses and Google hires Windsurf's founders
@stat 4,000+ || enterprise customers on Windsurf by spring 2026; over a million users
@stat 3.0 || the current Devin: dynamic re-planning, desktop-app testing via computer use, a unified Devin Desktop

@spacer 4

## What it actually does

@cap <b>Takes a task, returns a pull request</b> — Describe the change in plain English or paste a ticket. Devin explores the codebase, makes a plan, edits, runs the tests, fixes what breaks and hands back a reviewable change with an explanation.

@cap <b>Works in parallel</b> — Each task runs in its own cloud environment, so ten tickets can run at once. This is where it earns its keep on migrations and backlogs.

@cap <b>Re-plans</b> — Devin 3.0 revises its approach mid-task when something surprises it, rather than ploughing on. The difference between an agent that gets stuck and one that gets there.

@cap <b>Tests what it built</b> — Including desktop and web apps, by driving them the way a person would (computer use).

@cap <b>Devin Desktop</b> — The 2026 app unifying the cloud agent, the command line and the editor, so you can watch, steer and take over.

@cap <b>Windsurf</b> — The editor Cognition bought: AI-native, with completions and chat like Cursor, and the on-ramp to Devin for longer tasks. Renamed Devin Desktop in June 2026, and now open to rival agents — Codex, Claude, Gemini CLI — through the Agent Client Protocol.

@cap <b>Multi-model</b> — Claude, GPT and Gemini frontier models plus Cognition's own SWE family, routed per task. Cognition's pitch is independence from any one lab.

@spacer 4

## What it costs

@table keep 34,34,92
@tcells hs-row
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 0,1 -1,-1 [DARK_BG,ZINC_900]
| Plan | Price | What you get |
| Free | $0 | A small ACU allowance to try it |
| Pro | $20/mo | A usage allowance refreshing daily and weekly; extra usage at API rates |
| Max | $200/mo | The heavy-use tier, for running Devin all day |
| Teams | $80/mo + $40/seat | Shared ACU pool, admin, integrations |
| Enterprise | Custom | Volume ACUs, security, dedicated support, custom models |

@spacer 3

The unit is the ACU, about a quarter-hour of Devin working. A simple bug might take two; a multi-file feature ten or more; a large migration hundreds. The $20 plan is for trying tasks; the $200 plan is for handing over a backlog.

Cognition does not publish the ACU allowance on each plan — the pricing page says only that paid plans refresh daily and weekly, and that extra usage bills at API rates. Third-party write-ups quote confident quotas and per-ACU prices; they disagree with each other and with the pricing page. Watch your own meter for a month before sizing the plan.

@spacer 4

## Devin vs Claude Code vs Codex

@table keep 34,42,42,42
@tcells hs-row+col
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
|  | Devin | Claude Code | Codex |
| Shape | Cloud engineer you message | Agent in your terminal, desktop, cloud | Agent in ChatGPT and the CLI |
| Model | Multi-model + own SWE models | Claude | GPT |
| Unit | ACU (~15 min of work) | Plan usage | Plan credits |
| Entry price | $20 | $20 Claude Pro | $20 ChatGPT Plus |
| Best at | Long, parallel, hands-off tasks | Hard problems needing care; leads benchmarks | Parallel backend tasks, GitHub review |
| Owner | Cognition, independent | Anthropic | OpenAI |

@spacer 4

The honest distinction after two years: Devin is the most hands-off of the three and the best at running a queue of well-specified tasks unattended. Claude Code is what people reach for when the task is hard. Many teams use both.

@spacer 4

## The Windsurf story

In mid-2025 Windsurf, a well-liked AI editor, was in a bidding war. OpenAI agreed to buy it for about $3 billion; the deal collapsed. Google hired Windsurf's CEO and research leads in a licensing deal. Days later Cognition bought what was left: the product, the brand, the engineers and $82 million of revenue with 350-plus enterprise customers.

It turned out to be the acquisition that made the company. Devin had the headlines; Windsurf had the users. Combined revenue more than doubled within months, the valuation went from $10 billion to $26 billion to $47 billion in a year, and Cognition became a coding platform instead of a single agent. The lesson it teaches about the whole category: distribution beat being first.

@spacer 4

## The catches

- → <b>ACUs are hard to predict.</b> A task that seems small can take many; the meter is honest but the estimate is yours. Start with the free tier and watch what real tickets cost.
- → <b>Cloud-only means your code leaves.</b> Devin works in Cognition's environments. Enterprise plans have the controls; individuals should know that is the model.
- → <b>Autonomy needs specification.</b> Devin does well with a clear ticket and badly with a vague one. The skill it rewards is writing the brief.
- → <b>Valuation pressure.</b> At roughly fifty times revenue, Cognition has to keep growing very fast. Expect pricing and packaging to keep moving.
- → <b>The bundling threat.</b> Anthropic, OpenAI, Google and Microsoft can make autonomous coding a default feature of what developers already pay for. Devin has to stay better, not just independent.
@spacer 3

@spacer 4

## Do you need to be a developer?

Less than for Cursor, more than for Claude Code's desktop app. Devin assumes a repository, tests and someone to review a pull request; it does not assume you write code yourself. A founder who can read a diff and describe a change precisely can get real software out of it. If that is not you yet, start with Claude Code and come back when you have a backlog to hand over.

@spacer 4

## Why it matters

Devin defined the category: the agent you message like a colleague, that returns finished work. Everything in the coding-agent row of this series — Claude Code, Codex, Grok Bot's engineering bots — is a response to the claim Devin made first. That it needed to buy an editor to grow is the second lesson, and the one the rest of the agentic economy is learning now: the agent is the product, but the place people already work is the distribution.

@spacer 4

## Glossary

@gl <b>Devin</b> — Cognition's autonomous AI software engineer, launched 2024. Takes a task, returns a pull request. Now version 3.0.

@gl <b>Cognition</b> — The company behind Devin and Windsurf, founded 2023 by Scott Wu, Steven Hao and Walden Yan. Valued at $47B.

@gl <b>ACU (Agent Compute Unit)</b> — Devin's unit of work, roughly 15 minutes of autonomous engineering.

@gl <b>Windsurf</b> — The AI-native code editor Cognition acquired in July 2025, renamed Devin Desktop in June 2026.

@gl <b>Devin Desktop</b> — Windsurf, renamed in June 2026: one app for the cloud agent, the CLI and the editor, and for rival agents too.

@gl <b>Pull request</b> — A proposed change to a codebase that a human reviews before merging. Devin's output.

@gl <b>Re-planning</b> — Revising the approach mid-task when something unexpected happens. Devin 3.0's headline capability.

@gl <b>SWE models</b> — Cognition's own coding models, used alongside Claude, GPT and Gemini.

@gl <b>Computer use</b> — An agent driving an application's interface the way a person would; Devin uses it to test what it builds.

@spacer 6

@pagebreak

## Liked this? Go deeper.

Devin is the engineer you message. Here are the others, and the editor SpaceX bought.

@spacer 4
