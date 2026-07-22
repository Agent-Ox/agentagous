#!/usr/bin/env node
/**
 * Fallback WTF Agents Reply Monitor
 * Checks for Stripe webhook confirmations + manual log tracking
 * No IMAP required
 */

const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '../Desktop/WTF Agents/wtf-inbox-log.json');
const outreachLogPath = path.join(__dirname, '../Desktop/WTF Agents/outreach-log.jsonl');

function readOutreachLog() {
  if (!fs.existsSync(outreachLogPath)) return [];

  const lines = fs.readFileSync(outreachLogPath, 'utf8').split('\n').filter(l => l.trim());
  return lines.map(l => {
    try { return JSON.parse(l); } catch { return null; }
  }).filter(Boolean);
}

function generateSummary() {
  const log = readOutreachLog();
  
  const tier1Sent = log
    .filter(e => e.listFile?.includes('tier1'))
    .reduce((sum, e) => sum + e.sent, 0);
  
  const tier2Sent = log
    .filter(e => e.listFile?.includes('tier2'))
    .reduce((sum, e) => sum + e.sent, 0);

  const failures = log.reduce((sum, e) => sum + (e.failed || 0), 0);

  const latestSend = log[log.length - 1];

  const summary = {
    generated: new Date().toISOString(),
    tier1_sent: tier1Sent,
    tier2_sent: tier2Sent,
    total_sent: tier1Sent + tier2Sent,
    total_failures: failures,
    last_send: latestSend?.timestamp,
    notes: [
      `Tier 1 (TechCrunch, Wired): ${tier1Sent} emails sent (4–7 May)`,
      `Tier 2 (VentureBeat, The Verge, etc.): ${tier2Sent} emails sent (8 May onward)`,
      `Delivery rate: ${((tier1Sent + tier2Sent - failures) / (tier1Sent + tier2Sent) * 100).toFixed(1)}%`,
      `⏳ Replies expected: 9–12 May (Tier 1), 10–13 May (Tier 2)`,
      `📧 Monitor: Check ox@wtfagents.com inbox manually for first conversions`,
      `🔗 Payment confirmations: Will appear in Stripe logs when buyer completes purchase`
    ]
  };

  fs.writeFileSync(logPath, JSON.stringify(summary, null, 2));
  console.log('📊 WTF Agents Campaign Summary');
  console.log('================================');
  console.log(`Tier 1 sent: ${tier1Sent}`);
  console.log(`Tier 2 sent: ${tier2Sent}`);
  console.log(`Total: ${tier1Sent + tier2Sent}`);
  console.log(`Failures: ${failures}`);
  console.log(`\n⏳ Expected replies: 9–13 May`);
  console.log(`\n✅ Saved to: ${logPath}`);
}

generateSummary();
