const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

const supabase = createClient(
  'https://junhzahqnhtrvvwtpart.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1bmh6YWhxbmh0cnZ2d3RwYXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MzAxNDUsImV4cCI6MjA4OTUwNjE0NX0.0c7B3FQBJdhYC5bt5RFD_Ij2O-TgdTCvxGUVbtADxRM'

)

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

function parseCSV(content) {
  const lines = content.split('\n').filter(l => l.trim())
  const rows = []
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    const match = line.match(/^"([\s\S]*?)","([^"]+)"$/)
    if (match) {
      rows.push({ text: match[1], date: match[2] })
    }
  }
  return rows
}

async function extractCompany(tweetText) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 150,
      messages: [{
        role: 'user',
        content: `Extract the company name from this Polsia tweet. Return JSON only with keys: name (string), category (one of: "Trades & Field Ops", "Sales & Outreach", "Finance & Analytics", "SaaS & Dev Tools", "Health & Wellness", "Content & Media", "E-commerce", "Real Estate", "Legal & Compliance", "Education & Training", "Other"), is_company (boolean - false if this is not about a specific company).

Tweet: ${tweetText}

JSON only, no explanation:`
      }]
    })
  })
  const data = await res.json()
  const text = data.content[0].text.trim()
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}

async function main() {
  const content = fs.readFileSync(process.env.HOME + '/Desktop/polsia-tweets.csv', 'utf8')
  const tweets = parseCSV(content)
  console.log('Parsed tweets:', tweets.length)

  const { data: existing } = await supabase.from('companies').select('name, description')
  const existingNames = new Set((existing || []).map(c => c.name.toLowerCase()))
  console.log('Existing companies:', existingNames.size)

  let added = 0
  let skipped = 0
  let errors = 0

  for (let i = 0; i < tweets.length; i++) {
    const tweet = tweets[i]
    process.stdout.write('\r' + (i + 1) + '/' + tweets.length + ' — added: ' + added + '          ')

    try {
      const extracted = await extractCompany(tweet.text)

      if (!extracted.is_company || !extracted.name || extracted.name.length < 2) {
        skipped++
        continue
      }

      if (existingNames.has(extracted.name.toLowerCase())) {
        skipped++
        continue
      }

      const { error } = await supabase.from('companies').insert({
        name: extracted.name,
        description: tweet.text.replace(/"/g, ''),
        url: extracted.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.polsia.app',
        category: extracted.category || 'Other',
        source: 'x_polsia',
        featured: false
      })

      if (!error) {
        added++
        existingNames.add(extracted.name.toLowerCase())
      } else {
        errors++
      }

    } catch (e) {
      errors++
    }

    await new Promise(r => setTimeout(r, 350))
  }

  console.log('\n\nDone!')
  console.log('Added:', added)
  console.log('Skipped:', skipped)
  console.log('Errors:', errors)
}

main().catch(console.error)
