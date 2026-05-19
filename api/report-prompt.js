/**
 * Builds the Claude prompt for automated GEO report generation.
 * Call buildReportPrompt(data) where data contains scraped website info.
 * The returned string goes directly into the Claude API as the user message.
 */

export function buildSystemPrompt() {
  return `You are an expert in Generative Engine Optimization (GEO) — the practice of making businesses appear in answers from ChatGPT, Claude, Perplexity, and Google AI Overviews.

Your job is to write a personalized GEO Readiness Report for a small business. The report is purchased for $20 and delivered as a PDF. It must be immediately actionable, honest, and specific to the business analyzed.

## Your knowledge base

**What AI systems actually look for (empirically verified):**

TECHNICAL SIGNALS (high impact):
- robots.txt must explicitly allow AI crawlers: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended
- Schema markup (JSON-LD): Organization/LocalBusiness sitewide, Service per page, FAQPage, Article, Person with sameAs links
- Server-Side Rendering: AI crawlers cannot execute JavaScript — CSR sites appear blank to them
- Page load speed: Perplexity aborts crawls after 2-3 seconds
- Sitemap.xml with honest lastmod dates + IndexNow API integration for Bing (= ChatGPT Search)

CONTENT SIGNALS (empirically measured, Princeton/Georgia Tech, ACM KDD 2024):
- Citing external sources: +115.1% visibility for lower-ranked pages
- Adding statistics with sources: +41% visibility
- Expert quotes in blockquotes: +28% visibility
- Keyword stuffing: -10% (actively harmful)
- Answer-First structure: 44.2% of all LLM citations come from the first 30% of text
- FAQ blocks with 5-10 real customer questions, 40-60 word answers + FAQPage schema
- H2 = question in natural language, H3 = sub-aspect
- One cited statistic per 150-200 words
- Paragraphs max 2-3 sentences, one idea each

EXTERNAL PRESENCE (dominant factor):
- 85% of AI brand mentions come from third-party domains (AirOps, 21,311 mentions)
- Brands in top quartile of web mentions get 10x more AI mentions than next quartile
- Priority platforms: Wikipedia/Wikidata, Reddit (46.7% of Perplexity top citations), YouTube, LinkedIn (top-5 citation domain for ChatGPT/Claude/Perplexity), Google Business Profile
- NAP consistency (Name, Address, Phone) must be word-identical across all platforms
- Review sentiment: ChatGPT-recommended businesses average 4.3 stars

PLATFORM DIFFERENCES:
- ChatGPT with search: uses Bing index → Bing Webmaster Tools setup is mandatory
- Claude: uses Brave Search (86.7% overlap with Brave organic results) → Bing optimization doesn't help for Claude
- Perplexity: real-time indexing, content <30 days gets 82% citation rate vs 37% for >90 days
- Google AI Overviews: 25% of all Google searches, follows classic SEO signals + brand mentions

## Report format rules

- Write in English (the report is for international business owners)
- Be specific and direct — no generic advice
- Every recommendation must be actionable within 30 days (unless noted as long-term)
- Use the actual domain name and niche throughout the report
- Score honestly — a bad score is more credible than a suspiciously good one
- Format as Markdown (will be converted to PDF)
- Total length: 1,200-1,800 words
- Do NOT include disclaimers, legal boilerplate, or generic introductions
- Start directly with the score and summary`;
}

export function buildReportPrompt(data) {
  const {
    domain,
    niche,
    robotsTxt,
    hasLlmsTxt,
    schemaTypes,
    hasFaqBlock,
    h1,
    h2s,
    hasStatistics,
    hasBlockquotes,
    hasDateModified,
    avgParagraphLength,
    hasLinkedIn,
    hasGoogleBusiness,
    hasWikidata,
    hasTrustpilot,
    pageLoadNote,
    homepageText,
    metaDescription,
  } = data;

  const robotsAnalysis = analyzeRobots(robotsTxt);
  const schemaAnalysis = analyzeSchema(schemaTypes);

  return `Generate a complete GEO Readiness Report for the following business.

---
BUSINESS DATA
Domain: ${domain}
Business niche / industry: ${niche || 'not specified — infer from homepage content'}

---
TECHNICAL SCAN RESULTS

robots.txt content:
${robotsTxt || '(not found or empty)'}

AI Crawler Status:
${robotsAnalysis}

llms.txt present: ${hasLlmsTxt ? 'Yes' : 'No'}
Page load: ${pageLoadNote || 'unknown'}

Schema markup types found on homepage: ${schemaTypes?.length ? schemaTypes.join(', ') : 'none detected'}
Schema analysis: ${schemaAnalysis}

---
CONTENT SCAN RESULTS

H1: ${h1 || 'not found'}
H2 headings found: ${h2s?.length ? h2s.slice(0, 8).join(' | ') : 'none'}

FAQ block present: ${hasFaqBlock ? 'Yes' : 'No'}
Statistics with sources: ${hasStatistics ? 'Yes (at least one found)' : 'No'}
Expert blockquotes: ${hasBlockquotes ? 'Yes' : 'No'}
Content dates visible / dateModified: ${hasDateModified ? 'Yes' : 'No'}
Average paragraph length: ${avgParagraphLength ? `~${avgParagraphLength} words` : 'unknown'}

Meta description: ${metaDescription || 'not found'}

Homepage text excerpt (first 800 chars):
${homepageText ? homepageText.slice(0, 800) : '(not available)'}

---
EXTERNAL PRESENCE

LinkedIn company page found: ${hasLinkedIn ? 'Yes' : 'No or not verified'}
Google Business Profile: ${hasGoogleBusiness ? 'Yes' : 'No or not verified'}
Wikidata entry: ${hasWikidata ? 'Yes' : 'No'}
Trustpilot listing: ${hasTrustpilot ? 'Yes' : 'No'}

---
YOUR TASK

Write the complete GEO Readiness Report using EXACTLY this structure:

# GEO Readiness Report: ${domain}

## Your AI Readiness Score: [X]/100

[One sentence on what the score means for this specific business and niche.]

## The Critical Gap

[2-3 sentences explaining the core problem — what is AI currently likely to say or not say about this business, and why. Be specific to their niche.]

## What We Found: 5 Priority Issues

[List exactly 5 issues, sorted highest to lowest impact. For each issue use this format:]

### [Issue number]. [Issue name] — [HIGH / MEDIUM / LOW] Impact

**What's missing:** [Specific finding from the scan]
**Why it matters:** [One sentence with the data/mechanism — reference real numbers from GEO research where applicable]
**Fix:** [Exact action to take, specific enough that a non-technical person can Google it or hand it to a developer]
**Time to implement:** [e.g., "30 minutes", "2-3 hours", "1 week"]

## Platform Breakdown

Brief table or list showing readiness for:
- ChatGPT (with Search)
- Claude
- Perplexity
- Google AI Overviews

For each: one sentence on current status + one sentence on biggest lever.

## Your 30-Day Action Plan

Week 1 — Foundation (do these first, highest impact per hour):
[3-4 specific tasks, numbered]

Week 2 — Content (restructure for AI extraction):
[3-4 specific tasks]

Week 3 — External Presence (where to get listed):
[3-4 specific tasks with specific platform names]

Week 4 — Momentum (what to do consistently going forward):
[2-3 ongoing habits]

## What Competitors Who Appear in AI Answers Do Differently

[3-4 sentences specific to the ${niche || 'business'} niche — what the businesses that get recommended have in common, based on GEO research patterns for this type of business.]

## Score Calculation

[Show how the score was calculated — list each category with the points awarded and why. Be transparent. Example: "robots.txt: 8/20 — 3 of 6 key AI crawlers are blocked"]

Categories (total 100 points):
- Technical foundation (robots.txt, schema, rendering): /30
- Content structure (FAQ, answer-first, stats, dates): /30
- External presence (LinkedIn, GBP, review platforms): /25
- Content quality signals (statistics, quotes, freshness): /15

---

Write the full report now. Be specific, honest, and use the domain name throughout.`;
}

function analyzeRobots(robotsTxt) {
  if (!robotsTxt) return 'No robots.txt found — crawler access status unknown, likely using default (allow all). This is actually fine for AI access, but a properly configured robots.txt is best practice.';

  const bots = [
    { name: 'GPTBot', label: 'ChatGPT Training' },
    { name: 'OAI-SearchBot', label: 'ChatGPT Search' },
    { name: 'ChatGPT-User', label: 'ChatGPT User Browsing' },
    { name: 'ClaudeBot', label: 'Claude Training' },
    { name: 'Claude-SearchBot', label: 'Claude Search' },
    { name: 'PerplexityBot', label: 'Perplexity' },
    { name: 'Google-Extended', label: 'Gemini/AI Overviews Training' },
  ];

  const txt = robotsTxt.toLowerCase();
  const blocked = [];
  const allowed = [];

  const hasWildcardDisallow = txt.includes('user-agent: *') && txt.includes('disallow: /');

  for (const bot of bots) {
    const botLower = bot.name.toLowerCase();
    if (hasWildcardDisallow && !txt.includes(`user-agent: ${botLower}`)) {
      blocked.push(`${bot.name} (${bot.label})`);
    } else if (txt.includes(`user-agent: ${botLower}`) && txt.includes('disallow: /')) {
      blocked.push(`${bot.name} (${bot.label})`);
    } else {
      allowed.push(bot.name);
    }
  }

  if (blocked.length === 0) return `All major AI crawlers appear to be allowed. ✓`;
  return `BLOCKED crawlers: ${blocked.join(', ')}. This is a critical issue — these bots cannot index the site.`;
}

function analyzeSchema(schemaTypes) {
  if (!schemaTypes || schemaTypes.length === 0) return 'No structured data found. Missing: Organization, LocalBusiness/ProfessionalService, FAQPage, Service, Person.';

  const important = ['Organization', 'LocalBusiness', 'ProfessionalService', 'FAQPage', 'Service', 'Person', 'Article', 'BlogPosting', 'AggregateRating'];
  const found = schemaTypes.map(s => s.toLowerCase());
  const missing = important.filter(t => !found.includes(t.toLowerCase()));

  return `Found: ${schemaTypes.join(', ')}. Missing high-value types: ${missing.length ? missing.join(', ') : 'none — good coverage'}.`;
}
