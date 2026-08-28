import type { Metadata } from "next";
import { TrustPage } from "@/components/trust-page";
import { getPage } from "@/lib/pages";
import { site } from "@/lib/site";

const page = getPage("privacy");

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/privacy" },
  openGraph: { url: `${site.url}/privacy` },
};

export default function PrivacyPage() {
  return <TrustPage slug="privacy" />;
}
