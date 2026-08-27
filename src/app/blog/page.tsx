import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { Tip } from "@/components/hover-tip";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and notes from shubhxho on robotics, systems software, projects, and the path from Khagaria.",
  alternates: { canonical: "/blog" },
  openGraph: { url: `${site.url}/blog`, type: "website" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="flex-1 px-5 py-16 sm:px-6 sm:py-24">
      <FadeIn className="site-shell">
        <h1 className="mb-2 text-[clamp(1.8rem,5vw,2.6rem)] font-bold tracking-tight">Writing</h1>
        <p className="mb-10 max-w-xl text-sm leading-7 text-muted-foreground">
          Notes on projects, robotics, and building from Khagaria — {posts.length} posts.
        </p>
        <ul className="divide-y divide-border border-y border-border">
          {posts.map((post) => (
            <li key={post.slug}>
              <Tip tip={`${post.readingTime} · open note`} as="div">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block py-5 transition-colors hover:bg-foreground hover:text-inverse"
                >
                  <p className="text-xs text-muted-foreground">
                    {formatPostDate(post.date)} · {post.readingTime}
                  </p>
                  <h2 className="mt-2 text-[0.95rem] font-bold">{post.title}</h2>
                  <p className="mt-2 max-w-xl text-sm text-muted-foreground">{post.description}</p>
                </Link>
              </Tip>
            </li>
          ))}
        </ul>
      </FadeIn>
    </main>
  );
}
