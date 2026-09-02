# DOS A Hero Media Lab — Investigation

Status: investigation only. Do not modify or merge the approved Ivette redesign from this branch until a hero direction is explicitly selected.

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

Strongest deck-native categories for hero/motion exploration:

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

## Hero concepts to prototype after source-image review

### A — Motion graphics from real stills

Use 4–6 selected real DOS A images. Animate only opacity, transform, crop, clip-path/masks, and subtle luminance treatments. Stop motion after ~6–8 seconds and settle on one image.

Goals:
- lightweight
- no invented project content
- no continuous distraction
- preserve Ivette copy/layout/CTA

### B — Hybrid

Use 4–5 real stills plus one very short real video moment (roughly 0.8–1.5 seconds) from verified DOS A footage. Then settle to a static frame.

The first video candidates are the immersive portions of `media2.mp4`; `media4.mp4` is useful for branded arrival/registration proof. `media1.mp4` is visually atmospheric but much too large as-is.

### C — Short real-video cut

Build a dedicated compressed 5–7 second silent hero derivative from the strongest real footage. Do not load the 33.7 MB repository reel or 316 MB PowerPoint source directly.

## DOS A brand animation to restore

Git history confirms the original hero mark had a one-time draw-on sequence:
- the three `bm-dos` paths fade sequentially
- the `bm-cable` path reveals afterward using clip-path
- reduced-motion users get the fully visible static mark

Restore the original behavior rather than inventing a new logo animation.

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
