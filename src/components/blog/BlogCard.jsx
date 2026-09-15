"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { formatBlogDate } from "@/lib/blog/formatters";

export default function BlogCard({ post }) {
  const params = useParams();

  const locale = params?.locale === "fa" ? "fa" : "en";

  const readingTimeMinutes = Math.max(1, Number(post?.readingTimeMinutes) || 1);

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-[var(--border)]
        bg-[var(--card)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[var(--accent)]
        hover:shadow-[0_0_25px_rgba(249,115,22,0.12)]
      "
    >
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="
          flex
          h-full
          flex-col
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--primary)]
          focus-visible:ring-inset
        "
        aria-label={post.title}
      >
        <div className="relative overflow-hidden bg-[var(--bg)]">
          {post.cover ? (
            <Image
              src={post.cover}
              alt={post.title}
              width={1200}
              height={630}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="
                h-56
                w-full
                object-content
                transition-transform
                duration-500
                group-hover:scale-105
                sm:h-60
              "
            />
          ) : (
            <div
              className="
                flex
                h-56
                w-full
                items-center
                justify-center
                bg-[var(--bg)]
                sm:h-60
              "
              aria-hidden="true"
            >
              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[var(--border)]
                  bg-[var(--card)]
                  text-[var(--primary)]
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-10 w-10"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18.5v-13Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7h8M8 11h8M8 15h5"
                  />
                </svg>
              </div>
            </div>
          )}

          {post.featured && (
            <span
              className="
                absolute
                left-4
                top-4
                rounded-full
                bg-[var(--primary)]
                px-3
                py-1.5
                text-xs
                font-semibold
                text-white
                shadow-lg
              "
            >
              {locale === "fa" ? "ویژه" : "Featured"}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[var(--muted)]">
            <time dateTime={post.date}>
              {formatBlogDate(post.date, locale)}
            </time>

            <span aria-hidden="true">•</span>

            <span>
              {readingTimeMinutes}{" "}
              {locale === "fa" ? "دقیقه مطالعه" : "min read"}
            </span>
          </div>

          <h2
            className="
              mt-4
              min-h-[4.5rem]
              text-2xl
              font-bold
              leading-9
              text-[var(--text)]
              text-justify
              transition-colors
              duration-300
              group-hover:text-[var(--primary)]
            "
          >
            {post.title}
          </h2>

          <p
            className="
              mt-4
              line-clamp-3
              min-h-[5.5rem]
              leading-8
              text-[var(--muted)]
              text-justify
            "
          >
            {post.description}
          </p>

          <div className="mt-auto pt-6">
            <span className="inline-flex items-center font-semibold text-[var(--primary)]">
              {locale === "fa" ? "ادامه مطلب" : "Read article"}

              <span
                className={`
                  ms-2
                  transition-transform
                  duration-300
                  ${
                    locale === "fa"
                      ? "group-hover:-translate-x-1"
                      : "group-hover:translate-x-1"
                  }
                `}
                aria-hidden="true"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
