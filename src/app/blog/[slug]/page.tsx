import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/fade-in";
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
    <main className="flex-1 px-6 py-12 sm:px-8 sm:py-16">
      <FadeIn className="mx-auto max-w-3xl">
        <p className="mb-8 text-sm">
          [{" "}
          <Link href="/blog" className="bracket-link">
            all writing
          </Link>{" "}
          ]
        </p>
        <p className="text-xs text-signal">
          {formatPostDate(post.date).toLowerCase()} · {post.readingTime}
        </p>
        <h1 className="mt-2 mb-3 text-[1.75rem] leading-tight font-bold tracking-tight text-pretty sm:text-3xl">
          {post.title.toLowerCase()}
        </h1>
        <p className="mb-10 max-w-xl text-[15px] text-muted-foreground sm:text-base">{post.description}</p>
        <MarkdownArticle content={post.content} />
      </FadeIn>
    </main>
  );
}
