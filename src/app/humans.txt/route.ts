import { getHumansText } from "@/lib/discovery";

export const dynamic = "force-static";

export function GET() {
  return new Response(getHumansText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=604800",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
