import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { trustPages, type TrustPageSlug } from "@/lib/trust";

export function TrustPage({ slug }: { slug: TrustPageSlug }) {
  const page = trustPages[slug];

  return (
    <main className="flex-1 px-6 py-12 sm:px-8 sm:py-16">
      <FadeIn className="mx-auto max-w-3xl">
        <p className="mb-3 text-[11px] tracking-[0.22em] text-signal uppercase">{page.title}</p>
        <h1 className="mb-7 text-[1.75rem] font-bold tracking-tight sm:text-3xl">
          {page.heading.toLowerCase()}
        </h1>
        <div className="max-w-xl space-y-5 text-[15px] leading-7 text-muted-foreground sm:text-base">
          {page.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-10 flex flex-wrap gap-x-2 gap-y-1 text-sm">
          <span>
            [{" "}
            <Link href="/about" className="bracket-link">
              about
            </Link>{" "}
            ]
          </span>
          <span>
            [{" "}
            <Link href="/contact" className="bracket-link">
              contact
            </Link>{" "}
            ]
          </span>
          <span>
            [{" "}
            <Link href="/privacy" className="bracket-link">
              privacy
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
