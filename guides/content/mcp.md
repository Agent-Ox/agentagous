---
slug: 'mcp'
title: 'WTF is MCP'
file: 'wtf-is-mcp.pdf'
cover_title: 'WTF is'
cover_subtitle: 'MCP?'
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  The plug that lets any AI agent use any tool. Invented by Anthropic, adopted by every
  rival, given away to a foundation, and now downloaded a hundred million times a month.
  What it is, why it matters, and what it does not solve.

# store catalogue fields
order: 4
description: 'The Model Context Protocol, explained. The universal plug between agents and tools: what it is, who runs it now, and the security catch.'
price: 7
stripe_price_id: 'price_1UHOeRBaLipfLqFsyKMRNVGS'
category: 'foundation'
badge: null
featured: false
starter: true
related: ['api', 'ai-agent']
# Bare mentions of these link here, once per guide.
link_terms: ['MCP']
hook: "USB-C for AI. *Every agent in this series uses it.*"
best_for: "Best for: how agents use tools"
capability: "Governance and security"
---
## The one-liner

@body_lead MCP, the Model Context Protocol, is an open standard that lets any AI model connect to any tool, file, database or service through one common plug. Before it, every connection between an agent and a system was custom-built. After it, a tool built once works with every agent.

The usual analogy is USB-C, and it is accurate: one port, any device. It is the reason OpenClaw can use your calendar, Cowork can read your files, Paperclip can hand work between agents from different vendors, and a Polsia company can take payments. Every agent in this series speaks it.

@spacer 4

## By the numbers — September 2026

@stat Nov 2024 || Anthropic publishes MCP as an open standard
@stat Dec 2025 || Anthropic donates it to the Agentic AI Foundation under the Linux Foundation, co-founded with OpenAI and Block
@stat 97M || monthly downloads of the official Python and TypeScript libraries by March 2026
@stat 10,000+ || public MCP servers by mid-2026, up from a few hundred in the first months
@stat 300+ || MCP clients — apps that can use those servers, from Claude and ChatGPT to Cursor and VS Code
@stat 30+ || security vulnerabilities filed against MCP servers and clients in January and February 2026 alone
@stat 2 || open standards now under the foundation: MCP for agent-to-tool, A2A for agent-to-agent

@spacer 4

## The problem it solved

An AI model on its own can only read what you type and write text back. To be an agent it has to reach things: your inbox, a spreadsheet, a database, a browser, a payment system.

Until late 2024 that meant a custom integration for every pair. Connect Claude to Slack: one piece of code. Connect GPT to Slack: another. Connect either to your CRM: two more. The number of integrations grew as models times tools, and every company building an agent rebuilt the same connectors.

@body_lead MCP turned the multiplication into addition. A tool exposes itself once, as an MCP server. Any model that speaks MCP can use it. Slack builds one server; every agent gets Slack.

@spacer 4

## How it works — the three parts

@table keep 30,130
@tcells hs-row+col
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
| Part | What it is |
| Host | The app you are using: Claude, ChatGPT, Cursor, OpenClaw. It runs the model. |
| Client | The connector inside the host that speaks MCP to one server. |
| Server | The tool side: a small program that exposes a system — GitHub, Google Drive, Stripe, your own database — as things an agent can do. |

@spacer 4

When a session starts, the host asks each connected server what it offers. A server answers with three kinds of thing: tools (actions it can take, like "send an email" or "run a query"), resources (data it can hand over, like a file or a record) and prompts (templates for common jobs). The model reads the list, decides what it needs, and calls it. Results come back in a form the model can read, and the loop continues.

The server can also flag what a tool does — read-only, or destructive — so the host can ask you before anything irreversible. Since the November 2025 version of the standard, servers on the internet authenticate with OAuth, the same login handshake your apps already use, and long jobs can run in the background and report back.

@spacer 4

## Who runs it now

Anthropic invented MCP and, unusually, gave it away. In December 2025 it donated the standard to the Agentic AI Foundation, a directed fund under the Linux Foundation, co-founded with OpenAI and Block and backed by Google, Microsoft, AWS, Cloudflare and Bloomberg. Changes now go through public working groups and written proposals, the way internet standards do.

Google's A2A protocol — Agent2Agent, the standard for agents from different companies talking to each other — joined it under the same foundation. Together they are the two layers of agent plumbing: MCP connects an agent to tools, A2A connects agents to each other, and no single company owns either.

For anyone building on agents this is the point: the connectors you build are not hostage to one vendor's roadmap. A server written for Claude works in ChatGPT, Cursor, OpenClaw and whatever ships next.

@spacer 4

## Where you meet it

You have probably used MCP without seeing the name.

- → <b>Connectors in Claude and ChatGPT.</b> When you link Gmail, Drive or Slack to a chat app, that is an MCP server on the other end.
- → <b>Cowork and ChatGPT Work.</b> The apps they reach into, and the built-in browser, are MCP servers.
- → <b>Claude Code, Codex, Cursor.</b> Developer tools use MCP to reach documentation, databases and deployment systems. This is where adoption is deepest.
- → <b>OpenClaw and Paperclip.</b> Skills and adapters are MCP servers under another name; Paperclip itself exposes an MCP server so other tools can drive it.
- → <b>Registries.</b> The official registry and GitHub's list the public servers, ten thousand and counting: an app store for agent capabilities.
@spacer 3

@spacer 4

## The catch — a plug is not a lock

@body_lead MCP standardised how agents connect to things. It did not standardise who is allowed to connect to what, and the gap between those two sentences is where the security problems live.

Over thirty vulnerabilities were filed against MCP servers and clients in the first two months of 2026, one rated near the top of the severity scale. The recurring shapes:

- → <b>Tool poisoning.</b> A malicious server describes its tool one way and does another, or hides instructions in the description the model reads. Cisco found OpenClaw skills doing exactly this.
- → <b>Prompt injection through data.</b> A document or web page the agent fetches through MCP contains instructions the agent follows. Still the unsolved problem of the whole field.
- → <b>Over-broad access.</b> An agent connected to email, files and payments through a dozen servers is one bad instruction away from using all of them.
- → <b>Untrusted servers.</b> Ten thousand public servers means ten thousand pieces of code someone wrote. Registries list them; they do not vet them all.
@spacer 3

The standard has responded — OAuth for remote servers, security requirements for clients, tool annotations — and enterprise vendors sell gateways that sit in front of MCP to enforce permissions and log every call. For a normal person the rules are the same as for any agent: connect the minimum, prefer official servers, and keep a human approval in front of anything that spends or sends.

@spacer 4

## Why it matters

Standards are boring until they are not. TCP/IP made the internet possible by letting any computer talk to any other. MCP is doing that for agents: any model, any tool, one protocol, no permission needed from anyone. That it was invented by one lab and now belongs to a foundation backed by all of its rivals is the rare case of an industry agreeing to share the plumbing so it can compete on what runs through it.

If you build anything on agents, build it on MCP. If you only use agents, you already are.

@spacer 4

## Glossary

@gl <b>MCP (Model Context Protocol)</b> — The open standard for connecting AI models to tools, data and services. Anthropic, November 2024; Agentic AI Foundation since December 2025.

@gl <b>Host</b> — The application running the model and the MCP clients: Claude, ChatGPT, Cursor, OpenClaw.

@gl <b>Client</b> — The connector inside a host that talks to one MCP server.

@gl <b>Server</b> — A program that exposes a system to agents through MCP: tools, resources and prompts.

@gl <b>Tool</b> — An action a server offers: send, query, create, run.

@gl <b>Resource</b> — Data a server offers: a file, a record, a page.

@gl <b>Annotation</b> — A hint attached to a tool, such as read-only or destructive, so a host can ask before acting.

@gl <b>Registry</b> — A directory of public MCP servers. The official one and GitHub's are the largest.

@gl <b>Agentic AI Foundation (AAIF)</b> — The Linux Foundation body that governs MCP and A2A. Co-founded by Anthropic, OpenAI and Block.

@gl <b>A2A (Agent2Agent)</b> — Google's standard for agents talking to each other; MCP's sibling under the foundation.

@gl <b>Tool poisoning</b> — A malicious server misdescribing what its tool does, or hiding instructions in the description.

@gl <b>OAuth</b> — The standard login handshake; required for MCP servers on the internet since the November 2025 spec.

@spacer 6

@pagebreak

## Liked this? Go deeper.

MCP is the plug. Here is what plugs into it.

@spacer 4
