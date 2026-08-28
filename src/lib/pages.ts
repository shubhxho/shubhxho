import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import type { ContentPage, ContentPageSlug } from "@/lib/content-types";
import { contentRoot, parseFrontMatter } from "@/lib/markdown";
import { site } from "@/lib/site";

export type { ContentPage, ContentPageSlug } from "@/lib/content-types";

const pagesDirectory = path.join(contentRoot, "pages");

export const pageSlugs = ["about", "contact", "privacy"] as const satisfies readonly ContentPageSlug[];

export function isPageSlug(slug: string): slug is ContentPageSlug {
  return (pageSlugs as readonly string[]).includes(slug);
}

function toPage(filename: string): ContentPage | null {
  const source = fs.readFileSync(path.join(pagesDirectory, filename), "utf8");
  const { attributes, content } = parseFrontMatter(source);
  const fileSlug = filename.replace(/\.mdx$/, "");

  if (!isPageSlug(fileSlug)) return null;

  return {
    slug: fileSlug,
    title: attributes.title ?? fileSlug,
    description: attributes.description ?? "",
    heading: attributes.heading ?? attributes.title ?? fileSlug,
    content,
  };
}

export function getPages(): ContentPage[] {
  if (!fs.existsSync(pagesDirectory)) return [];

  const pages = fs
    .readdirSync(pagesDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map(toPage)
    .filter((page): page is ContentPage => page !== null);

  return pageSlugs.map((slug) => pages.find((page) => page.slug === slug)).filter((page): page is ContentPage => page !== undefined);
}

export function getPage(slug: ContentPageSlug) {
  return getPages().find((page) => page.slug === slug);
}

export function getPrivacy() {
  return getPage("privacy");
}

export function getPageMarkdown(slug: ContentPageSlug) {
  const page = getPage(slug);
  if (!page) return null;

  return `# ${page.heading}\n\n${page.content}`.trim();
}

export function getPrivacyMarkdown() {
  return getPageMarkdown("privacy");
}

export function getPageMetadata(slug: ContentPageSlug): Metadata {
  const page = getPage(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${page.slug}`,
      types: {
        "text/markdown": `${site.url}/${page.slug}.md`,
      },
    },
    openGraph: { url: `${site.url}/${page.slug}` },
  };
}
