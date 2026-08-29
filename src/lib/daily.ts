import fs from "node:fs";
import path from "node:path";
import type { DailyEntry } from "@/lib/content-types";
import { contentRoot, markdownToPlainText, parseFrontMatter, readMarkdownFile } from "@/lib/markdown";
import { formatPostDate } from "@/lib/posts";
import { site } from "@/lib/site";

export type { DailyEntry } from "@/lib/content-types";

const dailyDirectory = path.join(contentRoot, "daily");
const dateSlug = /^\d{4}-\d{2}-\d{2}$/;

function toDailyEntry(filename: string): DailyEntry | null {
  const source = fs.readFileSync(path.join(dailyDirectory, filename), "utf8");
  const { attributes, content } = parseFrontMatter(source);
  const fileSlug = filename.replace(/\.mdx$/, "");
  const date = attributes.date ?? fileSlug;
  const slug = attributes.slug ?? date;

  if (!dateSlug.test(date) || !dateSlug.test(slug)) return null;

  const title = attributes.title ?? formatPostDate(date);
  const description = attributes.description ?? markdownToPlainText(content).slice(0, 160);

  return {
    slug,
    title,
    description,
    date,
    content,
  };
}

export function getDailyMeta() {
  const { attributes } = readMarkdownFile("daily.md");

  return {
    title: attributes.title ?? "Daily",
    description:
      attributes.description ??
      "Short dated notes on what I'm building, learning, and noticing.",
    intro: attributes.intro ?? "Small entries, usually one day at a time.",
  };
}

export function getAllDaily(): DailyEntry[] {
  if (!fs.existsSync(dailyDirectory)) return [];

  return fs
    .readdirSync(dailyDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map(toDailyEntry)
    .filter((entry): entry is DailyEntry => entry !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getDaily(slug: string) {
  return getAllDaily().find((entry) => entry.slug === slug);
}

export function getDailyPath(entry: Pick<DailyEntry, "slug">) {
  return `/daily/${entry.slug}`;
}

export function toDailyListItem(entry: DailyEntry) {
  return {
    slug: entry.slug,
    title: entry.title,
    date: entry.date,
    description: entry.description,
    href: getDailyPath(entry),
  };
}

function buildDailyMarkdown(entry: DailyEntry) {
  return `# ${entry.title}\n\n${entry.content}`.trim();
}

export function getDailyMarkdown(slug: string) {
  const entry = getDaily(slug);
  if (!entry) return null;

  return buildDailyMarkdown(entry);
}

export function getDailyIndexMarkdown() {
  const meta = getDailyMeta();
  const entries = getAllDaily()
    .map((entry) => `- [${entry.title}](${getDailyPath(entry)}.md): ${entry.description}`)
    .join("\n");

  return `# ${meta.title}\n\n> ${meta.description}\n\n${meta.intro}\n\n${entries}`.trim();
}

export function getDailyDiscoveryMarkdown() {
  return getAllDaily()
    .map((entry) => `- [${entry.title}](${site.url}${getDailyPath(entry)}): ${entry.description}`)
    .join("\n");
}
