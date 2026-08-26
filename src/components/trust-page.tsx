import Link from "next/link";
import { PageMotion } from "@/components/page-motion";
import { trustPages, type TrustPageSlug } from "@/lib/trust";

export function TrustPage({ slug }: { slug: TrustPageSlug }) {
  const page = trustPages[slug];

  return (
    <PageMotion>
      <article className="mx-auto max-w-3xl">
        <p className="text-[11px] tracking-[0.22em] text-signal uppercase" data-intro>
          {page.title}
        </p>
        <h1 className="mt-4 text-4xl leading-none font-medium tracking-[-0.04em] text-balance sm:text-5xl" data-intro>
          {page.heading}
        </h1>
        <div className="reveal-line mt-8 h-px w-full bg-linear-to-r from-accent via-border to-transparent" />
        <div className="mt-8 space-y-5 text-[15px] leading-7 text-muted-foreground" data-intro>
          {page.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <nav aria-label="Site information" className="mt-10 flex flex-wrap gap-4 text-[12px] text-muted-foreground" data-intro>
          <Link href="/about" className="hover:text-accent">
            about
          </Link>
          <Link href="/contact" className="hover:text-accent">
            contact
          </Link>
          <Link href="/privacy" className="hover:text-accent">
            privacy
          </Link>
          <Link href="/blog" className="hover:text-accent">
            writing
          </Link>
        </nav>
      </article>
    </PageMotion>
  );
}
