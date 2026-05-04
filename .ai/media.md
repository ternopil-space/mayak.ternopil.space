# Media Guide

## Purpose

Media should support conversion and atmosphere without hurting performance.

## Image Rules

- prefer high-quality real business photos
- use images that show dishes, interior, exterior, and mood clearly
- avoid oversized assets
- keep hero images strong and relevant
- do not rely on decorative stock images when real visuals are available
- use Angular `NgOptimizedImage` for static image rendering when feasible
- follow the asset-path rule from `AGENTS.md`: reference the published site path, not the source folder path

## Performance

- keep LCP in mind for hero sections
- avoid heavy media on first load
- prefer modern optimized formats such as WebP or AVIF when supported by the asset pipeline
- lazy-load non-critical images where appropriate

## UX Rules

- images should support content, not replace it
- important text should stay as text
- avoid autoplay-heavy video unless requested
- avoid visually noisy galleries or sliders without clear value

## Accessibility

- provide useful alt text when the image carries meaning
- decorative images can use empty alt text when appropriate
