import Link from "next/link";
import { MdxArticle } from "@/components/mdx-article";
import type { GratitudeEntry } from "@/lib/gratitude";

function GratitudeMdx({ entry, linked = false, showTitle = true }: {
  entry: GratitudeEntry;
  linked?: boolean;
  showTitle?: boolean;
}) {
  return (
    <article>
      {showTitle ? (
        <h2 className="text-[1.05rem] font-bold tracking-tight">
          {linked ? (
            <Link href={`/gratitude/${entry.slug}`} className="ink-link">
              {entry.name}
            </Link>
          ) : (
            entry.name
          )}
        </h2>
      ) : null}
      {entry.href ? (
        <p className="mt-2 text-sm">
          <a href={entry.href} target="_blank" rel="noreferrer" className="ink-link">
            {entry.href.replace(/^https?:\/\//, "")} →
          </a>
        </p>
      ) : null}
      <div className="mt-2">
        <MdxArticle content={entry.content} />
      </div>
    </article>
  );
}

type GratitudeViewProps =
  | {
      variant: "index";
      title: string;
      intro: string;
      entries: GratitudeEntry[];
    }
  | {
      variant: "entry";
      entry: GratitudeEntry;
    }
  | {
      variant: "list";
      entries: GratitudeEntry[];
    };

export function GratitudeView(props: GratitudeViewProps) {
  if (props.variant === "index") {
    return (
      <>
        <h1 className="text-[clamp(2rem,6vw,3rem)] font-bold tracking-tight">{props.title}</h1>
        <p className="mt-4 mb-10 max-w-[38rem] text-sm leading-7 text-muted-foreground">{props.intro}</p>
        <div className="space-y-8">
          {props.entries.map((entry) => (
            <GratitudeMdx key={entry.slug} entry={entry} linked />
          ))}
        </div>
      </>
    );
  }

  if (props.variant === "list") {
    return (
      <div className="space-y-8">
        {props.entries.map((entry) => (
          <GratitudeMdx key={entry.slug} entry={entry} linked />
        ))}
      </div>
    );
  }

  return (
    <>
      <p className="mb-8 text-sm">
        <Link href="/gratitude" className="ink-link">
          ← all gratitude
        </Link>
      </p>
      <h1 className="mb-6 text-[clamp(1.8rem,5vw,2.6rem)] leading-[1.15] font-bold tracking-tight text-pretty">
        {props.entry.name}
      </h1>
      <GratitudeMdx entry={props.entry} showTitle={false} />
    </>
  );
}
