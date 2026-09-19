---
slug: 'picks-and-shovels'
title: 'The Picks and Shovels'
file: 'the-picks-and-shovels.pdf'
cover_title: 'WTF are the'
cover_subtitle: 'Picks and Shovels?'
cover_title_size: 32
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  Whoever wins the agent race, the same handful of companies get paid: the chips, the
  clouds, the model hub, the code host, the payment rails, the power. Who they are, how
  the money flows, and what it means for anyone building on top of it.

# store catalogue fields
order: 20
description: 'The infrastructure layer: Nvidia, the clouds, Hugging Face, GitHub, Stripe, power. Who gets paid whichever agent wins, and why it matters to you.'
hook: 'Whoever wins the agent race, *these companies get paid.*'
best_for: 'Best for: investors and builders'
capability: 'The bubble question'
price: 7
stripe_price_id: 'price_1UGyCeBaLipfLqFsmkiCcK7R'
category: 'map'
badge: '⛏️ Map'
featured: false
starter: false
related: ['whos-who', 'china-ai']
---
## The one-liner

@body_lead In a gold rush the reliable money is in picks and shovels. In the agentic economy the picks and shovels are chips, data centres, cloud capacity, electricity, and the plumbing that models, agents and money run through — and a handful of companies own nearly all of it.

Every agent in this series runs on this layer. Every dollar Polsia, OpenClaw or ChatGPT Work earns passes through it. When people ask whether AI is a bubble, this is the layer they are really asking about.

@spacer 4

## By the numbers — September 2026

@stat $725B+ || combined 2026 capital spending by Amazon, Alphabet, Microsoft and Meta, up around 77% on 2025 — the largest infrastructure build-out in corporate history
@stat $5T || Nvidia's market value when it became the first chip company past five trillion dollars, 24 April 2026
@stat $89B || Nvidia's data-centre revenue in a single quarter (to late July), up 117% in a year
@stat $12.93B || what Nvidia agreed on 2 September 2026 to pay for Hugging Face — the largest company it has ever bought outright. Expected to close in the first half of 2027
@stat 82% || Google Cloud's year-on-year growth in Q2 2026; AWS 37%, its fastest in eighteen quarters
@stat $514B || Google Cloud's contract backlog; AWS $496B; Oracle $638B — capacity sold years ahead
@stat 10–50× || more tokens an agent consumes per finished task than a single chatbot answer
@stat 2026 || the year spending on running models (inference) is expected to overtake spending on training them

@spacer 4

## The layer, top to bottom

### The chips — Nvidia and the challengers

Every frontier model was trained on Nvidia hardware and most are served on it. Nvidia holds roughly four fifths of the AI accelerator market, with gross margins other chipmakers cannot approach, and its CUDA software is the switching cost that keeps customers in place. It is the single most valuable company in the world for a simple reason: whoever wins the model race, they bought the chips from Nvidia.

The challengers are not AMD. They are the clouds' own chips — Google's TPUs, Amazon's Trainium, Microsoft's Maia — which already handle a meaningful share of inference inside their own data centres at a lower cost per token. And in China, Huawei's Ascend, which Beijing is steering its labs toward at the price of a slower next generation. Nvidia's risk is not losing the market; it is the market's biggest customers building their own supply.

Its answer is to own more of the stack. In December 2025 it paid around $20 billion for Groq's assets and people, its largest transaction ever, buying the low-latency inference chips that threatened it. On 2 September 2026 it agreed to buy Hugging Face for $12.93 billion — the largest company it has ever bought outright, and a straight line from the silicon to the place the models are published. Nvidia now sells the chips, and owns the shelf the open-weight world puts its models on.

### The clouds — AWS, Google Cloud, Azure, Oracle

The three hyperscalers plus Oracle rent the chips, the power and the buildings to everyone who does not own them, which is nearly everyone. They also serve the models: Claude runs on AWS Bedrock, Google Vertex AI and Microsoft Foundry; GPT on Azure; Gemini on Google. An enterprise that already pays AWS can add Claude to the bill without a new vendor, which is how most of the Fortune 500 adopted agents.

The clouds are also the biggest investors in the labs: Amazon and Google in Anthropic, Microsoft in OpenAI. The money goes round in a circle — the lab raises from the cloud, spends it on the cloud's chips, and the cloud books the revenue. Whether that circle is a flywheel or a bubble is the question the 2026 earnings season has been trying to answer, and Q2 said flywheel: AWS grew 37%, Google Cloud 82%, Azure in the forties, all capacity-constrained.

### The power — the constraint nobody planned for

Microsoft has reported around $80 billion of Azure orders it cannot fulfil because the chips are in inventory waiting for electricity — its chief executive's words, not a critic's: "you may actually have a bunch of chips sitting in inventory that I can't plug in." Data centres now compete for grid connections, gas turbines and nuclear restarts. Power is the new bottleneck, and utilities, turbine makers and the nuclear industry have become AI infrastructure companies without changing what they do.

### The model hub — Hugging Face

When DeepSeek, Alibaba or Meta publish model weights, they land on Hugging Face. It is the GitHub of models: the place open weights are hosted, downloaded, fine-tuned and compared, and the reason a solo builder can run Qwen on a laptop. Over a billion Qwen downloads happened here. More than 18 million people use it to share over 3 million models, half a million datasets and a million applications. Nothing in the open-weight world works without it.

Which is why its sale matters. On 2 September 2026 Nvidia agreed to buy it for $12.93 billion, subject to regulatory approval and expected to close in the first half of 2027. Nvidia has committed to keeping the platform open: its own compute will not be required to build or deploy through it, other chipmakers stay supported, and anyone can go on publishing and downloading what they like. Those are commitments, not yet a track record. The neutral ground of the open-model world is being bought by the company that sells the hardware it runs on, and the next few years will show what that is worth.

### The code host — GitHub

Where the software lives and where the agents commit it. Claude Code and Codex write pull requests to GitHub; OpenClaw and Paperclip's star counts are GitHub's; Copilot, Microsoft's coding agent, is built into it. As agents write a growing share of all code, GitHub becomes the ledger of the agentic economy's work.

### The payment rails — Stripe

Agents that can pay run through Stripe. Polsia companies take payment through it, Muse checks out with one-time Stripe cards, NanoCorp builds a Stripe account into every business it launches, and the guides you are reading were bought through it. Agentic commerce — agents buying, selling and paying each other — is a Stripe product before it is anyone else's.

### The connective tissue — MCP, A2A, the foundation

Two open standards under the Linux Foundation's Agentic AI Foundation let any agent use any tool (MCP) and talk to any other agent (A2A). They are the picks and shovels nobody sells: free, vendor-neutral, and the reason the rest of the stack interoperates. See the WTF is an API guide.

@spacer 4

## How the money flows

@body_lead Follow one $7 guide sale on wtfagents.com and you have followed the whole economy.

A reader pays through Stripe. The site runs on Vercel, which runs on AWS. The guide was drafted with Claude, served from Anthropic's infrastructure on Google and Amazon clouds, on Nvidia chips, in data centres drawing power a utility built capacity for. The site's code sits on GitHub. The live stats on the homepage come from Polsia's API, whose agents run on Claude, on the same chips.

Scale that to every agent task in the world — ten to fifty times the tokens of a chatbot answer, millions of times a day — and the capital spending numbers in the box stop looking irrational. Inference, not training, is now the growth engine, and every agent run is a small payment to this layer.

@spacer 4

## The bubble question, honestly

@body_lead The spending is unprecedented; the revenue is real and accelerating; the two are not yet in balance.

The case for a bubble: $725 billion of capex in one year, free cash flow at the big four projected to fall sharply as spending outruns revenue, most enterprise agent projects still not in production, and a circular flow of money between clouds and labs that flatters everyone's numbers.

The case against: backlogs in the hundreds of billions that customers have contractually committed to, every provider reporting demand above capacity into 2027, Nvidia's data-centre revenue nearly doubling year on year, and the shift to inference, which is recurring, not one-off. Agents consume tokens every day, forever, in a way that training runs never did.

The reading most careful analysts land on: the infrastructure is being built ahead of the revenue, as railways and fibre were, and some of it will be stranded. The companies in this guide will still own the tracks.

@spacer 4

## What it means for you

- → <b>Your costs are set here.</b> Token prices fall when this layer gets cheaper and rise when it is constrained. The 2025 price collapse in older GPUs is why running an agent went from hundreds of dollars a day to a few.
- → <b>Your outages happen here.</b> When a cloud region or a model provider has a bad day, every agent on it stops. Multi-model, multi-cloud is not paranoia for anything that matters.
- → <b>Your independence lives here — partly.</b> Open weights you have downloaded, code you have cloned, hardware you own: those cannot be switched off. The hubs they came from — Hugging Face now Nvidia's, GitHub Microsoft's — can change terms. Cache what you depend on.
- → <b>Your customers arrive here.</b> If you sell into enterprises, being available inside their cloud's marketplace matters more than any feature.
@spacer 3

@spacer 4

## Glossary

@gl <b>Picks and shovels</b> — The suppliers who profit from a boom regardless of which participant wins. From the Gold Rush.

@gl <b>Hyperscaler</b> — A cloud provider operating at global scale: Amazon (AWS), Microsoft (Azure), Google (Google Cloud), and increasingly Oracle.

@gl <b>Capex</b> — Capital expenditure: money spent building long-lived assets, here data centres and chips.

@gl <b>Accelerator</b> — A chip built for AI workloads: Nvidia GPUs, Google TPUs, Amazon Trainium, Microsoft Maia, Huawei Ascend.

@gl <b>CUDA</b> — Nvidia's software platform. The reason switching away from Nvidia chips is hard.

@gl <b>Inference</b> — Running a trained model to produce answers or actions. Now the majority of AI compute spending.

@gl <b>Training</b> — Building a model in the first place. Enormous, one-off, and no longer the biggest line item.

@gl <b>Backlog</b> — Revenue customers have contractually committed to but the provider has not yet delivered. A measure of demand sold ahead.

@gl <b>Hugging Face</b> — The hub for open-weight models: hosting, downloads, fine-tunes.

@gl <b>Bedrock / Vertex AI / Foundry</b> — The model marketplaces inside AWS, Google Cloud and Azure respectively.

@gl <b>Agentic commerce</b> — Agents buying, selling and paying. Runs on Stripe and its peers.

@spacer 6

@pagebreak

This is the layer everything else runs on. Here is what runs on it.

@spacer 4
