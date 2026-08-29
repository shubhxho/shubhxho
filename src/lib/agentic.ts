import { getAgentDiscoveryLinksMarkdown, getProfileLinksMarkdown, site } from "@/lib/site";
import { pageSlugs } from "@/lib/content-types";

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
  const agentLinks = getAgentDiscoveryLinksMarkdown();

  return `# 404: Page not found

\`${pathname}\` does not exist on the official website for ${site.name} (${site.handle}).

## Where to look next

- [Homepage](${site.url}/): biography, projects, history, gallery, and writing
- [People](${site.url}/people): people I look up to ([Markdown](${site.url}/people.md))
${pageSlugs.map((slug) => `- [${slug}](${site.url}/${slug}) ([Markdown](${site.url}/${slug}.md))`).join("\n")}
- [History](${site.url}/history): chronological timeline
- [Gallery](${site.url}/gallery): visual work
- [Writing](${site.url}/blog): essays and notes
- [Essays](${site.url}/essays): longer writing ([Markdown](${site.url}/essays.md))
- [Sitemap](${site.url}/sitemap.xml): canonical indexable pages

## Agent discovery

${agentLinks}

## Official profiles

${profileLinks}
`;
}
