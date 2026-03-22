'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const ALLOWED_PLATFORMS = ['polsia.app', 'paperclip.xyz', 'openclaw.ai', 'moltbook.com'];

function isSpamUrl(url: string): boolean {
  const lower = url.toLowerCase();
  // Allow known platforms
  if (ALLOWED_PLATFORMS.some(p => lower.includes(p))) return false;
  // Flag suspicious patterns
  const spamPatterns = [/\.(ru|cn|tk|ml|ga|cf|gq)$/, /bit\.ly/, /tinyurl/, /click\./];
  return spamPatterns.some(p => p.test(lower));
}

function stripLinks(text: string): string {
  return text.replace(/https?:\/\/[^\s]+/gi, '').replace(/www\.[^\s]+/gi, '').trim();
}

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    description: '',
    url: '',
    category: '',
    platform: '',
    launched: '',
    submitter_email: '',
    honeypot: '', // hidden field — bots fill this
  });

  const handleSubmit = async () => {
    setError('');

    // HONEYPOT CHECK — bots fill this field
    if (form.honeypot) return; // Silent reject

    if (!form.name || !form.description || !form.url || !form.category) {
      setError('Please fill in name, description, URL and category.');
      return;
    }

    // URL spam check
    if (isSpamUrl(form.url)) {
      setError('That URL does not look like a valid AI company. Please check and try again.');
      return;
    }

    // Strip links from description
    const cleanDescription = stripLinks(form.description);

    setLoading(true);
    try {
      const { error: dbError } = await supabase.from('companies').insert([{
        name: form.name.substring(0, 100),
        description: cleanDescription.substring(0, 500),
        url: form.url.replace(/^https?:\/\//, '').substring(0, 200),
        category: form.category,
        launched: form.launched || null,
        featured: false,
        source: 'submitted', // goes to moderation queue
      }]);

      if (dbError) throw dbError;

      // Save email if provided
      if (form.submitter_email && form.submitter_email.includes('@')) {
        await supabase.from('email_signups').insert([{
          email: form.submitter_email,
          source: 'company_submission',
        }]);
      }

      // Log activity
      await supabase.from('activity_feed').insert([{
        text: `New company submitted: "${form.name}" — pending review`,
        icon: '🏢',
      }]);

      setSubmitted(true);
    } catch (e) {
      setError('Something went wrong. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🚀</div>
          <h1 className="text-3xl font-bold text-white mb-3">Submitted!</h1>
          <p className="text-zinc-400 mb-8">
            <span className="text-orange-400 font-semibold">{form.name}</span> has been submitted for review. We'll add it to the WTF Agents index within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/companies" className="bg-orange-500 hover:bg-orange-400 text-white font-medium px-6 py-3 rounded-lg text-sm transition-all">
              View the Index →
            </a>
            <button onClick={() => { setSubmitted(false); setForm({ name: '', description: '', url: '', category: '', platform: '', launched: '', submitter_email: '', honeypot: '' }); }}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium px-6 py-3 rounded-lg text-sm transition-all">
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="px-6 py-12 max-w-2xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Submit Your AI Company</h1>
          <p className="text-zinc-400">Built or running a company on Polsia, Paperclip, OpenClaw, or any other agent platform? Get listed in the index.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {[
            { icon: "🌍", title: "Global Index", desc: "Visible to researchers, investors, and potential customers worldwide" },
            { icon: "🔍", title: "Searchable", desc: "Found by anyone searching for AI companies in your category" },
            { icon: "✓", title: "Reviewed", desc: "All listings are manually reviewed before going live" },
          ].map(f => (
            <div key={f.title} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="text-sm font-semibold text-white mb-1">{f.title}</div>
              <div className="text-xs text-zinc-500">{f.desc}</div>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-6">Company Details</h2>

          {/* HONEYPOT — hidden from humans */}
          <input
            type="text"
            name="website"
            value={form.honeypot}
            onChange={e => setForm(f => ({ ...f, honeypot: e.target.value }))}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="flex flex-col gap-5">
            <div>
              <label className="text-xs text-zinc-500 mb-1.5 block">Company Name <span className="text-orange-500">*</span></label>
              <input type="text" placeholder="e.g. RoofMax AI" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600" />
            </div>

            <div>
              <label className="text-xs text-zinc-500 mb-1.5 block">Description <span className="text-orange-500">*</span></label>
              <textarea placeholder="What does your AI company do? Who is the customer? What problem does it solve?" value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600 resize-none" />
              <p className="text-xs text-zinc-700 mt-1">Links in descriptions are automatically removed.</p>
            </div>

            <div>
              <label className="text-xs text-zinc-500 mb-1.5 block">Company URL <span className="text-orange-500">*</span></label>
              <input type="text" placeholder="e.g. roofmax.polsia.app or yourcompany.com" value={form.url}
                onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Category <span className="text-orange-500">*</span></label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-zinc-500">
                  <option value="">Select category</option>
                  {["SaaS & Dev Tools","Trades & Field Ops","Sales & Outreach","Finance & Analytics","Health & Wellness","Content & Media","E-commerce","Real Estate","Legal & Compliance","Education & Training","Other"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Platform</label>
                <select value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-zinc-500">
                  <option value="">Select platform</option>
                  <option>Polsia</option>
                  <option>Paperclip</option>
                  <option>OpenClaw</option>
                  <option>Custom / Self-built</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Launch Date</label>
                <input type="date" value={form.launched} onChange={e => setForm(f => ({ ...f, launched: e.target.value }))}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-zinc-500" />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Your Email</label>
                <input type="email" placeholder="For listing updates" value={form.submitter_email}
                  onChange={e => setForm(f => ({ ...f, submitter_email: e.target.value }))}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600" />
              </div>
            </div>

            {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">{error}</div>}

            <button onClick={handleSubmit} disabled={loading}
              className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-lg text-sm transition-all mt-2">
              {loading ? "Submitting..." : "Submit Company — Free"}
            </button>

            <p className="text-xs text-zinc-600 text-center">
              All submissions are reviewed before going live. Usually within 24 hours.{' '}
              <a href="mailto:ox@wtfagents.com" className="text-orange-500 hover:text-orange-400">Want to be featured?</a>
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 px-6 py-6 text-center text-xs text-zinc-600">
        WTF Agents — tracking the autonomous company economy · <a href="/companies" className="text-orange-500 hover:text-orange-400">Browse the index</a>
      </footer>
    </div>
  );
}
