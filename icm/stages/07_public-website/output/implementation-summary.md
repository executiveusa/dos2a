# Stage 07 — Public website implementation summary

## Built
- Replaced the forced legacy intro with immediate five-second orientation.
- Canonical public brand is `dos A` with `audio · iluminación · video`.
- Added Spanish-first / English-parity public navigation and content.
- Added `/servicios`, `/eventos`, `/portafolio`, `/blog`, `/cotizar`.
- Redirected legacy public `/chat` to the honest La Genio/quote entry rather than exposing BYOK provider configuration.
- Added a curated real-project scroll journey with desktop sticky progression, mobile proof flow, and reduced-motion fallback.
- Added sitemap/robots and canonical SEO metadata.
- Reworked lead submission semantics: UI reports success only after the configured API returns success. Mailto fallback is presented honestly as a fallback, not a successful submission.
- Added deterministic public-web CI for build, critical-route smoke, legacy-chat absence, mobile/reduced-motion rules, and curated media rewrite availability.

## Media
Stage 07 uses the five loaded curated real-project images (#35, #20, #17, #62, #54) through stable local application paths. The current backing object URLs are temporary provider storage and must move to owner-controlled storage during media/security/production hardening. The path abstraction prevents page components from depending directly on those provider URLs.

## La Genio truth
The public site does not fake a live governed AI assistant. `/cotizar#la-genio` explains the natural-language event-brief pattern while Stage 09 builds and security-tests the public concierge.

## Deferred by design
- Generated Scroll World video chain: Stage 05 design is locked; paid generation remains gated by live cost/access receipt and does not block the real-photo public journey.
- Full visual/taste matrix across physical browsers/devices: Stage 16 is the dedicated independent desktop/mobile QA gate. Stage 07 establishes responsive/reduced-motion implementation and deterministic structural checks.
- Real owner-server lead persistence: Stage 08 builds/tests the revenue circuit; production connection remains deferred.
