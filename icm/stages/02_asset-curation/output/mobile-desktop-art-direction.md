# Desktop + mobile art direction

## Desktop
- Cinematic canvas: 16:9 or wider.
- Use #35, #20, #36 for scale and depth.
- Keep subjects away from persistent navigation/CTA safe zones.
- Text remains HTML, not baked into generated imagery.
- Prefer continuous forward motion and realistic spatial connectors over miniature/toy transitions.

## Mobile
Mobile is not a center crop of desktop.

For each cinematic scene choose one:
1. native 9:16 generated/edited chain based on the same real reference;
2. separate portrait crop with manually chosen focal point;
3. simplified static/short-motion treatment when full parallax would damage clarity/performance.

### Focal guidance
- #35: preserve the main LED/stage architecture; avoid crop that becomes mostly empty seating.
- #20: center the screen/stage relationship; retain enough room context to show scale.
- #17: preserve the projection screen plus colored room lighting.
- #23: portrait crop may isolate one high-contrast geometric element; do not crop into unreadable fragments.
- #54: circular portal must remain complete or nearly complete.
- #62: preserve stand architecture and enough surrounding floor to communicate exhibition scale.
- #36: preserve audience foreground plus main screen.
- #26: preserve at least two screen surfaces to communicate immersive width.
- #58: choose one main digital tower plus reflected environment; avoid tiny illegible screen text.
- #12: preserve meeting-table foreground and institutional stage/screen context.

## Performance derivative contract
- Never serve the original 4000x2250 JPEG as the default responsive asset.
- Produce WebP/AVIF derivatives appropriate to rendered size.
- Hero/scene still target: ≤ 250 KB where visual quality permits.
- Portfolio thumbnails target: ≤ 120 KB where visual quality permits.
- Use explicit width/height/aspect ratio to avoid layout shift.
- Lazy-load below-fold proof imagery; preload only the actual first visible hero/scene asset.

## Reduced motion
The story, proof, CTA, quote path, and La Genio entry remain fully understandable with motion disabled. Reduced-motion users receive still transitions or simple opacity/transform changes only.
