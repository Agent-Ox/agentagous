---
slug: 'cursor'
title: 'WTF is Cursor'
file: 'wtf-is-cursor.pdf'
cover_title: 'WTF is'
cover_subtitle: 'Cursor?'
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  The code editor that became the fastest-growing software company in history, then the
  largest startup acquisition ever when SpaceX paid $60 billion for it. What it is, what
  changed under Musk, why OpenAI is walking away, and what a non-developer should know.

# store catalogue fields
order: 27
description: 'The AI code editor SpaceX bought for $60B. What it does, the plans, the model router, the OpenAI cutoff on 12 November, and how it relates to Grok Bot.'
price: 7
stripe_price_id: 'price_1UHPvHBaLipfLqFseIza5U9K'
category: 'work'
badge: null
featured: false
starter: false
related: ['claude-code', 'grok-bot']
hook: "The editor half the internet codes in. *Now a rocket company's.*"
best_for: "Best for: coding with AI"
capability: "The SpaceX story"
---
## The one-liner

@body_lead Cursor is a code editor with AI built into every keystroke: autocomplete that predicts the next edit, a chat that knows your whole codebase, and agents that take a task and return the finished change. It is where a large share of the world's professional developers now write software.

In 2026 it became something else as well: the product SpaceX paid $60 billion for, the delivery vehicle for Grok Bot, and the front line of a fight between Elon Musk and OpenAI that will cut off a supplier on 12 November.

@spacer 4

## By the numbers — September 2026

@stat $60B || all-stock price SpaceX paid for Anysphere, Cursor's company — the largest acquisition of a venture-backed startup ever. Announced 16 June, closed 14 August
@stat ~$4B || annualised revenue by mid-2026, from roughly zero at the start of 2024
@stat 73× || the rise in Cursor's price tag across four funding rounds in under three years, before the sale
@stat 12 Nov || 2026: the date OpenAI stops supplying models to Cursor, citing the Musk relationship
@stat ~5% || of Cursor traffic served by OpenAI models, per co-founder Michael Truell — Anthropic and Google models remain
@stat $20 / $60 / $200 || per month for Pro, Pro+ and Ultra; Teams from $40 a seat, Premium seats $120
@stat Composer 2.5 || Cursor's own coding model since 18 May, in the first-party pool with Grok 4.5 and 4.6

@spacer 4

## What it actually does

@cap <b>Tab</b> — Autocomplete that predicts your next edit, not your next word: it proposes the whole change and you press Tab. The feature that made developers switch.

@cap <b>Chat with the codebase</b> — Ask questions about a project with millions of lines and get answers with the files cited. Cursor indexes the whole repository.

@cap <b>Agent mode</b> — Describe a feature or a bug; the agent edits across files, runs the terminal, checks the result and iterates. Several agents can run in parallel in cloud sandboxes, then hand back a review.

@cap <b>Composer</b> — Cursor's own models, built to be fast and cheap for the routine 80% of coding, with frontier models from Anthropic and Google (and OpenAI, until November) available for the hard 20%.

@cap <b>The router</b> — The quiet core of the business: send each request to the model that does it well enough at the lowest cost. It is how Cursor went from negative margins to profit in early 2026, and why losing one supplier is survivable.

@cap <b>Grok Bot</b> — Since August, the work agent that lives alongside the editor: named bots with your logins on a shared cloud computer, sold through Cursor's plans. See its own guide.

@cap <b>Enterprise</b> — SSO, admin dashboards, usage pools, MCP support for connecting internal tools; where the money is made.

@spacer 4

## What it costs

@table keep 34,30,96
@tcells hs-row
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 0,1 -1,-1 [DARK_BG,ZINC_900]
| Plan | Price | What you get |
| Hobby | $0 | Limited Tab and agent use; enough to see if it fits |
| Pro | $20/mo | Unlimited Tab, a monthly usage pool for agents, Grok Bot access since August |
| Pro+ | $60/mo | Three times the Pro pool |
| Ultra | $200/mo | Twenty times, for people running agents all day |
| Teams | $40/seat | Pro plus admin controls, shared billing, privacy mode enforced |
| Teams Premium | $120/seat | Five times the standard usage for heavy agent workloads |
| Enterprise | Custom | Pools, SSO, audit, SCIM, dedicated support |

@spacer 3

Usage splits into two pools: first-party models (Composer, Grok) draw from your plan; third-party models (Claude, Gemini, GPT) are billed at each provider's API rate against it. Heavy agent use on frontier models exhausts a Pro pool quickly; that is what Pro+ and Ultra are for.

@spacer 4

## Cursor vs Claude Code vs Codex

@table keep 34,42,42,42
@tcells hs-row+col
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
|  | Cursor | Claude Code | Codex |
| Shape | An editor with agents inside | An agent, with an editor optional | An agent in ChatGPT and the terminal |
| Model | Any — routed; Grok and Composer first-party | Claude | GPT |
| Where it runs | Your machine, cloud sandboxes for agents | Your machine, cloud, phone | Cloud sandboxes, local CLI |
| Entry price | $20 Pro | $20 Claude Pro | $20 ChatGPT Plus |
| Owner | SpaceX | Anthropic | OpenAI |
| Strength | Live editing with AI at every keystroke | Long autonomous sessions, leads the benchmarks | Parallel tasks, GitHub review |

@spacer 4

Many developers run Cursor as the editor and Claude Code as the agent inside it. The acquisition makes that combination more political than it was, and the November cutoff makes the third column a little emptier.

@spacer 4

## The SpaceX story, in order

- → <b>February 2026:</b> SpaceX absorbs xAI at a $250 billion valuation. Musk's rocket company now owns a frontier lab and X.
- → <b>April:</b> SpaceX signs a deal with Cursor: buy the company, or pay roughly $10 billion in break-up and service fees; $4 billion more if regulators block it.
- → <b>June:</b> SpaceX goes public at $135 a share, raising $75 billion, the largest IPO in history. Four days later it announces the $60 billion Cursor purchase.
- → <b>July:</b> xAI rebrands to SpaceXAI. Grok 4.5 ships, trained jointly with Cursor on trillions of tokens of Cursor data.
- → <b>August:</b> Grok Bot and Grok 4.6 launch with Cursor's help. The acquisition closes on the 14th; Anysphere shareholders receive SpaceX stock. On the 28th OpenAI announces it will stop supplying models on 12 November.
- → <b>March, in hindsight:</b> Composer 2 was revealed to be built on Moonshot's open-weight Kimi K2.5 — a Chinese base model under the American developer tool — which Cursor confirmed after users spotted it on X. Cursor's account is that only about a quarter of the compute behind the model came from the base, and Moonshot confirmed an authorised commercial partnership through Fireworks AI. The complaint was the silence, not the licence.
@spacer 3

@body_lead The plot is simple once you see it: SpaceX wanted a real AI business and a million developers; Cursor wanted compute and margin. Musk got the layer between developers and every model, which is the layer OpenAI could not take away when it left.

@spacer 4

## The catches

- → <b>The OpenAI cutoff.</b> From 12 November, GPT models leave the third-party pool. If your workflow depends on them, plan the switch now. Claude and Gemini stay; Grok becomes the emphasised default.
- → <b>Whose data trains what.</b> Grok 4.5 was trained on Cursor data. Privacy mode exists and Teams enforce it; individuals should switch it on and understand what "off" means.
- → <b>Model choice is a feature, until it isn't.</b> Cursor markets choosing your model. The owner now has a model to push. Watch which one the router prefers.
- → <b>Individual accounts lose money.</b> Cursor's own economics say enterprise accounts pay and individual ones do not. Expect the $20 tier to get tighter, not looser.
- → <b>It is an editor.</b> For a non-developer this is the least approachable of the coding agents; Claude Code's desktop app or Codex in ChatGPT are gentler starts.
@spacer 3

@spacer 4

## Do you need to be a developer?

More than for Claude Code or Codex. Cursor is a professional editor with AI in it, not an agent with a chat box, and it assumes you know what a repository, a terminal and a diff are. If you do, it is the most productive place to write software in 2026. If you do not, start with Claude Code's desktop app and come back when you want the editor.

@spacer 4

## Why it matters

Cursor is the proof that the layer between people and models is worth more than most models. It trained almost nothing at the frontier, rented everyone else's, and was bought for $60 billion by a company that needed a way into developers' hands. Now that layer belongs to the same owner as a frontier lab, a social network and a rocket company, and one supplier has already walked out. What happens to Cursor between now and November is the clearest test yet of whether an aggregator can survive owning a side.

@spacer 4

## Glossary

@gl <b>Cursor</b> — AI code editor built on VS Code by Anysphere, founded 2022. Acquired by SpaceX for $60B in 2026.

@gl <b>Tab</b> — Cursor's predictive autocomplete: it proposes the next edit, you accept with Tab.

@gl <b>Agent mode</b> — Cursor's autonomous coding: describe a change, the agent edits, runs and checks across files.

@gl <b>Composer</b> — Cursor's own family of coding models. Composer 2 and the current 2.5 are both built on Moonshot's open-weight Kimi K2.5.

@gl <b>Router</b> — The system that sends each request to the cheapest model that can do it well. Cursor's margin engine.

@gl <b>First-party / third-party pool</b> — Usage from Cursor and Grok models versus usage billed at Anthropic's, Google's or OpenAI's API rates.

@gl <b>SpaceXAI</b> — The rebranded xAI, a SpaceX subsidiary since February 2026 and Cursor's owner since August.

@gl <b>Grok Bot</b> — SpaceXAI's work agent, sold through Cursor plans. See its own guide.

@gl <b>Privacy mode</b> — The Cursor setting that keeps your code out of training. On by default for Teams; check it for yourself.

@spacer 6

@pagebreak

## Liked this? Go deeper.

Cursor is the editor. Here are the agents that compete with it and the one that shipped through it.

@spacer 4
