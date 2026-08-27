<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent guide — shubhxho.com

Cursor rules live in `.cursor/rules/` (always read `shubhxho-core.mdc` first).

## What this is

Personal site for **Shubh Gupta** (`shubhxho`). Next.js 16, App Router, markdown-driven content, kdrag0n-style layout (JetBrains Mono, white, narrow column).

## Content-first rule

**Public copy → `content/` markdown.** React only loads and renders it.

```
content/
├── home.md           # homepage labels + intro
├── gallery.md        # mosaic images
├── timeline.md       # history
├── blog/*.md         # writing
├── projects/*.md     # selected work
└── pages/*.md        # about, contact, privacy
```

Loaders: `src/lib/content.ts` · parser: `src/lib/markdown.ts` · types: `src/lib/content-types.ts`

## Common tasks

| User wants | Do this |
|------------|---------|
| New blog post | Add `content/blog/slug.md` with frontmatter + body |
| New project | Add `content/projects/slug.md` with `order` |
| Edit homepage | Edit `content/home.md` |
| Edit timeline | Edit `content/timeline.md` |
| Change gallery | Edit `content/gallery.md` lines |
| New page route | Add `src/app/route/page.tsx` + sitemap + proxy known path |

## Server / client boundary

- `@/lib/content` → **server only**
- Client components → import types from `@/lib/content-types` only
- Pass loaded data as props (`HomeView`, etc.)

## Public agent endpoints

| URL | Purpose |
|-----|---------|
| `/llms.txt` | Discovery index |
| `/llms-full.txt` | Full profile + timeline |
| `/profile.md` | Markdown profile |
| `/feed.xml` | Blog RSS |
| `/sitemap.xml` | All indexable URLs |
| `Accept: text/markdown` on `/` | Rewrites to profile |

Implementation: `src/lib/discovery.ts`, `src/lib/agentic.ts`, `src/proxy.ts`

## Verify

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # build + agentic smoke tests
```

## Site constants

Email, social links, SEO keywords: `src/lib/site.ts` (not in markdown).
