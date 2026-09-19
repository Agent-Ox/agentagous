import Stripe from 'stripe';

import { supabase } from './supabase';

/**
 * What a checkout session bought, read back from our own records.
 *
 * Shared by the success page, the upsell link and /buy/<slug>?credit=, which
 * all need the same answer and had the same fallback written out three times.
 */
export async function purchaseFor(
  sessionId: string,
): Promise<{ slug: string; paidCents?: number } | null> {
  const { data } = await supabase
    .from('purchases')
    .select('product_slug, amount')
    .eq('stripe_session_id', sessionId)
    .limit(1)
    .maybeSingle();
  if (data?.product_slug) return { slug: data.product_slug, paidCents: data.amount ?? undefined };

  // The webhook may not have landed yet: ask Stripe directly.
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' });
    const s = await stripe.checkout.sessions.retrieve(sessionId);
    if (s.payment_status !== 'paid') return null;
    const slug = s.metadata?.product;
    return slug ? { slug, paidCents: s.amount_total ?? undefined } : null;
  } catch {
    return null;
  }
}
