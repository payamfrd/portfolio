"use client";

import { FiCode, FiGrid, FiMoreHorizontal, FiWifi } from "react-icons/fi";

import certificateCategories from "@/data/certificates/certificateCategories";

const categoryIcons = {
  all: FiGrid,
  frontend: FiCode,
  network: FiWifi,
  other: FiMoreHorizontal,
};

export default function CertificatesFilter({
  activeCategory,
  setActiveCategory,
  t,
  getCategoryCount,
}) {
  return (
    <div
      role="group"
      aria-label={t("filterLabel")}
      className="mt-10 flex flex-wrap justify-center gap-3 sm:mt-12"
    >
      {certificateCategories.map((category) => {
        const Icon = categoryIcons[category] ?? FiGrid;

        const count = getCategoryCount(category);

        const isActive = activeCategory === category;

        const label = t(`filters.${category}`);

        return (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            aria-pressed={isActive}
            aria-label={`${label} (${count})`}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] ${
              isActive
                ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-sm"
                : "border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--primary)]"
            }`}
          >
            <Icon className="text-base" aria-hidden="true" />

            <span>{label}</span>

            <span
              className={`min-w-[1.5rem] rounded-full px-1.5 py-0.5 text-xs ${
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-[var(--border)] text-[var(--muted)]"
              }`}
              aria-hidden="true"
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
