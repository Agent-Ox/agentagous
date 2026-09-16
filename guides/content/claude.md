---
slug: 'claude'
title: 'WTF is Claude'
file: 'wtf-is-claude.pdf'
cover_title: 'WTF is'
cover_subtitle: 'Claude?'
cover_meta: 'WTF Agents · wtfagents.com · March 2026'
subtitle: >-
  The AI model powering OpenClaw, Claude Code, and much of the agentic economy. Built by
  Anthropic with safety at its core. As of March 2026, one of the most capable and widely
  deployed AI models in the world.

# store catalogue fields
order: 8
description: 'The AI agent powering the agentic economy. What it is, what it can do, and why it matters.'
price: 7
category: 'claude'
badge: null
featured: false
related: ['claude-code', 'anthropic']
starter: true
---
## The one-liner

@body_lead Claude is Anthropic's AI model — a Large Language Model trained to be helpful, honest, and harmless, with a particular focus on safety and reliability for agentic use.

It is the brain inside OpenClaw (the most-starred open-source agent), the engine behind Claude Code (the most-loved coding tool among developers), and one of the three frontier models competing at the top of every major AI benchmark.

@spacer 4

## The model family — what's available in March 2026

Claude is not a single model — it is a family of models at different price and capability points:

### Claude Opus 4.6

The most powerful model in the family. Best for complex reasoning, long autonomous tasks, and demanding agentic workflows. SWE-bench score: 75.6% (real software engineering tasks). Context window: up to 1 million tokens (beta). Output: up to 128,000 tokens.

### Claude Sonnet 4.6

The mid-tier model. Faster than Opus, more affordable, with strong agentic capabilities. Best for most business use cases where you need capability without Opus-level cost.

### Claude Haiku 4.x

The fastest and most cost-effective model. Best for high-volume, lower-complexity tasks where speed and cost matter more than raw capability.

@spacer 4

## How Claude compares to the competition

As of March 2026, three frontier models compete at the top of AI benchmarks:

@table keep 38,28,25,69
@tcells hs-row
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 0,1 -1,-1 [DARK_BG,ZINC_900]
| Model | Made by | SWE-bench | Key strength |
| Claude Opus 4.6 | Anthropic | 75.6% | Agentic reliability, safety, honesty |
| Gemini 3.1 Pro | Google | 80.6% | Highest benchmark score, Google ecosystem |
| GPT-5.4 | OpenAI | 57.7%* | Native computer use, consumer reach |

@spacer 3

@small * GPT-5.4 SWE-bench Pro score. Benchmark methodologies vary.

@spacer 4

Raw benchmark scores tell part of the story. What they do not capture: Claude's reputation for being more honest, more nuanced, and more reliable in real-world agentic deployments. Developers building serious autonomous systems consistently report Claude behaving more predictably than alternatives — declining harmful requests more gracefully, flagging ambiguity rather than guessing, and handling edge cases more sensibly.

@spacer 4

## What Claude can actually do

@cap <b>Write and edit</b> — Any style, any length, any format. Essays, code, emails, legal documents, marketing copy, technical documentation. Claude adapts to context better than almost any other model.

@cap <b>Reason through complex problems</b> — Multi-step logical problems, mathematical reasoning, strategic analysis. Claude thinks through problems step by step rather than pattern-matching to a quick answer.

@cap <b>Read and analyse long documents</b> — With a 1 million token context window (beta), Claude can read entire codebases, long legal documents, or research papers in a single session.

@cap <b>Write, debug, and explain code</b> — Across all major programming languages. Claude Code (the agentic version) takes this further — it reads codebases, writes code, runs tests, and commits to Git autonomously.

@cap <b>Use tools via MCP</b> — Browse the web, read files, query databases, call APIs, send emails — through the Model Context Protocol that Anthropic invented.

@cap <b>Maintain long conversations</b> — Unlike models with small context windows, Claude can maintain coherent conversations and task execution over very long sessions — critical for autonomous agent work.

@cap <b>Be honest about uncertainty</b> — A genuinely unusual capability: Claude is trained to say "I don't know" rather than confidently hallucinate. Constitutional AI makes this more reliable than in competing models.

@spacer 4

## What makes Claude different — Constitutional AI in practice

Every major AI model is trained to be helpful. What makes Claude different is how it was trained to handle the hard cases.

Constitutional AI (CAI) — Anthropic's training technique — gives Claude a set of principles to evaluate its own outputs against. The result is a model that:

- → Declines harmful requests more gracefully — explaining why rather than just refusing.
- → Flags ambiguity rather than making assumptions that could cause downstream problems.
- → Maintains consistent values across different phrasings of the same request.
- → Is more honest about what it does not know.
@spacer 3

For agentic use — where Claude is running autonomously for hours, making judgment calls constantly without human supervision — these properties matter enormously. An agent that hallucinates confidently, makes assumptions silently, or behaves inconsistently is a dangerous agent. Claude's training makes it significantly more reliable in these scenarios.

@spacer 4

## Claude's role in the agentic economy

@body_lead Claude is not just a chatbot. It is the infrastructure of the agentic economy.

@role <b>OpenClaw's default LLM</b> — The most-starred open-source agent project uses Claude as its primary model. 247,000 GitHub stars worth of developers are building with Claude under the hood.

@role <b>Claude Code</b> — Anthropic's own agentic coding tool — ranked "most loved" by 46% of developers in 2026, ahead of Cursor (19%) and GitHub Copilot (9%).

@role <b>Paperclip integration</b> — Paperclip — the multi-agent company orchestration framework — lists Claude Code as a primary supported agent.

@role <b>Thousands of applications</b> — Via the Anthropic API, Claude powers customer service agents, research tools, writing assistants, legal analysis tools, and more across thousands of businesses.

@role <b>AWS and Google Cloud</b> — Available via Amazon Bedrock and Google Vertex AI — the two largest enterprise cloud platforms. This means Claude is accessible inside existing enterprise infrastructure without new vendor relationships.

@spacer 4

## How to access Claude

@acc <b>Claude.ai</b> — The consumer chat interface. Free tier available; Claude Pro ($20/month) for higher limits and priority access.

@acc <b>Anthropic API</b> — Direct API access for developers. Pay per token. Pricing varies by model (Haiku cheapest, Opus most expensive).

@acc <b>Amazon Bedrock</b> — Claude via AWS. For teams already in the AWS ecosystem.

@acc <b>Google Vertex AI</b> — Claude via Google Cloud. For teams already in the Google ecosystem.

@acc <b>OpenClaw</b> — Free. Connects to Claude via your own Anthropic API key.

@acc <b>Claude Code</b> — Available as a command-line tool. Requires an Anthropic API key.

@spacer 4

## Glossary

@gl <b>Claude</b> — Anthropic's AI model family. Includes Opus (most powerful), Sonnet (balanced), and Haiku (fastest).

@gl <b>Claude Opus 4.6</b> — The flagship model. 75.6% SWE-bench, 1M token context window, 128K output tokens.

@gl <b>Constitutional AI (CAI)</b> — Anthropic's training technique. Gives Claude principles to evaluate its own outputs. Makes Claude more reliable and honest.

@gl <b>SWE-bench</b> — The industry benchmark for AI coding ability. Measures how well a model can solve real software engineering problems.

@gl <b>Context window</b> — How much text Claude can process at once. Claude Opus 4.6: up to 1 million tokens (beta) — enough for entire codebases.

@gl <b>MCP (Model Context Protocol)</b> — The open standard Claude uses to connect to external tools. Invented by Anthropic, now an open standard.

@gl <b>Claude Code</b> — The agentic version of Claude for coding. Reads codebases, writes code, runs tests, commits to Git — autonomously.

@gl <b>Anthropic API</b> — Developer access to Claude. Pay per token. Required for OpenClaw, Paperclip, and custom agent builds.

@gl <b>Amazon Bedrock</b> — AWS's managed AI service. Hosts Claude for enterprise teams in the AWS ecosystem.

@gl <b>Token</b> — The unit Claude uses to process text. Roughly 0.75 words. You pay for API usage in tokens.

@spacer 6

@pagebreak

## Liked this? Go deeper.

Claude is the model. Here is everything around it.

@spacer 4
