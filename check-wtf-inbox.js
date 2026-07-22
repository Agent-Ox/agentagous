#!/usr/bin/env node
/**
 * check-wtf-inbox.js
 * Monitor ox@wtfagents.com for Tier 1 & Tier 2 replies
 * Usage: node check-wtf-inbox.js [--respond] [--summary]
 */

const Imap = require('imap');
const { simpleParser } = require('mailparser');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config({ path: '.env.local' });

const imap = new Imap({
  user: process.env.WTFAGENTS_EMAIL,
  password: process.env.WTFAGENTS_PASSWORD,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false }
});

const tier1Domains = ['techcrunch.com', 'wired.com'];
const tier2Domains = ['venturebeat.com', 'theverge.com', 'axios.com', 'protocol.com'];

async function openInbox(cb) {
  imap.openBox('INBOX', false, cb);
}

async function extractEmailDomain(email) {
  return email.split('@')[1];
}

function checkTier(senderEmail) {
  const domain = extractEmailDomain(senderEmail);
  if (tier1Domains.includes(domain)) return 'Tier 1';
  if (tier2Domains.includes(domain)) return 'Tier 2';
  return 'Other';
}

async function processEmails() {
  openInbox((err, mailbox) => {
    if (err) {
      console.error('Error opening inbox:', err);
      imap.closeBox(false, () => imap.end());
      return;
    }

    // Search for emails from last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    imap.search(['SINCE', sevenDaysAgo], (err, results) => {
      if (err) {
        console.error('Search error:', err);
        imap.closeBox(false, () => imap.end());
        return;
      }

      if (!results || results.length === 0) {
        console.log('No emails in last 7 days.');
        imap.closeBox(false, () => imap.end());
        return;
      }

      const f = imap.fetch(results, { bodies: '' });
      const replies = [];

      f.on('message', (msg) => {
        simpleParser(msg, async (err, parsed) => {
          if (err) return;

          const senderEmail = parsed.from?.text || 'Unknown';
          const subject = parsed.subject || '(no subject)';
          const date = parsed.date || new Date();
          const tier = checkTier(senderEmail);

          // Filter: only include genuine replies (not auto-replies, bounces, etc.)
          const isAutoReply = parsed.headers.get('x-autoresponder') !== undefined;
          const isBounce = senderEmail.includes('mailer-daemon') || senderEmail.includes('postmaster');

          if (!isAutoReply && !isBounce && subject.toLowerCase().includes('wtf')) {
            replies.push({
              from: senderEmail,
              subject,
              date,
              tier,
              preview: (parsed.text || '').substring(0, 100)
            });
          }
        });
      });

      f.on('error', (err) => {
        console.error('Fetch error:', err);
      });

      f.on('end', () => {
        setTimeout(() => {
          console.log(`\n=== WTF Agents Inbox Reply Summary ===`);
          console.log(`Total replies (7 days): ${replies.length}`);

          const tier1Replies = replies.filter(r => r.tier === 'Tier 1');
          const tier2Replies = replies.filter(r => r.tier === 'Tier 2');

          if (tier1Replies.length > 0) {
            console.log(`\n📰 Tier 1 Replies: ${tier1Replies.length}`);
            tier1Replies.forEach(r => {
              console.log(`  • ${r.from} — ${r.date.toLocaleDateString()} — "${r.subject}"`);
            });
          } else {
            console.log(`\n📰 Tier 1 Replies: 0 (replies expected ~9–12 May)`);
          }

          if (tier2Replies.length > 0) {
            console.log(`\n📊 Tier 2 Replies: ${tier2Replies.length}`);
            tier2Replies.forEach(r => {
              console.log(`  • ${r.from} — ${r.date.toLocaleDateString()} — "${r.subject}"`);
            });
          } else {
            console.log(`\n📊 Tier 2 Replies: 0 (replies expected ~10–13 May)`);
          }

          // Save log
          const logPath = path.join(__dirname, '../Desktop/WTF Agents/wtf-inbox-log.json');
          fs.writeFileSync(logPath, JSON.stringify({
            timestamp: new Date().toISOString(),
            total: replies.length,
            tier1: tier1Replies.length,
            tier2: tier2Replies.length,
            replies: replies
          }, null, 2));

          console.log(`\n✅ Log saved: ${logPath}`);
          imap.closeBox(false, () => imap.end());
        }, 1000);
      });
    });
  });
}

imap.openBox('INBOX', false, (err) => {
  if (err) {
    console.error('Connection failed:', err.message);
    console.log('\n⚠️  Credentials may be incorrect. Check .env.local:');
    console.log('  WTFAGENTS_EMAIL:', process.env.WTFAGENTS_EMAIL);
    process.exit(1);
  }

  processEmails();
});

imap.on('error', (err) => {
  console.error('IMAP error:', err);
  process.exit(1);
});

imap.on('end', () => {
  console.log('Disconnected.');
});
