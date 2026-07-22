#!/usr/bin/env node
/**
 * Scrape @polsia Twitter timeline and save to ~/Desktop/polsia-tweets.csv
 * Uses Twitter API v2 with Bearer token
 */

const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config({ path: '.env.local' });

let BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
if (BEARER_TOKEN) {
  // Decode URL-encoded token
  BEARER_TOKEN = decodeURIComponent(BEARER_TOKEN);
}
const OUTPUT_PATH = path.join(process.env.HOME, 'Desktop', 'polsia-tweets.csv');

if (!BEARER_TOKEN) {
  console.error('❌ TWITTER_BEARER_TOKEN not found in .env.local');
  process.exit(1);
}

async function scrapePolsia() {
  console.log('🐦 Scraping @polsia Twitter timeline...');
  
  // Get user ID for @polsia
  let userRes = await fetch('https://api.twitter.com/2/users/by/username/polsia', {
    headers: { 'Authorization': `Bearer ${BEARER_TOKEN}` }
  });
  
  if (!userRes.ok) {
    console.error('❌ Failed to fetch @polsia user:', userRes.statusText);
    process.exit(1);
  }
  
  const userData = await userRes.json();
  const userId = userData.data.id;
  console.log(`✅ Found @polsia (ID: ${userId})`);
  
  // Fetch tweets
  let tweetRes = await fetch(
    `https://api.twitter.com/2/users/${userId}/tweets?max_results=100&tweet.fields=created_at&expansions=author_id`,
    {
      headers: { 'Authorization': `Bearer ${BEARER_TOKEN}` }
    }
  );
  
  if (!tweetRes.ok) {
    console.error('❌ Failed to fetch tweets:', tweetRes.statusText);
    process.exit(1);
  }
  
  const tweets = await tweetRes.json();
  
  if (!tweets.data || tweets.data.length === 0) {
    console.log('⚠️  No tweets found');
    fs.writeFileSync(OUTPUT_PATH, 'text,date\n');
    console.log(`✅ Saved empty CSV to ${OUTPUT_PATH}`);
    return;
  }
  
  // Format as CSV
  const lines = ['text,date'];
  for (const tweet of tweets.data) {
    const text = tweet.text.replace(/"/g, '""').replace(/\n/g, ' ');
    lines.push(`"${text}","${tweet.created_at}"`);
  }
  
  fs.writeFileSync(OUTPUT_PATH, lines.join('\n'));
  console.log(`✅ Scraped ${tweets.data.length} tweets`);
  console.log(`✅ Saved to ${OUTPUT_PATH}`);
}

scrapePolsia().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
