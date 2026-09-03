# DOS A Hero Media Lab — Investigation

Status: investigation and isolated prototype only. Do not modify or merge the approved Ivette redesign from this branch until a hero direction is explicitly selected.

## Preserved source state

- Parent redesign branch: `redesign/ivette-controlled-2026-09-02`
- Frozen parent SHA: `025068af73b0da9405d819491550af7b7a526b61`
- Existing emergency baseline remains `08024ec529e29c8274d7a7e764d837e0ddf25f53`
- Hero experiment branch: `experiment/hero-media-lab-2026-09-02`

## Verified source pools

### Original DOS A archive

Existing ICM asset manifest records:
- source archive: `DOSA audio.zip`
- 82 project photographs
- all source photographs recorded as 4000×2250 JPEG
- optimized derivatives should be generated from originals rather than enlarging current tiny WebP derivatives

### Original PowerPoint recovered and inspected

The full `DOSA audio.pptx` was recovered from the project/library and unpacked non-destructively.

Embedded media inventory:
- 129 media assets total
- 14 JPEG
- 2 JPG
- 47 PNG
- 54 TIFF
- 8 WDP
- 4 MP4
- embedded-media payload approximately 473 MB

The PowerPoint itself is not a replacement for the separately documented 4000×2250 source-photo archive: most embedded event images in the deck are around 720p–1280px wide, while one PNG is 3840×2160. Therefore, the best production path remains: use the original 4000×2250 source photographs where available; use deck media only where it is unique or where no higher-resolution original survives.

### Ivette/Vett Milo source email

Email subject: `FOTOS DOSA`

Linked source categories include:
- Quienes somos
- servicios
- ofrecemos
- diferencia
- clientes
- audiovisual
- branding
- stands
- renders

Do not represent concept renders as completed projects.

Some historical Drive links in this email are no longer readable through the current Drive connector, so the recovered PowerPoint and repository asset manifest are currently the reliable media sources.

### PowerPoint video inventory

The recovered deck contains four MP4 files:
- `media1.mp4` — 117.15s — ~316.68 MB — dark projection / architectural event sequence
- `media2.mp4` — 52.07s — ~6.69 MB — immersive Mobil LED/screen environment
- `media3.mp4` — 24.73s — ~4.83 MB — corporate/medical conference stage sequence
- `media4.mp4` — 22.79s — ~4.28 MB — Mobil registration / branded arrival environment

Repository video assets also include:
- `/videos/mobil-experience-reel-1080p.mp4` — ~33.7 MB
- `/videos/mobil-reveal-loop.mp4` — ~3.3 MB
- `/videos/mobil-reveal-poster.jpg`

The full reels should not be directly autoplayed as the homepage hero. If video is selected, cut a dedicated, silent, compressed derivative from selected source moments.

## Visual first-pass from recovered deck

### Tier A — immediate hero/motion candidates
- L'Oréal gala / corporate room (`image40.png`) — elegant scale, warm dark environment, strong negative space potential
- Mobil immersive venue (`image38.jpeg`) — strong colored architectural lighting and depth
- Mobil multi-screen experience (`image51.tiff`, `image52.tiff`, `image53.png`) — demonstrates LED/video scale clearly
- geometric LED/scenic wall (`image54.jpg`) — graphic, distinctive, strong for a masked transition
- corporate multi-screen stage (`image63.tiff`) — clean, premium, useful as a settling frame
- Mobil branded registration environment (`image82.tiff`, `image83.png`) — crisp brand/environment proof
- Mobil experiential entrance (`image84.tiff`, `image85.tiff`) — strong physical build + lighting proof
- El Universal illuminated display corridor (`image89.png`) — polished spatial depth and reflections
- Mobil dark lounge/entry (`image95.tiff`, `image96.tiff`) — strong low-light palette for hero text legibility

### Tier B — good supporting proof, less ideal as opening hero
- HILTI stage (`image42.tiff`)
- formal government conference (`image43.jpg`)
- event lighting room (`image48.tiff`, `image49.tiff`)
- branded installation / expo builds (`image70.tiff` onward)
- Abbott / exhibition stands (`image90.tiff`–`image99.tiff`)

### Avoid for hero
- low-resolution brand/logo graphics
- concept renders unless explicitly labeled as renders
- bright white expo-booth imagery as the first frame
- imagery dominated by text/signage that competes with Ivette's hero copy
- redundant near-duplicate frames

## Existing curated photo ranking from 4000×2250 archive

1. #35 — hero-scale — large integrated corporate/event environment with LED architecture
2. #20 — audio-video — wide multi-screen event environment
3. #17 — lighting — architectural/ambient conference lighting
4. #23 — creative-installation — geometric lighting installation
5. #54 — experiential-entry — circular interactive entrance installation
6. #62 — stand-exhibition — branded exhibition stand with AV integration
7. #36 — audience-proof — real audience facing large presentation environment
8. #26 — immersive-video — multi-screen scenic/video environment
9. #58 — digital-installation — freestanding digital display environment
10. #12 — conference-operations — formal technical conference setup

The next asset-recovery priority is to locate the original files corresponding to those ten ranked 4000×2250 photographs before spending money on enhancement.

## Collins-level prototype pass — completed locally, not wired into site

Three silent 1280×720 proof cuts were created from factual DOS A source material. These are evaluation artifacts only; they are not committed hero assets and do not change the website.

### A — Still Motion

Source sequence:
- `image40.png`
- `image51.tiff`
- `image54.jpg`
- `image85.tiff`
- `image95.tiff`

Motion language:
- slow 1.00→~1.05 camera push
- restrained saturation
- controlled luminance for white-copy legibility
- short dissolves / one dark transition
- movement resolves rather than looping indefinitely

Prototype weight: ~1.49 MB at 1280×720 H.264. This is only a proof encode; production still-motion would use image assets and browser transforms rather than shipping this video.

### B — Hybrid — current design favorite

Uses the same restrained real-still language plus one short genuine Mobil movement interval from `media2.mp4` around 34.4s.

Prototype weight: ~1.60 MB at 1280×720 H.264.

Why it currently leads:
- gives unmistakable real motion without turning the homepage into a showreel
- can preserve a calmer final hero state
- keeps DOS A's work factual
- provides more visual range than a single photograph
- can remain much lighter than a long autoplay reel

### C — Compact Real Video

Short real moments sampled from:
- `media1.mp4` around 61s
- `media2.mp4` around 27.2s
- `media3.mp4` around 15.7s
- `media4.mp4` around 5.8s

Prototype weight: ~1.62 MB at 1280×720 H.264.

This is useful as a benchmark but currently feels more like a montage/reel and less like the restrained editorial hero direction.

## Collins design rule for this hero

The hero should communicate capability before spectacle. The motion must have a single narrative job: reveal scale, AV craft, physical environments, and operational credibility; then get out of the way so Ivette's exact headline and CTA dominate.

Therefore:
- no infinite rapid slideshow
- no fake camera motion that materially changes the documented scene
- no decorative particles or generic SaaS animation
- no loud UI chrome over the work
- no copy animation that competes with the DOS A mark
- stop/settle after the opening sequence
- preserve a static poster for reduced motion, low bandwidth, and failure fallback

## DOS A brand animation to restore

Git history confirms the original hero mark had a one-time draw-on sequence:
- the three `bm-dos` paths fade sequentially
- the `bm-cable` path reveals afterward using clip-path
- reduced-motion users get the fully visible static mark

Restore the original behavior rather than inventing a new logo animation.

Recommended choreography if Hybrid B is selected:
1. media begins immediately under a dark readability treatment
2. Ivette hero copy remains stable/readable; do not turn the copy into a kinetic title sequence
3. media presents 4–5 controlled proof moments over roughly 6–7 seconds
4. DOS A mark uses the restored original fade/draw-on moment within the opening sequence
5. media resolves into a single strong static frame
6. all motion stops

## Restoration plan

For selected photographs:
1. recover original 4000×2250 source where possible
2. compare source against PowerPoint copy and current website derivative
3. correct exposure/color/contrast and remove compression artifacts conservatively
4. only upscale when actual source softness requires it
5. preserve faces/logos/equipment/signage exactly
6. export purpose-built AVIF/WebP desktop and mobile derivatives

Current Fal/Topaz precision option supports a high-fidelity, non-creative-first path. Default experiment should disable creative face reconstruction; any AI output must be compared side-by-side with the source before publication.

## Rules

- Ivette's approved hero copy remains word-for-word.
- Do not change hero layout, CTA, typography, navigation, or sections below the hero during media experimentation.
- Source imagery must remain factual; do not generatively invent stages, logos, faces, equipment, signage, or completed projects.
- Prefer original 4000×2250 files over existing ~10–14 KB derivatives.
- Conservative restoration first; generative restoration only if a selected original is genuinely unrecoverable and only after approval.
- Desktop and mobile media crops may be independently art-directed.
- `prefers-reduced-motion` must receive a stable static experience.

## Explicit future mobile note

The full Ivette government-proof sentence remains current. Only if rendered mobile QA proves it materially overcrowded may the compact variant be reconsidered:

`CONAHCYT · CONAVI · IFT · CONAPRED y dependencias del sector público`

No copy change is authorized by this note alone.
