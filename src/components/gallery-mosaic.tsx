import Image from "next/image";
import type { GalleryImage } from "@/lib/content-types";

const layoutClass: Record<GalleryImage["layout"], string> = {
  feature: "sm:col-span-2 sm:row-span-2 aspect-[4/5] sm:aspect-auto",
  tall: "aspect-[3/4] sm:row-span-2 sm:aspect-auto",
  wide: "sm:col-span-2 aspect-[16/10]",
  square: "aspect-square",
};

type GalleryMosaicProps = {
  images: GalleryImage[];
  compact?: boolean;
};

export function GalleryMosaic({ images, compact = false }: GalleryMosaicProps) {
  const items = compact ? images.slice(0, 7) : images;

  return (
    <div className="gallery-mosaic">
      {items.map((image, index) => (
        <a
          key={image.id}
          href={image.href}
          target="_blank"
          rel="noreferrer"
          className={`gallery-tile group relative block overflow-hidden bg-surface ${
            compact && index === 0 ? layoutClass.feature : layoutClass[image.layout]
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={
              image.layout === "feature" || (compact && index === 0)
                ? "(max-width: 640px) 100vw, 28rem"
                : "(max-width: 640px) 50vw, 14rem"
            }
            priority={index < 2}
            className="object-cover transition duration-500 ease-out group-hover:scale-[1.035]"
          />
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-3 pt-10 pb-3 text-[11px] text-white opacity-0 transition duration-300 group-hover:opacity-100 sm:text-xs">
            {image.title}
          </span>
        </a>
      ))}
    </div>
  );
}
