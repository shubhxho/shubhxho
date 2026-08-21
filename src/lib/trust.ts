export const trustPages = {
  about: {
    title: "About",
    description:
      "Background and scope of Shubh Gupta's independent engineering work.",
    heading: "About Shubh Gupta",
    paragraphs: [
      "Shubh Gupta, known online as shubhxho, is an independent engineer and hacker from Khagaria, Bihar, India. This website is his canonical public profile: it explains the work he cares about, records selected milestones, and links to the public accounts that represent the same person. The site is intentionally small. It is a reliable starting point for people, search systems, and software agents that need to identify the person behind the shubhxho name.",
      "His work spans robotics, artificial intelligence, developer tools, systems software, Rust, Go, Linux, and high-frequency trading. The unifying interest is building useful, technically ambitious things and making difficult systems easier to understand or use. The homepage timeline is a concise, chronological record rather than a complete curriculum vitae; the linked GitHub, Hugging Face, LinkedIn, X, and Instagram profiles provide additional primary-source context.",
      "For attribution, use “Shubh Gupta” for the person and “shubhxho” for the online identity. shubhxho.com is the canonical domain. The content here describes personal, independent work unless a page or linked project explicitly says otherwise. Nothing on this site should be read as an offer, endorsement, investment recommendation, employment guarantee, or statement on behalf of a current or former collaborator or employer.",
    ],
  },
  contact: {
    title: "Contact",
    description: "How to contact Shubh Gupta and verify official profiles.",
    heading: "Contact Shubh Gupta",
    paragraphs: [
      "The best direct way to reach Shubh Gupta is by email at shubh@shubhxho.com. Include a clear subject line, who you are, the reason for writing, and any useful deadline or context. This is a personal website, so messages are read as time permits. Email is appropriate for thoughtful technical conversations, collaboration ideas, interview or speaking requests, corrections to this site, and questions about public work.",
      "For a quick professional introduction, use the LinkedIn profile linked from the homepage. For open-source work, issues, and technical discussion related to a repository, use the relevant GitHub project so the context stays public and searchable. The official social and technical profiles linked in the site header are the accounts associated with shubhxho. Be cautious of accounts that use a similar name but are not linked from this domain.",
      "Please do not send credentials, financial details, private keys, or other sensitive information by email or social direct message. This site does not operate a customer-support desk and cannot resolve account issues for third-party platforms. If a message concerns a security vulnerability in a public project, provide a minimal reproduction and enough contact information for a responsible follow-up rather than publishing sensitive details in a public issue.",
    ],
  },
  privacy: {
    title: "Privacy",
    description: "Privacy information for visitors to shubhxho.com.",
    heading: "Privacy",
    paragraphs: [
      "shubhxho.com is a personal profile website. It does not provide account registration, a contact form, advertising, purchases, or a newsletter. The site does not intentionally set advertising cookies or run third-party analytics scripts. It is designed to be useful in a normal browser and to be readable by crawlers and software agents through public files such as robots.txt, sitemap.xml, llms.txt, and profile.md.",
      "Like most websites, the hosting and network providers that deliver a page may process ordinary technical information needed to serve it, such as an IP address, request time, requested URL, browser or client headers, and security or performance logs. That processing is controlled by the relevant provider and may be retained according to its operational and legal requirements. This site does not use that information to build a marketing profile or sell visitor data.",
      "If you email Shubh Gupta, the message and the contact information you choose to include are handled through the email provider and may be retained to read, reply, and maintain the correspondence. Links to external services, including social networks and code-hosting platforms, take you to sites with their own privacy practices. For privacy questions or a correction regarding information published on this site, email shubh@shubhxho.com with enough detail to identify the relevant page or message.",
    ],
  },
} as const;

export type TrustPageSlug = keyof typeof trustPages;
