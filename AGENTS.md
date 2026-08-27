<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Cursor / coding agent guide — shubhxho.com

Personal site for **Shubh Gupta** (`shubhxho`). Next.js App Router. Visual style: sparse kdrag0n-like, JetBrains Mono, light canvas.

## Source of truth: `content/`

Do not invent copy in React. Load through `src/lib/content.ts`:

- `content/home.md` — name, headline, bio, section labels
- `content/projects/*.md` — selected work
- `content/blog/*.md` — writing
- `content/gallery.md` — gallery mosaic
- `content/timeline.md` — history
- `content/pages/{about,contact,privacy}.md` — trust pages

Site identity constants (URL, email, socials): `src/lib/site.ts`.

## Agent-facing public URLs

- `/llms.txt` — discovery index for agents
- `/llms-full.txt` / `/profile.md` — full markdown profile + timeline
- `/feed.xml` — RSS of blog posts
- `/sitemap.xml` — all public routes
- `Accept: text/markdown` on `/` returns the markdown profile (see `src/proxy.ts`)

## Workflow for agents

1. Prefer editing `content/**/*.md` for copy/structure changes
2. Touch `src/components/*` only for layout/behavior
3. Never put `node:fs` in client components
4. Verify with `npm test` before finishing

## Local run

```bash
npm install
npm run dev
```
