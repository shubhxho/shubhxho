import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { MarkdownArticle } from "@/components/markdown-article";
import type { ContentPageSlug } from "@/lib/content";
import { getPage } from "@/lib/content";

export function TrustPage({ slug }: { slug: ContentPageSlug }) {
  const page = getPage(slug);

  return (
    <main className="flex-1 px-5 py-16 sm:px-6 sm:py-24">
      <FadeIn className="site-shell">
        <h1 className="mb-8 text-[clamp(1.8rem,5vw,2.6rem)] leading-[1.15] font-bold tracking-tight">
          {page.heading}
        </h1>
        <MarkdownArticle content={page.content} />
        <p className="mt-10 flex flex-wrap gap-x-3 gap-y-2 text-sm">
          <Link href="/about" className="ink-link">
            about
          </Link>
          <Link href="/contact" className="ink-link">
            contact
          </Link>
          <Link href="/privacy" className="ink-link">
            privacy
          </Link>
          <Link href="/blog" className="ink-link">
            writing
          </Link>
        </p>
      </FadeIn>
    </main>
  );
}
