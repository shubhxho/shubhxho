"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tip } from "@/components/hover-tip";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "home", tip: "back to the main page" },
  { href: "/blog", label: "blog", tip: "notes on building and shipping" },
  { href: "/about", label: "about", tip: "who i am and what this site is" },
  { href: "/contact", label: "contact", tip: "email and official profiles" },
] as const;

export function Header() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <header className="border-b border-border/80 px-6 pt-8 pb-4 sm:px-8">
      <div className="mx-auto flex max-w-3xl items-baseline justify-between gap-4 text-sm">
        <Tip tip="shubhxho.com">
          <Link href="/" className="font-bold hover:text-accent">
            {site.handle}
          </Link>
        </Tip>
        <nav aria-label="Primary navigation" className="flex flex-wrap justify-end gap-x-3 gap-y-1 text-muted-foreground">
          {links.map((link) => (
            <Tip key={link.href} tip={link.tip}>
              <Link
                href={link.href}
                className={
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                    ? "text-accent"
                    : "hover:text-accent"
                }
              >
                {link.label}
              </Link>
            </Tip>
          ))}
        </nav>
      </div>
    </header>
  );
}
