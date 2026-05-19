/**
 * POST /api/generate-report
 *
 * Called by the Stripe webhook after successful payment.
 * Flow: scrape domain → build prompt → Claude API → return Markdown report
 *
 * Required env vars:
 *   ANTHROPIC_API_KEY
 *
 * Body: { domain: string, email: string, niche?: string }
 * Returns: { markdown: string } or { error: string }
 */

import Anthropic from '@anthropic-ai/sdk';
import puppeteer from 'puppeteer';
import { buildSystemPrompt, buildReportPrompt } from './report-prompt.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { domain, email, niche } = req.body ?? {};
  if (!domain) return res.status(400).json({ error: 'domain required' });

  try {
    const markdown = await generateReport(domain, email, niche);
    return res.status(200).json({ markdown, domain, email });
  } catch (err) {
    console.error('[generate-report]', err.message);
    return res.status(500).json({ error: err.message });
  }
}

// Exported so stripe-webhook.js can call it directly
export async function generateReport(domain, email, niche) {
  const scraped = await scrapeDomain(domain);
  const prompt = buildReportPrompt({ domain, niche, ...scraped });

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const message = await anthropic.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 8000,
    system: buildSystemPrompt(),
    messages: [{ role: 'user', content: prompt }],
  });

  return message.content[0].text;
}

async function scrapeDomain(domain) {
  const base = domain.startsWith('http') ? domain : `https://${domain}`;
  const result = {};

  // --- robots.txt + llms.txt via fetch (static files, no JS needed) ---
  try {
    const r = await fetch(`${base}/robots.txt`, { signal: AbortSignal.timeout(5000) });
    result.robotsTxt = r.ok ? await r.text() : null;
  } catch {
    result.robotsTxt = null;
  }

  try {
    const r = await fetch(`${base}/llms.txt`, { signal: AbortSignal.timeout(4000) });
    result.hasLlmsTxt = r.ok;
  } catch {
    result.hasLlmsTxt = false;
  }

  // --- homepage via Puppeteer — renders JS (React, Next.js, Vue etc.) ---
  let html = '';
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (compatible; GEO-Scanner/1.0)');

    const start = Date.now();
    const response = await page.goto(base, { waitUntil: 'networkidle2', timeout: 15000 });
    const elapsed = Date.now() - start;

    result.pageLoadNote = elapsed > 3000
      ? `Slow — ${elapsed}ms (Perplexity may abort crawl)`
      : `${elapsed}ms — acceptable`;

    if (response && response.ok()) {
      html = await page.content(); // fully rendered HTML incl. JS output
    }
  } catch (e) {
    result.pageLoadNote = 'Timeout or connection refused';
  } finally {
    await browser.close();
  }

  if (html) {
    result.schemaTypes = extractSchemaTypes(html);
    result.hasFaqBlock = hasFaqBlock(html);
    result.h1 = extractTag(html, 'h1');
    result.h2s = extractAllTags(html, 'h2').slice(0, 10);
    result.hasStatistics = hasStatisticsPattern(html);
    result.hasBlockquotes = html.toLowerCase().includes('<blockquote');
    result.hasDateModified = html.toLowerCase().includes('datemodified') || html.toLowerCase().includes('last updated') || html.toLowerCase().includes('updated on');
    result.metaDescription = extractMeta(html, 'description');
    result.homepageText = stripHtml(html);
    result.avgParagraphLength = estimateAvgParagraphLength(html);
  }

  result.hasLinkedIn = html.includes('linkedin.com');
  result.hasGoogleBusiness = html.includes('g.page') || html.includes('maps.google') || html.includes('goo.gl/maps');
  result.hasWikidata = html.includes('wikidata.org');
  result.hasTrustpilot = html.includes('trustpilot.com');

  return result;
}

// --- HTML helpers ---

function extractSchemaTypes(html) {
  const types = [];
  const re = /"@type"\s*:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    if (!types.includes(m[1])) types.push(m[1]);
  }
  return types;
}

function hasFaqBlock(html) {
  const lower = html.toLowerCase();
  return lower.includes('faq') || lower.includes('frequently asked') || lower.includes('@type":"faqpage') || lower.includes('"faqpage"');
}

function extractTag(html, tag) {
  const m = html.match(new RegExp(`<${tag}[^>]*>([^<]+)</${tag}>`, 'i'));
  return m ? m[1].trim() : null;
}

function extractAllTags(html, tag) {
  const results = [];
  const re = new RegExp(`<${tag}[^>]*>([^<]+)</${tag}>`, 'gi');
  let m;
  while ((m = re.exec(html)) !== null) results.push(m[1].trim());
  return results;
}

function extractMeta(html, name) {
  const m = html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i'))
    || html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`, 'i'));
  return m ? m[1].trim() : null;
}

function hasStatisticsPattern(html) {
  // look for percentage or number patterns near citation-like words
  return /\d+\s*%|\d{4}\s*(study|report|survey|research|source)/i.test(html);
}

function estimateAvgParagraphLength(html) {
  const paras = html.match(/<p[^>]*>([^<]{20,})<\/p>/gi) || [];
  if (!paras.length) return null;
  const wordCounts = paras.map(p => stripHtml(p).split(/\s+/).length);
  return Math.round(wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length);
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
