import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

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

      // Add to email list
      await supabase.from('email_signups').insert([{
        email,
        source: `store_purchase_${slug}`,
      }]).select();
    }
  }

  return NextResponse.json({ received: true });
}
