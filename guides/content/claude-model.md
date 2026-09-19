---
slug: 'claude'
title: 'WTF is Claude'
file: 'wtf-is-claude.pdf'
cover_title: 'WTF is'
cover_subtitle: 'Claude?'
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  The AI model inside OpenClaw, Claude Code, Cowork, Microsoft's Copilot Cowork and the
  agents running thousands of AI companies. What it is, which version you actually want,
  and why so much of the agentic economy chose it.

# store catalogue fields
order: 8
description: 'Anthropic''s AI model. The family, the new Fable and Mythos tier, what it can do, and why it powers so many agents — including rivals'' products.'
hook: 'The model *most of the agentic economy chose.*'
best_for: 'Best for: choosing a tier'
capability: 'Why agents run on it'
price: 7
stripe_price_id: 'price_1UGyCSBaLipfLqFsxPelJGfX'
category: 'claude'
badge: null
featured: false
starter: true
related: ['claude-code', 'anthropic']
---
## The one-liner

@body_lead Claude is Anthropic's family of AI models — large language models trained to be helpful, honest and harmless, with a particular focus on behaving reliably when running as an agent for hours without supervision.

It is the brain inside Claude Code and Cowork, the default model in OpenClaw, the engine under Microsoft's Copilot Cowork, and the model Polsia's founder picked to run the agents that run his companies. If you use anything in this series, there is a good chance Claude is doing the thinking.

@spacer 4

## By the numbers — September 2026

Model names and scores in this box change every few months. Everything below is written to outlast them.

@stat Fable 5.1 || the most capable Claude available to the public, released 1 September 2026
@stat 4 || tiers on general sale: Fable 5.1, Opus 5, Sonnet 5, Haiku 4.5
@stat 1M tokens || context window on Fable — roughly 750,000 words, or several novels, in one session
@stat 128K tokens || maximum output in a single response
@stat 87.6% || SWE-bench Verified score reported for Claude Code Remote in spring 2026 — the highest published at the time
@stat ~150 || organisations with access to the restricted Mythos version through Project Glasswing
@stat $20 / $100–200 || per month for Claude Pro and Max. Free tier available

@spacer 4

## The family — which Claude is which

Claude is not one model. It is a range at different price and capability points, and in 2026 a new tier appeared at the top.

@table keep 30,130
@tcells hs-row+col
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
| Tier | What it is for |
| Fable | The Mythos-class flagship, a tier above Opus. Long autonomous tasks, hard reasoning, large codebases, document-heavy professional work. The most expensive. |
| Opus | The previous top tier, still very capable. Complex agentic work where Fable is more than you need. |
| Sonnet | The workhorse. Fast, strong, far cheaper. Most business agents run on Sonnet. |
| Haiku | Fastest and cheapest. High-volume, simpler tasks: classification, routing, quick replies. |
| Mythos | Not for sale. The same model as Fable with safety classifiers lifted, restricted to vetted cyberdefenders and researchers. |

@spacer 4

The version numbers move — 4.6 in March, 4.7 in April, 4.8 in May, 5 in July, Fable 5.1 in September. The tiers do not. When someone says "Claude," ask which tier.

@spacer 4

## Fable and Mythos — the split that changed how models ship

In June 2026 Anthropic released a model it said was capable enough to be dangerous in the wrong hands: strong enough to find and chain security vulnerabilities in software autonomously, a task previously limited to elite human researchers.

Rather than release it or withhold it, Anthropic did both. Claude Fable is that model with real-time classifiers that block cybersecurity, biology and chemistry misuse; it is generally available. Claude Mythos is the identical model with those safeguards lifted, available only through Project Glasswing, a vetted programme run with the US government for cyberdefenders and critical-infrastructure providers, and, over time, biomedical researchers.

For you as a user the practical meaning is simple. Fable 5.1 is the best Claude you can buy, and it will decline a narrow set of dangerous requests. For the industry the meaning is larger: the most capable AI is now gated by who you are and what you are for. Other labs followed within months.

@spacer 4

## What Claude can actually do

@cap <b>Write and edit</b> — Any style, length or format. Emails, code, contracts, marketing copy, technical documentation. Claude adapts to context and holds a consistent voice across long pieces.

@cap <b>Reason through hard problems</b> — Multi-step logic, analysis, strategy, maths. Fable and Opus think before answering, and the thinking scales with the difficulty of the task.

@cap <b>Read enormous documents</b> — A million-token context means an entire codebase, a full legal file or a year of emails in one session.

@cap <b>Write, run and fix code</b> — Across every major language. Claude Code turns this into an agent that reads your project, changes it, tests it and commits.

@cap <b>Use tools</b> — Browse the web, read files, query databases, call APIs, send email, through MCP, the open standard Anthropic invented.

@cap <b>Work in your apps</b> — Cowork on the desktop, Claude in Chrome and a built-in browser, Claude in Excel, PowerPoint, Word and Outlook, Claude Tag in Slack.

@cap <b>Run for hours</b> — The property that matters most for agents. Claude keeps its footing across long autonomous sessions, remembers what it has done, and asks when it is unsure rather than guessing.

@spacer 4

## What makes Claude different — the behaviour, not the benchmark

Benchmarks are a snapshot and every lab tops one somewhere. The reason so much of the agentic economy standardised on Claude is behavioural, and it comes from how Anthropic trains.

Constitutional AI gives the model written principles and trains it to judge its own outputs against them. In practice that produces a model that:

- → Declines harmful requests and explains why, instead of refusing bluntly or complying blindly
- → Flags ambiguity and asks, rather than silently assuming and getting it wrong three steps later
- → Says "I don't know" more readily than rivals, which matters when nobody is checking
- → Behaves consistently across different phrasings of the same instruction
- → Notices flaws in its own work — Anthropic reported Opus 4.8 was several times less likely than its predecessor to let a bug it wrote pass unremarked
@spacer 3

@body_lead For a chatbot these are nice qualities. For an agent running your inbox at 3am they are the whole product. A model that hallucinates confidently sends the wrong email. A model that flags uncertainty leaves you a note.

@spacer 4

## Where Claude shows up

@role <b>OpenClaw</b> — Default model in the most-used open-source personal agent, with millions of active users.

@role <b>Microsoft Copilot Cowork</b> — Microsoft's flagship agent for Microsoft 365 runs on Claude, despite Microsoft's $13 billion stake in OpenAI. Microsoft chose it anyway.

@role <b>Polsia</b> — The founder has said on the record he chose Claude Opus to run his agents because "it's important to give it the best reasoning."

@role <b>Paperclip</b> — Claude Code is the primary developer agent in the open-source multi-agent org chart.

@role <b>Every major cloud</b> — Amazon Bedrock, Google Cloud Vertex AI and Microsoft Foundry all serve Claude, so enterprises can use it inside infrastructure they already pay for.

@role <b>Thousands of products</b> — Via the API: customer-service agents, research tools, legal analysis, coding assistants, and the AI-run companies indexed on wtfagents.com.

@spacer 4

## How to get it

@acc <b>Claude.ai and the apps</b> — Web, desktop (Mac and Windows), iPhone and Android. Free tier for chat. Claude Pro at $20 a month adds Cowork, Claude Code and higher limits. Claude Max at $100–200 for heavy use. Team and Enterprise plans above that.

@acc <b>Claude Code</b> — Included with Pro and above, or pay-as-you-go through the API.

@acc <b>The Claude Developer Platform</b> — Direct API access for builders. Pay per token; Haiku cheapest, Fable most expensive.

@acc <b>Through your cloud</b> — Bedrock, Vertex AI or Foundry if your company already lives there.

@acc <b>Inside other agents</b> — OpenClaw, Paperclip and most agent frameworks let you plug in your own Anthropic API key.

@spacer 4

## Glossary

@gl <b>Claude</b> — Anthropic's AI model family: Fable, Opus, Sonnet and Haiku on general sale; Mythos restricted.

@gl <b>Fable</b> — The public version of the Mythos-class model, with safety classifiers active. Currently Fable 5.1.

@gl <b>Mythos</b> — The same model with safeguards lifted, available only to vetted organisations through Project Glasswing.

@gl <b>Tier</b> — A capability and price level within the family. Tiers are stable; version numbers change constantly.

@gl <b>Constitutional AI</b> — Anthropic's training technique: written principles the model learns to judge its own outputs against.

@gl <b>Context window</b> — How much text the model can hold at once. One million tokens on Fable.

@gl <b>Token</b> — The unit models process text in. Roughly three quarters of a word. API usage is billed in tokens.

@gl <b>MCP (Model Context Protocol)</b> — The open standard Claude and every other major model use to connect to tools.

@gl <b>SWE-bench</b> — The standard benchmark for AI coding ability, measured on real software engineering tasks.

@gl <b>Claude Code</b> — The agentic version of Claude for building software. See its own guide.

@gl <b>Cowork</b> — Claude working in your files, apps and browser without a command line. See its own guide.

@spacer 6

@pagebreak

Claude is the model. Here is everything built on it.

@spacer 4
