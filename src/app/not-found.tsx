import Link from "next/link";
import type { Metadata } from "next";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col justify-center px-6 py-20 sm:px-8">
      <FadeIn className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-[1.75rem] font-bold tracking-tight sm:text-3xl">page not found</h1>
        <p className="mb-8 max-w-md text-[15px] text-muted-foreground sm:text-base">
          this path is not part of the site.
        </p>
        <p className="flex flex-wrap gap-x-2 gap-y-1 text-sm">
          <span>
            [{" "}
            <Link href="/" className="bracket-link">
              home
            </Link>{" "}
            ]
          </span>
          <span>
            [{" "}
            <Link href="/blog" className="bracket-link">
              blog
            </Link>{" "}
            ]
          </span>
        </p>
      </FadeIn>
    </main>
  );
}
