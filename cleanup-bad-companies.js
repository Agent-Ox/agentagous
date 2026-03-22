const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://junhzahqnhtrvvwtpart.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1bmh6YWhxbmh0cnZ2d3RwYXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MzAxNDUsImV4cCI6MjA4OTUwNjE0NX0.0c7B3FQBJdhYC5bt5RFD_Ij2O-TgdTCvxGUVbtADxRM'
)

async function main() {
  console.log('Starting cleanup...\n')

  const { count: before } = await supabase
    .from('companies')
    .select('*', { count: 'exact', head: true })
  console.log('Companies before cleanup:', before)

  // 1. Exact fallback description
  const { count: c1, error: e1 } = await supabase
    .from('companies')
    .delete({ count: 'exact' })
    .eq('description', 'An autonomous AI-run company on Polsia.')
  if (e1) console.error('Error 1:', e1.message); else console.log('Deleted (fallback description):', c1)

  // 2. Service Suspended in name
  const { count: c2, error: e2 } = await supabase
    .from('companies')
    .delete({ count: 'exact' })
    .ilike('name', '%Service Suspended%')
  if (e2) console.error('Error 2:', e2.message); else console.log('Deleted (Service Suspended name):', c2)

  // 3. Service Suspended in description
  const { count: c3, error: e3 } = await supabase
    .from('companies')
    .delete({ count: 'exact' })
    .ilike('description', '%Service Suspended%')
  if (e3) console.error('Error 3:', e3.message); else console.log('Deleted (Service Suspended desc):', c3)

  // 4. Generic Polsia name
  const { count: c4, error: e4 } = await supabase
    .from('companies')
    .delete({ count: 'exact' })
    .ilike('name', '%Polsia — AI That Runs%')
  if (e4) console.error('Error 4:', e4.message); else console.log('Deleted (generic Polsia name):', c4)

  // 5. Generic Polsia description variant 1
  const { count: c5, error: e5 } = await supabase
    .from('companies')
    .delete({ count: 'exact' })
    .ilike('description', '%AI That Runs Your Company While You Sleep%')
  if (e5) console.error('Error 5:', e5.message); else console.log('Deleted (generic Polsia desc v1):', c5)

  // 6. Generic Polsia description variant 2
  const { count: c6, error: e6 } = await supabase
    .from('companies')
    .delete({ count: 'exact' })
    .ilike('description', '%Polsia is an autonomous AI system%')
  if (e6) console.error('Error 6:', e6.message); else console.log('Deleted (generic Polsia desc v2):', c6)

  // 7. plans, codes, and markets variant
  const { count: c7, error: e7 } = await supabase
    .from('companies')
    .delete({ count: 'exact' })
    .ilike('description', '%plans, codes, and markets your company%')
  if (e7) console.error('Error 7:', e7.message); else console.log('Deleted (plans codes markets desc):', c7)

  // 8. Untitled URLs
  const { count: c8, error: e8 } = await supabase
    .from('companies')
    .delete({ count: 'exact' })
    .ilike('url', 'untitled-%')
  if (e8) console.error('Error 8:', e8.message); else console.log('Deleted (untitled URLs):', c8)

  // 9. "Home" named companies with generic desc
  const { count: c9, error: e9 } = await supabase
    .from('companies')
    .delete({ count: 'exact' })
    .eq('name', 'Home')
  if (e9) console.error('Error 9:', e9.message); else console.log('Deleted (name = Home):', c9)

  const { count: after } = await supabase
    .from('companies')
    .select('*', { count: 'exact', head: true })

  console.log('\n--- CLEANUP COMPLETE ---')
  console.log('Before:', before)
  console.log('After: ', after)
  console.log('Removed:', (before || 0) - (after || 0))
}

main().catch(console.error)
