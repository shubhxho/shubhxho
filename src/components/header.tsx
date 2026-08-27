"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tip } from "@/components/hover-tip";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "home", tip: "main page" },
  { href: "/blog", label: "writing", tip: "notes" },
  { href: "https://gallery.shubhxho.com", label: "gallery", tip: "blender artworks", external: true },
  { href: "/about", label: "about", tip: "about shubh" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="site-shell flex items-center justify-between gap-4 px-5 py-4 text-sm sm:px-6">
        <Tip tip="shubhxho.com">
          <Link href="/" className="ink-link px-1 py-0.5 font-bold">
            {site.handle}
          </Link>
        </Tip>
        <nav aria-label="Primary navigation" className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2">
          {links.map((link) => {
            const active =
              !("external" in link && link.external) &&
              (pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)));
            const className = `ink-link px-1 py-0.5 ${active ? "bg-foreground text-inverse" : ""}`;
            if ("external" in link && link.external) {
              return (
                <Tip key={link.href} tip={link.tip}>
                  <a href={link.href} target="_blank" rel="noreferrer" className={className}>
                    {link.label}
                  </a>
                </Tip>
              );
            }
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
