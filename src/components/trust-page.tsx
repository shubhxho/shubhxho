import { notFound } from "next/navigation";
import { FadeIn } from "@/components/fade-in";
import { MdxArticle } from "@/components/mdx-article";
import Link from "next/link";
import type { ContentPageSlug } from "@/lib/pages";
import { getPage, pageSlugs } from "@/lib/pages";

export function TrustPage({ slug }: { slug: ContentPageSlug }) {
  const page = getPage(slug);
  if (!page) notFound();

  return (
    <main className="flex-1 px-5 py-16 sm:px-6 sm:py-24">
      <FadeIn className="site-shell">
        <h1 className="mb-8 text-[clamp(1.8rem,5vw,2.6rem)] leading-[1.15] font-bold tracking-tight">
          {page.heading}
        </h1>
        <MdxArticle content={page.content} />
        <p className="mt-10 flex flex-wrap gap-x-3 gap-y-2 text-sm">
          {pageSlugs.map((pageSlug) => (
            <Link key={pageSlug} href={`/${pageSlug}`} className="ink-link">
              {pageSlug}
            </Link>
          ))}
          <Link href="/blog" className="ink-link">
            writing
          </Link>
        </p>
      </FadeIn>
    </main>
  );
}
