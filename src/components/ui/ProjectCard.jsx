"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  FaBuilding,
  FaCar,
  FaCode,
  FaCogs,
  FaExternalLinkAlt,
  FaIndustry,
  FaGithub,
  FaShoppingCart,
  FaTachometerAlt,
  FaVideo,
  FaWallet,
} from "react-icons/fa";

const PROJECT_ICONS = {
  building: FaBuilding,
  factory: FaIndustry,
  code: FaCode,
  cctv: FaVideo,
  shopping: FaShoppingCart,
  finance: FaWallet,
  dashboard: FaTachometerAlt,
  car: FaCar,
  contacts: FaCogs,
};

export default function ProjectCard({ project }) {
  const params = useParams();

  const t = useTranslations("projectsData");
  const tProjects = useTranslations("projects");

  const locale = params?.locale === "fa" ? "fa" : "en";

  const projectTitle = t(`${project.slug}.title`);
  const projectDescription = t(`${project.slug}.description`);

  const projectUrl = `/${locale}/projects/${project.slug}`;

  const hasImage = Boolean(project.image);
  const hasGithub = Boolean(project.github);
  const hasDemo = Boolean(project.demo);

  const ProjectIcon = PROJECT_ICONS[project.icon] ?? PROJECT_ICONS.code;

  const imageWidth = project.imageWidth || 1600;
  const imageHeight = project.imageHeight || 1000;

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
        hover:-translate-y-2
        hover:border-[var(--accent)]
        hover:shadow-[0_0_25px_rgba(249,115,22,0.15)]
      "
    >
      {/* Project Image */}
      <Link
        href={projectUrl}
        aria-label={projectTitle}
        className="
          block
          rounded-t-3xl
          outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--primary)]
          focus-visible:ring-inset
        "
      >
        <div
          className="
            relative
            flex
            w-full
            items-center
            justify-center
            overflow-hidden
            rounded-t-3xl
            bg-[var(--bg)]
            p-3
            sm:p-4
          "
        >
          {/* Featured Badge */}
          {project.featured && (
            <span
              className="
                absolute
                left-4
                top-4
                z-10
                inline-flex
                items-center
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
              {tProjects("featured")}
            </span>
          )}

          {hasImage ? (
            <div className="flex w-full items-center justify-center">
              <Image
                src={project.image}
                alt={projectTitle}
                width={imageWidth}
                height={imageHeight}
                sizes="
                  (max-width: 640px) 100vw,
                  (max-width: 1024px) 50vw,
                  600px
                "
                className="
                  h-auto
                  w-full
                  rounded-2xl
                  object-contain
                  transition-transform
                  duration-500
                  group-hover:scale-[1.02]
                "
              />
            </div>
          ) : (
            <div
              className="
                flex
                aspect-[16/10]
                w-full
                items-center
                justify-center
                rounded-2xl
                bg-[var(--card)]
                text-[var(--muted)]
              "
              aria-hidden="true"
            >
              <ProjectIcon
                className="
                  text-6xl
                  text-[var(--accent)]
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Title */}
        <h3 className="text-2xl font-bold tracking-tight text-[var(--text)]">
          <Link
            href={projectUrl}
            className="
              rounded-sm
              transition-colors
              duration-300
              hover:text-[var(--primary)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--primary)]
            "
          >
            {projectTitle}
          </Link>
        </h3>

        {/* Description */}
        <p
          className="
            mt-4
            line-clamp-3
            leading-7
            text-[var(--muted)]
          "
        >
          {projectDescription}
        </p>

        {/* Category / Year */}
        <div
          className="
            mt-4
            flex
            flex-wrap
            items-center
            gap-2
            text-sm
            text-[var(--muted)]
          "
        >
          <span>{tProjects(`categories.${project.category}`)}</span>

          <span aria-hidden="true">•</span>

          <time dateTime={String(project.year)}>{project.year}</time>
        </div>

        {/* Technologies */}
        {project.technologies?.length > 0 && (
          <div className="mt-6">
            <div
              className="flex flex-wrap gap-2"
              aria-label={tProjects("technologies")}
            >
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    border
                    border-[var(--border)]
                    bg-[var(--bg)]
                    px-3
                    py-1.5
                    text-sm
                    font-medium
                    text-[var(--muted)]
                    transition-all
                    duration-300
                    hover:border-[var(--accent)]
                    hover:bg-[var(--accent)]/10
                    hover:text-[var(--accent)]
                  "
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto pt-7">
          <div className="flex flex-wrap items-center gap-3">
            {/* Details */}
            <Link
              href={projectUrl}
              className="
                inline-flex
                items-center
                justify-center
                rounded-xl
                bg-[var(--primary)]
                px-4
                py-2.5
                font-medium
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[var(--accent)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--primary)]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[var(--bg)]
              "
            >
              {tProjects("details")}
            </Link>

            {/* GitHub */}
            {hasGithub && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${projectTitle} GitHub repository`}
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[var(--border)]
                  bg-[var(--bg)]
                  p-2.5
                  text-[var(--text)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[var(--primary)]
                  hover:bg-[var(--primary)]
                  hover:text-white
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--primary)]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[var(--bg)]
                "
              >
                <FaGithub size={20} aria-hidden="true" />
              </a>
            )}

            {/* Live Demo */}
            {hasDemo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${projectTitle} ${tProjects("liveDemo")}`}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[var(--border)]
                  bg-[var(--bg)]
                  px-4
                  py-2.5
                  font-medium
                  text-[var(--text)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[var(--accent)]
                  hover:bg-[var(--accent)]/10
                  hover:text-[var(--accent)]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--primary)]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[var(--bg)]
                "
              >
                <FaExternalLinkAlt size={14} aria-hidden="true" />

                <span>{tProjects("liveDemo")}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
