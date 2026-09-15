#!/usr/bin/env node
/**
 * phase1-comment-scraper.js — Extract and classify comments from HN/PH launch
 *
 * Post-Phase 1 Usage (Day 4, Saturday):
 *   node phase1-comment-scraper.js --hn-id <post_id> --ph-url <product_url>
 *
 * Outputs to ~/Desktop/WTF\ Agents/phase1-feedback.json with sentiment tags:
 *   - BUYER: Purchased or deep product question
 *   - INTERESTED: Feature question, how-to, timeline
 *   - SKEPTICAL: Objections, criticism
 *   - SPAM: Ignore
 *
 * Requirements: ANTHROPIC_API_KEY for sentiment classification
 */

const fs = require('fs');
const https = require('https');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Parse CLI args
const args = process.argv.slice(2);
const hnIdIdx = args.indexOf('--hn-id');
const phUrlIdx = args.indexOf('--ph-url');

const HN_POST_ID = hnIdIdx >= 0 ? args[hnIdIdx + 1] : null;
const PH_URL = phUrlIdx >= 0 ? args[phUrlIdx + 1] : null;

if (!HN_POST_ID && !PH_URL) {
  console.error('❌ Usage: node phase1-comment-scraper.js --hn-id <id> --ph-url <url>');
  process.exit(1);
}

/**
 * Fetch HN comments
 */
async function fetchHNComments(postId) {
  return new Promise((resolve, reject) => {
    const url = `https://hacker-news.firebaseio.com/v0/item/${postId}.json`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', async () => {
        try {
          const post = JSON.parse(data);
          const comments = [];

          // Fetch up to 30 top comments
          if (post.kids) {
            for (const kid of post.kids.slice(0, 30)) {
              const commentUrl = `https://hacker-news.firebaseio.com/v0/item/${kid}.json`;
              const comment = await new Promise((res) => {
                https.get(commentUrl, (r) => {
                  let d = '';
                  r.on('data', (c) => (d += c));
                  r.on('end', () => {
                    try {
                      res(JSON.parse(d));
                    } catch {
                      res(null);
                    }
                  });
                });
              });

              if (comment && comment.text) {
                comments.push({
                  source: 'HN',
                  author: comment.by,
                  text: comment.text,
                  time: comment.time,
                  url: `https://news.ycombinator.com/item?id=${kid}`,
                });
              }
            }
          }

          resolve(comments);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Classify comment sentiment using Claude
 */
async function classifyComments(comments) {
  const classified = [];

  console.log(`\n📊 Classifying ${comments.length} comments...`);

  for (const [idx, comment] of comments.entries()) {
    try {
      const response = await client.messages.create({
        model: 'claude-opus-4-1-20250805',
        max_tokens: 100,
        system:
          'You are a comment classifier for an AI education product (WTF Agents). Classify each comment into ONE category: BUYER (purchased or deep product question), INTERESTED (feature question, timeline, how-to), SKEPTICAL (objections, criticism), or SPAM. Respond with ONLY the category name.',
        messages: [
          {
            role: 'user',
            content: `Classify this comment:\n\n"${comment.text}"`,
          },
        ],
      });

      const category = response.content[0].text.trim().toUpperCase();
      const validCategories = ['BUYER', 'INTERESTED', 'SKEPTICAL', 'SPAM'];
      const sentiment = validCategories.includes(category) ? category : 'INTERESTED';

      classified.push({
        ...comment,
        sentiment,
      });

      if ((idx + 1) % 10 === 0) {
        console.log(`  ✅ Classified ${idx + 1}/${comments.length}`);
      }
    } catch (err) {
      console.error(`❌ Error classifying comment ${idx}: ${err.message}`);
      classified.push({
        ...comment,
        sentiment: 'INTERESTED', // Default on error
      });
    }
  }

  return classified;
}

/**
 * Main
 */
async function main() {
  console.log('🔍 Phase 1 Comment Scraper\n');

  let allComments = [];

  if (HN_POST_ID) {
    console.log(`📰 Fetching HN post #${HN_POST_ID}...`);
    const hnComments = await fetchHNComments(HN_POST_ID);
    console.log(`✅ Fetched ${hnComments.length} HN comments`);
    allComments.push(...hnComments);
  }

  if (PH_URL) {
    console.log(`\n📱 Fetching Product Hunt reviews... (manual import required)`);
    console.log('   → Use browser console on PH page to export comments to JSON');
    console.log('   → Format: [{ author, text, url }, ...]');
  }

  if (allComments.length === 0) {
    console.error('❌ No comments found');
    process.exit(1);
  }

  // Classify all comments
  const classified = await classifyComments(allComments);

  // Generate summary
  const summary = {
    total: classified.length,
    BUYER: classified.filter((c) => c.sentiment === 'BUYER').length,
    INTERESTED: classified.filter((c) => c.sentiment === 'INTERESTED').length,
    SKEPTICAL: classified.filter((c) => c.sentiment === 'SKEPTICAL').length,
    SPAM: classified.filter((c) => c.sentiment === 'SPAM').length,
  };

  console.log('\n📊 Classification Summary:');
  console.log(`   BUYER: ${summary.BUYER} (${((summary.BUYER / summary.total) * 100).toFixed(1)}%)`);
  console.log(`   INTERESTED: ${summary.INTERESTED} (${((summary.INTERESTED / summary.total) * 100).toFixed(1)}%)`);
  console.log(`   SKEPTICAL: ${summary.SKEPTICAL} (${((summary.SKEPTICAL / summary.total) * 100).toFixed(1)}%)`);
  console.log(`   SPAM: ${summary.SPAM} (${((summary.SPAM / summary.total) * 100).toFixed(1)}%)`);

  // Save to file
  const outputPath = path.join(process.env.HOME, 'Desktop/WTF Agents/phase1-feedback.json');
  const output = {
    timestamp: new Date().toISOString(),
    summary,
    comments: classified,
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\n✅ Saved to ${outputPath}`);
  console.log(`\nNext: Use phase1-followup-email.js to segment and send follow-up campaigns`);
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
