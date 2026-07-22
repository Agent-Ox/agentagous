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
  console.error('   Set: OX_EMAIL=ox@wtfagents.com');
  console.error('   Set: OX_EMAIL_PASS=<app-specific-password>');
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
console.log(`📬 Loading contacts from: ${listPath}`);

let contacts = [];
try {
  const raw = fs.readFileSync(listPath, 'utf-8');
  contacts = JSON.parse(raw);
  console.log(`✅ Loaded ${contacts.length} contacts`);
} catch (e) {
  console.error(`❌ Failed to load contacts: ${e.message}`);
  process.exit(1);
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

// Send with rate limiting
const sendBatch = async (batch, delayMs = 3000) => {
  let sent = 0;
  let failed = 0;

  for (let i = 0; i < batch.length; i++) {
    const contact = batch[i];
    const { subject, body } = generatePitch(contact.firstName);

    try {
      await transporter.sendMail({
        from: OX_EMAIL,
        to: contact.email,
        subject,
        text: body,
        replyTo: OX_EMAIL,
      });

      sent++;
      console.log(`✅ [${i + 1}/${batch.length}] Sent to ${contact.firstName} <${contact.email}> (${contact.domain})`);

      // Rate limit between sends
      if (i < batch.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    } catch (e) {
      failed++;
      console.error(`❌ [${i + 1}/${batch.length}] Failed to send to ${contact.email}: ${e.message}`);
    }
  }

  return { sent, failed };
};

// Main
const runOutreach = async () => {
  console.log(`\n🚀 WTF Agents Outreach Campaign\n`);
  console.log(`Email: ${OX_EMAIL}`);
  console.log(`Rate: 3 seconds between sends (warm-up pace)\n`);

  // Split into manageable batches
  const batchSize = parseInt(process.argv[3] || '15'); // default 15 per run
  const batch = contacts.slice(0, batchSize);

  console.log(`📤 Sending ${batch.length} emails...\n`);

  const result = await sendBatch(batch, 3000);

  console.log(`\n✅ Campaign complete:`);
  console.log(`   Sent: ${result.sent}`);
  console.log(`   Failed: ${result.failed}`);
  console.log(`   Total: ${result.sent + result.failed}\n`);

  // Log results
  const logEntry = {
    timestamp: new Date().toISOString(),
    listFile: listPath,
    sent: result.sent,
    failed: result.failed,
    contacts: batch.map(c => ({ email: c.email, firstName: c.firstName })),
  };

  const logPath = '/Users/thomasoxlee/Desktop/WTF Agents/outreach-log.jsonl';
  fs.appendFileSync(logPath, JSON.stringify(logEntry) + '\n');
  console.log(`📝 Logged to: ${logPath}`);
};

runOutreach().catch(err => {
  console.error('❌ Outreach error:', err);
  process.exit(1);
});
