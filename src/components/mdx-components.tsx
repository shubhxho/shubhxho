import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    if (href.startsWith("http")) {
      return (
        <a href={href} className="ink-link" target="_blank" rel="noreferrer" {...props}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className="ink-link" {...props}>
        {children}
      </Link>
    );
  },
};
