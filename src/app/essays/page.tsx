import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostList } from "@/components/blog-post-list";
import { FadeIn } from "@/components/fade-in";
import { getHomeContent } from "@/lib/content";
import { getAllEssays, getEssaysMeta, toEssayListItem } from "@/lib/essays";
import { site } from "@/lib/site";

const home = getHomeContent();
const meta = getEssaysMeta();

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: "/essays",
    types: {
      "text/markdown": `${site.url}/essays.md`,
    },
  },
  openGraph: { url: `${site.url}/essays`, type: "website" },
};

export default function EssaysPage() {
  const essays = getAllEssays().map(toEssayListItem);

  return (
    <main className="flex-1 px-5 py-16 sm:px-6 sm:py-24">
      <FadeIn className="site-shell">
        <p className="mb-3 text-sm text-muted-foreground">{home.name}</p>
        <h1 className="text-[clamp(2rem,6vw,3rem)] font-bold tracking-tight">{meta.title}</h1>
        <p className="mt-4 mb-10 max-w-[38rem] text-sm leading-7 text-muted-foreground">
          {meta.intro}{" "}
          <Link href="/blog" className="ink-link text-foreground">
            All writing
          </Link>
          .
        </p>
        <BlogPostList posts={essays} />
        <p className="mt-10 text-sm">
          <Link href="/" className="ink-link">
            ← home
          </Link>
        </p>
      </FadeIn>
    </main>
  );
}
