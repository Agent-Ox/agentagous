import nodemailer from 'nodemailer';
import fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const OX_EMAIL = process.env.OX_EMAIL || 'ox@wtfagents.com';
const SMTP_HOST = process.env.GMAIL_SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = process.env.GMAIL_SMTP_PORT || 587;
const GMAIL_USER = process.env.OX_EMAIL || process.env.GMAIL_USER;
const GMAIL_PASS = process.env.OX_EMAIL_PASS || process.env.GMAIL_PASS;

if (!GMAIL_USER || !GMAIL_PASS) {
  console.error('❌ Missing OX_EMAIL or OX_EMAIL_PASS in .env.local');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: parseInt(SMTP_PORT),
  secure: false,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

// Load contact list
const listPath = process.argv[2] || '/Users/thomasoxlee/Desktop/WTF Agents/tier1-contacts.json';
const contactList = process.argv[3] || 'tier1';

console.log(`📬 Loading contacts from: ${listPath}`);

let allContacts = [];
try {
  const raw = fs.readFileSync(listPath, 'utf-8');
  const parsed = JSON.parse(raw);
  // Handle both array and {contacts: []} formats
  allContacts = Array.isArray(parsed) ? parsed : (parsed.contacts || []);
  console.log(`✅ Loaded ${allContacts.length} contacts`);
} catch (e) {
  console.error(`❌ Failed to load contacts: ${e.message}`);
  process.exit(1);
}

// Load sent contacts
let sentEmails = new Set();
const sentFile = '/Users/thomasoxlee/Desktop/WTF Agents/sent-contacts.json';
if (fs.existsSync(sentFile)) {
  try {
    const sent = JSON.parse(fs.readFileSync(sentFile, 'utf-8'));
    sentEmails = new Set(sent);
    console.log(`📋 Already sent: ${sentEmails.size} contacts`);
  } catch (e) {
    console.log('⚠️  Could not load sent contacts, starting fresh');
  }
}

// Filter to unsent
const unsent = allContacts.filter(c => !sentEmails.has(c.email));
console.log(`🎯 Unsent: ${unsent.length} contacts`);

if (unsent.length === 0) {
  console.log('✅ All contacts in this list have been sent. Consider moving to next tier.');
  process.exit(0);
}

// Pitch email
const generatePitch = (firstName) => {
  const subject = `The Agentic Economy is here — and it's changing everything`;
  const body = `Hi ${firstName},

Quick note: you've covered the agentic economy before. We've built the most comprehensive educational resource on the topic — 14 guided deep-dives into AI agents, LLMs, APIs, and how to actually use them.

It's called WTF Agents (wtfagents.com).

Each guide is $7 (or grab the full pack for $49). They're on sale through end of month.

We're reaching out to journalists, operators, and founders who understand this space. If you know someone who should read this — or if it's useful for you — let me know.

Best,
Ox
ox@wtfagents.com
https://wtfagents.com`;
  return { subject, body };
};

// Send batch
const sendBatch = async (batch, delayMs = 3000) => {
  let sent = 0;
  let failed = 0;
  const sent_today = [];

  for (let i = 0; i < batch.length; i++) {
    const contact = batch[i];
    const { subject, body } = generatePitch(contact.firstName);

    try {
      await transporter.sendMail({
        from: OX_EMAIL,
        to: contact.email,
        subject,
        text: body,
      });
      sent++;
      sent_today.push(contact.email);
      sentEmails.add(contact.email);
      console.log(`✅ ${i + 1}/${batch.length} → ${contact.firstName} (${contact.email})`);
    } catch (error) {
      failed++;
      console.log(`❌ ${i + 1}/${batch.length} → ${contact.email}: ${error.message}`);
    }

    // Rate limit
    if (i < batch.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  // Update sent contacts file
  const updated = Array.from(sentEmails).sort();
  fs.writeFileSync(sentFile, JSON.stringify(updated, null, 2));

  // Append to log
  const logEntry = {
    timestamp: new Date().toISOString(),
    listFile: listPath,
    listType: contactList,
    sent,
    failed,
    batchSize: batch.length,
    contacts: sent_today.map(email => {
      const contact = allContacts.find(c => c.email === email);
      return {
        email,
        firstName: contact?.firstName || 'Unknown',
      };
    }),
  };

  const logFile = '/Users/thomasoxlee/Desktop/WTF Agents/outreach-log-v2.jsonl';
  fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');

  console.log(`\n📊 Batch Summary`);
  console.log(`   Sent: ${sent}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Total unique sent (all time): ${sentEmails.size}`);
  console.log(`   Log: ${logFile}`);
  console.log(`   Contacts file: ${sentFile}`);
};

// CLI args
const perBatch = parseInt(process.argv[4] || '15');
const maxBatches = parseInt(process.argv[5] || '1');

(async () => {
  for (let b = 0; b < maxBatches; b++) {
    const start = b * perBatch;
    const end = Math.min(start + perBatch, unsent.length);
    const batch = unsent.slice(start, end);

    if (batch.length === 0) break;

    console.log(`\n🚀 Batch ${b + 1}/${maxBatches} (${batch.length} contacts)`);
    await sendBatch(batch, 3000);

    // Delay between batches
    if (b < maxBatches - 1) {
      console.log(`⏳ Waiting 60s before next batch...`);
      await new Promise(resolve => setTimeout(resolve, 60000));
    }
  }

  console.log(`\n✅ Campaign complete.`);
})();
