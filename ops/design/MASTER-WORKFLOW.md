# MASTER WORKFLOW — No-Slop Cinematic Website Design (dos A)

> Operating checklist for designing and shipping websites that are cinematic AND usable.
> Sources of law, in precedence order: AGENTS.md / EMERALD_TABLETS → V.I.B.E. → this workflow.
> Component sources fused here: Steve Krug (usability), stop-slop (prose), A2A Google+AI Launch Gate (SEO), Efimov Audio (taste ceiling), Core Web Vitals (performance cage), musepool (anti-default inspiration).

**Launch bar: score ≥ 8.5/10 on the A2A gate with ZERO P0 blockers, plus human SHIP approval.**

---

## PHASE 0 — TRUTH BASELINE (V.I.B.E.)

- [ ] Verify every README / deck / handoff claim against the actual repo and deployed site before relying on it.
- [ ] Inventory what exists: pages, assets, media, clients, copy. Nothing enters the design that isn't in this inventory.
- [ ] Write down the current site URL, stack, and canonical app directory. Never touch parked experiments.

## PHASE 1 — STRATEGY (answer before any pixel)

- [ ] **Primary audience named** (one). For dos A: corporate/government event decision-maker. Concerts = prestige proof, social events demoted.
- [ ] **5-second test sentence written**: who you are, what you do, why trust you, what to do next — readable in 5 seconds on the hero.
- [ ] **One conversion goal per page.** For dos A: "Solicita cotización." No competing primary CTA.
- [ ] Brand rules enforced: public brand is `dos A` only, tagline `audio · iluminación · video`. Old marks (AVM/DOS2A/D2A) never public.

## PHASE 2 — ASSET TRUTH (the anti-slop media law)

- [ ] **Image-to-content manifest**: every image on the site maps to a real service, real event, or real client. No stock, no AI-redrawn logos, no invented clients.
- [ ] Client names shown must be verified against source material (dos A client wall: Coca-Cola, ExxonMobil, Chevron, J.P. Morgan, L'Oréal, CONACYT, CONAVI, IFT, CONAPRED, Viajes El Corte Inglés, El Mundo Es Tuyo).
- [ ] Media quality audit: every hero/candidate asset inspected at full size, resolution recorded, restoration path chosen.
- [ ] Exclusion list honored (e.g., assets carrying old branding).

## PHASE 3 — INSPIRATION (kill the AI default look)

- [ ] Run **musepool** broad recall across 2–3 dimensions (layout / color / motion / typography) BEFORE fixing any palette, type, or layout decision. High temperature for brand work.
- [ ] Fetch at most 3 seeds + key dimensional references. Identify ONE wow moment; borrow its concrete constraints.
- [ ] Colors come from references or brand — never from model defaults. No blue-purple gradients, no glassmorphism, no icon-in-rounded-square, no card-in-card nesting.
- [ ] Efimov Audio = taste ceiling reference, not clone target.

## PHASE 4 — COPY (stop-slop gate)

Source: github.com/hardikpandya/stop-slop — activated for this build.

- [ ] No throat-clearing openers, emphasis crutches, business jargon, vague declaratives, meta-commentary.
- [ ] No binary contrasts ("not X, but Y"), negative listings, dramatic fragmentation, rhetorical setups, passive voice.
- [ ] Active voice required. No lazy extremes. Cut anything cuttable.
- [ ] Score every public text block 1–10 on: Directness, Rhythm, Trust, Authenticity, Density. **Below 35/50: revise.**
- [ ] Spanish copy gets the same gate. Write for the reader, not for search phrases. No keyword stuffing, ever.

## PHASE 5 — DESIGN LAWS (Krug + cinematic restraint)

- [ ] **Billboard law**: every page reads as a billboard at highway speed — clear hierarchy, obvious page topic.
- [ ] **Scanning, not reading**: design for scanners — headings, short blocks, visible keywords.
- [ ] **Conventions are friends**: nav where nav lives, logo top-left links home, links look clickable.
- [ ] **Mindless choices**: every click is obvious; zero questions raised per decision.
- [ ] **Omit needless words**: cut happy talk and instructions; half the word count, then half again.
- [ ] **One cinematic signature per viewport** (e.g., cable-A draw-on once, then still). Restraint = expensive. Reduced-motion users get static equivalents, always.
- [ ] Essential info never hidden behind scroll-jacking, hover, or motion.

## PHASE 6 — BUILD VERIFICATION (shift feedback left)

- [ ] Responsive images: srcset (1280/1920/2560w), AVIF + WebP, `fetchpriority=high` on LCP image only. Design for the viewport, not the spec sheet.
- [ ] Budget: **LCP ≤ 2.5s, INP < 200ms, CLS < 0.1** — measured, not assumed.
- [ ] Semantic HTML: real `<a>`, `<button>`, `<label>`; accessibility tree makes sense (browser-agent readiness).
- [ ] Run cheapest checks first: format → lint → typecheck → tests → build → browser smoke on critical journeys.
- [ ] Mobile = same essential content as desktop (mobile-first indexing).

## PHASE 7 — LAUNCH GATE (ops/seo/google-ai-launch-gate.txt)

- [ ] Run the full A2A Google + AI gate against the deployed candidate. Evidence required for every PASS; UNVERIFIED never counts as PASS.
- [ ] Categories: search eligibility (15) / URLs+discovery (10) / sitemap (5) / JS rendering (8) / metadata (10) / content quality (15) / structured data (8) / mobile+CWV (12) / multimedia (5) / gen-AI readiness (5) / browser-agent (5) / trust+spam (7) / Search Console (5) + conditional modules.
- [ ] **DO-NOT-SCORE myths**: llms.txt, meta keywords, keyword density, word counts, third-party "Domain Authority", Lighthouse 100 as proof, page-count.
- [ ] Hard caps apply (site down → max 3.0; render failure → max 4.0; mobile content mismatch → max 6.0). Beauty never overrides a technical blocker.
- [ ] Score ≥ 8.5, zero P0 → human approves SHIP. Builder never self-approves.

## PHASE 8 — POST-LAUNCH

- [ ] Verify deployed reality: routes, hero LCP, forms submit, structured data validates, rollback receipt exists (ops/rollback/).
- [ ] Search Console baseline when access exists. Never claim guaranteed indexing/ranking.
- [ ] Write the phase report: DECISION / CHANGES / PROOF / STATUS / COMMERCIAL IMPACT / RISKS / ROLLBACK / OWNERSHIP INVENTORY / NEXT.

---

## AFTER dos A SHIPS — THE MASTER SKILL

Distill this workflow + all verified lessons into one saved design skill (working name: `sovereign-web-design`), so every future site starts at this level instead of rebuilding the knowledge.
