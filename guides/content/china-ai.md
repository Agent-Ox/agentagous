---
slug: 'china-ai'
title: 'WTF is Happening with China''s AI'
file: 'wtf-is-happening-with-chinas-ai.pdf'
cover_title: 'WTF is Happening'
cover_subtitle: 'with China''s AI?'
cover_title_size: 32
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  The best models you can download and run yourself are Chinese. So are most of the
  tokens flowing through the world's biggest model router. Here is who the labs are, why
  they give their models away, what it means for you, and the catches on both sides.

# store catalogue fields
order: 17
description: 'DeepSeek, Qwen, Kimi, GLM and the open-weight strategy. Who the Chinese labs are, why they give models away, and what it means for anyone running agents.'
price: 7
stripe_price_id: 'price_1UGyCcBaLipfLqFstcYqKVZu'
category: 'map'
badge: '🇨🇳 Map'
featured: false
starter: false
related: ['which-ai', 'llm']
---
## The one-liner

@body_lead In 2026 the strongest AI models you can download, run on your own hardware and modify are almost all Chinese. The strongest models you cannot download are almost all American. That single difference explains most of what is happening.

American labs sell access. Chinese labs give the model away and compete on price and distribution. For anyone building agents on a budget, running things privately, or living outside the US, that has made Chinese models the default — and made Beijing and Washington both nervous about it.

@spacer 4

## By the numbers — September 2026

@stat ~61% || of tokens processed on OpenRouter, the largest model-routing platform, went to Chinese models in mid-2026
@stat 1B+ || downloads of Alibaba's Qwen family; base of roughly 40% of new derivative models on Hugging Face
@stat 2.8T || parameters in Moonshot's Kimi K3, released 16 July — the largest open-weight model ever, weights public a day later
@stat 6–8 months || the gap between the best Chinese and best US models, per US government evaluators — and narrowing
@stat 10× || roughly how much cheaper DeepSeek's Flash tier is than the equivalent OpenAI tier per token
@stat $2B || Meta's agreed price for Manus before Beijing blocked the sale in April
@stat 0 || US frontier labs that published open weights in 2026

@spacer 4

## The labs — who makes what

@role <b>DeepSeek</b> — The lab that started it. A hedge fund's side project that in early 2025 trained a frontier-class model for a fraction of what US labs spent and gave it away. DeepSeek V4 (mid-July 2026) is open under the MIT licence; the Flash tier is the cheapest serious model on the market and the chat app is free with no paid plan. Founder Liang Wenfeng reportedly put around $3 billion of his own money into its first outside round.

@role <b>Alibaba — Qwen</b> — The volume leader and the most important open-model franchise in the world. Over a billion downloads, over 100,000 derivative models on Hugging Face, more than any Western family including Meta's Llama. Qwen 3.6 is open under Apache 2.0 and the open line continued with Qwen 3.8 in August; the very best, Qwen 3.7 Max, is API-only. The Qwen app is also where Alibaba is wiring shopping, food and payments into the chat.

@role <b>Moonshot AI — Kimi</b> — Founded 2023 by Yang Zhilin. Competes on coding quality and shipping speed. Kimi K2.6 matched GPT-5.5 on a hard coding benchmark at roughly 80% lower cost; Kimi K3 in July pushed Chinese open models to the frontier and can dispatch up to 100 agent "avatars" in parallel. Strongest for long agent runs.

@role <b>Zhipu (Z.ai) — GLM</b> — GLM-5 in February, 5.2 in June, 5.3 since. US evaluators judged GLM-5.2 comparable to Claude Opus 4.6, six months after that shipped. Leads the Chinese field on independent coding and agent leaderboards as of September.

@role <b>MiniMax · Tencent Hunyuan · ByteDance</b> — The rest of a deep field: MiniMax on efficient models, Tencent and ByteDance as platform owners with over a trillion dollars of AI-exposed market value between them and Alibaba.

@role <b>Manus</b> — The general-purpose agent startup that Meta agreed to buy for $2 billion. China's NDRC blocked the sale in April. Still independent, still Chinese, and now a symbol of Beijing treating agents as strategic assets.

@spacer 4

## Why they give the models away

Three reasons, and they compound.

### They cannot sell access the way US labs do

Export controls mean Chinese labs cannot easily sell into US enterprises, and US chips are restricted going the other way. Selling API access globally at OpenAI prices was never an option. Open weights turn the constraint into a strategy: if you cannot own the customer, own the ecosystem.

### Distribution beats margin

A model that a million developers download becomes the default base for their products, their fine-tunes, their agents. Qwen's 100,000 derivatives are 100,000 reasons for the next developer to pick Qwen. Meta ran this playbook with Llama; the Chinese labs ran it harder and, in 2026, Meta stopped — Muse Spark shipped closed.

### It is politically safe at home and useful abroad

Open weights cannot be switched off by a US Commerce Department letter. When Fable 5 was pulled from global access for seventeen days in June under US export controls, every developer outside America got a reminder of what depending on a closed US model means. DeepSeek, Kimi and Qwen kept running. That episode did more for Chinese adoption in Europe than any benchmark.

@spacer 4

## What it means for you

@body_lead If you run agents, you are probably already using Chinese models, whether you chose to or not.

- → <b>Cost.</b> A Polsia-style company, an OpenClaw personal agent or a Paperclip org running on DeepSeek Flash costs a tenth of the same thing on a US frontier model. For high-volume, lower-stakes agent work, that is the difference between viable and not.
- → <b>Privacy.</b> Downloaded and run on your own hardware, a Chinese open model sends nothing anywhere. It is the most private option in the market — more private than any US API.
- → <b>Control.</b> Public weights mean no vendor can change your terms, raise your price, or switch the model off mid-project. Developers who were burned in June are now caching weights locally on principle.
- → <b>Quality.</b> Months behind the frontier, not years. For most tasks that a normal person or small business does, the gap is invisible.
@spacer 3

@spacer 4

## The catches — on both sides

### Using the hosted Chinese services

Your prompts are processed in China under Chinese law. US federal agencies and several states ban the DeepSeek app on government devices; a few other countries have restricted it. The models are trained to avoid politically sensitive topics. Western enterprises mostly cannot use the hosted versions for compliance reasons. All of this applies to the hosted app and API, not to weights you download and run yourself.

### Beijing is reconsidering

In July 2026 China began weighing export controls on AI models — including open-weight ones. Weights already published cannot be recalled, but the next generation might not be published at all. Alibaba keeping its very best model, Qwen 3.7 Max, API-only while it carries on publishing the rest is the early signal. The advice circulating among developers: download and cache every model you depend on now. That advice sharpened in September, when Nvidia agreed to buy Hugging Face — the hub nearly every Chinese open model is published to — for $12.93 billion. Nvidia has committed to keeping it open to all comers and all chipmakers, but the place China's weights land now has an American owner, and both governments have shown they will reach for this layer.

### Washington cuts both ways

The US approved Nvidia H200 sales to China in January, then China declined to buy them, steering its labs toward Huawei's Ascend chips — a shift that reportedly delayed DeepSeek's next model. Meanwhile US controls reach US models too, as the Fable suspension showed. Depending on either side's frontier model is a supply-chain decision, not just a product one.

### Manus is the pattern

Meta's blocked acquisition set the precedent: China treats its agent companies as strategic and will stop them being bought. Expect more Chinese agents to stay Chinese, and more Western companies to build on them rather than buy them.

@spacer 4

## The state of the race

@body_lead The gap is months, not years, and it is narrowing at the top — but it is not parity, and the structural difference is not closing.

The US labs hold the frontier: Fable, GPT-6, Gemini 3.8 lead every independent index. The Chinese labs hold the ecosystem: the downloads, the derivatives, the routers, the price floor. The US sells the best model; China sets the price of good enough. Both are winning the game they chose to play.

For the agentic economy the practical consequence is a two-tier world. The hard, high-stakes reasoning — and most of the money — runs on closed US models. The volume — the millions of routine agent steps that make an AI-run company or a personal assistant affordable — increasingly runs on open Chinese ones. Most serious agent stacks now use both, routed by task.

@spacer 4

## Glossary

@gl <b>Open weights</b> — A model whose trained parameters are published for anyone to download, run and modify. Most Chinese frontier models; no US frontier model in 2026.

@gl <b>Closed model</b> — A model available only through the maker's API or app. Claude, GPT, Gemini, Muse.

@gl <b>DeepSeek</b> — The Chinese lab whose cheap frontier-class model in early 2025 changed the market. Open under MIT.

@gl <b>Qwen</b> — Alibaba's model family; the most-downloaded open models in the world.

@gl <b>Kimi</b> — Moonshot AI's models. K3 is the largest open-weight model released.

@gl <b>GLM</b> — Zhipu's models; leads Chinese coding and agent leaderboards.

@gl <b>Manus</b> — Chinese general-purpose agent; Meta's $2B purchase was blocked by Beijing.

@gl <b>Export controls</b> — Government restrictions on what technology can leave a country. Now applied by the US to chips and models, and being considered by China for models.

@gl <b>Derivative model</b> — A model built by fine-tuning an existing open model. Qwen is the base of more of these than any other family.

@gl <b>OpenRouter</b> — A service that routes requests to many models; its traffic share is a rough measure of which models developers actually use.

@gl <b>Hugging Face</b> — The hub where open-weight models are published and downloaded. Nvidia agreed to buy it in September 2026 for $12.93 billion, closing in the first half of 2027.

@spacer 6

@pagebreak

## Liked this? Go deeper.

China's models run under more of the agentic economy than most people realise. Here is the rest of the map.

@spacer 4
