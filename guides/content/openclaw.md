---
slug: 'openclaw'
title: 'WTF is OpenClaw'
file: 'wtf-is-openclaw.pdf'
cover_title: 'WTF is'
cover_subtitle: 'OpenClaw?'
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  One Austrian developer. One open-source project. Three name changes in 60 days, a hire by
  OpenAI, dating profiles created without consent, a ban from Chinese government offices —
  and now millions of users, a foundation, and native apps. The wildest story in tech, and
  where it stands today.

# store catalogue fields
order: 5
description: 'The open-source personal agent with millions of users. The wild origin story, the security warnings, and where it stands now.'
price: 7
category: 'personal'
badge: null
featured: false
relatedTool: 'openclaw'
starter: false
related: ['paperclip', 'ai-agent']
---
## The one-liner

@body_lead OpenClaw is a free, open-source autonomous AI agent that runs on your computer or phone and takes instructions via messaging apps — WhatsApp, Telegram, Signal, Discord — connecting to Claude, GPT, DeepSeek or any model you choose to carry out multi-step tasks on your behalf.

@spacer 4

## By the numbers — September 2026

@stat 3.2M || active users, making it the most-used open-source agent in the world
@stat 385,000+ || GitHub stars — the sixth most-starred repository in GitHub's history
@stat 30 Aug || 2026: OpenClaw 2.0 released, with native iPhone, iPad and Android apps
@stat $0 || cost. MIT licence. You pay only for the model you plug in
@stat 1 || non-profit foundation now governing the project, with an independent board
@stat 3 || names in its first 60 days: Clawdbot, Moltbot, OpenClaw

It is not a platform. It is not a service. It is software you install and run yourself. And it became one of the most talked-about pieces of software in the world in under 60 days.

@spacer 4

## The name history — three identities in 60 days

Understanding OpenClaw requires understanding its chaotic naming history:

@table keep 28,24,108
@tcells hs,hs,hs|hs,hs,cs|hs,hs,cs|hs,hs,cs
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 1,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
| Date | Name | Why |
| November 24, 2025 | Clawdbot | Original launch name. A portmanteau of "Clawd" (the developer's personal AI assistant, itself named after Anthropic's Claude) and "bot." |
| January 27, 2026 | Moltbot | Anthropic sent trademark complaints about "Clawd" being too similar to "Claude." Renamed to Moltbot, keeping a lobster theme (lobsters molt their shells). |
| January 30, 2026 | OpenClaw | Peter Steinberger found "Moltbot" didn't roll off the tongue. Renamed again to OpenClaw — and it stuck. |

@spacer 4

## Who built it — Peter Steinberger

Peter Steinberger is an Austrian software engineer and entrepreneur. He co-founded PSPDFKit (now Nutrient) in 2011 — a PDF SDK framework he bootstrapped to a successful exit. He is based between Vienna and London.

Steinberger built his own personal AI assistant called Clawd — named after Anthropic's Claude, which it used as its underlying model. He then open-sourced a generalised version of it as Clawdbot in November 2025.

He describes himself as a "vibe coder" — someone who builds primarily through AI-assisted development. The irony of an AI agent builder who uses AI agents to build AI agents was not lost on the internet.

@body_lead On February 14, 2026 — Valentine's Day — Steinberger announced he was joining OpenAI and that OpenClaw would move to an independent open-source foundation, financially sponsored by OpenAI. This was widely described as an "acqui-hire": OpenAI acquired the talent without acquiring the open-source software itself.

@spacer 4

## What OpenClaw actually does

OpenClaw runs locally on your machine. You interact with it via a messaging app — Signal, Telegram, Discord, or WhatsApp. You send it a message with a task. It uses an LLM (Claude by default, or GPT or DeepSeek) to reason through the task and executes it using whatever tools and permissions you have given it.

What it can do depends on what you connect it to. Examples:

- → Read and send emails on your behalf
- → Browse the web and summarise findings
- → Manage your calendar
- → Write, edit, and commit code
- → Post to social media
- → Execute terminal commands
- → Interact with any service that has an API
@spacer 3

OpenClaw uses a "skills" system — modular capabilities stored as directories that can be installed from ClawHub, the community skill registry. Think of skills as apps for your AI agent.

@spacer 4

## The growth

@body_lead OpenClaw's growth was unprecedented. By February 2026 — just over two months after launch — it had 247,000 GitHub stars. By September it had passed 385,000, the sixth most-starred repository in GitHub's history, and over three million people were running it.

For context: Linux took decades to accumulate its GitHub stars. OpenClaw surpassed most long-standing projects in weeks and kept going. The 2.0 release in August, with native mobile apps and Windows support, turned it from a developer's tool into something ordinary people install.

The timing at launch was perfect. OpenClaw arrived just as Moltbook went viral — a social network built for AI agents. The two projects fed each other's growth: OpenClaw agents connecting to Moltbook, humans watching in fascination and horror.

@spacer 4

## Moltbook — the AI social network that made OpenClaw famous

On January 27, 2026 — the same day Clawdbot was renamed Moltbot — entrepreneur Matt Schlicht launched Moltbook: a social network built exclusively for AI agents.

The premise was wild: a Reddit-like platform where AI agents (not humans) create profiles, post content, and interact with each other. OpenClaw agents began autonomously discovering Moltbook, joining it, and posting — without their human owners necessarily knowing or intending this.

The internet went predictably insane. Wired ran a story: "I Infiltrated Moltbook, the AI-Only Social Network Where Humans Aren't Allowed." TechCrunch, CNBC, The Verge, and mainstream media followed.

Then things got worse. On January 31, an unsecured Supabase database exposed 6,000+ email addresses and 1 million+ agent interactions — and crucially, allowed anyone to take control of any agent on the platform. Security firm Wiz confirmed the vulnerability. Moltbook went offline briefly to patch it.

Then things got weirder. An OpenClaw agent autonomously created a dating profile on MoltMatch (an AI agent dating platform) and began screening romantic matches — without its human owner's knowledge or consent.

@body_lead Moltbook was acquired by Meta on March 10, 2026. Matt Schlicht and co-founder Ben Parr joined Meta Superintelligence Labs.

@spacer 4

## The security problems — read this before installing

@body_lead OpenClaw is powerful. It is also genuinely dangerous if used carelessly. This is not marketing caution. Multiple credible security researchers have documented real risks.

### Cisco's findings

Cisco's AI security research team tested a third-party OpenClaw skill called "What Would Elon Do?" They found it performed silent data exfiltration and prompt injection without user awareness. They also found the ClawHub skill repository lacked adequate vetting to prevent malicious skill submissions.

### Remote code execution vulnerabilities

Security firm Conscia disclosed a remote code execution chain and two additional command injection vulnerabilities in early 2026.

### The maintainer's own warning

One of OpenClaw's own maintainers, known as "Shadow," publicly warned on Discord: "If you can't understand how to run a command line, this is far too dangerous of a project for you to use safely."

### China bans it

In March 2026, Chinese authorities restricted state-run enterprises and government agencies from running OpenClaw apps on office computers.

The rule of thumb for OpenClaw: give it the minimum permissions it needs. Only install skills from trusted sources. Review its actions regularly. If you are not comfortable with the command line, start with something simpler.

@spacer 4

## OpenClaw vs Polsia vs Paperclip

@table keep 32,42,42,44
@tcells hs2,hs2,hs2,hs2|hs2,cs2,cs2,cs2|hs2,cs2,cs2,cs2|hs2,cs2,cs2,cs2|hs2,cs2,cs2,cs2|hs2,cs2,cs2,cs2|hs2,cs2,cs2,cs2|hs2,cs2,cs2,cs2
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_800
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
|  | OpenClaw | Polsia | Paperclip |
| Type | Personal AI agent | Managed company platform | Orchestration framework |
| Runs | Your machine or phone | Polsia's servers | Your servers |
| Cost | Free (+ LLM costs) | $20–1,000/mo + fees | Free (open source) |
| For | Personal automation | Launching AI companies | Multi-agent companies |
| Technical | Medium (CLI) | Low (no-code) | High (developer) |
| Open source | Yes (MIT) | No | Yes |
| LLMs | Any — Claude by default | Claude Opus | Claude Code + 7 others |

@spacer 4

## Where it stands now — the OpenClaw Foundation

The move to a foundation, announced when Steinberger joined OpenAI, has happened. OpenClaw is now governed by an independent non-profit with a board chaired by Dave Morin, the founder of Path. OpenAI remains a financial sponsor — an arrangement that still gives one of the world's most powerful AI companies influence over the most popular open-source agent, though the board structure now sits between the two.

Development has not slowed. OpenClaw 2.0 shipped on 30 August 2026 with native iPhone, iPad and Android apps and a rebuilt skills system. Security improved in specific ways: an approval is now tied to the exact request, command, session and person it was granted for, rather than becoming a standing permission, and protected credentials can reach the services that need them without ever appearing in text the model can read. Prompt injection, as everywhere in the agentic economy, is not solved.

OpenClaw is the reference implementation for what a personal AI agent looks like, and the benchmark every competitor — including Meta's Muse — is measured against. It is also hired into Paperclip org charts as a worker, which makes it one of the few agents that lives in both the personal and the company layer.

@spacer 4

## Glossary

@gl <b>OpenClaw</b> — Free, open-source autonomous AI agent. Runs on your machine or phone, connects via messaging apps. Created by Peter Steinberger, November 2025; governed by the OpenClaw Foundation since 2026.

@gl <b>Clawdbot / Moltbot</b> — Previous names for OpenClaw. Clawdbot was the original name; Moltbot followed after Anthropic trademark complaints.

@gl <b>Peter Steinberger</b> — Austrian developer who created OpenClaw. Co-founded PSPDFKit. Joined OpenAI February 2026.

@gl <b>Acqui-hire</b> — When a company hires a founder or team without technically acquiring their product. OpenAI hired Steinberger; OpenClaw remained open source.

@gl <b>Moltbook</b> — A social network for AI agents. Launched January 2026; its founders joined Meta in March 2026.

@gl <b>ClawHub</b> — The community skill registry for OpenClaw — modular capabilities that can be installed to extend the agent.

@gl <b>Skills</b> — Modular capabilities for OpenClaw stored as directories containing a SKILL.md file.

@gl <b>Prompt injection</b> — A security attack where malicious instructions are hidden in data an agent reads. Found in OpenClaw skills by Cisco.

@gl <b>MIT License</b> — An open-source licence allowing anyone to use, modify, and distribute the software freely.

@gl <b>MoltMatch</b> — An experimental AI agent dating platform where OpenClaw agents were creating profiles without user knowledge.

@spacer 6

@pagebreak

## Liked this? Go deeper.

OpenClaw is one part of the story. Here is the rest.

@spacer 4
