export const isValidUrl = (s) =>
  /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/i.test((s || '').trim());

export const isValidEmail = (s) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((s || '').trim());

export const cleanDomain = (s) => {
  if (!s) return '';
  return s.trim()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '')
    .toLowerCase();
};

export function hashDomain(s) {
  let h = 0;
  const v = (s || '').toLowerCase();
  for (let i = 0; i < v.length; i++) h = ((h << 5) - h + v.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const ALL_ISSUES = [
  { sev: 'high', area: 'Clear company info',   text: (d) => `On ${d}, your location, category, and what you sell aren't easy for AI to pick up.`,                                            fix: 'Setup' },
  { sev: 'high', area: 'What you actually do', text: ()  => `Your homepage talks about three different things at once. AI tools have a hard time deciding what your company is known for.`,  fix: 'Setup' },
  { sev: 'high', area: 'Buyer questions',      text: ()  => `Only about 1 in 6 of the questions buyers actually ask are answered clearly on your site.`,                                      fix: 'Setup' },
  { sev: 'high', area: 'AI-readable tags',     text: ()  => `Your site is missing the simple behind-the-scenes tags AI uses to understand companies, services, and FAQs.`,                    fix: 'Setup' },
  { sev: 'med',  area: 'AI crawler access',    text: ()  => `AI crawlers can reach your site, but they're missing hints about which pages matter most.`,                                       fix: 'Setup' },
  { sev: 'med',  area: 'Brand consistency',    text: ()  => `Your brand name and details show up a little differently across pages, footers, and metadata.`,                                  fix: 'Setup' },
  { sev: 'med',  area: 'Page connections',     text: ()  => `Your most important service pages are buried — they take more than 2 clicks to reach from your homepage.`,                       fix: 'Setup' },
  { sev: 'med',  area: 'About-page depth',     text: ()  => `Your About page is short on the kind of detail (team, story, expertise) AI uses to trust a company.`,                            fix: 'Setup' },
  { sev: 'low',  area: 'Page speed',           text: ()  => `Speed is generally fine — one page (pricing) could load a bit faster.`,                                                          fix: 'Optional' },
];

export function buildReport(domain) {
  const d = cleanDomain(domain) || 'yourcompany.com';
  const h = hashDomain(d);
  const score = 38 + (h % 17);
  const count = 6 + (h % 3);
  const high = ALL_ISSUES.filter(i => i.sev === 'high');
  const rest = ALL_ISSUES.filter(i => i.sev !== 'high');
  const startIdx = h % rest.length;
  const picked = [];
  for (let i = 0; i < count - high.length; i++) {
    picked.push(rest[(startIdx + i) % rest.length]);
  }
  const sevOrder = { high: 0, med: 1, low: 2 };
  const issues = [...high, ...picked]
    .sort((a, b) => sevOrder[a.sev] - sevOrder[b.sev])
    .map(i => ({ ...i, text: i.text(d) }));
  return { score, issues, highCount: high.length, totalCount: issues.length };
}
