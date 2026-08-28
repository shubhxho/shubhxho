import { getPage, getPageMarkdown, pageSlugs } from "@/lib/pages";
import { site } from "@/lib/site";

type PageMarkdownRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";

export function generateStaticParams() {
  return pageSlugs.map((slug) => ({ slug }));
}

export async function GET(_request: Request, { params }: PageMarkdownRouteProps) {
  const { slug } = await params;
  if (!pageSlugs.includes(slug as (typeof pageSlugs)[number])) {
    return new Response("Not found", { status: 404 });
  }

  const pageSlug = slug as (typeof pageSlugs)[number];
  const page = getPage(pageSlug);
  const markdown = getPageMarkdown(pageSlug);

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      Link: `<${site.url}/${page.slug}>; rel="canonical"`,
      Vary: "Accept, Accept-Encoding",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
