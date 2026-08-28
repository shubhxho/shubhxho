import Link from "next/link";
import { MdxArticle } from "@/components/mdx-article";
import type { Person } from "@/lib/people";

function PersonMdx({
  person,
  linked = false,
  showTitle = true,
}: {
  person: Person;
  linked?: boolean;
  showTitle?: boolean;
}) {
  return (
    <article>
      {showTitle ? (
        <h2 className="text-[1.05rem] font-bold tracking-tight">
          {linked ? (
            <Link href={`/gratitude/${person.slug}`} className="ink-link">
              {person.name}
            </Link>
          ) : (
            person.name
          )}
        </h2>
      ) : null}
      {person.href ? (
        <p className="mt-2 text-sm">
          <a href={person.href} target="_blank" rel="noreferrer" className="ink-link">
            {person.href.replace(/^https?:\/\//, "")} →
          </a>
        </p>
      ) : null}
      <div className="mt-2">
        <MdxArticle content={person.content} />
      </div>
    </article>
  );
}

type PeopleViewProps =
  | {
      variant: "index";
      title: string;
      intro: string;
      people: Person[];
    }
  | {
      variant: "entry";
      person: Person;
    }
  | {
      variant: "list";
      people: Person[];
    };

export function PeopleView(props: PeopleViewProps) {
  if (props.variant === "index") {
    return (
      <>
        <h1 className="text-[clamp(2rem,6vw,3rem)] font-bold tracking-tight">{props.title}</h1>
        <p className="mt-4 mb-10 max-w-[38rem] text-sm leading-7 text-muted-foreground">{props.intro}</p>
        <div className="space-y-8">
          {props.people.map((person) => (
            <PersonMdx key={person.slug} person={person} linked />
          ))}
        </div>
      </>
    );
  }

  if (props.variant === "list") {
    return (
      <div className="space-y-8">
        {props.people.map((person) => (
          <PersonMdx key={person.slug} person={person} linked />
        ))}
      </div>
    );
  }

  return (
    <>
      <p className="mb-8 text-sm">
        <Link href="/gratitude" className="ink-link">
          ← all gratitude
        </Link>
      </p>
      <h1 className="mb-6 text-[clamp(1.8rem,5vw,2.6rem)] leading-[1.15] font-bold tracking-tight text-pretty">
        {props.person.name}
      </h1>
      <PersonMdx person={props.person} showTitle={false} />
    </>
  );
}

/** @deprecated Use PeopleView */
export const GratitudeView = PeopleView;
