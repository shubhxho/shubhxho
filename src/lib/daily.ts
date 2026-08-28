import fs from "node:fs";
import path from "node:path";
import type { DailyEntry } from "@/lib/content-types";
import { contentRoot, markdownToPlainText, parseFrontMatter, readMarkdownFile } from "@/lib/markdown";
import { formatPostDate } from "@/lib/posts";
import { site } from "@/lib/site";

export type { DailyEntry } from "@/lib/content-types";

const dailyDirectory = path.join(contentRoot, "daily");

function toDailyEntry(filename: string): DailyEntry | null {
  const source = fs.readFileSync(path.join(dailyDirectory, filename), "utf8");
  const { attributes, content } = parseFrontMatter(source);
  const date = attributes.date;
  const slug = filename.replace(/\.mdx$/, "");

  if (!date) return null;

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

export function getDailyMarkdown(slug: string) {
  const entry = getDaily(slug);
  if (!entry) return null;

  return `# ${entry.title}\n\n${entry.content}`.trim();
}

export function getDailyIndexMarkdown() {
  const meta = getDailyMeta();
  const entries = getAllDaily()
    .map((entry) => `- [${entry.title}](/daily/${entry.slug}): ${entry.description}`)
    .join("\n");

  return `# ${meta.title}\n\n${meta.intro}\n\n${entries}`.trim();
}

export function getDailyDiscoveryMarkdown() {
  return getAllDaily()
    .map((entry) => `- [${entry.title}](${site.url}/daily/${entry.slug}): ${entry.description}`)
    .join("\n");
}
