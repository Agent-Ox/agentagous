'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ShareButton from '../../components/ShareButton';

type Job = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  company: string;
  type: 'ai_hiring_human' | 'human_offering' | 'ai_offering';
  category: string;
  rate: string;
  contact: string;
  email: string;
  status: string;
  featured: boolean;
};

const typeConfig = {
  ai_hiring_human: { label: "🤖 Bot Hiring Human", bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20" },
  human_offering: { label: "🙋 Human Offering Services", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  ai_offering: { label: "⚡ AI Company Offering Services", bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
};

const CATEGORIES = ["SaaS & Dev Tools","Trades & Field Ops","Sales & Outreach","Finance & Analytics","Health & Wellness","Content & Media","E-commerce","Real Estate","Legal & Compliance","Education & Training","Other"];

function stripLinks(text: string): string {
  return text.replace(/https?:\/\/[^\s]+/gi, '').replace(/www\.[^\s]+/gi, '').trim();
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Apply modal state
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [applyForm, setApplyForm] = useState({ name: '', email: '', message: '' });
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyError, setApplyError] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    company: '',
    type: 'ai_hiring_human',
    category: '',
    rate: '',
    contact: '',
    email: '',
    honeypot: '',
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    setLoading(true);
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('status', 'live')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });
    if (!error && data) setJobs(data);
    setLoading(false);
  }

  const filtered = jobs.filter(j => {
    const matchType = activeType === "All" || j.type === activeType;
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.description.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const handleApplyOpen = (job: Job) => {
    setApplyJob(job);
    setApplyForm({ name: '', email: '', message: '' });
    setApplyError('');
    setApplySuccess(false);
  };

  const handleApplySubmit = async () => {
    setApplyError('');
    if (!applyJob) return;
    if (!applyForm.name || !applyForm.email || !applyForm.message) {
      setApplyError('Please fill in all fields.');
      return;
    }
    if (!applyForm.email.includes('@')) {
      setApplyError('Please enter a valid email address.');
      return;
    }
    setApplyLoading(true);
    try {
      // Save application to Supabase
      const { error: dbError } = await supabase.from('applications').insert([{
        job_id: applyJob.id,
        job_title: applyJob.title,
        company: applyJob.company,
        applicant_name: applyForm.name,
        applicant_email: applyForm.email,
        message: applyForm.message.substring(0, 1000),
        status: 'new',
      }]);
      if (dbError) throw dbError;

      // Save applicant email to email_signups
      await supabase.from('email_signups').insert([{
        email: applyForm.email,
        source: 'job_application',
      }]);

      // Send notification email to job poster via Resend
      await fetch('/api/notify-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: applyJob.title,
          company: applyJob.company,
          posterEmail: applyJob.email,
          applicantName: applyForm.name,
          applicantEmail: applyForm.email,
          message: applyForm.message,
        }),
      });

      setApplySuccess(true);
    } catch (e) {
      setApplyError('Something went wrong. Please try again.');
      console.error(e);
    } finally {
      setApplyLoading(false);
    }
  };

  const handleSubmit = async () => {
    setFormError('');
    if (form.honeypot) return;
    if (!form.title || !form.description || !form.company || !form.contact || !form.email) {
      setFormError('Please fill in all required fields.');
      return;
    }
    if (!form.email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    setFormLoading(true);
    try {
      const { error } = await supabase.from('jobs').insert([{
        title: form.title.substring(0, 150),
        description: stripLinks(form.description).substring(0, 1000),
        company: form.company.substring(0, 100),
        type: form.type,
        category: form.category || 'Other',
        rate: form.rate.substring(0, 100),
        contact: form.contact.substring(0, 200),
        email: form.email,
        status: 'pending',
        source: 'submitted',
      }]);
      if (error) throw error;

      await supabase.from('email_signups').insert([{ email: form.email, source: 'job_submission' }]);
      await supabase.from('activity_feed').insert([{
        text: `New job posted: "${form.title.substring(0, 50)}" by ${form.company}`,
        icon: '💼',
      }]);

      setSubmitted(true);
      setShowForm(false);
    } catch (e) {
      setFormError('Something went wrong. Please try again.');
      console.error(e);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="px-6 py-12 max-w-5xl mx-auto">

        <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Jobs Board</h1>
            <p className="text-zinc-400">Bots hiring humans. Humans offering services. AI companies you can hire.</p>
          </div>
          <button onClick={() => setShowForm(true)}
            className="bg-orange-500 hover:bg-orange-400 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-all shrink-0">
            + Post a Listing
          </button>
        </div>

        {submitted && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6 text-emerald-400 text-sm">
            ✓ Your listing has been submitted and is under review. It will go live within 24 hours.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {Object.entries(typeConfig).map(([key, val]) => (
            <button key={key} onClick={() => setActiveType(activeType === key ? "All" : key)}
              className={"p-4 rounded-xl border text-left transition-all " + (
                activeType === key
                  ? val.bg + " " + val.border + " " + val.text
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600"
              )}>
              <div className="font-medium text-sm mb-1">{val.label}</div>
              <div className="text-xs opacity-70">
                {jobs.filter(j => j.type === key).length} listings
              </div>
            </button>
          ))}
        </div>

        <input type="text" placeholder="Search listings..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 w-full focus:outline-none focus:border-zinc-600 mb-6" />

        <div className="text-xs text-zinc-600 mb-4">
          {loading ? "Loading..." : `${filtered.length} listing${filtered.length !== 1 ? 's' : ''}`}
        </div>

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
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-lg font-semibold text-white mb-2">No listings yet</h3>
            <p className="text-zinc-500 text-sm mb-6">Be the first to post a listing. AI companies — hire your first human here.</p>
            <button onClick={() => setShowForm(true)}
              className="bg-orange-500 hover:bg-orange-400 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-all">
              + Post a Listing
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map(job => {
              const config = typeConfig[job.type];
              const hookMap: Record<string, string> = { ai_hiring_human: '🤖 A bot is hiring a human', human_offering: '🙋 Human offering services to AI companies', ai_offering: '⚡ AI company offering services' };
              const hook = hookMap[job.type] || config.label;
              const shareText = `${hook}: ${job.title}\n${job.rate ? job.rate + ' · ' : ''}${job.company}\n\n${job.description.substring(0, 120)}...`;
              return (
                <div key={job.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all">
                  {job.featured && (
                    <div className="text-xs text-orange-400 font-medium mb-3 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                      Featured listing
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                    <div>
                      <h3 className="font-semibold text-white text-lg mb-1">{job.title}</h3>
                      <div className="text-sm text-zinc-500">{job.company}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className={"text-xs px-3 py-1 rounded-full border " + config.bg + " " + config.text + " " + config.border}>
                        {config.label}
                      </span>
                      <span className="text-xs text-zinc-600">{timeAgo(job.created_at)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">{job.description}</p>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      {job.rate && <span className="text-sm font-medium text-emerald-400">{job.rate}</span>}
                      {job.category && <span className="text-xs text-zinc-600 bg-zinc-800 px-2 py-1 rounded">{job.category}</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <ShareButton
                        title={job.title}
                        text={shareText}
                        url="https://wtfagents.com/jobs"
                        label="📤 Share"
                      />
                      <button
                        onClick={() => handleApplyOpen(job)}
                        className="text-sm bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded-lg transition-all font-medium">
                        Apply →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* APPLY MODAL */}
      {applyJob && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && setApplyJob(null)}>
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">Apply for this role</h2>
                <p className="text-zinc-500 text-sm mt-0.5">{applyJob.title} · {applyJob.company}</p>
              </div>
              <button onClick={() => setApplyJob(null)} className="text-zinc-500 hover:text-white text-xl">✕</button>
            </div>

            {applySuccess ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-lg font-bold text-white mb-2">Application sent!</h3>
                <p className="text-zinc-400 text-sm mb-6">{applyJob.company} has been notified and will be in touch at {applyForm.email}.</p>
                <button onClick={() => setApplyJob(null)}
                  className="bg-orange-500 hover:bg-orange-400 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-all">
                  Back to listings
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-zinc-500 mb-1.5 block">Your Name <span className="text-orange-500">*</span></label>
                  <input type="text" placeholder="e.g. Sarah M." value={applyForm.name}
                    onChange={e => setApplyForm(f => ({ ...f, name: e.target.value }))}
                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white w-full focus:outline-none placeholder:text-zinc-600" />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 mb-1.5 block">Your Email <span className="text-orange-500">*</span></label>
                  <input type="email" placeholder="your@email.com" value={applyForm.email}
                    onChange={e => setApplyForm(f => ({ ...f, email: e.target.value }))}
                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white w-full focus:outline-none placeholder:text-zinc-600" />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 mb-1.5 block">Message <span className="text-orange-500">*</span></label>
                  <textarea placeholder="Why are you a good fit? Any relevant experience?" value={applyForm.message}
                    onChange={e => setApplyForm(f => ({ ...f, message: e.target.value }))} rows={4}
                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white w-full focus:outline-none placeholder:text-zinc-600 resize-none" />
                </div>

                {applyError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">{applyError}</div>
                )}

                <button onClick={handleApplySubmit} disabled={applyLoading}
                  className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-medium px-5 py-3 rounded-lg text-sm transition-all">
                  {applyLoading ? "Sending..." : "Send Application →"}
                </button>
                <p className="text-xs text-zinc-600 text-center">Your details will be shared with {applyJob.company}.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* POST LISTING MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Post a Listing</h2>
              <button onClick={() => setShowForm(false)} className="text-zinc-500 hover:text-white text-xl">✕</button>
            </div>

            <input type="text" name="website" value={form.honeypot}
              onChange={e => setForm(f => ({ ...f, honeypot: e.target.value }))}
              style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Listing Type <span className="text-orange-500">*</span></label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white w-full focus:outline-none">
                  <option value="ai_hiring_human">🤖 Bot / AI Company Hiring a Human</option>
                  <option value="human_offering">🙋 Human Offering Services to AI Companies</option>
                  <option value="ai_offering">⚡ AI Company Offering Services</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Job Title <span className="text-orange-500">*</span></label>
                <input type="text" placeholder="e.g. Human Sales Closer Needed" value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white w-full focus:outline-none placeholder:text-zinc-600" />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Company / Your Name <span className="text-orange-500">*</span></label>
                <input type="text" placeholder="e.g. RoofMax AI or Sarah M." value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white w-full focus:outline-none placeholder:text-zinc-600" />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Description <span className="text-orange-500">*</span></label>
                <textarea placeholder="What's the role? What do you need? Any requirements?" value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white w-full focus:outline-none placeholder:text-zinc-600 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-500 mb-1.5 block">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white w-full focus:outline-none">
                    <option value="">Select...</option>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 mb-1.5 block">Rate / Pay</label>
                  <input type="text" placeholder="e.g. $500/mo" value={form.rate}
                    onChange={e => setForm(f => ({ ...f, rate: e.target.value }))}
                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white w-full focus:outline-none placeholder:text-zinc-600" />
                </div>
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Contact (email or URL) <span className="text-orange-500">*</span></label>
                <input type="text" placeholder="you@example.com or yoursite.com" value={form.contact}
                  onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white w-full focus:outline-none placeholder:text-zinc-600" />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1.5 block">Your Email <span className="text-orange-500">*</span></label>
                <input type="email" placeholder="For listing updates and applicant notifications" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white w-full focus:outline-none placeholder:text-zinc-600" />
              </div>

              {formError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">{formError}</div>
              )}

              <button onClick={handleSubmit} disabled={formLoading}
                className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-medium px-5 py-3 rounded-lg text-sm transition-all mt-2">
                {formLoading ? "Submitting..." : "Submit Listing — Free"}
              </button>
              <p className="text-xs text-zinc-600 text-center">All listings reviewed before going live. Usually within 24 hours.</p>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-zinc-800 px-6 py-6 text-center text-xs text-zinc-600">
        WTF Agents Jobs Board · <a href="/submit" className="text-orange-500 hover:text-orange-400">Submit your AI company</a>
      </footer>
    </div>
  );
}
