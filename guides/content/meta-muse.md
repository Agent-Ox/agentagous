---
slug: 'meta-muse'
title: 'WTF is Meta Muse'
file: 'wtf-is-meta-muse.pdf'
cover_title: 'WTF is'
cover_subtitle: 'Meta Muse?'
cover_meta: 'WTF Agents · wtfagents.com · September 2026'
subtitle: >-
  Meta's personal AI agent lives in WhatsApp, books your travel, sells your car, lowers
  your bills and pays with its own card — free, for three billion people. What it does,
  how it is built, what it costs, and what you are handing over.

# store catalogue fields
order: 14
description: 'Meta''s free personal agent in WhatsApp. What it does, the security design, the pricing, and the trust question nobody puts in the demo.'
price: 7
stripe_price_id: 'price_1UGyCYBaLipfLqFshYJ1S4Jw'
category: 'personal'
badge: '🆕 New'
featured: true
starter: false
related: ['openclaw', 'which-ai']
---
## The one-liner

@body_lead Meta Muse is a personal AI agent that does things for you rather than answering questions: it books travel, fills in forms, manages your inbox, negotiates a bill, sells something on your behalf, and checks out with a one-time card — from its own app or straight inside WhatsApp.

It launched on 8 September 2026 for adults in the United States, free for most of what people need. It is the first personal agent from a company with three billion messaging users, and that distribution, more than any feature, is why it matters.

@spacer 4

## By the numbers — September 2026

@stat 8 Sept || 2026: launch, US only, 18+, on iOS, Android, web and inside WhatsApp
@stat $0 || for most use, with a metered free allowance. Power at $20/mo, Maximum at $100/mo for heavier use
@stat 1 || dedicated cloud computer per user — its own browser, its own isolated environment
@stat 3B+ || people already on WhatsApp, Instagram and Facebook: the distribution Muse is built to ride
@stat Spark 1.3 || the Meta model it runs on, released 2 September, also behind Muse Code and Meta AI
@stat 0 || countries beyond the US at launch; AI glasses support promised

@spacer 4

## What it actually does

You message Muse like a person. "Find me a cheaper phone plan." "Book the dentist for next week." "Sell the old bike." "Get this bill down." It makes a plan, opens its own browser, works through websites the way a person would, and keeps going after you close the app — coming back when it needs a decision or a signature.

@task <b>Travel</b> — Searches, compares, books flights and hotels, handles the confirmation emails.

@task <b>Inbox and calendar</b> — Reads your email, drafts replies, schedules, finds the thing you were looking for.

@task <b>Forms and admin</b> — Fills in applications, renewals, registrations. The tedious layer of adult life.

@task <b>Shopping and paying</b> — Finds the product, checks out with a one-time virtual card so the merchant never gets your real number.

@task <b>Selling and negotiating</b> — Lists an item, fields the messages, haggles. Calls a provider to lower a bill.

@task <b>Memory across Meta</b> — With permission, it uses your Instagram saves, Facebook activity and WhatsApp chats: a recipe you saved becomes a shopping list; a place you liked becomes a booking suggestion.

@spacer 3

@body_lead What it does not do: make content. No images, no video, no posts. Muse manages the life around your work, not the work. For that you want Cowork, ChatGPT Work or Grok Bot.

@spacer 4

## How it is built — the part that stands out

Most personal agents run on your machine with your logins (OpenClaw) or inside a chat app with limited reach. Muse does something different, and the design is the most careful in the consumer market so far.

### Its own computer

Each Muse runs on a dedicated virtual machine in Meta's cloud — a separate computer with its own browser. It never touches your device. Meta calls this Muse Secure VM.

### A guard between it and the internet

A second agent, called Sentinel, sits between Muse and the outside world. Anything Muse tries to send — a form submission, a payment, a message — has to pass Sentinel first. The idea is that a Muse that has been tricked by a malicious web page still cannot act on it without the guard agreeing.

### A vault it cannot see into

Your passwords and card details sit in a credential vault. Muse can use them to log in and pay, but cannot read them. Payments run through one-time cards.

### Confirmation before anything that matters

Sensitive actions — spending money, sending a message in your name, anything irreversible — come back to you for a tap before they happen.

@spacer 3

None of this is audited by anyone outside Meta yet. It is, on paper, the best-designed consumer agent security story to date. Whether it holds is a question for the first year.

@spacer 4

## What it costs

@table keep 34,40,86
@tcells hs-row
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 0,1 -1,-1 [DARK_BG,ZINC_900]
| Plan | Price | What you get |
| Free | $0 (card required) | The full agent, with a metered allowance that warns you as you approach it |
| Power | $20/mo | More tasks, more compute |
| Maximum | $100/mo | The most tasks, priority access, for people who hand it a lot |

@spacer 3

Meta has not published quotas for any tier. Because one request — "find me a cheaper plan" — can mean hours of browsing and dozens of pages, the useful measure is cost per finished task, not price per month. Try the free tier for a week and watch the meter before deciding.

@spacer 4

## Muse vs OpenClaw vs Grok Bot

@table keep 34,42,42,42
@tcells hs-row+col
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
|  | Muse | OpenClaw | Grok Bot |
| What it is for | Your life's admin | Anything you configure | Your work |
| Where it runs | Meta's cloud | Your machine | xAI's cloud |
| Who picks the model | Meta (Spark) | You, any model | xAI (Grok) |
| Cost | Free, $20, $100 | Free + model usage | Subscription |
| Setup | None | Real, technical | Some |
| Your data | With Meta | With you | With xAI |
| Availability | US only | Everywhere | Wide |

@spacer 4

Muse is the managed, zero-setup version of what OpenClaw people have been building by hand since late 2025. Muse is convenience at the price of control; OpenClaw is the reverse.

@spacer 4

## The catches

@body_lead Muse asks for a level of trust no chatbot ever did: your email, your calendar, your browser, your card, in the hands of a brand-new product from the company that built Facebook.

- → <b>Training on your data is on by default.</b> Meta's terms allow training on Muse interactions unless you opt out. Find the setting before you connect your inbox.
- → <b>It launched rough.</b> Meta's own employees, testing during launch week, reported exposed iCloud photos, repeated logouts and monitoring switching itself off. Version-one problems, fixed quickly, and a reminder of what "new" means.
- → <b>Prompt injection is not solved.</b> Sentinel is a serious answer to hidden instructions in web pages, and it is the best one in the consumer market. It is not a guarantee.
- → <b>US only, 18 only.</b> No other country has a date.
- → <b>Meta is Meta.</b> The privacy record is what it is. Muse's security claims — no password visibility, no ad-targeting from agent data — are Meta's, unaudited. Decide accordingly.
@spacer 3

@spacer 4

## Who it is for

@fit <b>Yes</b> — Anyone already living in WhatsApp and Instagram who wants the admin of life handled and is comfortable with Meta holding the keys. The zero-setup personal agent people have been waiting for.

@fit <b>Not yet</b> — Anyone outside the US, or anyone with a serious privacy stance toward Meta. Watch the first six months.

@fit <b>No</b> — Anyone who wants an agent for their work rather than their life, or who wants to own the agent. That is Cowork, Grok Bot, or OpenClaw.

@spacer 4

## Why it matters

Every other agent in this series had to earn its users. Muse starts with three billion of them already opening the app it lives in. If personal agents become a habit, this is the most likely product to make them one — and it sets the bar for what "free" means: the full agent, metered, paid for by the people who lean on it hardest.

It also puts Meta, which spent 2025 losing the model race, back in it with the most ambitious consumer agent shipped so far. Whether it is trusted is now the only question.

@spacer 4

## Glossary

@gl <b>Meta Muse</b> — Meta's personal AI agent, launched 8 September 2026. Acts on your behalf from its own app or inside WhatsApp.

@gl <b>Muse Spark</b> — The model family Muse runs on. Also behind Meta AI, Muse Code and Meta's model API.

@gl <b>Muse Secure VM</b> — The dedicated cloud computer each Muse runs on, isolated from your devices.

@gl <b>Sentinel</b> — The guard agent that must approve anything Muse sends to the internet.

@gl <b>Credential vault</b> — Where your passwords and cards live: usable by Muse, not readable by it.

@gl <b>One-time card</b> — A virtual card number for a single purchase, so merchants never see your real one.

@gl <b>Personal agent</b> — An agent that runs your life's admin, as opposed to your job's work. Muse, OpenClaw.

@gl <b>Meta Superintelligence Labs</b> — The Meta division, led by Alexandr Wang, that built Muse.

@spacer 6

@pagebreak

## Liked this? Go deeper.

Muse is the newest personal agent. Here are the others, and the model question behind it.

@spacer 4
