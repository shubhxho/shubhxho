import Link from "next/link";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

const projects = [
  {
    title: "Blender artworks",
    description: "3D studies, stills, and experiments",
    year: "Ongoing",
    href: "https://gallery.shubhxho.com",
  },
  {
    title: "wolfpdf",
    description: "Wolfenstein 3D in a PDF",
    year: "2026",
    href: "https://github.com/shubhxho/wolfpdf",
  },
  {
    title: "kinetic",
    description: "A native macOS robotics simulator",
    year: "2026",
    href: "https://github.com/shubhxho/kinetic",
  },
  {
    title: "polymarket-model",
    description: "Prediction-market research and tooling",
    year: "2026",
    href: "https://github.com/shubhxho/polymarket-model",
  },
  {
    title: "sable",
    description: "A 265kb Rust chess engine",
    year: "2026",
    href: "https://github.com/shubhxho/sable",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      alternateName: [site.handle, site.shortTitle],
      description: site.description,
      inLanguage: site.language,
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      description: site.description,
      email: site.email,
      homeLocation: { "@type": "Place", name: "Khagaria, Bihar, India" },
      knowsAbout: site.topics,
      sameAs: Object.values(site.links),
    },
    {
      "@type": "ItemList",
      "@id": `${site.url}/#work`,
      name: "Selected work",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        description: project.description,
        url: project.href,
      })),
    },
  ],
};

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <main className="min-h-dvh px-5 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-24">
      <div className="mx-auto max-w-2xl">
        <section className="animate-rise" aria-labelledby="intro-heading">
          <p className="text-[12px] tracking-wide text-accent uppercase">shubhxho</p>
          <h1 id="intro-heading" className="mt-3 text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            {site.name}
          </h1>
          <p className="mt-5 max-w-[48ch] text-pretty text-muted-foreground">
            Hi. I build robots, AI systems, developer tools, and unusual software from Khagaria, India.
            I like hard problems, small complete tools, and shipping things people can actually run.
          </p>
          <p className="mt-4 max-w-[48ch] text-pretty text-muted-foreground">
            You can browse{" "}
            <Link href="/blog" className="text-accent underline decoration-accent/40 hover:decoration-accent">
              writing
            </Link>
            , peek at the{" "}
            <a
              href="https://gallery.shubhxho.com"
              target="_blank"
              rel="noreferrer"
              className="text-accent underline decoration-accent/40 hover:decoration-accent"
            >
              gallery
            </a>
            , or{" "}
            <Link href="/contact" className="text-accent underline decoration-accent/40 hover:decoration-accent">
              say hello
            </Link>
            .
          </p>
        </section>

        <section className="animate-rise-delay-1 mt-14 sm:mt-16" aria-labelledby="work-heading">
          <div className="flex items-baseline justify-between border-b border-border pb-2">
            <h2 id="work-heading" className="text-[12px] tracking-wide text-muted-foreground uppercase">
              What I&apos;m working on
            </h2>
          </div>
          <ul className="divide-y divide-border" role="list">
            {projects.map((project) => (
              <li key={project.title}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid gap-1 py-4 transition-colors sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
                >
                  <div>
                    <p className="font-medium group-hover:text-accent">{project.title}</p>
                    <p className="mt-1 text-[13px] text-muted-foreground">{project.description}</p>
                  </div>
                  <p className="text-[12px] text-muted-foreground tabular-nums">{project.year}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="animate-rise-delay-2 mt-14 sm:mt-16" aria-labelledby="writing-heading">
          <div className="flex items-baseline justify-between border-b border-border pb-2">
            <h2 id="writing-heading" className="text-[12px] tracking-wide text-muted-foreground uppercase">
              Writing
            </h2>
            <Link href="/blog" className="text-[12px] text-muted-foreground hover:text-accent">
              view all →
            </Link>
          </div>
          <ul className="divide-y divide-border" role="list">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-1 py-4 sm:grid-cols-[7.5rem_1fr] sm:items-baseline sm:gap-6"
                >
                  <p className="text-[12px] text-muted-foreground tabular-nums">{formatPostDate(post.date)}</p>
                  <div>
                    <p className="font-medium group-hover:text-accent">{post.title}</p>
                    <p className="mt-1 text-[13px] text-muted-foreground">{post.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="animate-rise-delay-3 mt-14 sm:mt-16" aria-labelledby="reach-heading">
          <div className="border-b border-border pb-2">
            <h2 id="reach-heading" className="text-[12px] tracking-wide text-muted-foreground uppercase">
              Reach out
            </h2>
          </div>
          <p className="mt-4 max-w-[48ch] text-pretty text-muted-foreground">
            Email{" "}
            <a href={`mailto:${site.email}`} className="text-accent underline decoration-accent/40 hover:decoration-accent">
              {site.email}
            </a>{" "}
            or find me on{" "}
            <a href={site.links.gh} target="_blank" rel="noreferrer" className="text-accent underline decoration-accent/40 hover:decoration-accent">
              GitHub
            </a>
            ,{" "}
            <a href={site.links.x} target="_blank" rel="noreferrer" className="text-accent underline decoration-accent/40 hover:decoration-accent">
              X
            </a>
            , and{" "}
            <a href={site.links.in} target="_blank" rel="noreferrer" className="text-accent underline decoration-accent/40 hover:decoration-accent">
              LinkedIn
            </a>
            .
          </p>
        </section>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\u003c") }}
      />
    </main>
  );
}
