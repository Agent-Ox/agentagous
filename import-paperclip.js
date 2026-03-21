// import-paperclip.js
// Reads ~/Desktop/paperclip-companies.csv and imports to Supabase

require('dotenv').config({ path: require('path').join(__dirname, '.env.local') });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    // Handle quoted fields
    const fields = [];
    let current = '';
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') { inQuotes = !inQuotes; continue; }
      if (char === ',' && !inQuotes) { fields.push(current.trim()); current = ''; continue; }
      current += char;
    }
    fields.push(current.trim());
    const row = {};
    headers.forEach((h, i) => { row[h] = fields[i] || ''; });
    rows.push(row);
  }
  return rows;
}

function guessCategory(name, description) {
  const text = (name + ' ' + description).toLowerCase();
  if (text.includes('content') || text.includes('media') || text.includes('blog') || text.includes('social') || text.includes('newsletter')) return 'Content & Media';
  if (text.includes('seo') || text.includes('market') || text.includes('growth') || text.includes('sales') || text.includes('outreach')) return 'Sales & Outreach';
  if (text.includes('dev') || text.includes('code') || text.includes('engineer') || text.includes('saas') || text.includes('software')) return 'SaaS & Dev Tools';
  if (text.includes('trade') || text.includes('field') || text.includes('plumb') || text.includes('electric') || text.includes('roof')) return 'Trades & Field Ops';
  if (text.includes('financ') || text.includes('account') || text.includes('tax') || text.includes('trading') || text.includes('invest')) return 'Finance & Analytics';
  if (text.includes('health') || text.includes('wellness') || text.includes('medical') || text.includes('fitness')) return 'Health & Wellness';
  if (text.includes('ecom') || text.includes('shop') || text.includes('retail') || text.includes('product')) return 'E-commerce';
  if (text.includes('legal') || text.includes('law') || text.includes('compliance')) return 'Legal & Compliance';
  if (text.includes('edu') || text.includes('learn') || text.includes('train') || text.includes('course')) return 'Education & Training';
  if (text.includes('real estate') || text.includes('property') || text.includes('airbnb') || text.includes('rental')) return 'Real Estate';
  return 'SaaS & Dev Tools';
}

async function main() {
  const csvPath = path.join(process.env.HOME, 'Desktop', 'paperclip-companies.csv');
  
  if (!fs.existsSync(csvPath)) {
    console.error('CSV not found at:', csvPath);
    process.exit(1);
  }

  const content = fs.readFileSync(csvPath, 'utf8');
  const rows = parseCSV(content);
  console.log(`Found ${rows.length} companies in CSV`);

  let inserted = 0;
  let skipped = 0;

  for (const row of rows) {
    const name = row.name || row.company || '';
    const description = row.description || row.desc || '';
    const url = row.url || row.github || row.link || 'github.com/paperclipai/paperclip';
    const category = row.category || guessCategory(name, description);

    if (!name || !description) {
      console.log(`Skipping empty row`);
      skipped++;
      continue;
    }

    // Clean URL
    const cleanUrl = url.replace(/^https?:\/\//, '').substring(0, 200);

    const { error } = await supabase.from('companies').insert([{
      name: name.substring(0, 100),
      description: description.substring(0, 500),
      url: cleanUrl,
      category,
      source: 'paperclip',
      featured: false,
    }]);

    if (error) {
      console.log(`Skip (duplicate?): ${name} — ${error.message}`);
      skipped++;
    } else {
      console.log(`✓ Inserted: ${name} [${category}]`);
      inserted++;
      // Log to activity feed
      await supabase.from('activity_feed').insert([{
        text: `New Paperclip company added: ${name}`,
        icon: '📎'
      }]);
    }
    await sleep(150);
  }

  console.log(`\nDone. Inserted: ${inserted}, Skipped: ${skipped}`);
  console.log(`Total Paperclip companies: ${inserted + 4} (including earlier fallback inserts)`);
}

main().catch(console.error);
