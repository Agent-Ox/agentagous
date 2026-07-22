#!/usr/bin/env node

/**
 * Post WTF Agents thread to Twitter/X
 * Requires: TWITTER_BEARER_TOKEN in .env.local
 * Usage: node post-to-twitter.js [--dry-run]
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load .env.local explicitly
dotenv.config({ path: '.env.local' });

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

if (!BEARER_TOKEN) {
  console.error('❌ Error: TWITTER_BEARER_TOKEN not found in .env.local');
  process.exit(1);
}

// WTF Agents thread tweets
const TWEETS = [
  {
    text: `Every founder I talk to is confused about AI agents.

"Should we hire an agent? Which framework? How do we actually deploy this?"

The agentic economy is here. You need to understand it. So I built WTF Agents — 14 micro-courses to get you up to speed in 5–10 minutes.

Here's why this matters:`,
  },
  {
    text: `The problem: Enterprise is moving FAST

- 40% of enterprise apps will embed AI agents by end of 2026
- LangChain, CrewAI, n8n, AutoGen have 100K+ builders
- Your competitors are already experimenting

But your team? Probably confused about what an agent even is. That's the gap.`,
  },
  {
    text: `That's why I built WTF Agents.

14 micro-courses covering:
- WTF is an AI Agent (and why you should care)
- LangGraph vs CrewAI vs n8n vs AutoGen
- How to hire AI agents for your startup
- Prompt engineering for builders
- The agentic economy

$7 each. $29–$49 bundles. Instant access.`,
  },
  {
    text: `This is not theoretical.

Companies like Klarna, Anthropic, OpenAI are already building with agents at scale. Your founders' network is talking about this. Your customers are asking about it.

Understanding AI agents is becoming table stakes for CTOs and founders in 2026.`,
  },
  {
    text: `If you want to learn agents fast (not spend 20 hours on a course), check it out:

https://wtfagents.com

Built for founders. By a founder.

Questions? Happy to chat about what's missing in agent education. The gap is real and I want to fill it.`,
  },
];

async function postTweet(text, replyToId = null) {
  const url = 'https://api.twitter.com/2/tweets';
  const payload = { text };

  if (replyToId) {
    payload.reply = { in_reply_to_tweet_id: replyToId };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${BEARER_TOKEN}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Twitter API error: ${JSON.stringify(error)}`);
  }

  const data = await response.json();
  return data.data.id;
}

async function postThread(dryRun = false) {
  console.log('🚀 WTF Agents Twitter Thread\n');
  console.log(`📝 Tweets to post: ${TWEETS.length}`);
  console.log(`⏰ Posting mode: ${dryRun ? 'DRY RUN (no actual posts)' : 'LIVE'}\n`);

  let replyToId = null;

  for (let i = 0; i < TWEETS.length; i++) {
    const tweet = TWEETS[i];
    const tweetNum = i + 1;

    console.log(`\n━━━ Tweet ${tweetNum}/${TWEETS.length} ━━━`);
    console.log(tweet.text);
    console.log(`(${tweet.text.length} characters)`);

    if (dryRun) {
      console.log(`[DRY RUN] Would post${replyToId ? ' as reply' : ''}`);
      // In dry-run, generate a fake ID for threading
      replyToId = `fake_id_${tweetNum}`;
    } else {
      try {
        const tweetId = await postTweet(tweet.text, replyToId);
        console.log(`✅ Posted! ID: ${tweetId}`);
        replyToId = tweetId;

        // Wait 2 seconds between posts to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`❌ Failed to post tweet ${tweetNum}: ${error.message}`);
        console.error('Stopping thread. Previous tweets may have been posted.');
        process.exit(1);
      }
    }
  }

  console.log(`\n${'━'.repeat(40)}`);
  console.log(`✅ ${dryRun ? '[DRY RUN]' : ''} Thread complete! ${TWEETS.length} tweets`);
  console.log(`\n📊 Expected metrics:`);
  console.log(`   - Impressions: 2K–5K`);
  console.log(`   - Clicks to site: 50–150`);
  console.log(`   - Expected conversions: 1–3 sales`);
}

// Main
const isDryRun = process.argv.includes('--dry-run');

postThread(isDryRun).catch((error) => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
