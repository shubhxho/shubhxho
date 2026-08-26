import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
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
        <h1 className="mb-2 text-3xl font-bold tracking-tight">blog</h1>
        <p className="mb-8 max-w-xl text-base text-muted-foreground">
          short notes on building, learning, and shipping useful work.
        </p>
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.slug}>
              <p className="text-sm text-muted-foreground">
                {formatPostDate(post.date).toLowerCase()} · {post.readingTime}
              </p>
              <p className="mt-1 text-base">
                <Link href={`/blog/${post.slug}`} className="font-bold hover:text-muted-foreground">
                  {post.title.toLowerCase()}
                </Link>
              </p>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">{post.description}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </main>
  );
}
