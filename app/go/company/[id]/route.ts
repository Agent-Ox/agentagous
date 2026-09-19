import { NextRequest, NextResponse } from 'next/server';
import { companyBySlug } from '../../../../lib/companies';
import { logOutboundClick } from '../../../../lib/outbound';

/**
 * Logged outbound redirect for a company tile on /companies.
 *
 * The segment is a slug from lib/companies.ts. It used to be a numeric id from
 * the Supabase `companies` table, which the scraped directory populated; that
 * directory is gone, so the lookup is gone with it. The table itself is left
 * alone, but nothing in the app reads it any more.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const company = companyBySlug(id);

  if (!company?.url) {
    return NextResponse.redirect(new URL('/companies', req.url), 302);
  }

  await logOutboundClick(req, `company/${id}`);
  return NextResponse.redirect(company.url, 302);
}
