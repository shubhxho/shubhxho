import { getProfileLinksMarkdown, site } from "@/lib/site";

const markdownMediaType = /(?:^|,)\s*text\/markdown(?:\s*;[^,]*)?(?:,|$)/i;

/** Returns true only when the client explicitly asks for Markdown. */
export function acceptsMarkdown(accept: string | null) {
  if (!accept || !markdownMediaType.test(accept)) {
    return false;
  }

  return !/text\/markdown\s*;[^,]*\bq=0(?:\.0+)?\b/i.test(accept);
}

export function getNotFoundMarkdown(pathname: string) {
  const profileLinks = getProfileLinksMarkdown();

  return `# 404: Page not found

\`${pathname}\` does not exist on the official website for ${site.name} (${site.handle}).

## Where to look next

- [Homepage](${site.url}/): biography, projects, history, gallery, and writing
- [People](${site.url}/people): people I look up to ([Markdown](${site.url}/people.md))
- [History](${site.url}/history): chronological timeline
- [Gallery](${site.url}/gallery): visual work
- [Writing](${site.url}/blog): essays and notes
- [Sitemap](${site.url}/sitemap.xml): canonical indexable pages
- [Agent instructions](${site.url}/llms.txt): machine-readable site guide
- [Full AI-readable profile](${site.url}/llms-full.txt): biography, timeline, people, and writing
- [Markdown profile](${site.url}/profile.md): homepage snapshot

## Official profiles

${profileLinks}
`;
}
