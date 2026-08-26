"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { FadeIn } from "@/components/fade-in";
import { Tip } from "@/components/hover-tip";
import { site } from "@/lib/site";

export type HomeProject = {
  title: string;
  description: string;
  href: string;
  role: string;
  tip: string;
  metric: string;
};

export type HomePost = {
  slug: string;
  title: string;
  description: string;
  tip: string;
};

type HomeViewProps = {
  projects: HomeProject[];
  posts: HomePost[];
};

function BracketLink({
  href,
  children,
  tip,
  external = false,
}: {
  href: string;
  children: ReactNode;
  tip: string;
  external?: boolean;
}) {
  if (external) {
    return (
      <Tip tip={tip} as="span">
        [{" "}
        <a href={href} target="_blank" rel="noreferrer" className="bracket-link">
          {children}
        </a>{" "}
        ]
      </Tip>
    );
  }

  return (
    <Tip tip={tip} as="span">
      [{" "}
      <Link href={href} className="bracket-link">
        {children}
      </Link>{" "}
      ]
    </Tip>
  );
}

export function HomeView({ projects, posts }: HomeViewProps) {
  return (
    <main className="flex flex-1 flex-col px-6 py-16 sm:px-8 sm:py-20">
      <FadeIn className="mx-auto w-full max-w-3xl">
        <p className="mb-4 text-[11px] tracking-[0.22em] text-signal uppercase">
          shubhxho · systems · robotics · ai
        </p>

        <Tip tip="engineer · hacker · builder from khagaria">
          <h1 className="mb-5 text-[clamp(2.4rem,8vw,4.2rem)] leading-[0.95] font-bold tracking-[-0.05em]">
            {site.name.toLowerCase()}
          </h1>
        </Tip>

        <p className="mb-8 max-w-2xl text-[15px] leading-7 text-pretty text-muted-foreground sm:text-base">
          i build robots, ai systems, developer tools, and unusual software from khagaria, india.
          hard problems, small complete tools, things people can actually run. currently deep in
          robotics, rust, and systems work — with a quant bent for markets and models.
        </p>

        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Tip tip="selected public builds" as="div">
            <div className="stat">
              <p className="text-[11px] tracking-wide text-muted-foreground uppercase">projects</p>
              <p className="mt-1 text-xl font-bold text-accent">{projects.length}</p>
            </div>
          </Tip>
          <Tip tip="notes on the workbench" as="div">
            <div className="stat">
              <p className="text-[11px] tracking-wide text-muted-foreground uppercase">writing</p>
              <p className="mt-1 text-xl font-bold text-accent">{posts.length}+</p>
            </div>
          </Tip>
          <Tip tip="primary stack" as="div">
            <div className="stat">
              <p className="text-[11px] tracking-wide text-muted-foreground uppercase">stack</p>
              <p className="mt-1 text-xl font-bold text-signal">rust</p>
            </div>
          </Tip>
          <Tip tip="based in khagaria, india" as="div">
            <div className="stat">
              <p className="text-[11px] tracking-wide text-muted-foreground uppercase">base</p>
              <p className="mt-1 text-xl font-bold text-signal">blr/in</p>
            </div>
          </Tip>
        </div>

        <p className="mb-4 flex flex-wrap gap-x-2 gap-y-1 text-[15px] sm:text-base">
          <BracketLink href="/blog" tip="notes on building and shipping">
            blog
          </BracketLink>
          <BracketLink href="/about" tip="who i am and what this site is">
            about
          </BracketLink>
          <BracketLink href="/contact" tip="email and official profiles">
            contact
          </BracketLink>
          <BracketLink href="https://gallery.shubhxho.com" tip="3d studies and stills" external>
            gallery
          </BracketLink>
        </p>

        <p className="mb-3 text-sm text-muted-foreground">
          elsewhere:{" "}
          <Tip tip="@shubhgupta on x" as="span">
            <a href={site.links.x} target="_blank" rel="noreferrer" className="text-foreground hover:text-accent">
              x
            </a>
          </Tip>
          <span className="mx-1.5 text-border">|</span>
          <Tip tip="repositories and experiments" as="span">
            <a href={site.links.gh} target="_blank" rel="noreferrer" className="text-foreground hover:text-accent">
              github
            </a>
          </Tip>
          <span className="mx-1.5 text-border">|</span>
          <Tip tip="professional profile" as="span">
            <a href={site.links.in} target="_blank" rel="noreferrer" className="text-foreground hover:text-accent">
              linkedin
            </a>
          </Tip>
          <span className="mx-1.5 text-border">|</span>
          <Tip tip="models and datasets" as="span">
            <a href={site.links.hf} target="_blank" rel="noreferrer" className="text-foreground hover:text-accent">
              huggingface
            </a>
          </Tip>
        </p>

        <p className="mb-14 text-sm">
          reach out:{" "}
          <Tip tip="best way to get a reply" as="span">
            <a href={`mailto:${site.email}`} className="link">
              {site.email}
            </a>
          </Tip>
        </p>

        <section aria-labelledby="work-heading" className="mb-14">
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-border pb-3">
            <div>
              <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">01 · builds</p>
              <h2 id="work-heading" className="mt-1 text-lg font-bold tracking-tight">
                a few things i&apos;ve done
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {projects.map((project) => (
              <article key={project.title} className="panel group p-4 transition-colors hover:border-accent/40">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                  <p className="text-sm leading-6">
                    <Tip tip={project.tip} as="span">
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold group-hover:text-accent"
                      >
                        {project.title}
                      </a>
                    </Tip>
                    <span className="text-muted-foreground"> — {project.role}</span>
                  </p>
                  <p className="text-[11px] tracking-wide text-signal uppercase">{project.metric}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.description}</p>
                <p className="mt-3 text-sm">
                  <BracketLink href={project.href} tip={project.tip} external>
                    open
                  </BracketLink>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="writing-heading">
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-border pb-3">
            <div>
              <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">02 · notes</p>
              <h2 id="writing-heading" className="mt-1 text-lg font-bold tracking-tight">
                writing
              </h2>
            </div>
            <BracketLink href="/blog" tip="open the full writing index">
              all writing
            </BracketLink>
          </div>

          <div className="space-y-3">
            {posts.map((post) => (
              <article key={post.slug} className="panel group p-4 transition-colors hover:border-accent/40">
                <p className="text-sm leading-6">
                  <Tip tip={post.tip} as="span">
                    <Link href={`/blog/${post.slug}`} className="font-bold group-hover:text-accent">
                      {post.title.toLowerCase()}
                    </Link>
                  </Tip>
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{post.description}</p>
              </article>
            ))}
          </div>
        </section>
      </FadeIn>
    </main>
  );
}
