import { Fragment, type ReactNode } from "react";

export function InlineMarkdown({ value }: { value: string }) {
  const parts = value.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^\s)]+\))/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={index}>{part.slice(1, -1)}</code>;
        }
        const link = part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
        if (link) {
          const href = link[2];
          const external = href.startsWith("http");
          return (
            <a
              key={index}
              href={href}
              className="ink-link"
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {link[1]}
            </a>
          );
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}

export function MarkdownArticle({ content }: { content: string }) {
  const blocks: ReactNode[] = [];
  const lines = content.split("\n");
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(
        <p key={`p-${blocks.length}`}>
          <InlineMarkdown value={paragraph.join(" ")} />
        </p>,
      );
    }
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) {
      blocks.push(
        <ul key={`list-${blocks.length}`} role="list">
          {list.map((item) => (
            <li key={item}>
              <InlineMarkdown value={item} />
            </li>
          ))}
        </ul>,
      );
    }
    list = [];
  };

  for (const line of lines) {
    if (!line.trim()) {
      flushParagraph();
      flushList();
    } else if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push(<h2 key={`h2-${blocks.length}`}>{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push(<h3 key={`h3-${blocks.length}`}>{line.slice(4)}</h3>);
    } else if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.slice(2));
    } else if (line.startsWith("> ")) {
      flushParagraph();
      flushList();
      blocks.push(
        <blockquote key={`quote-${blocks.length}`}>
          <InlineMarkdown value={line.slice(2)} />
        </blockquote>,
      );
    } else {
      paragraph.push(line.trim());
    }
  }

  flushParagraph();
  flushList();
  return <div className="prose max-w-[68ch]">{blocks}</div>;
}
