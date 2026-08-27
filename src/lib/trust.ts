import { getPage, type ContentPage, type ContentPageSlug } from "@/lib/content";

export type TrustPageSlug = ContentPageSlug;

export { getPage, type ContentPage };

export function getTrustPage(slug: TrustPageSlug) {
  return getPage(slug);
}
