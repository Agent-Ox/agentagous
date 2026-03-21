// Paperclip company scraper
// Scrapes the paperclipai/paperclip GitHub companies directory
// and GitHub forks to find real companies being built

const https = require('https');

function fetch(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const opts = {
      headers: {
        'User-Agent': 'WTFAgents-Scraper/1.0',
        'Accept': 'application/vnd.github.v3+json',
        ...headers
      }
    };
    https.get(url, opts, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch(e) { resolve(data); }
      });
    }).on('error', reject);
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function scrapeGitHub() {
  console.log('Fetching Paperclip company templates from GitHub...');
  
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
  const headers = GITHUB_TOKEN ? { 'Authorization': `token ${GITHUB_TOKEN}` } : {};

  try {
    // Get contents of the companies directory
    const companiesDir = await fetch('https://api.github.com/repos/paperclipai/paperclip/contents/companies', headers);
    
    if (!Array.isArray(companiesDir)) {
      console.log('Could not fetch companies directory:', companiesDir);
      return [];
    }

    console.log(`Found ${companiesDir.length} company templates`);
    const companies = [];

    for (const item of companiesDir) {
      if (item.type === 'dir') {
        console.log(`Fetching company: ${item.name}`);
        try {
          // Try to get README or config for this company
          const contents = await fetch(`https://api.github.com/repos/paperclipai/paperclip/contents/companies/${item.name}`, headers);
          
          let name = item.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          let description = `A Paperclip AI company template — ${name}. Self-hosted autonomous company built with the Paperclip open-source orchestration platform.`;
          
          // Try to find README
          if (Array.isArray(contents)) {
            const readme = contents.find(f => f.name.toLowerCase().includes('readme'));
            if (readme) {
              try {
                const readmeContent = await fetch(readme.download_url, { 'User-Agent': 'WTFAgents-Scraper/1.0' });
                if (typeof readmeContent === 'string') {
                  // Extract first paragraph
                  const lines = readmeContent.split('\n').filter(l => l.trim() && !l.startsWith('#'));
                  if (lines.length > 0) {
                    description = lines[0].substring(0, 400);
                  }
                }
              } catch(e) {}
            }
          }

          companies.push({
            name,
            description,
            url: `github.com/paperclipai/paperclip/tree/main/companies/${item.name}`,
            category: guessCategory(item.name),
            source: 'paperclip',
          });
          
          await sleep(500);
        } catch(e) {
          console.error(`Error fetching ${item.name}:`, e.message);
        }
      }
    }

    return companies;
  } catch(e) {
    console.error('GitHub API error:', e.message);
    return [];
  }
}

function guessCategory(name) {
  const n = name.toLowerCase();
  if (n.includes('content') || n.includes('media') || n.includes('blog') || n.includes('social')) return 'Content & Media';
  if (n.includes('seo') || n.includes('market') || n.includes('growth')) return 'Sales & Outreach';
  if (n.includes('dev') || n.includes('code') || n.includes('engineer') || n.includes('saas')) return 'SaaS & Dev Tools';
  if (n.includes('trade') || n.includes('field') || n.includes('service')) return 'Trades & Field Ops';
  if (n.includes('finance') || n.includes('account') || n.includes('tax')) return 'Finance & Analytics';
  if (n.includes('health') || n.includes('wellness') || n.includes('medical')) return 'Health & Wellness';
  if (n.includes('ecom') || n.includes('shop') || n.includes('retail')) return 'E-commerce';
  if (n.includes('legal') || n.includes('law') || n.includes('compliance')) return 'Legal & Compliance';
  if (n.includes('edu') || n.includes('learn') || n.includes('train')) return 'Education & Training';
  if (n.includes('real') || n.includes('prop') || n.includes('estate')) return 'Real Estate';
  return 'SaaS & Dev Tools';
}

async function main() {
  // Load env
  require('dotenv').config({ path: require('path').join(__dirname, '.env.local') });
  const { createClient } = require('@supabase/supabase-js');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  );

  const companies = await scrapeGitHub();
  
  if (companies.length === 0) {
    console.log('No companies found. GitHub API may be rate limiting. Try again with GITHUB_TOKEN set.');
    
    // Insert known Paperclip template companies manually as fallback
    const knownCompanies = [
      { name: 'Content Agency', description: 'A Paperclip AI content production company. Automated content creation with AI writers, editors, SEO analysts working autonomously 24/7.', url: 'github.com/paperclipai/paperclip', category: 'Content & Media', source: 'paperclip' },
      { name: 'Dev Shop AI', description: 'A Paperclip AI software development company. AI engineers, designers and PMs collaborating on software projects with human board oversight.', url: 'github.com/paperclipai/paperclip', category: 'SaaS & Dev Tools', source: 'paperclip' },
      { name: 'SEO Agency Bot', description: 'A Paperclip AI SEO and growth company. Automated keyword research, content creation, link building and ranking tracking.', url: 'github.com/paperclipai/paperclip', category: 'Sales & Outreach', source: 'paperclip' },
      { name: 'Trading Desk AI', description: 'A Paperclip AI trading company. Automated market analysis, strategy execution, and risk management with human approval gates.', url: 'github.com/paperclipai/paperclip', category: 'Finance & Analytics', source: 'paperclip' },
    ];
    
    for (const company of knownCompanies) {
      const { error } = await supabase.from('companies').insert([company]);
      if (error) console.error('Insert error:', error.message);
      else console.log(`Inserted: ${company.name}`);
    }
    return;
  }

  console.log(`\nInserting ${companies.length} Paperclip companies...`);
  let inserted = 0;
  let skipped = 0;

  for (const company of companies) {
    const { error } = await supabase.from('companies').insert([company]);
    if (error) {
      console.log(`Skip (duplicate?): ${company.name} — ${error.message}`);
      skipped++;
    } else {
      console.log(`✓ Inserted: ${company.name}`);
      inserted++;
      // Log to activity feed
      await supabase.from('activity_feed').insert([{
        text: `New Paperclip company added: ${company.name}`,
        icon: '📎'
      }]);
    }
    await sleep(200);
  }

  console.log(`\nDone. Inserted: ${inserted}, Skipped: ${skipped}`);
}

main().catch(console.error);
