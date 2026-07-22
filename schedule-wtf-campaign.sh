#!/bin/bash
# WTF Agents campaign scheduler
# Run daily at 08:00 AM CET to send 30 emails to tier1 unsent contacts

cd ~/agentagous

echo "🚀 $(date): Starting WTF Agents daily campaign..."

# Send 2 batches of 15 (30 total) to tier1 unsent
node outreach-wtf-v2.js '/Users/thomasoxlee/Desktop/WTF Agents/tier1-contacts.json' 'tier1' 15 2

if [ $? -eq 0 ]; then
  echo "✅ Daily campaign complete"
  # Optionally notify Thomas via Telegram (requires API setup)
else
  echo "❌ Campaign failed - check logs"
fi
