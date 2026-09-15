import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";

function CodeBlock({ children, ...props }) {
  return (
    <pre
      {...props}
      dir="ltr"
      className="
        my-8
        overflow-x-auto
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--card)]
        p-5
        text-left
        text-sm
        leading-7
        [direction:ltr]
        [text-align:left]
        [&_*]:text-left
        [&_*]:[direction:ltr]
      "
    >
      {children}
    </pre>
  );
}

function InlineCode({ children, ...props }) {
  return (
    <code
      {...props}
      dir="ltr"
      className="
        rounded-md
        bg-[var(--card)]
        px-1.5
        py-0.5
        text-[var(--accent)]
        [direction:ltr]
        [unicode-bidi:embed]
      "
    >
      {children}
    </code>
  );
}

function Anchor({ href = "", children, ...props }) {
  const linkClassName =
    "text-[var(--primary)] no-underline underline-offset-4 transition-colors duration-200 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]";

  const className = [linkClassName, props.className].filter(Boolean).join(" ");

  const isHttpExternal =
    href.startsWith("http://") || href.startsWith("https://");

  if (isHttpExternal) {
    return (
      <a
        {...props}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a {...props} href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link {...props} href={href} className={className}>
      {children}
    </Link>
  );
}

function MdxImage({ src, alt = "", ...props }) {
  return (
    <span className="my-8 block overflow-hidden rounded-3xl border border-[var(--border)]">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={630}
        sizes="(max-width: 768px) 100vw, 1200px"
        className="h-auto w-full object-cover"
        {...props}
      />
    </span>
  );
}

export default function MdxContent({ source, locale = "en" }) {
  return (
    <div
      dir={locale === "fa" ? "rtl" : "ltr"}
      className="
        prose
        max-w-none
        text-[var(--muted)]
        prose-headings:text-[var(--text)]
        prose-headings:font-bold
        prose-p:leading-8
        prose-p:text-[var(--muted)]
        prose-li:text-[var(--muted)]
        prose-strong:text-[var(--text)]
        prose-blockquote:border-[var(--accent)]
        prose-table:w-full
        prose-th:text-[var(--text)]
        prose-td:text-[var(--muted)]
        prose-code:text-[var(--accent)]
        prose-pre:bg-transparent
        prose-pre:p-0
      "
    >
      <MDXRemote
        source={source}
        components={{
          pre: CodeBlock,
          code: InlineCode,
          a: Anchor,
          img: MdxImage,
        }}
      />
    </div>
  );
}
