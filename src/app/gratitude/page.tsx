import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { GratitudeView } from "@/components/gratitude-view";
import { getHomeContent } from "@/lib/content";
import { getAllGratitude, getGratitude, getGratitudeMeta } from "@/lib/gratitude";
import { site } from "@/lib/site";

const meta = getGratitudeMeta();
const home = getHomeContent();

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: "/gratitude",
    types: {
      "text/markdown": `${site.url}/gratitude.md`,
    },
  },
  openGraph: { url: `${site.url}/gratitude` },
};

export default function GratitudePage() {
  const entries = getAllGratitude();

  return (
    <main className="flex-1 px-5 py-16 sm:px-6 sm:py-24">
      <FadeIn className="site-shell">
        <p className="mb-3 text-sm text-muted-foreground">{home.name}</p>
        <GratitudeView variant="index" title={meta.title} intro={meta.intro} entries={entries} />
        <p className="mt-10 text-sm">
          <Link href="/" className="ink-link">
            ← home
          </Link>
        </p>
      </FadeIn>
    </main>
  );
}
