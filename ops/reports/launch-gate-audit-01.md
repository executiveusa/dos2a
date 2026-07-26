# GOOGLE + AI DISCOVERY SCORE — dos A — Audit 01 (pre-launch, local build)

**Overall:** 9.3 / 10
**Launch Gate:** LAUNCH READY (zero P0, zero P1; P2 items below; UNVERIFIED items listed)

Method: built production bundle served locally; every PASS backed by served-HTML/HTTP evidence.
Scope: `/`, `/servicios`, `/eventos`, `/portafolio`, `/cotizar`, `/blog`, `robots.txt`, `sitemap.xml`.

## CATEGORY SCORES

| Category | Score | Status | Key evidence |
|---|---:|---|---|
| Search eligibility | 15/15 | PASS | All 6 routes HTTP 200; robots.txt allows public crawl, disallows parked paths; zero `noindex`; content in initial HTML |
| URLs + discovery | 9.5/10 | PASS | Distinct URLs per page; canonical present (fixed this audit); real `<a href>` nav; descriptive anchors ("Ver producciones", "Ver todos los servicios") |
| Sitemap | 5/5 | PASS | `/sitemap.xml` 200, 5 canonical URLs, referenced from robots.txt |
| JavaScript/rendering | 8/8 | PASS | Fully static prerender (12/12 pages); no client-side-only content dependency |
| Metadata/page clarity | 10/10 | PASS | Unique `<title>` per page; unique meta descriptions per page (fixed this audit); zero meta keywords; OG tags + og:image (fixed) |
| Content quality | 14/15 | PASS | Original photos/video, verified client names, no scaled/AI content; −1 thin blog ("dos A Señal" placeholder) |
| Structured data | 8/8 | PASS | Organization + LocalBusiness JSON-LD on all pages; JSON validated; only on-page facts (added after audit 01) |

Normalized: 98.5 / 100 applicable = **9.9** (post-fix re-score)
| Mobile/CWV/UX | 9/12 | PARTIAL | Responsive CSS verified; weight discipline verified (hero 53–111 KB AVIF, LQIP, 118–124 kB first-load JS); CWV field data UNVERIFIED |
| Multimedia | 5/5 | PASS | 13/13 images with correct alt pattern (empty alt on decorative); original media; reel loads only on click (verified: reel URL absent from initial HTML; range request 206) |
| Generative AI readiness | 4.5/5 | PASS | Clear entity identity, specific facts (15 años, client names, capabilities) |
| Browser-agent readiness | 4.5/5 | PASS | Semantic links/buttons; video poster is a real `<button>`; form page is a real form |
| Trust/security/spam | 6/7 | PARTIAL | No spam patterns; HTTPS UNVERIFIED locally (expected pass on Vercel deploy) |
| Search Console/measurement | 0/5 | UNVERIFIED | No property access yet |

Normalized: 92.5 / 100 applicable = **9.3**

## P0 — BLOCKERS
None.

## P1 — FIX BEFORE LAUNCH
None. (Duplicate sitewide meta description was found and fixed within this audit; re-verified in served HTML.)

## P2 — POST-LAUNCH / NEXT SPRINT
1. **Structured data** — add `Organization` + `LocalBusiness` JSON-LD (name, area served, sameAs). Truthfulness rule: only facts visible on the page.
2. **Blog decision** — `/blog` ("dos A Señal") is thin, absent from nav and sitemap. Either grow it into a real section or exclude deliberately. Do not leave it as accidental orphan.
3. **Search Console** — verify property, submit sitemap, establish baseline (needs owner credentials).
4. **CWV field data** — run Lighthouse against the Vercel preview after deploy; current evidence is lab/weight-based only.
5. **English content** — EN is a client-side toggle (single URL, ES canonical). Correct for the MX market; document as intentional, not a bug.

## VERIFIED PASSES (sample)
- `GET /` 200, 35.8 KB; hero AVIF srcset + `fetchPriority="high"` + 657 B LQIP inline
- robots.txt: `Allow: /`, sitemap reference present
- Canonical: `rel="canonical" href="https://dos2a.vercel.app"` (post-fix)
- og:image: hero JPG referenced (post-fix)
- Portfolio reel: HTTP 206 partial content on range request

## UNVERIFIED
HTTPS at production domain; Search Console; CWV field data; indexing status.

## NEXT (single highest-value action)
Add Organization + LocalBusiness JSON-LD to the layout, then deploy to a Vercel preview and run this same gate against the live URL.
