import Link from "next/link";
import { pageSlugs } from "@/lib/content-types";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto pb-10">
      <div className="site-shell flex flex-wrap items-baseline justify-between gap-3 border-t border-border px-5 pt-5 text-xs text-muted-foreground sm:px-0">
        <p>
          © {new Date().getFullYear()} {site.handle}
        </p>
        <nav aria-label="Site information" className="flex gap-3">
          {pageSlugs.map((slug) => (
            <Link key={slug} href={`/${slug}`} className="ink-link text-foreground">
              {slug}
            </Link>
          ))}
          <a href="/feed.xml" className="ink-link text-foreground">
            rss
          </a>
        </nav>
      </div>
    </footer>
  );
}
