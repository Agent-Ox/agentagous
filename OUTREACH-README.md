# WTF Agents Outreach — Deployment Guide

## Status
✅ Outreach script built and validated
⏳ Awaiting SMTP credentials for ox@wtfagents.com
🚀 Ready to deploy immediately once credentials provided

## Setup (One-Time)

### 1. Add Gmail Credentials to .env.local

```bash
cat >> /Users/thomasoxlee/agentagous/.env.local << 'EOF'

# Gmail SMTP for ox@wtfagents.com
GMAIL_USER=ox@wtfagents.com
GMAIL_PASS=<your-app-specific-password>
EOF
```

**How to get app password:**
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer" (or your device)
3. Google will generate a 16-character app password
4. Paste it above (without spaces)

### 2. Verify Script Works

```bash
cd ~/agentagous
node outreach-wtf.js /Users/thomasoxlee/Desktop/"WTF Agents"/tier1-contacts.json 3
```

This will send to the first 3 contacts in tier1 list (test run).

## Contact Lists

| List | Count | Tier | Best For |
|------|-------|------|----------|
| tier1-contacts.json | 159 | ⭐ Premium | TechCrunch, The Verge, major tech media |
| industry-contacts.json | 176 | ⭐⭐ Operators | Founders, operators, VCs, conference organizers |
| extended-contacts-batch1.json | 358 | ⭐⭐⭐ Broad | Wider tech circles, secondary influencers |
| extended-contacts-all.json | 497 | ⭐⭐⭐⭐ Max | Full network, lowest confidence |

## Suggested Rollout Strategy

### Phase 1: Validation (Week 1)
```bash
node outreach-wtf.js Desktop/"WTF Agents"/tier1-contacts.json 15
node outreach-wtf.js Desktop/"WTF Agents"/tier1-contacts.json 15
node outreach-wtf.js Desktop/"WTF Agents"/tier1-contacts.json 15
```
- 45 emails total to top journalists
- Monitor reply rate, refine pitch if needed
- Target: 10-15% reply rate (industry standard for cold outreach to media)

### Phase 2: Operators (Week 2)
```bash
node outreach-wtf.js Desktop/"WTF Agents"/industry-contacts.json 20
node outreach-wtf.js Desktop/"WTF Agents"/industry-contacts.json 20
```
- 40 emails to founders + operators
- Higher conversion potential (they're your target audience)
- Target: 15-25% reply rate

### Phase 3: Broader Reach (Week 3+)
```bash
node outreach-wtf.js Desktop/"WTF Agents"/extended-contacts-batch1.json 25
```
- Expand to broader audience
- Maintain 3-5 second delays (warm-up pace)

## Monitoring

All outreach is logged to:
```
~/Desktop/WTF Agents/outreach-log.jsonl
```

Each line is a JSON object with: timestamp, sent count, failed count, contact list.

### Check Results
```bash
tail -10 ~/Desktop/"WTF Agents"/outreach-log.jsonl | jq .
```

## Email Template

Current pitch:
```
Subject: The Agentic Economy is here — and it's changing everything

Hi {firstName},

Quick note: you've covered the agentic economy before. We've built the most comprehensive educational resource on the topic — 14 guided deep-dives into AI agents, LLMs, APIs, and how to actually use them.

It's called WTF Agents (wtfagents.com).

Each guide is $7 (or grab the full pack for $49). They're on sale through end of month.

We're reaching out to journalists, operators, and founders who understand this space. If you know someone who should read this — or if it's useful for you — let me know.

Best,
Ox
ox@wtfagents.com
https://wtfagents.com
```

To customize: Edit `/Users/thomasoxlee/agentagous/outreach-wtf.js` lines 74-92 (generatePitch function).

## Rate Limiting & Safety

- Default: 3 seconds between emails (15 per 45-second batch)
- Configured to avoid Gmail throttling
- Each run logs timestamp + contact list + results

## Troubleshooting

### "Missing GMAIL_USER or GMAIL_PASS"
- Add credentials to .env.local (see Setup section)
- Verify .env.local is readable: `cat ~/.env.local | grep GMAIL`

### "Authentication failed"
- Verify app password is correct (no spaces)
- Check that account has 2FA enabled (required for app passwords)
- Regenerate app password if needed

### "SMTP connection refused"
- Verify SMTP_HOST and SMTP_PORT are correct (smtp.gmail.com:587)
- Check internet connection
- Gmail may throttle if too many emails sent in rapid succession

## Next Steps

Once credentials added:
1. Run test batch: `node outreach-wtf.js ... 3`
2. Monitor reply-to: ox@wtfagents.com
3. Track metrics in outreach-log.jsonl
4. Refine pitch based on early responses
5. Scale gradually (phase 1 → 2 → 3)

---

Built: 6 April 2026, 15:26 CET
By: Ox
Status: Production-ready ✅
