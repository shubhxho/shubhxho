import fs from "node:fs";
import path from "node:path";

export const contentRoot = path.join(process.cwd(), "content");

export function parseFrontMatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { attributes: {} as Record<string, string>, content: source.trim() };

  const attributes = Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => line.split(/:\s+/, 2))
      .filter(([key, value]) => key && value),
  );

  return { attributes, content: match[2].trim() };
}

export function readMarkdownFile(...segments: string[]) {
  const filePath = path.join(contentRoot, ...segments);
  const source = fs.readFileSync(filePath, "utf8");
  return parseFrontMatter(source);
}

export function listMarkdownFiles(...segments: string[]) {
  const directory = path.join(contentRoot, ...segments);
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .sort();
}

export function readingTime(content: string) {
  const words = content.match(/\b[\w'-]+\b/g)?.length ?? 0;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

export function markdownToPlainText(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}
