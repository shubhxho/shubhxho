import Link from "next/link";
import type { Metadata } from "next";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col justify-center px-6 py-16 sm:px-8">
      <FadeIn className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">page not found</h1>
        <p className="mb-6 max-w-md text-base text-muted-foreground">
          this path is not part of the site.
        </p>
        <p className="text-sm">
          [ <Link href="/" className="bracket-link">home</Link> ]{" "}
          [ <Link href="/blog" className="bracket-link">blog</Link> ]
        </p>
      </FadeIn>
    </main>
  );
}
