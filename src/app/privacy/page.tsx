import { TrustPage } from "@/components/trust-page";
import { getPageMetadata } from "@/lib/pages";

export const metadata = getPageMetadata("privacy");

export default function PrivacyPage() {
  return <TrustPage slug="privacy" />;
}
