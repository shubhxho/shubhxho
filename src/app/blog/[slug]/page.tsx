import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { FadeIn } from "@/components/fade-in";
import { MdxArticle } from "@/components/mdx-article";
import { formatPostDate, getAllPosts, getPost, getPostPath } from "@/lib/blog";
import { site } from "@/lib/site";

type PostPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = getPostPath(post);
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: path,
      types: post.kind === "note" ? { "text/markdown": `${site.url}${path}.md` } : undefined,
    },
    openGraph: {
      type: "article",
      url: `${site.url}${path}`,
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
  if (post.kind === "essay") permanentRedirect(getPostPath(post));

  return (
    <main className="flex-1 px-5 py-16 sm:px-6 sm:py-24">
      <FadeIn className="site-shell">
        <p className="mb-8 text-sm">
          <Link href="/blog" className="ink-link">
            ← all writing
          </Link>
        </p>
        <p className="text-xs text-muted-foreground">
          {formatPostDate(post.date)} · {post.readingTime}
        </p>
        <h1 className="mt-3 mb-4 text-[clamp(1.8rem,5vw,2.6rem)] leading-[1.15] font-bold tracking-tight text-pretty">
          {post.title}
        </h1>
        <p className="mb-10 max-w-xl text-sm leading-7 text-muted-foreground">{post.description}</p>
        <MdxArticle content={post.content} />
      </FadeIn>
    </main>
  );
}
