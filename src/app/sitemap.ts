import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(site.lastUpdated),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${site.url}/opengraph-image`],
    },
    ...["about", "contact", "privacy"].map((path) => ({
      url: `${site.url}/${path}`,
      lastModified: new Date(site.lastUpdated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
