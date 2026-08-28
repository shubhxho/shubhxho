import { TrustPage } from "@/components/trust-page";
import { getPageMetadata } from "@/lib/pages";

export const metadata = getPageMetadata("about");

export default function AboutPage() {
  return <TrustPage slug="about" />;
}
