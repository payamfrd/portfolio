import { MDXRemote } from "next-mdx-remote/rsc";

export default function MdxContent({ source }) {
  return (
    <article
      className="
        prose
        prose-invert
        lg:prose-xl
        max-w-none
      "
    >
      <MDXRemote source={source} />
    </article>
  );
}
