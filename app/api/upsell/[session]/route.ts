import { NextRequest, NextResponse } from 'next/server';

import { purchaseFor } from '../../../../lib/purchase';
import { upsellFor } from '../../../../lib/upsell';
import { createUpsellSession } from '../../../../lib/checkout';

/**
 * The original upgrade link. /buy/complete-pack?credit=<session> is what the
 * site and the emails use now; this stays so links already sent keep working,
 * and both go through the same session builder.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ session: string }> },
) {
  const { session } = await params;
  const home = new URL('/', req.url);
  if (!session.startsWith('cs_')) return NextResponse.redirect(home, 302);

  const bought = await purchaseFor(session);
  const offer = bought ? upsellFor(bought.slug, bought.paidCents) : null;
  if (!offer) return NextResponse.redirect(home, 302);

  const url = await createUpsellSession(session, offer.creditCents);
  return NextResponse.redirect(url ?? home.toString(), 302);
}
