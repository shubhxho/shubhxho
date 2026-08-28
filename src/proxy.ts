import { NextRequest, NextResponse } from "next/server";
import { acceptsMarkdown, getNotFoundMarkdown } from "@/lib/agentic";
import { pageSlugs } from "@/lib/content-types";

const pagePaths = pageSlugs.flatMap((slug) => [`/${slug}`, `/${slug}.md`]);

const markdownNativePaths = new Set([
  "/llms.txt",
  "/llms-full.txt",
  "/profile.md",
  "/people.md",
  ...pageSlugs.map((slug) => `/${slug}.md`),
]);
const knownPaths = new Set([
  "/",
  ...pagePaths,
  "/blog",
  "/gallery",
  "/gratitude",
  "/gratitude.md",
  "/people",
  "/people.md",
  "/history",
  "/feed.xml",
  "/humans.txt",
  "/indexnow.txt",
  "/llms.txt",
  "/llms-full.txt",
  "/manifest.webmanifest",
  "/profile.md",
  "/robots.txt",
  "/sitemap.xml",
  "/icon",
  "/apple-icon",
  "/opengraph-image",
  "/twitter-image",
]);

function isKnownPath(pathname: string) {
  if (knownPaths.has(pathname)) return true;
  if (pathname.startsWith("/blog/")) return true;
  if (pathname.startsWith("/people/")) return true;
  if (pathname.startsWith("/people-markdown/")) return true;
  if (pathname.startsWith("/page-markdown/")) return true;
  return false;
}

function withNegotiationVary(response: NextResponse) {
  response.headers.set("Vary", "Accept, Accept-Encoding");
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const wantsMarkdown = acceptsMarkdown(request.headers.get("accept"));

  if (pathname === "/" && wantsMarkdown) {
    return withNegotiationVary(
      NextResponse.rewrite(new URL("/profile.md", request.url)),
    );
  }

  if (wantsMarkdown && !markdownNativePaths.has(pathname) && !isKnownPath(pathname)) {
    return new NextResponse(getNotFoundMarkdown(pathname), {
      status: 404,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept, Accept-Encoding",
        "X-Robots-Tag": "noindex, follow",
      },
    });
  }

  return withNegotiationVary(NextResponse.next());
}

export const config = {
  matcher: "/:path*",
};
