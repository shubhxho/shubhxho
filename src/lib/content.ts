import fs from "node:fs";
import path from "node:path";
import type {
  BlogPost,
  ContentPage,
  ContentPageSlug,
  GalleryImage,
  HomeContent,
  Project,
  TimelineEntry,
} from "@/lib/content-types";
import {
  contentRoot,
  listMarkdownFiles,
  markdownToPlainText,
  parseFrontMatter,
  readMarkdownFile,
  readingTime,
} from "@/lib/markdown";

export type {
  BlogPost,
  ContentPage,
  ContentPageSlug,
  GalleryImage,
  HomeContent,
  Project,
  TimelineEntry,
} from "@/lib/content-types";

function numberAttribute(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function getHomeContent(): HomeContent {
  const { attributes } = readMarkdownFile("home.md");

  return {
    name: attributes.name ?? "shubhxho",
    headline: attributes.headline ?? "Hi. I make things.",
    bio:
      attributes.bio ??
      "engineer and hacker from khagaria. building robots, systems, and unusual software.",
    projectsLabel: attributes.projectsLabel ?? "what i'm working on",
    galleryLabel: attributes.galleryLabel ?? "gallery",
    galleryUrl: attributes.galleryUrl ?? "https://gallery.shubhxho.com",
    galleryLinkLabel: attributes.galleryLinkLabel ?? "open full gallery →",
    writingLabel: attributes.writingLabel ?? "writing",
    writingLinkLabel: attributes.writingLinkLabel ?? "all writing →",
    writingPreviewCount: numberAttribute(attributes.writingPreviewCount, 4),
    contactLabel: attributes.contactLabel ?? "reach out",
    footerCredit: attributes.footerCredit ?? "design and development by me",
  };
}

export function getProjects(): Project[] {
  return listMarkdownFiles("projects")
    .map((filename) => {
      const { attributes } = readMarkdownFile("projects", filename);
      const title = attributes.title;
      const description = attributes.description;
      const href = attributes.href;

      if (!title || !description || !href) return null;

      return {
        slug: filename.replace(/\.md$/, ""),
        title,
        description,
        href,
        role: attributes.role ?? "",
        year: attributes.year ?? "",
        tip: attributes.tip ?? "",
        order: numberAttribute(attributes.order, 999),
      };
    })
    .filter((project): project is Project => project !== null)
    .sort((a, b) => a.order - b.order);
}

export function getGalleryImages(): GalleryImage[] {
  const { attributes, content } = readMarkdownFile("gallery.md");
  const cloudinaryBase =
    attributes.cloudinaryBase ??
    "https://res.cloudinary.com/dtq4hbiya/image/upload/c_scale,w_1200";
  const galleryUrl = attributes.url ?? "https://gallery.shubhxho.com";

  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [id, file, alt, hrefSuffix] = line.split("|").map((part) => part.trim());
      if (!id || !file || !alt) return null;

      const href = hrefSuffix?.startsWith("http")
        ? hrefSuffix
        : `${galleryUrl}${hrefSuffix?.startsWith("/") ? hrefSuffix : `/${hrefSuffix ?? ""}`}`;

      return {
        id,
        src: `${cloudinaryBase}/${file}`,
        alt,
        href,
      };
    })
    .filter((image): image is GalleryImage => image !== null);
}

export function getGalleryBackground() {
  return getGalleryImages()[0]?.src ?? "";
}

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

export function getTimeline(): TimelineEntry[] {
  const { content } = readMarkdownFile("timeline.md");

  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => {
      const match = line.match(/^- \*\*(\d{4}-\d{2}-\d{2})\*\* — (.+)$/);
      if (!match) return null;

      const [, date, text] = match;
      return {
        date,
        text,
        plainText: markdownToPlainText(text),
      };
    })
    .filter((entry): entry is TimelineEntry => entry !== null);
}

function toBlogPost(filename: string): BlogPost | null {
  const source = fs.readFileSync(path.join(contentRoot, "blog", filename), "utf8");
  const { attributes, content } = parseFrontMatter(source);
  const title = attributes.title;
  const description = attributes.description;
  const date = attributes.date;

  if (!title || !description || !date) return null;

  return {
    slug: filename.replace(/\.md$/, ""),
    title,
    description,
    date,
    readingTime: readingTime(content),
    content,
  };
}

export function getAllPosts() {
  const blogDirectory = path.join(contentRoot, "blog");
  if (!fs.existsSync(blogDirectory)) return [];

  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".md"))
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
