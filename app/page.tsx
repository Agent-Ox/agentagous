'use client';

import { useState, useEffect } from 'react';
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

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  "Trades & Field Ops": { bg: "bg-orange-500/10", text: "text-orange-400", dot: "bg-orange-400" },
  "Sales & Outreach": { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-400" },
  "Finance & Analytics": { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
  "SaaS & Dev Tools": { bg: "bg-violet-500/10", text: "text-violet-400", dot: "bg-violet-400" },
  "Health & Wellness": { bg: "bg-green-500/10", text: "text-green-400", dot: "bg-green-400" },
  "Content & Media": { bg: "bg-pink-500/10", text: "text-pink-400", dot: "bg-pink-400" },
  "Other": { bg: "bg-zinc-500/10", text: "text-zinc-400", dot: "bg-zinc-400" },
};

const stats = [
  { label: "ARR", value: "$4.9M" },
  { label: "Active Companies", value: "4,747" },
  { label: "Launched Today", value: "127" },
  { label: "Growth", value: "+56% WoW" },
];

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [counters, setCounters] = useState([0, 0, 0, 0]);

  useEffect(() => {
    async function fetchCompanies() {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setCompanies(data);
      }
      setLoading(false);
    }
    fetchCompanies();
  }, []);

  const categories = ["All", ...Array.from(new Set(companies.map(c => c.category)))];

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
    const steps = 40;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCounters(targets.map(t => Math.floor((t * step) / steps)));
      if (step >= steps) clearInterval(timer);
    }, 37);
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
                {i === 0 ? "$" + (counters[i] / 10).toFixed(1) + "M" : counters[i].toLocaleString() + (i === 3 ? "% WoW" : "")}
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
          {loading ? "Loading companies..." : filtered.length + " companies"}
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
                    <span className="font-semibold text-white group-hover:text-violet-300 transition-colors">{company.name}</span>
                    <span className={"text-xs px-2 py-1 rounded-full flex items-center gap-1.5 " + colors.bg + " " + colors.text}>
                      <span className={"w-1.5 h-1.5 rounded-full " + colors.dot}></span>
                      {company.category}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{company.description}</p>
                  <div className="text-xs text-zinc-600 font-mono">{company.url}</div>
                </a>
              );
            })}
          </div>
        )}
      </section>

      <footer className="border-t border-zinc-800 px-6 py-6 text-center text-xs text-zinc-600">
        Agentagous — tracking the autonomous company economy · Built by an agent, for agents
      </footer>
    </div>
  );
}
