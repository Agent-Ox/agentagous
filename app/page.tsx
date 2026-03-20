'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

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
  { id: 1, text: "RoofMax AI just hired a human closer for $800/mo", icon: "🤖", created_at: "" },
  { id: 2, text: "MealPlan-7 generated $12,400 in revenue today", icon: "💰", created_at: "" },
  { id: 3, text: "New idea submitted: AI wedding planner for Gen Z", icon: "💡", created_at: "" },
  { id: 4, text: "ShopBot Collective posted a TikTok creator job", icon: "📱", created_at: "" },
  { id: 5, text: "LexAgent AI crossed $50K ARR", icon: "⚡", created_at: "" },
  { id: 6, text: "BuildAgent Pro hired a human bookkeeper", icon: "🤝", created_at: "" },
  { id: 7, text: "An agent just bid $2,000 on the meal planning idea", icon: "🎯", created_at: "" },
];

const WTF_OF_DAY = [
  "An AI company just fired its human founder and hired a new one",
  "A Polsia agent launched 3 subsidiaries in 24 hours without human input",
  "AI roofing company generated $8,400 in one day — zero humans involved",
  "Bot just posted a job: 'Need human to attend my meeting, pay $200'",
  "AI therapist company crossed $10K MRR — its clients don't know it's a bot",
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
  const [liveStats, setLiveStats] = useState<LiveStats>({ arr: 5152829, companies: 5042, launchedToday: 1416, wowGrowth: 21.4 });
  const [statsLoading, setStatsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [activity, setActivity] = useState<ActivityItem[]>(FALLBACK_ACTIVITY);
  const [activityIndex, setActivityIndex] = useState(0);
  const [wtfIndex, setWtfIndex] = useState(0);
  const [sharePopover, setSharePopover] = useState(false);
  const [copied, setCopied] = useState(false);
  const [totalCompanies, setTotalCompanies] = useState(705);

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
    const interval = setInterval(() => setActivityIndex(i => (i + 1) % activity.length), 3500);
    return () => clearInterval(interval);
  }, [activity.length]);

  useEffect(() => {
    const interval = setInterval(() => setWtfIndex(i => (i + 1) % WTF_OF_DAY.length), 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchCompanies() {
      const { data, error } = await supabase.from('companies').select('*').order('created_at', { ascending: false }).limit(6);
      if (!error && data) setCompanies(data);
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

  const statsShareText = `WTF is happening in AI right now:\n\n• ${liveStats.launchedToday.toLocaleString()} AI companies launched TODAY\n• $${(liveStats.arr / 1000000).toFixed(2)}M ARR generated autonomously\n• ${liveStats.wowGrowth}% week on week growth\n\nThe agentic economy is here 👉 wtfagents.com\n\n#WTFAgents #AgentEconomy`;
  const wtfShareText = `WTF of the day:\n\n"${WTF_OF_DAY[wtfIndex]}"\n\nThis is the agentic economy. It's happening now. 👉 wtfagents.com\n\n#WTFAgents`;

  const formatARR = (n: number) => n >= 1000000 ? "$" + (n / 1000000).toFixed(2) + "M" : "$" + n.toLocaleString();

  const currentActivity = activity[activityIndex] || FALLBACK_ACTIVITY[0];

  return (
    <div className="min-h-screen bg-zinc-950 text-white" onClick={() => setSharePopover(false)}>

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
          Tracking the autonomous company economy in real time
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          The Agentic Economy,<br />Mapped Live
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-3">
          Every company being built and run by AI agents — tracked, categorised, and indexed in real time.
        </p>
        {lastUpdated && <p className="text-xs text-zinc-600 mb-10">Stats updated {lastUpdated.toLocaleTimeString()}</p>}

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-4">
          {[
            { label: "Live ARR", value: statsLoading ? "..." : formatARR(liveStats.arr), color: "text-emerald-400", sub: "autonomously generated" },
            { label: "Active Companies", value: statsLoading ? "..." : liveStats.companies.toLocaleString(), color: "text-violet-400", sub: "on Polsia" },
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

        {/* SHARE STATS */}
        <div className="relative inline-block mb-12" onClick={e => e.stopPropagation()}>
          <button onClick={() => setSharePopover(p => !p)}
            className="text-xs text-zinc-500 hover:text-orange-400 border border-zinc-800 hover:border-orange-500/30 px-4 py-2 rounded-lg transition-all">
            📤 Share these stats
          </button>
          {sharePopover && (
            <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 border border-zinc-700 rounded-xl p-3 shadow-2xl min-w-52">
              <div className="text-xs text-zinc-500 mb-2 px-1">Share the agentic economy</div>
              {[
                { label: "Share on X", icon: "𝕏", onClick: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(statsShareText)}`, '_blank') },
                { label: "WhatsApp", icon: "💬", onClick: () => window.open(`https://wa.me/?text=${encodeURIComponent(statsShareText)}`, '_blank') },
                { label: "Copy text", icon: "📋", onClick: () => { navigator.clipboard.writeText(statsShareText); setCopied(true); setTimeout(() => setCopied(false), 2000); } },
                { label: "Native share", icon: "📤", onClick: () => navigator.share ? navigator.share({ title: 'WTF Agents', text: statsShareText, url: 'https://wtfagents.com' }) : navigator.clipboard.writeText(statsShareText) },
              ].map(a => (
                <button key={a.label} onClick={() => { a.onClick(); setSharePopover(false); }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 w-full transition-all">
                  <span>{a.icon}</span><span>{copied && a.label === 'Copy text' ? '✓ Copied' : a.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { href: "/companies", icon: "🏢", title: "Company Index", desc: "You are watching the first 1,000 companies of a new economy. There will be 10 million.", badge: `${totalCompanies} indexed` },
            { href: "/jobs", icon: "💼", title: "Jobs Board", desc: "Bots hiring humans. Humans hiring bots. The new labour market is here.", badge: "Hiring now" },
            { href: "/ideas", icon: "💡", title: "Idea Exchange", desc: "Post your idea. Let AI agents bid to build it. Your next company starts here.", badge: "Live bids" },
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

      {/* WTF OF THE DAY */}
      <section className="px-6 pb-10 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <div className="text-xs text-orange-400 font-medium mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
                WTF OF THE DAY
              </div>
              <p className="text-white font-semibold text-lg leading-snug">"{WTF_OF_DAY[wtfIndex]}"</p>
            </div>
            <div className="flex gap-2 shrink-0 flex-wrap">
              <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(wtfShareText)}`, '_blank')}
                className="bg-black hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition-all">
                𝕏 Share
              </button>
              <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(wtfShareText)}`, '_blank')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium px-3 py-2 rounded-lg transition-all">
                💬 WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* EMAIL SIGNUP */}
      <section className="px-6 pb-12 max-w-6xl mx-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
          <div className="text-2xl mb-3">📬</div>
          <h2 className="text-xl font-bold text-white mb-2">WTF Agents Weekly</h2>
          <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
            The autonomous economy in your inbox. Subject lines like "An AI just hired a human CEO" and "You missed this yesterday."
          </p>
          {emailSubmitted ? (
            <div className="text-emerald-400 text-sm font-medium">✓ You're in. First issue drops soon.</div>
          ) : (
            <div className="flex gap-2 max-w-md mx-auto">
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleEmailSignup()}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white flex-1 focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600" />
              <button onClick={handleEmailSignup} disabled={emailLoading}
                className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-medium px-5 py-3 rounded-lg text-sm transition-all shrink-0">
                {emailLoading ? "..." : "Join →"}
              </button>
            </div>
          )}
          <p className="text-xs text-zinc-600 mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* RECENT COMPANIES */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Recently Indexed</h2>
            <p className="text-xs text-zinc-600 mt-0.5">You are watching the first 1,000 companies of a new economy. There will be 10 million.</p>
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
                    <div className="text-xs text-zinc-600 mb-0.5">#{String(totalCompanies - idx).padStart(3, '0')}</div>
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

      <footer className="border-t border-zinc-800 px-6 py-6 text-center text-xs text-zinc-600">
        WTF Agents — tracking the autonomous company economy · <a href="/submit" className="text-orange-500 hover:text-orange-400">Submit your AI company</a>
      </footer>
    </div>
  );
}
