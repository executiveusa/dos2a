# GOOGLE + AI DISCOVERY SCORE — dos A — Audit 01 (pre-launch, local build, post-fix state)

**Overall:** 9.4 / 10 (98.5 / 105 applicable points; Search Console category excluded — no property access yet)
**Launch Gate:** LAUNCH READY (zero P0, zero P1; P2 items below; UNVERIFIED items listed)

Method: built production bundle served locally; every PASS backed by served-HTML/HTTP evidence.
Scope: `/`, `/servicios`, `/eventos`, `/portafolio`, `/cotizar`, `/blog`, `robots.txt`, `sitemap.xml`.
Rounding rule: applicable points / applicable max × 10, one decimal. Categories with no access (Search Console) are excluded from both numerator and denominator, never scored as zero.

## CATEGORY SCORES

| Category | Score | Status | Key evidence |
|---|---:|---|---|
| Search eligibility | 15/15 | PASS | All 6 routes HTTP 200; robots.txt allows public crawl, disallows parked paths; zero `noindex`; content in initial HTML |
| URLs + discovery | 9.5/10 | PASS | Distinct URLs per page; canonical present (fixed this audit; per-route canonicals added in PR review); real `<a href>` nav; descriptive anchors ("Ver producciones", "Ver todos los servicios") |
| Sitemap | 5/5 | PASS | `/sitemap.xml` 200, 5 canonical URLs, referenced from robots.txt |
| JavaScript/rendering | 8/8 | PASS | Fully static prerender (12/12 pages); no client-side-only content dependency |
| Metadata/page clarity | 10/10 | PASS | Unique `<title>` per page; unique meta descriptions per page (fixed this audit); zero meta keywords; OG tags + og:image (fixed) |
| Content quality | 14/15 | PASS | Original photos/video, verified client names, no scaled/AI content; −1 thin blog ("dos A Señal" placeholder) |
| Structured data | 8/8 | PASS | Organization + LocalBusiness JSON-LD on all pages; JSON validated; only on-page facts |
| Mobile/CWV/UX | 9/12 | PARTIAL | Responsive CSS verified; weight discipline verified (hero 53–111 KB AVIF, LQIP, 118–124 kB first-load JS); CWV field data UNVERIFIED |
| Multimedia | 5/5 | PASS | 13/13 images with correct alt pattern (empty alt on decorative); original media; reel loads only on click (verified: reel URL absent from initial HTML; range request 206) |
| Generative AI readiness | 4.5/5 | PASS | Clear entity identity, specific facts (15 años owner-confirmed, client names, capabilities) |
| Browser-agent readiness | 4.5/5 | PASS | Semantic links/buttons; video poster is a real `<button>`; form page is a real form |
| Trust/security/spam | 6/7 | PARTIAL | No spam patterns; HTTPS UNVERIFIED locally (expected pass on Vercel deploy) |
| Search Console/measurement | —/5 | EXCLUDED | No property access yet; excluded from score per rounding rule |

**Applicable total: 98.5 / 105 → 98.5 ÷ 105 × 10 = 9.38 → 9.4 / 10**

## P0 — BLOCKERS
None.

## P1 — FIX BEFORE LAUNCH
None. (Duplicate sitewide meta description and sitewide shared canonical were found and fixed; per-route canonicals added during PR #25 review; re-verified in served HTML.)

## P2 — POST-LAUNCH / NEXT SPRINT
1. **Blog decision** — `/blog` ("dos A Señal") is thin, absent from nav and sitemap. Either grow it into a real section or exclude deliberately. Do not leave it as accidental orphan.
2. **Search Console** — verify property, submit sitemap, establish baseline (needs owner credentials).
3. **CWV field data** — run Lighthouse against the Vercel preview after deploy; current evidence is lab/weight-based only.
4. **English content** — EN is a client-side toggle (single URL, ES canonical). Correct for the MX market; document as intentional, not a bug.

## VERIFIED PASSES (sample)
- `GET /` 200, 35.8 KB; hero AVIF srcset + `fetchPriority="high"` + 657 B LQIP inline
- robots.txt: `Allow: /`, sitemap reference present
- Canonical: per-route `rel="canonical"` on `/`, `/servicios`, `/eventos`, `/portafolio`, `/cotizar`
- og:image: hero JPG referenced
- Structured data: Organization + LocalBusiness JSON-LD validated in served HTML
- Portfolio reel: HTTP 206 partial content on range request

## UNVERIFIED
HTTPS at production domain; Search Console; CWV field data; indexing status.

## NEXT (single highest-value action)
Run Lighthouse against the live Vercel preview to replace lab/weight-based CWV evidence with measured data, then have the owner verify the Search Console property and submit the sitemap.
