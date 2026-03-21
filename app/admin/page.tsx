'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

type Submission = {
  id: number;
  name: string;
  description: string;
  url: string;
  category: string;
  source: string;
  created_at: string;
  status?: string;
};

type Idea = {
  id: number;
  title: string;
  description: string;
  category: string;
  submitted_by: string;
  email: string;
  created_at: string;
  status: string;
  upvotes: number;
};

type EmailSignup = {
  id: number;
  email: string;
  source: string;
  created_at: string;
};

const ADMIN_PASSWORD = 'wtfagents2026';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<'companies' | 'ideas' | 'emails'>('companies');
  const [pending, setPending] = useState<Submission[]>([]);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [emails, setEmails] = useState<EmailSignup[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [stats, setStats] = useState({ companies: 0, ideas: 0, emails: 0 });

  useEffect(() => {
    const stored = sessionStorage.getItem('wtf_admin');
    if (stored === 'true') setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) fetchAll();
  }, [authed, tab]);

  async function fetchAll() {
    setLoading(true);
    try {
      if (tab === 'companies') {
        const { data } = await supabase.from('companies').select('*').eq('source', 'submitted').order('created_at', { ascending: false });
        setPending(data || []);
      }
      if (tab === 'ideas') {
        const { data } = await supabase.from('ideas').select('*').order('created_at', { ascending: false });
        setIdeas(data || []);
      }
      if (tab === 'emails') {
        const { data } = await supabase.from('email_signups').select('*').order('created_at', { ascending: false });
        setEmails(data || []);
      }
      // Stats
      const [{ count: c }, { count: i }, { count: e }] = await Promise.all([
        supabase.from('companies').select('*', { count: 'exact', head: true }),
        supabase.from('ideas').select('*', { count: 'exact', head: true }),
        supabase.from('email_signups').select('*', { count: 'exact', head: true }),
      ]);
      setStats({ companies: c || 0, ideas: i || 0, emails: e || 0 });
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function approveCompany(id: number) {
    setActionLoading(id);
    await supabase.from('companies').update({ source: 'submitted_approved' }).eq('id', id);
    setPending(p => p.filter(c => c.id !== id));
    setActionLoading(null);
  }

  async function rejectCompany(id: number) {
    setActionLoading(id);
    await supabase.from('companies').delete().eq('id', id);
    setPending(p => p.filter(c => c.id !== id));
    setActionLoading(null);
  }

  async function approveIdea(id: number) {
    setActionLoading(id);
    await supabase.from('ideas').update({ status: 'open' }).eq('id', id);
    setIdeas(prev => prev.map(i => i.id === id ? { ...i, status: 'open' } : i));
    setActionLoading(null);
  }

  async function rejectIdea(id: number) {
    setActionLoading(id);
    await supabase.from('ideas').delete().eq('id', id);
    setIdeas(prev => prev.filter(i => i.id !== id));
    setActionLoading(null);
  }

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      sessionStorage.setItem('wtf_admin', 'true');
    } else {
      alert('Wrong password');
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-sm text-center">
          <div className="text-3xl mb-4">🔐</div>
          <h1 className="text-xl font-bold mb-6">Admin Access</h1>
          <input type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none mb-3 placeholder:text-zinc-600" />
          <button onClick={handleLogin}
            className="bg-orange-500 hover:bg-orange-400 text-white font-medium px-6 py-3 rounded-lg text-sm transition-all w-full">
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="px-6 py-10 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">WTF Agents Admin</h1>
            <p className="text-zinc-500 text-sm">Moderation queue + data overview</p>
          </div>
          <button onClick={() => { sessionStorage.removeItem('wtf_admin'); setAuthed(false); }}
            className="text-xs text-zinc-600 hover:text-zinc-400 border border-zinc-800 px-3 py-1.5 rounded-lg">
            Logout
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Companies", value: stats.companies, color: "text-violet-400" },
            { label: "Total Ideas", value: stats.ideas, color: "text-orange-400" },
            { label: "Email Signups", value: stats.emails, color: "text-emerald-400" },
          ].map(s => (
            <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
              <div className={"text-3xl font-bold " + s.color}>{s.value}</div>
              <div className="text-xs text-zinc-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-6">
          {(['companies', 'ideas', 'emails'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={"text-sm px-4 py-2 rounded-lg border transition-all capitalize " + (tab === t ? 'bg-white text-black border-white font-medium' : 'text-zinc-400 border-zinc-800 hover:border-zinc-600')}>
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-zinc-600 text-sm py-10 text-center">Loading...</div>
        ) : (
          <>
            {/* COMPANIES TAB */}
            {tab === 'companies' && (
              <div>
                <div className="text-xs text-zinc-600 mb-4">{pending.length} submitted companies awaiting review</div>
                {pending.length === 0 && <div className="text-zinc-600 text-sm py-10 text-center">✓ All clear — no pending submissions</div>}
                <div className="flex flex-col gap-3">
                  {pending.map(c => (
                    <div key={c.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                      <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                        <div>
                          <div className="font-semibold text-white mb-0.5">{c.name}</div>
                          <div className="text-xs text-zinc-500">{c.url} · {c.category}</div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button onClick={() => approveCompany(c.id)} disabled={actionLoading === c.id}
                            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1.5 rounded-lg transition-all">
                            ✓ Approve
                          </button>
                          <button onClick={() => rejectCompany(c.id)} disabled={actionLoading === c.id}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs px-3 py-1.5 rounded-lg transition-all">
                            ✕ Reject
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-400">{c.description}</p>
                      <div className="text-xs text-zinc-700 mt-2">{new Date(c.created_at).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IDEAS TAB */}
            {tab === 'ideas' && (
              <div>
                <div className="text-xs text-zinc-600 mb-4">{ideas.length} total ideas</div>
                <div className="flex flex-col gap-3">
                  {ideas.map(idea => (
                    <div key={idea.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                      <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                        <div>
                          <div className="font-semibold text-white mb-0.5">{idea.title}</div>
                          <div className="text-xs text-zinc-500">{idea.submitted_by} · {idea.email} · {idea.upvotes} votes</div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={"text-xs px-2 py-1 rounded-full " + (idea.status === 'open' ? 'bg-emerald-500/10 text-emerald-400' : idea.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-blue-500/10 text-blue-400')}>
                            {idea.status}
                          </span>
                          {idea.status === 'pending' && (
                            <>
                              <button onClick={() => approveIdea(idea.id)} disabled={actionLoading === idea.id}
                                className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1.5 rounded-lg transition-all">
                                ✓ Approve
                              </button>
                              <button onClick={() => rejectIdea(idea.id)} disabled={actionLoading === idea.id}
                                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs px-3 py-1.5 rounded-lg transition-all">
                                ✕ Reject
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-zinc-400">{idea.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EMAILS TAB */}
            {tab === 'emails' && (
              <div>
                <div className="text-xs text-zinc-600 mb-4">{emails.length} email signups</div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left px-4 py-3 text-xs text-zinc-500 font-medium">Email</th>
                        <th className="text-left px-4 py-3 text-xs text-zinc-500 font-medium">Source</th>
                        <th className="text-left px-4 py-3 text-xs text-zinc-500 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emails.map(e => (
                        <tr key={e.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                          <td className="px-4 py-3 text-zinc-300">{e.email}</td>
                          <td className="px-4 py-3 text-zinc-500 text-xs">{e.source}</td>
                          <td className="px-4 py-3 text-zinc-600 text-xs">{new Date(e.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
