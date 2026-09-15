import { NextRequest } from 'next/server';
import { supabase } from './supabase';

/**
 * Records an outbound click. Never throws and never blocks the redirect: if the
 * outbound_clicks table is missing or the insert fails, the visitor still gets
 * sent on and we only lose the datapoint.
 */
export async function logOutboundClick(req: NextRequest, slug: string): Promise<void> {
  try {
    const { error } = await supabase.from('outbound_clicks').insert([{
      slug,
      referer: req.headers.get('referer'),
      user_agent: req.headers.get('user-agent'),
      ts: new Date().toISOString(),
    }]);
    if (error) console.error('outbound_clicks insert failed:', error.message);
  } catch (e) {
    console.error('outbound_clicks insert threw:', e);
  }
}
