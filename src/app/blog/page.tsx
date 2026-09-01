import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostList } from "@/components/blog-post-list";
import { FadeIn } from "@/components/fade-in";
import { getAllNotes, getBlogMeta, getPostPath } from "@/lib/blog";
import { getHomeContent } from "@/lib/content";
import { site } from "@/lib/site";

const home = getHomeContent();
const meta = getBlogMeta();

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/blog", types: { "text/markdown": `${site.url}/blog.md` } },
  openGraph: { url: `${site.url}/blog`, type: "website" },
};

export default function BlogPage() {
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
        <h1 className="text-[clamp(2rem,6vw,3rem)] font-bold tracking-tight">{meta.title}</h1>
        <p className="mt-4 mb-10 max-w-[38rem] text-sm leading-7 text-muted-foreground">
          {meta.intro}
        </p>
        <section aria-labelledby="posts-index-label">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 id="posts-index-label" className="text-xl font-bold tracking-tight">
              Latest posts
            </h2>
            <Link href="/essays" className="ink-link text-sm">
              {meta.essaysLabel}
            </Link>
          </div>
          <BlogPostList posts={notes} />
        </section>
        <p className="mt-10 text-sm">
          <Link href="/" className="ink-link">
            ← home
          </Link>
        </p>
      </FadeIn>
    </main>
  );
}
