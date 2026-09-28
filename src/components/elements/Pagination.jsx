"use client";

import { useEffect, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({
  totalItems = 0,
  itemsPerPage = 1,
  currentPage = 1,
  setCurrentPage,
}) {
  const params = useParams();
  const isPersian = params?.locale === "fa";

  const safeItemsPerPage =
    Number.isFinite(itemsPerPage) && itemsPerPage > 0 ? itemsPerPage : 1;

  const safeTotalItems =
    Number.isFinite(totalItems) && totalItems > 0 ? totalItems : 0;

  const totalPages = Math.max(1, Math.ceil(safeTotalItems / safeItemsPerPage));

  const hasRestoredFromUrl = useRef(false);

  /*
   * Restore the current page from the URL once the pagination
   * data is available.
   *
   * Example:
   * /fa/blog?page=2
   * /en/blog?page=2
   */
  useEffect(() => {
    if (hasRestoredFromUrl.current) {
      return;
    }

    if (safeTotalItems <= 0 || typeof setCurrentPage !== "function") {
      return;
    }

    const url = new URL(window.location.href);
    const pageParam = Number(url.searchParams.get("page"));

    if (
      Number.isInteger(pageParam) &&
      pageParam >= 1 &&
      pageParam <= totalPages
    ) {
      setCurrentPage(pageParam);
    }

    hasRestoredFromUrl.current = true;
  }, [safeTotalItems, totalPages, setCurrentPage]);

  /*
   * Keep the URL synchronized with the controlled pagination state.
   *
   * Page 1 is kept clean:
   * /fa/blog
   *
   * Other pages use:
   * /fa/blog?page=2
   */
  useEffect(() => {
    if (!hasRestoredFromUrl.current) {
      return;
    }

    if (typeof setCurrentPage !== "function") {
      return;
    }

    const normalizedCurrentPage = Math.min(
      Math.max(Number.isInteger(currentPage) ? currentPage : 1, 1),
      totalPages,
    );

    if (normalizedCurrentPage !== currentPage) {
      setCurrentPage(normalizedCurrentPage);
      return;
    }

    const url = new URL(window.location.href);
    const currentUrlPage = Number(url.searchParams.get("page"));

    if (normalizedCurrentPage <= 1) {
      if (url.searchParams.has("page")) {
        url.searchParams.delete("page");

        window.history.replaceState(
          window.history.state,
          "",
          `${url.pathname}${url.search}${url.hash}`,
        );
      }

      return;
    }

    if (currentUrlPage !== normalizedCurrentPage) {
      url.searchParams.set("page", String(normalizedCurrentPage));

      window.history.replaceState(
        window.history.state,
        "",
        `${url.pathname}${url.search}${url.hash}`,
      );
    }
  }, [currentPage, totalPages, setCurrentPage]);

  const visiblePages = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }, [currentPage, totalPages]);

  if (totalPages <= 1 || typeof setCurrentPage !== "function") {
    return null;
  }

  const PreviousIcon = isPersian ? FaChevronRight : FaChevronLeft;

  const NextIcon = isPersian ? FaChevronLeft : FaChevronRight;

  const goToPage = (page) => {
    if (
      !Number.isInteger(page) ||
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    setCurrentPage(page);
  };

  return (
    <nav
      aria-label={isPersian ? "صفحه‌بندی مقالات" : "Blog pagination"}
      dir={isPersian ? "rtl" : "ltr"}
      className="
        flex
        flex-wrap
        items-center
        justify-center
        gap-3
      "
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        aria-label={isPersian ? "صفحه قبلی" : "Previous page"}
        className={`
          inline-flex
          h-10
          min-w-10
          items-center
          justify-center
          rounded-xl
          border
          border-[var(--border)]
          px-3
          text-[var(--text)]
          transition-all
          duration-300
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--primary)]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[var(--bg)]
          ${
            currentPage === 1
              ? "cursor-not-allowed opacity-50"
              : "hover:border-[var(--primary)] hover:text-[var(--primary)]"
          }
        `}
      >
        <PreviousIcon size={14} aria-hidden="true" />
      </button>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {visiblePages.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              aria-hidden="true"
              className="
                flex
                h-10
                min-w-10
                items-center
                justify-center
                px-2
                text-[var(--muted)]
              "
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => goToPage(page)}
              aria-current={currentPage === page ? "page" : undefined}
              aria-label={isPersian ? `صفحه ${page}` : `Page ${page}`}
              className={`
                inline-flex
                h-10
                min-w-10
                items-center
                justify-center
                rounded-xl
                px-3
                text-sm
                font-medium
                transition-all
                duration-300
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--primary)]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[var(--bg)]
                ${
                  currentPage === page
                    ? "scale-105 bg-[var(--primary)] text-white shadow-lg"
                    : "border border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                }
              `}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        aria-label={isPersian ? "صفحه بعدی" : "Next page"}
        className={`
          inline-flex
          h-10
          min-w-10
          items-center
          justify-center
          rounded-xl
          border
          border-[var(--border)]
          px-3
          text-[var(--text)]
          transition-all
          duration-300
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--primary)]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[var(--bg)]
          ${
            currentPage === totalPages
              ? "cursor-not-allowed opacity-50"
              : "hover:border-[var(--primary)] hover:text-[var(--primary)]"
          }
        `}
      >
        <NextIcon size={14} aria-hidden="true" />
      </button>
    </nav>
  );
}
