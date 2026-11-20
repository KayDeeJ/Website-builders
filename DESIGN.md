---
version: alpha
name: Website Builders
description: A midnight-plum night sky with a coral horizon. Warm soft-serif display type (Fraunces) over a clean grotesk (Geist), coral used as light rather than paint, and one cream surface per page for contrast.

colors:
  coral: "#FF6B5B"
  coral-soft: "#FF9E91"
  coral-deep: "#C93A2D"   # coral for text on cream (AA)
  plum: "#2E1A36"
  plum-900: "#1F1026"     # cards on dark
  plum-deep: "#140A18"    # page ground
  plum-muted: "#B49ABD"   # secondary text on dark
  cream: "#FFF4EF"

typography:
  display:
    fontFamily: Fraunces Variable (SOFT 100, opsz 144)
    fontSize: clamp(2.75rem, 7.5vw, 6rem)
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: -0.03em
  heading:
    fontFamily: Fraunces Variable
    fontSize: clamp(2.25rem, 5vw, 4rem)
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: -0.03em
  body:
    fontFamily: Geist Variable
    fontSize: 18px
    lineHeight: 1.6
  code:
    fontFamily: ui-monospace
    fontSize: 13px

rounded:
  control: 14px
  card: 16px
  panel: 24px
---

## Principles
- **Coral is light, not paint.** It shows up as a rim, a glow, a spotlight, a travelling star or one italic word per heading. Large coral fills are kept to the primary utility control.
- **One accent word per heading,** set in Fraunces italic coral (`coral-deep` on cream).
- **Dark by default,** with one cream panel per page as the contrast beat.
- **Numbers are true.** Counts are measured from the code at build time, never invented.

## Motion
- Lenis smooth scroll drives GSAP's ticker; both are off under `prefers-reduced-motion`.
- The hero enters once on load (SplitText headline, BlurText subtitle, the eclipse rising).
- One scroll moment per page: the setup panel opens from an inset window (clip-path, scrubbed).
- Hover: cards lift 2px, links draw an underline, StarBorder laps on hover.

## Components
React Bits in `src/components/` (palette in `src/lib/brand.ts`), page parts in `src/components/site/`.
