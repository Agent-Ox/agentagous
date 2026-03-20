const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://junhzahqnhtrvvwtpart.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1bmh6YWhxbmh0cnZ2d3RwYXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MzAxNDUsImV4cCI6MjA4OTUwNjE0NX0.0c7B3FQBJdhYC5bt5RFD_Ij2O-TgdTCvxGUVbtADxRM'
)

const companies = [
  { name: "Deskforce", category: "Trades & Field Ops", description: "Missed call handling for trades businesses. Captures leads while the crew is on-site.", url: "deskforce-2.polsia.app", source: "polsia", featured: false },
  { name: "AcrePilot", category: "Trades & Field Ops", description: "Land ops automation for sod, landscaping and grounds businesses.", url: "acrepilot.polsia.app", source: "polsia", featured: false },
  { name: "Bookslot", category: "Trades & Field Ops", description: "Calendar filler for trade companies. Fills slow days with automated outreach.", url: "bookslot-7tr8.polsia.app", source: "polsia", featured: false },
  { name: "CallPulse", category: "Trades & Field Ops", description: "Lead gen automation for real estate and roofing.", url: "callpulse.polsia.app", source: "polsia", featured: false },
  { name: "Upwell", category: "Trades & Field Ops", description: "Pre-market acquisition signals from Florida contractor public records.", url: "upwell.polsia.app", source: "polsia", featured: false },
  { name: "OpsDesk", category: "Trades & Field Ops", description: "All-in-one ops platform for solopreneurs. Sales, invoicing, scheduling, support.", url: "opsdesk-jrvs.polsia.app", source: "polsia", featured: false },
  { name: "FlintLead", category: "Sales & Outreach", description: "Cold email personalisation. Writes a different email for every person on your list.", url: "polsia.app", source: "polsia", featured: false },
  { name: "Nexova", category: "Sales & Outreach", description: "AI SDR platform for cold email outreach at scale.", url: "nexova-lxf6.polsia.app", source: "polsia", featured: false },
  { name: "MaverickOS", category: "Sales & Outreach", description: "Cold outreach finder. Identifies and contacts leads automatically.", url: "maverickos.polsia.app", source: "polsia", featured: false },
  { name: "NeonPipe", category: "Sales & Outreach", description: "Sales pipeline automation. Moves deals through stages without manual updates.", url: "neonpipe.polsia.app", source: "polsia", featured: false },
  { name: "TogetherOS", category: "Sales & Outreach", description: "Operating system for AI automation agencies.", url: "togetheros.polsia.app", source: "polsia", featured: false },
  { name: "Gestoria", category: "Finance & Analytics", description: "Online accounting platform for freelancers in Spain.", url: "gestoria-gycy.polsia.app", source: "polsia", featured: false },
  { name: "Capstack", category: "Finance & Analytics", description: "Structured finance platform for hardware startups.", url: "capstack-3.polsia.app", source: "polsia", featured: false },
  { name: "Premia", category: "Finance & Analytics", description: "AI insurance platform for the European market.", url: "premia.polsia.app", source: "polsia", featured: false },
  { name: "RunwayOS", category: "Finance & Analytics", description: "Autonomous operations layer for Runway. ARR, churn, pipeline in one view.", url: "runwayos-2.polsia.app", source: "polsia", featured: false },
  { name: "KubeGradeOS", category: "SaaS & Dev Tools", description: "Kubernetes upgrade automation. The gap nobody funded.", url: "kubegradeos.polsia.app", source: "polsia", featured: false },
  { name: "Devhaus", category: "SaaS & Dev Tools", description: "Autonomous digital agency. Strategy, design, code, deployment.", url: "devhaus.polsia.app", source: "polsia", featured: false },
  { name: "Pivotly", category: "SaaS & Dev Tools", description: "Productivity tool betting on simplicity over features.", url: "pivotly.polsia.app", source: "polsia", featured: false },
  { name: "Banterly", category: "Health & Wellness", description: "Between-session journaling for therapy clients with AI-powered summaries.", url: "banter.polsia.app", source: "polsia", featured: false },
  { name: "BodyBuddyOS", category: "Health & Wellness", description: "Text-first AI health coaching. Daily check-ins that compound.", url: "bodybuddyos.polsia.app", source: "polsia", featured: false },
  { name: "NutriFitUpOS", category: "Health & Wellness", description: "Fitness and nutrition operating system.", url: "nutrifitupos.polsia.app", source: "polsia", featured: false },
  { name: "Atomize", category: "Content & Media", description: "Podcast repurposer. Turns audio into clips, posts and newsletters.", url: "atomize.polsia.app", source: "polsia", featured: false },
  { name: "GlowPost", category: "Content & Media", description: "Social posting optimiser. Finds the best time and format for each platform.", url: "glowpost.polsia.app", source: "polsia", featured: false },
  { name: "WritePilot", category: "Content & Media", description: "AI content writer and scheduler. Generates and posts on autopilot.", url: "writepilot.polsia.app", source: "polsia", featured: false },
  { name: "ArtistForge", category: "Content & Media", description: "AI artist identity builder. Branding, management, label deals.", url: "artistforge.polsia.app", source: "polsia", featured: false },
  { name: "SignPilot", category: "Content & Media", description: "AI-powered LED signage content generator.", url: "signpilot.polsia.app", source: "polsia", featured: false },
  { name: "PoManOS", category: "Content & Media", description: "Indie music label dashboard. Manages artists, releases, and promotion.", url: "pomanos.polsia.app", source: "polsia", featured: false },
  { name: "Rutaia", category: "Other", description: "AI guides for businesses. Contextual walkthroughs and onboarding.", url: "rutaia.polsia.app", source: "polsia", featured: false },
  { name: "PhantomKitchen", category: "Other", description: "Virtual restaurant brands. Autonomous ops for ghost kitchens.", url: "phantomkitchen.polsia.app", source: "polsia", featured: false },
  { name: "HeartSyncOS", category: "Other", description: "Relationship and dating insights. AI-powered coaching.", url: "heartsyncos.polsia.app", source: "polsia", featured: false },
]

async function seed() {
  const { data, error } = await supabase.from('companies').insert(companies)
  if (error) console.error('Error:', error)
  else console.log('Seeded ' + companies.length + ' companies!')
}

seed()
