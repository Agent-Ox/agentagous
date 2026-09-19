import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { supabase } from '../../../../lib/supabase';
import { bundleBySlug } from '../../../../lib/guides';
import { upsellFor, COMPLETE_SLUG } from '../../../../lib/upsell';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' });

/**
 * Sends a buyer to a Complete Pack checkout with their previous payment
 * credited against it.
 *
 * A GET so the same link works from the success page and from the delivery
 * email. The session id is the bearer token, exactly as it is for the
 * download; the credit is derived from the verified purchase on this side, so
 * nothing in the URL can inflate it.
 *
 * The coupon id is derived from the session id, which makes the route
 * idempotent: clicking the link from the page and again from the email reuses
 * one coupon rather than minting a new one each time.
 */
async function purchased(sessionId: string): Promise<{ slug: string; paidCents?: number } | null> {
  const { data } = await supabase
    .from('purchases')
    .select('product_slug, amount')
    .eq('stripe_session_id', sessionId)
    .limit(1)
    .maybeSingle();
  if (data?.product_slug) return { slug: data.product_slug, paidCents: data.amount ?? undefined };

  // Same fallback as the success page: the webhook may not have landed yet.
  try {
    const s = await stripe.checkout.sessions.retrieve(sessionId);
    if (s.payment_status !== 'paid') return null;
    const slug = s.metadata?.product;
    return slug ? { slug, paidCents: s.amount_total ?? undefined } : null;
  } catch {
    return null;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ session: string }> },
) {
  const { session } = await params;
  const home = new URL('/', req.url);

  if (!session.startsWith('cs_')) return NextResponse.redirect(home, 302);

  const bought = await purchased(session);
  const offer = bought ? upsellFor(bought.slug, bought.paidCents) : null;
  const complete = bundleBySlug(COMPLETE_SLUG);
  if (!offer || !complete) return NextResponse.redirect(home, 302);

  const price = process.env.STRIPE_PRICE_COMPLETE_PACK;
  if (!price) return NextResponse.redirect(home, 302);

  const couponId = `upsell_${session.slice(-40)}`;
  try {
    await stripe.coupons.retrieve(couponId);
  } catch {
    await stripe.coupons.create({
      id: couponId,
      amount_off: offer.creditCents,
      currency: 'usd',
      duration: 'once',
      max_redemptions: 1,
      name: `Credit for your previous purchase`,
    });
  }

  const checkout = await stripe.checkout.sessions.create({
    ...{
      mode: 'payment' as const,
      line_items: [{ price, quantity: 1 }],
      discounts: [{ coupon: couponId }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/store/success?session_id=${session}`,
      metadata: { product: COMPLETE_SLUG, upgraded_from: session },
    },
    managed_payments: { enabled: true },
  } as Stripe.Checkout.SessionCreateParams & { managed_payments: { enabled: boolean } });

  return NextResponse.redirect(checkout.url!, 302);
}
