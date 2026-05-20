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
        content: Buffer.from(pdfBuffer).toString('base64'),
        content_type: 'application/pdf',
      },
    ],
  });

  if (error) throw new Error(`Email send failed: ${error.message}`);
  return data;
}

function buildEmailHtml(domain) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background: #f5f5f3; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f5f5f3; padding: 40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 8px; overflow: hidden;">

        <!-- Header -->
        <tr>
          <td style="background: #111111; padding: 24px 36px;">
            <span style="font-family: Inter, sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #c84e22;">
              Everadam
            </span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding: 36px 36px 0;">
            <p style="margin: 0 0 8px; font-size: 13px; font-weight: 500; color: #c84e22; letter-spacing: 0.08em; text-transform: uppercase;">
              GEO Readiness Report
            </p>
            <h1 style="margin: 0 0 24px; font-size: 24px; font-weight: 600; color: #111; line-height: 1.3;">
              Your report for <span style="color: #c84e22;">${domain}</span> is ready.
            </h1>

            <p style="margin: 0 0 16px; font-size: 15px; color: #444; line-height: 1.6;">
              The attached PDF shows exactly where your site stands with ChatGPT, Claude, and Perplexity — and which fixes will have the biggest impact.
            </p>

            <p style="margin: 0 0 28px; font-size: 15px; color: #444; line-height: 1.6;">
              Start with <strong style="color: #111;">Week 1</strong> of the 30-day action plan. Those tasks take under 2 hours and move the needle the most.
            </p>
          </td>
        </tr>

        <!-- Callout -->
        <tr>
          <td style="padding: 0 36px 36px;">
            <div style="background: #fafaf7; border: 1px solid #e8e3d6; border-radius: 6px; padding: 18px 20px;">
              <p style="margin: 0; font-size: 13px; color: #555; line-height: 1.5;">
                <strong style="color: #111;">Questions about the report?</strong><br>
                Reply to this email — we read and respond to every message.
              </p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background: #f5f5f3; padding: 20px 36px; border-top: 1px solid #e8e3d6;">
            <p style="margin: 0; font-size: 11px; color: #999; line-height: 1.6;">
              Everadam &middot; everadam.com<br>
              One-time report &mdash; no subscription, nothing else will be charged.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
}
