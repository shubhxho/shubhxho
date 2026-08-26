"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { FadeIn } from "@/components/fade-in";
import { site } from "@/lib/site";

export type HomeProject = {
  title: string;
  description: string;
  href: string;
  role: string;
};

export type HomePost = {
  slug: string;
  title: string;
  description: string;
};

type HomeViewProps = {
  projects: HomeProject[];
  posts: HomePost[];
};

function BracketLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <span>
        [{" "}
        <a href={href} target="_blank" rel="noreferrer" className="bracket-link">
          {children}
        </a>{" "}
        ]
      </span>
    );
  }

  return (
    <span>
      [{" "}
      <Link href={href} className="bracket-link">
        {children}
      </Link>{" "}
      ]
    </span>
  );
}

export function HomeView({ projects, posts }: HomeViewProps) {
  return (
    <main className="flex flex-1 flex-col justify-center px-6 py-20 sm:px-8 sm:py-24">
      <FadeIn className="mx-auto w-full max-w-2xl">
        <h1 className="mb-7 text-[1.75rem] leading-none font-bold tracking-tight sm:text-3xl">
          {site.name.toLowerCase()}
        </h1>

        <p className="mb-7 max-w-xl text-[15px] leading-7 text-pretty sm:text-base">
          i build robots, ai systems, developer tools, and unusual software from khagaria, india.
          i like hard problems, small complete tools, and shipping things people can actually run.
          currently deep in robotics, rust, and systems work. find code on{" "}
          <a href={site.links.gh} target="_blank" rel="noreferrer" className="link">
            github
          </a>
          , models on{" "}
          <a href={site.links.hf} target="_blank" rel="noreferrer" className="link">
            hugging face
          </a>
          , and visuals in the{" "}
          <a href="https://gallery.shubhxho.com" target="_blank" rel="noreferrer" className="link">
            gallery
          </a>
          .
        </p>

        <p className="mb-5 flex flex-wrap gap-x-2 gap-y-1 text-[15px] sm:text-base">
          <BracketLink href="/blog">blog</BracketLink>
          <BracketLink href="/about">about</BracketLink>
          <BracketLink href="/contact">contact</BracketLink>
          <BracketLink href="https://gallery.shubhxho.com" external>
            gallery
          </BracketLink>
        </p>

        <p className="mb-3 text-sm text-muted-foreground">
          elsewhere:{" "}
          <a href={site.links.x} target="_blank" rel="noreferrer" className="text-foreground hover:text-muted-foreground">
            x
          </a>
          <span className="mx-1.5 text-border">|</span>
          <a href={site.links.gh} target="_blank" rel="noreferrer" className="text-foreground hover:text-muted-foreground">
            github
          </a>
          <span className="mx-1.5 text-border">|</span>
          <a href={site.links.in} target="_blank" rel="noreferrer" className="text-foreground hover:text-muted-foreground">
            linkedin
          </a>
          <span className="mx-1.5 text-border">|</span>
          <a href={site.links.ig} target="_blank" rel="noreferrer" className="text-foreground hover:text-muted-foreground">
            instagram
          </a>
          <span className="mx-1.5 text-border">|</span>
          <a href={site.links.hf} target="_blank" rel="noreferrer" className="text-foreground hover:text-muted-foreground">
            huggingface
          </a>
        </p>

        <p className="mb-12 text-sm">
          reach out:{" "}
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
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
                  <article key={project.title}>
                    <p className="text-sm leading-6">
                      <span className="font-bold">{project.title}</span>
                      <span className="text-muted-foreground"> — {project.role}</span>
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{project.description}</p>
                    <p className="mt-1.5 text-sm">
                      <BracketLink href={project.href} external>
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
                  <article key={post.slug}>
                    <p className="text-sm leading-6">
                      <Link href={`/blog/${post.slug}`} className="font-bold hover:text-muted-foreground">
                        {post.title.toLowerCase()}
                      </Link>
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{post.description}</p>
                  </article>
                ))}
                <p className="text-sm">
                  <BracketLink href="/blog">all writing</BracketLink>
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}
