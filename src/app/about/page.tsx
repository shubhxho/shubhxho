import type { Metadata } from "next";
import { TrustPage } from "@/components/trust-page";
import { getPage } from "@/lib/content";
import { site } from "@/lib/site";

const page = getPage("about");

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/about" },
  openGraph: { url: `${site.url}/about` },
};

export default function AboutPage() {
  return <TrustPage slug="about" />;
}
