export type HomeContent = {
  name: string;
  headline: string;
  bio: string;
  projectsLabel: string;
  galleryLabel: string;
  galleryUrl: string;
  galleryLinkLabel: string;
  galleryExternalUrl: string;
  essaysLabel: string;
  essaysUrl: string;
  essaysLinkLabel: string;
  essaysPreviewCount: number;
  writingLabel: string;
  writingLinkLabel: string;
  writingPreviewCount: number;
  dailyLabel: string;
  dailyUrl: string;
  dailyLinkLabel: string;
  dailyPreviewCount: number;
  historyLabel: string;
  historyUrl: string;
  historyLinkLabel: string;
  historyPreviewCount: number;
  peopleLabel: string;
  peopleUrl: string;
  peopleLinkLabel: string;
  peoplePreviewCount: number;
  contactLabel: string;
  footerCredit: string;
};

export type Person = {
  slug: string;
  name: string;
  href: string;
  order: number;
  content: string;
  plainNote: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  href: string;
  role: string;
  year: string;
  tip: string;
  order: number;
};

export type GalleryLayout = "feature" | "tall" | "wide" | "square";

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  title: string;
  href: string;
  layout: GalleryLayout;
};

export type GalleryContent = {
  url: string;
  intro: string;
  images: GalleryImage[];
};

export type ContentPage = {
  slug: string;
  title: string;
  description: string;
  heading: string;
  content: string;
};

export const pageSlugs = ["about", "contact", "privacy", "readme"] as const;

export type ContentPageSlug = (typeof pageSlugs)[number];

export type TimelineEntry = {
  date: string;
  text: string;
  plainText: string;
};

export type PostKind = "essay" | "note";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  kind: PostKind;
  readingTime: string;
  content: string;
};

export type DailyEntry = {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
};
