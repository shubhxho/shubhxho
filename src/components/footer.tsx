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
    <footer className="fixed bottom-0 z-10 flex w-full flex-row items-end justify-between overflow-x-hidden bg-background/10 p-6 tracking-tight backdrop-blur-xl sm:p-8">
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} {site.copyrightName}
      </p>
      <nav aria-label="Site information" className="ml-auto mr-8 hidden gap-3 font-ibm text-xs text-muted-foreground sm:flex">
        <Link href="/about" className="hover:underline">ABOUT</Link>
        <Link href="/contact" className="hover:underline">CONTACT</Link>
        <Link href="/privacy" className="hover:underline">PRIVACY</Link>
      </nav>
      <Link
        href="/"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 font-instrument text-xl leading-none font-medium italic sm:block"
      >
        {site.monogram}
      </Link>
      <p className="text-xs text-muted-foreground tabular-nums">
        {site.timeLabel}: {time}
      </p>
    </footer>
  );
}
