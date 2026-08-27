import { HomeView } from "@/components/home-view";
import {
  getAllPosts,
  getGalleryContent,
  getHomeContent,
  getProjects,
  getTimeline,
} from "@/lib/content";
import { site } from "@/lib/site";

const structuredData = (projects: ReturnType<typeof getProjects>) => ({
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
});

export default function Home() {
  const home = getHomeContent();
  const projects = getProjects();
  const gallery = getGalleryContent();
  const timeline = getTimeline().slice(0, home.historyPreviewCount);
  const posts = getAllPosts()
    .slice(0, home.writingPreviewCount)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      tip: `${post.readingTime} · open note`,
    }));

  return (
    <>
      <HomeView
        home={home}
        projects={projects}
        gallery={gallery}
        posts={posts}
        timeline={timeline}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData(projects)).replace(/</g, "\u003c"),
        }}
      />
    </>
  );
}
