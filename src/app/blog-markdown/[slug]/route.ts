import { getAllNotes, getNoteMarkdown } from "@/lib/blog";
import { site } from "@/lib/site";

type BlogMarkdownRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllNotes().map(({ slug }) => ({ slug }));
}

export async function GET(_request: Request, { params }: BlogMarkdownRouteProps) {
  const { slug } = await params;
  const markdown = getNoteMarkdown(slug);

  if (!markdown) return new Response("Not found", { status: 404 });

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      Link: `<${site.url}/blog/${slug}>; rel="canonical"`,
      Vary: "Accept, Accept-Encoding",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
