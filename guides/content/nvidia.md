---
slug: 'nvidia'
title: 'WTF is Nvidia'
file: 'wtf-is-nvidia.pdf'
cover_title: 'WTF is'
cover_subtitle: 'Nvidia?'
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  The company that sells the chips every AI model was trained on, worth more than five
  trillion dollars, guiding to a trillion in chip revenue, and now the owner of the shelf
  where open models are kept. What it makes, why nobody can switch, and where the cracks are.

# store catalogue fields
order: 35
description: 'The chip company under the agentic economy. What it sells, why CUDA is the moat, the Rubin cycle, the Hugging Face deal, and the rivals building their own.'
price: 7
stripe_price_id: 'price_1UHQzVBaLipfLqFsOsCLpdka'
category: 'map'
badge: null
featured: false
starter: false
related: ['picks-and-shovels', 'china-ai']
hook: "Whoever wins the AI race, *they bought the chips here.*"
best_for: "Best for: following the money"
capability: "CUDA, Rubin, the rivals"
---
## The one-liner

@body_lead Nvidia designs the processors — GPUs — that AI models are trained on and mostly served from. Every lab in this series, every cloud, and most of the agents run on its hardware, which is why a company that started in graphics cards for gaming is the most valuable business in the world.

In 2026 it is doing three things at once: shipping a new chip generation a year, buying its way into the software layer, and watching its biggest customers design chips of their own.

@spacer 4

## By the numbers — September 2026

@stat $5.37T || market value on 18 September 2026, the most valuable company in the world — up from $4.64T at the end of 2025
@stat $96.2B || revenue in the quarter to 26 July, up 106% in a year; data centre $89.0B, up 117%; guidance of $108B for the next, with no China compute revenue assumed
@stat 62% || net profit margin. Most companies would take that as a gross margin
@stat $1T+ || cumulative revenue Nvidia expects from its Blackwell and Rubin chips through 2027, per Jensen Huang at GTC
@stat ~90% || share of the AI accelerator market; custom chips from the clouds are the fastest-growing rival, forecast at about 28% of AI server shipments this year
@stat $12.93B || for Hugging Face, the open-model hub — agreed 2 September 2026 and announced the next day; its largest company purchase
@stat 4M+ || developers building on CUDA, the software layer that makes switching chips a rewrite

@spacer 4

## What it actually sells

@cap <b>GPUs for data centres</b> — Blackwell, the current generation, sold out through mid-2026; Vera Rubin, its successor, in production and shipping in the second half of the year. These are the chips inside every large training run and most inference.

@cap <b>Whole systems</b> — Racks, networking, cooling, software: Nvidia sells the AI factory, not just the chip. That is where the margin and the lock-in live.

@cap <b>CUDA</b> — The software platform every AI framework is built on first. Four million developers, fifteen years of code. A rival chip has to be faster and worth rewriting everything for.

@cap <b>Software and models</b> — Inference servers, its own open models (Nemotron), robotics and physical-AI platforms, and now Hugging Face.

@cap <b>Investment</b> — Nvidia is on the cap table of Anthropic, OpenAI, Runway, Perplexity, Fireworks and dozens more. It funds its customers, who buy its chips.

@cap <b>Consumer graphics</b> — The original business, now a rounding error next to the data centre.

@spacer 4

## Why nobody can switch — CUDA

The hardware lead is real but not the moat. Every new generation resets performance per watt and per dollar, and Nvidia has moved to shipping one a year to stay ahead of AMD and the custom chips. What keeps customers is the software: PyTorch, TensorFlow and every training pipeline are written against CUDA first, and a lab moving to a different chip is signing up for years of rewriting and retraining.

@body_lead That is the difference between a chip company and a platform. Chips get beaten; platforms get built on.

@spacer 4

## The Hugging Face deal

Nvidia agreed on 2 September 2026 to buy Hugging Face for $12.93 billion and announced it the next day, closing in the first half of 2027. Hugging Face is where open-weight models live: eighteen million users, three million models, the place DeepSeek, Qwen and Meta publish. Nvidia's stated commitments: no compute requirement, other chipmakers supported, anyone can still publish and download.

Read with the Groq purchase on 24 December 2025 — about $20 billion for the inference-chip rival's assets and people, structured as a licensing deal and acqui-hire rather than a takeover — the pattern is vertical: Nvidia bought the chips that threatened it, then the shelf the models sit on. The chip company now owns the marketplace where the Chinese open models — the ones that let a solo builder avoid US API prices — are distributed. Whether the open commitments hold is a question the next two years will answer.

@spacer 4

## The rivals

@table keep 34,42,42,42
@tcells hs-row+col
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
|  | The clouds' own chips | AMD | China (Huawei Ascend) |
| Who | Google TPU, Amazon Trainium, Microsoft Maia, OpenAI's Jalapeño | The other GPU maker | State-backed domestic supply |
| Where they win | Inference inside their own data centres, at lower cost per token | Price, and buyers who want a second source | A market Nvidia is barred from |
| Share | ~28% of AI server shipments forecast for 2026, growing three times faster than GPUs | Single digits | China only |
| Threat | The biggest customers becoming suppliers | Real but not existential | Precedent, more than revenue |

@spacer 4

The cloud chips are the threat that matters: Nvidia's largest customers, with the engineering teams to leave, building their own for the workload (inference) that is becoming the majority of spending. OpenAI's Jalapeño, presented at Hot Chips on 25 August 2026 and built with Broadcom, showed 1.5 to 1.9 times a GB200 or GB300 system's peak throughput per watt on inference — the first hard evidence of it, and it goes into OpenAI's own data centres by the end of the year. Nvidia's answer is the annual cadence and CUDA, and so far the order book has not blinked.

@spacer 4

## The catches

- → <b>Concentration.</b> A handful of customers — the clouds, OpenAI, Anthropic, Meta — are most of the revenue, and they are the ones building alternatives.
- → <b>China.</b> Export controls removed the top chips from a market that was a tenth of data-centre revenue; Beijing steered its labs to Huawei even when Washington allowed sales. Nvidia guides with zero China compute revenue assumed.
- → <b>Circularity.</b> Nvidia invests in labs that spend the money on Nvidia chips. Real demand or a flywheel that flatters everyone's numbers: the honest answer is both.
- → <b>Power and price.</b> Chips are sitting in inventory waiting for electricity, and Rubin-class systems are quoted 15% dearer from 2027 on memory costs. The bottleneck has moved from Nvidia to the grid.
- → <b>Owning the shelf.</b> Hugging Face was neutral; now it is Nvidia's. The open-weight ecosystem that gave developers independence from any one vendor has a vendor.
@spacer 3

@spacer 4

## What it means for you

You will never buy an Nvidia chip. You will pay for one every time an agent runs: token prices track the cost and availability of this hardware, which is why they fell through 2025 as older GPUs got cheap, and why a constrained Rubin cycle could hold them up. Watch Nvidia's supply the way a haulier watches diesel.

@spacer 4

## Why it matters

Nvidia is the toll booth on the road every model travels. It has turned a hardware lead into a platform, a platform into a portfolio of customers it funds, and now into ownership of the open ecosystem that was supposed to be the alternative. The most valuable company on earth sells picks and shovels, and in 2026 it started buying the general store.

@spacer 4

## Glossary

@gl <b>Nvidia</b> — Designer of the GPUs and systems AI runs on. Santa Clara, founded 1993 by Jensen Huang, Chris Malachowsky and Curtis Priem.

@gl <b>GPU</b> — A processor built for massively parallel maths; the workhorse of AI training and inference.

@gl <b>CUDA</b> — Nvidia's software platform for programming its GPUs; the ecosystem lock-in.

@gl <b>Blackwell / Vera Rubin</b> — The current and next chip generations; Nvidia now ships one a year.

@gl <b>Inference</b> — Running a trained model; the majority of AI compute spending from 2026, and where custom chips compete hardest.

@gl <b>Custom silicon</b> — Chips the clouds and labs design for themselves: TPU, Trainium, Maia, Jalapeño.

@gl <b>Hugging Face</b> — The open-model hub Nvidia agreed to buy for $12.93B in September 2026.

@gl <b>Groq</b> — Inference-chip company whose assets and people Nvidia took for ~$20B on 24 December 2025, its largest deal.

@gl <b>Export controls</b> — US limits on selling advanced chips to China; the reason Nvidia's guidance assumes no China compute revenue.

@spacer 6

@pagebreak

## Liked this? Go deeper.

Nvidia is the toll booth. Here is the rest of the infrastructure, and the open models it now hosts.

@spacer 4
