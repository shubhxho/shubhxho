"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

const siteLinks = [
  { href: "/", label: "home", external: false },
  { href: "/blog", label: "writing", external: false },
  { href: "https://gallery.shubhxho.com", label: "gallery", external: true },
  { href: "/about", label: "about", external: false },
  { href: "/contact", label: "contact", external: false },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4 sm:px-6">
        <Link href="/" aria-label="Homepage" className="shrink-0 text-[15px] font-medium tracking-tight hover:text-accent">
          {site.handle}
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-4 text-[13px] text-muted-foreground sm:flex">
          {siteLinks.map((link) =>
            link.external ? (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="hover:text-accent">
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className="hover:text-accent">
                {link.label}
              </Link>
            ),
          )}
        </nav>
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="px-2 py-1 text-[13px] text-muted-foreground hover:text-accent sm:hidden"
        >
          {menuOpen ? "close" : "menu"}
        </button>
      </div>
      {menuOpen ? (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-border/70 px-5 py-4 sm:hidden">
          <div className="flex flex-col gap-3 text-[15px] text-muted-foreground">
            {siteLinks.map((link) =>
              link.external ? (
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
