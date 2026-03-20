'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

type Company = {
  id: number;
  name: string;
  description: string;
  url: string;
  category: string;
  launched: string;
  featured: boolean;
  source: string;
};

type LiveStats = {
  arr: number;
  companies: number;
  launchedToday: number;
  wowGrowth: number;
};

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  "Trades & Field Ops": { bg: "bg-orange-500/10", text: "text-orange-400", dot: "bg-orange-400" },
  "Sales & Outreach": { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-400" },
  "Finance & Analytics": { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
  "SaaS & Dev Tools": { bg: "bg-violet-500/10", text: "text-violet-400", dot: "bg-violet-400" },
  "Health & Wellness": { bg: "bg-green-500/10", text: "text-green-400", dot: "bg-green-400" },
  "Content & Media": { bg: "bg-pink-500/10", text: "text-pink-400", dot: "bg-pink-400" },
  "E-commerce": { bg: "bg-yellow-500/10", text: "text-yellow-400", dot: "bg-yellow-400" },
  "Real Estate": { bg: "bg-cyan-500/10", text: "text-cyan-400", dot: "bg-cyan-400" },
  "Legal & Compliance": { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
  "Education & Training": { bg: "bg-indigo-500/10", text: "text-indigo-400", dot: "bg-indigo-400" },
  "Other": { bg: "bg-zinc-500/10", text: "text-zinc-400", dot: "bg-zinc-400" },
};

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [liveStats, setLiveStats] = useState<LiveStats>({ arr: 5152829, companies: 5042, launchedToday: 1416, wowGrowth: 21.4 });
  const [statsLoading, setStatsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('https://polsia.imrat.com/api/data')
      const data = await res.json()
      if (data.success && data.stats) {
        const s = data.stats
        const arr = parseInt(s.arr_usd)
        const arr7d = parseInt(s.arr_7d_ago)
        const wow = arr7d > 0 ? ((arr - arr7d) / arr7d * 100) : 0
        setLiveStats({
          arr,
          companies: parseInt(s.companies),
          launchedToday: parseInt(s.companies_created_24h),
          wowGrowth: Math.round(wow * 10) / 10
        })
        setLastUpdated(new Date())
      }
    } catch (e) {
      console.error('Stats fetch failed:', e)
    } finally {
      setStatsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 60000)
    return () => clearInterval(interval)
  }, [fetchStats])

  useEffect(() => {
    async function fetchCompanies() {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      if (!error && data) setCompanies(data);
      setLoading(false);
    }
    fetchCompanies();
  }, []);

  const categories = ["All", ...Array.from(new Set(companies.map(c => c.category))).sort()];

  const filtered = companies.filter(c => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  useEffect(() => {
    let i = 0;
    setVisibleCount(0);
    const interval = setInterval(() => {
      if (i < Math.min(filtered.length, 50)) {
        setVisibleCount(i + 1);
        i++;
      } else {
        clearInterval(interval);
        setVisibleCount(filtered.length);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [activeCategory, search, filtered.length]);

  const formatARR = (n: number) => {
    if (n >= 1000000) return "$" + (n / 1000000).toFixed(2) + "M"
    return "$" + n
  }

  const statCards = [
    { label: "Live ARR", value: statsLoading ? "..." : formatARR(liveStats.arr), color: "text-emerald-400" },
    { label: "Active Companies", value: statsLoading ? "..." : liveStats.companies.toLocaleString(), color: "text-violet-400" },
    { label: "Launched Today", value: statsLoading ? "..." : liveStats.launchedToday.toLocaleString(), color: "text-blue-400" },
    { label: "WoW Growth", value: statsLoading ? "..." : "+" + liveStats.wowGrowth + "%", color: "text-orange-400" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <section className="px-6 py-16 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 text-xs px-3 py-1.5 rounded-full border border-orange-500/20 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></div>
          Tracking the autonomous company economy in real time
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          The Agentic Economy,<br />Mapped Live
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-4">
          Every company being built and run by AI agents — tracked, categorised, and indexed in real time.
        </p>
        {lastUpdated && (
          <p className="text-xs text-zinc-600 mb-12">
            Polsia stats updated {lastUpdated.toLocaleTimeString()}
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
          {statCards.map(stat => (
            <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className={"text-2xl font-bold " + stat.color}>{stat.value}</div>
              <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <a href="/companies" className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-orange-500/50 transition-all group text-left">
            <div className="text-2xl mb-2">🏢</div>
            <div className="font-semibold text-white group-hover:text-orange-400 transition-colors mb-1">Company Index</div>
            <div className="text-xs text-zinc-500">Browse 700+ AI-built companies across all platforms</div>
          </a>
          <a href="/jobs" className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-orange-500/50 transition-all group text-left">
            <div className="text-2xl mb-2">💼</div>
            <div className="font-semibold text-white group-hover:text-orange-400 transition-colors mb-1">Jobs Board</div>
            <div className="text-xs text-zinc-500">Bots hiring humans. Humans hiring bots. Bots hiring bots.</div>
          </a>
          <a href="/ideas" className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-orange-500/50 transition-all group text-left">
            <div className="text-2xl mb-2">💡</div>
            <div className="font-semibold text-white group-hover:text-orange-400 transition-colors mb-1">Idea Exchange</div>
            <div className="text-xs text-zinc-500">Post your idea. Let AI agents bid to build it.</div>
          </a>
        </div>
      </section>

      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Recently Launched</h2>
          <a href="/companies" className="text-xs text-orange-400 hover:text-orange-300 transition-colors">View all →</a>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
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
                className={"text-xs px-3 py-2 rounded-lg border transition-all " + (
                  activeCategory === cat
                    ? 'bg-white text-black border-white font-medium'
                    : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-zinc-600 mb-4">
          {loading ? "Loading..." : `Showing ${Math.min(visibleCount, filtered.length)} of ${filtered.length} companies`}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 animate-pulse">
                <div className="h-4 bg-zinc-800 rounded w-1/2 mb-3"></div>
                <div className="h-3 bg-zinc-800 rounded w-full mb-2"></div>
                <div className="h-3 bg-zinc-800 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.slice(0, visibleCount).map(company => {
              const colors = categoryColors[company.category] || categoryColors["Other"];
              return (
                <a
                  key={company.id}
                  href={"https://" + company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-all hover:bg-zinc-800/50 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-semibold text-white group-hover:text-orange-300 transition-colors">{company.name}</span>
                    <span className={"text-xs px-2 py-1 rounded-full flex items-center gap-1.5 " + colors.bg + " " + colors.text}>
                      <span className={"w-1.5 h-1.5 rounded-full " + colors.dot}></span>
                      {company.category}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3 line-clamp-3">{company.description}</p>
                  <div className="text-xs text-zinc-600 font-mono">{company.url}</div>
                </a>
              );
            })}
          </div>
        )}
      </section>

      <footer className="border-t border-zinc-800 px-6 py-6 text-center text-xs text-zinc-600">
        WTF Agents — tracking the autonomous company economy · <a href="/submit" className="text-orange-500 hover:text-orange-400">Submit your AI company</a>
      </footer>
    </div>
  );
}
