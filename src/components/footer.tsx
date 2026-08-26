"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatSiteTime } from "@/lib/date";
import { site } from "@/lib/site";

export function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(formatSiteTime());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="site-shell px-5 pb-10 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-t border-border pt-5 text-[11px] tracking-wide text-muted-foreground">
        <p>© {new Date().getFullYear()} {site.handle}</p>
        <nav aria-label="Site information" className="flex flex-wrap gap-x-4 gap-y-2">
          <a href={site.links.gh} target="_blank" rel="noreferrer" className="hover:text-accent">
            github
          </a>
          <a href={site.links.x} target="_blank" rel="noreferrer" className="hover:text-accent">
            x
          </a>
          <Link href="/privacy" className="hover:text-accent">
            privacy
          </Link>
        </nav>
        <p className="tabular-nums text-signal/80">
          {site.timeLabel}: {time}
        </p>
      </div>
    </footer>
  );
}
