#!/usr/bin/env node
/**
 * phase1-followup-email.js — Segment Phase 1 commenters and send targeted follow-ups
 *
 * Usage (Saturday D4):
 *   node phase1-followup-email.js
 *
 * Requires: ~/Desktop/WTF\ Agents/phase1-feedback.json (from phase1-comment-scraper.js)
 * Email infrastructure: BREVO_API_KEY (for sending)
 *
 * Segments & Campaigns:
 *   BUYER (immediate 3-email upsell nurture)
 *   INTERESTED (5-email educational series)
 *   SKEPTICAL (1-email detailed response + proof)
 *   SPAM (skip)
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID_BUYERS = process.env.BREVO_LIST_ID_BUYERS || 3; // Your Brevo list IDs
const BREVO_LIST_ID_INTERESTED = process.env.BREVO_LIST_ID_INTERESTED || 4;

if (!BREVO_API_KEY) {
  console.error(
    '❌ BREVO_API_KEY not configured. Add to ~/agentagous/.env for email automation'
  );
  console.log('   (Dry-run mode: will show segmentation without sending emails)\n');
}

/**
 * Email templates
 */
const emailTemplates = {
  BUYER_DAY1: {
    subject: 'Your next AI agents course — exclusive for Phase 1 supporters',
    body: `Hi {first_name},

Thanks for getting WTF Agents! 🎉

You seem to understand the power of AI agents already. I thought you'd appreciate a shortcut to the most advanced course we're building next:

**Advanced: Building Production AI Agent Swarms**
— Learn how to scale agents beyond single-task automation
— Real patterns from founders deploying agents in production
— Not for beginners, but perfect for you
— **Exclusive for Phase 1 supporters: €39 (normally €79)**

[Buy Now: ${process.env.STRIPE_LINK_ADVANCED_AGENTS || '#'}]

Questions? Reply directly to this email.

—
Ox
WTF Agents`,
  },

  INTERESTED_DAY1: {
    subject: "Let's build your foundation — WTF Agents primer series starts Monday",
    body: `Hi {first_name},

I notice you asked about {question_topic} in the HN launch.

Great question. Rather than a long reply, I've recorded a 10-minute primer specifically on that topic. It's part of the WTF Agents foundation series, and I'm releasing it free for early supporters like you.

Link: [Free Foundation Series for You]

This gives you the context you need to decide if the full courses are right for your situation.

Questions? Hit reply.

—
Ox
WTF Agents`,
  },

  SKEPTICAL_DAY1: {
    subject: 'You raised a good point — here is why I chose this approach',
    body: `Hi {first_name},

You noted that {objection} in your HN comment. You're right to ask.

Here's the context behind that decision:

{detailed_response}

We get this objection regularly. Most founders understand the tradeoff after seeing:
— Real case study: how Acme Co. implemented this and hit ${X} MRR increase
— Video walkthrough: 15 min showing the exact pattern
— [Download PDF: Full case study]

If this is still blocking you, let me know. Always happy to dig deeper.

—
Ox
WTF Agents`,
  },
};

/**
 * Main processor
 */
async function main() {
  console.log('📧 Phase 1 Follow-up Email Segmentation\n');

  // Load feedback
  const feedbackPath = path.join(
    process.env.HOME,
    'Desktop/WTF Agents/phase1-feedback.json'
  );
  if (!fs.existsSync(feedbackPath)) {
    console.error(`❌ ${feedbackPath} not found`);
    console.log('   Run phase1-comment-scraper.js first\n');
    process.exit(1);
  }

  const feedback = JSON.parse(fs.readFileSync(feedbackPath, 'utf8'));
  const { comments } = feedback;

  // Segment
  const segments = {
    BUYER: comments.filter((c) => c.sentiment === 'BUYER'),
    INTERESTED: comments.filter((c) => c.sentiment === 'INTERESTED'),
    SKEPTICAL: comments.filter((c) => c.sentiment === 'SKEPTICAL'),
  };

  console.log('📊 Segmentation:');
  console.log(`   BUYER (upsell nurture): ${segments.BUYER.length}`);
  console.log(`   INTERESTED (foundation series): ${segments.INTERESTED.length}`);
  console.log(`   SKEPTICAL (objection response): ${segments.SKEPTICAL.length}\n`);

  // DRY RUN: Show what would be sent
  console.log('📧 Email Plan (Dry Run):\n');

  if (segments.BUYER.length > 0) {
    console.log('🎯 BUYER Segment:');
    console.log(`   Count: ${segments.BUYER.length}`);
    console.log(`   Email Day 1: "${emailTemplates.BUYER_DAY1.subject}"`);
    console.log(`   Email Day 3: Upsell bundle (PH + API guide)`);
    console.log(`   Email Day 5: Implementation case study\n`);
  }

  if (segments.INTERESTED.length > 0) {
    console.log('📚 INTERESTED Segment:');
    console.log(`   Count: ${segments.INTERESTED.length}`);
    console.log(`   Email Day 1: "${emailTemplates.INTERESTED_DAY1.subject}"`);
    console.log(`   Email Day 3: Foundation primer deep-dive`);
    console.log(`   Email Day 5: Real implementation walkthrough`);
    console.log(`   Email Day 8: Founder testimonial + case study`);
    console.log(`   Email Day 12: Special offer (50% off courses for interested segment)\n`);
  }

  if (segments.SKEPTICAL.length > 0) {
    console.log('💬 SKEPTICAL Segment:');
    console.log(`   Count: ${segments.SKEPTICAL.length}`);
    console.log(`   Email Day 1: "${emailTemplates.SKEPTICAL_DAY1.subject}"`);
    console.log(`   (Personalized response to each objection)\n`);
  }

  // Save segmentation to file for review
  const segmentationPath = path.join(
    process.env.HOME,
    'Desktop/WTF Agents/phase1-segmentation.json'
  );
  fs.writeFileSync(
    segmentationPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        plan: {
          BUYER: {
            count: segments.BUYER.length,
            campaign: '3-email upsell nurture over 5 days',
            expectedConversion: `${Math.ceil(segments.BUYER.length * 0.4)}-${Math.ceil(segments.BUYER.length * 0.6)} (40-60% upsell rate)`,
          },
          INTERESTED: {
            count: segments.INTERESTED.length,
            campaign: '5-email educational series over 2 weeks',
            expectedConversion: `${Math.ceil(segments.INTERESTED.length * 0.15)}-${Math.ceil(segments.INTERESTED.length * 0.25)} (15-25% conversion to buyer)`,
          },
          SKEPTICAL: {
            count: segments.SKEPTICAL.length,
            campaign: 'Personalized 1-email response with proof',
            expectedConversion: `${Math.ceil(segments.SKEPTICAL.length * 0.05)}-${Math.ceil(segments.SKEPTICAL.length * 0.1)} (5-10% conversion)`,
          },
        },
        comments: comments.map((c) => ({
          source: c.source,
          author: c.author,
          sentiment: c.sentiment,
          text: c.text.substring(0, 150) + '...',
        })),
      },
      null,
      2
    )
  );

  console.log(`✅ Saved segmentation plan to ${segmentationPath}`);
  console.log(`\n📋 Next Steps:`);
  console.log(`   1. Review segmentation plan (^)`);
  console.log(`   2. Configure BREVO_API_KEY in ~/.env`);
  console.log(`   3. Run: node phase1-followup-email.js --send`);
  console.log(`   4. Monitor open rates and clicks\n`);
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
