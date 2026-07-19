# Scroll QA contract

## Seam
- Adjacent generated legs share frame-identical or visually verified handoff.
- No direction reversal at a seam.
- Test forward and reverse scrubbing.

## Usability
- Five-second message and CTAs render before cinematic readiness.
- No forced intro or wheel/touch trap.
- Navigation remains usable during sticky scenes.
- Quote and La Genio entry remain reachable with JS/video failure.

## Mobile
- Native portrait composition or explicitly designed simplified treatment.
- No production center-crop fallback presented as final mobile cinema.
- Test touch scroll, browser chrome resizing, portrait aspect changes, and lower-memory device behavior.

## Accessibility
- `prefers-reduced-motion` receives still/progressive content.
- Real proof images have useful alt text.
- Generated decorative cinema uses empty alt/appropriate presentation semantics.
- Text contrast and focus states are independent of background frame brightness.

## Performance
- Posters render before video decode.
- Only current/adjacent video segments are hot-loaded where possible.
- No autoplay audio.
- Avoid blocking LCP on full cinematic chain download.
