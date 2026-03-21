// app/api/newsletter/route.ts
// Sends WTF Agents Weekly via Resend
// Called manually or via cron

import { NextResponse } from 'next/server';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = 'WTF Agents <weekly@wtfagents.com>';

async function getEmailList(): Promise<string[]> {
  // Fetch emails from Supabase
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/email_signups?select=email&order=created_at.desc`,
    {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!}`,
      }
    }
  );
  const data = await res.json();
  return data.map((row: { email: string }) => row.email).filter(Boolean);
}

function buildEmailHTML(stats: { arr: string; companies: string; launchedToday: string; wowGrowth: string }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>WTF Agents Weekly</title>
</head>
<body style="margin:0;padding:0;background:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#ffffff;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    
    <!-- HEADER -->
    <div style="text-align:center;margin-bottom:40px;">
      <div style="display:inline-block;background:linear-gradient(135deg,#f97316,#ef4444);width:40px;height:40px;border-radius:10px;line-height:40px;font-size:20px;font-weight:bold;color:white;margin-bottom:16px;">W</div>
      <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;">WTF Agents Weekly</h1>
      <p style="margin:8px 0 0;color:#71717a;font-size:14px;">The autonomous company economy, mapped live</p>
    </div>

    <!-- LIVE STATS -->
    <div style="background:#18181b;border:1px solid #27272a;border-radius:16px;padding:24px;margin-bottom:24px;">
      <p style="margin:0 0 16px;font-size:11px;font-weight:600;color:#f97316;letter-spacing:0.1em;text-transform:uppercase;">This week in the agentic economy</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div>
          <div style="font-size:28px;font-weight:800;color:#34d399;">${stats.arr}</div>
          <div style="font-size:12px;color:#71717a;">Live ARR</div>
        </div>
        <div>
          <div style="font-size:28px;font-weight:800;color:#a78bfa;">${stats.companies}</div>
          <div style="font-size:12px;color:#71717a;">Active Companies</div>
        </div>
        <div>
          <div style="font-size:28px;font-weight:800;color:#60a5fa;">${stats.launchedToday}</div>
          <div style="font-size:12px;color:#71717a;">Launched This Week</div>
        </div>
        <div>
          <div style="font-size:28px;font-weight:800;color:#fb923c;">+${stats.wowGrowth}%</div>
          <div style="font-size:12px;color:#71717a;">WoW Growth</div>
        </div>
      </div>
    </div>

    <!-- WTF OF THE WEEK -->
    <div style="background:linear-gradient(135deg,rgba(249,115,22,0.1),rgba(239,68,68,0.1));border:1px solid rgba(249,115,22,0.3);border-radius:16px;padding:24px;margin-bottom:24px;">
      <p style="margin:0 0 12px;font-size:11px;font-weight:600;color:#f97316;letter-spacing:0.1em;text-transform:uppercase;">WTF of the week</p>
      <p style="margin:0;font-size:18px;font-weight:600;color:#ffffff;line-height:1.4;">"An AI company just fired its human founder and hired a new one"</p>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:32px;">
      <a href="https://wtfagents.com" style="display:inline-block;background:#f97316;color:#ffffff;font-weight:600;font-size:14px;padding:14px 32px;border-radius:10px;text-decoration:none;">
        Explore the Index →
      </a>
      <p style="margin:16px 0 0;font-size:13px;color:#52525b;">
        <a href="https://wtfagents.com/ideas" style="color:#f97316;text-decoration:none;">Submit an idea</a> · 
        <a href="https://wtfagents.com/jobs" style="color:#f97316;text-decoration:none;">Find jobs</a> · 
        <a href="https://wtfagents.com/submit" style="color:#f97316;text-decoration:none;">List your company</a>
      </p>
    </div>

    <!-- FOOTER -->
    <div style="border-top:1px solid #27272a;padding-top:24px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#52525b;">
        WTF Agents · <a href="https://wtfagents.com" style="color:#f97316;text-decoration:none;">wtfagents.com</a>
      </p>
      <p style="margin:8px 0 0;font-size:11px;color:#3f3f46;">
        You're receiving this because you signed up at wtfagents.com.
      </p>
    </div>

  </div>
</body>
</html>
  `.trim();
}

export async function POST(request: Request) {
  try {
    const { secret, subject, preview } = await request.json();
    
    // Auth check
    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!RESEND_API_KEY) {
      return NextResponse.json({ error: 'RESEND_API_KEY not set' }, { status: 500 });
    }

    // Get live stats
    let stats = { arr: '$5.15M', companies: '5,042', launchedToday: '9,800+', wowGrowth: '21.4' };
    try {
      const statsRes = await fetch('https://polsia.imrat.com/api/data');
      const statsData = await statsRes.json();
      if (statsData.success && statsData.stats) {
        const s = statsData.stats;
        const arr = parseInt(s.arr_usd);
        const arr7d = parseInt(s.arr_7d_ago);
        const wow = arr7d > 0 ? Math.round((arr - arr7d) / arr7d * 100 * 10) / 10 : 0;
        stats = {
          arr: arr >= 1000000 ? `$${(arr / 1000000).toFixed(2)}M` : `$${arr.toLocaleString()}`,
          companies: parseInt(s.companies).toLocaleString(),
          launchedToday: parseInt(s.companies_created_24h).toLocaleString() + '+',
          wowGrowth: wow.toString(),
        };
      }
    } catch(e) { console.error('Stats fetch failed:', e); }

    const html = buildEmailHTML(stats);
    const emailSubject = subject || `An AI just launched ${stats.launchedToday} companies. WTF is happening.`;

    // Preview mode — just return the HTML
    if (preview) {
      return NextResponse.json({ html, subject: emailSubject, stats });
    }

    // Get email list
    const emails = await getEmailList();
    if (emails.length === 0) {
      return NextResponse.json({ error: 'No emails to send to' }, { status: 400 });
    }

    console.log(`Sending to ${emails.length} subscribers...`);

    // Send via Resend — batch in groups of 50
    const results = [];
    const batchSize = 50;
    
    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: batch,
          subject: emailSubject,
          html,
        }),
      });

      const result = await res.json();
      results.push(result);
      
      // Rate limit — wait 500ms between batches
      if (i + batchSize < emails.length) {
        await new Promise(r => setTimeout(r, 500));
      }
    }

    return NextResponse.json({
      success: true,
      sent: emails.length,
      subject: emailSubject,
      results,
    });

  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET — preview the email
export async function GET() {
  return NextResponse.json({
    message: 'Send newsletter via POST with { secret, subject?, preview? }',
    example: {
      secret: 'your-cron-secret',
      subject: 'Custom subject line (optional)',
      preview: true,
    }
  });
}
