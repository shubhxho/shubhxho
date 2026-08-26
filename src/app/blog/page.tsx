import type { Metadata } from "next";
import Link from "next/link";
import { PageMotion } from "@/components/page-motion";
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
    <PageMotion>
      <section className="mx-auto max-w-3xl" data-reveal-group>
        <p className="text-[11px] tracking-[0.22em] text-signal uppercase" data-intro>
          writing
        </p>
        <h1 className="mt-4 text-4xl leading-none font-medium tracking-[-0.04em] text-balance sm:text-5xl" data-intro>
          Notes from the workbench
        </h1>
        <div className="reveal-line mt-8 h-px w-full bg-linear-to-r from-accent via-border to-transparent" />
        <p className="mt-6 max-w-[48ch] text-pretty text-muted-foreground" data-intro>
          Short writing on building, learning, systems, and getting useful work into the world.
        </p>
        <ul className="mt-10 border-y border-border" role="list">
          {posts.map((post) => (
            <li key={post.slug} className="reveal-item border-b border-border last:border-b-0">
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-2 py-6 sm:grid-cols-[8rem_1fr] sm:items-baseline sm:gap-6"
              >
                <p className="text-[12px] text-muted-foreground tabular-nums">
                  {formatPostDate(post.date)}
                  <span className="mt-1 block text-signal/80">{post.readingTime}</span>
                </p>
                <div>
                  <h2 className="text-lg font-medium tracking-tight group-hover:text-accent sm:text-xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-[52ch] text-[13px] text-pretty text-muted-foreground">
                    {post.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageMotion>
  );
}
