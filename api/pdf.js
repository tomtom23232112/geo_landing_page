/**
 * Converts a Markdown report to a PDF Buffer using Puppeteer.
 * Returns a Buffer ready to attach to an email.
 */

import { marked } from 'marked';
import puppeteer from 'puppeteer';

export async function generatePdf(markdown, domain) {
  const html = marked.parse(markdown);
  const fullHtml = buildHtmlTemplate(html, domain);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  });

  try {
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '18mm', right: '18mm', bottom: '18mm', left: '18mm' },
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}

function buildHtmlTemplate(body, domain) {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12.5px;
    line-height: 1.65;
    color: #1a1a1a;
    background: #fff;
  }

  /* ── Header ── */
  .report-header {
    background: #111;
    padding: 18px 24px;
    margin-bottom: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px;
  }
  .report-header .brand {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c84e22;
  }
  .report-header .meta {
    font-size: 10px;
    color: #999;
    letter-spacing: 0.06em;
    text-align: right;
  }

  /* ── Headings ── */
  h1 {
    font-size: 24px;
    font-weight: 700;
    color: #111;
    margin-bottom: 6px;
    line-height: 1.2;
  }

  h2 {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: #c84e22;
    margin: 32px 0 12px;
    padding-left: 10px;
    border-left: 3px solid #c84e22;
    line-height: 1.4;
    page-break-after: avoid;
  }

  h3 {
    font-size: 14px;
    font-weight: 600;
    color: #111;
    margin: 22px 0 8px;
    page-break-after: avoid;
  }

  h4 {
    font-size: 12px;
    font-weight: 700;
    color: #444;
    margin: 14px 0 6px;
  }

  /* ── Body text ── */
  p { margin-bottom: 9px; color: #2a2a2a; line-height: 1.65; }
  strong { color: #111; }
  em { color: #555; font-style: italic; }

  ul, ol { margin: 6px 0 12px 20px; color: #2a2a2a; }
  li { margin-bottom: 4px; }

  /* ── Tables ── */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0 18px;
    font-size: 11px;
    page-break-inside: avoid;
  }
  th {
    background: #111;
    color: #fff;
    text-align: left;
    padding: 8px 10px;
    font-weight: 700;
    font-size: 10px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  td {
    padding: 7px 10px;
    border-bottom: 1px solid #ece9e3;
    vertical-align: top;
    color: #333;
  }
  tr:nth-child(even) td { background: #fafaf7; }

  /* ── Blockquotes ── */
  blockquote {
    border-left: 3px solid #c84e22;
    margin: 12px 0;
    padding: 10px 14px;
    background: #fafaf7;
    color: #444;
  }

  /* ── Code blocks ── */
  pre {
    background: #1a1a1a;
    border-radius: 6px;
    margin: 10px 0 16px;
    overflow: hidden;
    page-break-inside: avoid;
  }
  pre .code-label {
    background: #2a2a2a;
    color: #c84e22;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 5px 12px;
    display: block;
    border-bottom: 1px solid #333;
  }
  pre code {
    display: block;
    font-family: 'Courier New', monospace;
    font-size: 10.5px;
    color: #e8e8e8;
    background: transparent;
    padding: 12px 14px;
    line-height: 1.7;
    white-space: pre-wrap;
  }
  /* inline code */
  p code, li code {
    font-family: 'Courier New', monospace;
    font-size: 11px;
    background: #f3f0eb;
    padding: 1px 5px;
    border-radius: 3px;
    color: #c84e22;
  }

  /* ── Score box (injected by JS) ── */
  .score-box {
    background: #fafaf7;
    border: 1px solid #e8e3d6;
    border-radius: 8px;
    padding: 22px 24px;
    margin: 16px 0 24px;
    page-break-inside: avoid;
  }
  .score-row {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 4px;
  }
  .score-number {
    font-size: 56px;
    font-weight: 700;
    line-height: 1;
  }
  .score-denom {
    font-size: 20px;
    color: #999;
    font-weight: 400;
  }
  .score-label {
    font-size: 11px;
    color: #777;
    margin-bottom: 12px;
    font-style: italic;
  }
  .score-bar-wrap {
    background: #e8e3d6;
    border-radius: 4px;
    height: 7px;
    position: relative;
    margin-bottom: 5px;
  }
  .score-bar-fill {
    height: 100%;
    border-radius: 4px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .score-bar-avg {
    position: absolute;
    top: -3px;
    height: 13px;
    width: 2px;
    background: #111;
    border-radius: 1px;
  }
  .score-bar-labels {
    display: flex;
    justify-content: space-between;
    font-size: 9.5px;
    color: #999;
    margin-top: 3px;
  }
  .score-bar-labels .avg-label { color: #555; font-weight: 600; }

  /* ── Impact badges (injected by JS) ── */
  .badge {
    display: inline-block;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 20px;
    margin-left: 8px;
    vertical-align: middle;
    position: relative;
    top: -1px;
  }
  .badge-high   { background: #fee2e2; color: #dc2626; }
  .badge-medium { background: #fff7ed; color: #c84e22; }
  .badge-low    { background: #f3f4f6; color: #6b7280; }

  /* ── CTA strip (top) ── */
  .cta-strip {
    background: #111;
    border-radius: 6px;
    padding: 16px 22px;
    margin: 4px 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    page-break-inside: avoid;
  }
  .cta-strip-left p { margin: 0; font-size: 12px; color: #ccc; line-height: 1.5; }
  .cta-strip-left p strong { color: #fff; display: block; margin-bottom: 2px; font-size: 13px; }
  .cta-strip-left ul {
    margin: 6px 0 0 16px;
    color: #aaa;
    font-size: 11px;
    line-height: 1.6;
  }
  .cta-strip-left ul li { margin-bottom: 1px; }
  .cta-strip a {
    background: #c84e22;
    color: #fff;
    text-decoration: none;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 11px 18px;
    border-radius: 4px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* ── CTA full (bottom) ── */
  .cta-full {
    background: #111;
    border-radius: 8px;
    padding: 0;
    margin: 44px 0 28px;
    page-break-inside: avoid;
    overflow: hidden;
    display: flex;
  }
  .cta-full-left {
    padding: 30px 28px;
    flex: 1;
  }
  .cta-full-right {
    background: #1d1d1d;
    border-left: 1px solid #2a2a2a;
    padding: 30px 24px;
    width: 200px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .cta-label {
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #c84e22;
    margin-bottom: 10px;
  }
  .cta-full-left h2 {
    font-size: 19px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 12px;
    line-height: 1.3;
    border: none;
    padding: 0;
    text-transform: none;
    letter-spacing: 0;
  }
  .cta-full-left p { font-size: 12px; color: #bbb; line-height: 1.6; margin: 0 0 10px; }
  .cta-full-left ul { margin: 8px 0 18px 16px; color: #bbb; font-size: 12px; line-height: 1.75; }
  .cta-full-left ul li { margin-bottom: 2px; }
  .cta-full-left a {
    display: inline-block;
    background: #c84e22;
    color: #fff;
    text-decoration: none;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 11px 20px;
    border-radius: 4px;
  }
  .cta-right-item {
    margin-bottom: 14px;
  }
  .cta-right-item:last-child { margin-bottom: 0; }
  .cta-right-item .check {
    color: #c84e22;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 2px;
  }
  .cta-right-item .check-label {
    font-size: 11px;
    color: #ddd;
    line-height: 1.4;
  }
  .cta-right-item .check-sub {
    font-size: 9.5px;
    color: #888;
  }

  /* ── Footer ── */
  .report-footer {
    margin-top: 32px;
    padding-top: 12px;
    border-top: 1px solid #ece9e3;
    font-size: 9.5px;
    color: #bbb;
    letter-spacing: 0.06em;
    display: flex;
    justify-content: space-between;
  }

  /* ── Mid-report banner ── */
  .cta-mid {
    background: #111;
    border-radius: 6px;
    padding: 18px 22px;
    margin: 32px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    page-break-inside: avoid;
  }
  .cta-mid-text strong {
    display: block;
    color: #fff;
    font-size: 13px;
    margin-bottom: 3px;
  }
  .cta-mid-text span {
    color: #999;
    font-size: 11px;
  }
  .cta-mid a {
    background: #c84e22;
    color: #fff;
    text-decoration: none;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 10px 18px;
    border-radius: 4px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* ── Page breaks ── */
  h3 { page-break-after: avoid; }
</style>
</head>
<body>

<div class="report-header">
  <div class="brand">Everadam &nbsp;·&nbsp; GEO Readiness Report</div>
  <div class="meta">${domain}&nbsp;&nbsp;·&nbsp;&nbsp;${date}</div>
</div>

<!-- Strip CTA -->
<div class="cta-strip">
  <div class="cta-strip-left">
    <p><strong>Don't want to do this yourself?</strong>Everadam implements the full GEO setup for you.</p>
    <ul>
      <li>Schema · llms.txt · robots.txt · Bing setup</li>
      <li>Google Business Profile + 8+ directories</li>
      <li>First AI citations typically within 3–4 weeks</li>
    </ul>
  </div>
  <a href="https://everadam.com">everadam.com &rarr;</a>
</div>

${body}

<!-- Full CTA -->
<div class="cta-full">
  <div class="cta-full-left">
    <div class="cta-label">Done-for-you &nbsp;·&nbsp; Everadam</div>
    <h2>We'll implement everything in this report for you.</h2>
    <p>You now know exactly what's missing. Do you want to spend the next 4 weeks on this — or let us handle it?</p>
    <ul>
      <li>Schema markup (Organization, LocalBusiness, FAQPage)</li>
      <li>robots.txt + llms.txt published &amp; verified</li>
      <li>Bing Webmaster Tools + sitemap submission</li>
      <li>Google Business Profile + 8+ directory registrations</li>
      <li>Content restructured for AI extraction</li>
    </ul>
    <a href="https://everadam.com">Get started at everadam.com &rarr;</a>
  </div>
  <div class="cta-full-right">
    <div class="cta-right-item">
      <div class="check">&#10003;</div>
      <div class="check-label">Bing &amp; ChatGPT</div>
      <div class="check-sub">Webmaster Tools setup</div>
    </div>
    <div class="cta-right-item">
      <div class="check">&#10003;</div>
      <div class="check-label">Schema markup</div>
      <div class="check-sub">Organization · FAQ · LocalBusiness</div>
    </div>
    <div class="cta-right-item">
      <div class="check">&#10003;</div>
      <div class="check-label">8+ directories</div>
      <div class="check-sub">Clutch · GBP · LinkedIn · more</div>
    </div>
    <div class="cta-right-item">
      <div class="check">&#10003;</div>
      <div class="check-label">3–4 week results</div>
      <div class="check-sub">First AI citations</div>
    </div>
  </div>
</div>

<div class="report-footer">
  <span>Everadam &mdash; everadam.com</span>
  <span>Confidential &nbsp;·&nbsp; prepared for ${domain}</span>
</div>

<script>
// ── Score box ──
(function() {
  const allH2 = document.querySelectorAll('h2');
  for (const h2 of allH2) {
    if (!h2.textContent.includes('AI Readiness Score')) continue;
    const m = h2.textContent.match(/(\\d+)\\/100/);
    if (!m) break;
    const score = parseInt(m[1]);
    const color = score <= 40 ? '#dc2626' : score <= 65 ? '#c84e22' : '#16a34a';
    const verdict = score <= 25 ? 'Critical — major gaps across all areas'
                  : score <= 40 ? 'Below average — significant work needed'
                  : score <= 60 ? 'Moderate — fixable within 30 days'
                  : score <= 75 ? 'Above average — fine-tuning needed'
                  : 'Strong — maintain and expand';
    const avgPos = 61;
    h2.outerHTML = \`<div class="score-box">
      <div class="score-row">
        <span class="score-number" style="color:\${color}">\${score}</span>
        <span class="score-denom">/100</span>
      </div>
      <div class="score-label">\${verdict}</div>
      <div class="score-bar-wrap">
        <div class="score-bar-fill" style="width:\${score}%;background:\${color}"></div>
        <div class="score-bar-avg" style="left:\${avgPos}%"></div>
      </div>
      <div class="score-bar-labels">
        <span>0</span>
        <span class="avg-label">&#9650; Industry avg: 61</span>
        <span>100</span>
      </div>
    </div>\`;
    break;
  }
})();

// ── Impact badges ──
document.querySelectorAll('h3').forEach(function(h3) {
  const t = h3.textContent;
  const m = t.match(/^(.*?)\\s+[\\u2014\\-]{1,3}\\s+(HIGH|MEDIUM|LOW)\\s+Impact$/i);
  if (!m) return;
  const cls = { HIGH: 'badge-high', MEDIUM: 'badge-medium', LOW: 'badge-low' }[m[2].toUpperCase()];
  h3.innerHTML = m[1].trim() + ' <span class="badge ' + cls + '">' + m[2] + '</span>';
});

// ── Mid-report banner before Platform Breakdown ──
(function() {
  const allH2 = document.querySelectorAll('h2');
  for (const h2 of allH2) {
    if (!h2.textContent.toLowerCase().includes('platform')) continue;
    const banner = document.createElement('div');
    banner.className = 'cta-mid';
    banner.innerHTML = \`
      <div class="cta-mid-text">
        <strong>Halfway through the report — still planning to do this alone?</strong>
        <span>Everadam implements everything: schema, Bing, directories, llms.txt — done in 2 weeks.</span>
      </div>
      <a href="https://everadam.com">Let us handle it &rarr;</a>
    \`;
    h2.parentNode.insertBefore(banner, h2);
    break;
  }
})();

// ── Code block labels ──
document.querySelectorAll('pre').forEach(function(pre) {
  const code = pre.querySelector('code');
  if (!code) return;
  const txt = code.textContent.trim();
  let label = 'CODE';
  if (txt.startsWith('User-agent') || txt.includes('GPTBot')) label = 'robots.txt';
  else if (txt.startsWith('#') && (txt.includes('What we do') || txt.includes('llms') || txt.includes('who we serve') || txt.toLowerCase().includes('## what'))) label = 'llms.txt';
  else if (txt.includes('"@context"') || txt.includes('@type') || txt.includes('application/ld')) label = 'JSON-LD Schema';
  const labelEl = document.createElement('span');
  labelEl.className = 'code-label';
  labelEl.textContent = label;
  pre.insertBefore(labelEl, code);
});
</script>

</body>
</html>`;
}
