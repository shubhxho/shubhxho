import Link from "next/link";
import { BlogPostList, type BlogPostListItem } from "@/components/blog-post-list";
import { FadeIn } from "@/components/fade-in";
import { GalleryMosaic } from "@/components/gallery-mosaic";
import { GratitudeView } from "@/components/gratitude-view";
import { Tip } from "@/components/hover-tip";
import { TimelineList } from "@/components/timeline-list";
import type { GalleryContent, HomeContent, Person, Project, TimelineEntry } from "@/lib/content-types";
import { getProfileLinks, site } from "@/lib/site";

type HomeViewProps = {
  home: HomeContent;
  projects: Project[];
  gallery: GalleryContent;
  posts: BlogPostListItem[];
  timeline: TimelineEntry[];
  people: Person[];
};

export function HomeView({ home, projects, gallery, posts, timeline, people }: HomeViewProps) {
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

        <section className="mt-16" aria-labelledby="history-label">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 id="history-label" className="text-xl font-bold tracking-tight">
              {home.historyLabel}
            </h2>
            <Link href={home.historyUrl} className="ink-link text-sm">
              {home.historyLinkLabel}
            </Link>
          </div>
          <TimelineList entries={timeline} />
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
          <BlogPostList posts={posts} />
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

        <section className="mt-16" aria-labelledby="people-label">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 id="people-label" className="text-xl font-bold tracking-tight">
              {home.peopleLabel}
            </h2>
            <Link href={home.peopleUrl} className="ink-link text-sm">
              {home.peopleLinkLabel}
            </Link>
          </div>
          <GratitudeView variant="list" people={people} />
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
            {getProfileLinks().map((link, index, links) => {
              const separator =
                index === 0 ? "" : index === links.length - 1 ? ", and " : ", ";

              return (
                <span key={link.key}>
                  {separator}
                  <a href={link.url} target="_blank" rel="noreferrer" className="ink-link text-foreground">
                    {link.label}
                  </a>
                </span>
              );
            })}
            .
          </p>
          <p className="mt-10 text-xs text-muted-foreground">{home.footerCredit}</p>
        </section>
      </FadeIn>
    </main>
  );
}
