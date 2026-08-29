import Link from "next/link";
import { BlogPostList } from "@/components/blog-post-list";
import { MdxArticle } from "@/components/mdx-article";
import type { DailyEntry } from "@/lib/content-types";
import { formatPostDate } from "@/lib/blog";

function DailyList({ entries }: { entries: DailyEntry[] }) {
  return (
    <BlogPostList
      posts={entries.map((entry) => ({
        slug: entry.slug,
        title: entry.title,
        date: entry.date,
        href: `/daily/${entry.slug}`,
      }))}
      compact
    />
  );
}

type DailyViewProps =
  | {
      variant: "index";
      title: string;
      intro: string;
      entries: DailyEntry[];
    }
  | {
      variant: "list";
      entries: DailyEntry[];
    }
  | {
      variant: "entry";
      entry: DailyEntry;
    };

export function DailyView(props: DailyViewProps) {
  if (props.variant === "index") {
    return (
      <>
        <h1 className="text-[clamp(2rem,6vw,3rem)] font-bold tracking-tight">{props.title}</h1>
        <p className="mt-4 mb-10 max-w-[38rem] text-sm leading-7 text-muted-foreground">{props.intro}</p>
        <DailyList entries={props.entries} />
      </>
    );
  }

  if (props.variant === "list") {
    return <DailyList entries={props.entries} />;
  }

  return (
    <>
      <p className="mb-8 text-sm">
        <Link href="/daily" className="ink-link">
          ← all daily
        </Link>
      </p>
      <p className="text-xs tabular-nums text-muted-foreground">{formatPostDate(props.entry.date)}</p>
      <h1 className="mt-3 mb-10 text-[clamp(1.8rem,5vw,2.6rem)] leading-[1.15] font-bold tracking-tight text-pretty">
        {props.entry.title}
      </h1>
      <MdxArticle content={props.entry.content} />
    </>
  );
}
