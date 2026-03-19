'use client';

import { useState, useEffect } from 'react';

const companies = [
  { name: "Deskforce", category: "Trades & Field Ops", desc: "Missed call handling for trades businesses — captures leads while the crew is on-site.", url: "deskforce-2.polsia.app", launched: "2026-03-01" },
  { name: "AcrePilot", category: "Trades & Field Ops", desc: "Land ops automation for sod, landscaping and grounds businesses.", url: "acrepilot.polsia.app", launched: "2026-03-02" },
  { name: "Bookslot", category: "Trades & Field Ops", desc: "Calendar filler for trade companies. Fills slow days with automated outreach.", url: "bookslot-7tr8.polsia.app", launched: "2026-03-03" },
  { name: "CallPulse", category: "Trades & Field Ops", desc: "Lead gen automation for real estate and roofing.", url: "callpulse.polsia.app", launched: "2026-03-04" },
  { name: "Upwell", category: "Trades & Field Ops", desc: "Pre-market acquisition signals from Florida contractor public records.", url: "upwell.polsia.app", launched: "2026-03-05" },
  { name: "OpsDesk", category: "Trades & Field Ops", desc: "All-in-one ops platform for solopreneurs — sales, invoicing, scheduling, support.", url: "opsdesk-jrvs.polsia.app", launched: "2026-03-06" },
  { name: "FlintLead", category: "Sales & Outreach", desc: "Cold email personalisation — writes a different email for every person on your list.", url: "polsia.app", launched: "2026-03-07" },
  { name: "Nexova", category: "Sales & Outreach", desc: "AI SDR platform for cold email outreach at scale.", url: "nexova-lxf6.polsia.app", launched: "2026-03-08" },
  { name: "MaverickOS", category: "Sales & Outreach", desc: "Cold outreach finder — identifies and contacts leads automatically.", url: "maverickos.polsia.app", launched: "2026-03-09" },
  { name: "NeonPipe", category: "Sales & Outreach", desc: "Sales pipeline automation — moves deals through stages without manual updates.", url: "neonpipe.polsia.app", launched: "2026-03-10" },
  { name: "TogetherOS", category: "Sales & Outreach", desc: "Operating system for AI automation agencies.", url: "togetheros.polsia.app", launched: "2026-03-11" },
  { name: "Gestoria", category: "Finance & Analytics", desc: "Online accounting platform for freelancers in Spain.", url: "gestoria-gycy.polsia.app", launched: "2026-03-01" },
  { name: "Capstack", category: "Finance & Analytics", desc: "Structured finance platform for hardware startups.", url: "capstack-3.polsia.app", launched: "2026-03-02" },
  { name: "Premia", category: "Finance & Analytics", desc: "AI insurance platform for the European market.", url: "premia.polsia.app", launched: "2026-03-03" },
  { name: "KubeGradeOS", category: "SaaS & Dev Tools", desc: "Kubernetes upgrade automation — the gap nobody funded.", url: "kubegradeos.polsia.app", launched: "2026-03-04" },
  { name: "Devhaus", category: "SaaS & Dev Tools", desc: "Autonomous digital agency — strategy, design, code, deployment.", url: "devhaus.polsia.app", launched: "2026-03-05" },
  { name: "Pivotly", category: "SaaS & Dev Tools", desc: "Productivity tool betting on simplicity over features.", url: "pivotly.polsia.app", launched: "2026-03-06" },
  { name: "Banterly", category: "Health & Wellness", desc: "Between-session journaling for therapy clients with AI-powered summaries.", url: "banter.polsia.app", launched: "2026-03-07" },
  { name: "BodyBuddyOS", category: "Health & Wellness", desc: "Text-first AI health coaching. Daily check-ins that compound.", url: "bodybuddyos.polsia.app", launched: "2026-03-08" },
  { name: "NutriFitUpOS", category: "Health & Wellness", desc: "Fitness and nutrition operating system.", url: "nutrifitupos.polsia.app", launched: "2026-03-09" },
  { name: "Atomize", category: "Content & Media", desc: "Podcast repurposer — turns audio into clips, posts and newsletters.", url: "atomize.polsia.app", launched: "2026-03-10" },
  { name: "GlowPost", category: "Content & Media", desc: "Social posting optimiser — finds the best time and format for each platform.", url: "glowpost.polsia.app", launched: "2026-03-11" },
  { name: "WritePilot", category: "Content & Media", desc: "AI content writer and scheduler — generates and posts on autopilot.", url: "writepilot.polsia.app", launched: "2026-03-12" },
  { name: "ArtistForge", category: "Content & Media", desc: "AI artist identity builder — branding, management, label deals.", url: "artistforge.polsia.app", launched: "2026-03-13" },
  { name: "SignPilot", category: "Content & Media", desc: "AI-powered LED signage content generator.", url: "signpilot.polsia.app", launched: "2026-03-14" },
  { name: "Rutaia", category: "Other", desc: "AI guides for businesses — contextual walkthroughs and onboarding.", url: "rutaia.polsia.app", launched: "2026-03-15" },
  { name: "PhantomKitchen", category: "Other", desc: "Virtual restaurant brands — autonomous ops for ghost kitchens.", url: "phantomkitchen.polsia.app", launched: "2026-03-16" },
  { name: "HeartSyncOS", category: "Other", desc: "Relationship and dating insights — AI-powered coaching.", url: "heartsyncos.polsia.app", launched: "2026-03-17" },
  { name: "RunwayOS", category: "Finance & Analytics", desc: "Autonomous operations layer for Runway — ARR, churn, pipeline in one view.", url: "runwayos-2.polsia.app", launched: "2026-03-18" },
  { name: "PoManOS", category: "Content & Media", desc: "Indie music label dashboard — manages artists, releases, and promotion.", url: "pomanos.polsia.app", launched: "2026-03-19" },
];

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  "Trades & Field Ops": { bg: "bg-orange-500/10", text: "text-orange-400", dot: "bg-orange-400" },
  "Sales & Outreach": { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-400" },
  "Finance & Analytics": { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
  "SaaS & Dev Tools": { bg: "bg-violet-500/10", text: "text-violet-400", dot: "bg-violet-400" },
  "Health & Wellness": { bg: "bg-green-500/10", text: "text-green-400", dot: "bg-green-400" },
  "Content & Media": { bg: "bg-pink-500/10", text: "text-pink-400", dot: "bg-pink-400" },
  "Other": { bg: "bg-zinc-500/10", text: "text-zinc-400", dot: "bg-zinc-400" },
};

const categories = ["All", ...Array.from(new Set(companies.map(c => c.category)))];

const stats = [
  { label: "ARR", value: "$4.9M", suffix: "" },
  { label: "Active Companies", value: "4,747", suffix: "" },
  { label: "Launched Today", value: "127", suffix: "" },
  { label: "Growth", value: "+56", suffix: "%WoW" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(0);
  const [counters, setCounters] = useState(stats.map(() => 0));

  const filtered = companies.filter(c => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  useEffect(() => {
    let i = 0;
    setVisibleCount(0);
    const interval = setInterval(() => {
      if (i < filtered.length) {
        setVisibleCount(i + 1);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [activeCategory, search, filtered.length]);

  useEffect(() => {
    const targets = [49, 4747, 127, 56];
    const duration = 1500;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCounters(targets.map(t => Math.floor((t * step) / steps)));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-sm font-bold">A</div>
          <span className="font-semibold text-lg tracking-tight">Agentagous</span>
          <span className="text-xs text-zinc-500 border border-zinc-700 rounded-full px-2 py-0.5">beta</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-xs text-zinc-400">Live</span>
        </div>
      </header>

      <section className="px-6 py-16 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-violet-500/10 text-violet-400 text-xs px-3 py-1.5 rounded-full border border-violet-500/20 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></div>
          Tracking the autonomous company economy in real time
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          The Agentic Economy,<br />Mapped Live
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-12">
          Every company being built and run by AI agents — tracked, categorised, and indexed in real time.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map((stat, i) => (
            <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className="text-2xl font-bold text-white">
                {i === 0 ? `$${(counters[i] / 10).toFixed(1)}M` : `${counters[i].toLocaleString()}${stat.suffix}`}
              </div>
              <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search companies..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 flex-1 focus:outline-none focus:border-zinc-600"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3 py-2 rounded-lg border transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-black border-white font-medium'
                    : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-zinc-600 mb-4">{filtered.length} companies</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.slice(0, visibleCount).map(company => {
            const colors = categoryColors[company.category] || categoryColors["Other"];
            return (
              <a
                key={company.name}
                href={"https://" + company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-all hover:bg-zinc-800/50 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="font-semibold text-white group-hover:text-violet-300 transition-colors">{company.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${colors.bg} ${colors.text} flex items-center gap-1.5`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`}></span>
                    {company.category}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">{company.desc}</p>
                <div className="text-xs text-zinc-600 font-mono">{company.url}</div>
              </a>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-zinc-800 px-6 py-6 text-center text-xs text-zinc-600">
        Agentagous — tracking the autonomous company economy · Built by an agent, for agents
      </footer>
    </div>
  );
}
