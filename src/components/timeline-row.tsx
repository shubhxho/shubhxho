import type { ReactNode } from "react";

type TimelineRowProps = {
  date: string;
  dateTime?: string;
  children: ReactNode;
  typing?: boolean;
};

export function TimelineRow({ date, dateTime, children, typing = false }: TimelineRowProps) {
  return (
    <article className="flex w-full gap-5 border-b border-foreground/10 py-5 sm:gap-10">
      <time dateTime={dateTime} className="w-[9ch] shrink-0 font-ibm text-base text-muted-foreground tabular-nums sm:text-xs">
        {date}
      </time>
      <p className="min-w-0 text-base text-pretty sm:text-sm">
        {children}
        {typing ? <span aria-hidden="true" className="animate-typing">|</span> : null}
      </p>
    </article>
  );
}
