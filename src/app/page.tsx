import { HomeView } from "@/components/home-view";
import { toEssayListItem } from "@/lib/essays";
import { getAllEssays } from "@/lib/posts";
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
  const posts = getAllEssays().slice(0, home.essaysPreviewCount).map(toEssayListItem);
  const people = getAllPeople().slice(0, home.peoplePreviewCount);
  const daily = getAllDaily().slice(0, home.dailyPreviewCount);

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
