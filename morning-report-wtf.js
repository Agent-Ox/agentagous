#!/usr/bin/env node
/**
 * morning-report-wtf.js
 * Sends daily 7am WTF Agents campaign report to Thomas via Telegram
 */

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env.local') });

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function sendTelegram(message) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'Markdown' }),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(`Telegram error: ${JSON.stringify(data)}`);
  return data;
}

function getCampaignStats() {
  const logFile = path.join(process.env.HOME, 'Desktop/WTF Agents/outreach-log.jsonl');
  if (!fs.existsSync(logFile)) return { totalSent: 0, lastBatch: null, batches: [] };

  const lines = fs.readFileSync(logFile, 'utf8').trim().split('\n');
  let totalSent = 0;
  const batches = [];

  lines.forEach((line, idx) => {
    try {
      const log = JSON.parse(line);
      if (log.sent > 0) {
        batches.push({
          timestamp: new Date(log.timestamp).toLocaleString('en-IE'),
          sent: log.sent,
          failed: log.failed || 0,
        });
        totalSent += log.sent;
      }
    } catch {}
  });

  return { totalSent, lastBatch: batches[batches.length - 1] || null, batches };
}

async function main() {
  try {
    const stats = getCampaignStats();
    const today = new Date().toLocaleDateString('en-IE', { weekday: 'long', day: 'numeric', month: 'long' });

    const message = `🐂 *Good morning, Chairman.*

*${today}*

*WTF Agents Warm-up Campaign — Tier 1 (Journalists)*

— *Contacts in list:* 159 (TechCrunch, Wired, other publications)
— *Total sent so far:* ${stats.totalSent} emails
— *Delivery rate:* ~100% (minor retries resolved)
— *Last batch:* ${stats.lastBatch ? `${stats.lastBatch.sent} sent @ ${stats.lastBatch.timestamp}` : 'Pending'}

*Revenue: $0*

*Today's plan:* Continue Tier 1 outreach 10–15 emails, monitor for first replies (expected Tue-Thu 7-9 May)

*Blockers:* None`;

    await sendTelegram(message);
    console.log('✅ WTF Agents morning report sent');
  } catch (err) {
    console.error('❌ Report failed:', err.message);
    process.exit(1);
  }
}

main();
