---
slug: 'openclaw'
title: 'WTF is OpenClaw'
file: 'wtf-is-openclaw.pdf'
cover_title: 'WTF is'
cover_subtitle: 'OpenClaw?'
cover_meta: 'WTF Agents · wtfagents.com · March 2026'
subtitle: >-
  One Austrian developer. One open-source project. Three name changes in 60 days. 247,000
  GitHub stars. A hire by OpenAI. Dating profiles created without consent. China banning
  it from government offices. This is the wildest story in tech right now.

# store catalogue fields
order: 5
description: 'The open source alternative taking on Polsia. Self-hosted, community-driven, and growing fast.'
price: 7
category: 'platforms'
badge: null
featured: false
relatedTool: 'openclaw'
related: ['paperclip', 'ai-agent']
starter: false
---
## The one-liner

@body_lead OpenClaw is a free, open-source autonomous AI agent that runs on your computer and takes instructions via messaging apps — Signal, Telegram, Discord, WhatsApp — connecting to Claude, GPT, or DeepSeek to carry out multi-step tasks on your behalf.

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

## The GitHub explosion

@body_lead OpenClaw's growth on GitHub was unprecedented. By February 2, 2026 — just over two months after launch — it had 247,000 stars and 47,700 forks.

For context: Linux has taken decades to accumulate its GitHub stars. OpenClaw surpassed many major long-standing projects in weeks. One LinkedIn analysis described it as "the fastest-growing GitHub repo in history" — though this specific claim is difficult to verify independently.

The timing was perfect. OpenClaw launched just as Moltbook went viral — a social network built for AI agents. The two projects fed each other's growth: OpenClaw agents connecting to Moltbook, humans watching in fascination and horror.

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
| Runs | On your machine | On Polsia servers | On your servers |
| Cost | Free (+ LLM costs) | $50/mo + 20% revenue | Free (open source) |
| For | Personal automation | Launching AI companies | Multi-agent companies |
| Technical | Medium (CLI) | Low (no-code) | High (developer) |
| Open source | Yes (MIT) | No | Yes |
| LLMs | Claude, GPT, DeepSeek | Not disclosed | Claude Code + others |

@spacer 4

## What happens now — the OpenClaw Foundation

With Peter Steinberger at OpenAI, OpenClaw's future lies with the independent open-source foundation he established before leaving. OpenAI is the financial sponsor — an unusual arrangement that gives the world's most powerful AI company influence over the most popular open-source agent project.

The community continues to grow. The ClawHub skills ecosystem is expanding. Security is being addressed (slowly). OpenClaw remains the reference implementation for what a personal AI agent can look like — and the benchmark against which all competitors are measured.

@spacer 4

## Glossary

@gl <b>OpenClaw</b> — Free, open-source autonomous AI agent. Runs locally, connects via messaging apps. Created by Peter Steinberger, November 2025.

@gl <b>Clawdbot / Moltbot</b> — Previous names for OpenClaw. Clawdbot was the original name; Moltbot followed after Anthropic trademark complaints.

@gl <b>Peter Steinberger</b> — Austrian developer who created OpenClaw. Co-founded PSPDFKit. Joined OpenAI February 2026.

@gl <b>Acqui-hire</b> — When a company hires a founder or team without technically acquiring their product. OpenAI hired Steinberger; OpenClaw remained open source.

@gl <b>Moltbook</b> — A social network for AI agents. Launched January 2026. Acquired by Meta March 2026.

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
