import { TrustPage } from "@/components/trust-page";
import { getPageMetadata } from "@/lib/pages";

export const metadata = getPageMetadata("contact");

export default function ContactPage() {
  return <TrustPage slug="contact" />;
}
