import Link from 'next/link';
import Stripe from 'stripe';
import { productBySlug } from '../../../lib/guides';
import { supabase } from '../../../lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' });

type VerifiedPurchase = { title: string; file: string; description: string };

/**
 * Our own record of the sale, written by the store webhook. This is the
 * authoritative source: the row is permanent, whereas a Stripe Checkout Session
 * is not guaranteed to stay retrievable forever, and the link in the delivery
 * email is meant to keep working indefinitely.
 */
async function fromPurchasesTable(sessionId: string): Promise<VerifiedPurchase | null> {
  const { data, error } = await supabase
    .from('purchases')
    .select('product_slug')
    .eq('stripe_session_id', sessionId)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Purchases lookup failed:', error.message);
    return null;
  }
  return data ? productBySlug(data.product_slug) ?? null : null;
}

/**
 * Fallback for the minutes right after checkout, before the webhook has landed.
 * That gap is real — on the migration test the session completed at 11:51:56
 * and the row appeared at 11:53:53 — and the buyer is redirected here
 * immediately, so without this they would see the failure page on a good sale.
 */
async function fromStripe(sessionId: string): Promise<VerifiedPurchase | null> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') return null;
    return productBySlug(session.metadata?.product ?? '') ?? null;
  } catch (e) {
    console.error('Session verification failed:', e);
    return null;
  }
}

/**
 * Resolves the download from the session id, never from anything else in the
 * URL: the id is the bearer token, and the product comes from whichever source
 * confirms the sale. Our database first, Stripe only if the row is not there
 * yet.
 */
async function verifyPurchase(sessionId: string | undefined): Promise<VerifiedPurchase | null> {
  if (!sessionId) return null;
  return (await fromPurchasesTable(sessionId)) ?? (await fromStripe(sessionId));
}

export default async function StoreSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const sessionId = typeof params.session_id === 'string' ? params.session_id : undefined;
  const purchase = await verifyPurchase(sessionId);

  if (!purchase) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">📚</div>
          <h1 className="text-3xl font-bold text-white mb-3">We couldn&apos;t verify this purchase</h1>
          <p className="text-zinc-400 mb-8">
            This download link is only valid straight after a completed checkout. If you have paid and are
            seeing this, contact ox@wtfagents.com and we&apos;ll send your guide over.
          </p>
          <a href="/store" className="bg-orange-500 hover:bg-orange-400 text-white font-medium px-6 py-3 rounded-lg text-sm transition-all">
            Back to Store →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">📥</div>
        <h1 className="text-3xl font-bold text-white mb-3">You&apos;re in.</h1>
        <p className="text-zinc-400 mb-2">Thanks for buying <span className="text-orange-400 font-semibold">{purchase.title}</span>.</p>
        <p className="text-zinc-500 text-sm mb-8">{purchase.description}</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
          <a
            href={`/guides/${purchase.file}`}
            download
            className="flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all w-full mb-3"
          >
            <span>⬇</span>
            Download {purchase.title}
          </a>
          <p className="text-xs text-zinc-600">PDF · We&apos;ve emailed you this link too.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/store" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium px-6 py-3 rounded-lg text-sm transition-all">
            Browse more guides
          </a>
          <Link href="/" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium px-6 py-3 rounded-lg text-sm transition-all">
            Back to WTF Agents
          </Link>
        </div>
      </div>
    </div>
  );
}
