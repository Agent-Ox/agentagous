---
slug: 'api'
title: 'WTF is an API'
file: 'wtf-is-an-api.pdf'
cover_title: 'WTF is an'
cover_subtitle: 'API?'
cover_meta: 'WTF Agents · wtfagents.com · March 2026'
subtitle: >-
  APIs are mentioned in almost every conversation about AI, tech, and the agentic economy.
  Almost no one explains what they actually are. This guide does — in plain English,
  finally.

# store catalogue fields
order: 2
description: 'The thing connecting everything in the agentic economy — explained simply, finally.'
hook: 'The plumbing that connects *everything in the agentic economy.*'
best_for: 'Best for: business owners'
capability: 'MCP explained'
price: 7
stripe_price_id: 'price_1UGzTBBaLipfLqFsuDoH0ktV'
category: 'foundation'
badge: null
featured: false
related: ['ai-agent', 'llm']
starter: false
---
## The one-liner

@body_lead An API (Application Programming Interface) is a set of rules that lets two pieces of software talk to each other.

That is it. That is the whole thing. Everything else in this guide is just unpacking what that means in practice.

@spacer 4

## The restaurant analogy

The best analogy for an API is a restaurant.

You are sitting at a table. You want food. The kitchen can make food. But you do not walk into the kitchen and start cooking. You do not shout instructions at the chef. You use a menu and a waiter.

The menu tells you what the kitchen can make. The waiter takes your order to the kitchen and brings the food back.

In this analogy: you are the application making a request. The kitchen is the other software (a database, a service, an AI model). The waiter is the API. The menu is the API documentation.

@body_lead The API is the agreed-upon way that two systems communicate — what you can ask for, how you ask for it, and what you get back.

@spacer 4

## A real-world example

Here is what actually happens when you use a weather app on your phone:

- → You open your weather app.
- → The app does not have weather data stored on your phone.
- → It sends a request to a weather service's API: "Give me the forecast for Chicago."
- → The weather service's servers process the request.
- → The API sends back the data: temperature, humidity, forecast for the next 7 days.
- → Your app displays it in a nice interface.
@spacer 3

You never saw any of that. You just saw the weather. But an API made the whole thing work.

This same pattern — request, process, respond — underpins almost everything on the internet. Every time you log in with Google, every time you pay with Stripe, every time you share to Twitter, every time an AI agent takes an action in the world — an API is involved.

@spacer 4

## Why APIs matter for the agentic economy

@body_lead APIs are the reason AI agents can do anything useful.

An AI agent on its own is just a brain in a jar — it can think and plan but it cannot act. APIs are the hands and legs. They are how agents connect to the real world.

Here are examples of what agents do via APIs:

@table keep 45,115
@tcells hs-row+col
@tstyle BACKGROUND 0,0 -1,0 ZINC_800
@tstyle BACKGROUND 0,1 0,-1 ZINC_900
@tstyle GRID 0,0 -1,-1 0.5 ZINC_600
@tstyle PADDING 0,0 -1,-1 8
@tstyle VALIGN 0,0 -1,-1 TOP
@tstyle ROWBACKGROUNDS 1,1 -1,-1 [DARK_BG,ZINC_900]
| Action | How the agent does it |
| Send an email | The agent calls Gmail's API or SendGrid's API with the message content, recipient, and subject. |
| Browse the web | The agent calls a web scraping API or uses a browser automation tool exposed via API. |
| Process a payment | The agent calls Stripe's API with the amount and card details. |
| Post to social media | The agent calls the Twitter/X API or LinkedIn API with the post content. |
| Read a spreadsheet | The agent calls the Google Sheets API to retrieve or update data. |
| Book a calendar slot | The agent calls the Google Calendar or Calendly API. |
| Query a database | The agent calls the Supabase or Postgres API to read or write records. |
| Use an AI model | The agent calls the Anthropic API or OpenAI API to get Claude or GPT to think through a problem. |

@spacer 4

Without APIs, an AI agent would be like a genius who has been locked in a room with no phone, no computer, and no way to interact with the outside world. APIs open the door.

@spacer 4

## MCP — the API for AI agents

One of the most important developments in the agentic economy is the Model Context Protocol (MCP) — invented by Anthropic and published in November 2024.

Before MCP, connecting an AI agent to a specific tool or data source required custom engineering. Every integration was different. It was like every electrical appliance having a different plug.

@body_lead MCP standardised it. It is the universal plug — the USB-C for AI. If a tool supports MCP, any AI agent can connect to it without custom code.

As of 2026, MCP is supported by OpenAI, Google, Microsoft, and virtually all major agent frameworks. It has been donated to the Agentic AI Foundation (backed by Anthropic, OpenAI, Google, Microsoft, Amazon, and Cloudflare) — making it a permanent, neutral open standard.

This matters because it means the ecosystem of tools available to AI agents is growing exponentially. Every new MCP-compatible tool immediately becomes available to every MCP-compatible agent.

@spacer 4

## The types of API you will hear about

### REST APIs

The most common type. Uses standard web requests (GET, POST, PUT, DELETE) to retrieve or send data. When someone says "the API" without specifying, they almost always mean a REST API. The Polsia API that WTF Agents uses to track company data is a REST API.

### Webhooks

Instead of you asking the API for data, the API calls you when something happens. Example: Stripe fires a webhook to your server the moment a payment completes. You do not have to keep asking "has the payment gone through?" — Stripe tells you when it does.

### GraphQL APIs

A more flexible alternative to REST. Instead of getting a fixed set of data, you specify exactly what fields you want. More efficient but more complex to use.

### Streaming APIs

Send data continuously rather than in one response. This is why ChatGPT and Claude type out their responses word by word — the AI is streaming its output via a streaming API rather than waiting until it has finished the whole response.

### SDK (Software Development Kit)

Not technically an API itself, but often confused with one. An SDK is a package of code that wraps an API and makes it easier to use. The Anthropic SDK is a Python or JavaScript package that handles the technical details of calling the Claude API.

@spacer 4

## API keys — what they are and why they matter

Almost every API requires an API key — a unique string of characters that identifies who is making the request.

Think of an API key as a password for a service. When you sign up for the Anthropic API, OpenAI API, or Stripe, they give you a key that looks something like this: sk-ant-api03-xxxxxxxxxxxxx

API keys matter for three reasons:

- → <b>Authentication</b> — the service knows it is you making the request, not someone else.
- → <b>Billing</b> — usage is tracked against your key. Lose your key and someone else runs up your bill.
- → <b>Rate limiting</b> — services use keys to enforce limits on how many requests you can make.
@spacer 3

@body_lead The golden rule: never share your API keys publicly. Never commit them to GitHub. Store them in environment variables (a secure way of passing sensitive values to software without hardcoding them into your code).

@spacer 4

## APIs in everyday life — you use them constantly

You interact with APIs dozens of times a day without knowing it:

@ev <b>Logging in with Google</b> — Google's OAuth API verifies your identity and tells the other site you are who you say you are.

@ev <b>Paying online</b> — Stripe's payment API processes your card securely without the website ever seeing your full card number.

@ev <b>Checking the weather</b> — Your phone's weather app calls a meteorological data API.

@ev <b>Getting directions</b> — Google Maps or Apple Maps API calculates your route.

@ev <b>Posting to Instagram</b> — The Instagram API receives your photo and caption and stores it.

@ev <b>Reading your emails in a third-party app</b> — Gmail's API gives the app access to your emails.

@ev <b>Using "Sign in with Apple"</b> — Apple's authentication API verifies you.

@ev <b>An AI agent booking your travel</b> — The agent calls APIs for flights, hotels, and calendar — all in one automated flow.

@spacer 4

## Do you need to understand APIs to use AI agents?

@body_lead Honestly — not really, for most use cases.

Platforms like OpenClaw, Polsia, and Paperclip handle the API connections for you. You describe what you want the agent to do, and the platform handles the technical plumbing of which APIs to call and how.

But understanding what APIs are — and that they exist — helps you in three ways:

- → You understand why agents can do what they can do (and why they sometimes cannot).
- → You can evaluate agent platforms more intelligently — asking "what APIs does this connect to?"
- → If you want to build something custom, you know what to look for.
@spacer 3

The agentic economy runs on APIs. You do not need to be a plumber to live in a house with running water. But knowing that pipes exist, and roughly how they work, makes you a more informed resident.

@spacer 4

## Glossary

@gl <b>API (Application Programming Interface)</b> — A set of rules that lets two pieces of software communicate with each other.

@gl <b>REST API</b> — The most common type of API. Uses standard web requests to send and receive data.

@gl <b>Webhook</b> — An API that pushes data to you when something happens, rather than waiting for you to ask.

@gl <b>API key</b> — A unique identifier used to authenticate API requests. Treat it like a password.

@gl <b>MCP (Model Context Protocol)</b> — Anthropic's open standard for connecting AI agents to external tools. The universal plug for AI.

@gl <b>SDK (Software Development Kit)</b> — A package of code that makes it easier to use an API in a specific programming language.

@gl <b>Endpoint</b> — A specific URL that an API exposes for a specific type of request. E.g. /api/data is the endpoint for Polsia's company data.

@gl <b>Rate limiting</b> — A restriction on how many API requests you can make in a given time period.

@gl <b>Authentication</b> — The process of proving who you are to an API, usually via an API key or OAuth token.

@gl <b>Streaming</b> — An API that sends data continuously rather than all at once. How Claude and ChatGPT deliver responses word by word.

@spacer 6

@pagebreak

Now you know what APIs are — here is where to go next in the WTF Agents series.

@spacer 4
