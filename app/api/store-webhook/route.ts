import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { productBySlug } from '../../../lib/guides';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

const FROM_EMAIL = 'WTF Agents <ox@wtfagents.com>';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wtfagents.com';

/**
 * Transactional delivery of the purchased guide. The link points at the success
 * page, which re-verifies the session with Stripe, so it keeps working later.
 */
async function sendDeliveryEmail(email: string, slug: string, sessionId: string) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY not set — delivery email skipped');
    return;
  }
  const product = productBySlug(slug);
  if (!email || !product) {
    console.error('Delivery email skipped — missing email or unknown product:', slug);
    return;
  }

  const downloadUrl = `${SITE_URL}/store/success?session_id=${sessionId}`;
  const text = `Thanks for buying ${product.title}.

Download it here:
${downloadUrl}

That link stays valid, so save this email if you want to grab the PDF again later.

Any problems, just reply to this email and I'll sort it out.

— Ox
WTF Agents · wtfagents.com`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [email],
      subject: `Your guide: ${product.title}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error('Resend delivery failed:', res.status, await res.text());
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_STORE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook signature error:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.mode === 'payment') {
      const email = session.customer_email || session.metadata?.email || '';
      const slug = session.metadata?.product || '';
      const amount = session.amount_total || 0;

      // Record purchase
      await supabase.from('purchases').insert([{
        email,
        product_slug: slug,
        stripe_session_id: session.id,
        amount,
      }]);

      // Deliver the guide. Never fail the webhook over this — Stripe would retry
      // the whole event and duplicate the purchase row.
      try {
        await sendDeliveryEmail(email, slug, session.id);
      } catch (e) {
        console.error('Delivery email error:', e);
      }
    }
  }

  return NextResponse.json({ received: true });
}
