export type HomeContent = {
  name: string;
  headline: string;
  bio: string;
  projectsLabel: string;
  galleryLabel: string;
  galleryUrl: string;
  galleryLinkLabel: string;
  writingLabel: string;
  writingLinkLabel: string;
  writingPreviewCount: number;
  contactLabel: string;
  footerCredit: string;
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

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  href: string;
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
