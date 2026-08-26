import Link from "next/link";
import type { Metadata } from "next";
import { PageMotion } from "@/components/page-motion";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <PageMotion>
      <article className="mx-auto max-w-3xl">
        <p className="text-[11px] tracking-[0.22em] text-signal uppercase" data-intro>
          404
        </p>
        <h1 className="mt-4 text-4xl leading-none font-medium tracking-[-0.04em] sm:text-5xl" data-intro>
          Page not found
        </h1>
        <div className="reveal-line mt-8 h-px w-full bg-linear-to-r from-accent via-border to-transparent" />
        <p className="mt-6 max-w-[42ch] text-pretty text-muted-foreground" data-intro>
          This path is not part of the site. Start from the homepage or browse writing.
        </p>
        <nav aria-label="Recovery links" className="mt-8 flex flex-wrap gap-4 text-[12px] text-muted-foreground" data-intro>
          <Link href="/" className="hover:text-accent">
            home
          </Link>
          <Link href="/blog" className="hover:text-accent">
            writing
          </Link>
          <a href="/sitemap.xml" className="hover:text-accent">
            sitemap
          </a>
        </nav>
      </article>
    </PageMotion>
  );
}
