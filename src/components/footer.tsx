import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto pb-10">
      <div className="site-shell flex flex-wrap items-baseline justify-between gap-3 border-t border-border px-5 pt-5 text-xs text-muted-foreground sm:px-0">
        <p>
          © {new Date().getFullYear()} {site.handle}
        </p>
        <nav aria-label="Site information" className="flex gap-3">
          <Link href="/contact" className="ink-link text-foreground">
            contact
          </Link>
          <Link href="/privacy" className="ink-link text-foreground">
            privacy
          </Link>
          <a href="/feed.xml" className="ink-link text-foreground">
            rss
          </a>
        </nav>
      </div>
    </footer>
  );
}
