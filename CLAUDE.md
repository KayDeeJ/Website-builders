# Website Builders

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
Vite + React 19 + TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), shadcn (`components.json`, alias `@/` → `src/`).
`npm run dev` / `npm run build`.

## Brand colours: coral + midnight plum
- CSS tokens live in `src/index.css`. The shadcn tokens are set to the brand palette (`.dark` = plum ground; `<html class="dark">` by default), and there are utilities `text-coral`, `bg-plum`, `bg-cream` etc.
- The same values are in `src/lib/brand.ts` for components that paint colours through canvas (CSS vars don't work there). Keep the two in sync.
- React Bits components live in `src/components/`. Their default palettes (ShinyText, SpotlightCard, StarBorder) are already restyled; the rest inherit text colour.

## Design system
See `DESIGN.md` (written in the awesome-design-md format). Display: Fraunces; body: Geist. One coral italic accent word per heading.
Motion: `src/hooks/useSmoothScroll.ts` (Lenis + GSAP ScrollTrigger); everything rests under reduced motion.
Taste-skill scripts need `CHROME_PATH` pointing at a wrapper that runs `/opt/pw-browsers/chromium-*/chrome-linux64/chrome --no-sandbox` in cloud sessions.
