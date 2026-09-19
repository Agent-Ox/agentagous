import Stripe from 'stripe';

import { guideBySlug, bundleBySlug } from './guides';

/**
 * One place that knows how to start a Checkout Session, used by the POST API
 * the old buttons called and by the GET /buy/<slug> routes that replaced them.
 * Two copies of the Managed Payments caveat below would be one too many.
 */

const stripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' });

/**
 * Guide prices live in each guide's front-matter and reach us through the
 * generated catalogue, so adding a guide needs no change here. The two bundles
 * are not catalogue rows, so they keep their own environment variables; the
 * same IDs are recorded in guides/bundles.py.
 */
const BUNDLE_PRICES: Record<string, string | undefined> = {
  'starter-pack': process.env.STRIPE_PRICE_STARTER_PACK,
  'complete-pack': process.env.STRIPE_PRICE_COMPLETE_PACK,
};

export const priceForSlug = (slug: string): string | undefined =>
  guideBySlug(slug)?.stripePriceId || BUNDLE_PRICES[slug];

/** Every slug a checkout route will answer for: the guides and the bundles. */
export const isSellable = (slug: string): boolean =>
  Boolean(guideBySlug(slug) || bundleBySlug(slug));

export async function createCheckoutSession(slug: string): Promise<string | null> {
  const price = priceForSlug(slug);
  if (!price) return null;

  const site = process.env.NEXT_PUBLIC_SITE_URL;

  const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    // Do not add payment_method_types — Managed Payments rejects the request
    // outright and chooses the methods itself via dynamic payment methods.
    //
    // No customer_email either: Stripe Checkout collects it on its own page,
    // which is one less field between the buy button and the payment. The
    // webhook reads it back from customer_details.
    line_items: [{ price, quantity: 1 }],
    success_url: `${site}/store/success?session_id={CHECKOUT_SESSION_ID}&guide=${slug}`,
    cancel_url: `${site}/`,
    metadata: { product: slug },
  };

  // Stripe is the merchant of record: it collects and remits VAT, GST and
  // sales tax, and selects the payment methods. Managed Payments is on by
  // default for this account; sending it explicitly keeps the intent in the
  // code and survives a change to the dashboard default.
  //
  // The REST API accepts this parameter — verified against the live account —
  // but the pinned stripe@20.4.1 types predate it, so it is attached here
  // rather than inside the typed object above. Fold it back into `params` and
  // delete the cast once the SDK is upgraded.
  const session = await stripe().checkout.sessions.create({
    ...params,
    managed_payments: { enabled: true },
  } as Stripe.Checkout.SessionCreateParams & { managed_payments: { enabled: boolean } });

  return session.url;
}

/**
 * The upgrade checkout: the Complete Pack with the buyer's previous payment
 * credited against it.
 *
 * The coupon id is derived from the originating session id, which makes this
 * idempotent — following the link from the success page and again from the
 * delivery email reuses one coupon rather than minting a new one each time.
 * The credit is computed from the verified purchase, never from the URL.
 */
export async function createUpsellSession(
  sessionId: string,
  creditCents: number,
): Promise<string | null> {
  const price = process.env.STRIPE_PRICE_COMPLETE_PACK;
  if (!price) return null;

  const s = stripe();
  const couponId = `upsell_${sessionId.slice(-40)}`;
  try {
    await s.coupons.retrieve(couponId);
  } catch {
    await s.coupons.create({
      id: couponId,
      amount_off: creditCents,
      currency: 'usd',
      duration: 'once',
      max_redemptions: 1,
      name: 'Credit for your previous purchase',
    });
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL;
  const checkout = await s.checkout.sessions.create({
    ...{
      mode: 'payment' as const,
      line_items: [{ price, quantity: 1 }],
      discounts: [{ coupon: couponId }],
      success_url: `${site}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/store/success?session_id=${sessionId}`,
      metadata: { product: 'complete-pack', upgraded_from: sessionId },
    },
    managed_payments: { enabled: true },
  } as Stripe.Checkout.SessionCreateParams & { managed_payments: { enabled: boolean } });

  return checkout.url;
}
