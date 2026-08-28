import type {
  GalleryContent,
  GalleryImage,
  HomeContent,
  Project,
  TimelineEntry,
} from "@/lib/content-types";
import {
  listMarkdownFiles,
  markdownToPlainText,
  readMarkdownFile,
} from "@/lib/markdown";

export type {
  GalleryContent,
  GalleryImage,
  HomeContent,
  Project,
  TimelineEntry,
} from "@/lib/content-types";
export { getPage, getPageMarkdown, getPages, pageSlugs } from "@/lib/pages";
export type { ContentPage, ContentPageSlug } from "@/lib/pages";

function numberAttribute(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function getHomeContent(): HomeContent {
  const { attributes } = readMarkdownFile("home.md");

  return {
    name: attributes.name ?? "Shubh Gupta",
    headline: attributes.headline ?? "Hi. I make things.",
    bio:
      attributes.bio ??
      "I like solving hard problems and building robots, systems, and unusual software around them.",
    projectsLabel: attributes.projectsLabel ?? "What I'm working on",
    galleryLabel: attributes.galleryLabel ?? "Gallery",
    galleryUrl: attributes.galleryUrl ?? "/gallery",
    galleryLinkLabel: attributes.galleryLinkLabel ?? "see all →",
    galleryExternalUrl: attributes.galleryExternalUrl ?? "https://gallery.shubhxho.com",
    writingLabel: attributes.writingLabel ?? "Writing",
    writingLinkLabel: attributes.writingLinkLabel ?? "all writing →",
    writingPreviewCount: numberAttribute(attributes.writingPreviewCount, 4),
    historyLabel: attributes.historyLabel ?? "History",
    historyUrl: attributes.historyUrl ?? "/history",
    historyLinkLabel: attributes.historyLinkLabel ?? "full timeline →",
    historyPreviewCount: numberAttribute(attributes.historyPreviewCount, 10),
    peopleLabel: attributes.peopleLabel ?? "Gratitude",
    peopleUrl: attributes.peopleUrl ?? "/people",
    peopleLinkLabel: attributes.peopleLinkLabel ?? "full list →",
    peoplePreviewCount: numberAttribute(attributes.peoplePreviewCount, 4),
    contactLabel: attributes.contactLabel ?? "Reach out",
    footerCredit: attributes.footerCredit ?? "Design and development by me",
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
  return getGalleryContent().images;
}

export function getGalleryContent(): GalleryContent {
  const { attributes, content } = readMarkdownFile("gallery.md");
  const cloudinaryBase =
    attributes.cloudinaryBase ??
    "https://res.cloudinary.com/dtq4hbiya/image/upload/c_scale,w_1400";
  const galleryUrl = attributes.url ?? "https://gallery.shubhxho.com";

  const images = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [id, file, title, hrefSuffix, layoutRaw] = line
        .split("|")
        .map((part) => part.trim());
      if (!id || !file || !title) return null;

      const href = hrefSuffix?.startsWith("http")
        ? hrefSuffix
        : `${galleryUrl}${hrefSuffix?.startsWith("/") ? hrefSuffix : `/${hrefSuffix ?? ""}`}`;

      const layout =
        layoutRaw === "feature" || layoutRaw === "tall" || layoutRaw === "wide"
          ? layoutRaw
          : "square";

      return {
        id,
        src: `${cloudinaryBase}/${file}`,
        alt: title,
        title,
        href,
        layout,
      };
    })
    .filter((image): image is GalleryImage => image !== null);

  return {
    url: galleryUrl,
    intro: attributes.intro ?? "Blender studies, stills, and experiments.",
    images,
  };
}

export function getGalleryBackground() {
  return getGalleryImages()[0]?.src ?? "";
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

export function getTimelineMeta() {
  const { attributes } = readMarkdownFile("timeline.md");
  return {
    title: attributes.title ?? "History",
    description:
      attributes.description ??
      "Chronological timeline of projects, fellowships, and milestones.",
  };
}

