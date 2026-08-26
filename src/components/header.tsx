"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";

const siteLinks = [
  { href: "/", label: "home" },
  { href: "/blog", label: "writing" },
  { href: "https://gallery.shubhxho.com", label: "gallery", external: true },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-shell sticky top-0 z-20 border-b border-border/80 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          aria-label="Homepage"
          className="shrink-0 text-[13px] font-medium tracking-[0.08em] text-foreground hover:text-accent"
        >
          {site.handle}
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-5 text-[12px] text-muted-foreground sm:flex">
          {siteLinks.map((link) => {
            const active = !("external" in link && link.external) && pathname === link.href;
            const className = active ? "text-accent" : "hover:text-accent";
            if ("external" in link && link.external) {
              return (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={className}>
                  {link.label}
                </a>
              );
            }
            return (
              <Link key={link.href} href={link.href} className={className}>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="px-2 py-1 text-[12px] tracking-wide text-muted-foreground hover:text-accent sm:hidden"
        >
          {menuOpen ? "close" : "menu"}
        </button>
      </div>
      {menuOpen ? (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-border/80 px-5 py-4 sm:hidden">
          <div className="flex flex-col gap-3 text-[14px] text-muted-foreground">
            {siteLinks.map((link) =>
              "external" in link && link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-accent"
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="hover:text-accent">
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
