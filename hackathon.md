# Hackathon log

- **Project:** shubhxho
- **Event:** Convex All Gas Hackathon
- **What it does:** A markdown-driven personal site with writing, daily notes, selected work, and machine-readable discovery endpoints.
- **Live app:** not deployed
- **Repo:** https://github.com/shubhxho/shubhxho
- **Frontend:** not deployed
- **Convex deployment:** not deployed
- **Components:** none
- **Convex features:** none yet
- **Auth:** none
- **AI models:** none
- **Started:** 2026-06-27T19:45:35Z
- **Last updated:** 2026-09-01T22:27:06Z

## Log

### 2026-06-27 - d1f158f
Created the initial project. The package manifest identifies it as a Next.js and React application (`package.json`).

### 2026-08-21 - 7953b4d
Added SEO and AI-discovery work, then documented the public discovery surfaces (`src/lib/discovery.ts`, `src/lib/agentic.ts`, `src/proxy.ts`).

### 2026-08-26 - 6fa3a65
Redesigned the site around a hybrid personal page and writing experience, then established the current visual system and motion treatment (`src/app`, `src/components`).

### 2026-08-27 - faeaec1
Moved the site to markdown-driven content, rebuilt the gallery and timeline, and expanded agentic smoke-test coverage (`content/`, `src/lib/content.ts`, `scripts/test-agentic.mjs`).

### 2026-08-28 - 1792f47
Added people pages, migrated blog content to MDX, and made public pages, sitemap, and discovery data follow the content pipeline (`content/people`, `content/blog`, `src/lib/people.ts`, `src/lib/pages.ts`).

### 2026-08-29 - 050c60f
Added the daily-notes section with markdown endpoints and later introduced a dedicated essays section (`content/daily`, `src/lib/daily.ts`, `src/lib/essays.ts`).

### 2026-09-01 - 8cf1ed6
Made the blog a first-class site section (`src/app/blog`, `content/blog`).
