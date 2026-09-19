'use client';

import { useState } from 'react';

/**
 * Starts a real Checkout Session for one slug — a guide or a bundle.
 *
 * /api/store-checkout requires an email, because the webhook uses it to record
 * the purchase and send the download link. So the button opens an inline email
 * field on first click rather than pretending it can jump straight to Stripe.
 * Same contract as the /store modal; only the presentation differs.
 */
export default function BuyButton({
  slug,
  className,
  children,
}: {
  slug: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function go() {
    if (!email || !email.includes('@')) {
      setError('Enter a valid email — your download link goes there.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/store-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, slug }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError(data.error || 'Could not start checkout.');
    } catch {
      setError('Could not start checkout.');
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
    );
  }

  return (
    <span className="g-buyform">
      <input
        type="email"
        autoFocus
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && go()}
        aria-label="Your email for the download link"
      />
      <button type="button" className={className} onClick={go} disabled={busy}>
        {busy ? 'Starting…' : 'Continue'}
      </button>
      {error && <span className="g-buyerr">{error}</span>}
    </span>
  );
}
