'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

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
  "E-commerce": { bg: "bg-yellow-500/10", text: "text-yellow-400", dot: "bg-yellow-400" },
  "Real Estate": { bg: "bg-cyan-500/10", text: "text-cyan-400", dot: "bg-cyan-400" },
  "Legal & Compliance": { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
  "Education & Training": { bg: "bg-indigo-500/10", text: "text-indigo-400", dot: "bg-indigo-400" },
  "Other": { bg: "bg-zinc-500/10", text: "text-zinc-400", dot: "bg-zinc-400" },
};

const platformColors: Record<string, { bg: string; text: string }> = {
  "polsia": { bg: "bg-violet-500/10", text: "text-violet-400" },
  "x_polsia": { bg: "bg-blue-500/10", text: "text-blue-400" },
  "manual": { bg: "bg-emerald-500/10", text: "text-emerald-400" },
};

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePlatform, setActivePlatform] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 60;

  useEffect(() => {
    async function fetchCompanies() {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setCompanies(data);
      setLoading(false);
    }
    fetchCompanies();
  }, []);

  const categories = ["All", ...Array.from(new Set(companies.map(c => c.category))).sort()];
  const platforms = ["All", "Polsia", "X Discovery"];

  const filtered = companies.filter(c => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchPlatform = activePlatform === "All" ||
      (activePlatform === "Polsia" && c.source === "polsia") ||
      (activePlatform === "X Discovery" && c.source === "x_polsia");
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchPlatform && matchSearch;
  });

  const paginated = filtered.slice(0, (page + 1) * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Company Index</h1>
          <p className="text-zinc-400">Every AI-built company we've found — searchable, categorised, live.</p>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or description..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }}
            className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 w-full focus:outline-none focus:border-zinc-600"
          />

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-zinc-600 mr-1">Platform:</span>
            {platforms.map(p => (
              <button
                key={p}
                onClick={() => { setActivePlatform(p); setPage(0); }}
                className={"text-xs px-3 py-1.5 rounded-lg border transition-all " + (
                  activePlatform === p
                    ? 'bg-orange-500 text-white border-orange-500 font-medium'
                    : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600'
                )}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-zinc-600 mr-1">Category:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setPage(0); }}
                className={"text-xs px-3 py-1.5 rounded-lg border transition-all " + (
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

        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-zinc-600">
            {loading ? "Loading..." : `${filtered.length.toLocaleString()} companies`}
          </span>
          <a href="/submit" className="text-xs text-orange-400 hover:text-orange-300 border border-orange-500/30 px-3 py-1.5 rounded-lg hover:border-orange-500/60 transition-all">
            + Submit your company
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 animate-pulse">
                <div className="h-4 bg-zinc-800 rounded w-1/2 mb-3"></div>
                <div className="h-3 bg-zinc-800 rounded w-full mb-2"></div>
                <div className="h-3 bg-zinc-800 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginated.map(company => {
                const colors = categoryColors[company.category] || categoryColors["Other"];
                const platform = platformColors[company.source] || platformColors["manual"];
                return (
                  <a
                    key={company.id}
                    href={"https://" + company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-all hover:bg-zinc-800/50 group"
                  >
                    <div className="flex items-start justify-between mb-3 gap-2">
                      <span className="font-semibold text-white group-hover:text-orange-300 transition-colors leading-tight">{company.name}</span>
                      <span className={"text-xs px-2 py-1 rounded-full flex items-center gap-1.5 shrink-0 " + colors.bg + " " + colors.text}>
                        <span className={"w-1.5 h-1.5 rounded-full " + colors.dot}></span>
                        {company.category}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-3 line-clamp-3">{company.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-zinc-600 font-mono truncate">{company.url}</div>
                      {company.featured && (
                        <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full shrink-0 ml-2">Featured</span>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>

            {paginated.length < filtered.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 px-6 py-3 rounded-lg text-sm transition-all"
                >
                  Load more ({filtered.length - paginated.length} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <footer className="border-t border-zinc-800 px-6 py-6 text-center text-xs text-zinc-600">
        WTF Agents — {companies.length.toLocaleString()} companies indexed · <a href="/submit" className="text-orange-500 hover:text-orange-400">Submit yours</a>
      </footer>
    </div>
  );
}
