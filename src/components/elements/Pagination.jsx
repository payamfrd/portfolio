"use client";

import { useMemo } from "react";
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

  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
    if (page < 1 || page > totalPages || page === currentPage) {
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
