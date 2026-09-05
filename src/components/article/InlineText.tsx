import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Minimal inline formatting inside a plain-text field: links and bold.
 *
 *   [Bank Indonesia](https://bi.go.id)   → link
 *   [artikel lain](/artikel/slug)        → internal link, client-side nav
 *   **penting**                          → bold
 *
 * A `Block` currently stores prose as a plain string, which leaves no room for
 * a link in the middle of a sentence. Rich text is the eventual answer; this is
 * the small version that works today and translates cleanly when that lands.
 *
 * Parsed into React nodes rather than injected as HTML — nothing from the CMS
 * ever reaches dangerouslySetInnerHTML.
 */
const PATTERN = /(\[[^\]]+\]\([^)\s]+\))|(\*\*[^*]+\*\*)/g;

export default function InlineText({ children }: { children: string }) {
  return <>{parseInline(children)}</>;
}

export function parseInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;

  for (const match of text.matchAll(PATTERN)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));

    const token = match[0];

    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key++} className="text-bone-100 font-semibold">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      const split = token.indexOf("](");
      const label = token.slice(1, split);
      const href = token.slice(split + 2, -1);
      const external = /^https?:\/\//.test(href);

      nodes.push(
        external ? (
          <a
            key={key++}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-volt-400 decoration-volt-400/35 hover:decoration-volt-400 underline underline-offset-[3px] transition-colors"
          >
            {label}
          </a>
        ) : (
          <Link
            key={key++}
            href={href}
            className="text-volt-400 decoration-volt-400/35 hover:decoration-volt-400 underline underline-offset-[3px] transition-colors"
          >
            {label}
          </Link>
        ),
      );
    }

    last = index + token.length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
