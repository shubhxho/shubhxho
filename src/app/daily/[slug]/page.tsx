import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DailyView } from "@/components/daily-view";
import { FadeIn } from "@/components/fade-in";
import { getAllDaily, getDaily, getDailyPath } from "@/lib/daily";
import { site } from "@/lib/site";

type DailyPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllDaily().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: DailyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getDaily(slug);
  if (!entry) return {};
  const path = getDailyPath(entry);

  return {
    title: entry.title,
    description: entry.description,
    alternates: {
      canonical: path,
      types: {
        "text/markdown": `${site.url}${path}.md`,
      },
    },
    openGraph: {
      type: "article",
      url: `${site.url}${path}`,
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
        <DailyView variant="entry" entry={entry} />
      </FadeIn>
    </main>
  );
}
