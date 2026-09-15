#!/usr/bin/env node
/**
 * post-to-ph.js — Product Hunt launch helper
 *
 * NOTE: Product Hunt does NOT have a simple form-filling automation path like HN.
 * This script helps manage the launch workflow and prepare content.
 *
 * Manual steps required:
 * 1. Visit https://www.producthunt.com/products/new
 * 2. Use the values below to fill the form
 * 3. Schedule post for 12:01 AM PT (9:00 AM CET)
 * 4. Return here and run: node post-to-ph.js --after-launch
 *
 * Usage:
 *   node post-to-ph.js              # Display pre-filled content for manual entry
 *   node post-to-ph.js --after-launch  # Prepare maker comment for first 30 min
 */

const fs = require('fs');

// ── Product Hunt Submission Content ────────────────────────────────────────
const PH_SUBMISSION = {
  tagline: 'WTF Agents — founder-friendly AI agent education (no fluff, all signal)',
  description: `We're in an agent explosion, but most founders still can't answer: When do I hire an agent? Which framework? How do I ship this?

WTF Agents is 14 micro-courses ($7 each, bundles $29–$49) designed for founders and CTOs who need to understand AI agents right now — no 20-hour slog, no theoretical fluff.

Each course is 5–10 minutes of pure signal:
- WTF is an AI Agent? Why they matter for your startup
- Agent Frameworks: LangGraph, CrewAI, n8n (what's actually different?)
- How to Hire an AI Agent: Outsource vs. build — when to do each
- Prompt Engineering for Builders: Ship working agents this week
- Plus 10 more covering deployment, agentic economics, real-world patterns

Built for operators, by an operator. No fluff, no corporate speak.

Who's this for? Founders, CTOs, engineers, technical co-founders who want to ship faster and understand the agentic economy before it moves on.`,
  
  websiteUrl: 'https://wtfagents.com',
  category: 'Education', // Product Hunt category
};

// ── Maker Comment (post within 30 min of launch) ────────────────────────────
const MAKER_COMMENT = `Hey Product Hunt! 🤖

I built WTF Agents because I was drowning in agent frameworks and no one could explain them simply. Just shipped to Hacker News yesterday where founders were asking the exact same questions.

Why this exists: The agentic economy is happening now (Klarna's agents handle 700+ employees' worth of work). If you're a founder and you don't understand agents, you're betting blind.

These courses exist because we need a 5-min version of "what is an AI agent" that actually makes sense. Not a 20-hour course. Not crypto fluff. Just signal.

For PH community: First 50 people get the bundle pack ($29 value) for $7. Just use code PRODUCTHUNT at checkout.

[Link to HN post] — check the thread if you want to see how founders are thinking about this problem right now.

What's missing? Happy to build what founders actually need.`;

// ── Launch Workflow ────────────────────────────────────────────────────────
function displaySubmissionContent() {
  console.log('\n📋 PRODUCT HUNT SUBMISSION — Copy these values into the form\n');
  console.log('Tagline:');
  console.log(PH_SUBMISSION.tagline);
  console.log('\n---\n');
  console.log('Description:');
  console.log(PH_SUBMISSION.description);
  console.log('\n---\n');
  console.log('Website URL:');
  console.log(PH_SUBMISSION.websiteUrl);
  console.log('\n---\n');
  console.log('Category: ' + PH_SUBMISSION.category);
  console.log('\n✅ Copy the above into https://www.producthunt.com/products/new');
  console.log('⏰ Schedule for: 12:01 AM PT (= 9:00 AM CET same day)');
  console.log('\n');
}

function displayMakerComment() {
  console.log('\n💬 MAKER COMMENT — Post within 30 minutes of launch\n');
  console.log('Copy this text into a comment on the WTF Agents product page:');
  console.log('\n---\n');
  console.log(MAKER_COMMENT);
  console.log('\n---\n');
  console.log('⏰ Post timing: 9:00–9:30 AM CET (within 30 min of launch)');
  console.log('📌 Pin this comment to the top via the three-dot menu');
  console.log('\n');
}

// ── Main ───────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);

if (args.includes('--after-launch')) {
  displayMakerComment();
} else {
  displaySubmissionContent();
  console.log('\nNext step:');
  console.log('1. Fill the form at https://www.producthunt.com/products/new');
  console.log('2. Schedule for 12:01 AM PT (9:00 AM CET)');
  console.log('3. After launch, run: node post-to-ph.js --after-launch');
  console.log('\n');
}
