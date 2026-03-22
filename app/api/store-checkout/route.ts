import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' });

const PRICE_MAP: Record<string, string> = {
  'openclaw': process.env.STRIPE_PRICE_OPENCLAW!,
  'agentic-economy': process.env.STRIPE_PRICE_AGENTIC_ECONOMY!,
  'polsia': process.env.STRIPE_PRICE_POLSIA!,
  'paperclip': process.env.STRIPE_PRICE_PAPERCLIP!,
  'api': process.env.STRIPE_PRICE_API!,
  'hire-agent': process.env.STRIPE_PRICE_HIRE_AGENT!,
  'anthropic': process.env.STRIPE_PRICE_ANTHROPIC!,
  'claude': process.env.STRIPE_PRICE_CLAUDE!,
  'claude-code': process.env.STRIPE_PRICE_CLAUDE_CODE!,
  'ai-agent': process.env.STRIPE_PRICE_AI_AGENT!,
  'llm': process.env.STRIPE_PRICE_LLM!,
  'starter-pack': process.env.STRIPE_PRICE_STARTER_PACK!,
  'claude-pack': process.env.STRIPE_PRICE_CLAUDE_PACK!,
  'complete-pack': process.env.STRIPE_PRICE_COMPLETE_PACK!,
};

export async function POST(request: Request) {
  try {
    const { email, slug } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    if (!slug || !PRICE_MAP[slug]) {
      return NextResponse.json({ error: 'Invalid product' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [{
        price: PRICE_MAP[slug],
        quantity: 1,
      }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/store/success?session_id={CHECKOUT_SESSION_ID}&guide=${slug}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/store`,
      metadata: { product: slug, email },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Store checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
