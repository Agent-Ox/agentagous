#!/usr/bin/env node
/**
 * post-to-hn.js — Playwright automation to post to Hacker News
 *
 * Usage:
 *   node post-to-hn.js            # Dry run (fills form, does NOT submit)
 *   node post-to-hn.js --submit   # Actually submits the post
 *
 * Credentials: ~/agentagous/.env  (HN_USERNAME, HN_PASSWORD)
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

loadEnv(path.join(__dirname, '.env'));

const HN_USERNAME = process.env.HN_USERNAME;
const HN_PASSWORD = process.env.HN_PASSWORD;

if (!HN_USERNAME || HN_USERNAME === 'your_hn_username') {
  console.error('❌  HN_USERNAME not set in .env — please add your HN credentials');
  process.exit(1);
}
if (!HN_PASSWORD || HN_PASSWORD === 'your_hn_password') {
  console.error('❌  HN_PASSWORD not set in .env — please add your HN credentials');
  process.exit(1);
}

// ── Post content (from hn-post-draft.md) ──────────────────────────────────
const POST = {
  url:   'https://wtfagents.com',
  title: 'I built a guide to AI agents for startup founders',
  text: `Hi HN! I built WTF Agents — a quick-start education platform for founders and CTOs who need to understand AI agents fast.

Problem: The agentic economy is growing (40% of enterprise apps embedding agents by end of 2026), but most founders are confused:
- When should I hire agents vs. engineers?
- What's the difference between LangGraph, CrewAI, n8n, and AutoGen?
- How do I actually deploy this stuff?

Solution: 14 micro-courses ($7 each, or $29–$49 bundles) that cover:
- WTF is an AI Agent (and why you should care)
- Agent frameworks that actually work (LangGraph, CrewAI, n8n)
- How to hire AI agents for your startup
- Prompt engineering for builders

Each course is 5–10 min (no fluff, just substance), PDF + video format, instant access.`,
};

// ── Main ───────────────────────────────────────────────────────────────────
const DRY_RUN = !process.argv.includes('--submit');

(async () => {
  console.log(`\n🚀  HN Post Automation`);
  console.log(`   Mode:  ${DRY_RUN ? '🔍 DRY RUN (will NOT submit)' : '⚠️  LIVE SUBMIT'}`);
  console.log(`   Title: ${POST.title}`);
  console.log(`   URL:   ${POST.url}\n`);

  const browser = await chromium.launch({
    headless: false,   // visible so you can watch / intervene
    slowMo: 300,       // slight delay so actions are visible
  });

  // HN blocks headless bots without a realistic user agent
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  try {
    // ── Step 1: Log in ───────────────────────────────────────────────────
    console.log('🔐  Logging in to Hacker News...');
    await page.goto('https://news.ycombinator.com/login', { waitUntil: 'domcontentloaded' });

    // HN login form has two sets of fields (login + create) — target first set
    await page.locator('input[name="acct"]').first().fill(HN_USERNAME);
    await page.locator('input[name="pw"]').first().fill(HN_PASSWORD);
    await page.locator('input[type="submit"]').first().click();

    await page.waitForLoadState('domcontentloaded');

    // Check login succeeded (no "Bad login" message)
    const pageContent = await page.content();
    if (pageContent.includes('Bad login') || pageContent.includes('login?whence')) {
      throw new Error('Login failed — check HN_USERNAME and HN_PASSWORD in .env');
    }

    // Verify we're logged in by looking for username in nav
    const loggedIn = await page.locator(`a[href="user?id=${HN_USERNAME}"]`).count();
    if (loggedIn === 0) {
      // Secondary check: see if we were redirected to the news page (login ok but no profile link visible)
      const url = page.url();
      if (url.includes('login')) {
        throw new Error('Login failed — credentials may be wrong');
      }
    }

    console.log(`✅  Logged in as: ${HN_USERNAME}`);

    // ── Step 2: Navigate to submit ───────────────────────────────────────
    console.log('📝  Navigating to submit page...');
    await page.goto('https://news.ycombinator.com/submit', { waitUntil: 'domcontentloaded' });

    // ── Step 3: Fill in the form ─────────────────────────────────────────
    console.log('✍️   Filling in submission form...');

    await page.fill('input[name="title"]', POST.title);
    console.log(`   • Title: "${POST.title}"`);

    await page.fill('input[name="url"]', POST.url);
    console.log(`   • URL: ${POST.url}`);

    // HN submit has a "text" field (for Ask HN posts without URL, or additional context)
    // Note: HN only shows the text field if URL is empty, OR it's a text post.
    // For URL submissions, text is not available in the standard submit form.
    // We fill title + url only for a standard link post.
    // The text from the draft can be used as a first comment after submission.
    const textField = await page.locator('textarea[name="text"]').count();
    if (textField > 0) {
      await page.fill('textarea[name="text"]', POST.text);
      console.log(`   • Text: filled (${POST.text.length} chars)`);
    } else {
      console.log(`   • Text: ℹ️  No text field (URL posts don't have one — post first comment after submission)`);
    }

    // ── Step 4: Screenshot before submit ────────────────────────────────
    const screenshotPath = path.join(__dirname, 'hn-submit-preview.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`\n📸  Screenshot saved: ${screenshotPath}`);

    if (DRY_RUN) {
      console.log('\n🛑  DRY RUN — stopping before submit.');
      console.log('   Run with --submit flag to actually post.\n');
      await page.waitForTimeout(3000); // keep browser open briefly for inspection
    } else {
      console.log('\n⚠️  SUBMITTING to Hacker News...');
      await page.click('input[type="submit"]');
      await page.waitForLoadState('domcontentloaded');

      const finalUrl = page.url();
      console.log(`\n✅  Submitted! Post URL (if successful): ${finalUrl}`);

      // Take a screenshot of the result
      const resultPath = path.join(__dirname, 'hn-submit-result.png');
      await page.screenshot({ path: resultPath, fullPage: true });
      console.log(`📸  Result screenshot: ${resultPath}`);
    }

  } catch (err) {
    console.error(`\n❌  Error: ${err.message}`);
    const errPath = path.join(__dirname, 'hn-error.png');
    await page.screenshot({ path: errPath }).catch(() => {});
    console.error(`   Screenshot saved: ${errPath}`);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
