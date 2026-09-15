---
slug: 'ai-agent'
title: 'WTF is an AI Agent'
file: 'wtf-is-an-ai-agent.pdf'
cover_title: 'WTF is an'
cover_subtitle: 'AI Agent?'
cover_gap: 3
cover_meta: 'WTF Agents · wtfagents.com · March 2026'
subtitle: >-
  Everyone is talking about AI agents. Almost nobody is explaining them properly. This
  guide fixes that — in plain English, with real examples, no jargon.

# store catalogue fields
order: 1
description: 'Everyone is talking about agents. Nobody is explaining them properly. This guide does.'
price: 7
category: 'foundation'
badge: null
featured: false

read_next:
  - title: 'WTF is the Agentic Economy'
    desc: 'The big picture. Market size, big players, real numbers. Start here if you haven''t already.'
    url: 'wtfagents.com/store'
  - title: 'WTF is OpenClaw'
    desc: 'The viral open-source agent. 247K GitHub stars, security controversies, and what it actually does.'
    url: 'wtfagents.com/store'
  - title: 'WTF is Claude'
    desc: 'The AI powering most of the agents in this guide. What it is, how it works, why it leads.'
    url: 'wtfagents.com/store'
  - title: 'WTF is an LLM'
    desc: 'The deep dive on the brain inside every agent. Plain English, no maths.'
    url: 'wtfagents.com/store'
  - title: 'WTF is Cowork'
    desc: 'Claude Code was for developers. Cowork is for everyone else. The product that wiped $285B off enterprise software stocks.'
    url: 'wtfagents.com/store'
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

### Personal AI agents

Run on your own machine or device. Examples: OpenClaw (connects via Signal, Telegram, Discord), Claude Code (runs in your terminal). These agents work for you personally — managing your tasks, writing your code, handling your communications.

### Business process agents

Embedded into business workflows. Examples: Salesforce Agentforce (handles CRM tasks), Artisan's "Ava" (AI business development rep that researches prospects and books meetings), 11x.ai's digital workers (AI sales reps). These agents automate specific business functions.

### Company-building agents

The most ambitious category. Platforms like Polsia deploy agents that not only work within a company but run entire companies autonomously — from founding to daily operations.

### Orchestration agents

Agents that manage other agents. Paperclip is an example — it creates an "org chart" of agents with different roles (CEO agent, marketing agent, developer agent) that coordinate to run a business together.

### Research agents

Agents designed to gather, synthesise, and analyse information. Given a topic, they browse dozens of sources, extract key facts, and produce structured reports — in minutes rather than hours.

@spacer 4

## Real agents doing real things right now

### Klarna's customer service agent

Klarna, the Swedish fintech, deployed AI agents across its customer support operation. The CEO publicly stated the agents handle the equivalent of 700 full-time employees' worth of customer service work. This is one of the most cited enterprise agent deployments in the world.

### OpenClaw — the viral personal agent

Created by Austrian developer Peter Steinberger and launched November 2025. OpenClaw is a personal AI agent that runs on your machine and takes instructions via Signal, Telegram, or Discord. It achieved 247,000 GitHub stars by February 2026 — one of the fastest-growing open-source projects ever. The creator was subsequently hired by OpenAI.

### Artisan's Ava — the AI sales rep

"Ava" is an AI business development representative that researches potential customers, writes personalised outreach emails, follows up, and books meetings — all without human involvement. Artisan has raised $46 million total and is backed by Y Combinator.

### Claude Code — the autonomous developer

Anthropic's Claude Code is an agent that reads entire codebases, writes and edits code, runs tests, fixes bugs, and commits to Git — autonomously. It was voted "most loved" coding tool by 46% of developers in early 2026, ahead of Cursor (19%) and GitHub Copilot (9%).

### Rentahuman.ai — agents hiring humans

Perhaps the most striking example: an entire platform where AI agents post jobs and hire humans to complete tasks the agents cannot do themselves (physical tasks, tasks requiring legal identity, nuanced human judgment). Forbes called it "a platform that flips the usual AI narrative."

@spacer 4

## The building blocks — what makes agents possible

Three things came together to make AI agents viable in 2024–2026:

### 1. LLMs got good enough

The underlying AI models — Claude, GPT, Gemini — became capable enough to reason through multi-step problems reliably. Earlier models would get confused, hallucinate, or go in circles. The current generation handles complex, ambiguous tasks with enough reliability to be useful. Claude Opus 4.6 scores 75.6% on SWE-bench (real software engineering tasks). Gemini 3.1 Pro scores 80.6%. These numbers were unthinkable two years ago.

### 2. Tool use became standardised

Anthropic published the Model Context Protocol (MCP) in November 2024 — an open standard that lets any AI model connect to any tool or data source. Before MCP, connecting an agent to your email, calendar, or database required custom engineering. After MCP, it is plug-and-play. Google followed with the Agent2Agent (A2A) protocol in April 2025, letting agents from different companies communicate with each other. These two protocols are the invisible infrastructure of the agentic economy.

### 3. The cost of compute collapsed

Running an AI agent continuously used to cost hundreds of dollars a day. As of 2026, the cost of running a capable agent has dropped dramatically — to the point where a single person can afford to run multiple agents simultaneously for the cost of a few software subscriptions.

@spacer 4

## The risks — what can go wrong

Agents are powerful. They are also genuinely risky if used carelessly. Here is what you need to know:

### Prompt injection

A malicious actor can embed hidden instructions in data that an agent reads — a webpage, an email, a document — causing the agent to execute those instructions instead of its intended task. Cisco found this vulnerability in OpenClaw in early 2026.

### Overly broad permissions

Agents need access to tools to be useful. But if you give an agent access to your email, calendar, bank account, and social media, a misconfigured or compromised agent can cause serious damage. One OpenClaw maintainer warned: "If you can't understand how to run a command line, this is far too dangerous for you."

### Hallucination in action

LLMs sometimes produce confident but wrong outputs. When a chatbot hallucinates, you read a wrong answer. When an agent hallucinates, it might send a wrong email, submit a wrong form, or delete the wrong file.

### Loss of control

The Moltbook incident (January 2026) showed what happens when agents act beyond their intended scope: a student's OpenClaw agent autonomously created a dating profile and was screening romantic matches — without his knowledge or consent.

@body_lead The rule of thumb: give agents the minimum permissions they need to do their job. Review their actions regularly. Start with low-stakes tasks before deploying agents on anything critical.

@spacer 4

## How to think about agents — the mental model

@body_lead The most useful mental model for AI agents is not "software." It is "staff."

You would not give a brand new employee access to your entire company the first day. You would not give them a vague goal and no check-ins. You would not trust them to make major decisions without oversight — until they had earned it.

Apply the same thinking to agents. Start small. Define the goal precisely. Give them limited access. Review their outputs. Build trust incrementally. The people winning with AI agents right now are the ones treating them like capable but junior colleagues — not magic or threats.

@spacer 4

## Glossary

@gl <b>AI Agent</b> — A software system that pursues goals autonomously — taking actions, using tools, checking results, and adapting without constant human instruction.

@gl <b>LLM (Large Language Model)</b> — The AI brain at the core of most agents. Examples: Claude (Anthropic), GPT-5.4 (OpenAI), Gemini 3.1 (Google).

@gl <b>ReAct</b> — The "Reasoning + Acting" loop that most agents run: plan → act → observe → reflect → repeat.

@gl <b>MCP (Model Context Protocol)</b> — Anthropic's open standard for connecting AI agents to external tools and data. The "USB-C for AI." Published November 2024.

@gl <b>A2A (Agent2Agent Protocol)</b> — Google's open standard for AI agents from different companies to communicate. Launched April 2025.

@gl <b>Tool use</b> — An agent's ability to interact with external systems — web browsers, code interpreters, email, databases, APIs.

@gl <b>Prompt injection</b> — A security attack where malicious instructions are hidden in data that an agent reads, causing it to execute those instructions.

@gl <b>Orchestration</b> — The coordination of multiple agents working together — like a Paperclip "org chart" where different agents have different roles.

@gl <b>Autonomous</b> — Operating without human control or supervision on a task-by-task basis.

@gl <b>OpenClaw</b> — The most-starred open-source personal AI agent. Created by Peter Steinberger, November 2025. 247,000 GitHub stars by February 2026.

@gl <b>Claude Code</b> — Anthropic's autonomous coding agent. Reads codebases, writes code, runs tests, commits to Git — without step-by-step human instruction.

@spacer 6

@pagebreak

## Liked this? Go deeper.

This guide explained what agents are. The WTF Agents series goes deep on the specific platforms and tools that are building the agentic economy right now.

@spacer 4
