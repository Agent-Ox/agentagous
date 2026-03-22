// app/api/customer-portal/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' });

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // Find customer by email
    const customers = await stripe.customers.list({ email, limit: 1 });

    if (!customers.data.length) {
      return NextResponse.json({ notFound: true });
    }

    const customer = customers.data[0];

    // Check they have an active subscription
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1,
    });

    if (!subscriptions.data.length) {
      return NextResponse.json({ notFound: true });
    }

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: 'https://wtfagents.com/intelligence',
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Customer portal error:', error);
    return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 });
  }
}
