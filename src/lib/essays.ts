import type { BlogPost } from "@/lib/content-types";
import { readMarkdownFile } from "@/lib/markdown";
import { getAllEssays, getEssay, getPostPath } from "@/lib/posts";
import { site } from "@/lib/site";

export type { BlogPost } from "@/lib/content-types";
export { formatPostDate, getAllEssays, getEssay, getPostPath } from "@/lib/posts";

export function getEssaysMeta() {
  const { attributes } = readMarkdownFile("essays.md");

  return {
    title: attributes.title ?? "Essays",
    description:
      attributes.description ?? "Longer writing on building, place, and how I think about work.",
    intro:
      attributes.intro ??
      "These are the pieces that needed more room than a daily note. Project write-ups live under writing.",
  };
}

export function getEssayMarkdown(slug: string) {
  const essay = getEssay(slug);
  if (!essay) return null;

  return `# ${essay.title}\n\n${essay.description}\n\n${essay.content}`.trim();
}

export function getEssaysIndexMarkdown() {
  const meta = getEssaysMeta();
  const entries = getAllEssays()
    .map((essay) => `- [${essay.title}](${getPostPath(essay)}): ${essay.description}`)
    .join("\n");

  return `# ${meta.title}\n\n${meta.intro}\n\n${entries}`.trim();
}

export function getEssaysDiscoveryMarkdown() {
  return getAllEssays()
    .map((essay) => `- [${essay.title}](${site.url}${getPostPath(essay)}): ${essay.description}`)
    .join("\n");
}

export function toEssayListItem(essay: BlogPost) {
  return {
    slug: essay.slug,
    title: essay.title,
    date: essay.date,
    description: essay.description,
    readingTime: essay.readingTime,
    href: getPostPath(essay),
  };
}
