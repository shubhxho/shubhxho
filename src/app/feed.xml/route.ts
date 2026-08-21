import { getRssFeed } from "@/lib/discovery";

export const dynamic = "force-static";

export function GET() {
  return new Response(getRssFeed(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
