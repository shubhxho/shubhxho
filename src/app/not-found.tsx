import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 pt-28 pb-32 sm:px-8">
      <article className="font-inter">
        <p className="font-ibm text-xs text-muted-foreground">404 / NOT FOUND.</p>
        <h1 className="mt-4 font-instrument text-4xl leading-none sm:text-5xl">Page not found</h1>
        <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">
          This path is not part of the official Shubh Gupta site. Start from the homepage,
          browse the canonical sitemap, or use the agent guide to find a public resource.
        </p>
        <nav aria-label="Recovery links" className="mt-8 flex flex-wrap gap-4 font-ibm text-xs">
          <Link href="/" className="hover:underline">HOMEPAGE</Link>
          <a href="/sitemap.xml" className="hover:underline">SITEMAP</a>
          <a href="/llms.txt" className="hover:underline">LLMS.TXT</a>
          <a href="/profile.md" className="hover:underline">MARKDOWN PROFILE</a>
        </nav>
      </article>
    </main>
  );
}
