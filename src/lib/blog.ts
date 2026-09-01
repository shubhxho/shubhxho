export {
  formatPostDate,
  getAllNotes,
  getAllPosts,
  getNote,
  getPost,
  getPostPath,
} from "@/lib/posts";
export type { BlogPost } from "@/lib/content-types";

import { readMarkdownFile } from "@/lib/markdown";
import { getAllNotes, getNote, getPostPath } from "@/lib/posts";

export function getBlogMeta() {
  const { attributes } = readMarkdownFile("blog.md");

  return {
    title: attributes.title ?? "Blog",
    description:
      attributes.description ??
      "Project notes on robotics, systems software, experiments, and the useful details that appear while building.",
    intro:
      attributes.intro ??
      "Project notes, experiments, and field reports from the workbench. For longer arguments and reflections, read the essays.",
    essaysLabel: attributes.essaysLabel ?? "Read the essays →",
  };
}

export function getBlogIndexMarkdown() {
  const meta = getBlogMeta();
  const entries = getAllNotes()
    .map((post) => `- [${post.title}](${getPostPath(post)}): ${post.description}`)
    .join("\n");

  return `# ${meta.title}\n\n${meta.intro}\n\n${entries}`.trim();
}

export function getNoteMarkdown(slug: string) {
  const post = getNote(slug);
  if (!post) return null;

  return `# ${post.title}\n\n${post.description}\n\n${post.content}`.trim();
}
