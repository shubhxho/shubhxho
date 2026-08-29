import { getAllEssays, getEssayMarkdown } from "@/lib/essays";
import { site } from "@/lib/site";

type EssayMarkdownRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllEssays().map(({ slug }) => ({ slug }));
}

export async function GET(_request: Request, { params }: EssayMarkdownRouteProps) {
  const { slug } = await params;
  const markdown = getEssayMarkdown(slug);

  if (!markdown) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      Link: `<${site.url}/essays/${slug}>; rel="canonical"`,
      Vary: "Accept, Accept-Encoding",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
