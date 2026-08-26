import type { Metadata } from "next";
import Link from "next/link";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes from shubhxho on building software, systems, and useful things.",
  alternates: { canonical: "/blog" },
  openGraph: { url: `${site.url}/blog`, type: "website" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-dvh px-5 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-24">
      <section className="mx-auto max-w-2xl animate-rise">
        <p className="text-[12px] tracking-wide text-accent uppercase">writing</p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Notes from the workbench
        </h1>
        <p className="mt-4 max-w-[48ch] text-pretty text-muted-foreground">
          Short writing on building, learning, systems, and getting useful work into the world.
        </p>
        <ul className="mt-10 divide-y divide-border border-y border-border" role="list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-2 py-5 sm:grid-cols-[7.5rem_1fr] sm:items-baseline sm:gap-6"
              >
                <p className="text-[12px] text-muted-foreground tabular-nums">
                  {formatPostDate(post.date)}
                  <span className="mt-1 block sm:mt-0 sm:inline sm:before:mx-1 sm:before:content-['·']">
                    {post.readingTime}
                  </span>
                </p>
                <div>
                  <h2 className="font-medium group-hover:text-accent">{post.title}</h2>
                  <p className="mt-1 max-w-[52ch] text-[13px] text-pretty text-muted-foreground">
                    {post.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
