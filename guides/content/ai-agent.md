---
slug: 'ai-agent'
title: 'WTF is an AI Agent'
file: 'wtf-is-an-ai-agent.pdf'
cover_title: 'WTF is an'
cover_subtitle: 'AI Agent?'
cover_gap: 3
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  Everyone is talking about AI agents. Almost nobody is explaining them properly. This
  guide fixes that — in plain English, with real examples, no jargon.

# store catalogue fields
order: 1
description: 'What an agent actually is, how it thinks, the main types, real examples, and the risks. The foundation for everything else in the series.'
price: 7
category: 'foundation'
badge: null
featured: false
starter: true
related: ['agentic-economy', 'openclaw']
---
## The one-liner

@body_lead An AI agent is a software system that pursues goals autonomously — taking actions, using tools, adapting to results, and repeating — without a human directing every step.

Not a chatbot. Not a search engine. Not autocomplete. An agent is the difference between asking someone a question and hiring someone to get something done.

@spacer 4

## The simplest possible explanation

Imagine you want to book a holiday. Here is how three different types of AI would handle that:

### A chatbot (like early ChatGPT):

You ask: "What are some good hotels in Barcelona?" It gives you a list. You ask a follow-up. It answers. It has no memory of your previous question. It cannot actually book anything. It stops the moment you stop talking.

### An AI assistant (like Siri or Alexa):

You say: "Book me a hotel in Barcelona." It might open a browser or app for you. But it is essentially a shortcut — it is still relying on you to confirm every action. It does not go off and research options, compare prices, read reviews, and come back with a recommendation.

### An AI agent:

You say: "Find me a good hotel in Barcelona for next weekend, under £200 a night, close to the Gothic Quarter, with good reviews." The agent goes away. It browses hotel sites, reads reviews, checks availability, compares prices, filters by your criteria, and comes back with three specific options — or just books the best one if you told it to. You were not involved in any of those steps.

@body_lead That is an AI agent.

@spacer 4

## The five properties of an AI agent

Every AI agent, regardless of what it does, has five core properties that distinguish it from simpler AI tools:

### 1. Goal-directed

An agent works toward an outcome, not just a response. You give it a goal — "grow our newsletter list by 20%" — and it figures out the steps. A chatbot gives you advice on how to grow a newsletter. An agent actually does it.

### 2. Autonomous action

An agent takes actions in the world — browsing websites, writing and running code, sending emails, making API calls, filling in forms. It is not just producing text. It is doing things.

### 3. Memory and context

An agent remembers what it has done. It knows it sent an email yesterday and will not send it again today. It knows it already tried option A and failed, so it tries option B. Traditional AI has no memory between sessions.

### 4. Tool use

Agents are connected to tools — web browsers, code interpreters, email clients, calendars, databases, payment processors. The more tools an agent has access to, the more it can do. The Model Context Protocol (MCP), invented by Anthropic, is the open standard that lets agents connect to any tool.

### 5. Feedback loops

Agents check their own results. Did the email bounce? Try a different address. Did the code fail? Read the error and fix it. Did the ad campaign underperform? Adjust the targeting. This self-correction loop is what makes agents genuinely autonomous.

@spacer 4

## How an agent actually thinks

At the core of every AI agent is a Large Language Model (LLM) — the same technology behind ChatGPT and Claude. But the LLM is just the brain. What makes it an agent is the loop it runs:

@table keep 30,130
@tcells hs-row+col
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
| Step | What happens |
| Receive goal | The agent is given an objective: "Write and schedule five social media posts for this week." |
| Plan | The LLM breaks the goal into steps: research trending topics, draft posts, select images, schedule via the social media API. |
| Act | The agent executes step one: browses trending topics using its web tool. |
| Observe | It reads the results and decides what is relevant. |
| Reflect | It considers whether its approach is working. If step one produced poor results, it adjusts. |
| Repeat | It continues through the steps until the goal is complete — or it hits a problem it cannot solve and asks for human input. |

@spacer 4

This loop — plan, act, observe, reflect, repeat — is called the "ReAct" pattern (Reasoning + Acting). It is the foundation of almost every production AI agent in 2026.

@spacer 4

## The main types of AI agent

Not all agents are the same. Here are the main categories you will encounter:

### Personal agents

Run for you, on your machine or in an app. Examples: OpenClaw (open-source, talks to you over WhatsApp, Telegram or Signal), Meta's Muse (books, buys and negotiates on your behalf). These agents handle your life's admin.

### Work agents

Do your job's tasks. Every major lab now sells one: Anthropic's Cowork, OpenAI's ChatGPT Work, xAI's Grok Bot, Microsoft's Copilot Cowork. Give them an outcome — a report, a spreadsheet, a cleared inbox — and they come back with it done.

### Coding agents

The category that proved agents work. Claude Code, OpenAI's Codex, Cognition's Devin, Google's Jules. They read a codebase, change it, test it and commit, without step-by-step instruction.

### Business process agents

Embedded into a specific business function. Salesforce's Agentforce handles customer service and sales tasks inside its CRM; a wave of "AI sales rep" and "AI support rep" products do the same as standalone hires.

### Company-building agents

The most ambitious category. Platforms like Polsia and NanoCorp deploy a whole team of agents that found and run a company — website, marketing, outreach, support, finance — with no human doing the work.

### Orchestration agents

Agents that manage other agents. Paperclip is the clearest example: an org chart of agents with roles, budgets and reporting lines, coordinating to run a business together.

### Research agents

Given a topic, they browse dozens of sources, extract facts, cross-check and produce a structured report — in minutes rather than hours. Most chat products now have one built in.

@spacer 4

## Real agents doing real things right now

### OpenClaw — the personal agent that became a movement

Created by Austrian developer Peter Steinberger and launched in late 2025, OpenClaw runs on your own machine and takes instructions over messaging apps. By September 2026 it had over three million active users, its own non-profit foundation with a board, native mobile apps, and a place among the most-starred projects in GitHub's history. It also produced the first famous agent misbehaviour stories, covered below.

### Cowork, ChatGPT Work and Grok Bot — the year of the work agent

Between January and September 2026, Anthropic, OpenAI and xAI each launched an agent that does whole jobs rather than answering questions about them. Cowork works inside your files and apps. ChatGPT Work takes an outcome and returns finished spreadsheets, decks and apps hours later. Grok Bot gives each agent its own cloud computer and logins and coordinates a team of them under a "Chief of Staff." Microsoft's Copilot Cowork, built on Claude, brought the same thing to Microsoft 365.

### Claude Code — the autonomous developer

Anthropic's Claude Code reads entire codebases, writes and edits code, runs tests, fixes bugs and commits — autonomously. It became the fastest-adopted developer tool of its generation and the main reason Anthropic's revenue multiplied several times over in 2026. Its remote version topped the standard software-engineering benchmark in the spring.

### Polsia — agents running whole companies

Polsia's agents have created close to half a million companies since late 2025: a website, product, marketing, outreach and support each, with no human doing the work. About 6% survive and the founder says one in ten has earned a dollar. It is the clearest demonstration in the world of both what agents can build and what they cannot: customers.

### Agents in enterprise customer service

Salesforce's CEO has said its support headcount fell from roughly 9,000 to 5,000 as agents took over the routine work. IBM replaced around 200 HR roles with agents. These are the deployments that get quoted in board meetings, and they are why the jobs question in the Agentic Economy guide matters.

@spacer 4

## The building blocks — what makes agents possible

Three things came together to make AI agents viable in 2024–2026:

### 1. LLMs got good enough

The underlying AI models — Claude, GPT, Gemini, Grok, Muse, DeepSeek — became capable enough to reason through multi-step problems reliably and, crucially, to notice when they were going wrong. Earlier models got confused, hallucinated, or went in circles. The current generation handles complex, ambiguous tasks with enough reliability to be left alone for hours. The exact scores change every quarter; the shift from "answers questions" to "finishes jobs" does not.

### 2. Tool use became standardised

Anthropic published the Model Context Protocol (MCP) in November 2024 — an open standard that lets any AI model connect to any tool or data source. Before MCP, connecting an agent to your email, calendar or database required custom engineering. After MCP, it is plug-and-play. Google followed with the Agent2Agent (A2A) protocol in 2025, letting agents from different companies communicate. MCP now lives under the neutral Agentic AI Foundation. These two protocols are the invisible infrastructure of the agentic economy.

### 3. The cost of compute collapsed

Running an AI agent continuously used to cost hundreds of dollars a day. As of 2026, a capable agent costs a few dollars a day to run, and open-weight models from China and elsewhere push it lower still — to the point where a single person can run several agents simultaneously for the cost of a few software subscriptions.

@spacer 4

## The risks — what can go wrong

Agents are powerful. They are also genuinely risky if used carelessly. Here is what you need to know:

### Prompt injection

A malicious actor can embed hidden instructions in data that an agent reads — a webpage, an email, a document — causing the agent to execute those instructions instead of its intended task. It remains the main unsolved security problem for agents. Cisco found third-party OpenClaw skills silently exfiltrating data in early 2026; Meta's own staff flagged security failures in Muse days before its launch.

### Overly broad permissions

Agents need access to tools to be useful. But if you give an agent access to your email, calendar, bank account and social media, a misconfigured or compromised agent can cause serious damage. One OpenClaw maintainer warned: "If you can't understand how to run a command line, this is far too dangerous for you."

### Hallucination in action

LLMs sometimes produce confident but wrong outputs. When a chatbot hallucinates, you read a wrong answer. When an agent hallucinates, it might send a wrong email, submit a wrong form, or delete the wrong file.

### Loss of control

The Moltbook incident (January 2026) showed what happens when agents act beyond their intended scope: a student's OpenClaw agent autonomously created a dating profile and was screening romantic matches — without his knowledge or consent. Polsia users have reported agents sending cold emails to real contacts and making public posts without approval.

@body_lead The rule of thumb: give agents the minimum permissions they need to do their job. Review their actions regularly. Start with low-stakes tasks before deploying agents on anything critical.

@spacer 4

## How to think about agents — the mental model

@body_lead The most useful mental model for AI agents is not "software." It is "staff."

You would not give a brand new employee access to your entire company the first day. You would not give them a vague goal and no check-ins. You would not trust them to make major decisions without oversight — until they had earned it.

Apply the same thinking to agents. Start small. Define the goal precisely. Give them limited access. Review their outputs. Build trust incrementally. The people winning with AI agents right now are the ones treating them like capable but junior colleagues — not magic or threats.

@spacer 4

## Glossary

@gl <b>AI Agent</b> — A software system that pursues goals autonomously — taking actions, using tools, checking results, and adapting without constant human instruction.

@gl <b>LLM (Large Language Model)</b> — The AI brain at the core of most agents. Examples: Claude (Anthropic), GPT (OpenAI), Gemini (Google), Muse (Meta), Grok (xAI), DeepSeek.

@gl <b>ReAct</b> — The "Reasoning + Acting" loop that most agents run: plan → act → observe → reflect → repeat.

@gl <b>MCP (Model Context Protocol)</b> — The open standard for connecting AI agents to external tools and data. The "USB-C for AI." Invented by Anthropic, now under the Agentic AI Foundation.

@gl <b>A2A (Agent2Agent Protocol)</b> — Google's open standard for AI agents from different companies to communicate.

@gl <b>Tool use</b> — An agent's ability to interact with external systems — web browsers, code interpreters, email, databases, APIs.

@gl <b>Prompt injection</b> — A security attack where malicious instructions are hidden in data that an agent reads, causing it to execute those instructions.

@gl <b>Orchestration</b> — The coordination of multiple agents working together — like a Paperclip "org chart" where different agents have different roles.

@gl <b>Work agent</b> — An agent that does your job's tasks: Cowork, ChatGPT Work, Grok Bot, Copilot Cowork.

@gl <b>Autonomous</b> — Operating without human control or supervision on a task-by-task basis.

@gl <b>OpenClaw</b> — The most-used open-source personal AI agent. Created by Peter Steinberger, late 2025; now run by a non-profit foundation.

@gl <b>Claude Code</b> — Anthropic's autonomous coding agent. Reads codebases, writes code, runs tests, commits to Git — without step-by-step human instruction.

@spacer 6

@pagebreak

## Liked this? Go deeper.

This guide explained what agents are. The WTF Agents series goes deep on the specific platforms and tools that are building the agentic economy right now.

@spacer 4
