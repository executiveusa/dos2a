# Motion policy

## Purpose test
Every motion effect must do at least one:
- show scale or spatial relationship;
- guide attention to proof;
- communicate transition between production disciplines;
- clarify system status/action.

If it only says “this site is fancy,” remove it.

## Public cinematic motion
- Scroll controls pre-rendered cinematic time/progress; it does not hijack or replace normal document scrolling.
- No forced intro.
- No long loader before primary message/CTA.
- No essential text baked into video.
- Maximum 2 sticky/pinned narrative zones visible in the DOM flow at once.
- Avoid more than ~1.5 viewport heights of forced dwell before the user reaches meaningful new information.
- Do not use mobile `background-attachment: fixed`.

## Micro motion
Use transform/opacity for UI transitions where possible.
- nav reveal: 160–240ms
- button feedback: 120–180ms
- card/image reveal: 250–450ms
- avoid springy overshoot on business-critical controls

## Reduced motion
When `prefers-reduced-motion: reduce`:
- do not scrub cinematic video from scroll;
- show selected real project stills/posters;
- use instant state changes or short opacity transitions;
- preserve full story, headings, proof, navigation, and CTAs.

## Performance
- motion cannot block LCP;
- poster/first real proof image precedes background video download;
- pause offscreen media;
- only current/adjacent cinematic segments should remain eagerly decoded where practical;
- do not animate layout properties continuously.

## Owner console
No cinematic scrolling in owner/admin surfaces. Use motion only for feedback, state change, and orientation.
