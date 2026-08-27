import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { TimelineList } from "@/components/timeline-list";
import { getHomeContent, getTimeline, getTimelineMeta } from "@/lib/content";
import { site } from "@/lib/site";

const meta = getTimelineMeta();
const home = getHomeContent();

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/history" },
  openGraph: { url: `${site.url}/history` },
};

export default function HistoryPage() {
  const timeline = getTimeline();

  return (
    <main className="flex-1 px-5 py-16 sm:px-6 sm:py-24">
      <FadeIn className="site-shell">
        <p className="mb-3 text-sm text-muted-foreground">{home.name}</p>
        <h1 className="text-[clamp(2rem,6vw,3rem)] font-bold tracking-tight">{meta.title}</h1>
        <p className="mt-4 mb-10 max-w-[38rem] text-sm leading-7 text-muted-foreground">
          {meta.description}
        </p>
        <TimelineList entries={timeline} />
        <p className="mt-10 text-sm">
          <Link href="/" className="ink-link">
            ← home
          </Link>
        </p>
      </FadeIn>
    </main>
  );
}
