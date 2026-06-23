import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article
        className="
          overflow-hidden
          rounded-3xl
          border
          border-slate-800
          bg-slate-900/50
          hover:border-blue-500
          transition
          mb-8
        "
      >
        <Image
          src={post.cover}
          alt={post.title}
          width={1200}
          height={630}
          className="
            w-full
            h-60
            object-cover
          "
        />

        <div className="p-6">
          <p
            className="
              text-sm
              text-slate-500
            "
          >
            {post.date}
          </p>

          <h2
            className="
              mt-3
              text-2xl
              font-bold
            "
          >
            {post.title}
          </h2>

          <p
            className="
              mt-4
              text-slate-400
            "
          >
            {post.description}
          </p>
        </div>
      </article>
    </Link>
  );
}
