import { getAllNotes, getAllPosts, getPostPath } from "@/lib/blog";
import { getAllDaily, getDailyPath } from "@/lib/daily";
import { getAllEssays } from "@/lib/essays";
import { getPages } from "@/lib/pages";
import { getAllPeople } from "@/lib/people";
import { site } from "@/lib/site";
import type { MetadataRoute } from "next";

function entry(
  path: string,
  options: {
    lastModified?: Date;
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  },
): MetadataRoute.Sitemap[number] {
  return {
    url: `${site.url}${path}`,
    lastModified: options.lastModified ?? new Date(site.lastUpdated),
    changeFrequency: options.changeFrequency ?? "monthly",
    priority: options.priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const essays = getAllEssays();
  const notes = getAllNotes();
  const daily = getAllDaily();
  const people = getAllPeople();
  const pages = getPages();

  return [
    {
      url: site.url,
      lastModified: new Date(site.lastUpdated),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${site.url}/opengraph-image`],
    },
    entry("/essays", {
      lastModified: new Date(essays[0]?.date ?? site.lastUpdated),
      changeFrequency: "weekly",
      priority: 0.85,
    }),
    ...essays.map((essay) =>
      entry(getPostPath(essay), {
        lastModified: new Date(essay.date),
        priority: 0.75,
      }),
    ),
    entry("/blog", {
      lastModified: new Date(posts[0]?.date ?? site.lastUpdated),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
    ...notes.map((post) =>
      entry(getPostPath(post), {
        lastModified: new Date(post.date),
        priority: 0.7,
      }),
    ),
    entry("/daily", {
      lastModified: new Date(daily[0]?.date ?? site.lastUpdated),
      changeFrequency: "daily",
      priority: 0.7,
    }),
    ...daily.map((note) =>
      entry(getDailyPath(note), {
        lastModified: new Date(note.date),
        changeFrequency: "yearly",
        priority: 0.6,
      }),
    ),
    entry("/people", { priority: 0.7 }),
    ...people.map((person) => entry(`/people/${person.slug}`, { changeFrequency: "yearly", priority: 0.6 })),
    entry("/gallery", { priority: 0.7 }),
    entry("/history", { priority: 0.7 }),
    ...pages.map((page) => entry(`/${page.slug}`, { priority: page.slug === "privacy" ? 0.5 : 0.6 })),
  ];
}
