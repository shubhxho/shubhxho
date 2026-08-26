import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-dvh px-5 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-24">
      <article className="mx-auto max-w-2xl animate-rise">
        <p className="text-[12px] tracking-wide text-accent uppercase">404</p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">Page not found</h1>
        <p className="mt-4 max-w-[42ch] text-pretty text-muted-foreground">
          This path is not part of the site. Start from the homepage or browse writing.
        </p>
        <nav aria-label="Recovery links" className="mt-8 flex flex-wrap gap-4 text-[12px] text-muted-foreground">
          <Link href="/" className="hover:text-accent">home</Link>
          <Link href="/blog" className="hover:text-accent">writing</Link>
          <a href="/sitemap.xml" className="hover:text-accent">sitemap</a>
        </nav>
      </article>
    </main>
  );
}
