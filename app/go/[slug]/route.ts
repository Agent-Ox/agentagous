import { NextRequest, NextResponse } from 'next/server';
import { affiliateBySlug } from '../../../lib/affiliates';
import { logOutboundClick } from '../../../lib/outbound';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const affiliate = affiliateBySlug(slug);

  // Unknown slug, or a partner whose real URL hasn't been filled in yet:
  // send them somewhere useful rather than off to a guessed domain.
  if (!affiliate || !affiliate.url) {
    return NextResponse.redirect(new URL('/tools', req.url), 302);
  }

  await logOutboundClick(req, slug);
  return NextResponse.redirect(affiliate.url, 302);
}
