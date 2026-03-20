const { createClient } = require('@supabase/supabase-js')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

const supabase = createClient(
  'https://junhzahqnhtrvvwtpart.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1bmh6YWhxbmh0cnZ2d3RwYXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MzAxNDUsImV4cCI6MjA4OTUwNjE0NX0.0c7B3FQBJdhYC5bt5RFD_Ij2O-TgdTCvxGUVbtADxRM'
)

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

const CATEGORIES = [
  'Trades & Field Ops',
  'Sales & Outreach', 
  'Finance & Analytics',
  'SaaS & Dev Tools',
  'Health & Wellness',
  'Content & Media',
  'E-commerce',
  'Real Estate',
  'Legal & Compliance',
  'Education & Training',
  'Other'
]

async function categorise(name, description) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 50,
      messages: [{
        role: 'user',
        content: `Categorise this AI company into exactly one of these categories: ${CATEGORIES.join(', ')}.

Company name: ${name}
Description: ${description}

Reply with ONLY the category name, nothing else.`
      }]
    })
  })
  
  const data = await res.json()
  const category = data.content[0].text.trim()
  return CATEGORIES.includes(category) ? category : 'Other'
}

async function main() {
  const { data: companies, error } = await supabase
    .from('companies')
    .select('id, name, description, category')
    .eq('category', 'Other')
  
  if (error) {
    console.error('Error fetching:', error)
    return
  }
  
  console.log('Companies to categorise: ' + companies.length)
  
  for (let i = 0; i < companies.length; i++) {
    const company = companies[i]
    process.stdout.write('\r' + (i + 1) + '/' + companies.length + ': ' + company.name.slice(0, 40) + '          ')
    
    try {
      const category = await categorise(company.name, company.description)
      
      await supabase
        .from('companies')
        .update({ category })
        .eq('id', company.id)
        
    } catch (e) {
      console.log('\nError on ' + company.name + ': ' + e.message)
    }
    
    await new Promise(r => setTimeout(r, 300))
  }
  
  console.log('\nDone!')
}

main().catch(console.error)
