import Stripe from 'stripe';
import { productBySlug } from '../../../lib/guides';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' });

type VerifiedPurchase = { title: string; file: string; description: string };

/**
 * Resolves the download from the Stripe session itself, never from the URL.
 * Returns null unless Stripe confirms this session is paid.
 */
async function verifyPurchase(sessionId: string | undefined): Promise<VerifiedPurchase | null> {
  if (!sessionId) return null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') return null;
    return productBySlug(session.metadata?.product ?? '') ?? null;
  } catch (e) {
    console.error('Session verification failed:', e);
    return null;
  }
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
          <a href="/" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium px-6 py-3 rounded-lg text-sm transition-all">
            Back to WTF Agents
          </a>
        </div>
      </div>
    </div>
  );
}
