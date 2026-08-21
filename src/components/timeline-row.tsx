import type { ReactNode } from "react";

type TimelineRowProps = {
  date: string;
  dateTime?: string;
  children: ReactNode;
  typing?: boolean;
};

export function TimelineRow({
  date,
  dateTime,
  children,
  typing = false,
}: TimelineRowProps) {
  return (
    <article className="flex w-full flex-row items-center justify-start gap-16 text-xs sm:gap-26">
      <time
        dateTime={dateTime}
        className="w-[8ch] shrink-0 cursor-pointer font-ibm text-muted-foreground tabular-nums"
      >
        {date}
      </time>
      <p className="min-w-0 font-inter">
        {children}
        {typing ? (
          <span aria-hidden="true" className="animate-typing">
            |
          </span>
        ) : null}
      </p>
    </article>
  );
}
