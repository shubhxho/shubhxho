import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostList } from "@/components/blog-post-list";
import { FadeIn } from "@/components/fade-in";
import { getAllDaily, getDailyMeta } from "@/lib/daily";
import { getHomeContent } from "@/lib/content";
import { site } from "@/lib/site";

const meta = getDailyMeta();
const home = getHomeContent();

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: "/daily",
    types: {
      "text/markdown": `${site.url}/daily.md`,
    },
  },
  openGraph: { url: `${site.url}/daily` },
};

export default function DailyPage() {
  const entries = getAllDaily().map((entry) => ({
    slug: entry.slug,
    title: entry.title,
    date: entry.date,
  }));

  return (
    <main className="flex-1 px-5 py-16 sm:px-6 sm:py-24">
      <FadeIn className="site-shell">
        <p className="mb-3 text-sm text-muted-foreground">{home.name}</p>
        <h1 className="text-[clamp(2rem,6vw,3rem)] font-bold tracking-tight">{meta.title}</h1>
        <p className="mt-4 mb-10 max-w-[38rem] text-sm leading-7 text-muted-foreground">
          {meta.intro}
        </p>
        <BlogPostList posts={entries} basePath="/daily" />
        <p className="mt-10 text-sm">
          <Link href="/" className="ink-link">
            ← home
          </Link>
        </p>
      </FadeIn>
    </main>
  );
}
