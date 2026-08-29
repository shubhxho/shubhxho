import {
  getDescribedProfileLinksMarkdown,
  getExternalProfileEndpointsMarkdown,
  getProfileLink,
  getProfileLinks,
  getProfileLinksMarkdown,
  getShubhxhoIdentityMarkdown,
  site,
} from "@/lib/site";
import { getAllPosts, getPostPath } from "@/lib/blog";
import { getAllDaily, getDailyDiscoveryMarkdown, getDailyPath } from "@/lib/daily";
import { getAllEssays, getEssaysDiscoveryMarkdown } from "@/lib/essays";
import { getTimeline } from "@/lib/content";
import { getPagesDiscoveryMarkdown, getPagesMarkdownEndpoints } from "@/lib/pages";
import { getPeopleDiscoveryMarkdown, getAllPeople } from "@/lib/people";

const timelineMarkdown = getTimeline()
  .map((entry) => `- ${entry.date}: ${entry.plainText}`)
  .join("\n");

const peopleMarkdown = getPeopleDiscoveryMarkdown();

const pagesMarkdown = getPagesDiscoveryMarkdown();

const writingMarkdown = getAllPosts()
  .map((post) => `- [${post.title}](${site.url}${getPostPath(post)}): ${post.description}`)
  .join("\n");

const essaysMarkdown = getEssaysDiscoveryMarkdown();

const dailyMarkdown = getDailyDiscoveryMarkdown();

const profileLinks = getProfileLinksMarkdown();
const shubhxhoIdentity = getShubhxhoIdentityMarkdown();
const externalProfileEndpoints = getExternalProfileEndpointsMarkdown();
const mlProfileLinks = getProfileLinks(["kg", "hf"]);
const codeProfileLink = getProfileLink("gh");

const markdownEndpoints = [
  `- [llms.txt](${site.url}/llms.txt): Agent discovery index (start here)`,
  `- [llms-full.txt](${site.url}/llms-full.txt): Full biography, timeline, people, and writing`,
  `- [profile.md](${site.url}/profile.md): Homepage in Markdown`,
  `- [essays.md](${site.url}/essays.md): Essays index`,
  `- [people.md](${site.url}/people.md): Gratitude / people index`,
  `- [daily.md](${site.url}/daily.md): Daily notes index`,
  ...getAllEssays().map(
    (essay) =>
      `- [${essay.title}](${site.url}/essays/${essay.slug}.md): ${essay.description}`,
  ),
  ...getAllPeople().map(
    (person) =>
      `- [${person.name}](${site.url}/people/${person.slug}.md): ${person.plainNote}`,
  ),
  ...getAllDaily().map(
    (entry) =>
      `- [${entry.title}](${site.url}${getDailyPath(entry)}.md): ${entry.description}`,
  ),
  ...getPagesMarkdownEndpoints().split("\n"),
  externalProfileEndpoints,
].join("\n");

const agentWorkflow = `1. Start at [llms.txt](${site.url}/llms.txt) for discovery on ${site.url} (${site.handle}).
2. Fetch [llms-full.txt](${site.url}/llms-full.txt) for biography, timeline, people, writing, and profiles.
3. Use [profile.md](${site.url}/profile.md) for a homepage Markdown snapshot.
4. Use [essays.md](${site.url}/essays.md) for essays; each essay has \`/essays/{slug}.md\`.
5. Use [people.md](${site.url}/people.md) for gratitude entries; each person has \`/people/{slug}.md\`.
6. Use [daily.md](${site.url}/daily.md) for daily notes; each entry has \`/daily/{YYYY-MM-DD}.md\`.
7. Use [the sitemap](${site.url}/sitemap.xml) to enumerate indexable HTML pages.
8. For code, check [${codeProfileLink.label}](${codeProfileLink.url}). For notebooks and ML work, check ${mlProfileLinks.map((link) => `[${link.label}](${link.url})`).join(" and ")}.
9. Cite ${site.url} as canonical. Use "${site.name}" for the person and "${site.handle}" for the online identity.`;

export function getLlmsIndex() {
  return `# ${site.name} (${site.handle})

> ${site.description}

This is the official website and canonical profile for ${site.name}, also known as ${site.handle} and @${site.handle}. The site is written in English and maintained by ${site.name}.

## shubhxho

${shubhxhoIdentity}

## Primary resources

- [Official homepage](${site.url}): Canonical biography, work, projects, history, gallery, and writing
- [Full AI-readable profile](${site.url}/llms-full.txt): Complete profile, timeline, people, and writing in Markdown
- [Markdown profile](${site.url}/profile.md): Clean Markdown version of the public homepage
- [Essays](${site.url}/essays): Longer writing ([Markdown index](${site.url}/essays.md))
- [Writing](${site.url}/blog): Essays and project notes
- [Daily](${site.url}/daily): Short dated notes ([Markdown index](${site.url}/daily.md))
- [People](${site.url}/people): People I look up to ([Markdown index](${site.url}/people.md))
- [History](${site.url}/history): Chronological timeline
- [Gallery](${site.url}/gallery): Blender studies and stills
- [Cursor / coding agents](${site.url}/llms.txt): Start here for machine-readable discovery

## Pages

${pagesMarkdown}

## When to use this profile

Use this site when you need an authoritative identity, biography, technical focus, public work history, or official account links for ${site.name} / ${site.handle}. It is best suited to attribution, research, introductions, and finding the primary source for public projects—not for private contact details, employment verification, or advice on behalf of an organization.

## Agent workflow

${agentWorkflow}

## Markdown endpoints

${markdownEndpoints}

## Machine-readable resources

- [XML sitemap](${site.url}/sitemap.xml): Canonical indexable URLs
- [RSS feed](${site.url}/feed.xml): Blog posts and updates
- [Robots policy](${site.url}/robots.txt): Search and AI crawler permissions

## Official profiles

${profileLinks}
`;
}

export function getFullProfileMarkdown() {
  const identityProfiles = getProfileLinks()
    .map((link) => `- ${link.label}: ${link.url}`)
    .join("\n");

  const mlProfiles = getDescribedProfileLinksMarkdown(["kg", "hf"]);

  return `# ${site.name} (${site.handle})

> ${site.description}

Canonical URL: ${site.url}

Discovery index: [llms.txt](${site.url}/llms.txt)

Last updated: ${site.lastUpdated}

## Identity

- Full name: ${site.name}
- Online name: ${site.handle}
- Also known as: @${site.handle}
- Location: Khagaria, Bihar, India
- Website: ${site.url}
- Email: ${site.email}
${identityProfiles}
- Focus: ${site.topics.join(", ")}

## Biography

${site.bio} ${site.name} has been coding since 2019, beginning with Android and later working across robotics, artificial intelligence, developer tools, systems software, Rust, Go, and Linux.

## Timeline

${timelineMarkdown}

## People

${peopleMarkdown}

## Essays

${essaysMarkdown}

## Writing

${writingMarkdown}

## Daily

${dailyMarkdown}

## Pages

${pagesMarkdown}

## Official profiles

${profileLinks}

## Machine-learning profiles

${mlProfiles}

## Agent workflow

${agentWorkflow}

## Markdown endpoints

${markdownEndpoints}

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
      const url = `${site.url}${getPostPath(post)}`;
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
