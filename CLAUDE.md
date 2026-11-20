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
