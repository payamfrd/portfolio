"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import { experiences } from "@/data/experience/experience";

export default function Experience() {
  const t = useTranslations("experience");
  const { locale } = useParams();

  const currentLocale = locale === "fa" ? "fa" : "en";

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="py-24 md:py-32 section-divider scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="block font-medium text-[var(--primary)]">
            {t("label")}
          </span>

          <h2
            id="experience-title"
            className="mt-4 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl"
          >
            {t("title")}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          {/* Timeline Line */}
          <div
            aria-hidden="true"
            className="absolute bottom-2 start-4 top-2 w-px bg-[var(--border)]"
          />

          <div className="space-y-10">
            {experiences.map((item) => (
              <article key={item.id} className="relative ps-12 sm:ps-16">
                {/* Timeline Point */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    start-0
                    top-1
                    h-8
                    w-8
                    rounded-full
                    border-4
                    border-[var(--bg)]
                    bg-[var(--primary)]
                    shadow-[0_0_0_4px_var(--card)]
                  "
                />

                {/* Experience Card */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-[var(--border)]
                    bg-[var(--card)]
                    p-5
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[var(--accent)]
                    hover:shadow-xl
                    sm:p-6
                    md:p-7
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      gap-3
                      md:flex-row
                      md:items-start
                      md:justify-between
                    "
                  >
                    <div className="min-w-0">
                      <h3
                        className="
                          break-words
                          text-xl
                          font-bold
                          text-[var(--text)]
                          sm:text-2xl
                        "
                      >
                        {item.company[currentLocale]}
                      </h3>

                      <p
                        className="
                          mt-2
                          font-semibold
                          text-[var(--primary)]
                        "
                      >
                        {item.role[currentLocale]}
                      </p>
                    </div>

                    <time
                      dateTime={item.dateTime}
                      className="
                        inline-flex
                        w-fit
                        shrink-0
                        rounded-full
                        border
                        border-[var(--border)]
                        bg-[var(--bg)]
                        px-3
                        py-1
                        text-sm
                        text-[var(--muted)]
                      "
                    >
                      {item.period[currentLocale]}
                    </time>
                  </div>

                  <p
                    className="
                      mt-5
                      text-justify
                      text-sm
                      leading-7
                      text-[var(--muted)]
                      sm:text-base
                      sm:leading-8
                    "
                  >
                    {item.description[currentLocale]}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
