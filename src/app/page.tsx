import { HomeView } from "@/components/home-view";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

const projects = [
  {
    title: "Blender artworks",
    description: "3D studies, stills, and experiments",
    year: "Ongoing",
    href: "https://gallery.shubhxho.com",
    tag: "visual",
  },
  {
    title: "wolfpdf",
    description: "Wolfenstein 3D in a PDF",
    year: "2026",
    href: "https://github.com/shubhxho/wolfpdf",
    tag: "systems",
  },
  {
    title: "kinetic",
    description: "A native macOS robotics simulator",
    year: "2026",
    href: "https://github.com/shubhxho/kinetic",
    tag: "robotics",
  },
  {
    title: "polymarket-model",
    description: "Prediction-market research and tooling",
    year: "2026",
    href: "https://github.com/shubhxho/polymarket-model",
    tag: "ai",
  },
  {
    title: "sable",
    description: "A 265kb Rust chess engine",
    year: "2026",
    href: "https://github.com/shubhxho/sable",
    tag: "engines",
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
    dateLabel: formatPostDate(post.date),
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
