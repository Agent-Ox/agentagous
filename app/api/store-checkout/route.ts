import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { guideBySlug } from '../../../lib/guides';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' });

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

function priceForSlug(slug: string): string | undefined {
  return guideBySlug(slug)?.stripePriceId || BUNDLE_PRICES[slug];
}

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();

    const price = slug ? priceForSlug(slug) : undefined;
    if (!price) {
      return NextResponse.json({ error: 'Invalid product' }, { status: 400 });
    }

    const params: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      // Do not add payment_method_types — Managed Payments rejects the request
      // outright and chooses the methods itself via dynamic payment methods.
      //
      // No customer_email either: Stripe Checkout collects it on its own page,
      // which is one less field between the buy button and the payment. The
      // webhook reads it back from customer_details.
      line_items: [{
        price,
        quantity: 1,
      }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/store/success?session_id={CHECKOUT_SESSION_ID}&guide=${slug}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/store`,
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
    const session = await stripe.checkout.sessions.create({
      ...params,
      managed_payments: { enabled: true },
    } as Stripe.Checkout.SessionCreateParams & { managed_payments: { enabled: boolean } });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Store checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
