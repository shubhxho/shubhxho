"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "home" },
  { href: "/blog", label: "blog" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <header className="px-6 pt-10 sm:px-8">
      <div className="mx-auto flex max-w-2xl items-baseline justify-between gap-4 text-sm">
        <Link href="/" className="font-bold hover:text-muted-foreground">
          {site.handle}
        </Link>
        <nav aria-label="Primary navigation" className="flex flex-wrap justify-end gap-x-3 gap-y-1 text-muted-foreground">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                ? "text-foreground"
                : "hover:text-foreground"}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
