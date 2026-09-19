---
slug: 'codex'
title: 'WTF is Codex'
file: 'wtf-is-codex.pdf'
cover_title: 'WTF is'
cover_subtitle: 'Codex?'
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  OpenAI's coding agent: writes, tests and submits code on its own, in the cloud, in
  parallel, and now as a tab inside ChatGPT. The direct rival to Claude Code. What it
  does, what it costs on your plan, and where it wins and loses.

# store catalogue fields
order: 19
description: 'OpenAI''s coding agent, now a tab in ChatGPT. What it does, how it compares with Claude Code, what it costs on each plan, and the catches.'
hook: 'OpenAI''s coding agent, *one tab away in ChatGPT.*'
best_for: 'Best for: parallel tasks'
capability: 'vs Claude Code'
price: 7
stripe_price_id: 'price_1UGyCdBaLipfLqFsSTBFQgV0'
category: 'work'
badge: null
featured: false
starter: false
related: ['claude-code', 'chatgpt-work']
---
## The one-liner

@body_lead Codex is OpenAI's autonomous coding agent. You describe a change, a bug or a feature; it reads the codebase, writes the code, runs the tests, fixes what breaks and hands you a pull request to review — in a cloud sandbox, often several tasks at once, while you do something else.

It is OpenAI's answer to Claude Code, and since July 2026 it is one of the three tabs in the ChatGPT app, next to Chat and Work. That placement is the strategy: hundreds of millions of people who already open ChatGPT now have a coding agent one tap away.

@spacer 4

## By the numbers — September 2026

@stat May 2025 || the modern Codex launches as a cloud agent, a year after the CLI. Not the 2021 model of the same name, which was retired in 2023
@stat 10M || people using Codex and ChatGPT Work combined by late July 2026, per OpenAI
@stat $0 → $200 || free with limits; Plus at $20 is the real entry point; Pro at $100 (5×) and $200 (20×) for heavy use. No standalone price
@stat April || 2026: billing switched from per-message to token-based credits. Small fixes got cheaper, big refactors more expensive
@stat 14 Oct || 2026: GPT-5.5 retires from Codex. The current models are the GPT-5.6 family and GPT-6 Astra
@stat Apache 2.0 || the licence on the Codex command-line tool. The terminal agent itself is open-source; the compute is not

@spacer 4

## How it works

### Describe, delegate, review

You write what you want in plain English, in the ChatGPT app, the Codex desktop app, the terminal, an IDE extension or the phone app. Codex clones the repository into an isolated cloud sandbox, plans the change, edits files, runs the test suite, iterates on failures, and returns a diff with an explanation. You review and merge, or send it back.

### Parallel by default

Because each task runs in its own cloud sandbox, you can start five at once — a bug fix, a refactor, a new endpoint, two experiments — and review them as they land. This is Codex's clearest design difference from Claude Code, which began on your machine and added the cloud later.

### Code review in your workflow

Tag @Codex in a GitHub pull request, or switch on automatic reviews, and it reads the change and comments like a colleague. Slack and Linear integrations route tasks in from where teams already talk.

### Local when you want it

The Codex CLI runs on your own machine for interactive work, and the desktop app for Mac and Windows gives the same agent a window instead of a terminal.

### Hand-off from Work

A ChatGPT Work task that needs software — a dashboard, an internal tool, a script — can pass to Codex and come back with the code done.

@spacer 4

## What it costs

There is no Codex subscription. It is included in every ChatGPT plan, with usage metered in credits that map to tokens, and a rolling five-hour window that pauses new tasks when you hit the cap.

@table keep 34,36,90
@tcells hs-row
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 0,1 -1,-1 [DARK_BG,ZINC_900]
| Plan | Price | Codex access |
| Free / Go | $0 / $8 | Limited local use; no cloud tasks, prompted to upgrade at the cap |
| Plus | $20/mo | The real entry point: cloud tasks, code review, all surfaces. Enough for light-to-moderate daily use |
| Pro 5× / 20× | $100 / $200/mo | Heavy and parallel workloads. OpenAI's own estimate for power users is $100–200/month |
| Business | $20–25/user/mo | Cloud features, GitHub, Slack and Linear integrations, admin controls |
| Enterprise | Custom | Shared credit pool, no fixed rate limits |
| API key | Pay per token | For building products on Codex; newer models arrive later than on subscriptions |

@spacer 3

A practical note from people who run it daily: pay-as-you-go via API lands around $5–15 a month for an hour a day, $30–60 for a few hours, and $80–250 for full-time agentic work. The subscription is the better deal until you are well past an hour a day.

@spacer 4

## Codex vs Claude Code

The comparison everyone makes, so here it is without the fan wars.

@table keep 34,63,63
@tcells hs-row+col
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
|  | Codex | Claude Code |
| Where it started | Cloud sandbox, parallel tasks | Your terminal, then desktop, cloud and phone |
| Model | GPT-5.6 family, GPT-6 | Claude Fable, Opus, Sonnet |
| Entry price | $20 ChatGPT Plus | $20 Claude Pro |
| Middle tier | None — $20 then $100/$200 | $100 Max |
| Strength | Backend and multi-task parallel work; review bot in GitHub | Long careful sessions; leads most agent benchmarks through 2026 |
| Adoption | Huge via ChatGPT's user base | Overtook Codex in developer preference in under a year |
| Open source | The CLI, yes | No |

@spacer 4

Most developers who use both describe Codex as better for firing off several backend tasks and reviewing the results, and Claude Code as better for one hard problem it has to think through carefully. At $20 a month each, plenty of people simply run both.

@spacer 4

## The catches

- → <b>Full-access mode had a file-deletion bug.</b> In July 2026 Codex running without a sandbox deleted files it should not have: a failed environment-variable expansion turned a cleanup step into a delete against the user's home directory. OpenAI patched it in August. Sandboxing is still the safer default on a repo you care about.
- → <b>Shallow visibility into its reasoning.</b> You see the diff and a summary, less of the why. Claude Code shows more of its working, which matters when the change is wrong.
- → <b>The five-hour window bites.</b> Plus users hit the cap mid-afternoon on busy days. The workaround is a cheaper model for routine tasks, or the $100 tier.
- → <b>No hosting.</b> Codex writes and tests; it does not deploy. Vercel, Replit and the rest are still your job — or Polsia's, which uses these agents as its developer.
- → <b>Model churn.</b> GPT-5.5 retires in October; the flagship tier changed twice this summer. Pin nothing.
@spacer 3

@spacer 4

## Do you need to be a developer?

Less than you did, more than for Claude Code. The ChatGPT tab and the desktop app removed the terminal, and a founder who can read a diff and run a test can get real software out of Codex. But it assumes a Git repository and a codebase to work in, and it does not deploy, so the surrounding plumbing is still on you. If you have never shipped anything, start with Claude Code's desktop app or a platform like Polsia that wires the pieces together; if you already have a repo and a ChatGPT plan, Codex is one tab away.

@spacer 4

## Why it matters

Codex is the coding agent with the widest possible front door. Claude Code proved the category and still leads it on quality; Codex put the category inside the app that hundreds of millions of people already use, then made it the developer behind ChatGPT Work. For the agentic economy the consequence is simple: writing software is now a commodity capability available on a $20 plan from two companies, and the scarce skill is knowing what to build.

@spacer 4

## Glossary

@gl <b>Codex</b> — OpenAI's autonomous coding agent (2025 onward). Cloud sandboxes, parallel tasks, GitHub review, a tab in ChatGPT. Not the 2021 model of the same name.

@gl <b>Cloud sandbox</b> — An isolated environment where Codex clones your repository and works without touching your machine.

@gl <b>Pull request (PR)</b> — A proposed change to a codebase that a human reviews before it is merged. Codex's standard output.

@gl <b>Codex CLI</b> — The open-source terminal version, Apache 2.0 licensed.

@gl <b>Credits</b> — ChatGPT's usage currency since April 2026, mapped to tokens. Codex tasks draw them down.

@gl <b>Five-hour window</b> — The rolling period over which Codex usage on Plus and Pro is capped.

@gl <b>Full-access mode</b> — Running Codex with unrestricted permissions on your files. Convenient; the source of its worst reported bug.

@gl <b>Claude Code</b> — Anthropic's coding agent and Codex's direct rival. See its own guide.

@spacer 6

@pagebreak

## Liked this? Go deeper.

Codex is one of two coding agents on a $20 plan. Here is the other, and what sits around them.

@spacer 4
