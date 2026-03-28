# CodeAtlas — Claude Code Context

## Project
Visual, progressive web platform for learning programming fundamentals.
Portfolio-grade project. Code quality is non-negotiable.

## Tech Stack
- Astro 4.x + MDX + Content Collections
- Tailwind CSS v3 + Tailwind Typography
- React (islands only — never full SPA)
- TypeScript throughout
- GitHub Pages deployment (static output only)

## Common Commands
- `npm run dev`      → start dev server at localhost:4321
- `npm run build`    → production build to ./dist
- `npm run preview`  → preview production build locally
- `npx astro check`  → TypeScript + Astro type validation

## Run After Every Change
Always run `npm run build` after completing a feature. Fix all errors
before moving on. Run `npx astro check` before final commit.

## Code Style
- TypeScript: strict mode, explicit prop types on all components
- Tailwind: use custom `atlas-*` tokens defined in tailwind.config.mjs
- Components: small, focused, single responsibility
- No inline styles except for dynamic values not expressible in Tailwind
- File naming: PascalCase for components, kebab-case for pages and content

## Design System
- Dark background only. No white pages. Base bg: #0d0f14
- Accent: indigo (#6366f1) primary, cyan (#22d3ee) secondary
- Cards: surface #13161e with 1px border #1e2330
- Fonts: Inter (body), JetBrains Mono (code)
- Shiki theme: github-dark

## i18n
- All UI strings go in /src/i18n/en.json and /src/i18n/es.json
- Use the t(key, lang) helper from /src/i18n/utils.ts — never hardcode strings
- Language preference stored in localStorage under key: codeatlas-lang

## Content Structure
- Concepts live in /src/content/concepts/en/ as .mdx files
- Every concept must match the Zod schema in /src/content/config.ts
- Order field determines learning path sequence

## Architecture Rules
- Never add a backend, database, or auth system
- Never install a full i18n library — use the custom t() helper
- Never convert the site to a SPA — Astro islands only
- Keep the dependency count minimal

## What Not to Build (MVP Scope)
- User accounts or authentication
- Search (Phase 2)
- Video embeds (placeholder text is fine)
- Dark/light mode toggle (dark only)
- More than 4 concepts initially
