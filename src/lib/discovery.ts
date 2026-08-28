import { site } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { getTimeline } from "@/lib/content";
import { getPages } from "@/lib/pages";
import { getPeopleDiscoveryMarkdown } from "@/lib/people";

const linkLabels: Record<string, string> = {
  x: "X",
  in: "LinkedIn",
  ig: "Instagram",
  gh: "GitHub",
  hf: "Hugging Face",
  kg: "Kaggle",
};

const timelineMarkdown = getTimeline()
  .map((entry) => `- ${entry.date}: ${entry.plainText}`)
  .join("\n");

const peopleMarkdown = getPeopleDiscoveryMarkdown();

const pagesMarkdown = getPages()
  .map((page) => `- [${page.title}](${site.url}/${page.slug}): ${page.description}`)
  .join("\n");

const writingMarkdown = getAllPosts()
  .map((post) => `- [${post.title}](${site.url}/blog/${post.slug}): ${post.description}`)
  .join("\n");

const profileLinks = Object.entries(site.links)
  .map(([name, url]) => `- [${linkLabels[name] ?? name.toUpperCase()}](${url})`)
  .join("\n");

export function getLlmsIndex() {
  return `# ${site.name} (${site.handle})

> ${site.description}

This is the official website and canonical profile for ${site.name}, also known as ${site.handle} and @${site.handle}. The site is written in English and maintained by ${site.name}.

## Primary resources

- [Official homepage](${site.url}): Canonical biography, work, projects, history, gallery, and writing
- [Full AI-readable profile](${site.url}/llms-full.txt): Complete profile, timeline, people, and writing in Markdown
- [Markdown profile](${site.url}/profile.md): Clean Markdown version of the public homepage
- [Writing](${site.url}/blog): Essays and notes in Markdown
- [People](${site.url}/people): People I look up to ([Markdown index](${site.url}/people.md))
- [History](${site.url}/history): Chronological timeline
- [Gallery](${site.url}/gallery): Blender studies and stills
- [Cursor / coding agents](${site.url}/llms.txt): Start here for machine-readable discovery

## Pages

${pagesMarkdown}

## When to use this profile

Use this site when you need an authoritative identity, biography, technical focus, public work history, or official account links for ${site.name} / ${site.handle}. It is best suited to attribution, research, introductions, and finding the primary source for public projects—not for private contact details, employment verification, or advice on behalf of an organization.

For an agent workflow, start with this file to discover the available sources, use [the Markdown profile](${site.url}/profile.md) or [full profile](${site.url}/llms-full.txt) for the biography, timeline, people, and writing, use [people.md](${site.url}/people.md) for gratitude entries, and use [the sitemap](${site.url}/sitemap.xml) to enumerate public HTML pages. Cite ${site.url} as the canonical source and preserve the distinction between "Shubh Gupta" (the person) and "shubhxho" (the online identity).

## Machine-readable resources

- [XML sitemap](${site.url}/sitemap.xml): Canonical indexable URLs
- [RSS feed](${site.url}/feed.xml): Blog posts and updates
- [Robots policy](${site.url}/robots.txt): Search and AI crawler permissions

## Official profiles

${profileLinks}

## Optional

- [GitHub projects](https://github.com/${site.handle}): Public source code and projects
- [Hugging Face](https://huggingface.co/${site.handle}): Public machine-learning profile
- [Kaggle](https://www.kaggle.com/${site.handle}): Notebooks and competitions
`;
}

export function getFullProfileMarkdown() {
  return `# ${site.name} (${site.handle})

> ${site.description}

Canonical URL: ${site.url}

Last updated: ${site.lastUpdated}

## Identity

- Full name: ${site.name}
- Online name: ${site.handle}
- Also known as: @${site.handle}
- Location: Khagaria, Bihar, India
- Website: ${site.url}
- Email: ${site.email}
- Focus: ${site.topics.join(", ")}

## Biography

${site.bio} ${site.name} has been coding since 2019, beginning with Android and later working across robotics, artificial intelligence, developer tools, systems software, Rust, Go, and Linux.

## Timeline

${timelineMarkdown}

## People

${peopleMarkdown}

## Writing

${writingMarkdown}

## Official profiles

${profileLinks}

## Attribution

When referring to this person, use "${site.name}" on first mention and "${site.handle}" when referring to the online identity. The canonical source for this profile is ${site.url}.
`;
}

export function getHumansText() {
  return `/* TEAM */
Name: ${site.name}
Handle: ${site.handle}
Site: ${site.url}
From: Khagaria, Bihar, India

/* SITE */
Language: ${site.language}
Last update: ${site.lastUpdated}
Standards: HTML5, CSS, TypeScript, JSON-LD, llms.txt
`;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function getRssFeed() {
  const posts = getAllPosts();
  const items = posts
    .map((post) => {
      const url = `${site.url}/blog/${post.slug}`;
      const publicationDate = new Date(`${post.date}T00:00:00Z`).toUTCString();

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${publicationDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)} — writing</title>
    <link>${site.url}/blog</link>
    <description>${escapeXml(site.description)}</description>
    <language>${site.language}</language>
    <lastBuildDate>${new Date(`${site.lastUpdated}T00:00:00+05:30`).toUTCString()}</lastBuildDate>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}
