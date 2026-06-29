"use client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function BlogCard({ post }) {
  const params = useParams();
  const locale = params?.locale ?? "en";
  return (
    <Link href={`/${locale}/blog/${post.slug}`}>
      <article className="group overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(249,115,22,0.12)] transition-all duration-300 mb-8 ">
        <Image
          src={post.cover}
          alt={post.title}
          width={1200}
          height={630}
          sizes="(max-width:768px) 100vw, 50vw"
          className="
            w-full
            h-60
            object-cover
            transition duration-500 group-hover:scale-105
          "
        />

        <div className="p-6">
          <time dateTime={post.date} className="text-sm text-[var(--muted)]">
            {post.date}
          </time>

          <h2 className=" mt-3 text-2xl font-bold  group-hover:text-[var(--primary)] transition">
            {post.title}
          </h2>

          <p className=" mt-4 text-[var(--muted)]">{post.description}</p>
        </div>
      </article>
    </Link>
  );
}
