import { InlineMarkdown } from "@/components/markdown-article";
import type { TimelineEntry } from "@/lib/content-types";

function formatTimelineDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${month}.${day}.${year.slice(2)}`;
}

type TimelineListProps = {
  entries: TimelineEntry[];
};

export function TimelineList({ entries }: TimelineListProps) {
  return (
    <ol className="divide-y divide-border border-y border-border">
      {entries.map((entry, index) => (
        <li key={`${entry.date}-${index}`} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 py-3.5 sm:gap-6">
          <time dateTime={entry.date} className="text-xs tabular-nums text-muted-foreground sm:text-sm">
            {formatTimelineDate(entry.date)}
          </time>
          <p className="text-sm leading-6 text-pretty">
            <InlineMarkdown value={entry.text} />
          </p>
        </li>
      ))}
    </ol>
  );
}
