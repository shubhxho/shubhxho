import Link from "next/link";
import { formatPostDate } from "@/lib/blog";

export type BlogPostListItem = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  readingTime?: string;
  href?: string;
};

type BlogPostListProps = {
  posts: BlogPostListItem[];
  basePath?: string;
  compact?: boolean;
};

export function BlogPostList({ posts, basePath = "/blog", compact = false }: BlogPostListProps) {
  if (compact) {
    return (
      <ul className="space-y-3">
        {posts.map((post) => {
          const href = post.href ?? `${basePath}/${post.slug}`;
          return (
            <li key={post.slug}>
              <Link href={href} className="group block text-sm leading-6">
                <time dateTime={post.date} className="tabular-nums text-muted-foreground">
                  {formatPostDate(post.date)}
                </time>
                <span className="mx-2 text-muted-foreground">·</span>
                <span className="ink-link font-bold">{post.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="space-y-6">
      {posts.map((post) => {
        const href = post.href ?? `${basePath}/${post.slug}`;
        const meta = [formatPostDate(post.date), post.readingTime].filter(Boolean).join(" · ");

        return (
          <li key={post.slug}>
            <Link href={href} className="group block">
              <p className="text-xs tabular-nums text-muted-foreground">{meta}</p>
              <h3 className="mt-1 text-[1.05rem] font-bold tracking-tight">
                <span className="ink-link">{post.title}</span>
              </h3>
              {post.description ? (
                <p className="mt-2 max-w-[38rem] text-sm leading-7 text-muted-foreground">
                  {post.description}
                </p>
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
