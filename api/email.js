/**
 * Sends the finished GEO report PDF to the customer via Resend.
 * Requires env var: RESEND_API_KEY
 * Uses FROM_EMAIL env var (default: reports@everadam.com)
 */

import { Resend } from 'resend';

export async function sendReportEmail(email, domain, pdfBuffer) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.FROM_EMAIL || 'Everadam Reports <reports@everadam.com>';
  const filename = `GEO-Report-${domain.replace(/[^a-z0-9]/gi, '-')}.pdf`;

  const { data, error } = await resend.emails.send({
    from,
    to: [email],
    subject: `Your GEO Readiness Report — ${domain}`,
    html: buildEmailHtml(domain),
    attachments: [
      {
        filename,
        content: pdfBuffer.toString('base64'),
      },
    ],
  });

  if (error) throw new Error(`Email send failed: ${error.message}`);
  return data;
}

function buildEmailHtml(domain) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Georgia, serif; max-width: 560px; margin: 40px auto; color: #1a1a1a; line-height: 1.65;">

  <div style="border-bottom: 2px solid #c84e22; padding-bottom: 16px; margin-bottom: 28px;">
    <span style="font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #c84e22; font-weight: 700;">
      Everadam
    </span>
  </div>

  <p style="font-size: 18px; line-height: 1.4; margin-bottom: 20px;">
    Your GEO Readiness Report for <strong>${domain}</strong> is attached.
  </p>

  <p style="color: #444; margin-bottom: 16px;">
    The report shows exactly where your website stands with ChatGPT, Claude, and Perplexity — and what to fix first.
  </p>

  <p style="color: #444; margin-bottom: 28px;">
    Start with Week 1 of the 30-day action plan. Those items have the highest impact per hour invested.
  </p>

  <div style="background: #fafaf7; border-left: 3px solid #c84e22; padding: 14px 18px; margin-bottom: 28px;">
    <p style="margin: 0; font-size: 13px; color: #333;">
      <strong>Questions about the report?</strong> Reply to this email — we read every reply.
    </p>
  </div>

  <p style="color: #888; font-size: 12px; font-family: Arial, sans-serif; border-top: 1px solid #e8e3d6; padding-top: 16px; margin-top: 32px;">
    Everadam · everadam.com<br>
    One-time report — no subscription, nothing else will be charged.
  </p>

</body>
</html>`;
}
