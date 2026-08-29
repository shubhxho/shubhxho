import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostList } from "@/components/blog-post-list";
import { FadeIn } from "@/components/fade-in";
import { getAllNotes, getPostPath } from "@/lib/blog";
import { getHomeContent } from "@/lib/content";
import { getAllEssays, toEssayListItem } from "@/lib/essays";
import { site } from "@/lib/site";

const home = getHomeContent();

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and project notes from shubhxho on robotics, systems software, and the path from Khagaria.",
  alternates: { canonical: "/blog" },
  openGraph: { url: `${site.url}/blog`, type: "website" },
};

export default function BlogPage() {
  const essays = getAllEssays().map(toEssayListItem);
  const notes = getAllNotes().map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    description: post.description,
    readingTime: post.readingTime,
    href: getPostPath(post),
  }));

  return (
    <main className="flex-1 px-5 py-16 sm:px-6 sm:py-24">
      <FadeIn className="site-shell">
        <p className="mb-3 text-sm text-muted-foreground">{home.name}</p>
        <h1 className="text-[clamp(2rem,6vw,3rem)] font-bold tracking-tight">{home.writingLabel}</h1>
        <p className="mt-4 mb-10 max-w-[38rem] text-sm leading-7 text-muted-foreground">
          Essays first, then shorter project notes.
        </p>
        <section aria-labelledby="essays-index-label">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 id="essays-index-label" className="text-xl font-bold tracking-tight">
              {home.essaysLabel}
            </h2>
            <Link href="/essays" className="ink-link text-sm">
              {home.essaysLinkLabel}
            </Link>
          </div>
          <BlogPostList posts={essays} />
        </section>
        {notes.length > 0 ? (
          <section className="mt-16" aria-labelledby="notes-index-label">
            <h2 id="notes-index-label" className="mb-6 text-xl font-bold tracking-tight">
              Notes
            </h2>
            <BlogPostList posts={notes} />
          </section>
        ) : null}
        <p className="mt-10 text-sm">
          <Link href="/" className="ink-link">
            ← home
          </Link>
        </p>
      </FadeIn>
    </main>
  );
}
