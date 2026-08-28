export type HomeContent = {
  name: string;
  headline: string;
  bio: string;
  projectsLabel: string;
  galleryLabel: string;
  galleryUrl: string;
  galleryLinkLabel: string;
  galleryExternalUrl: string;
  writingLabel: string;
  writingLinkLabel: string;
  writingPreviewCount: number;
  historyLabel: string;
  historyUrl: string;
  historyLinkLabel: string;
  historyPreviewCount: number;
  gratitudeLabel: string;
  gratitudeUrl: string;
  gratitudeLinkLabel: string;
  gratitudePreviewCount: number;
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

/** @deprecated Use Person */
export type GratitudeEntry = Person;

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

export type ContentPageSlug = "about" | "contact" | "privacy";

export type TimelineEntry = {
  date: string;
  text: string;
  plainText: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  content: string;
};
