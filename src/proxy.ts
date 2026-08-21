import { NextRequest, NextResponse } from "next/server";
import { acceptsMarkdown, getNotFoundMarkdown } from "@/lib/agentic";

const markdownNativePaths = new Set(["/llms.txt", "/llms-full.txt", "/profile.md"]);
const knownPaths = new Set([
  "/",
  "/about",
  "/contact",
  "/privacy",
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

  if (wantsMarkdown && !markdownNativePaths.has(pathname) && !knownPaths.has(pathname)) {
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
