import { getPage, getPageMarkdown, isPageSlug, pageSlugs } from "@/lib/pages";
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
  if (!isPageSlug(slug)) {
    return new Response("Not found", { status: 404 });
  }

  const page = getPage(slug);
  const markdown = getPageMarkdown(slug);

  if (!page || !markdown) {
    return new Response("Not found", { status: 404 });
  }

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
