import fs from "node:fs";
import path from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  content: string;
};

const blogDirectory = path.join(process.cwd(), "content", "blog");

function parseFrontMatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { attributes: {}, content: source.trim() };

  const attributes = Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => line.split(/:\s+/, 2))
      .filter(([key, value]) => key && value),
  );

  return { attributes, content: match[2].trim() };
}

function toPost(filename: string): BlogPost | null {
  const source = fs.readFileSync(path.join(blogDirectory, filename), "utf8");
  const { attributes, content } = parseFrontMatter(source);
  const title = attributes.title;
  const description = attributes.description;
  const date = attributes.date;

  if (!title || !description || !date) return null;

  const words = content.match(/\b[\w'-]+\b/g)?.length ?? 0;
  return {
    slug: filename.replace(/\.md$/, ""),
    title,
    description,
    date,
    readingTime: `${Math.max(1, Math.ceil(words / 220))} min read`,
    content,
  };
}

export function getAllPosts() {
  if (!fs.existsSync(blogDirectory)) return [];

  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".md"))
    .map(toPost)
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
