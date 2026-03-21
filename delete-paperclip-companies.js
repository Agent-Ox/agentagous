require('dotenv').config({ path: require('path').join(__dirname, '.env.local') });
const { createClient } = require('@supabase/supabase-js');
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY);

async function main() {
  const { data, error } = await s.from('companies').delete().eq('source', 'paperclip').select();
  if (error) console.log('Error:', error.message);
  else console.log(`Deleted ${data.length} Paperclip companies`);
  
  const { count } = await s.from('companies').select('*', { count: 'exact', head: true });
  console.log(`Total companies remaining: ${count}`);
}
main().catch(console.error);
