const markdownMediaType = /(?:^|,)\s*text\/markdown(?:\s*;[^,]*)?(?:,|$)/i;

/** Returns true only when the client explicitly asks for Markdown. */
export function acceptsMarkdown(accept: string | null) {
  if (!accept || !markdownMediaType.test(accept)) {
    return false;
  }

  return !/text\/markdown\s*;[^,]*\bq=0(?:\.0+)?\b/i.test(accept);
}

export function getNotFoundMarkdown(pathname: string) {
  return `# 404: Page not found

\`${pathname}\` does not exist on the official website for Shubh Gupta (shubhxho).

## Where to look next

- [Homepage](https://shubhxho.com/): biography, projects, history, gallery, and writing
- [History](https://shubhxho.com/history): chronological timeline
- [Gallery](https://shubhxho.com/gallery): visual work
- [Writing](https://shubhxho.com/blog): essays and notes
- [Sitemap](https://shubhxho.com/sitemap.xml): canonical indexable pages
- [Agent instructions](https://shubhxho.com/llms.txt): machine-readable site guide
- [Full Markdown profile](https://shubhxho.com/profile.md): complete public profile
`;
}
