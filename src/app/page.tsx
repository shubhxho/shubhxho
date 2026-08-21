import { LiveEntry } from "@/components/live-entry";
import { TimelineRow } from "@/components/timeline-row";
import { formatSiteDate, timelineDateToIso } from "@/lib/date";
import { site } from "@/lib/site";
import { timeline, timelineEntryText } from "@/lib/timeline";

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
      "@type": "ProfilePage",
      "@id": `${site.url}/#profile`,
      url: site.url,
      name: site.title,
      description: site.description,
      dateModified: site.lastUpdated,
      inLanguage: site.language,
      isPartOf: { "@id": `${site.url}/#website` },
      mainEntity: { "@id": `${site.url}/#person` },
      breadcrumb: { "@id": `${site.url}/#breadcrumb` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      givenName: "Shubh",
      familyName: "Gupta",
      alternateName: [site.handle, `@${site.handle}`],
      url: site.url,
      description: site.description,
      email: site.email,
      homeLocation: {
        "@type": "Place",
        name: "Khagaria, Bihar, India",
      },
      knowsAbout: site.topics,
      sameAs: Object.values(site.links),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${site.url}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: site.name,
          item: site.url,
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${site.url}/#timeline`,
      name: `${site.name} timeline`,
      numberOfItems: timeline.length,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      itemListElement: timeline.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: timelineEntryText(entry),
        description: `${timelineDateToIso(entry.date)} — ${timelineEntryText(entry)}`,
        url: `${site.url}/#timeline-${timelineDateToIso(entry.date)}-${index + 1}`,
      })),
    },
  ],
};

export default function Home() {
  return (
    <main className="no-scrollbar relative flex h-dvh w-full flex-col items-start justify-start gap-4 overflow-y-auto p-6 pt-28 pb-28 tracking-tight sm:p-8 sm:pt-28 sm:pb-28 sm:pl-8">
      <section
        aria-labelledby="profile-heading"
        className="mb-2 flex w-full flex-row items-start justify-start gap-16 text-xs sm:gap-26"
      >
        <p className="w-[8ch] shrink-0 font-ibm text-muted-foreground">PROFILE</p>
        <div className="max-w-2xl">
          <h1 id="profile-heading" className="font-instrument text-2xl leading-none">
            {site.name} <span className="text-muted-foreground">@{site.handle}</span>
          </h1>
          <p className="mt-2 leading-relaxed text-muted-foreground">{site.bio}</p>
        </div>
      </section>
      <section aria-labelledby="timeline-heading" className="contents">
        <h2 id="timeline-heading" className="sr-only">Timeline</h2>
        <LiveEntry date={formatSiteDate()} />
        {timeline.map((entry, index) => (
          <TimelineRow
            key={`${entry.date}-${index}`}
            date={entry.date}
            dateTime={timelineDateToIso(entry.date)}
          >
            <span id={`timeline-${timelineDateToIso(entry.date)}-${index + 1}`}>
              {entry.description}
            </span>
          </TimelineRow>
        ))}
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
