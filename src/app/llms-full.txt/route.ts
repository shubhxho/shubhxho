import { getFullProfileMarkdown } from "@/lib/discovery";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return new Response(getFullProfileMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      Link: `<${site.url}/llms-full.txt>; rel="canonical", <${site.url}/llms.txt>; rel="alternate"`,
      Vary: "Accept, Accept-Encoding",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
