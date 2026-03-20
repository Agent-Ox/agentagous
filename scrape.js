const { createClient } = require('@supabase/supabase-js')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

const supabase = createClient(
  'https://junhzahqnhtrvvwtpart.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1bmh6YWhxbmh0cnZ2d3RwYXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MzAxNDUsImV4cCI6MjA4OTUwNjE0NX0.0c7B3FQBJdhYC5bt5RFD_Ij2O-TgdTCvxGUVbtADxRM'
)

async function getSubdomains() {
  console.log('Fetching subdomains from crt.sh...')
  const url = 'https://crt.sh/?q=%.polsia.app&output=json'
  const res = await fetch(url)
  const data = await res.json()
  
  const subdomains = [...new Set(
    data
      .map(entry => entry.name_value)
      .join('\n')
      .split('\n')
      .map(s => s.trim().replace('*.', ''))
      .filter(s => s.endsWith('.polsia.app'))
      .filter(s => !s.startsWith('*'))
  )]
  
  console.log('Found ' + subdomains.length + ' unique subdomains')
  return subdomains
}

async function getExisting() {
  const { data } = await supabase.from('companies').select('url')
  return new Set((data || []).map(c => c.url))
}

async function scrapeCompany(url) {
  try {
    const res = await fetch('https://' + url, { 
      timeout: 8000,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })
    const html = await res.text()
    
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
    
    const name = titleMatch 
      ? titleMatch[1].split('|')[0].split('-')[0].split(':')[0].trim().slice(0, 60)
      : url.replace('.polsia.app', '').replace(/-\w+$/, '')
    
    const description = descMatch 
      ? descMatch[1].trim().slice(0, 300)
      : 'An autonomous AI-run company on Polsia.'
    
    return { name, description }
  } catch (e) {
    const name = url.replace('.polsia.app', '').replace(/-[a-z0-9]{4,}$/, '')
    return { 
      name: name.charAt(0).toUpperCase() + name.slice(1),
      description: 'An autonomous AI-run company on Polsia.'
    }
  }
}

async function main() {
  const subdomains = await getSubdomains()
  const existing = await getExisting()
  
  const newOnes = subdomains.filter(s => !existing.has(s))
  console.log('New companies to add: ' + newOnes.length)
  
  let added = 0
  const batch = []
  
  for (let i = 0; i < newOnes.length; i++) {
    const url = newOnes[i]
    process.stdout.write('\rScraping ' + (i + 1) + '/' + newOnes.length + ': ' + url + '          ')
    
    const { name, description } = await scrapeCompany(url)
    
    batch.push({
      name,
      description,
      url,
      category: 'Other',
      source: 'polsia',
      featured: false
    })
    
    if (batch.length >= 20 || i === newOnes.length - 1) {
      const { error } = await supabase.from('companies').insert(batch)
      if (!error) {
        added += batch.length
        console.log('\nInserted batch of ' + batch.length)
      } else {
        console.log('\nBatch error:', error.message)
      }
      batch.length = 0
    }
    
    await new Promise(r => setTimeout(r, 500))
  }
  
  console.log('\nDone! Added ' + added + ' new companies.')
}

main().catch(console.error)
