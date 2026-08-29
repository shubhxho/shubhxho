import { HomeView } from "@/components/home-view";
import { getAllPosts } from "@/lib/blog";
import {
  getGalleryContent,
  getHomeContent,
  getProjects,
  getTimeline,
} from "@/lib/content";
import { getAllDaily } from "@/lib/daily";
import { getAllPeople } from "@/lib/people";
import { getStructuredData } from "@/lib/site";

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
      date: post.date,
    }));
  const people = getAllPeople().slice(0, home.peoplePreviewCount);
  const daily = getAllDaily()
    .slice(0, home.dailyPreviewCount)
    .map((entry) => ({
      slug: entry.slug,
      title: entry.title,
      date: entry.date,
    }));

  return (
    <>
      <HomeView
        home={home}
        projects={projects}
        gallery={gallery}
        posts={posts}
        daily={daily}
        timeline={timeline}
        people={people}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getStructuredData(projects)).replace(/</g, "\u003c"),
        }}
      />
    </>
  );
}
