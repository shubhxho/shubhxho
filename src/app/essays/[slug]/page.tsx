import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/fade-in";
import { MdxArticle } from "@/components/mdx-article";
import { formatPostDate, getAllEssays, getEssay } from "@/lib/essays";
import { site } from "@/lib/site";

type EssayPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllEssays().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: EssayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) return {};
  return {
    title: essay.title,
    description: essay.description,
    alternates: {
      canonical: `/essays/${essay.slug}`,
      types: {
        "text/markdown": `${site.url}/essays/${essay.slug}.md`,
      },
    },
    openGraph: {
      type: "article",
      url: `${site.url}/essays/${essay.slug}`,
      publishedTime: essay.date,
      title: essay.title,
      description: essay.description,
    },
  };
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) notFound();

  return (
    <main className="flex-1 px-5 py-16 sm:px-6 sm:py-24">
      <FadeIn className="site-shell">
        <p className="mb-8 text-sm">
          <Link href="/essays" className="ink-link">
            ← all essays
          </Link>
        </p>
        <p className="text-xs text-muted-foreground">
          {formatPostDate(essay.date)} · {essay.readingTime}
        </p>
        <h1 className="mt-3 mb-4 text-[clamp(1.8rem,5vw,2.6rem)] leading-[1.15] font-bold tracking-tight text-pretty">
          {essay.title}
        </h1>
        <p className="mb-10 max-w-xl text-sm leading-7 text-muted-foreground">{essay.description}</p>
        <MdxArticle content={essay.content} />
      </FadeIn>
    </main>
  );
}
