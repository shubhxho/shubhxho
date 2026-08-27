import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { GalleryMosaic } from "@/components/gallery-mosaic";
import { getGalleryContent, getHomeContent } from "@/lib/content";
import { site } from "@/lib/site";

const gallery = getGalleryContent();
const home = getHomeContent();

export const metadata: Metadata = {
  title: "Gallery",
  description: gallery.intro,
  alternates: { canonical: "/gallery" },
  openGraph: { url: `${site.url}/gallery` },
};

export default function GalleryPage() {
  return (
    <main className="flex-1 px-5 py-16 sm:px-6 sm:py-24">
      <FadeIn className="site-shell-wide mx-auto">
        <p className="mb-3 text-sm text-muted-foreground">{home.name}</p>
        <h1 className="text-[clamp(2rem,6vw,3rem)] font-bold tracking-tight">Gallery</h1>
        <p className="mt-4 max-w-[38rem] text-sm leading-7 text-muted-foreground">{gallery.intro}</p>
        <p className="mt-3 text-sm">
          <a href={gallery.url} target="_blank" rel="noreferrer" className="ink-link">
            Open full archive →
          </a>
        </p>
        <div className="mt-10">
          <GalleryMosaic images={gallery.images} />
        </div>
        <p className="mt-10 text-sm">
          <Link href="/" className="ink-link">
            ← home
          </Link>
        </p>
      </FadeIn>
    </main>
  );
}
