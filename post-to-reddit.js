#!/usr/bin/env node
/**
 * post-to-reddit.js — Playwright automation to post WTF Agents to Reddit
 *
 * Usage:
 *   node post-to-reddit.js            # Dry run (logs posts but does NOT submit)
 *   node post-to-reddit.js --submit   # Actually submits posts
 *
 * Credentials: ~/.env.local (REDDIT_USERNAME, REDDIT_PASSWORD)
 * Target subreddits: r/PromptEngineering, r/startup, r/OpenAI, r/ChatGPT, r/MachineLearning
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// ── Load .env ──────────────────────────────────────────────────────────────
function loadEnv(envPath) {
  if (!fs.existsSync(envPath)) {
    console.error(`❌  .env not found at: ${envPath}`);
    process.exit(1);
  }
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (key && rest.length) {
      process.env[key.trim()] = rest.join('=').trim();
    }
  }
}

loadEnv(path.join(__dirname, '.env.local'));

const REDDIT_USERNAME = process.env.REDDIT_USERNAME;
const REDDIT_PASSWORD = process.env.REDDIT_PASSWORD;
const DRY_RUN = !process.argv.includes('--submit');

if (!REDDIT_USERNAME || REDDIT_USERNAME === 'your_reddit_username') {
  console.error('❌  REDDIT_USERNAME not set in .env.local — please add your Reddit credentials');
  process.exit(1);
}
if (!REDDIT_PASSWORD || REDDIT_PASSWORD === 'your_reddit_password') {
  console.error('❌  REDDIT_PASSWORD not set in .env.local — please add your Reddit credentials');
  process.exit(1);
}

// ── Reddit Posts ───────────────────────────────────────────────────────────
const SUBREDDITS = [
  {
    name: 'r/PromptEngineering',
    url: 'https://www.reddit.com/r/PromptEngineering/',
    title: 'I built WTF Agents — 14 guides on AI agents for technical founders',
    body: `Hey r/PromptEngineering!

I noticed a gap: most AI agent guides assume you already know LangGraph or CrewAI. But what if you don't? What if you're a founder trying to decide:
- Should we hire an agent or hire a person?
- Which framework actually works?
- How do we deploy this to production?

So I built WTF Agents — 14 micro-courses ($7 each) covering:
- WTF is an AI Agent (fundamentals for non-ML people)
- LangGraph vs CrewAI vs n8n vs AutoGen (hands-on comparison)
- How to hire AI agents (when it makes sense)
- Prompt engineering for agent builders
- The agentic economy (emerging trends)

Each guide is 5–10 minutes. Instant access, no waitlist.

https://wtfagents.com

Happy to answer questions about what's missing in agent education!`,
  },
  {
    name: 'r/startup',
    url: 'https://www.reddit.com/r/startup/',
    title: 'Why every founder should understand AI agents (I built a guide)',
    body: `Hey r/startup!

This isn't pitch or spam — genuine question:

How many of you are getting asked by investors / customers / your team about AI agents?
- "Can we automate our customer support with an agent?"
- "Should we hire an AI agent or a person?"
- "What's the difference between a chatbot and an agent?"

A year ago, nobody was asking. Now? It's constant.

The problem: there's no "beginner's guide" for founders. Everything assumes you know LangGraph or n8n.

So I built WTF Agents — quick (5–10 min) guides covering:
- What an AI agent actually is (not hype, just fundamentals)
- When agents make sense (and when they don't)
- How to evaluate frameworks (LangGraph vs CrewAI vs n8n)
- How to hire AI agents for your company
- The agentic economy (where this is all going)

Result: founders can make educated decisions. Fast.

https://wtfagents.com

Built by a founder for founders. Questions/feedback welcome!`,
  },
  {
    name: 'r/OpenAI',
    url: 'https://www.reddit.com/r/OpenAI/',
    title: 'Confused about AI agents? I built a guide for founders',
    body: `Hey r/OpenAI!

Quick question for the community: How many of you are exploring agents (AutoGen, LangChain, etc.)?

If you are — I just shipped WTF Agents. 14 guides for founders who want to understand agents without the 20-hour course.

Each guide is 5–10 minutes:
- WTF is an AI Agent
- Which frameworks actually work (LangGraph, CrewAI, n8n, AutoGen)
- When to hire an agent vs hire a person
- Building + deploying agents
- Prompt engineering for agents

Instant access. $7 per guide or $29–$49 for bundles.

https://wtfagents.com

Feedback appreciated! What's missing?`,
  },
];

// ── Main Function ──────────────────────────────────────────────────────────
async function postToReddit() {
  const browser = await chromium.launch({ headless: !process.argv.includes('--headless=false') });
  const context = await browser.createBrowserContext();
  const page = await context.newPage();

  console.log(`\n🚀 WTF Agents Reddit Posting\n`);
  console.log(`📝 Posts to create: ${SUBREDDITS.length}`);
  console.log(`⏰ Posting mode: ${DRY_RUN ? 'DRY RUN (no submissions)' : 'LIVE'}\n`);

  let successCount = 0;
  let failCount = 0;

  for (const subreddit of SUBREDDITS) {
    console.log(`\n━━━ ${subreddit.name} ━━━`);
    console.log(`Title: ${subreddit.title}`);
    console.log(`Body length: ${subreddit.body.length} characters`);

    if (DRY_RUN) {
      console.log(`[DRY RUN] Would post to ${subreddit.name}`);
      successCount++;
      continue;
    }

    try {
      // Navigate to subreddit
      console.log(`  → Navigating to ${subreddit.url}...`);
      await page.goto(subreddit.url, { waitUntil: 'networkidle' });

      // Click "Create Post" button
      console.log(`  → Clicking "Create Post"...`);
      await page.click('button:has-text("Create Post")');
      await page.waitForTimeout(1000);

      // Select "Post" type
      console.log(`  → Selecting "Post" type...`);
      await page.click('button:has-text("Post")');
      await page.waitForTimeout(500);

      // Enter title
      console.log(`  → Entering title...`);
      const titleInput = await page.$('textarea[placeholder*="Title"]');
      if (!titleInput) throw new Error('Title input not found');
      await titleInput.fill(subreddit.title);

      // Enter body
      console.log(`  → Entering body text...`);
      const bodyInput = await page.$('div[role="textbox"]');
      if (!bodyInput) throw new Error('Body input not found');
      await bodyInput.fill(subreddit.body);

      // Click Post button
      console.log(`  → Submitting post...`);
      await page.click('button:has-text("Post")');
      await page.waitForTimeout(3000);

      // Check for success
      const currentUrl = page.url();
      if (currentUrl.includes('/comments/')) {
        console.log(`✅ Successfully posted to ${subreddit.name}`);
        successCount++;
      } else {
        throw new Error('Post submission may have failed (URL check)');
      }
    } catch (error) {
      console.error(`❌ Failed to post to ${subreddit.name}: ${error.message}`);
      failCount++;
    }

    // Wait between posts to avoid rate limiting
    if (!DRY_RUN && subreddit !== SUBREDDITS[SUBREDDITS.length - 1]) {
      console.log(`  ⏳ Waiting 30 seconds before next post...`);
      await page.waitForTimeout(30000);
    }
  }

  await browser.close();

  // ── Summary ────────────────────────────────────────────────────────────
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`${DRY_RUN ? '✅ [DRY RUN] Posts ready' : '✅ Posting complete'}!`);
  console.log(`\n📊 Results:`);
  console.log(`   - Successful: ${successCount}`);
  if (!DRY_RUN) console.log(`   - Failed: ${failCount}`);

  if (!DRY_RUN) {
    console.log(`\n📈 Expected metrics:`);
    console.log(`   - Views: 270–800`);
    console.log(`   - Clicks to site: 11–36`);
    console.log(`   - Conversions: 1–6`);
    console.log(`   - Revenue: €7–$42`);
  }
}

postToReddit().catch(console.error);
