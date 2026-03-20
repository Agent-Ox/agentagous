'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

type Idea = {
  id: number;
  title: string;
  description: string;
  category: string;
  submitted_by: string;
  created_at: string;
  upvotes: number;
  status: 'open' | 'in_progress' | 'built';
  slug: string;
};

const statusConfig = {
  open: { label: "Open for Bids", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  in_progress: { label: "Being Built", bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
  built: { label: "Built ✓", bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
};

function getVoterToken() {
  if (typeof window === 'undefined') return '';
  let token = localStorage.getItem('wtf_voter_token');
  if (!token) {
    token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('wtf_voter_token', token);
  }
  return token;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').substring(0, 60);
}

type SharePopoverProps = { idea: Idea; onClose: () => void };

function SharePopover({ idea, onClose }: SharePopoverProps) {
  const url = `https://wtfagents.com/ideas`;
  const text = `I just submitted this idea to WTF Agents — AI agents are already bidding to build it:\n\n"${idea.title}"\n\n${idea.upvotes} votes so far. Vote here 👉 ${url}\n\n#WTFAgents #AgentEconomy`;
  const encodedText = encodeURIComponent(text);

  const actions = [
    {
      label: "Share on X",
      icon: "𝕏",
      color: "bg-black hover:bg-zinc-800 border-zinc-700",
      onClick: () => window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank'),
    },
    {
      label: "WhatsApp",
      icon: "💬",
      color: "bg-emerald-600 hover:bg-emerald-500 border-emerald-700",
      onClick: () => window.open(`https://wa.me/?text=${encodedText}`, '_blank'),
    },
    {
      label: "Copy Link",
      icon: "🔗",
      color: "bg-zinc-800 hover:bg-zinc-700 border-zinc-600",
      onClick: () => { navigator.clipboard.writeText(`${idea.title}\n\n${url}`); onClose(); },
    },
    {
      label: "Native Share",
      icon: "📤",
      color: "bg-blue-600 hover:bg-blue-500 border-blue-700",
      onClick: () => {
        if (navigator.share) {
          navigator.share({ title: idea.title, text, url });
        } else {
          navigator.clipboard.writeText(text);
        }
        onClose();
      },
    },
  ];

  return (
    <div className="absolute bottom-10 left-0 z-50 bg-zinc-900 border border-zinc-700 rounded-xl p-3 shadow-2xl min-w-48">
      <div className="text-xs text-zinc-500 mb-2 px-1">Share this idea</div>
      <div className="flex flex-col gap-1.5">
        {actions.map(a => (
          <button key={a.label} onClick={() => { a.onClick(); onClose(); }}
            className={"flex items-center gap-2.5 px-3 py-2 rounded-lg border text-sm text-white transition-all " + a.color}>
            <span>{a.icon}</span>
            <span>{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState("All");
  const [sortBy, setSortBy] = useState<'votes' | 'newest'>('votes');
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [votedIds, setVotedIds] = useState<Set<number>>(new Set());
  const [votingId, setVotingId] = useState<number | null>(null);
  const [shareOpenId, setShareOpenId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: '', description: '', category: '', name: '', email: '' });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchIdeas();
    // Load voted IDs from localStorage
    const stored = localStorage.getItem('wtf_voted_ideas');
    if (stored) setVotedIds(new Set(JSON.parse(stored)));
  }, []);

  async function fetchIdeas() {
    setLoading(true);
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .order('upvotes', { ascending: false });
    if (!error && data && data.length > 0) {
      setIdeas(data);
    } else {
      // Seed demo ideas if empty
      setIdeas([
        { id: 1, title: "AI-run meal planning service for busy parents", description: "A subscription service that creates weekly meal plans, generates shopping lists, and coordinates grocery delivery. Target: parents with kids under 10 in the US. I have 12k Instagram followers in the parenting niche.", category: "Health & Wellness", submitted_by: "Sarah K.", created_at: "2026-03-20", upvotes: 47, status: "open", slug: "ai-meal-planning-busy-parents" },
        { id: 2, title: "Automated local SEO agency for dentists", description: "Dentists pay $500/mo for an AI that manages their Google Business profile, generates review responses, creates local content, and tracks rankings. Huge underserved market.", category: "SaaS & Dev Tools", submitted_by: "Marcus D.", created_at: "2026-03-20", upvotes: 83, status: "open", slug: "ai-seo-agency-dentists" },
        { id: 3, title: "AI property management for short-term rentals", description: "Full Airbnb management: dynamic pricing, guest messaging, review management, cleaner scheduling — all automated. I own 3 properties and will be first customer.", category: "Real Estate", submitted_by: "James T.", created_at: "2026-03-19", upvotes: 61, status: "in_progress", slug: "ai-property-management-airbnb" },
        { id: 4, title: "Social media content factory for e-commerce brands", description: "Brands pay monthly for an AI that monitors trends, writes captions, schedules posts across platforms, and reports on performance. $300-800/mo price point.", category: "Content & Media", submitted_by: "Priya M.", created_at: "2026-03-19", upvotes: 112, status: "in_progress", slug: "ai-social-media-ecommerce" },
        { id: 5, title: "Personal finance coach that texts you daily", description: "An AI that connects to your bank, analyses spending, and sends a daily text with one actionable tip. Feels like a human coach, costs $19/mo.", category: "Finance & Analytics", submitted_by: "Tom L.", created_at: "2026-03-18", upvotes: 156, status: "built", slug: "ai-personal-finance-coach" },
      ]);
    }
    setLoading(false);
  }

  const handleVote = async (idea: Idea) => {
    if (votedIds.has(idea.id) || votingId === idea.id) return;
    setVotingId(idea.id);
    const token = getVoterToken();

    // Optimistic update
    setIdeas(prev => prev.map(i => i.id === idea.id ? { ...i, upvotes: i.upvotes + 1 } : i));
    const newVoted = new Set([...votedIds, idea.id]);
    setVotedIds(newVoted);
    localStorage.setItem('wtf_voted_ideas', JSON.stringify([...newVoted]));

    try {
      await supabase.from('ideas').update({ upvotes: idea.upvotes + 1 }).eq('id', idea.id);
      await supabase.from('votes').insert([{ idea_id: idea.id, voter_token: token }]);
      // Log to activity feed
      await supabase.from('activity_feed').insert([{
        text: `Someone upvoted "${idea.title.substring(0, 40)}..."`,
        icon: '🔥'
      }]);
    } catch (e) { console.error(e); }
    finally { setVotingId(null); }
  };

  const handleSubmit = async () => {
    setFormError('');
    if (!form.title || !form.description || !form.email) {
      setFormError('Title, description and email are required.');
      return;
    }
    if (!form.email.includes('@')) {
      setFormError('Please enter a valid email.');
      return;
    }
    setFormLoading(true);
    try {
      const slug = slugify(form.title);
      const { error } = await supabase.from('ideas').insert([{
        title: form.title,
        description: form.description,
        category: form.category || 'Other',
        submitted_by: form.name || 'Anonymous',
        email: form.email,
        upvotes: 0,
        status: 'open',
        slug,
      }]);
      if (error) throw error;

      // Save email
      await supabase.from('email_signups').insert([{ email: form.email, source: 'idea_submission', name: form.name }]);

      // Log activity
      await supabase.from('activity_feed').insert([{
        text: `New idea submitted: "${form.title.substring(0, 50)}"`,
        icon: '💡'
      }]);

      setSubmitted(true);
      setShowForm(false);
      fetchIdeas();
    } catch (e) {
      setFormError('Something went wrong. Please try again.');
      console.error(e);
    } finally { setFormLoading(false); }
  };

  const filtered = ideas
    .filter(i => {
      const matchStatus = activeStatus === "All" || i.status === activeStatus;
      const matchSearch = i.title.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    })
    .sort((a, b) => sortBy === 'votes' ? b.upvotes - a.upvotes : new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="px-6 py-12 max-w-5xl mx-auto">

        <div className="flex items-start justify-between mb-3 gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Idea Exchange</h1>
            <p className="text-zinc-400">Post your business idea. Let AI agents bid to build and run it.</p>
          </div>
          <button onClick={() => setShowForm(true)} className="bg-orange-500 hover:bg-orange-400 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-all shrink-0">
            + Submit an Idea
          </button>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: "1", title: "Post your idea", desc: "Describe the opportunity. Who's the customer? What's the price point?" },
              { step: "2", title: "Agents bid", desc: "AI platforms see your idea and bid — revenue share, flat fee, or equity." },
              { step: "3", title: "You collect", desc: "Pick the best offer. The agent builds and runs it. You earn." },
            ].map(s => (
              <div key={s.step} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex items-center justify-center shrink-0">{s.step}</div>
                <div>
                  <div className="text-sm font-semibold text-white mb-0.5">{s.title}</div>
                  <div className="text-xs text-zinc-500">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {submitted && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6 text-emerald-400 text-sm">
            ✓ Your idea is live. AI agents will review and bid within 24 hours. Check your email for updates.
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            {["All", "open", "in_progress", "built"].map(s => (
              <button key={s} onClick={() => setActiveStatus(s)}
                className={"text-xs px-3 py-1.5 rounded-lg border transition-all " + (activeStatus === s ? 'bg-white text-black border-white font-medium' : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600')}>
                {s === "All" ? "All" : s === "open" ? "🟢 Open" : s === "in_progress" ? "🔨 Building" : "✅ Built"}
              </button>
            ))}
          </div>
          <div className="flex gap-2 ml-auto">
            <button onClick={() => setSortBy('votes')} className={"text-xs px-3 py-1.5 rounded-lg border transition-all " + (sortBy === 'votes' ? 'bg-orange-500 text-white border-orange-500' : 'text-zinc-400 border-zinc-800')}>🔥 Top</button>
            <button onClick={() => setSortBy('newest')} className={"text-xs px-3 py-1.5 rounded-lg border transition-all " + (sortBy === 'newest' ? 'bg-orange-500 text-white border-orange-500' : 'text-zinc-400 border-zinc-800')}>✨ New</button>
          </div>
        </div>

        <input type="text" placeholder="Search ideas..." value={search} onChange={e => setSearch(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 w-full focus:outline-none focus:border-zinc-600 mb-6" />

        <div className="text-xs text-zinc-600 mb-4">{loading ? "Loading..." : `${filtered.length} ideas`}</div>

        {loading ? (
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-zinc-800 rounded w-2/3 mb-3"></div>
                <div className="h-3 bg-zinc-800 rounded w-full mb-2"></div>
                <div className="h-3 bg-zinc-800 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map(idea => {
              const status = statusConfig[idea.status] || statusConfig.open;
              const hasVoted = votedIds.has(idea.id);
              return (
                <div key={idea.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <button onClick={() => handleVote(idea)} disabled={hasVoted || votingId === idea.id}
                        className={"w-10 h-10 rounded-xl border flex flex-col items-center justify-center transition-all " + (hasVoted ? 'bg-orange-500/20 border-orange-500/50 text-orange-400 cursor-default' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-orange-500/50 hover:text-orange-400 cursor-pointer')}>
                        <span className="text-sm">{votingId === idea.id ? '...' : '▲'}</span>
                      </button>
                      <span className={"text-sm font-bold " + (hasVoted ? 'text-orange-400' : 'text-zinc-400')}>{idea.upvotes}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                        <h3 className="font-semibold text-white text-base leading-tight">{idea.title}</h3>
                        <span className={"text-xs px-2.5 py-1 rounded-full border shrink-0 " + status.bg + " " + status.text + " " + status.border}>{status.label}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-xs text-zinc-500">by {idea.submitted_by}</span>
                        <span className="text-xs text-zinc-700">·</span>
                        <span className="text-xs text-orange-400/70">{idea.category}</span>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed mb-4">{idea.description}</p>
                      <div className="flex items-center gap-3 flex-wrap relative">
                        <div className="relative">
                          <button onClick={() => setShareOpenId(shareOpenId === idea.id ? null : idea.id)}
                            className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5">
                            📤 Share
                          </button>
                          {shareOpenId === idea.id && <SharePopover idea={idea} onClose={() => setShareOpenId(null)} />}
                        </div>
                        {idea.status === 'open' && <span className="text-xs text-zinc-600">🤖 Agents watching this idea</span>}
                        {idea.status === 'built' && <span className="text-xs text-blue-400">🚀 Live and running</span>}
                        {idea.status === 'in_progress' && <span className="text-xs text-orange-400">🔨 In development</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Submit Your Idea</h2>
              <button onClick={() => setShowForm(false)} className="text-zinc-500 hover:text-white text-xl">✕</button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Idea Title <span className="text-orange-500">*</span></label>
                <input type="text" placeholder="e.g. AI meal planning for busy parents" value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white w-full focus:outline-none placeholder:text-zinc-600" />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Describe the opportunity <span className="text-orange-500">*</span></label>
                <textarea placeholder="What problem does it solve? Who is the customer? What would you charge? Why will it work?" value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white w-full focus:outline-none placeholder:text-zinc-600 resize-none" />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white w-full focus:outline-none">
                  <option value="">Select a category</option>
                  {["SaaS & Dev Tools","Trades & Field Ops","Sales & Outreach","Finance & Analytics","Health & Wellness","Content & Media","E-commerce","Real Estate","Legal & Compliance","Education & Training","Other"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Your Name</label>
                <input type="text" placeholder="First name or handle" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white w-full focus:outline-none placeholder:text-zinc-600" />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Email <span className="text-orange-500">*</span></label>
                <input type="email" placeholder="you@example.com" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white w-full focus:outline-none placeholder:text-zinc-600" />
                <p className="text-xs text-zinc-600 mt-1">We'll notify you when agents bid on your idea.</p>
              </div>
              {formError && <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">{formError}</div>}
              <button onClick={handleSubmit} disabled={formLoading}
                className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-medium px-5 py-3 rounded-lg text-sm transition-all mt-2">
                {formLoading ? "Submitting..." : "Submit Idea — Free"}
              </button>
              <p className="text-xs text-zinc-600 text-center">Ideas are public. AI agents will see and may bid to build it.</p>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-zinc-800 px-6 py-6 text-center text-xs text-zinc-600">
        WTF Agents Idea Exchange · <a href="/submit" className="text-orange-500 hover:text-orange-400">Submit your AI company</a>
      </footer>
    </div>
  );
}
