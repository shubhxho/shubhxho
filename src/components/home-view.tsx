"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  useAmbientSweep,
  useMagneticRows,
  usePageIntro,
  useScrollReveal,
} from "@/components/motion";
import { site } from "@/lib/site";

export type HomeProject = {
  title: string;
  description: string;
  year: string;
  href: string;
  tag: string;
};

export type HomePost = {
  slug: string;
  title: string;
  description: string;
  dateLabel: string;
};

type HomeViewProps = {
  projects: HomeProject[];
  posts: HomePost[];
};

function BrandMark({ text }: { text: string }) {
  return (
    <span className="inline-flex flex-wrap" aria-hidden="true">
      {text.split("").map((char, index) => (
        <span key={`${char}-${index}`} className="hero-letter">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export function HomeView({ projects, posts }: HomeViewProps) {
  const rootRef = useRef<HTMLElement>(null);
  usePageIntro(rootRef);
  useScrollReveal(rootRef);
  useMagneticRows(rootRef);
  useAmbientSweep(rootRef);

  return (
    <main ref={rootRef} className="site-shell relative min-h-dvh overflow-hidden px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-14">
      <div
        data-sweep
        aria-hidden="true"
        className="pointer-events-none absolute top-24 left-[-20%] h-40 w-1/2 bg-linear-to-r from-transparent via-accent/10 to-transparent blur-2xl"
      />

      <div className="relative mx-auto max-w-3xl">
        <section aria-labelledby="intro-heading" className="min-h-[70vh] content-center sm:min-h-[74vh]">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.22em] text-signal uppercase" data-intro>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_12px_var(--color-signal)]" />
            live signal · khagaria
          </div>

          <h1 id="intro-heading" className="sr-only">
            {site.name}
          </h1>
          <p className="mt-6 text-[clamp(2.8rem,12vw,6.5rem)] leading-[0.88] font-medium tracking-[-0.06em] text-balance [perspective:800px]">
            <BrandMark text={site.handle} />
          </p>

          <div className="reveal-line mt-8 h-px w-full bg-linear-to-r from-accent via-border to-transparent" />

          <p className="mt-8 max-w-[42ch] text-[15px] leading-7 text-pretty text-muted-foreground sm:text-base" data-intro>
            I build robots, AI systems, developer tools, and unusual software.
            Hard problems, complete tools, things people can actually run.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-[13px]" data-intro>
            <Link href="/blog" className="text-accent underline decoration-accent/30 hover:decoration-accent">
              writing
            </Link>
            <a
              href="https://gallery.shubhxho.com"
              target="_blank"
              rel="noreferrer"
              className="text-accent underline decoration-accent/30 hover:decoration-accent"
            >
              gallery
            </a>
            <Link href="/contact" className="text-accent underline decoration-accent/30 hover:decoration-accent">
              contact
            </Link>
            <a
              href={site.links.gh}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              github ↗
            </a>
          </div>
        </section>

        <section className="mt-8 sm:mt-4" aria-labelledby="work-heading" data-reveal-group>
          <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
            <div>
              <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">01</p>
              <h2 id="work-heading" className="mt-1 text-lg font-medium tracking-tight sm:text-xl">
                What I&apos;m working on
              </h2>
            </div>
          </div>

          <ul className="mt-2" role="list">
            {projects.map((project) => (
              <li key={project.title} className="reveal-item border-b border-border/80">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  data-magnetic
                  className="group grid gap-2 py-5 transition-colors sm:grid-cols-[7.5rem_minmax(0,1fr)_5rem] sm:items-baseline sm:gap-6"
                >
                  <span className="text-[12px] text-signal">{project.tag}</span>
                  <span>
                    <span className="text-base font-medium tracking-tight group-hover:text-accent sm:text-lg">
                      {project.title}
                    </span>
                    <span className="mt-1 block text-[13px] text-muted-foreground">{project.description}</span>
                  </span>
                  <span className="text-[12px] text-muted-foreground tabular-nums sm:text-right">{project.year}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 sm:mt-20" aria-labelledby="writing-heading" data-reveal-group>
          <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
            <div>
              <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">02</p>
              <h2 id="writing-heading" className="mt-1 text-lg font-medium tracking-tight sm:text-xl">
                Writing
              </h2>
            </div>
            <Link href="/blog" className="text-[12px] text-muted-foreground hover:text-accent">
              view all →
            </Link>
          </div>

          <ul className="mt-2" role="list">
            {posts.map((post) => (
              <li key={post.slug} className="reveal-item border-b border-border/80">
                <Link
                  href={`/blog/${post.slug}`}
                  data-magnetic
                  className="group grid gap-2 py-5 sm:grid-cols-[7.5rem_1fr] sm:items-baseline sm:gap-6"
                >
                  <span className="text-[12px] text-muted-foreground tabular-nums">{post.dateLabel}</span>
                  <span>
                    <span className="text-base font-medium tracking-tight group-hover:text-accent sm:text-lg">
                      {post.title}
                    </span>
                    <span className="mt-1 block max-w-[52ch] text-[13px] text-pretty text-muted-foreground">
                      {post.description}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 sm:mt-20" aria-labelledby="reach-heading" data-reveal-group>
          <div className="border-b border-border pb-3">
            <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">03</p>
            <h2 id="reach-heading" className="mt-1 text-lg font-medium tracking-tight sm:text-xl">
              Reach out
            </h2>
          </div>
          <p className="reveal-item mt-5 max-w-[46ch] text-[15px] leading-7 text-pretty text-muted-foreground">
            Email{" "}
            <a href={`mailto:${site.email}`} className="text-accent underline decoration-accent/30 hover:decoration-accent">
              {site.email}
            </a>{" "}
            or find me on{" "}
            <a href={site.links.gh} target="_blank" rel="noreferrer" className="text-accent underline decoration-accent/30 hover:decoration-accent">
              GitHub
            </a>
            ,{" "}
            <a href={site.links.x} target="_blank" rel="noreferrer" className="text-accent underline decoration-accent/30 hover:decoration-accent">
              X
            </a>
            , and{" "}
            <a href={site.links.in} target="_blank" rel="noreferrer" className="text-accent underline decoration-accent/30 hover:decoration-accent">
              LinkedIn
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
