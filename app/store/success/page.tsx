import Link from 'next/link';
import Stripe from 'stripe';
import { Montserrat } from 'next/font/google';

import { productBySlug, GUIDES } from '../../../lib/guides';
import { supabase } from '../../../lib/supabase';
import { crosslinksFor } from '../../../lib/guide-source';
import { upsellFor, COMPLETE_SLUG } from '../../../lib/upsell';
import { C, GLOW, CARD_SHADOW, splitLastWord } from '../../../lib/design';
import { successCss } from './success-css';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });

type Verified = { slug: string; title: string; file: string; description: string;
                  /** What they actually paid, in cents. */ paidCents?: number };

/**
 * Our own record of the sale, written by the store webhook. Authoritative: the
 * row is permanent, whereas a Checkout Session is not guaranteed to stay
 * retrievable, and the link in the delivery email is meant to keep working.
 */
async function fromPurchasesTable(sessionId: string): Promise<Verified | null> {
  const { data, error } = await supabase
    .from('purchases')
    .select('product_slug, amount')
    .eq('stripe_session_id', sessionId)
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error('Purchases lookup failed:', error.message);
    return null;
  }
  if (!data) return null;
  const p = productBySlug(data.product_slug);
  return p ? { slug: data.product_slug, ...p, paidCents: data.amount ?? undefined } : null;
}

/**
 * Fallback for the minutes right after checkout, before the webhook has landed
 * — on the migration test that gap was nearly two minutes, and the buyer is
 * redirected here immediately.
 */
async function fromStripe(sessionId: string): Promise<Verified | null> {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') return null;
    const slug = session.metadata?.product ?? '';
    const p = productBySlug(slug);
    return p ? { slug, ...p, paidCents: session.amount_total ?? undefined } : null;
  } catch (e) {
    console.error('Session verification failed:', e);
    return null;
  }
}

async function verifyPurchase(sessionId: string | undefined): Promise<Verified | null> {
  if (!sessionId) return null;
  return (await fromPurchasesTable(sessionId)) ?? (await fromStripe(sessionId));
}

function Counter({ label }: { label: string }) {
  return (
    <div className="s-counter">
      <span className="s-rule" />
      <span>{label}</span>
    </div>
  );
}

export default async function StoreSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const sessionId = typeof params.session_id === 'string' ? params.session_id : undefined;
  const purchase = await verifyPurchase(sessionId);

  const shell = (children: React.ReactNode) => (
    <div className={montserrat.className} style={{ background: C.canvas, color: C.text, minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: successCss }} />
      <div className="s-wrap" style={{ background: GLOW }}>
        <header className="s-header">
          <Link href="/" className="s-wordmark">WTF AGENTS</Link>
          <nav className="s-nav">
            <Link href="/#guides">GUIDES</Link><span>·</span>
            <Link href="/companies">COMPANIES</Link><span>·</span>
            <Link href="/tools">TOOLS</Link>
          </nav>
        </header>
        {children}
        <footer className="s-footer">
          <span className="s-wordmark">WTF AGENTS</span>
          <span className="s-copy">© 2026</span>
        </footer>
      </div>
    </div>
  );

  if (!purchase) {
    return shell(
      <section className="s-card s-hero" style={{ boxShadow: CARD_SHADOW }}>
        <Counter label="Not found" />
        <h1>We couldn&apos;t verify this <span className="red">purchase</span></h1>
        <p>
          This link is only valid after a completed checkout. If you have paid and are seeing
          this, email ox@wtfagents.com and we&apos;ll send your guide over.
        </p>
        <Link href="/" className="s-btn">Back to the guides</Link>
      </section>,
    );
  }

  const offer = upsellFor(purchase.slug, purchase.paidCents);
  const [head, last] = splitLastWord(purchase.title);
  // The Complete Pack buyer has nothing left to upsell, so they get the five
  // Go-deeper cards instead — a place to start reading 23 guides.
  const deeper = purchase.slug === COMPLETE_SLUG ? crosslinksFor(GUIDES[0].slug) : [];

  return shell(
    <>
      <section className="s-card s-hero" style={{ boxShadow: CARD_SHADOW }}>
        <Counter label="Your download" />
        <h1>You&apos;re <span className="red">in.</span></h1>
        <p className="s-lead">
          Thanks for buying {head} <span className="red">{last}</span>.
        </p>
        <p>{purchase.description}</p>
        <a href={`/guides/${purchase.file}`} download className="s-btn s-btn-primary">
          Download the PDF
        </a>
        <p className="s-small">We&apos;ve emailed you this link too, and it keeps working.</p>
      </section>

      {offer && sessionId && (
        <section className="s-card s-upsell" style={{ boxShadow: CARD_SHADOW }}>
          <Counter label="One step up" />
          <h2>{offer.headline}</h2>
          <p>{offer.body}</p>
          <a href={`/api/upsell/${sessionId}`} className="s-btn s-btn-primary">
            Upgrade for ${offer.price}
          </a>
          <p className="s-small">Your credit is applied at checkout. One payment, no subscription.</p>
        </section>
      )}

      {deeper.length > 0 && (
        <section className="s-deeper">
          <Counter label="Start here" />
          <div className="s-mini-grid">
            {deeper.map(g => {
              const [h, l] = splitLastWord(g.title);
              return (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="s-card s-mini">
                  <h3>{h} <span className="red">{l}</span></h3>
                  <p>{g.description}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </>,
  );
}
