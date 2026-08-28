import { getPage, type ContentPage, type ContentPageSlug } from "@/lib/pages";

export { getPage, type ContentPage, type ContentPageSlug };

export type TrustPageSlug = ContentPageSlug;

export function getTrustPage(slug: TrustPageSlug) {
  return getPage(slug);
}
