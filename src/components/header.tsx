"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tip } from "@/components/hover-tip";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "home", tip: "main page" },
  { href: "/blog", label: "writing", tip: "notes" },
  { href: "/gallery", label: "gallery", tip: "blender artworks" },
  { href: "/history", label: "history", tip: "timeline" },
  { href: "/people", label: "gratitude", tip: "people I look up to" },
  { href: "/about", label: "about", tip: "about shubh" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="site-shell flex items-center justify-between gap-4 px-5 py-4 text-sm sm:px-0">
        <Tip tip="shubhxho.com">
          <Link href="/" className="ink-link px-1 py-0.5 font-bold">
            {site.handle}
          </Link>
        </Tip>
        <nav aria-label="Primary navigation" className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2">
          {links.map((link) => {
            const active =
              pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            const className = `ink-link px-1 py-0.5 ${active ? "bg-foreground text-inverse no-underline" : ""}`;
            return (
              <Tip key={link.href} tip={link.tip}>
                <Link href={link.href} className={className}>
                  {link.label}
                </Link>
              </Tip>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
