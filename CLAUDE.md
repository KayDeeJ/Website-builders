# Website Builders

This repo holds the **Union Motor Trade** website (the dealer-backed marketplace for private car sellers and buyers).

## Design skills (project-level, in `.claude/skills/`)
- `design-taste-frontend` — Leonxlnx/taste-skill
- `web-design-guidelines` — vercel-labs/agent-skills
- `impeccable` — pbakaus/impeccable

Versions are pinned in `skills-lock.json`.

## Reference material
`reference/awesome-design-md/` holds VoltAgent/awesome-design-md for **reference only**.
Learn from its structure and principles; never copy any brand's design, colors, type or identity.

## Animation
- `gsap` for animation/timelines, `lenis` for smooth scrolling (both in `package.json`).
- Respect `prefers-reduced-motion`.

## Components
Where they fit, adapt components from:
- React Bits — https://reactbits.dev
- 21st.dev — https://21st.dev

These are copy-in/CLI registries: add individual components as needed (e.g. via their shadcn-style
`npx shadcn@latest add <url>` command) rather than installing a package. Restyle them to the project's own design.

## Tooling
Playwright MCP is configured at project scope in `.mcp.json` for browser checks and screenshots.

## Stack
Vite + React 19 + TypeScript, Tailwind CSS v4 (theme + utilities only, no preflight), alias `@/` → `src/`.
`npm run dev` / `npm run build`.

## How the site is built (staged rebuild)
- `src/umt/App.tsx` renders every screen once. The original site logic, `src/umt/engine/engine.js`, loads as a
  classic script after that first render, routes on the URL hash (`#sell`, `#buy`, `#car-3`) by toggling each
  `.view`'s `hidden` attribute, and fills the engine-built screens.
- **Never re-render engine-owned DOM.** App and the screen components hold no state. Keep every id and class in the
  markup: they are the engine's hooks.
- `src/umt/views/`: public screens upgraded with React Bits (home, sell, buy, hot deals, packages, how it works,
  fees, protection, legal, "no longer available").
- `src/umt/markup/`: shell and engine-built screens, generated from the original markup (car page, profile,
  part-exchange, revenue, pay, ID, finance, delivery, settings, help, refer). Port these one by one: move a screen's
  rendering out of the engine into a React component, then delete that code from the engine.
- `src/umt/ui.tsx`: Headline (SplitText), CoralButton (StarBorder), Spot (SpotlightCard in site colours), Reveal
  (AnimatedContent). Animated parts remount when their screen is shown (`useShownKey`), since screens start hidden.
- `src/umt/legacy.css`: the original stylesheet. `src/index.css`: fonts and the upgrade layer.
- Seller tiers: the engine's `tierUp()` plays the tier celebration when a sale contract is signed (styles in
  `src/umt/tierup.css`). This matches the live site's version, built in another session.
- Home hero: `src/umt/KeyHandover.tsx`, an original SVG + GSAP illustration of keys being handed over in front of a
  badge-free hatchback; the car unlocks. `src/umt/Intro.tsx` (first visit), `src/umt/cinema.ts` (curtain and car
  morph), `src/umt/tactile.ts` (magnetic buttons, View lens, glare, counting prices), `src/umt/views/DealStory.tsx`.
- `src/umt/fx.ts`: premium motion layer over engine-built screens (screen transitions, sliding car grid, counting
  finance figures, rolling countdown). It never edits engine text the engine reads back.
- Tailwind only scans `src/components` and the new React files: engine class names (e.g. `.fixed`) must never become
  utilities.

## Brand colours: coral + midnight plum
- The site's tokens are in `src/umt/legacy.css` (`--brass` coral, `--hero` plum, light and dark themes; the engine's
  toggle sets `data-theme` on `<html>`).
- The same values are in `src/lib/brand.ts` for components that paint through canvas. Keep the two in sync.

## Design system
See `DESIGN.md`. Display: Sora; body: Hanken Grotesk (self-hosted).
Motion: `src/umt/hooks.ts` (Lenis + GSAP ScrollTrigger); everything rests under reduced motion.
Taste-skill scripts need `CHROME_PATH` pointing at a wrapper that runs `/opt/pw-browsers/chromium-*/chrome-linux64/chrome --no-sandbox` in cloud sessions.
