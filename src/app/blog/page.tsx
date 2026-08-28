import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostList } from "@/components/blog-post-list";
import { FadeIn } from "@/components/fade-in";
import { getAllPosts } from "@/lib/blog";
import { getHomeContent } from "@/lib/content";
import { site } from "@/lib/site";

const home = getHomeContent();

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and notes from shubhxho on robotics, systems software, projects, and the path from Khagaria.",
  alternates: { canonical: "/blog" },
  openGraph: { url: `${site.url}/blog`, type: "website" },
};

export default function BlogPage() {
  const posts = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
  }));

  return (
    <main className="flex-1 px-5 py-16 sm:px-6 sm:py-24">
      <FadeIn className="site-shell">
        <p className="mb-3 text-sm text-muted-foreground">{home.name}</p>
        <h1 className="text-[clamp(2rem,6vw,3rem)] font-bold tracking-tight">{home.writingLabel}</h1>
        <div className="mt-10">
          <BlogPostList posts={posts} />
        </div>
        <p className="mt-10 text-sm">
          <Link href="/" className="ink-link">
            ← home
          </Link>
        </p>
      </FadeIn>
    </main>
  );
}
