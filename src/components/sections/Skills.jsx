"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaCode, FaLaptopCode, FaNetworkWired, FaTools } from "react-icons/fa";

import skills from "@/data/skills";

const categoryIcons = {
  frontend: FaCode,
  network: FaNetworkWired,
  tools: FaTools,
  other: FaLaptopCode,
};

export default function Skills() {
  const t = useTranslations("skills");

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="py-24 md:py-32 section-divider scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Section Header */}
        <header className="mx-auto max-w-3xl text-center">
          <span className="block font-medium text-[var(--primary)]">
            {t("title")}
          </span>

          <h2
            id="skills-title"
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

        {/* Skills Grid */}
        <div
          className="
            mt-16
            grid
            gap-8
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          {skills.map((group, index) => {
            const Icon = categoryIcons[group.category];
            const isTools = group.category === "tools";

            return (
              <motion.article
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                }}
                className="
                  group
                  rounded-3xl
                  border
                  border-[var(--border)]
                  bg-[var(--card)]
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-[var(--accent)]
                  hover:shadow-xl
                  hover:shadow-orange-500/10
                  sm:p-7
                  md:p-8
                "
              >
                {/* Category Header */}
                <header>
                  <div className="flex items-center gap-3">
                    <span
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-[var(--border)]
                        bg-[var(--bg)]
                        text-[var(--primary)]
                        transition-all
                        duration-300
                        group-hover:border-[var(--accent)]
                        group-hover:text-[var(--accent)]
                      "
                    >
                      <Icon size={18} aria-hidden="true" />
                    </span>

                    <h3
                      className="
                        text-xl
                        font-bold
                        text-[var(--text)]
                      "
                    >
                      {t(group.category)}
                    </h3>
                  </div>

                  {/* Category Divider */}
                  <div
                    aria-hidden="true"
                    className="
                      mt-5
                      h-px
                      w-full
                      bg-[var(--border)]
                    "
                  />
                </header>

                {/* Tools */}
                {isTools ? (
                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {group.items.map((tool) => (
                      <span
                        key={tool}
                        className="
                          inline-flex
                          items-center
                          rounded-full
                          border
                          border-[var(--border)]
                          bg-[var(--bg)]
                          px-4
                          py-2
                          text-sm
                          font-medium
                          text-[var(--text)]
                          transition-all
                          duration-300
                          hover:-translate-y-0.5
                          hover:border-[var(--accent)]
                        "
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                ) : (
                  /* Technical Skills */
                  <div className="mt-7 space-y-6">
                    {group.items.map((skill) => (
                      <div key={skill.name}>
                        <div className="mb-2.5 flex items-center justify-between gap-4">
                          <span
                            className="
                              font-medium
                              text-[var(--text)]
                            "
                          >
                            {skill.name}
                          </span>

                          <span
                            aria-hidden="true"
                            className="
                              shrink-0
                              text-xs
                              font-medium
                              text-[var(--muted)]
                            "
                          >
                            {skill.level}%
                          </span>
                        </div>

                        <div
                          role="progressbar"
                          aria-label={`${skill.name} proficiency`}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={skill.level}
                          className="
                            h-2
                            w-full
                            overflow-hidden
                            rounded-full
                            bg-[var(--border)]
                          "
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${skill.level}%`,
                            }}
                            viewport={{
                              once: true,
                              amount: 0.5,
                            }}
                            transition={{
                              duration: 0.9,
                              delay: index * 0.08,
                              ease: "easeOut",
                            }}
                            className="
                              h-full
                              rounded-full
                              bg-gradient-to-r
                              from-[var(--primary)]
                              to-[var(--accent)]
                            "
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
