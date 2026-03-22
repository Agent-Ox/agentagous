'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (sessionId) setVerified(true);
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">📊</div>
        <h1 className="text-3xl font-bold text-white mb-3">You're in.</h1>
        <p className="text-zinc-400 mb-3 leading-relaxed">
          Welcome to WTF Agents Intelligence. Your subscription is active.
        </p>
        <p className="text-zinc-500 text-sm mb-8">
          The first issue lands in your inbox this Monday. We'll also send you a confirmation email shortly.
        </p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-8 text-left">
          <div className="text-xs text-zinc-500 font-medium mb-3 uppercase tracking-wider">What happens next</div>
          {[
            { text: "✓ Your first issue arrives this Monday" },
            { text: "✓ Every Monday after that — in your inbox" },
            { text: "✓ Reply to any issue to reach us directly" },
          ].map(item => (
            <div key={item.text} className="text-sm text-zinc-300 mb-2">{item.text}</div>
          ))}
          <div className="text-sm text-zinc-300 mb-2">
            ✓{' '}
            <a href="/account" className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">
              Manage your subscription
            </a>
            {' '}— cancel, update payment, view invoices
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/" className="bg-orange-500 hover:bg-orange-400 text-white font-medium px-6 py-3 rounded-lg text-sm transition-all">
            Explore the Index →
          </a>
          <a href="/ideas" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium px-6 py-3 rounded-lg text-sm transition-all">
            Browse Ideas
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
