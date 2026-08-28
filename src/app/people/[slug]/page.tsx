import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/fade-in";
import { PeopleView } from "@/components/people-view";
import { getAllPeople, getPerson } from "@/lib/people";
import { site } from "@/lib/site";

type PersonPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPeople().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PersonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) return {};
  return {
    title: person.name,
    description: person.plainNote,
    alternates: {
      canonical: `/people/${person.slug}`,
      types: {
        "text/markdown": `${site.url}/people/${person.slug}.md`,
      },
    },
    openGraph: {
      type: "article",
      url: `${site.url}/people/${person.slug}`,
      title: person.name,
      description: person.plainNote,
    },
  };
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) notFound();

  return (
    <main className="flex-1 px-5 py-16 sm:px-6 sm:py-24">
      <FadeIn className="site-shell">
        <PeopleView variant="entry" person={person} />
      </FadeIn>
    </main>
  );
}
