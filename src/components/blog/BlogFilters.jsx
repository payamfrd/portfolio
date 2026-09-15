"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import SearchBox from "@/components/ui/SearchBox";
import Pagination from "../elements/Pagination";
import BlogCard from "./BlogCard";

import { normalizeSearchText } from "@/lib/blog/formatters";

const POSTS_PER_PAGE = 6;

function getSearchableText(post) {
  const values = [
    post?.title,
    post?.description,
    post?.category,
    ...(Array.isArray(post?.tags) ? post.tags : []),
    ...(Array.isArray(post?.keywords) ? post.keywords : []),
  ];

  return normalizeSearchText(values.join(" "));
}

export default function BlogFilters({ posts = [] }) {
  const t = useTranslations("blog");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    const query = normalizeSearchText(searchTerm);

    if (!query) {
      return posts;
    }

    return posts.filter((post) => getSearchableText(post).includes(query));
  }, [posts, searchTerm]);

  const featuredPosts = useMemo(
    () => filteredPosts.filter((post) => post.featured),
    [filteredPosts],
  );

  const normalPosts = useMemo(
    () => filteredPosts.filter((post) => !post.featured),
    [filteredPosts],
  );

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;

    return normalPosts.slice(start, start + POSTS_PER_PAGE);
  }, [normalPosts, currentPage]);

  const totalPages = Math.max(
    1,
    Math.ceil(normalPosts.length / POSTS_PER_PAGE),
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const hasFeaturedSection = currentPage === 1 && featuredPosts.length > 0;

  return (
    <div>
      <div className="mx-auto max-w-2xl">
        <SearchBox
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={t("searchPosts")}
        />
      </div>

      <div className="mt-5 flex min-h-6 items-center justify-center">
        {searchTerm.trim() && (
          <p className="text-sm text-[var(--muted)]" aria-live="polite">
            {filteredPosts.length} {t("results")}
          </p>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg font-medium text-[var(--text)]">
            {t("noPostsFound")}
          </p>

          <p className="mt-3 text-[var(--muted)]">{t("tryAnotherSearch")}</p>
        </div>
      ) : (
        <>
          {hasFeaturedSection && (
            <section className="mt-14" aria-labelledby="featured-posts-title">
              <h2
                id="featured-posts-title"
                className="mb-8 text-3xl font-bold text-[var(--primary)]"
              >
                {t("featuredPosts")}
              </h2>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredPosts.map((post) => (
                  <BlogCard key={`${post.locale}-${post.slug}`} post={post} />
                ))}
              </div>
            </section>
          )}

          <section
            className={hasFeaturedSection ? "mt-20" : "mt-14"}
            aria-labelledby="all-posts-title"
          >
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2
                id="all-posts-title"
                className="text-3xl font-bold text-[var(--text)]"
              >
                {t("allPosts")}
              </h2>

              <span className="text-sm text-[var(--muted)]">
                {normalPosts.length}
              </span>
            </div>

            {paginatedPosts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedPosts.map((post) => (
                  <BlogCard key={`${post.locale}-${post.slug}`} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10 text-center text-[var(--muted)]">
                {t("noPostsFound")}
              </div>
            )}
          </section>

          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination
                totalItems={normalPosts.length}
                itemsPerPage={POSTS_PER_PAGE}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
