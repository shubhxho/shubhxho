import fs from "node:fs";
import path from "node:path";
import type { GratitudeEntry } from "@/lib/content-types";
import { contentRoot, markdownToPlainText, parseFrontMatter, readMarkdownFile } from "@/lib/markdown";

export type { GratitudeEntry } from "@/lib/content-types";

const gratitudeDirectory = path.join(contentRoot, "gratitude");

function numberAttribute(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function buildGratitudeMarkdown(entry: GratitudeEntry) {
  const lines = [`# ${entry.name}`, ""];

  if (entry.href) {
    lines.push(entry.href, "");
  }

  lines.push(entry.content);
  return lines.join("\n").trim();
}

function toGratitudeEntry(filename: string): GratitudeEntry | null {
  const source = fs.readFileSync(path.join(gratitudeDirectory, filename), "utf8");
  const { attributes, content } = parseFrontMatter(source);
  const name = attributes.name;
  const fileSlug = filename.replace(/\.mdx$/, "");

  if (!name) return null;

  return {
    slug: attributes.slug ?? fileSlug,
    name,
    href: attributes.href ?? "",
    order: numberAttribute(attributes.order, 999),
    content,
    plainNote: markdownToPlainText(content),
  };
}

export function getGratitudeMeta() {
  const { attributes } = readMarkdownFile("gratitude.md");

  return {
    title: attributes.title ?? "Gratitude",
    description:
      attributes.description ??
      "People and communities who shaped how I build, think, and show up.",
    intro:
      attributes.intro ??
      "A short list of people I look up to and owe thanks to.",
  };
}

export function getAllGratitude(): GratitudeEntry[] {
  if (!fs.existsSync(gratitudeDirectory)) return [];

  return fs
    .readdirSync(gratitudeDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map(toGratitudeEntry)
    .filter((entry): entry is GratitudeEntry => entry !== null)
    .sort((a, b) => a.order - b.order);
}

export function getGratitude(slug: string) {
  return getAllGratitude().find((entry) => entry.slug === slug);
}

export function getGratitudeMarkdown(slug: string) {
  const entry = getGratitude(slug);
  if (!entry) return null;

  return buildGratitudeMarkdown(entry);
}

export function getGratitudeIndexMarkdown() {
  const meta = getGratitudeMeta();
  const entries = getAllGratitude();

  const body = entries
    .map((entry) => `- [${entry.name}](/gratitude/${entry.slug}.md): ${entry.plainNote}`)
    .join("\n");

  return `# ${meta.title}

> ${meta.description}

${meta.intro}

${body}
`;
}
