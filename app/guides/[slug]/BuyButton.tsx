'use client';

import { useState } from 'react';

/**
 * Starts a Checkout Session for one slug — a guide or a bundle — and sends the
 * buyer straight to Stripe.
 *
 * No email field: Stripe Checkout collects the address on its own page, and the
 * webhook reads it back from customer_details. One click from button to
 * payment.
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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function go() {
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/store-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else {
        setError(data.error || 'Could not start checkout.');
        setBusy(false);
      }
    } catch {
      setError('Could not start checkout.');
      setBusy(false);
    }
  }

  return (
    <>
      <button type="button" className={className} onClick={go} disabled={busy}>
        {busy ? 'Opening checkout…' : children}
      </button>
      {error && <span className="g-buyerr">{error}</span>}
    </>
  );
}
