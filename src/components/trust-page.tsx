import Link from "next/link";
import { trustPages, type TrustPageSlug } from "@/lib/trust";

export function TrustPage({ slug }: { slug: TrustPageSlug }) {
  const page = trustPages[slug];

  return (
    <main className="min-h-dvh px-5 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-24">
      <article className="mx-auto max-w-2xl animate-rise">
        <p className="text-[12px] tracking-wide text-accent uppercase">{page.title}</p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          {page.heading}
        </h1>
        <div className="mt-8 space-y-5 text-[15px] leading-7 text-muted-foreground">
          {page.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <nav aria-label="Site information" className="mt-10 flex flex-wrap gap-4 text-[12px] text-muted-foreground">
          <Link href="/about" className="hover:text-accent">about</Link>
          <Link href="/contact" className="hover:text-accent">contact</Link>
          <Link href="/privacy" className="hover:text-accent">privacy</Link>
          <Link href="/blog" className="hover:text-accent">writing</Link>
        </nav>
      </article>
    </main>
  );
}
