"use client";

import skills from "@/data/skills";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Skills() {
  const t = useTranslations("skills");
  return (
    <section className=" py-32 section-divider">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <span className="text-[var(--primary)] font-medium">
            {t("title")}
          </span>

          <h2
            className="
              mt-4
              text-4xl
              md:text-5xl
              font-bold
            "
          >
            {t("description")}
          </h2>
        </div>

        <div
          className="
            mt-16
            grid
            md:grid-cols-3
            gap-8
          "
        >
          {skills.map((group, index) => (
            <motion.div
              key={group.category}
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
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.25,
              }}
              className=" rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent)] hover:shadow-lg
hover:shadow-orange-500/10"
            >
              <h3 className=" text-2xl font-bold mb-6 text-[var(--primary)]">
                {group.category}
              </h3>

              <div className=" flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className=" px-4 py-2 rounded-full bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
