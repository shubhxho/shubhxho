import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { Tip } from "@/components/hover-tip";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from shubhxho on building software, systems, and useful things.",
  alternates: { canonical: "/blog" },
  openGraph: { url: `${site.url}/blog`, type: "website" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="flex-1 px-6 py-12 sm:px-8 sm:py-16">
      <FadeIn className="mx-auto max-w-3xl">
        <p className="mb-3 text-[11px] tracking-[0.22em] text-signal uppercase">notes</p>
        <h1 className="mb-2 text-[1.75rem] font-bold tracking-tight sm:text-3xl">blog</h1>
        <p className="mb-10 max-w-xl text-[15px] text-muted-foreground sm:text-base">
          short notes on building, learning, and shipping useful work.
        </p>
        <div className="space-y-3">
          {posts.map((post) => (
            <article key={post.slug} className="panel group p-4 transition-colors hover:border-accent/40">
              <p className="text-xs text-muted-foreground">
                {formatPostDate(post.date).toLowerCase()} · {post.readingTime}
              </p>
              <h2 className="mt-1.5 text-[15px] leading-6 sm:text-base">
                <Tip tip={`${post.readingTime} · open note`} as="span">
                  <Link href={`/blog/${post.slug}`} className="font-bold group-hover:text-accent">
                    {post.title.toLowerCase()}
                  </Link>
                </Tip>
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{post.description}</p>
            </article>
          ))}
        </div>
      </FadeIn>
    </main>
  );
}
