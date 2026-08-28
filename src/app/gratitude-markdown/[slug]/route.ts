import { getAllPeople, getPersonMarkdown } from "@/lib/people";
import { site } from "@/lib/site";

type PersonMarkdownRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllPeople().map(({ slug }) => ({ slug }));
}

export async function GET(_request: Request, { params }: PersonMarkdownRouteProps) {
  const { slug } = await params;
  const markdown = getPersonMarkdown(slug);

  if (!markdown) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      Link: `<${site.url}/gratitude/${slug}>; rel="canonical"`,
      Vary: "Accept, Accept-Encoding",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
