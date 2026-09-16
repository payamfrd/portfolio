import CategoryFiltersProjects from "@/components/elements/CategoryFiltersProjects";
import Breadcrumb from "@/components/ui/Breadcrumb";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const title =
    locale === "fa"
      ? "پروژه‌ها | محمدمهدی فرد"
      : "Projects | Mohammadmehdi Fard";

  const description =
    locale === "fa"
      ? "مجموعه پروژه‌های فرانت‌اند و توسعه وب محمدمهدی فرد."
      : "A collection of frontend and web development projects by Mohammadmehdi Fard.";

  return {
    title,
    description,
  };
}

export default async function ProjectsPage({ params }) {
  const { locale } = await params;

  const t = await getTranslations("projects");

  return (
    <main
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
            label: t("home"),
            href: `/${locale}`,
          },
          {
            label: t("title"),
          },
        ]}
      />

      <header className="mx-auto mt-10 max-w-3xl text-center">
        <span
          className="
            block
            font-medium
            text-[var(--primary)]
          "
        >
          {t("title")}
        </span>

        <h1
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
          {t("descProject")}
        </h1>

        <p
          className="
            mx-auto
            my-5
            max-w-2xl
            text-sm
            leading-7
            text-[var(--muted)]
            sm:text-base
          "
        >
          {t("allProjectsDescription")}
        </p>
      </header>

      <CategoryFiltersProjects />
    </main>
  );
}
