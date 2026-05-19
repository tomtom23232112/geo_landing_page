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
  });

  try {
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
    });
    return pdf;
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
    font-family: 'Georgia', serif;
    font-size: 13px;
    line-height: 1.65;
    color: #1a1a1a;
    background: #fff;
  }

  /* Header */
  .report-header {
    border-bottom: 2px solid #c84e22;
    padding-bottom: 20px;
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .report-header .brand {
    font-family: 'Arial', sans-serif;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #c84e22;
    font-weight: 700;
  }
  .report-header .meta {
    font-family: 'Arial', sans-serif;
    font-size: 10px;
    color: #888;
    letter-spacing: 0.08em;
    text-align: right;
  }

  /* Headings */
  h1 {
    font-family: 'Georgia', serif;
    font-size: 26px;
    font-weight: normal;
    line-height: 1.25;
    color: #111;
    margin-bottom: 10px;
    border-bottom: 1px solid #e8e3d6;
    padding-bottom: 12px;
  }

  h2 {
    font-family: 'Arial', sans-serif;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #c84e22;
    margin: 28px 0 10px;
    padding-top: 8px;
    border-top: 1px solid #e8e3d6;
  }

  h3 {
    font-family: 'Georgia', serif;
    font-size: 16px;
    font-weight: normal;
    font-style: italic;
    color: #111;
    margin: 20px 0 8px;
  }

  /* Body text */
  p {
    margin-bottom: 10px;
    color: #2a2a2a;
  }

  strong { color: #111; }

  em { color: #444; }

  /* Lists */
  ul, ol {
    margin: 8px 0 12px 20px;
    color: #2a2a2a;
  }
  li { margin-bottom: 5px; }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0;
    font-family: 'Arial', sans-serif;
    font-size: 11.5px;
  }
  th {
    background: #1a1a1a;
    color: #fff;
    text-align: left;
    padding: 8px 10px;
    font-weight: 600;
    letter-spacing: 0.05em;
  }
  td {
    padding: 7px 10px;
    border-bottom: 1px solid #e8e3d6;
    vertical-align: top;
  }
  tr:nth-child(even) td { background: #fafaf7; }

  /* Score block — auto-detects the score heading */
  h2:first-of-type {
    font-size: 18px;
    letter-spacing: 0;
    text-transform: none;
    border-top: none;
    padding-top: 0;
    color: #111;
  }

  /* Callout boxes (blockquotes) */
  blockquote {
    border-left: 3px solid #c84e22;
    margin: 14px 0;
    padding: 10px 16px;
    background: #fafaf7;
    font-style: italic;
    color: #333;
  }

  /* Code */
  code {
    font-family: 'Courier New', monospace;
    font-size: 11px;
    background: #f3f0eb;
    padding: 1px 4px;
    border-radius: 2px;
    color: #c84e22;
  }

  /* Footer */
  .report-footer {
    margin-top: 40px;
    padding-top: 14px;
    border-top: 1px solid #e8e3d6;
    font-family: 'Arial', sans-serif;
    font-size: 10px;
    color: #aaa;
    letter-spacing: 0.08em;
    display: flex;
    justify-content: space-between;
  }

  /* Page break hints */
  h2 { page-break-before: auto; }
  h3 { page-break-after: avoid; }
  table { page-break-inside: avoid; }
</style>
</head>
<body>

<div class="report-header">
  <div class="brand">Everadam · GEO Readiness Report</div>
  <div class="meta">${domain}<br>${date}</div>
</div>

${body}

<div class="report-footer">
  <span>Everadam — everadam.com</span>
  <span>Confidential · prepared for ${domain}</span>
</div>

</body>
</html>`;
}
