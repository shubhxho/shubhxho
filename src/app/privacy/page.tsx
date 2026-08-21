import type { Metadata } from "next";
import { TrustPage } from "@/components/trust-page";
import { site } from "@/lib/site";
import { trustPages } from "@/lib/trust";

export const metadata: Metadata = {
  title: trustPages.privacy.title,
  description: trustPages.privacy.description,
  alternates: { canonical: "/privacy" },
  openGraph: { url: `${site.url}/privacy` },
};

export default function PrivacyPage() {
  return <TrustPage slug="privacy" />;
}
