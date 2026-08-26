import { HomeView } from "@/components/home-view";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

const projects = [
  {
    title: "wolfpdf",
    description: "wolfenstein 3d running inside a pdf — a systems toy that should not work, but does.",
    href: "https://github.com/shubhxho/wolfpdf",
    role: "systems experiment",
    tip: "rust · pdf · 2026",
    metric: "pdf runtime",
  },
  {
    title: "kinetic",
    description: "a native macos robotics simulator for trying ideas before touching hardware.",
    href: "https://github.com/shubhxho/kinetic",
    role: "robotics",
    tip: "macos · simulation · 2026",
    metric: "sim stack",
  },
  {
    title: "sable",
    description: "a 265kb rust chess engine focused on small binaries and clear search.",
    href: "https://github.com/shubhxho/sable",
    role: "engines",
    tip: "rust · chess · 265kb",
    metric: "265kb",
  },
  {
    title: "polymarket-model",
    description: "prediction-market research, modeling, and tooling with a quant edge.",
    href: "https://github.com/shubhxho/polymarket-model",
    role: "ai research",
    tip: "markets · modeling · research",
    metric: "quant / ml",
  },
  {
    title: "blender artworks",
    description: "3d studies, stills, and experiments collected in the gallery.",
    href: "https://gallery.shubhxho.com",
    role: "visual work",
    tip: "blender · stills · ongoing",
    metric: "visual",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      alternateName: [site.handle, site.shortTitle],
      description: site.description,
      inLanguage: site.language,
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      description: site.description,
      email: site.email,
      homeLocation: { "@type": "Place", name: "Khagaria, Bihar, India" },
      knowsAbout: site.topics,
      sameAs: Object.values(site.links),
    },
    {
      "@type": "ItemList",
      "@id": `${site.url}/#work`,
      name: "Selected work",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        description: project.description,
        url: project.href,
      })),
    },
  ],
};

export default function Home() {
  const posts = getAllPosts().slice(0, 3).map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    tip: `${post.readingTime} · open note`,
  }));

  return (
    <>
      <HomeView projects={[...projects]} posts={posts} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\u003c") }}
      />
    </>
  );
}
