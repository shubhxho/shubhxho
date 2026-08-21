import Link from "next/link";
import { trustPages, type TrustPageSlug } from "@/lib/trust";

export function TrustPage({ slug }: { slug: TrustPageSlug }) {
  const page = trustPages[slug];

  return (
    <main className="mx-auto w-full max-w-3xl px-6 pt-28 pb-32 sm:px-8">
      <article className="font-inter">
        <p className="font-ibm text-xs text-muted-foreground">{page.title.toUpperCase()}</p>
        <h1 className="mt-4 font-instrument text-4xl leading-none sm:text-5xl">{page.heading}</h1>
        <div className="mt-10 space-y-6 text-sm leading-7 text-muted-foreground sm:text-base">
          {page.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <nav aria-label="Site information" className="mt-10 flex gap-4 font-ibm text-xs">
          <Link href="/about" className="hover:underline">ABOUT</Link>
          <Link href="/contact" className="hover:underline">CONTACT</Link>
          <Link href="/privacy" className="hover:underline">PRIVACY</Link>
        </nav>
      </article>
    </main>
  );
}
