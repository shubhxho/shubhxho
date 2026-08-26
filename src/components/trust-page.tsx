import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { trustPages, type TrustPageSlug } from "@/lib/trust";

export function TrustPage({ slug }: { slug: TrustPageSlug }) {
  const page = trustPages[slug];

  return (
    <main className="flex-1 px-6 py-12 sm:px-8 sm:py-16">
      <FadeIn className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">{page.heading.toLowerCase()}</h1>
        <div className="max-w-xl space-y-5 text-base leading-7">
          {page.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-8 text-sm">
          <span>
            [ <Link href="/about" className="bracket-link">about</Link> ]
          </span>{" "}
          <span>
            [ <Link href="/contact" className="bracket-link">contact</Link> ]
          </span>{" "}
          <span>
            [ <Link href="/privacy" className="bracket-link">privacy</Link> ]
          </span>{" "}
          <span>
            [ <Link href="/blog" className="bracket-link">blog</Link> ]
          </span>
        </p>
      </FadeIn>
    </main>
  );
}
