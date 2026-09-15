'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import ShareButton from '../components/ShareButton';
import { GUIDES, GUIDE_COUNT, MIN_GUIDE_PRICE } from '../lib/guides';

type Company = {
  id: number;
  name: string;
  description: string;
  url: string;
  category: string;
  source: string;
};

type LiveStats = {
  arr: number | null;
  companies: number | null;
  launchedToday: number | null;
  wowGrowth: number | null;
};

// No seeded values: an unreachable API must render "—", never a stale number
// styled as if it were live.
const NO_STATS: LiveStats = { arr: null, companies: null, launchedToday: null, wowGrowth: null };

const BUILD_DATE = (process.env.NEXT_PUBLIC_BUILD_DATE || '').slice(0, 10);

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [liveStats, setLiveStats] = useState<LiveStats>(NO_STATS);
  const [statsLoading, setStatsLoading] = useState(true);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState<number | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('https://polsia.imrat.com/api/data');
      const data = await res.json();
      if (data.success && data.stats) {
        const st = data.stats;
        const arr = parseInt(st.arr_usd);
        const arr7d = parseInt(st.arr_7d_ago);
        const wow = arr7d > 0 ? ((arr - arr7d) / arr7d * 100) : 0;
        setLiveStats({ arr, companies: parseInt(st.companies), launchedToday: parseInt(st.companies_created_24h), wowGrowth: Math.round(wow * 10) / 10 });
      } else {
        setLiveStats(NO_STATS);
      }
    } catch (e) {
      console.error(e);
      setLiveStats(NO_STATS);
    }
    finally { setStatsLoading(false); }
  }, []);

  useEffect(() => {
    fetchStats();
    const s = setInterval(fetchStats, 60000);
    return () => clearInterval(s);
  }, [fetchStats]);

  useEffect(() => {
    const t = setInterval(() => setTickerIndex(i => i + 1), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    async function fetchCompanies() {
      const { data } = await supabase.from('companies').select('*').order('created_at', { ascending: false }).limit(6);
      if (data) setCompanies(data);
      const { count } = await supabase.from('companies').select('*', { count: 'exact', head: true });
      if (count) setTotalCompanies(count);
      setLoading(false);
    }
    fetchCompanies();
  }, []);

  const formatARR = (n: number) => n >= 1000000 ? "$" + (n / 1000000).toFixed(2) + "M" : "$" + n.toLocaleString();
  const statValue = (n: number | null, fmt: (v: number) => string) =>
    statsLoading ? "..." : n === null ? "—" : fmt(n);

  // Ticker lines are built from live data only — a line is omitted until the
  // number behind it has actually loaded.
  const tickerLines = [
    liveStats.launchedToday !== null && { icon: "🚀", text: `${liveStats.launchedToday.toLocaleString()} AI companies launched in the last 24 hours` },
    liveStats.arr !== null && { icon: "💰", text: `${formatARR(liveStats.arr)} ARR now running on autonomous companies` },
    totalCompanies !== null && { icon: "🏢", text: `${totalCompanies.toLocaleString()} AI companies indexed on WTF Agents` },
    companies[0] && { icon: "🆕", text: `Latest company indexed: ${companies[0].name}` },
  ].filter(Boolean) as { icon: string; text: string }[];
  const currentTicker = tickerLines[tickerIndex % (tickerLines.length || 1)];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* LIVE TICKER */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-2 flex items-center gap-3">
        <span className="text-xs text-orange-400 font-medium shrink-0 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
          LIVE
        </span>
        <span className="text-xs text-zinc-300">
          {currentTicker ? `${currentTicker.icon} ${currentTicker.text}` : "Loading live data…"}
        </span>
      </div>

      {/* HERO */}
      <section className="px-6 py-16 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 text-xs px-3 py-1.5 rounded-full border border-orange-500/20 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></div>
          The autonomous company economy is here
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          WTF is the<br />Agentic Economy?
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-2">
          AI agents are building companies, replacing employees, hiring humans, and generating revenue — autonomously, 24/7. This is the index tracking it all.
        </p>
        <p className="text-zinc-600 text-sm max-w-xl mx-auto mb-10">
          We track the real numbers, the real players, and what it means for you.
        </p>

        {/* LIVE POLSIA STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-3">
          {[
            { label: "Live ARR", value: statValue(liveStats.arr, formatARR), color: "text-emerald-400", sub: "Polsia autonomous companies" },
            { label: "AI Companies", value: statValue(liveStats.companies, v => v.toLocaleString()), color: "text-violet-400", sub: "tracked live" },
            { label: "Launched Today", value: statValue(liveStats.launchedToday, v => v.toLocaleString()), color: "text-blue-400", sub: "new companies" },
            { label: "WoW Growth", value: statValue(liveStats.wowGrowth, v => "+" + v + "%"), color: "text-orange-400", sub: "week on week" },
          ].map(stat => (
            <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className={"text-2xl font-bold " + stat.color}>{stat.value}</div>
              <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              <div className="text-xs text-zinc-700 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-zinc-600 mb-6">Data: Polsia API, live · Page updated {BUILD_DATE}</p>

        {/* SHARE */}
        <div className="flex justify-center mb-12">
          <ShareButton
            title="The Agentic Economy is here"
            text={[
              'The agentic economy right now:',
              '',
              ...tickerLines.map(l => `• ${l.text}`),
              '',
              'WTF is happening → wtfagents.com',
            ].join('\n')}
            url="https://wtfagents.com"
            label="📤 Share these stats"
          />
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { href: "/companies", icon: "🏢", title: "Company Index", desc: "AI-run companies tracked live. The first directory of the autonomous company economy.", badge: totalCompanies === null ? "loading…" : `${totalCompanies.toLocaleString()} indexed` },
            { href: "/store", icon: "📖", title: "WTF Guides", desc: `${GUIDE_COUNT} plain English guides. Claude, Anthropic, OpenClaw, Polsia, agents, LLMs — all explained. From $${MIN_GUIDE_PRICE}.`, badge: `From $${MIN_GUIDE_PRICE}` },
          ].map(card => (
            <a key={card.href} href={card.href} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-orange-500/50 transition-all group text-left">
              <div className="flex items-start justify-between mb-3">
                <div className="text-2xl">{card.icon}</div>
                <span className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-full">{card.badge}</span>
              </div>
              <div className="font-semibold text-white group-hover:text-orange-400 transition-colors mb-1">{card.title}</div>
              <div className="text-xs text-zinc-500 leading-relaxed">{card.desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* THE PLAYERS */}
      <section className="px-6 pb-12 max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">The Players — who is actually building this</h2>
          <p className="text-xs text-zinc-600 mt-0.5">From the big labs to one-person startups. This is the real landscape.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              tier: "THE BIG PLAYERS",
              color: "text-violet-400",
              borderColor: "border-violet-500/20",
              players: [
                { name: "Anthropic", desc: "Makes Claude. Set the standard for agents that do real work.", href: "/store" },
                { name: "OpenAI", desc: "ChatGPT and the GPT models. The name most people know.", href: "/store" },
                { name: "Google DeepMind", desc: "Gemini. Pushing agent-to-agent protocols.", href: "/store" },
                { name: "Salesforce Agentforce", desc: "Agents for big companies, at scale.", href: "/store" },
              ]
            },
            {
              tier: "THE SCRAPPY INDIE LAYER",
              color: "text-orange-400",
              borderColor: "border-orange-500/20",
              players: [
                { name: "Polsia", desc: "Run an AI company for the price of a Netflix subscription.", href: "/companies" },
                { name: "OpenClaw", desc: "Open-source personal agent you talk to from WhatsApp or Telegram.", href: "/store" },
                { name: "Paperclip", desc: "Org charts for AI agents. Teams of agents, not one.", href: "/store" },
                { name: "You", desc: "Zero code required. Zero employees possible.", href: "/store" },
              ]
            }
          ].map(section => (
            <div key={section.tier} className={`bg-zinc-900 border ${section.borderColor} rounded-xl p-5`}>
              <div className={`text-xs font-bold ${section.color} mb-4 tracking-wider`}>{section.tier}</div>
              <div className="space-y-3">
                {section.players.map(player => (
                  <a key={player.name} href={player.href} className="flex items-start gap-3 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 shrink-0 group-hover:bg-orange-400 transition-colors"></div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors">{player.name}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{player.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GUIDES CTA */}
      <section className="px-6 pb-12 max-w-6xl mx-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xs text-orange-400 font-medium mb-2 tracking-wider">WTF AGENTS GUIDES</div>
              <h2 className="text-xl font-bold text-white mb-2">New to this? Start here.</h2>
              <p className="text-zinc-400 text-sm max-w-md">
                {GUIDE_COUNT} plain English guides. What an AI agent is, how LLMs work, who Anthropic are, what OpenClaw does, and how to deploy your first agent this week.
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <a href="/store" className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-all text-center">
                Browse all {GUIDE_COUNT} guides →
              </a>
              <p className="text-xs text-zinc-600 text-center">From ${MIN_GUIDE_PRICE} · Instant PDF download</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
            {GUIDES.slice(0, 8).map(guide => (
              <a key={guide.slug} href="/store" className="text-xs text-zinc-500 hover:text-orange-400 transition-colors py-1 border-b border-zinc-800 hover:border-orange-500/30">
                {guide.title} →
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT COMPANIES */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Recently Indexed</h2>
          </div>
          <a href="/companies" className="text-xs text-orange-400 hover:text-orange-300 transition-colors border border-orange-500/20 hover:border-orange-500/40 px-3 py-1.5 rounded-lg">
            View all{totalCompanies === null ? "" : ` ${totalCompanies.toLocaleString()}`} →
          </a>
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
            {companies.map((company, idx) => (
              <a key={company.id} href={`/go/company/${company.id}`} target="_blank" rel="noopener noreferrer"
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-all hover:bg-zinc-800/50 group">
                <div className="flex items-start justify-between mb-3 gap-2">
                  <div>
                    {totalCompanies !== null && <div className="text-xs text-zinc-600 mb-0.5">#{String(totalCompanies - idx).padStart(4, '0')}</div>}
                    <span className="font-semibold text-white group-hover:text-orange-300 transition-colors">{company.name}</span>
                  </div>
                  <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded-full shrink-0">{company.category}</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">{company.description}</p>
              </a>
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-zinc-800 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-600">
            WTF Agents — the index of the autonomous company economy
          </div>
          <div className="flex items-center gap-6 text-xs text-zinc-600">
            <a href="/companies" className="hover:text-orange-400 transition-colors">Companies</a>
            <a href="/store" className="hover:text-orange-400 transition-colors">Guides</a>
            <a href="/tools" className="hover:text-orange-400 transition-colors">Tools</a>
            <a href="/jobs" className="hover:text-orange-400 transition-colors">Jobs</a>
            <a href="/submit" className="hover:text-orange-400 transition-colors">Submit</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
