---
slug: 'llm'
title: 'WTF is an LLM'
file: 'wtf-is-an-llm.pdf'
cover_title: 'WTF is an'
cover_subtitle: 'LLM?'
cover_meta: 'WTF Agents · wtfagents.com · March 2026'
subtitle: >-
  Large Language Models are the engines powering ChatGPT, Claude, Gemini, and every AI
  agent in the agentic economy. Here is what they actually are — explained simply, without
  a single equation.

# store catalogue fields
order: 3
description: 'Large language models are the engine behind every AI company. Here''s how they actually work.'
price: 7
category: 'foundation'
badge: null
featured: false
related: ['claude', 'ai-agent']
starter: true
---
## The one-liner

@body_lead A Large Language Model (LLM) is a type of AI that has been trained on enormous amounts of text and learned to predict — with remarkable accuracy — what words should come next.

That sounds simple. The implications are not. From that single capability — predicting the next word — emerge the ability to write, reason, summarise, translate, code, explain, debate, and plan. It is one of the most surprising and consequential developments in the history of computing.

@spacer 4

## How does predicting words create intelligence?

This is the question that confuses most people. "Predicting the next word" sounds like autocomplete on your phone. It is not. Here is why.

To accurately predict what word comes next in a sentence, you have to understand the sentence. To understand the sentence, you have to understand the paragraph. To understand the paragraph, you have to understand the topic, the context, the nuance.

When researchers trained models on trillions of words of human text — books, articles, websites, code, scientific papers, conversations — the models did not just learn to string words together. They learned to represent meaning. They built internal models of how concepts relate to each other.

@body_lead The result was not a glorified autocomplete. It was a system that could reason about problems it had never seen before, write in styles it had never been explicitly taught, and explain concepts across dozens of languages and domains.

@spacer 4

## Where did LLMs come from?

The story of LLMs is surprisingly recent and moves fast:

@table keep 22,138
@tcells hs-row+col
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
| Year | What happened |
| 2017 | Google researchers publish "Attention Is All You Need" — the paper introducing the Transformer architecture, the technical foundation of all modern LLMs. |
| 2018 | Google releases BERT. OpenAI releases GPT-1. The race begins. |
| 2020 | OpenAI releases GPT-3 — 175 billion parameters, shockingly capable. Developers begin building on it via API. |
| 2022 | OpenAI releases ChatGPT (GPT-3.5). 100 million users in 2 months. Anthropic founded; releases Claude. |
| 2023 | GPT-4 released. Open-source models (LLaMA, Mistral) emerge. AutoGPT goes viral as the first autonomous agent attempt. |
| 2024 | Models capable enough for reliable agentic use. Anthropic publishes MCP. The agentic economy begins. |
| 2025–26 | Claude Opus 4.6 (75.6% SWE-bench), Gemini 3.1 Pro (80.6%), GPT-5.4. Multi-hour autonomous tasks become reliable. |

@spacer 4

## The main LLMs in 2026 — who makes what

There are three dominant LLM providers and a growing ecosystem of open-source alternatives:

### Claude (Anthropic)

Anthropic's flagship model family. Current version: Claude 4.6, with Opus (most powerful) and Sonnet (faster, more affordable) variants. Claude Opus 4.6 scores 75.6% on SWE-bench — the standard benchmark for software engineering tasks. Claude is the default model for OpenClaw and widely used in agent frameworks. Anthropic's focus on safety and Constitutional AI training makes Claude the preferred choice for agentic deployments where reliability and honesty matter. Context window: up to 1 million tokens (beta). Anthropic valuation: $380 billion.

### GPT-5.4 (OpenAI)

OpenAI's latest flagship model as of March 2026. Native computer use capability. 1 million token context window in Codex. Powers ChatGPT, which remains the most widely used consumer AI product in the world. OpenAI also released Codex — an autonomous coding agent built on GPT-5.4. OpenAI valuation: $300 billion+.

### Gemini 3.1 Pro (Google DeepMind)

Google's flagship model. Currently holds the highest score on SWE-bench Verified (80.6%). Deeply integrated with Google's ecosystem — Search, Workspace, Android. Google also created the Agent2Agent (A2A) protocol for agent interoperability. Available via Google Cloud (Vertex AI).

### Open-source models (LLaMA, Mistral, DeepSeek)

A growing ecosystem of models that anyone can run on their own hardware. Meta's LLaMA family is the most widely used. Mistral (French AI lab) produces highly efficient smaller models. DeepSeek (Chinese) produced models that competed with GPT-4 at a fraction of the training cost — a significant moment in early 2025. OpenClaw supports DeepSeek as an alternative to Claude or GPT.

@spacer 4

## What LLMs are good at — and bad at

@table keep 83,83
@tcells raw
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle TEXTCOLOR 0,0 -1,0 ORANGE
@tstyle FONTNAME 0,0 -1,0 Helvetica-Bold
@tstyle TEXTCOLOR 0,1 -1,-1 ZINC_300
@tstyle FONTNAME 0,1 -1,-1 Helvetica
@tstyle FONTSIZE 0,0 -1,-1 8.5
@tstyle LEADING 0,0 -1,-1 14
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle WORDWRAP 0,0 -1,-1 1
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 0,1 -1,-1 [DARK_BG,ZINC_900]
| LLMs are good at | LLMs are bad at |
| Writing in any style or tone | Precise arithmetic (they approximate) |
| Summarising long documents | Real-time information (training data has a cutoff) |
| Writing and explaining code | Guaranteed factual accuracy (they can "hallucinate") |
| Translating between languages | Knowing what they don't know |
| Reasoning through multi-step problems | Consistent behaviour on identical inputs |
| Generating creative ideas | Tasks requiring persistent memory by default |
| Explaining complex topics simply | Physical world interaction (without agent tools) |

@spacer 4

## Hallucination — the most important limitation

@body_lead The most important thing to understand about LLMs is hallucination: the tendency to produce confident, plausible-sounding text that is factually wrong.

This happens because LLMs do not "know" facts the way a database does. They generate text based on patterns learned during training. When asked about something outside their training data, or at the edge of their knowledge, they sometimes generate text that sounds right but is not.

A lawyer once submitted a legal brief to a US court that cited cases generated by ChatGPT. The cases did not exist. The judge was not amused.

This is why human oversight of AI agents remains important — especially for high-stakes decisions. The models are getting better at knowing what they do not know, but they are not perfect. Treat LLM outputs as a very capable first draft, not a final source of truth.

@spacer 4

## Parameters, tokens, and context windows

Three technical terms come up constantly when people discuss LLMs. Here is what they actually mean:

### Parameters

Parameters are the numerical values inside the model that were adjusted during training. GPT-3 had 175 billion parameters. Modern frontier models have trillions. More parameters generally means more capability — but also more cost to run. In plain English: parameters are roughly analogous to the "size" of the model's brain.

### Tokens

LLMs do not process words — they process tokens. A token is roughly 3–4 characters, or about 0.75 words. "Hello, how are you?" is about 6 tokens. You pay for AI API usage in tokens — both the tokens you send (input) and the tokens the model generates (output). A typical page of text is around 500 tokens.

### Context window

The context window is how much text an LLM can "see" at once — the conversation history, the document you shared, the instructions you gave. Early models had tiny context windows (4,000 tokens = about 3 pages of text). Claude Opus 4.6 has a 1 million token context window — roughly 750,000 words, or the equivalent of several full novels. This is why modern agents can work with entire codebases or long documents at once.

@spacer 4

## Constitutional AI — Anthropic's approach to safety

Different companies train their LLMs differently. Anthropic's approach — Constitutional AI — is worth understanding because it directly affects how Claude behaves as an agent.

Constitutional AI is a training technique where the model is given a set of principles (a "constitution") and trained to critique and revise its own outputs against those principles. The result is a model that is more reliably helpful, honest, and harmless — not because it is restricted, but because it has internalised values.

This matters for agentic use because an agent running autonomously for hours needs to make judgment calls constantly. A model trained with Constitutional AI is more likely to handle edge cases sensibly — declining to take actions that could cause harm, flagging ambiguous situations for human review, and being honest about its limitations.

@spacer 4

## LLMs and the agentic economy

The LLM is the brain of every AI agent. Without it, an agent is just a set of if-then rules — useful but brittle. With it, the agent can:

- → Understand ambiguous instructions and figure out what you actually meant.
- → Handle situations it was not explicitly programmed for.
- → Generate plans for achieving goals, not just execute fixed scripts.
- → Read and understand unstructured data — emails, documents, web pages.
- → Communicate its results in natural language.
@spacer 3

The rapid improvement of LLMs over the past three years — from GPT-3 in 2020 to Claude 4.6 and Gemini 3.1 in 2026 — is the primary reason the agentic economy is happening now rather than ten years from now. The models crossed a threshold of capability that made autonomous, reliable action possible.

@spacer 4

## Glossary

@gl <b>LLM (Large Language Model)</b> — An AI trained on vast amounts of text to predict and generate language. The brain inside ChatGPT, Claude, and Gemini.

@gl <b>Transformer</b> — The neural network architecture that underlies all modern LLMs. Introduced by Google in 2017.

@gl <b>Parameters</b> — The numerical values inside an LLM adjusted during training. More parameters = generally more capable.

@gl <b>Token</b> — The unit LLMs use to process text. Roughly 3–4 characters or 0.75 words. You pay for API usage in tokens.

@gl <b>Context window</b> — How much text an LLM can process at once. Claude Opus 4.6: up to 1 million tokens.

@gl <b>Hallucination</b> — When an LLM generates confident but factually incorrect text. A key limitation to understand.

@gl <b>Constitutional AI</b> — Anthropic's technique for training models to be helpful, honest, and harmless using a set of principles.

@gl <b>SWE-bench</b> — The standard benchmark for measuring LLM performance on real software engineering tasks.

@gl <b>Fine-tuning</b> — Training an existing LLM further on a specific dataset to improve performance on a specific task.

@gl <b>Inference</b> — Running an LLM to generate a response. The "thinking" part, as opposed to training.

@gl <b>Open-source model</b> — An LLM whose weights are publicly available — anyone can run it. Examples: LLaMA, Mistral, DeepSeek.

@spacer 6

@pagebreak

## Liked this? Go deeper.

Now you know what LLMs are. Here is the rest of the WTF Agents series.

@spacer 4
