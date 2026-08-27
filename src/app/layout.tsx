import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HoverTipProvider } from "@/components/hover-tip";
import { site } from "@/lib/site";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-face",
  display: "swap",
});

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingSiteVerification = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
    languages: { "en-IN": "/" },
    types: {
      "text/markdown": `${site.url}/profile.md`,
      "application/rss+xml": `${site.url}/feed.xml`,
    },
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: "profile",
    firstName: "Shubh",
    lastName: "Gupta",
    username: site.handle,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: "@shubhxho",
    site: "@shubhxho",
  },
  other: {
    "profile:username": site.handle,
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-title": site.name,
  },
  ...(googleSiteVerification || bingSiteVerification
    ? {
        verification: {
          ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
          ...(bingSiteVerification
            ? { other: { "msvalidate.01": bingSiteVerification } }
            : {}),
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={site.language} className={`${jetbrains.variable} antialiased`}>
      <head>
        <link rel="describedby" href="/llms.txt" type="text/markdown" />
        <link
          rel="alternate"
          href="/profile.md"
          type="text/markdown"
          title="AI-readable profile"
        />
        <link
          rel="alternate"
          href="/feed.xml"
          type="application/rss+xml"
          title={`${site.name} updates`}
        />
      </head>
      <body className="flex min-h-dvh flex-col overflow-x-hidden bg-background font-mono text-foreground">
        <HoverTipProvider>
          <Header />
          {children}
          <Footer />
        </HoverTipProvider>
      </body>
    </html>
  );
}
