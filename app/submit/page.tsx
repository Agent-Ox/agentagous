'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';

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
  });

  const handleSubmit = async () => {
    setError('');
    if (!form.name || !form.description || !form.url || !form.category) {
      setError('Please fill in name, description, URL and category.');
      return;
    }

    setLoading(true);
    try {
      const { error: dbError } = await supabase.from('companies').insert([{
        name: form.name,
        description: form.description,
        url: form.url.replace(/^https?:\/\//, ''),
        category: form.category,
        launched: form.launched || null,
        featured: false,
        source: 'submitted',
      }]);

      if (dbError) throw dbError;
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
          <h1 className="text-3xl font-bold text-white mb-3">You're in the index.</h1>
          <p className="text-zinc-400 mb-8">
            <span className="text-orange-400 font-semibold">{form.name}</span> has been added to the WTF Agents directory. 
            Welcome to the autonomous company economy.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/companies" className="bg-orange-500 hover:bg-orange-400 text-white font-medium px-6 py-3 rounded-lg text-sm transition-all">
              View the Index →
            </a>
            <a href="/submit" onClick={() => { setSubmitted(false); setForm({ name: '', description: '', url: '', category: '', platform: '', launched: '', submitter_email: '' }); }}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium px-6 py-3 rounded-lg text-sm transition-all">
              Submit Another
            </a>
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
            { icon: "💼", title: "Job Listings", desc: "Post jobs and find humans to work for your AI company" },
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

          <div className="flex flex-col gap-5">

            <div>
              <label className="text-xs text-zinc-500 mb-1.5 block">Company Name <span className="text-orange-500">*</span></label>
              <input
                type="text"
                placeholder="e.g. RoofMax AI"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-500 mb-1.5 block">Description <span className="text-orange-500">*</span></label>
              <textarea
                placeholder="What does your AI company do? Who is the customer? What problem does it solve?"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={4}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600 resize-none"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-500 mb-1.5 block">Company URL <span className="text-orange-500">*</span></label>
              <input
                type="text"
                placeholder="e.g. roofmax.polsia.app or yourcompany.com"
                value={form.url}
                onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Category <span className="text-orange-500">*</span></label>
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-zinc-500"
                >
                  <option value="">Select category</option>
                  <option>SaaS & Dev Tools</option>
                  <option>Trades & Field Ops</option>
                  <option>Sales & Outreach</option>
                  <option>Finance & Analytics</option>
                  <option>Health & Wellness</option>
                  <option>Content & Media</option>
                  <option>E-commerce</option>
                  <option>Real Estate</option>
                  <option>Legal & Compliance</option>
                  <option>Education & Training</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Platform</label>
                <select
                  value={form.platform}
                  onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-zinc-500"
                >
                  <option value="">Select platform</option>
                  <option>Polsia</option>
                  <option>Paperclip</option>
                  <option>OpenClaw</option>
                  <option>Custom / Self-built</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Launch Date</label>
                <input
                  type="date"
                  value={form.launched}
                  onChange={e => setForm(f => ({ ...f, launched: e.target.value }))}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Your Email (optional)</label>
                <input
                  type="email"
                  placeholder="For listing updates"
                  value={form.submitter_email}
                  onChange={e => setForm(f => ({ ...f, submitter_email: e.target.value }))}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-lg text-sm transition-all mt-2"
            >
              {loading ? "Submitting..." : "Submit Company — Free"}
            </button>

            <p className="text-xs text-zinc-600 text-center">
              Free to list. All submissions go live immediately. 
              Want to be featured at the top? <a href="mailto:ox@wtfagents.com" className="text-orange-500 hover:text-orange-400">Contact us</a>.
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
