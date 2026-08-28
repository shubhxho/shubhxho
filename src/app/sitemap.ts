import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllGratitude } from "@/lib/gratitude";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const gratitude = getAllGratitude();
  return [
    {
      url: site.url,
      lastModified: new Date(site.lastUpdated),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${site.url}/opengraph-image`],
    },
    {
      url: `${site.url}/blog`,
      lastModified: new Date(posts[0]?.date ?? site.lastUpdated),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${site.url}/gratitude`,
      lastModified: new Date(site.lastUpdated),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...gratitude.map((entry) => ({
      url: `${site.url}/gratitude/${entry.slug}`,
      lastModified: new Date(site.lastUpdated),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...["about", "contact", "privacy", "gallery", "history"].map((path) => ({
      url: `${site.url}/${path}`,
      lastModified: new Date(site.lastUpdated),
      changeFrequency: "monthly" as const,
      priority: path === "gallery" || path === "history" ? 0.7 : 0.6,
    })),
  ];
}
