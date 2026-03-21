// cleanup-paperclip.js
// Cleans up Paperclip company imports:
// 1. Deletes low quality entries (influencers, templates, test data)
// 2. Keeps 5 real verified companies
// 3. Ensures all keepers have source='paperclip'
// Run: node cleanup-paperclip.js

require('dotenv').config({ path: require('path').join(__dirname, '.env.local') });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);

// Companies to DELETE — influencers, templates, test data
const DELETE_NAMES = [
  // Templates — not real companies
  'Trading Desk AI',
  'SEO Agency Bot', 
  'Dev Shop AI',
  'Content Agency',
  'AI Content Agency (Clipmart template)',
  'AI Trading Desk (Clipmart template)',
  'AI Dev Shop (Clipmart template)',
  // Fallback duplicates
  'Content Agency',
  // Influencers/documenters — not companies
  'Aron Prins (aronprins.com)',
  'Shubham Saboo (AI Tools)',
  'Kelvin Kwong / tszhim_tech',
  'dotta (Zero-Human Company)',
  'Brian Roemmele (Zero-Human Company)',
  '10x-smitty (10x Agency)',
  'javipark (Private AI Company)',
  'oalanicolas (Agent Ops)',
  'Corey Ganim (AI Agency)',
  'Nick Spisak (AI Company)',
  'Sukh Saroy (AI Ventures)',
  'Hasan Toor (AI Startup)',
  'Nervegna (Design/Product Studio)',
  // Test submission
  'Hire a human today',
];

// Companies to KEEP and update — verified real companies
const KEEP_AND_UPDATE = [
  {
    name: 'NamastexLabs',
    description: 'Brazilian AI automation company running multi-agent operations via a custom TypeScript implementation of Paperclip. One of the most active Paperclip forks with custom commits and open issues.',
    url: 'github.com/namastexlabs/paperclip',
    category: 'SaaS & Dev Tools',
    source: 'paperclip',
  },
  {
    name: 'namaste.ai',
    description: 'The production company behind NamastexLabs — running autonomous AI operations with 15+ active commits beyond upstream Paperclip. TypeScript-first stack.',
    url: 'namastexlabs.com',
    category: 'SaaS & Dev Tools',
    source: 'paperclip',
  },
  {
    name: 'Agent Native',
    description: 'Autonomous software services company running 15+ AI agents simultaneously in production using Claude Code, Codex, and OpenClaw via Paperclip orchestration.',
    url: 'agentnativedev.medium.com',
    category: 'SaaS & Dev Tools',
    source: 'paperclip',
  },
];

async function main() {
  console.log('Starting Paperclip data cleanup...\n');

  // Step 1 — Delete low quality entries
  console.log('Step 1: Deleting low quality entries...');
  let deleted = 0;
  for (const name of DELETE_NAMES) {
    const { data, error } = await supabase
      .from('companies')
      .delete()
      .eq('name', name)
      .select();
    if (error) {
      console.log(`  Error deleting "${name}": ${error.message}`);
    } else if (data && data.length > 0) {
      console.log(`  ✓ Deleted: ${name}`);
      deleted += data.length;
    }
  }
  console.log(`  Total deleted: ${deleted}\n`);

  // Step 2 — Upsert the 5 real verified companies
  console.log('Step 2: Upserting verified Paperclip companies...');
  for (const company of KEEP_AND_UPDATE) {
    // Check if exists
    const { data: existing } = await supabase
      .from('companies')
      .select('id')
      .eq('name', company.name)
      .single();

    if (existing) {
      // Update existing
      const { error } = await supabase
        .from('companies')
        .update({
          description: company.description,
          url: company.url,
          category: company.category,
          source: company.source,
        })
        .eq('name', company.name);
      if (error) console.log(`  Error updating "${company.name}": ${error.message}`);
      else console.log(`  ✓ Updated: ${company.name}`);
    } else {
      // Insert new
      const { error } = await supabase
        .from('companies')
        .insert([{ ...company, featured: false }]);
      if (error) console.log(`  Error inserting "${company.name}": ${error.message}`);
      else console.log(`  ✓ Inserted: ${company.name}`);
    }
  }

  // Step 3 — Verify final state
  console.log('\nStep 3: Verifying final Paperclip company count...');
  const { data: paperclipCos, error: countError } = await supabase
    .from('companies')
    .select('id, name, category')
    .eq('source', 'paperclip');

  if (countError) {
    console.log('  Error fetching count:', countError.message);
  } else {
    console.log(`  Total Paperclip companies in database: ${paperclipCos.length}`);
    paperclipCos.forEach(c => console.log(`    - ${c.name} [${c.category}]`));
  }

  // Step 4 — Check total company count
  const { count } = await supabase
    .from('companies')
    .select('*', { count: 'exact', head: true });
  console.log(`\nTotal companies in database: ${count}`);
  console.log('\nCleanup complete.');
}

main().catch(console.error);
