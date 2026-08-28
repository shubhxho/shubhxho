import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/fade-in";
import { GratitudeView } from "@/components/gratitude-view";
import { getAllGratitude, getGratitude } from "@/lib/gratitude";
import { site } from "@/lib/site";

type GratitudePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllGratitude().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: GratitudePageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getGratitude(slug);
  if (!entry) return {};
  return {
    title: entry.name,
    description: entry.plainNote,
    alternates: {
      canonical: `/gratitude/${entry.slug}`,
      types: {
        "text/markdown": `${site.url}/gratitude/${entry.slug}.md`,
      },
    },
    openGraph: {
      type: "article",
      url: `${site.url}/gratitude/${entry.slug}`,
      title: entry.name,
      description: entry.plainNote,
    },
  };
}

export default async function GratitudeEntryPage({ params }: GratitudePageProps) {
  const { slug } = await params;
  const entry = getGratitude(slug);
  if (!entry) notFound();

  return (
    <main className="flex-1 px-5 py-16 sm:px-6 sm:py-24">
      <FadeIn className="site-shell">
        <GratitudeView variant="entry" entry={entry} />
      </FadeIn>
    </main>
  );
}
