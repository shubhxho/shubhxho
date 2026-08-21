import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: ["OAI-SearchBot", "GPTBot", "ChatGPT-User"],
        allow: "/",
      },
      {
        userAgent: ["ClaudeBot", "Claude-SearchBot", "Claude-User"],
        allow: "/",
      },
      {
        userAgent: [
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "Amazonbot",
          "CCBot",
          "cohere-ai",
          "Bytespider",
          "meta-externalagent",
        ],
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
