import Link from "next/link";
import { formatPostDate } from "@/lib/blog";

export type BlogPostListItem = {
  slug: string;
  title: string;
  date: string;
};

type BlogPostListProps = {
  posts: BlogPostListItem[];
  basePath?: string;
};

export function BlogPostList({ posts, basePath = "/blog" }: BlogPostListProps) {
  return (
    <ul className="space-y-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`${basePath}/${post.slug}`} className="group block text-sm leading-6">
            <time dateTime={post.date} className="tabular-nums text-muted-foreground">
              {formatPostDate(post.date)}
            </time>
            <span className="mx-2 text-muted-foreground">·</span>
            <span className="ink-link font-bold">{post.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
