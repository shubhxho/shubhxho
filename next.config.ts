import type { NextConfig } from "next";
import { pageSlugs } from "./src/lib/content-types";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dtq4hbiya/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/people/:slug.md",
        destination: "/people-markdown/:slug",
      },
      ...pageSlugs.map((slug) => ({
        source: `/${slug}.md`,
        destination: `/page-markdown/${slug}`,
      })),
    ];
  },
  async redirects() {
    return [
      { source: "/gratitude", destination: "/people", permanent: true },
      { source: "/gratitude.md", destination: "/people.md", permanent: true },
      { source: "/gratitude/:slug", destination: "/people/:slug", permanent: true },
      { source: "/gratitude/:slug.md", destination: "/people/:slug.md", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Vary", value: "Accept, Accept-Encoding" },
        ],
      },
    ];
  },
};

export default nextConfig;
