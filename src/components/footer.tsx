import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto px-6 pb-10 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-wrap items-baseline justify-between gap-3 border-t border-border pt-5 text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} {site.handle}
        </p>
        <nav aria-label="Site information" className="flex gap-3">
          <Link href="/privacy" className="hover:text-accent">
            privacy
          </Link>
          <a href="/feed.xml" className="hover:text-accent">
            rss
          </a>
        </nav>
      </div>
    </footer>
  );
}
