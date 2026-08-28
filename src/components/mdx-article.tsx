import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";

type MdxArticleProps = {
  content: string;
};

export function MdxArticle({ content }: MdxArticleProps) {
  return (
    <div className="prose max-w-[68ch]">
      <MDXRemote source={content} components={mdxComponents} />
    </div>
  );
}
