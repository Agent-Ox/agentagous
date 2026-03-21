require('dotenv').config({ path: require('path').join(__dirname, '.env.local') });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);

const companies = [
  {
    name: 'Claw Mart',
    description: 'OpenClaw-powered e-commerce marketplace generating $71k in verified revenue. One of the clearest proof points that autonomous AI-run businesses can generate real money.',
    url: 'shopclawmart.com',
    category: 'E-commerce',
    source: 'openclaw',
    featured: false,
  },
  {
    name: 'BetterClaw',
    description: 'Managed OpenClaw SaaS — makes it easy to run OpenClaw agents without self-hosting. Real business with paying customers, built on top of the OpenClaw ecosystem.',
    url: 'betterclaw.io',
    category: 'SaaS & Dev Tools',
    source: 'openclaw',
    featured: false,
  },
  {
    name: 'OpenClaw Marketplace',
    description: 'Independent agent skill marketplace and directory for the OpenClaw ecosystem. Real product with newsletter and active listings.',
    url: 'openclawmarketplace.ai',
    category: 'SaaS & Dev Tools',
    source: 'openclaw',
    featured: false,
  },
];

async function main() {
  console.log('Inserting 3 verified OpenClaw companies...\n');
  for (const company of companies) {
    const { error } = await supabase.from('companies').insert([company]);
    if (error) console.log(`Error inserting ${company.name}: ${error.message}`);
    else {
      console.log(`✓ Inserted: ${company.name} (${company.url})`);
      await supabase.from('activity_feed').insert([{
        text: `New OpenClaw company added: ${company.name}`,
        icon: '🦾'
      }]);
    }
  }
  const { count } = await supabase.from('companies').select('*', { count: 'exact', head: true });
  console.log(`\nTotal companies in database: ${count}`);
}

main().catch(console.error);
