import type { Metadata } from "next";
import Link from "next/link";
import { DailyView } from "@/components/daily-view";
import { FadeIn } from "@/components/fade-in";
import { getHomeContent } from "@/lib/content";
import { getAllDaily, getDailyMeta } from "@/lib/daily";
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
  const entries = getAllDaily();

  return (
    <main className="flex-1 px-5 py-16 sm:px-6 sm:py-24">
      <FadeIn className="site-shell">
        <p className="mb-3 text-sm text-muted-foreground">{home.name}</p>
        <DailyView variant="index" title={meta.title} intro={meta.intro} entries={entries} />
        <p className="mt-10 text-sm">
          <Link href="/" className="ink-link">
            ← home
          </Link>
        </p>
      </FadeIn>
    </main>
  );
}
