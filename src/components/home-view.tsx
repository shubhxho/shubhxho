import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { Tip } from "@/components/hover-tip";
import type { GalleryImage, HomeContent, Project } from "@/lib/content-types";
import { site } from "@/lib/site";

export type HomePost = {
  slug: string;
  title: string;
  description: string;
  tip: string;
};

type HomeViewProps = {
  home: HomeContent;
  projects: Project[];
  gallery: GalleryImage[];
  posts: HomePost[];
};

export function HomeView({ home, projects, gallery, posts }: HomeViewProps) {
  const previewGallery = gallery.slice(0, 6);

  return (
    <main className="flex flex-1 flex-col">
      <FadeIn className="site-shell px-5 pt-14 pb-16 sm:px-6 sm:pt-20">
        <section>
          <p className="mb-3 text-sm text-muted-foreground">{home.name}</p>
          <h1 className="max-w-[18ch] text-[clamp(2rem,6vw,3.25rem)] leading-[1.1] font-bold tracking-tight text-pretty">
            {home.headline}
          </h1>
          <p className="mt-5 max-w-[42ch] text-[0.95rem] leading-7 text-muted-foreground text-pretty">
            {home.bio}
          </p>
        </section>

        <section className="mt-14" aria-labelledby="projects-label">
          <h2 id="projects-label" className="mb-5 text-sm font-bold tracking-tight">
            {home.projectsLabel}
          </h2>
          <ul className="divide-y divide-border border-y border-border">
            {projects.map((project) => (
              <li key={project.slug}>
                <Tip tip={project.tip || project.role} as="div">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid gap-1 py-4 transition-colors hover:bg-foreground hover:text-inverse sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
                  >
                    <span>
                      <span className="block text-[0.95rem] font-bold">{project.title}</span>
                      <span className="mt-1 block max-w-[46ch] text-sm text-muted-foreground group-hover:text-inverse/75">
                        {project.description}
                      </span>
                    </span>
                    <span className="text-sm tabular-nums text-muted-foreground group-hover:text-inverse/75">
                      {project.year}
                    </span>
                  </a>
                </Tip>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="writing-label">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <h2 id="writing-label" className="text-sm font-bold tracking-tight">
              {home.writingLabel}
            </h2>
            <Link href="/blog" className="ink-link text-sm">
              {home.writingLinkLabel}
            </Link>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {posts.map((post) => (
              <li key={post.slug}>
                <Tip tip={post.tip} as="div">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block py-4 transition-colors hover:bg-foreground hover:text-inverse"
                  >
                    <span className="block text-[0.95rem] font-bold">{post.title}</span>
                    <span className="mt-1 block max-w-[46ch] text-sm text-muted-foreground group-hover:text-inverse/75">
                      {post.description}
                    </span>
                  </Link>
                </Tip>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="gallery-label">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <h2 id="gallery-label" className="text-sm font-bold tracking-tight">
              {home.galleryLabel}
            </h2>
            <a href={home.galleryUrl} target="_blank" rel="noreferrer" className="ink-link text-sm">
              {home.galleryLinkLabel}
            </a>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {previewGallery.map((image) => (
              <a
                key={image.id}
                href={image.href}
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-square overflow-hidden bg-surface"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 33vw, 12vw"
                  className="object-cover grayscale transition duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
                />
              </a>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-border pt-8" aria-labelledby="contact-label">
          <h2 id="contact-label" className="mb-4 text-sm font-bold tracking-tight">
            {home.contactLabel}
          </h2>
          <p className="max-w-[46ch] text-sm leading-7 text-muted-foreground">
            email{" "}
            <a href={`mailto:${site.email}`} className="ink-link text-foreground">
              {site.email}
            </a>
            {" · "}
            <a href={site.links.gh} target="_blank" rel="noreferrer" className="ink-link text-foreground">
              github
            </a>
            {" · "}
            <a href={site.links.x} target="_blank" rel="noreferrer" className="ink-link text-foreground">
              x
            </a>
            {" · "}
            <a href={site.links.in} target="_blank" rel="noreferrer" className="ink-link text-foreground">
              linkedin
            </a>
          </p>
          <p className="mt-8 text-xs text-muted-foreground">{home.footerCredit}</p>
        </section>
      </FadeIn>
    </main>
  );
}
