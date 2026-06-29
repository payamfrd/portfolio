import { MDXRemote } from "next-mdx-remote/rsc";

export default function MdxContent({ source }) {
  return (
    <article
      className="
        prose
        lg:prose-xl
        max-w-none

        dark:prose-invert

        prose-headings:text-[var(--text)]
        prose-p:text-[var(--muted)]
        prose-li:text-[var(--muted)]
        prose-strong:text-[var(--text)]

        prose-a:text-[var(--primary)]
        prose-a:no-underline
        hover:prose-a:text-[var(--accent)]

        prose-code:text-[var(--accent)]

        prose-pre:bg-[var(--card)]
        prose-pre:border
        prose-pre:border-[var(--border)]

        prose-blockquote:border-[var(--accent)]
      "
    >
      <MDXRemote source={source} />
    </article>
  );
}
