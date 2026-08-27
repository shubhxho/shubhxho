import type { Metadata } from "next";
import { TrustPage } from "@/components/trust-page";
import { getPage } from "@/lib/content";
import { site } from "@/lib/site";

const page = getPage("contact");

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/contact" },
  openGraph: { url: `${site.url}/contact` },
};

export default function ContactPage() {
  return <TrustPage slug="contact" />;
}
