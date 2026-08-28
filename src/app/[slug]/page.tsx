import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrustPage } from "@/components/trust-page";
import { getPageMetadata, isPageSlug, pageSlugs } from "@/lib/pages";

type TrustRouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TrustRouteProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isPageSlug(slug)) return {};
  return getPageMetadata(slug);
}

export default async function TrustRoutePage({ params }: TrustRouteProps) {
  const { slug } = await params;
  if (!isPageSlug(slug)) notFound();

  return <TrustPage slug={slug} />;
}
