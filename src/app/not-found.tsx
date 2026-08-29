import Link from "next/link";
import type { Metadata } from "next";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col justify-center px-5 py-20 sm:px-6">
      <FadeIn className="site-shell">
        <h1 className="mb-4 text-[clamp(1.8rem,5vw,2.6rem)] font-bold tracking-tight">
          Page not found
        </h1>
        <p className="mb-8 max-w-md text-sm text-muted-foreground">
          This path is not part of the site.
        </p>
        <p className="flex flex-wrap gap-3 text-sm">
          <Link href="/" className="ink-link">
            home
          </Link>
          <Link href="/essays" className="ink-link">
            essays
          </Link>
          <Link href="/blog" className="ink-link">
            writing
          </Link>
        </p>
      </FadeIn>
    </main>
  );
}
