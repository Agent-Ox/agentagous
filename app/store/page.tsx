'use client';

import { useState } from 'react';

const GUIDES = [
  { slug: 'agentic-economy', title: 'WTF is the Agentic Economy', description: 'The big picture. What is actually happening in AI right now, why it matters, and what comes next. Written for humans, not engineers.', price: 7, badge: '🌍 Start here', featured: true, category: 'foundation' },
  { slug: 'ai-agent', title: 'WTF is an AI Agent', description: 'Everyone is talking about agents. Nobody is explaining them properly. This guide does.', price: 7, badge: null, featured: false, category: 'foundation' },
  { slug: 'api', title: 'WTF is an API', description: 'The thing connecting everything in the agentic economy — explained simply, finally.', price: 7, badge: null, featured: false, category: 'foundation' },
  { slug: 'llm', title: 'WTF is an LLM', description: 'Large language models are the engine behind every AI company. Here\'s how they actually work.', price: 7, badge: null, featured: false, category: 'foundation' },
  { slug: 'polsia', title: 'WTF is Polsia', description: '$5.61M ARR. 5,000+ companies. One solo founder. The platform quietly building the agentic economy.', price: 7, badge: '🔥 Most popular', featured: true, category: 'platforms' },
  { slug: 'openclaw', title: 'WTF is OpenClaw', description: 'The open source alternative taking on Polsia. Self-hosted, community-driven, and growing fast.', price: 7, badge: null, featured: false, category: 'platforms' },
  { slug: 'paperclip', title: 'WTF is Paperclip', description: 'The newest platform in the agentic economy. Launched March 2026. ClipMart coming soon.', price: 7, badge: '🆕 New', featured: false, category: 'platforms' },
  { slug: 'anthropic', title: 'WTF is Anthropic', description: 'The company behind Claude — and arguably the most important AI lab you\'ve never properly understood.', price: 7, badge: null, featured: false, category: 'claude' },
  { slug: 'claude', title: 'WTF is Claude', description: 'The AI agent powering the agentic economy. What it is, what it can do, and why it matters.', price: 7, badge: null, featured: false, category: 'claude' },
  { slug: 'claude-code', title: 'WTF is Claude Code', description: 'How Claude Code is changing software development — and what it means if you\'re not a developer.', price: 7, badge: null, featured: false, category: 'claude' },
  { slug: 'cowork', title: 'WTF is Cowork', description: 'Claude Code was for developers. Cowork is for everyone else. The Anthropic product that wiped $285B off enterprise software stocks — and what it actually does.', price: 7, badge: '🆕 New', featured: true, category: 'claude' },
  { slug: 'hire-agent', title: 'How to Hire an AI Agent for Your Business', description: 'A practical, jargon-free guide for business owners who want to start using AI agents right now.', price: 7, badge: '💼 Practical', featured: false, category: 'practical' },
];

const BUNDLES = [
  { slug: 'starter-pack', title: 'The Agentic Economy Starter Pack', description: 'WTF is the Agentic Economy + WTF is an AI Agent + WTF is an API + WTF is an LLM + WTF is Polsia + WTF is OpenClaw.', price: 29, saves: 13, includes: 6 },
  { slug: 'claude-pack', title: 'The Claude & Anthropic Pack', description: 'WTF is Anthropic + WTF is Claude + WTF is Claude Code + WTF is Cowork. The complete guide to the AI lab changing everything.', price: 29, saves: 7, includes: 4 },
  { slug: 'complete-pack', title: 'The Complete WTF Agents Pack', description: 'All 12 guides. Everything. The full picture of the agentic economy, the platforms, the AI, and how to use it.', price: 49, saves: 35, includes: 12 },
];

type ModalState = { slug: string; title: string; price: number } | null;

export default function StorePage() {
  const [modal, setModal] = useState<ModalState>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const openModal = (slug: string, title: string, price: number) => {
    setModal({ slug, title, price });
    setError('');
  };

  const closeModal = () => {
    setModal(null);
    setError('');
  };

  const handleBuy = async () => {
    setError('');
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!modal) return;
    setLoading(true);
    try {
      const res = await fetch('/api/store-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, slug: modal.slug }),
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

  const categories = [
    { id: 'all', label: 'All guides' },
    { id: 'foundation', label: '🌍 Foundation' },
    { id: 'platforms', label: '🏗 Platforms' },
    { id: 'claude', label: '🤖 Claude & Anthropic' },
    { id: 'practical', label: '💼 Practical' },
  ];

  const filtered = activeCategory === 'all' ? GUIDES : GUIDES.filter(g => g.category === activeCategory);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="px-6 py-16 max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 text-xs px-3 py-1.5 rounded-full border border-orange-500/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
            Plain English guides to the agentic economy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            WTF is happening in AI?
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            No jargon. No hype. Just clear, honest guides to the platforms, tools, and companies reshaping everything. $7 each. Instant PDF download.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-lg font-bold text-white mb-4">Bundle & save</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BUNDLES.map(bundle => (
              <div key={bundle.slug} className="bg-gradient-to-b from-orange-500/10 to-zinc-900 border border-orange-500/20 rounded-2xl p-5 flex flex-col">
                <div className="flex items-start justify-between mb-3 gap-2">
                  <div className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">Save ${bundle.saves}</div>
                  <div className="text-xs text-zinc-500">{bundle.includes} guides</div>
                </div>
                <h3 className="font-bold text-white text-sm mb-2 leading-snug">{bundle.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4 flex-1">{bundle.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-2xl font-bold text-white">${bundle.price}</div>
                  <button onClick={() => openModal(bundle.slug, bundle.title, bundle.price)}
                    className="bg-orange-500 hover:bg-orange-400 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all">
                    Buy →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={"text-xs px-3 py-1.5 rounded-lg border transition-all " + (activeCategory === cat.id ? 'bg-white text-black border-white font-medium' : 'text-zinc-400 border-zinc-800 hover:border-zinc-600')}>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {filtered.map(guide => (
            <div key={guide.slug} className={`bg-zinc-900 border rounded-xl p-5 flex flex-col ${guide.featured ? 'border-orange-500/30' : 'border-zinc-800'}`}>
              <div className="flex items-start justify-between mb-2 gap-2">
                <h3 className="font-semibold text-white text-sm leading-snug">{guide.title}</h3>
                {guide.badge && <span className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-full shrink-0">{guide.badge}</span>}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4 flex-1">{guide.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="text-xl font-bold text-white">${guide.price}</div>
                <button onClick={() => openModal(guide.slug, guide.title, guide.price)}
                  className="bg-zinc-800 hover:bg-orange-500 text-zinc-300 hover:text-white font-medium px-4 py-2 rounded-lg text-sm transition-all border border-zinc-700 hover:border-orange-500">
                  Buy $7 →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-8 text-center">
          <div className="text-2xl mb-3">📊</div>
          <h2 className="text-xl font-bold text-white mb-2">Want ongoing intelligence?</h2>
          <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">The guides explain what's happening. The Intelligence newsletter tracks it every week — real data, real insight, every Monday.</p>
          <a href="/intelligence" className="bg-orange-500 hover:bg-orange-400 text-white font-medium px-6 py-3 rounded-lg text-sm transition-all inline-block">
            WTF Agents Intelligence — $49/mo →
          </a>
        </div>

      </section>

      {/* PURCHASE MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-base font-bold text-white leading-snug">{modal.title}</h2>
                <p className="text-zinc-500 text-sm mt-0.5">PDF guide · instant download</p>
              </div>
              <button onClick={closeModal} className="text-zinc-500 hover:text-white text-xl ml-4 shrink-0">✕</button>
            </div>

            <div className="mb-4">
              <label className="text-xs text-zinc-500 mb-1.5 block">Your email — we'll send your download link here</label>
              <input type="email" placeholder="your@email.com" value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleBuy()}
                autoFocus
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-orange-500 placeholder:text-zinc-600" />
            </div>

            {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

            <button onClick={handleBuy} disabled={loading}
              className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-all w-full mb-3">
              {loading ? '...' : `Pay $${modal.price} with Stripe →`}
            </button>

            <p className="text-xs text-zinc-600 text-center">Secure payment via Stripe. PDF delivered instantly after payment.</p>
          </div>
        </div>
      )}

      <footer className="border-t border-zinc-800 px-6 py-6 text-center text-xs text-zinc-600">
        WTF Agents · <a href="/" className="text-orange-500 hover:text-orange-400">Back to the index</a>
      </footer>
    </div>
  );
}
