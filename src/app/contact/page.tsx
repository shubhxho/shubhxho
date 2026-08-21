import type { Metadata } from "next";
import { TrustPage } from "@/components/trust-page";
import { site } from "@/lib/site";
import { trustPages } from "@/lib/trust";

export const metadata: Metadata = {
  title: trustPages.contact.title,
  description: trustPages.contact.description,
  alternates: { canonical: "/contact" },
  openGraph: { url: `${site.url}/contact` },
};

export default function ContactPage() {
  return <TrustPage slug="contact" />;
}
