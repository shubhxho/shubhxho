import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownArticle } from "@/components/markdown-article";
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
    <main className="min-h-dvh px-5 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-24">
      <article className="mx-auto max-w-2xl animate-rise">
        <Link href="/blog" className="text-[12px] text-muted-foreground underline decoration-border hover:text-accent hover:decoration-accent">
          ← all writing
        </Link>
        <header className="mt-8 border-b border-border pb-8">
          <p className="text-[12px] text-muted-foreground">
            {formatPostDate(post.date)} · {post.readingTime}
          </p>
          <h1 className="mt-3 text-3xl font-medium tracking-tight text-pretty sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-[48ch] text-pretty text-muted-foreground">{post.description}</p>
        </header>
        <div className="pt-8">
          <MarkdownArticle content={post.content} />
        </div>
      </article>
    </main>
  );
}
