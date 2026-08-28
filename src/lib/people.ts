import fs from "node:fs";
import path from "node:path";
import type { Person } from "@/lib/content-types";
import { contentRoot, markdownToPlainText, parseFrontMatter, readMarkdownFile } from "@/lib/markdown";

export type { Person } from "@/lib/content-types";

const peopleDirectory = path.join(contentRoot, "people");

function numberAttribute(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function buildPersonMarkdown(person: Person) {
  const lines = [`# ${person.name}`, ""];

  if (person.href) {
    lines.push(person.href, "");
  }

  lines.push(person.content);
  return lines.join("\n").trim();
}

function toPerson(filename: string): Person | null {
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
  const { attributes } = readMarkdownFile("people.md");

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

export function getAllPeople(): Person[] {
  if (!fs.existsSync(peopleDirectory)) return [];

  return fs
    .readdirSync(peopleDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map(toPerson)
    .filter((person): person is Person => person !== null)
    .sort((a, b) => a.order - b.order);
}

export function getPerson(slug: string) {
  return getAllPeople().find((person) => person.slug === slug);
}

export function getPersonMarkdown(slug: string) {
  const person = getPerson(slug);
  if (!person) return null;

  return buildPersonMarkdown(person);
}

export function getPeopleIndexMarkdown() {
  const meta = getPeopleMeta();
  const people = getAllPeople();

  const body = people
    .map((person) => `- [${person.name}](/people/${person.slug}.md): ${person.plainNote}`)
    .join("\n");

  return `# ${meta.title}

> ${meta.description}

${meta.intro}

${body}
`;
}
