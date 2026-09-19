---
slug: 'runway'
title: 'WTF is Runway'
file: 'wtf-is-runway.pdf'
cover_title: 'WTF is'
cover_subtitle: 'Runway?'
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  The studio that made Hollywood's first AI shots, co-created Stable Diffusion, and is now
  betting $315 million that video generation was only practice for simulating the world.
  What it does, what it costs, and why it stopped calling itself a filmmaking tool.

# store catalogue fields
order: 26
description: 'The professional AI video studio. Gen-4.5, the film and agency work, the pivot to world models, and what it costs. For people whose video is the product.'
price: 7
stripe_price_id: 'price_1UHPiUBaLipfLqFsIkyDcF2F'
category: 'creative'
badge: null
featured: false
starter: false
related: ['higgsfield', 'heygen']
hook: "Hollywood's AI studio *now wants to simulate reality.*"
best_for: "Best for: cinematic video"
capability: "Gen-4.5 and world models"
---
## The one-liner

@body_lead Runway is the professional end of AI video: a research lab and a studio that builds its own models — the Gen series — and the editing tools around them, used on real films, by real agencies, for shots that need to look intentional rather than generated.

Where Higgsfield aggregates fifty other people's models and HeyGen makes a presenter, Runway trains the model, and in 2026 it has started describing video generation as a means to a larger end: world models, AI that understands physics well enough to simulate an environment rather than paint a plausible frame of one.

@spacer 4

## By the numbers — September 2026

@stat $5.3B || valuation at the $315M Series E led by General Atlantic, 10 February 2026 — up from $3.3B ten months earlier
@stat $860M || total raised, with Nvidia, AMD, Adobe and Fidelity on the cap table
@stat $200M || annualised revenue as of 8 September 2026, doubled in five months — $40M of it added in Q2 alone
@stat 300%+ || net revenue retention, with the acceleration almost entirely enterprise
@stat Gen-4.5 || the current production model, out 1 December 2025: native audio, multi-shot, character consistency
@stat Dec 2025 || first world model shipped; a second promised for late 2026
@stat 2018 || founded in New York by three NYU graduates; co-creators of Stable Diffusion in 2022

@spacer 4

## What it actually does

@cap <b>Gen-4.5</b> — Text or image to video with the physics and prompt adherence that put it above Google's Veo 3 and OpenAI's Sora 2 Pro on the Artificial Analysis leaderboard at launch. Newer models from ByteDance and Alibaba have since passed it there; Runway's answer is that the leaderboard is not what its buyers are choosing on. Native audio, longer multi-shot sequences, and characters that stay the same person across cuts.

@cap <b>Editing, not just generating</b> — The tools that make it a studio: motion brush, camera controls, inpainting, green-screen removal, frame interpolation, upscaling. You direct the shot rather than accept it.

@cap <b>References and consistency</b> — Feed it a character, a location, a product, and keep them coherent across a whole sequence. The feature that made agency work possible.

@cap <b>Aleph 2.0 and Act-Two</b> — Edit an existing clip by describing the change: Aleph 2.0, shipped 21 May 2026 inside a new product called Edit Studio, does localised edits on up to thirty seconds of 1080p and can apply one edit across several shots. Act-Two is the performance-capture side, driving a generated character from a phone video.

@cap <b>World models</b> — The December 2025 release and the 2026 roadmap: systems that model object permanence, gravity, cause and effect, so a falling glass shatters instead of morphing. Aimed at robotics, simulation and science as much as film.

@cap <b>API</b> — Gen models available to developers for building products; how Higgsfield and others offer "Runway" inside their own tools.

@spacer 3

@body_lead The distinction that matters: Runway sells control. Everything in the interface exists so a person with taste can get the exact shot, not a random good one.

@spacer 4

## What it costs

@table keep 34,36,90
@tcells hs-row
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 0,1 -1,-1 [DARK_BG,ZINC_900]
| Plan | Price | Notes |
| Free | $0 | 125 credits, once, watermarked and lower resolution |
| Standard | $15/mo ($12 annual) | 625 credits a month, watermark off, 1080p |
| Pro | $35/mo ($28 annual) | 2,250 credits, more concurrent generations, higher resolution |
| Max | $95/mo ($76 annual) | 9,500 credits, a month of rollover, no queue |
| Enterprise | Custom | Studios and agencies: security, custom models, volume |
| API | Per second of video | Pay per generated second, by model |

@spacer 3

Max replaced the old Unlimited plan on 1 June 2026, and the trade is worth knowing: four times the credits, but Explore Mode — the slow lane where generation was genuinely unlimited — does not come with it. Legacy Unlimited subscriptions keep their access until 30 November 2026, and then everyone is on credits.

Runway changes credit rates with each model, so read the pricing page before committing. The constant: credits are consumed per second of video, and newer models cost more per second than older ones. A ten-second Gen-4.5 clip is a meaningful slice of a Standard plan.

@spacer 4

## Runway vs Higgsfield vs the big labs

@table keep 34,42,42,42
@tcells hs-row+col
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
|  | Runway | Higgsfield | Google Veo / others |
| Who trains the model | Runway | Nobody — it aggregates | The lab |
| Control | Full: brush, camera, edit | Presets and an agent | Prompt, limited edit |
| Best at | Intentional cinematic shots | Volume, speed, social | Raw quality on a prompt |
| Buyer | Film, agencies, studios | Creators, marketers | Consumers, developers |
| Independence | Owns its stack | Depends on model licences | Hyperscaler-backed |
| Price shape | Credits per second | Credits + API | Bundled or API |

@spacer 4

The category split in one line: Runway for the shot you can describe precisely, Higgsfield for the fifty shots you need by Friday, HeyGen when the shot is a person talking.

@spacer 4

## The pivot — from filmmaking tool to world model

For six years Runway's story was Hollywood: co-creating Stable Diffusion, shots in Everything Everywhere All At Once, deals with Lionsgate and AMC. In 2026 the founders started saying something different in public: that generating coherent video at scale is training data for a model that understands the physical world, and that such a model matters for robotics, drug discovery and climate simulation more than for film.

Two things make the bet credible. Runway owns its models and its infrastructure and is not inside a hyperscaler, which it argues lets it move faster than Google's Veo and Genie or Meta's efforts. And $315 million from General Atlantic, with Nvidia and AMD participating, is a war chest for exactly this. Two things make it risky: Google is attacking from both sides with Veo for video and Genie for simulation, and a company whose revenue is film and agency tools is now spending on a market that does not yet pay.

For a creator none of this changes the product today. It changes who Runway is building for next.

@spacer 4

## The catches

- → <b>Credits per second.</b> The best model is the most expensive per second and the one you want. Budget by finished seconds — and note there is no longer an unlimited tier to fall back on.
- → <b>Control has a learning curve.</b> The tools that make Runway a studio take time to learn. Higgsfield's presets get a marketer to a usable clip faster.
- → <b>Consumer-scale competition.</b> Google's Veo ships inside products billions of people already use; Runway's edge is the professional layer, and that layer is where the giants aim next.
- → <b>Rights and likeness.</b> As with every generator: references you upload need to be yours to use, and outputs resembling real people or copyrighted work are your risk.
- → <b>The roadmap points away from you.</b> If world models become the company, creator features may become the funding source rather than the focus.
@spacer 3

@spacer 4

## Who it is for

@fit <b>Yes</b> — Filmmakers, agencies, designers and creators whose video is the product and who want to direct the shot: consistent characters, specific camera moves, edits on existing footage.

@fit <b>Not yet</b> — Anyone who needs volume over precision (Higgsfield), or who will not spend the hours the tools deserve.

@fit <b>No</b> — Anyone who needs a presenter (HeyGen) or the occasional clip (whatever is bundled in their chat app).

@spacer 4

## Why it matters

Runway is the proof that a small lab can own a frontier: it trained its own models, held a quarter of a billion-dollar market against Google and OpenAI, and is now trying to turn video into a physics engine. If world models work, the same company that made AI film shots will be making the simulators that train robots. If they do not, it remains the best studio in the category. Either way it is the one to watch on the creative side of the agentic economy.

@spacer 4

## Glossary

@gl <b>Runway</b> — New York AI research company and video studio, founded 2018. Builds the Gen video models and the editing tools around them. $5.3B valuation, $200M ARR.

@gl <b>Gen-4.5</b> — Runway's current production video model: native audio, multi-shot, character consistency.

@gl <b>World model</b> — An AI system that models how an environment behaves — physics, permanence, cause and effect — rather than predicting the next frame. Runway's stated direction since 2025.

@gl <b>Stable Diffusion</b> — The open image-generation model Runway co-created in 2022 with Stability AI and academics; the start of open generative media.

@gl <b>Motion brush / camera control</b> — Runway tools for directing what moves and how the shot is framed.

@gl <b>Reference</b> — An image of a character, place or object the model keeps consistent across generations.

@gl <b>Credits per second</b> — Runway's billing: each generated second costs credits, more for newer models.

@gl <b>Explore Mode</b> — The slower, unlimited-generation lane on the old Unlimited plan. Not part of Max, and gone for everyone after 30 November 2026.

@gl <b>Veo / Genie</b> — Google's video model and world-simulation research, Runway's main competition on both fronts.

@spacer 6

@pagebreak

## Liked this? Go deeper.

Runway is the studio. Here is the rest of the creative stack.

@spacer 4
