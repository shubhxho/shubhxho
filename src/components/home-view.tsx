"use client";

import Link from "next/link";
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

export function HomeView({ projects, posts }: HomeViewProps) {
  return (
    <main className="flex min-h-dvh flex-1 flex-col justify-center px-6 py-16 sm:px-8">
      <FadeIn className="mx-auto w-full max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">{site.name.toLowerCase()}</h1>

        <p className="mb-6 max-w-xl text-base leading-7 text-pretty">
          i build robots, ai systems, developer tools, and unusual software from khagaria, india.
          i like hard problems, small complete tools, and shipping things people can actually run.
          currently messing with robotics, rust, and systems software. you can find my work on{" "}
          <a href={site.links.gh} target="_blank" rel="noreferrer" className="link">
            github
          </a>
          , experiments on{" "}
          <a href={site.links.hf} target="_blank" rel="noreferrer" className="link">
            hugging face
          </a>
          , and visuals in the{" "}
          <a href="https://gallery.shubhxho.com" target="_blank" rel="noreferrer" className="link">
            gallery
          </a>
          .
        </p>

        <p className="mb-4 text-base">
          <span>
            [ <Link href="/blog" className="bracket-link">blog</Link> ]
          </span>{" "}
          <span>
            [ <Link href="/about" className="bracket-link">about</Link> ]
          </span>{" "}
          <span>
            [ <Link href="/contact" className="bracket-link">contact</Link> ]
          </span>{" "}
          <span>
            [{" "}
            <a href="https://gallery.shubhxho.com" target="_blank" rel="noreferrer" className="bracket-link">
              gallery
            </a>{" "}
            ]
          </span>
        </p>

        <p className="mb-4 text-sm text-muted-foreground">
          find me elsewhere:{" "}
          <a href={site.links.x} target="_blank" rel="noreferrer" className="text-foreground hover:text-muted-foreground">
            x
          </a>
          {" | "}
          <a href={site.links.gh} target="_blank" rel="noreferrer" className="text-foreground hover:text-muted-foreground">
            github
          </a>
          {" | "}
          <a href={site.links.in} target="_blank" rel="noreferrer" className="text-foreground hover:text-muted-foreground">
            linkedin
          </a>
          {" | "}
          <a href={site.links.ig} target="_blank" rel="noreferrer" className="text-foreground hover:text-muted-foreground">
            instagram
          </a>
          {" | "}
          <a href={site.links.hf} target="_blank" rel="noreferrer" className="text-foreground hover:text-muted-foreground">
            huggingface
          </a>
        </p>

        <p className="mb-10 text-sm">
          reach out:{" "}
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
        </p>

        <div className="mt-2">
          <p className="mb-5 text-sm font-bold">a few things i&apos;ve done</p>

          <div className="space-y-8">
            <div>
              <p className="mb-3 text-sm font-bold underline underline-offset-4">projects</p>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.title}>
                    <p className="text-sm">
                      <span className="font-bold">{project.title}</span>
                      {" — "}
                      {project.role}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{project.description}</p>
                    <p className="mt-0.5 text-sm">
                      [{" "}
                      <a href={project.href} target="_blank" rel="noreferrer" className="bracket-link">
                        {project.title}
                      </a>{" "}
                      ]
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-bold underline underline-offset-4">writing</p>
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.slug}>
                    <p className="text-sm">
                      <Link href={`/blog/${post.slug}`} className="font-bold hover:text-muted-foreground">
                        {post.title.toLowerCase()}
                      </Link>
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{post.description}</p>
                  </div>
                ))}
                <p className="text-sm">
                  [ <Link href="/blog" className="bracket-link">all writing</Link> ]
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </main>
  );
}
