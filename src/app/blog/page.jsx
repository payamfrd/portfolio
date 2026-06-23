import Link from "next/link";

import { getAllPosts, getFeaturedPosts, getRelatedPosts } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = getFeaturedPosts();
  const related = getRelatedPosts();

  return (
    <main
      className="
        max-w-5xl
        mx-auto
        px-6
        py-32
      "
    >
      <h1
        className="
          text-5xl
          font-bold
        "
      >
        Blog
      </h1>

      <section>
        <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
      </section>

      <div
        className="
          mt-12
          space-y-8
        "
      >
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      <section className="mt-24">
        <h2
          className="
      text-3xl
      font-bold
      mb-8
    "
        >
          Related Articles
        </h2>

        <div
          className="
      grid
      md:grid-cols-3
      gap-6
    "
        >
          {related.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
