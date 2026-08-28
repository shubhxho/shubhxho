import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllPeople } from "@/lib/people";
import { pageSlugs } from "@/lib/pages";
import { site } from "@/lib/site";

function entry(
  path: string,
  options: {
    lastModified?: Date;
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  },
): MetadataRoute.Sitemap[number] {
  return {
    url: path.startsWith("http") ? path : `${site.url}${path}`,
    lastModified: options.lastModified ?? new Date(site.lastUpdated),
    changeFrequency: options.changeFrequency ?? "monthly",
    priority: options.priority,
  };
}

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
    entry("/blog", {
      lastModified: new Date(posts[0]?.date ?? site.lastUpdated),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
    ...posts.map((post) =>
      entry(`/blog/${post.slug}`, {
        lastModified: new Date(post.date),
        priority: 0.7,
      }),
    ),
    entry("/people", { priority: 0.7 }),
    ...people.map((person) => entry(`/people/${person.slug}`, { changeFrequency: "yearly", priority: 0.6 })),
    entry("/gallery", { priority: 0.7 }),
    entry("/history", { priority: 0.7 }),
    ...pageSlugs.map((slug) => entry(`/${slug}`, { priority: 0.6 })),
  ];
}
