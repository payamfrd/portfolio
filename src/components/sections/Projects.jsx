"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import projects from "@/data/projects/projects";
import ProjectCard from "@/components/ui/ProjectCard";

const VALID_LOCALES = ["fa", "en"];

export default function Projects() {
  const t = useTranslations("projects");
  const params = useParams();

  const locale = VALID_LOCALES.includes(params?.locale) ? params.locale : "en";

  const featuredProjects = projects.filter((project) => project.featured);

  const ArrowIcon = locale === "fa" ? FaArrowLeft : FaArrowRight;

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="scroll-mt-24 py-24 md:py-32 section-divider"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Section Header */}
        <header className="mx-auto max-w-3xl text-center">
          <span className="block font-medium text-[var(--primary)]">
            {t("title")}
          </span>

          <h2
            id="projects-title"
            className="
              mt-4
              text-3xl
              font-bold
              tracking-tight
              text-[var(--text)]
              sm:text-4xl
              md:text-5xl
            "
          >
            {t("description")}
          </h2>
        </header>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div
            className="
              mt-16
              grid
              gap-8
              lg:grid-cols-2
            "
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}

        {/* View All */}
        <div className="mt-14 flex justify-center">
          <Link
            href={`/${locale}/projects`}
            aria-label={t("viewAll")}
            className="
              group
              relative
              inline-flex
              items-center
              gap-3
              overflow-hidden
              rounded-xl
              border
              border-[var(--primary)]
              bg-[var(--card)]
              px-6
              py-3
              font-medium
              text-[var(--primary)]
              shadow-[0_0_20px_rgba(249,115,22,0.12)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[var(--primary)]
              hover:text-white
              hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]
              focus:outline-none
              focus:ring-2
              focus:ring-[var(--primary)]
              focus:ring-offset-2
              focus:ring-offset-[var(--bg)]
            "
          >
            <span>{t("viewAll")}</span>

            <ArrowIcon
              size={14}
              aria-hidden="true"
              className={`
                transition-transform
                duration-300
                ${
                  locale === "fa"
                    ? "group-hover:-translate-x-1"
                    : "group-hover:translate-x-1"
                }
              `}
            />

            {/* Glow */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-5
                left-1/2
                h-6
                w-3/4
                -translate-x-1/2
                rounded-full
                bg-[var(--primary)]
                opacity-20
                blur-xl
                transition-all
                duration-300
                group-hover:opacity-50
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
