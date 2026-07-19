# Media generation plan

## Provider-neutral rule
The Scroll World seam method is mandatory; the specific provider is replaceable. A video model qualifies only if it can accept a start frame and preserve frame continuity. For connector-style generations, it must also support an end frame.

## Current validated Fal option
Live Fal catalog/schema inspection during Stage 05 confirms:
- `bytedance/seedance-2.0/image-to-video` accepts `image_url`, optional `end_image_url`, 16:9 and 9:16, 4–15 second duration, 480p/720p/1080p/4k options.
- `bytedance/seedance-2.0/mini/image-to-video` accepts the same start/end-frame pattern at 480p/720p.

Use **Mini** for previz only, then the full model for approved final legs when spend/provider access is authorized and verified. Do not mix model families mid-chain unless recovering a single failed clip is explicitly accepted.

## Generation strategy
1. Do not generate all six scenes blindly.
2. Create one desktop proof-of-method leg and one mobile proof-of-method leg from approved visual direction.
3. Verify realism, camera grammar, no invented logos/text, frame handoff, scrub behavior, and mobile composition.
4. Only then render the full draft chain.
5. Extract each leg’s actual final frame and use it as the next leg’s start image.
6. Review the final second of every leg before spending on the next one; it must settle into a usable forward drift.
7. Render final chain only after draft-chain approval.
8. Encode web delivery copies separately; keep generation masters.

## Prompt preamble
Reuse a byte-stable style preamble across the chain:

`Grounded cinematic realism for a premium technical event-production company in Mexico. Contemporary corporate and experiential event environments at true human scale. Real materials, physically plausible lighting, precise technical detailing, restrained premium art direction, documentary credibility, no futuristic fantasy, no miniature/diorama look, no fake brand logos, no text or letters in the image. Camera movement feels like a professional steadicam/crane operator, smooth and physically plausible. Final second settles into a slow steady forward drift toward the next destination.`

Each scene appends only its environment, subject, and mid-leg move.

## Proof integration
Generated scenes do not replace the selected real photographs. The implementation must visibly distinguish:
- cinematic background/transition;
- verified real project proof.

## Cost and authority gate
Before any batch paid generation:
- query live model pricing;
- calculate the number of desktop/mobile generations and expected re-roll headroom;
- record the estimate in an ops receipt;
- confirm available provider balance/access;
- do not start an uncontrolled batch when financial authority or balance is unclear.

## Fallback
If video generation is unavailable, the page still ships a cinematic still-based scroll experience using verified project photography, GSAP transforms, depth layers, and reduced-motion-safe transitions. The revenue journey must never wait on a media provider.
