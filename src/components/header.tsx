import Link from "next/link";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="fixed top-0 z-10 flex w-full flex-row items-start justify-between overflow-x-hidden bg-background/10 p-6 tracking-tight backdrop-blur-xl sm:p-8">
      <Link
        href="/"
        aria-label={`${site.name} homepage`}
        className="shrink-0 font-instrument text-2xl leading-none"
      >
        {site.mark}
      </Link>
      <nav className="flex flex-row items-center gap-3 font-ibm text-xs sm:gap-5">
        {Object.entries(site.links).map(([label, href]) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label={`${site.name} on ${label.toUpperCase()}`}
            className="hover:underline"
          >
            {label.toUpperCase()}
          </a>
        ))}
      </nav>
    </header>
  );
}
