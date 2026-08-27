import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { GalleryMosaic } from "@/components/gallery-mosaic";
import { Tip } from "@/components/hover-tip";
import type { GalleryContent, HomeContent, Project } from "@/lib/content-types";
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
  gallery: GalleryContent;
  posts: HomePost[];
};

export function HomeView({ home, projects, gallery, posts }: HomeViewProps) {
  return (
    <main className="flex flex-1 flex-col">
      <FadeIn className="site-shell px-5 pt-16 pb-20 sm:px-0 sm:pt-24">
        <section>
          <h1 className="text-[clamp(2.1rem,7vw,3.4rem)] leading-[1.05] font-bold tracking-tight text-pretty">
            {home.name}
          </h1>
          <p className="mt-6 text-[1.05rem] leading-8 text-pretty">{home.headline}</p>
          <p className="mt-4 max-w-[38rem] text-[0.95rem] leading-7 text-muted-foreground text-pretty">
            {home.bio}
          </p>
        </section>

        <section className="mt-16" aria-labelledby="projects-label">
          <h2 id="projects-label" className="mb-6 text-xl font-bold tracking-tight">
            {home.projectsLabel}
          </h2>
          <div className="space-y-8">
            {projects.map((project) => (
              <article key={project.slug}>
                <Tip tip={project.tip || "open project"}>
                  <a href={project.href} target="_blank" rel="noreferrer" className="group block">
                    <h3 className="text-[1.05rem] font-bold tracking-tight">
                      <span className="ink-link">{project.title}</span>
                      {project.role ? (
                        <span className="font-normal text-muted-foreground"> · {project.role}</span>
                      ) : null}
                    </h3>
                    <p className="mt-2 max-w-[38rem] text-sm leading-7 text-muted-foreground">
                      {project.description}
                    </p>
                    <p className="mt-1 text-xs tabular-nums text-muted-foreground">{project.year}</p>
                  </a>
                </Tip>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="writing-label">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 id="writing-label" className="text-xl font-bold tracking-tight">
              {home.writingLabel}
            </h2>
            <Link href="/blog" className="ink-link text-sm">
              {home.writingLinkLabel}
            </Link>
          </div>
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.slug}>
                <Tip tip={post.tip}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <h3 className="text-[1.05rem] font-bold tracking-tight">
                      <span className="ink-link">{post.title}</span>
                    </h3>
                    <p className="mt-2 max-w-[38rem] text-sm leading-7 text-muted-foreground">
                      {post.description}
                    </p>
                  </Link>
                </Tip>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="gallery-label">
          <div className="mb-3 flex items-baseline justify-between gap-4">
            <h2 id="gallery-label" className="text-xl font-bold tracking-tight">
              {home.galleryLabel}
            </h2>
            <Link href={home.galleryUrl} className="ink-link text-sm">
              {home.galleryLinkLabel}
            </Link>
          </div>
          <p className="mb-6 max-w-[38rem] text-sm leading-7 text-muted-foreground">{gallery.intro}</p>
          <GalleryMosaic images={gallery.images} compact />
          <p className="mt-4 text-sm text-muted-foreground">
            Full archive on{" "}
            <a href={home.galleryExternalUrl} target="_blank" rel="noreferrer" className="ink-link text-foreground">
              gallery.shubhxho.com
            </a>
            .
          </p>
        </section>

        <section className="mt-16" aria-labelledby="contact-label">
          <h2 id="contact-label" className="mb-4 text-xl font-bold tracking-tight">
            {home.contactLabel}
          </h2>
          <p className="max-w-[38rem] text-sm leading-7 text-muted-foreground">
            Email{" "}
            <a href={`mailto:${site.email}`} className="ink-link text-foreground">
              {site.email}
            </a>
            , or find me on{" "}
            <a href={site.links.gh} target="_blank" rel="noreferrer" className="ink-link text-foreground">
              GitHub
            </a>
            ,{" "}
            <a href={site.links.x} target="_blank" rel="noreferrer" className="ink-link text-foreground">
              X
            </a>
            , and{" "}
            <a href={site.links.in} target="_blank" rel="noreferrer" className="ink-link text-foreground">
              LinkedIn
            </a>
            .
          </p>
          <p className="mt-10 text-xs text-muted-foreground">{home.footerCredit}</p>
        </section>
      </FadeIn>
    </main>
  );
}
