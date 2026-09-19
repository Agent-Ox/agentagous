import { notFound } from 'next/navigation';

import { createCheckoutSession, createUpsellSession, isSellable } from '../../../lib/checkout';
import { purchaseFor } from '../../../lib/purchase';
import { upsellFor } from '../../../lib/upsell';

export const dynamic = 'force-dynamic';

/**
 * GET /buy/<slug> — a link that goes to Stripe.
 *
 * The buy buttons used to be a client component that POSTed to an API route
 * and then set window.location. A plain link does the same job with no
 * JavaScript, works on a middle-click, survives a failed hydration, and can be
 * put in an email where a button cannot.
 *
 * ?credit=<checkout session id> is the upgrade path: the Complete Pack with a
 * previous payment credited against it. The credit is derived here from the
 * verified purchase, so nothing in the URL can inflate it; an unrecognised or
 * unpaid session simply buys the pack at full price rather than failing.
 *
 * An unknown slug is a 404, not a redirect home: a wrong /buy/ URL is a
 * mistake worth seeing.
 */
export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isSellable(slug)) notFound();

  const credit = new URL(req.url).searchParams.get('credit');
  if (credit?.startsWith('cs_') && slug === 'complete-pack') {
    const bought = await purchaseFor(credit);
    const offer = bought ? upsellFor(bought.slug, bought.paidCents) : null;
    if (offer) {
      const url = await createUpsellSession(credit, offer.creditCents);
      if (url) return see(url);
    }
  }

  const url = await createCheckoutSession(slug);
  // A sellable slug with no price ID is a configuration error, not a bad URL.
  if (!url) throw new Error(`No Stripe price configured for '${slug}'`);

  return see(url);
}

/** A plain 302. next/navigation's redirect() sends 307, which is not what a
 *  link to a checkout wants: this is a temporary "look over there", and the
 *  method never needs preserving. */
function see(url: string) {
  return new Response(null, { status: 302, headers: { location: url, 'cache-control': 'no-store' } });
}
