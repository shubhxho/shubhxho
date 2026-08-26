import { isValidElement, type ReactNode } from "react";

export type TimelineEntry = {
  date: string;
  description: ReactNode;
};

function nodeToText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(nodeToText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return nodeToText(node.props.children);
  }

  return "";
}

export function timelineEntryText(entry: TimelineEntry) {
  return nodeToText(entry.description).replace(/\s+/g, " ").trim();
}

export const timeline: TimelineEntry[] = [
  {
    date: "08.18.26",
    description: (
      <>
        Ships{" "}
        <a
          className="underline"
          href="https://github.com/shubhxho/wolfpdf"
          target="_blank"
          rel="noreferrer"
        >
          wolfpdf
        </a>
        , wolfenstein 3d in a pdf
      </>
    ),
  },
  {
    date: "08.17.26",
    description: (
      <>
        Builds{" "}
        <a
          className="underline"
          href="https://github.com/shubhxho/polymarket-model"
          target="_blank"
          rel="noreferrer"
        >
          polymarket-model
        </a>{" "}
        with the polymarket founder
      </>
    ),
  },
  {
    date: "08.16.26",
    description: (
      <>
        Ships{" "}
        <a
          className="underline"
          href="https://github.com/shubhxho/kinetic"
          target="_blank"
          rel="noreferrer"
        >
          kinetic
        </a>
        , a native macos robotics simulator
      </>
    ),
  },
  {
    date: "08.10.26",
    description: (
      <>
        Writes{" "}
        <a
          className="underline"
          href="https://github.com/shubhxho/sable"
          target="_blank"
          rel="noreferrer"
        >
          sable
        </a>
        , a 265kb rust chess engine
      </>
    ),
  },
  {
    date: "08.01.26",
    description: (
      <>
        HFT intern at{" "}
        <a
          className="underline"
          href="https://www.hudsonrivertrading.com/"
          target="_blank"
          rel="noreferrer"
        >
          Hudson River Trading
        </a>
      </>
    ),
  },
  {
    date: "08.01.26",
    description: (
      <>
        Research assistant at{" "}
        <a
          className="underline"
          href="https://www.stanford.edu/"
          target="_blank"
          rel="noreferrer"
        >
          Stanford
        </a>{" "}
        on venture capital and neuroscience
      </>
    ),
  },
  {
    date: "07.20.26",
    description: (
      <>
        Ships{" "}
        <a
          className="underline"
          href="https://github.com/shubhxho/invoice"
          target="_blank"
          rel="noreferrer"
        >
          invoice
        </a>
        , a cli for issuing invoices
      </>
    ),
  },
  {
    date: "06.01.26",
    description: (
      <>
        Neurodivergent fellow at{" "}
        <a
          className="underline"
          href="https://www.palantir.com/"
          target="_blank"
          rel="noreferrer"
        >
          Palantir
        </a>
      </>
    ),
  },
  {
    date: "06.01.26",
    description: (
      <>
        Joins the{" "}
        <a
          className="underline"
          href="https://a16z.com/"
          target="_blank"
          rel="noreferrer"
        >
          a16z
        </a>{" "}
        alpha fellowship
      </>
    ),
  },
  {
    date: "02.01.26",
    description: (
      <>
        Emergent Ventures grantee. $15k to make robots more awesome
      </>
    ),
  },
  {
    date: "02.01.26",
    description: (
      <>
        Resident at{" "}
        <a
          className="underline"
          href="https://x.com/HashedEM/status/2026310333963636953"
          target="_blank"
          rel="noreferrer"
        >
          Hashed House Delhi
        </a>
      </>
    ),
  },
  {
    date: "01.01.26",
    description: (
      <>
        Drops out of{" "}
        <a
          className="underline"
          href="https://www.imperial.ac.uk/"
          target="_blank"
          rel="noreferrer"
        >
          Imperial College London
        </a>
      </>
    ),
  },
  {
    date: "12.01.25",
    description: "Reviews a bunch of projects for terminal craft",
  },
  {
    date: "10.08.25",
    description: (
      <>
        Makes an{" "}
        <a
          className="underline"
          href="https://x.com/shubhxho/status/1978473438361891260/"
          target="_blank"
          rel="noreferrer"
        >
          ai film
        </a>{" "}
        for localhost. it goes viral
      </>
    ),
  },
  {
    date: "09.01.25",
    description: (
      <>
        Organizes the first hackathon in Khagaria w/ yubico, jukebox,{" "}
        <a
          className="underline"
          href="https://hackclub.com"
          target="_blank"
          rel="noreferrer"
        >
          gen.xyz
        </a>
        , monster
      </>
    ),
  },
  {
    date: "08.01.25",
    description: (
      <>
        Best in class at{" "}
        <a
          className="underline"
          href="https://codeday.sh/kronos"
          target="_blank"
          rel="noreferrer"
        >
          CodeDay Dehradun
        </a>
      </>
    ),
  },
  {
    date: "08.01.25",
    description: "Makes a corexy 3d printer from scratch in a week",
  },
  {
    date: "01.01.25",
    description: "Wins ELMO, NPHO, and NCHO; attends RMO camp",
  },
  {
    date: "08.01.24",
    description: (
      <>
        Volunteers at{" "}
        <a
          className="underline"
          href="https://hackclub.com"
          target="_blank"
          rel="noreferrer"
        >
          Hack Club
        </a>
      </>
    ),
  },
  {
    date: "01.01.24",
    description: (
      <>
        Writes{" "}
        <a
          className="underline"
          href="https://github.com/shubhisroking/goirc"
          target="_blank"
          rel="noreferrer"
        >
          goirc
        </a>
        , a tui irc client in go
      </>
    ),
  },
  {
    date: "01.01.24",
    description: (
      <>
        Joins{" "}
        <a
          className="underline"
          href="https://microagi.ai"
          target="_blank"
          rel="noreferrer"
        >
          MicroAGI
        </a>{" "}
        in a growth role
      </>
    ),
  },
  {
    date: "01.01.23",
    description: (
      <>
        Ships a custom rom and orangefox recovery for the{" "}
        <a
          className="underline"
          href="https://xdaforums.com/t/pixelexperience-unofficial-for-realme-narzo30a-narzo-20.4413309/"
          target="_blank"
          rel="noreferrer"
        >
          realme narzo 30a
        </a>
      </>
    ),
  },
  {
    date: "01.01.22",
    description: "DECA world championship winner",
  },
  {
    date: "01.01.21",
    description: "NTSE scholar",
  },
  {
    date: "01.01.19",
    description: "Starts coding. android first, then everything else",
  },
  {
    date: "01.01.07",
    description: "Shubh is born in Khagaria",
  },
];
