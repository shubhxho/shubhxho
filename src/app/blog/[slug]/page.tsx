import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownArticle } from "@/components/markdown-article";
import { PageMotion } from "@/components/page-motion";
import { formatPostDate, getAllPosts, getPost } from "@/lib/blog";
import { site } from "@/lib/site";

type PostPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.date,
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <PageMotion>
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="text-[12px] text-muted-foreground underline decoration-border hover:text-accent hover:decoration-accent"
          data-intro
        >
          ← all writing
        </Link>
        <header className="mt-8 border-b border-border pb-8">
          <p className="text-[12px] text-signal" data-intro>
            {formatPostDate(post.date)} · {post.readingTime}
          </p>
          <h1
            className="mt-4 max-w-[18ch] text-4xl leading-none font-medium tracking-[-0.04em] text-pretty sm:text-5xl"
            data-intro
          >
            {post.title}
          </h1>
          <div className="reveal-line mt-8 h-px w-full bg-linear-to-r from-accent via-border to-transparent" />
          <p className="mt-6 max-w-[48ch] text-pretty text-muted-foreground" data-intro>
            {post.description}
          </p>
        </header>
        <div className="pt-8" data-intro>
          <MarkdownArticle content={post.content} />
        </div>
      </article>
    </PageMotion>
  );
}
