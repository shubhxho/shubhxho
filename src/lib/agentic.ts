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
- [People](https://shubhxho.com/people): people I look up to ([Markdown](https://shubhxho.com/people.md))
- [History](https://shubhxho.com/history): chronological timeline
- [Gallery](https://shubhxho.com/gallery): visual work
- [Writing](https://shubhxho.com/blog): essays and notes
- [Sitemap](https://shubhxho.com/sitemap.xml): canonical indexable pages
- [Agent instructions](https://shubhxho.com/llms.txt): machine-readable site guide
- [Full AI-readable profile](https://shubhxho.com/llms-full.txt): biography, timeline, people, and writing
- [Markdown profile](https://shubhxho.com/profile.md): homepage snapshot
- [Kaggle](https://www.kaggle.com/shubhxho): notebooks and competitions
- [Hugging Face](https://huggingface.co/shubhxho): machine-learning profile
- [GitHub](https://github.com/shubhxho): source code and projects
`;
}
