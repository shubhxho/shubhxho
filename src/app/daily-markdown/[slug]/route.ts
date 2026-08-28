import { getAllDaily, getDailyMarkdown } from "@/lib/daily";
import { site } from "@/lib/site";

type DailyMarkdownRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllDaily().map(({ slug }) => ({ slug }));
}

export async function GET(_request: Request, { params }: DailyMarkdownRouteProps) {
  const { slug } = await params;
  const markdown = getDailyMarkdown(slug);

  if (!markdown) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      Link: `<${site.url}/daily/${slug}>; rel="canonical"`,
      Vary: "Accept, Accept-Encoding",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
