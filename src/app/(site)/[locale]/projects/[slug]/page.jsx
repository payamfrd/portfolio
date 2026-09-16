import Image from "next/image";
import { notFound } from "next/navigation";

import { getTranslations } from "next-intl/server";

import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

import projects from "@/data/projects/projects";

import Breadcrumb from "@/components/ui/Breadcrumb";
import ProjectCard from "@/components/ui/ProjectCard";

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {};
  }

  const t = await getTranslations({
    locale,
    namespace: "projectsData",
  });

  const title = t(`${slug}.title`);
  const description = t(`${slug}.description`);

  return {
    title: `${title} | Mohammadmehdi Fard`,
    description,
  };
}

export default async function ProjectPage({ params }) {
  const { locale, slug } = await params;

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const t = await getTranslations("projectsData");

  const tProjects = await getTranslations("projects");

  let relatedProjects = projects.filter(
    (item) => item.category === project.category && item.id !== project.id,
  );

  if (relatedProjects.length === 0) {
    relatedProjects = projects
      .filter((item) => item.id !== project.id)
      .slice(0, 3);
  }

  const projectTitle = t(`${project.slug}.title`);

  return (
    <main className="min-h-screen">
      <div
        className="
          mx-auto
          max-w-7xl
          px-5
          py-24
          sm:px-6
          md:py-32
          lg:px-10
        "
      >
        <Breadcrumb
          items={[
            {
              label: tProjects("home"),
              href: `/${locale}`,
            },
            {
              label: tProjects("title"),
              href: `/${locale}/projects`,
            },
            {
              label: projectTitle,
            },
          ]}
        />

        <header className="mt-10 max-w-4xl">
          <span
            className="
              font-medium
              text-[var(--primary)]
            "
          >
            {tProjects(`categories.${project.category}`)}
          </span>

          <h1
            className="
              mt-4
              text-4xl
              font-bold
              tracking-tight
              text-[var(--text)]
              sm:text-5xl
              md:text-6xl
            "
          >
            {projectTitle}
          </h1>

          <div
            className="
              mt-5
              flex
              flex-wrap
              items-center
              gap-3
              text-sm
              text-[var(--muted)]
            "
          >
            <time dateTime={project.year}>{project.year}</time>

            <span aria-hidden="true">•</span>

            <span>{tProjects(`status.${project.status}`)}</span>
          </div>

          <p
            className="
              mt-7
              max-w-3xl
              text-base
              leading-8
              text-justify
              text-[var(--muted)]
              sm:text-lg
            "
          >
            {t(`${project.slug}.fullDescription`)}
          </p>
        </header>

        <figure
          className="
            relative
            mt-12
            aspect-[16/10]
            w-full
            overflow-hidden
            rounded-3xl
            border
            border-[var(--border)]
            bg-[var(--card)]
          "
        >
          <Image
            src={project.image || "/projects/placeholder.webp"}
            alt={projectTitle}
            fill
            priority
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1280px) 90vw,
              1200px
            "
            className="object-cover"
          />
        </figure>

        <section aria-labelledby="project-technologies" className="mt-10">
          <h2
            id="project-technologies"
            className="
              text-xl
              font-bold
              text-[var(--text)]
            "
          >
            {tProjects("technologies")}
          </h2>

          <div
            className="
              mt-5
              flex
              flex-wrap
              gap-2.5
            "
          >
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="
                    rounded-full
                    border
                    border-[var(--primary)]
                    bg-[var(--primary)]
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-white
                    transition-opacity
                    hover:opacity-90
                  "
              >
                {technology}
              </span>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="project-features"
          className="
            mt-12
            border-b
            border-[var(--border)]
            pb-10
          "
        >
          <h2
            id="project-features"
            className="
              text-2xl
              font-bold
              text-[var(--text)]
            "
          >
            {tProjects("features")}
          </h2>

          <ul className="mt-6 space-y-3">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="
                  flex
                  items-start
                  gap-3
                  leading-7
                  text-[var(--muted)]
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    mt-2
                    h-1.5
                    w-1.5
                    shrink-0
                    rounded-full
                    bg-[var(--primary)]
                  "
                />

                <span>{t(`features.${feature}`)}</span>
              </li>
            ))}
          </ul>
        </section>

        {(project.github || project.demo) && (
          <div
            className="
              mt-10
              flex
              flex-wrap
              gap-3
            "
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${projectTitle} GitHub repository`}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-[var(--primary)]
                  bg-transparent
                  px-5
                  py-3
                  font-medium
                  text-[var(--primary)]
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-[var(--primary)]
                  hover:text-white
                "
              >
                <FaGithub size={18} aria-hidden="true" />

                <span>{tProjects("github")}</span>
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${projectTitle} ${tProjects("liveDemo")}`}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-[var(--primary)]
                  px-5
                  py-3
                  font-medium
                  text-white
                  transition-all
                  hover:-translate-y-0.5
                  hover:opacity-90
                "
              >
                <FaExternalLinkAlt size={15} aria-hidden="true" />

                <span>{tProjects("liveDemo")}</span>
              </a>
            )}
          </div>
        )}

        {relatedProjects.length > 0 && (
          <section aria-labelledby="related-projects" className="mt-24">
            <h2
              id="related-projects"
              className="
                text-3xl
                font-bold
                text-[var(--text)]
              "
            >
              {tProjects("relatedProjects")}
            </h2>

            <div
              className="
                mt-8
                grid
                gap-6
                md:grid-cols-2
                lg:grid-cols-3
              "
            >
              {relatedProjects.map((item) => (
                <ProjectCard key={item.id} project={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
