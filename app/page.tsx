'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import ShareButton from '../components/ShareButton';

type Company = {
  id: number;
  name: string;
  description: string;
  url: string;
  category: string;
  source: string;
};

type LiveStats = {
  arr: number;
  companies: number;
  launchedToday: number;
  wowGrowth: number;
};

type ActivityItem = {
  id: number;
  text: string;
  icon: string;
  created_at: string;
};

const FALLBACK_ACTIVITY = [
  { id: 1, text: "Klarna's AI agents now handle the work of 700 employees", icon: "🤖", created_at: "" },
  { id: 2, text: "Salesforce Agentforce hits 5,000+ enterprise customers", icon: "⚡", created_at: "" },
  { id: 3, text: "OpenClaw reaches 247,000 GitHub stars in 60 days", icon: "🔥", created_at: "" },
  { id: 4, text: "Anthropic raises $30B — largest AI fundraise in history", icon: "💰", created_at: "" },
  { id: 5, text: "Gartner: 40% of enterprise apps will have AI agents by end of 2026", icon: "📊", created_at: "" },
  { id: 6, text: "Moltbook acquired by Meta — AI social network sold in 40 days", icon: "🎯", created_at: "" },
  { id: 7, text: "Rentahuman.ai: AI agents now hiring humans for physical tasks", icon: "🤝", created_at: "" },
];

const REAL_FACTS = [
  { stat: "$5.25B → $52B+", label: "Agentic AI market: 2024 to 2030", source: "MarketsandMarkets" },
  { stat: "700 FTE", label: "Customer service roles replaced at Klarna by AI agents", source: "Klarna CEO, 2026" },
  { stat: "247K ⭐", label: "GitHub stars for OpenClaw in under 60 days", source: "GitHub, Feb 2026" },
  { stat: "$380B", label: "Anthropic valuation after $30B raise", source: "Feb 2026" },
  { stat: "40%", label: "Enterprise apps with AI agents by end of 2026", source: "Gartner" },
  { stat: "1,293+", label: "AI-run companies tracked live on WTF Agents", source: "Polsia API" },
];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [liveStats, setLiveStats] = useState<LiveStats>({ arr: 5152829, companies: 1293, launchedToday: 12, wowGrowth: 21.4 });
  const [statsLoading, setStatsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [activity, setActivity] = useState<ActivityItem[]>(FALLBACK_ACTIVITY);
  const [activityIndex, setActivityIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(1293);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('https://polsia.imrat.com/api/data');
      const data = await res.json();
      if (data.success && data.stats) {
        const s = data.stats;
        const arr = parseInt(s.arr_usd);
        const arr7d = parseInt(s.arr_7d_ago);
        const wow = arr7d > 0 ? ((arr - arr7d) / arr7d * 100) : 0;
        setLiveStats({ arr, companies: parseInt(s.companies), launchedToday: parseInt(s.companies_created_24h), wowGrowth: Math.round(wow * 10) / 10 });
        setLastUpdated(new Date());
      }
    } catch (e) { console.error(e); }
    finally { setStatsLoading(false); }
  }, []);

  const fetchActivity = useCallback(async () => {
    try {
      const { data } = await supabase.from('activity_feed').select('*').order('created_at', { ascending: false }).limit(20);
      if (data && data.length > 0) setActivity(data);
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    fetchStats();
    fetchActivity();
    const s = setInterval(fetchStats, 60000);
    const a = setInterval(fetchActivity, 30000);
    return () => { clearInterval(s); clearInterval(a); };
  }, [fetchStats, fetchActivity]);

  useEffect(() => {
    const interval = setInterval(() => setActivityIndex(i => (i + 1) % activity.length), 4000);
    return () => clearInterval(interval);
  }, [activity.length]);

  useEffect(() => {
    const interval = setInterval(() => setFactIndex(i => (i + 1) % REAL_FACTS.length), 5000);
    return () => clearInterval(interval);
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

  const handleEmailSignup = async () => {
    if (!email || !email.includes('@')) return;
    setEmailLoading(true);
    try {
      await supabase.from('email_signups').insert([{ email, source: 'homepage_banner' }]);
      setEmailSubmitted(true);
    } catch (e) { console.error(e); }
    finally { setEmailLoading(false); }
  };

  const formatARR = (n: number) => n >= 1000000 ? "$" + (n / 1000000).toFixed(2) + "M" : "$" + n.toLocaleString();
  const currentActivity = activity[activityIndex] || FALLBACK_ACTIVITY[0];
  const currentFact = REAL_FACTS[factIndex];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* LIVE TICKER */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-2 flex items-center gap-3">
        <span className="text-xs text-orange-400 font-medium shrink-0 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
          LIVE
        </span>
        <span className="text-xs text-zinc-300">{currentActivity.icon} {currentActivity.text}</span>
        {currentActivity.created_at && (
          <span className="text-xs text-zinc-600 shrink-0 ml-auto">{timeAgo(currentActivity.created_at)}</span>
        )}
      </div>

      {/* HERO */}
      <section className="px-6 py-16 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 text-xs px-3 py-1.5 rounded-full border border-orange-500/20 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></div>
          The autonomous company economy is here
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          WTF is the<br />Agentic Economy?
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-2">
          AI agents are building companies, replacing employees, hiring humans, and generating revenue — autonomously, 24/7. This is the intelligence platform tracking it all.
        </p>
        <p className="text-zinc-600 text-sm max-w-xl mx-auto mb-10">
          From Klarna replacing 700 staff to a solo founder running 1,300 companies — we track the real numbers, the real players, and what it means for you.
        </p>

        {/* LIVE POLSIA STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-3">
          {[
            { label: "Live ARR", value: statsLoading ? "..." : formatARR(liveStats.arr), color: "text-emerald-400", sub: "Polsia autonomous companies" },
            { label: "AI Companies", value: statsLoading ? "..." : liveStats.companies.toLocaleString(), color: "text-violet-400", sub: "tracked live" },
            { label: "Launched Today", value: statsLoading ? "..." : liveStats.launchedToday.toLocaleString(), color: "text-blue-400", sub: "new companies" },
            { label: "WoW Growth", value: statsLoading ? "..." : "+" + liveStats.wowGrowth + "%", color: "text-orange-400", sub: "week on week" },
          ].map(stat => (
            <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className={"text-2xl font-bold " + stat.color}>{stat.value}</div>
              <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              <div className="text-xs text-zinc-700 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
        {lastUpdated && <p className="text-xs text-zinc-600 mb-6">Polsia API · updated {lastUpdated.toLocaleTimeString()}</p>}

        {/* SHARE */}
        <div className="flex justify-center mb-12">
          <ShareButton
            title="The Agentic Economy is here"
            text={`The agentic economy right now:\n\n• ${liveStats.companies.toLocaleString()} AI companies running autonomously\n• ${formatARR(liveStats.arr)} ARR generated without humans\n• Klarna: 700 employees replaced by agents\n• Anthropic: $380B valuation\n• OpenClaw: 247K GitHub stars in 60 days\n\nWTF is happening → wtfagents.com`}
            url="https://wtfagents.com"
            label="📤 Share these stats"
          />
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { href: "/companies", icon: "🏢", title: "Company Index", desc: "1,293+ AI-run companies tracked live. The first directory of the autonomous company economy.", badge: `${totalCompanies} indexed` },
            { href: "/store", icon: "📖", title: "WTF Guides", desc: "11 plain English guides. Claude, Anthropic, OpenClaw, Polsia, agents, LLMs — all explained. From $7.", badge: "From $7" },
            { href: "/intelligence", icon: "📡", title: "Intelligence", desc: "Weekly briefing on the agentic economy. Real data, real companies, real insight. Every Monday.", badge: "$49/mo" },
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

      {/* REAL NUMBERS */}
      <section className="px-6 pb-10 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <div className="text-xs text-orange-400 font-medium mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
                THE REAL NUMBERS — verified, sourced, updated weekly
              </div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <p className="text-white font-bold text-3xl">{currentFact.stat}</p>
                <p className="text-zinc-300 font-medium text-lg leading-snug">{currentFact.label}</p>
              </div>
              <p className="text-xs text-zinc-600 mt-2">Source: {currentFact.source}</p>
            </div>
            <ShareButton
              title={currentFact.label}
              text={`${currentFact.stat} — ${currentFact.label}\n\nSource: ${currentFact.source}\n\nMore at wtfagents.com`}
              url="https://wtfagents.com"
              label="📤 Share"
            />
          </div>
          <div className="flex gap-1.5 mt-4">
            {REAL_FACTS.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === factIndex ? 'w-6 bg-orange-400' : 'w-1.5 bg-zinc-700'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* THE PLAYERS */}
      <section className="px-6 pb-12 max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">The Players — who is actually building this</h2>
          <p className="text-xs text-zinc-600 mt-0.5">From $380B labs to one-person scrappy startups. This is the real landscape.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              tier: "THE BIG BOYS",
              color: "text-violet-400",
              borderColor: "border-violet-500/20",
              players: [
                { name: "Anthropic", desc: "$380B · Built Claude, invented MCP, Constitutional AI", href: "/store" },
                { name: "OpenAI", desc: "$300B+ · ChatGPT, GPT-5.4, Codex, hired OpenClaw creator", href: "/store" },
                { name: "Google DeepMind", desc: "Gemini 3.1 Pro (80.6% SWE-bench), invented A2A protocol", href: "/store" },
                { name: "Salesforce Agentforce", desc: "5,000+ enterprise customers · bet the company on agents", href: "/store" },
              ]
            },
            {
              tier: "THE SCRAPPY INDIE LAYER",
              color: "text-orange-400",
              borderColor: "border-orange-500/20",
              players: [
                { name: "Polsia", desc: "1 founder · $50/mo · 1,293+ autonomous companies tracked live", href: "/companies" },
                { name: "OpenClaw", desc: "Open source · 247K GitHub stars · personal AI agent via messaging", href: "/store" },
                { name: "Paperclip", desc: "Multi-agent org charts · any agent, any runtime · ClipMart coming", href: "/store" },
                { name: "You", desc: "Zero code required. Zero employees possible. The tools are that good.", href: "/store" },
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
                11 plain English guides. What an AI agent is, how LLMs work, who Anthropic are, what OpenClaw does, and how to deploy your first agent this week.
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <a href="/store" className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-all text-center">
                Browse all 11 guides →
              </a>
              <p className="text-xs text-zinc-600 text-center">From $7 · Instant PDF download</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
            {[
              "WTF is an AI Agent",
              "WTF is Claude",
              "WTF is OpenClaw",
              "WTF is the Agentic Economy",
              "WTF is Polsia",
              "WTF is Anthropic",
              "WTF is an LLM",
              "How to Hire an AI Agent",
            ].map(guide => (
              <a key={guide} href="/store" className="text-xs text-zinc-500 hover:text-orange-400 transition-colors py-1 border-b border-zinc-800 hover:border-orange-500/30">
                {guide} →
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* INTELLIGENCE SIGNUP */}
      <section className="px-6 pb-12 max-w-6xl mx-auto">
        <div className="border border-zinc-800 rounded-2xl p-8 text-center relative overflow-hidden bg-zinc-900">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none"></div>
          <div className="relative">
            <div className="text-xs text-orange-400 font-medium mb-3 tracking-wider">WTF AGENTS INTELLIGENCE</div>
            <h2 className="text-2xl font-bold text-white mb-2">The weekly briefing on the agentic economy</h2>
            <p className="text-zinc-400 text-sm mb-2 max-w-lg mx-auto">
              Real data. Real companies. Real insight. Top fastest-growing AI companies, platform watch, deep dives, and the numbers that matter. Every Monday.
            </p>
            <p className="text-zinc-600 text-xs mb-6 max-w-md mx-auto">
              Written for founders and business owners — not engineers. Plain English. No hype.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
              <a href="/intelligence" className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-3 rounded-lg text-sm transition-all">
                Subscribe for $49/month →
              </a>
              <span className="text-xs text-zinc-600">Cancel anytime · First issue this Monday</span>
            </div>
            {emailSubmitted ? (
              <div className="text-emerald-400 text-sm font-medium">✓ You're in.</div>
            ) : (
              <div className="flex gap-2 max-w-sm mx-auto">
                <input type="email" placeholder="or drop your email for free updates"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleEmailSignup()}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white flex-1 focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600" />
                <button onClick={handleEmailSignup} disabled={emailLoading}
                  className="bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition-all shrink-0">
                  {emailLoading ? "..." : "→"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* RECENT COMPANIES */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Recently Indexed</h2>
            <p className="text-xs text-zinc-600 mt-0.5">The first 1,293 companies of a new economy. There will be 10 million.</p>
          </div>
          <a href="/companies" className="text-xs text-orange-400 hover:text-orange-300 transition-colors border border-orange-500/20 hover:border-orange-500/40 px-3 py-1.5 rounded-lg">
            View all {totalCompanies} →
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
              <a key={company.id} href={"https://" + company.url} target="_blank" rel="noopener noreferrer"
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-all hover:bg-zinc-800/50 group">
                <div className="flex items-start justify-between mb-3 gap-2">
                  <div>
                    <div className="text-xs text-zinc-600 mb-0.5">#{String(totalCompanies - idx).padStart(4, '0')}</div>
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
            WTF Agents — intelligence platform for the autonomous company economy
          </div>
          <div className="flex items-center gap-6 text-xs text-zinc-600">
            <a href="/companies" className="hover:text-orange-400 transition-colors">Companies</a>
            <a href="/store" className="hover:text-orange-400 transition-colors">Guides</a>
            <a href="/intelligence" className="hover:text-orange-400 transition-colors">Intelligence</a>
            <a href="/jobs" className="hover:text-orange-400 transition-colors">Jobs</a>
            <a href="/submit" className="hover:text-orange-400 transition-colors">Submit</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
