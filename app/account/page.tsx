'use client';

import { useState } from 'react';

export default function AccountPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  const handleManage = async () => {
    setError('');
    setNotFound(false);
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/customer-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.notFound) {
        setNotFound(true);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (e) {
      setError('Something went wrong. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">📊</div>
          <h1 className="text-2xl font-bold text-white mb-2">Manage Subscription</h1>
          <p className="text-zinc-400 text-sm">Enter your email to access your WTF Agents Intelligence account.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-zinc-500 mb-1.5 block">Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleManage()}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">{error}</div>
            )}

            {notFound && (
              <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-sm">
                <div className="text-white font-medium mb-1">No subscription found</div>
                <div className="text-zinc-400">We couldn't find an active subscription for that email.</div>
                <a href="/intelligence" className="text-orange-400 hover:text-orange-300 text-xs mt-2 block">
                  Subscribe to WTF Agents Intelligence →
                </a>
              </div>
            )}

            <button
              onClick={handleManage}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-medium px-5 py-3 rounded-lg text-sm transition-all"
            >
              {loading ? "Looking up your account..." : "Access My Account →"}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-zinc-600">
            You'll be redirected to a secure Stripe portal to view invoices, update your payment method, or cancel.
          </p>
        </div>

        <div className="mt-8 text-center">
          <a href="/intelligence" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            ← Back to Intelligence
          </a>
        </div>
      </div>
    </div>
  );
}
