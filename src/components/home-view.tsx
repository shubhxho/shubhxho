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
    <main className="flex flex-1 flex-col justify-center px-6 py-20 sm:px-8 sm:py-24">
      <FadeIn className="mx-auto w-full max-w-2xl">
        <Tip tip="engineer · hacker · builder from khagaria">
          <h1 className="mb-7 inline-block text-[1.75rem] leading-none font-bold tracking-tight sm:text-3xl">
            {site.name.toLowerCase()}
          </h1>
        </Tip>

        <p className="mb-7 max-w-xl text-[15px] leading-7 text-pretty sm:text-base">
          i build robots, ai systems, developer tools, and unusual software from khagaria, india.
          i like hard problems, small complete tools, and shipping things people can actually run.
          currently deep in robotics, rust, and systems work. find code on{" "}
          <Tip tip="open github.com/shubhxho" as="span">
            <a href={site.links.gh} target="_blank" rel="noreferrer" className="link">
              github
            </a>
          </Tip>
          , models on{" "}
          <Tip tip="open huggingface.co/shubhxho" as="span">
            <a href={site.links.hf} target="_blank" rel="noreferrer" className="link">
              hugging face
            </a>
          </Tip>
          , and visuals in the{" "}
          <Tip tip="open gallery.shubhxho.com" as="span">
            <a href="https://gallery.shubhxho.com" target="_blank" rel="noreferrer" className="link">
              gallery
            </a>
          </Tip>
          .
        </p>

        <p className="mb-5 flex flex-wrap gap-x-2 gap-y-1 text-[15px] sm:text-base">
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
            <a href={site.links.x} target="_blank" rel="noreferrer" className="text-foreground hover:text-muted-foreground">
              x
            </a>
          </Tip>
          <span className="mx-1.5 text-border">|</span>
          <Tip tip="repositories and experiments" as="span">
            <a href={site.links.gh} target="_blank" rel="noreferrer" className="text-foreground hover:text-muted-foreground">
              github
            </a>
          </Tip>
          <span className="mx-1.5 text-border">|</span>
          <Tip tip="professional profile" as="span">
            <a href={site.links.in} target="_blank" rel="noreferrer" className="text-foreground hover:text-muted-foreground">
              linkedin
            </a>
          </Tip>
          <span className="mx-1.5 text-border">|</span>
          <Tip tip="@shubhxho on instagram" as="span">
            <a href={site.links.ig} target="_blank" rel="noreferrer" className="text-foreground hover:text-muted-foreground">
              instagram
            </a>
          </Tip>
          <span className="mx-1.5 text-border">|</span>
          <Tip tip="models and datasets" as="span">
            <a href={site.links.hf} target="_blank" rel="noreferrer" className="text-foreground hover:text-muted-foreground">
              huggingface
            </a>
          </Tip>
        </p>

        <p className="mb-12 text-sm">
          reach out:{" "}
          <Tip tip="best way to get a reply" as="span">
            <a href={`mailto:${site.email}`} className="link">
              {site.email}
            </a>
          </Tip>
        </p>

        <section aria-labelledby="work-heading">
          <h2 id="work-heading" className="mb-6 text-sm font-bold">
            a few things i&apos;ve done
          </h2>

          <div className="space-y-10">
            <div>
              <h3 className="mb-4 text-sm font-bold underline underline-offset-4">projects</h3>
              <div className="space-y-5">
                {projects.map((project) => (
                  <article key={project.title} className="group">
                    <p className="text-sm leading-6">
                      <Tip tip={project.tip} as="span">
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold transition-colors group-hover:text-muted-foreground"
                        >
                          {project.title}
                        </a>
                      </Tip>
                      <span className="text-muted-foreground"> — {project.role}</span>
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground transition-colors group-hover:text-foreground/70">
                      {project.description}
                    </p>
                    <p className="mt-1.5 text-sm opacity-70 transition-opacity group-hover:opacity-100">
                      <BracketLink href={project.href} tip={project.tip} external>
                        {project.title}
                      </BracketLink>
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold underline underline-offset-4">writing</h3>
              <div className="space-y-5">
                {posts.map((post) => (
                  <article key={post.slug} className="group">
                    <p className="text-sm leading-6">
                      <Tip tip={post.tip} as="span">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="font-bold transition-colors group-hover:text-muted-foreground"
                        >
                          {post.title.toLowerCase()}
                        </Link>
                      </Tip>
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground transition-colors group-hover:text-foreground/70">
                      {post.description}
                    </p>
                  </article>
                ))}
                <p className="text-sm">
                  <BracketLink href="/blog" tip="open the full writing index">
                    all writing
                  </BracketLink>
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}
