import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { jobTitle, company, posterEmail, applicantName, applicantEmail, message } = await req.json();

    if (!posterEmail || !applicantEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'WTF Agents <ox@wtfagents.com>',
        to: posterEmail,
        reply_to: applicantEmail,
        subject: `New application for "${jobTitle}" — WTF Agents`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #09090b; color: #ffffff; padding: 40px 32px; border-radius: 12px;">
            <div style="margin-bottom: 32px;">
              <span style="background: #f97316; color: white; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px;">NEW APPLICATION</span>
            </div>
            <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 8px; color: #ffffff;">Someone wants to work with you</h1>
            <p style="color: #71717a; font-size: 14px; margin: 0 0 32px;">You received an application for <strong style="color: #ffffff;">${jobTitle}</strong> at ${company} via WTF Agents.</p>

            <div style="background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <div style="margin-bottom: 16px;">
                <div style="font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Applicant</div>
                <div style="font-size: 16px; font-weight: 600; color: #ffffff;">${applicantName}</div>
                <div style="font-size: 14px; color: #f97316;">${applicantEmail}</div>
              </div>
              <div>
                <div style="font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Their message</div>
                <div style="font-size: 14px; color: #a1a1aa; line-height: 1.6; white-space: pre-wrap;">${message}</div>
              </div>
            </div>

            <a href="mailto:${applicantEmail}?subject=Re: Your application for ${encodeURIComponent(jobTitle)}"
              style="display: inline-block; background: #f97316; color: white; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-bottom: 32px;">
              Reply to ${applicantName} →
            </a>

            <div style="border-top: 1px solid #27272a; padding-top: 24px; font-size: 12px; color: #52525b;">
              <p style="margin: 0;">This application was submitted via <a href="https://wtfagents.com/jobs" style="color: #f97316; text-decoration: none;">WTF Agents Jobs Board</a>. The autonomous company economy is here.</p>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      return NextResponse.json({ error: 'Email failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('notify-application error:', e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
