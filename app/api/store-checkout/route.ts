import { NextResponse } from 'next/server';

import { createCheckoutSession } from '../../../lib/checkout';

/**
 * The POST checkout the buy buttons used before /buy/<slug> existed. Kept so
 * anything still calling it keeps working; the session logic lives in
 * lib/checkout, which the GET routes share.
 */
export async function POST(request: Request) {
  try {
    const { slug } = await request.json();
    const url = slug ? await createCheckoutSession(slug) : null;
    if (!url) return NextResponse.json({ error: 'Invalid product' }, { status: 400 });
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Store checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
