import fs from "node:fs";
import path from "node:path";
import type { GratitudeEntry } from "@/lib/content-types";
import { contentRoot, markdownToPlainText, parseFrontMatter, readMarkdownFile } from "@/lib/markdown";

const peopleDirectory = path.join(contentRoot, "gratitude");

function numberAttribute(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function buildPersonMarkdown(entry: GratitudeEntry) {
  const lines = [`# ${entry.name}`, ""];

  if (entry.href) {
    lines.push(entry.href, "");
  }

  lines.push(entry.content);
  return lines.join("\n").trim();
}

function toPerson(filename: string): GratitudeEntry | null {
  const source = fs.readFileSync(path.join(peopleDirectory, filename), "utf8");
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

export function getPeopleMeta() {
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

export function getAllPeople(): GratitudeEntry[] {
  if (!fs.existsSync(peopleDirectory)) return [];

  return fs
    .readdirSync(peopleDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map(toPerson)
    .filter((entry): entry is GratitudeEntry => entry !== null)
    .sort((a, b) => a.order - b.order);
}

export function getPerson(slug: string) {
  return getAllPeople().find((entry) => entry.slug === slug);
}

export function getPersonMarkdown(slug: string) {
  const entry = getPerson(slug);
  if (!entry) return null;

  return buildPersonMarkdown(entry);
}

export function getPeopleIndexMarkdown() {
  const meta = getPeopleMeta();
  const entries = getAllPeople();

  const body = entries
    .map((entry) => `- [${entry.name}](/gratitude/${entry.slug}.md): ${entry.plainNote}`)
    .join("\n");

  return `# ${meta.title}

> ${meta.description}

${meta.intro}

${body}
`;
}
