"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import projects from "@/data/projects/projects";
import projectCategories from "@/data/projects/projectCategories";

import ProjectCard from "../ui/ProjectCard";
import Pagination from "./Pagination";
import SearchBox from "../ui/SearchBox";

export default function CategoryFiltersProjects() {
  const t = useTranslations("projects");
  const tData = useTranslations("projectsData");
  const tPagination = useTranslations("pagination");

  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const ITEMS_PER_PAGE = 10;

  const filteredProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return projects.filter((project) => {
      const title = tData(`${project.slug}.title`).toLowerCase();

      const description = tData(`${project.slug}.description`).toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        title.includes(normalizedSearch) ||
        description.includes(normalizedSearch);

      const matchesCategory =
        activeCategory === "all" || project.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [activeCategory, searchTerm, tData]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / ITEMS_PER_PAGE),
  );

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const startItem =
    filteredProjects.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredProjects.length,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <>
      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder={t("searchProjects")}
      />

      <div
        className="
          mt-12
          flex
          flex-wrap
          justify-center
          gap-3
        "
        role="group"
        aria-label={t("filtersLabel")}
      >
        {projectCategories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
              }}
              aria-pressed={isActive}
              className={`
                rounded-full
                border
                px-4
                py-2
                text-sm
                font-medium
                transition-all
                duration-300

                ${
                  isActive
                    ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                    : "border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                }

                focus:outline-none
                focus:ring-2
                focus:ring-[var(--primary)]
                focus:ring-offset-2
                focus:ring-offset-[var(--bg)]
              `}
            >
              {category === "all"
                ? t("filters.all")
                : t(`categories.${category}`)}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${searchTerm}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="
            mt-12
            grid
            gap-8
            lg:grid-cols-2
          "
        >
          {paginatedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {filteredProjects.length === 0 && (
            <div
              className="
                col-span-full
                py-16
                text-center
                text-[var(--muted)]
              "
            >
              {t("noProjectsFound")}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {filteredProjects.length > 0 && (
        <div
          className="
            mt-12
            flex
            flex-col
            items-center
            justify-center
            gap-3
          "
        >
          <Pagination
            totalItems={filteredProjects.length}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          <p
            className="
              text-sm
              text-[var(--muted)]
            "
            aria-live="polite"
          >
            {startItem}-{endItem} {tPagination("of")} {filteredProjects.length}{" "}
            {tPagination("showingProjects")}
          </p>
        </div>
      )}
    </>
  );
}
