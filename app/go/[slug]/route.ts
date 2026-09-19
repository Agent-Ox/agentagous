import { NextRequest, NextResponse } from 'next/server';
import { affiliateBySlug } from '../../../lib/affiliates';
import { toolBySlug, toolDestination } from '../../../lib/tools';
import { logOutboundClick } from '../../../lib/outbound';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // An affiliate deal wins over the plain link; otherwise fall back to the
  // tool's own destination, which already prefers affiliate_url when set.
  const affiliate = affiliateBySlug(slug);
  const tool = toolBySlug(slug);
  const target = affiliate?.url || (tool ? toolDestination(tool) : '');

  // Unknown slug, or a partner whose real URL hasn't been filled in yet:
  // send them somewhere useful rather than off to a guessed domain.
  if (!target) {
    return NextResponse.redirect(new URL('/tools', req.url), 302);
  }

  await logOutboundClick(req, slug);
  return NextResponse.redirect(target, 302);
}
