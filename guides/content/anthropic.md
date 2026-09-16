---
slug: 'anthropic'
title: 'WTF is Anthropic'
file: 'wtf-is-anthropic.pdf'
cover_title: 'WTF is'
cover_subtitle: 'Anthropic?'
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  Founded by people who left OpenAI over safety. Now the most valuable private company in
  the world, heading for the largest IPO in history, and the lab whose model sits inside
  half the agents in this series — including its rivals' products.

# store catalogue fields
order: 7
description: 'The company behind Claude. Founding story, the safety mission, the trillion-dollar valuation, and why its model powers so much of the agentic economy.'
price: 7
category: 'claude'
badge: null
featured: false
starter: false
related: ['claude', 'claude-code']
---
## The one-liner

@body_lead Anthropic is an AI safety company that builds some of the most powerful AI models in the world — the Claude family — while arguing, in public and in its own research, that models like these could be among the most dangerous technologies ever created.

That is not a contradiction. It is the founding bet: if powerful AI is coming regardless, better to have a safety-focused lab at the frontier than to leave the frontier to labs that are not. In 2026 that bet paid off in a way nobody predicted.

@spacer 4

## By the numbers — September 2026

Everything in this box will be out of date within months. Everything below it is built to last longer.

@stat $965B || valuation after the $65B Series H in May 2026 — the largest private funding round in history
@stat $380B → $965B || the valuation jump between February and May 2026, three months apart
@stat $65B || annualised revenue run rate by late July 2026, up from roughly $9B at the end of 2025
@stat 1 June || 2026: confidential S-1 filed with the SEC. An October listing has been widely reported, not confirmed
@stat ~2,300 || employees, up from about 1,100 in 2024
@stat 8 of 10 || Fortune 10 companies are Claude customers
@stat 1,000+ || enterprises spending more than $1M a year on Anthropic products
@stat 2021 || founded, San Francisco. Structured as a Public Benefit Corporation

@spacer 4

## The founding story — the OpenAI exodus

In 2021 a group of senior researchers left OpenAI, then the most prominent AI lab in the world, over disagreements about direction. The core concern: as OpenAI became more commercial, some believed it was prioritising speed and capability over safety.

The group was led by siblings Dario Amodei, then OpenAI's VP of Research, and Daniela Amodei, its VP of Operations. They left with Tom Brown (lead author of the GPT-3 paper), Chris Olah (the field's leading interpretability researcher), Jack Clark, Jared Kaplan, Sam McCandlish and others.

@body_lead They founded Anthropic with a stated mission: the responsible development and maintenance of advanced AI for the long-term benefit of humanity.

They structured it as a Public Benefit Corporation, which legally allows the company to weigh its mission alongside shareholder returns, and later added a Long-Term Benefit Trust with the power to appoint board members. Whether those structures hold under trillion-dollar pressure is one of the open questions of the decade.

@spacer 4

## The scale — from research lab to the most valuable startup on earth

For its first four years Anthropic was the smaller, more careful rival. Then Claude Code happened.

Launched to developers in early 2025, Claude Code became the tool that turned Claude from a chatbot into an agent that does work. Developers adopted it faster than any coding tool before it. Cowork, launched in January 2026, brought the same capability to everyone else. Revenue followed the products: roughly $9 billion annualised at the end of 2025, $30 billion by April, $47 billion when the Series H closed in May, $65 billion by the end of July.

The Series H itself — $65 billion led by Altimeter, Dragoneer, Greenoaks and Sequoia, with Amazon, Capital Group, Fidelity and T. Rowe Price participating — valued the company at $965 billion, above OpenAI's $852 billion from two months earlier. Nine days later Anthropic filed confidentially for an IPO. Reports point to October 2026 and a target valuation that would make it the largest listing ever. None of that is confirmed by the company.

Amazon, Google and Nvidia remain major backers. Claude is available through AWS Bedrock, Google Cloud Vertex AI and Microsoft Foundry, which means it runs inside every major cloud, including the one owned by OpenAI's biggest investor.

@spacer 4

## What makes Anthropic different

### Safety is the founding purpose, not a department

Every lab talks about safety. Anthropic was created because of it. A large share of its research output is interpretability (understanding what is happening inside a model) and alignment (making sure a model pursues the goals its operator intends). It publishes a Responsible Scaling Policy that ties deployment decisions to measured capability levels, and it has held back or gated models under it.

### Constitutional AI

Anthropic's core training technique. Instead of relying only on human feedback, the model is given a set of written principles and trained to critique and revise its own outputs against them. The result is a model whose behaviour is more consistent and more predictable at the edges, which matters enormously when that model is running as an agent for hours with nobody watching.

### The Fable / Mythos split

In 2026 Anthropic did something no lab had done before: it split one model into two products by safeguard level. Mythos-class models sit above the Opus tier in capability. The public version, Claude Fable, ships with classifiers that refuse dangerous cybersecurity and biology requests. The same model with those safeguards lifted, Claude Mythos, is available only to vetted organisations through Project Glasswing — a programme run with the US government, launched in April 2026 with AWS, Apple, Google, Microsoft and CrowdStrike, and expanded in June to around 150 organisations including NATO and the EU's cybersecurity agency. Their job: use the model to find and fix vulnerabilities in critical software before attackers do.

That is a new shape for the industry. Frontier capability gated by who you are and what you are for, rather than released to everyone or nobody.

### MCP — the plug the whole industry uses

In November 2024 Anthropic published the Model Context Protocol, an open standard letting any AI agent connect to any tool or data source. Within a year every major lab had adopted it. Anthropic then gave it away, donating MCP to the Agentic AI Foundation under the Linux Foundation, co-founded with OpenAI and Block. The plumbing of the agentic economy is Anthropic's design and nobody's property.

@spacer 4

## The products

Everything is built around Claude.

@prod <b>Claude</b> — The model family. Fable 5.1 at the top, Opus 5, Sonnet 5, Haiku 4.5. See the WTF is Claude guide.

@prod <b>Claude Code</b> — The autonomous coding agent that changed the company's trajectory. Terminal, desktop app, mobile. See the WTF is Claude Code guide.

@prod <b>Cowork</b> — The agent for everyone else. Works in your files, apps and browser without a command line. See the WTF is Cowork guide.

@prod <b>Claude.ai</b> — The chat interface, web and mobile. Free tier; Pro, Max, Team and Enterprise plans above it.

@prod <b>Claude in Chrome, Excel, PowerPoint, Word and Outlook</b> — Claude working inside the tools people already use.

@prod <b>Claude Tag</b> — Claude inside Slack. Tag it into a thread and delegate the task.

@prod <b>The Claude Developer Platform and Agent SDK</b> — The API and the framework other companies build their own agents on.

@prod <b>Amazon Bedrock, Google Vertex AI, Microsoft Foundry</b> — Claude inside every major cloud.

@spacer 4

## The honest tension

@body_lead Anthropic says AI may be one of the most dangerous technologies in human history, and then builds it anyway, and is now worth close to a trillion dollars for doing so.

Dario Amodei has been explicit about this: a company that may be building something profoundly dangerous, pressing forward because the alternative is leaving the frontier to others. Critics point out that this logic can justify almost anything, and that a public listing brings quarterly pressure that no benefit-corporation charter fully insulates against. Supporters point to the research record, the Responsible Scaling Policy, the Glasswing gating and the fact that Anthropic has repeatedly shipped later and more cautiously than rivals — and still won.

The honest answer: Anthropic is probably the most safety-focused lab at the frontier. Whether that is enough, given how fast the frontier is moving, is the question that matters, and no one can answer it yet.

@spacer 4

## Why Anthropic matters for the agentic economy

Anthropic's fingerprints are on almost everything in this series.

- → <b>Claude</b> is the default model in OpenClaw, the most-used open-source personal agent.
- → <b>Microsoft's Copilot Cowork</b> — Microsoft's flagship agent for 365 — runs on Claude, despite Microsoft's $13 billion stake in OpenAI.
- → <b>Polsia's</b> founder chose Claude Opus to run the agents that run his companies.
- → <b>Claude Code</b> is the developer agent inside Paperclip and thousands of AI-run companies.
- → <b>MCP</b> is how every agent in this series connects to its tools.
@spacer 3

You can use the agentic economy without ever thinking about Anthropic. But you will almost certainly be using something it built.

@spacer 4

## The key people

@person <b>Dario Amodei</b> — CEO and co-founder. Former VP of Research at OpenAI. The public face, and the author of the essays that set the company's tone.

@person <b>Daniela Amodei</b> — President and co-founder. Former VP of Operations at OpenAI. Runs the business.

@person <b>Chris Olah</b> — Co-founder. The world's leading mechanistic interpretability researcher.

@person <b>Tom Brown</b> — Co-founder. Lead author of the GPT-3 paper.

@person <b>Jared Kaplan</b> — Co-founder. Discovered the scaling laws that guide how all labs train models.

@person <b>Ami Vora</b> — Chief Product Officer since January 2026, when Mike Krieger, co-founder of Instagram, moved to Anthropic's Labs group after two years in the role.

@spacer 4

## Glossary

@gl <b>Anthropic</b> — AI safety company founded in 2021 by former OpenAI researchers. Builder of Claude. Public Benefit Corporation.

@gl <b>Constitutional AI</b> — Anthropic's training technique: give the model written principles and train it to judge its own outputs against them.

@gl <b>Interpretability</b> — Research into what is happening inside a model and why it produces the outputs it does.

@gl <b>Alignment</b> — Ensuring an AI pursues the goals its operator actually intends.

@gl <b>Responsible Scaling Policy</b> — Anthropic's public framework tying deployment decisions to measured capability and risk levels.

@gl <b>Mythos-class</b> — The model tier above Opus. Fable is the safeguarded public version; Mythos is the restricted one.

@gl <b>Project Glasswing</b> — Anthropic's vetted-access programme, run with the US government, giving cyberdefenders the unrestricted model to secure critical software.

@gl <b>MCP (Model Context Protocol)</b> — The open standard connecting agents to tools. Invented by Anthropic, donated to the Agentic AI Foundation.

@gl <b>Public Benefit Corporation</b> — A corporate structure that lets a company weigh its stated mission alongside shareholder profit.

@gl <b>Run rate</b> — Recent revenue extrapolated to a full year. The figure labs quote; not the same as audited annual revenue.

@gl <b>S-1</b> — The document a company files with the SEC before going public. Anthropic filed one confidentially on 1 June 2026.

@spacer 6

@pagebreak

## Liked this? Go deeper.

Anthropic is the company. Here are the model, the agents and the ecosystem around it.

@spacer 4
