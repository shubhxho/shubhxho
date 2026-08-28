import type { ContentPage, ContentPageSlug } from "@/lib/content-types";
import { readMarkdownFile } from "@/lib/markdown";

export type { ContentPage, ContentPageSlug } from "@/lib/content-types";

export const pageSlugs = ["about", "contact", "privacy"] as const satisfies readonly ContentPageSlug[];

export function getPage(slug: ContentPageSlug): ContentPage {
  const { attributes, content } = readMarkdownFile("pages", `${slug}.md`);

  return {
    slug,
    title: attributes.title ?? slug,
    description: attributes.description ?? "",
    heading: attributes.heading ?? attributes.title ?? slug,
    content,
  };
}

export function getPages() {
  return pageSlugs.map(getPage);
}
