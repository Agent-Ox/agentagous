import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { logOutboundClick } from '../../../../lib/outbound';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return NextResponse.redirect(new URL('/companies', req.url), 302);
  }

  const { data } = await supabase
    .from('companies')
    .select('url')
    .eq('id', Number(id))
    .maybeSingle();

  if (!data?.url) {
    return NextResponse.redirect(new URL('/companies', req.url), 302);
  }

  // Stored urls are bare hosts ("acme.polsia.app"), matching how they were
  // rendered before this route existed.
  const target = /^https?:\/\//.test(data.url) ? data.url : `https://${data.url}`;

  await logOutboundClick(req, `company/${id}`);
  return NextResponse.redirect(target, 302);
}
