import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/fade-in";
import { MdxArticle } from "@/components/mdx-article";
import { formatPostDate } from "@/lib/blog";
import { getAllDaily, getDaily } from "@/lib/daily";
import { site } from "@/lib/site";

type DailyPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllDaily().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: DailyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getDaily(slug);
  if (!entry) return {};

  return {
    title: entry.title,
    description: entry.description,
    alternates: {
      canonical: `/daily/${entry.slug}`,
      types: {
        "text/markdown": `${site.url}/daily/${entry.slug}.md`,
      },
    },
    openGraph: {
      type: "article",
      url: `${site.url}/daily/${entry.slug}`,
      publishedTime: entry.date,
      title: entry.title,
      description: entry.description,
    },
  };
}

export default async function DailyEntryPage({ params }: DailyPageProps) {
  const { slug } = await params;
  const entry = getDaily(slug);
  if (!entry) notFound();

  return (
    <main className="flex-1 px-5 py-16 sm:px-6 sm:py-24">
      <FadeIn className="site-shell">
        <p className="mb-8 text-sm">
          <Link href="/daily" className="ink-link">
            ← all daily
          </Link>
        </p>
        <p className="text-xs text-muted-foreground">{formatPostDate(entry.date)}</p>
        <h1 className="mt-3 mb-10 text-[clamp(1.8rem,5vw,2.6rem)] leading-[1.15] font-bold tracking-tight text-pretty">
          {entry.title}
        </h1>
        <MdxArticle content={entry.content} />
      </FadeIn>
    </main>
  );
}
