import fs from "node:fs";
import path from "node:path";
import type { BlogPost } from "@/lib/content-types";
import { contentRoot, parseFrontMatter, readingTime } from "@/lib/markdown";

const blogDirectory = path.join(contentRoot, "blog");

function toBlogPost(filename: string): BlogPost | null {
  const source = fs.readFileSync(path.join(blogDirectory, filename), "utf8");
  const { attributes, content } = parseFrontMatter(source);
  const title = attributes.title;
  const description = attributes.description;
  const date = attributes.date;

  if (!title || !description || !date) return null;

  return {
    slug: filename.replace(/\.mdx$/, ""),
    title,
    description,
    date,
    readingTime: readingTime(content),
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) return [];

  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map(toBlogPost)
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
