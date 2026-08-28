import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllPeople } from "@/lib/people";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const people = getAllPeople();
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
      url: `${site.url}/people`,
      lastModified: new Date(site.lastUpdated),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...people.map((person) => ({
      url: `${site.url}/people/${person.slug}`,
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
