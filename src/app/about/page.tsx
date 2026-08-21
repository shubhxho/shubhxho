import type { Metadata } from "next";
import { TrustPage } from "@/components/trust-page";
import { site } from "@/lib/site";
import { trustPages } from "@/lib/trust";

export const metadata: Metadata = {
  title: trustPages.about.title,
  description: trustPages.about.description,
  alternates: { canonical: "/about" },
  openGraph: { url: `${site.url}/about` },
};

export default function AboutPage() {
  return <TrustPage slug="about" />;
}
