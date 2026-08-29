export const site = {
  name: "Shubh Gupta",
  handle: "shubhxho",
  title: "Shubh Gupta (shubhxho) — Engineer, Hacker & Builder",
  shortTitle: "Shubh Gupta — shubhxho",
  description:
    "Shubh Gupta, known online as shubhxho, is an engineer and hacker from Khagaria, India building robotics, AI, developer tools, and systems software.",
  bio: "I build robots, AI systems, developer tools, and unusual software from Khagaria, India.",
  url: "https://shubhxho.com",
  mark: "shubh.",
  monogram: "s/x",
  timezone: "Asia/Kolkata",
  timeLabel: "Shubh Time",
  copyrightName: "Shubh Gupta",
  locale: "en_US",
  language: "en-IN",
  lastUpdated: "2026-08-29",
  email: "shubh@shubhxho.com",
  keywords: [
    "Shubh Gupta",
    "shubhxho",
    "Shubh Gupta shubhxho",
    "engineer from Khagaria",
    "robotics engineer",
    "AI engineer",
    "systems software",
    "developer tools",
    "HFT",
    "Hudson River Trading",
    "Khagaria",
    "India",
  ],
  topics: [
    "Robotics",
    "Artificial intelligence",
    "Systems software",
    "Developer tools",
    "High-frequency trading",
    "Rust",
    "Go",
    "Linux",
  ],
  links: {
    x: "https://x.com/shubhgupta",
    in: "https://www.linkedin.com/in/shubhxho",
    ig: "https://www.instagram.com/shubhxho",
    gh: "https://github.com/shubhxho",
    hf: "https://huggingface.co/shubhxho",
    kg: "https://www.kaggle.com/shubhxho",
  },
} as const;

export type ProfileLinkKey = keyof typeof site.links;

export const profileLinkLabels: Record<ProfileLinkKey, string> = {
  gh: "GitHub",
  kg: "Kaggle",
  hf: "Hugging Face",
  x: "X",
  in: "LinkedIn",
  ig: "Instagram",
};

export const profileLinkPaths: Record<ProfileLinkKey, string> = {
  gh: "github.com/shubhxho",
  kg: "kaggle.com/shubhxho",
  hf: "huggingface.co/shubhxho",
  x: "x.com/shubhgupta",
  in: "linkedin.com/in/shubhxho",
  ig: "instagram.com/shubhxho",
};

export const profileLinkDescriptions: Partial<Record<ProfileLinkKey, string>> = {
  gh: "Source code and projects",
  kg: "Notebooks and competitions",
  hf: "Public machine-learning profile",
};

export const profileLinkOrder: ProfileLinkKey[] = ["gh", "kg", "hf", "x", "in", "ig"];

export function getProfileLink(key: ProfileLinkKey) {
  return {
    key,
    label: profileLinkLabels[key],
    url: site.links[key],
    path: profileLinkPaths[key],
    description: profileLinkDescriptions[key],
  };
}

export function getProfileLinks(keys: ProfileLinkKey[] = profileLinkOrder) {
  return keys.map(getProfileLink);
}

export function getProfileLinksMarkdown(keys: ProfileLinkKey[] = profileLinkOrder) {
  return getProfileLinks(keys)
    .map((link) => `- [${link.label}](${link.url})`)
    .join("\n");
}

export function getShubhxhoIdentityMarkdown() {
  return [
    `- Canonical site: [${site.url}](${site.url})`,
    `- Handle: @${site.handle}`,
    `- Email: ${site.email}`,
    ...getProfileLinks().map((link) => `- ${link.label}: [${link.path}](${link.url})`),
  ].join("\n");
}

export function getExternalProfileEndpointsMarkdown() {
  return getProfileLinks()
    .filter((link) => link.description)
    .map((link) => `- [${link.label} @${site.handle}](${link.url}): ${link.description}`)
    .join("\n");
}

export function getDescribedProfileLinksMarkdown(keys: ProfileLinkKey[]) {
  return getProfileLinks(keys)
    .map((link) => `- [${link.label}](${link.url}): ${link.description}`)
    .join("\n");
}

export function getSameAsUrls() {
  return getProfileLinks().map((link) => link.url);
}

export const agentDiscoveryEndpoints = [
  {
    url: `${site.url}/llms.txt`,
    label: "Agent instructions",
    description: "machine-readable site guide (start here)",
  },
  {
    url: `${site.url}/llms-full.txt`,
    label: "Full AI-readable profile",
    description: "biography, timeline, people, and writing",
  },
  {
    url: `${site.url}/profile.md`,
    label: "Markdown profile",
    description: "homepage snapshot",
  },
] as const;

export function getAgentDiscoveryLinksMarkdown() {
  return agentDiscoveryEndpoints
    .map((endpoint) => `- [${endpoint.label}](${endpoint.url}): ${endpoint.description}`)
    .join("\n");
}

type StructuredDataProject = {
  title: string;
  description: string;
  href: string;
};

export function getStructuredData(projects: StructuredDataProject[]) {
  return {
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
        sameAs: getSameAsUrls(),
        subjectOf: agentDiscoveryEndpoints.map((endpoint) => ({
          "@type": "CreativeWork",
          url: endpoint.url,
          name: endpoint.label,
        })),
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
}
