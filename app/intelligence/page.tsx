'use client';

import { useState } from 'react';

const SAMPLE_INSIGHT = {
  week: "Week of March 17, 2026",
  headline: "Polsia crosses $5M ARR. Vertical dominance shifts to Trades.",
  stats: [
    { label: "Live ARR", value: "$5.15M", change: "+21%", color: "text-emerald-400" },
    { label: "Active Companies", value: "5,042", change: "+847 WoW", color: "text-violet-400" },
    { label: "Fastest Vertical", value: "Trades & Field Ops", change: "+34% WoW", color: "text-orange-400" },
    { label: "New Platforms", value: "2 detected", change: "Paperclip + fork", color: "text-blue-400" },
  ],
  topCompanies: [
    { name: "RoofMax AI", vertical: "Trades", growth: "+340% MoM", note: "Dominating roofing leads in TX and FL" },
    { name: "LexAgent Pro", vertical: "Legal", growth: "+280% MoM", note: "Contract review going viral on LinkedIn" },
    { name: "MealPlan-7", vertical: "Health", growth: "+210% MoM", note: "First AI nutrition company with human dietitian on retainer" },
    { name: "BuildAgent Pro", vertical: "Trades", growth: "+190% MoM", note: "Construction management — first to hire 3 humans" },
    { name: "ShopBot Collective", vertical: "E-commerce", growth: "+170% MoM", note: "UGC model proving out — 12 human creators contracted" },
  ],
};

export default function IntelligencePage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setError('');
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (e) {
      setError('Something went wrong. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const CheckoutForm = () => (
    <div className="max-w-md mx-auto">
      <div className="flex gap-2 mb-2">
        <input type="email" placeholder="your@email.com" value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCheckout()}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white flex-1 focus:outline-none focus:border-zinc-600 placeholder:text-zinc-600" />
        <button onClick={handleCheckout} disabled={loading}
          className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-medium px-5 py-3 rounded-lg text-sm transition-all shrink-0 whitespace-nowrap">
          {loading ? "..." : "Subscribe — $49/mo →"}
        </button>
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      <p className="text-xs text-zinc-600 mt-2 text-center">Cancel anytime. Powered by Stripe. First issue this Monday.</p>
      <p className="text-xs text-zinc-700 mt-1.5 text-center">
        Already a subscriber?{' '}
        <a href="/account" className="text-zinc-500 hover:text-zinc-300 underline underline-offset-2 transition-colors">
          Manage your subscription →
        </a>
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* HERO */}
      <section className="px-6 py-20 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 text-xs px-3 py-1.5 rounded-full border border-orange-500/20 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
          Weekly private briefing — launching now
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          WTF Agents<br />Intelligence
        </h1>

        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-4 leading-relaxed">
          The private weekly briefing on the agentic economy. What's growing, what's dying, what the data actually shows.
        </p>
        <p className="text-zinc-500 text-sm mb-10">
          For founders, VCs, researchers, and enterprise teams who need signal — not noise.
        </p>

        <div className="flex items-center justify-center gap-6 mb-10">
          <div className="text-center">
            <div className="text-4xl font-bold text-white">$49</div>
            <div className="text-sm text-zinc-500">per month</div>
          </div>
          <div className="text-zinc-700 text-2xl">·</div>
          <div className="text-center">
            <div className="text-xl font-semibold text-white">Every Monday</div>
            <div className="text-sm text-zinc-500">in your inbox</div>
          </div>
          <div className="text-zinc-700 text-2xl">·</div>
          <div className="text-center">
            <div className="text-xl font-semibold text-white">Cancel anytime</div>
            <div className="text-sm text-zinc-500">no lock-in</div>
          </div>
        </div>

        <CheckoutForm />
      </section>

      {/* WHAT YOU GET */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white text-center mb-10">What's inside every week</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {[
            { icon: "📊", title: "The Top 10", desc: "The 10 fastest growing AI companies this week — ranked by estimated ARR growth. Updated every Monday." },
            { icon: "🔥", title: "Vertical Report", desc: "Which sectors are exploding and which are cooling. Trades, SaaS, Health, Legal — where is the money going?" },
            { icon: "🔭", title: "Platform Watch", desc: "New agent platforms, tools, and infrastructure. What just launched. What just got funded. What to watch." },
            { icon: "🏢", title: "Deep Dive", desc: "One AI company in detail every week. How it operates. What it charges. How many humans it employs. What it earns." },
            { icon: "💡", title: "The Signal", desc: "The one trend, data point, or observation that matters most this week. The thing you won't find in TechCrunch." },
            { icon: "📈", title: "The Numbers", desc: "Live ARR, company count, growth rate, hiring data — the full picture behind the public stats." },
          ].map(f => (
            <div key={f.title} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex gap-4">
              <div className="text-2xl shrink-0">{f.icon}</div>
              <div>
                <div className="font-semibold text-white mb-1">{f.title}</div>
                <div className="text-sm text-zinc-400 leading-relaxed">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* SAMPLE ISSUE */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-16">
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-b border-zinc-800 px-6 py-4 flex items-center justify-between flex-wrap gap-2">
            <div>
              <div className="text-xs text-orange-400 font-medium mb-1">SAMPLE ISSUE — PREVIEW</div>
              <div className="font-bold text-white">{SAMPLE_INSIGHT.week}</div>
            </div>
            <div className="text-xs bg-zinc-800 text-zinc-500 px-3 py-1 rounded-full">Full issue for subscribers only</div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-6">{SAMPLE_INSIGHT.headline}</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {SAMPLE_INSIGHT.stats.map(s => (
                <div key={s.label} className="bg-zinc-800/50 rounded-xl p-3 text-center">
                  <div className={"text-xl font-bold " + s.color}>{s.value}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{s.label}</div>
                  <div className="text-xs text-zinc-600 mt-0.5">{s.change}</div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <div className="text-xs text-zinc-500 font-medium mb-3 uppercase tracking-wider">Top 5 This Week</div>
              <div className="flex flex-col gap-2">
                {SAMPLE_INSIGHT.topCompanies.map((c, i) => (
                  <div key={c.name} className="flex items-center gap-3 bg-zinc-800/30 rounded-lg px-4 py-3">
                    <div className="text-xs text-zinc-600 font-mono w-4">#{i + 1}</div>
                    <div className="font-medium text-white text-sm flex-1">{c.name}</div>
                    <div className="text-xs text-zinc-500 hidden md:block">{c.vertical}</div>
                    <div className="text-xs text-emerald-400 font-medium">{c.growth}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* BLURRED */}
            <div className="relative">
              <div className="blur-sm select-none pointer-events-none">
                <div className="text-xs text-zinc-500 font-medium mb-3 uppercase tracking-wider">This Week's Signal</div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  The data this week reveals something counterintuitive. While total company count grew 21% week on week, the top 10% of companies by ARR now account for 67% of total platform revenue — up from 54% just three weeks ago. This winner-take-most dynamic is accelerating faster than we projected. The implication for founders choosing verticals right now is significant. Trades and Field Ops is showing the strongest unit economics by far, with average ARR per company running 3.4x higher than the platform average. Legal and Compliance is emerging as the surprise vertical — three companies crossed $10K MRR quietly this week with no public announcement.
                </p>
                <div className="text-xs text-zinc-500 font-medium mb-3 uppercase tracking-wider">Deep Dive: RoofMax AI</div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  RoofMax AI launched 47 days ago on Polsia with a simple thesis: roofing leads are high-value, homeowners hate the process, and agents can handle everything except the final handshake. Here is how they built a $340K ARR run rate in six weeks with three humans and zero VC money...
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-zinc-950/80 to-zinc-950">
                <div className="text-center px-4">
                  <div className="text-lg font-bold text-white mb-2">Subscribe to read the full issue</div>
                  <div className="text-zinc-400 text-sm mb-6">$49/mo · Cancel anytime · Every Monday</div>
                  <CheckoutForm />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WHO IT'S FOR */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Who reads this</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: "🏗", title: "Founders building in the agentic space", desc: "Know which verticals have runway. Know who you're competing with before they know you exist." },
              { icon: "💰", title: "VCs and investors tracking the sector", desc: "Deal flow intelligence. Which companies are growing fast. Which platforms are winning." },
              { icon: "🏢", title: "Enterprise teams evaluating agent deployment", desc: "Real case studies. Real ROI data. Make the $500K decision with actual evidence." },
            ].map(w => (
              <div key={w.title} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">{w.icon}</div>
                <div className="font-semibold text-white mb-2 text-sm">{w.title}</div>
                <div className="text-xs text-zinc-500 leading-relaxed">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Get the intelligence edge</h2>
          <p className="text-zinc-400 text-sm mb-6">$49/mo. Every Monday. Cancel anytime.</p>
          <CheckoutForm />
        </div>
      </section>

      <footer className="border-t border-zinc-800 px-6 py-6 text-center text-xs text-zinc-600">
        WTF Agents Intelligence · <a href="/" className="text-orange-500 hover:text-orange-400">Back to the index</a>
      </footer>
    </div>
  );
}
