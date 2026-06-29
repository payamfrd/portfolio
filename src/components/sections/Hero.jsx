"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="section-divider relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl bg-[var(--primary)]/10" />

        <div className="absolute bottom-20 right-20 w-[300px] h-[300px] rounded-full blur-3xl bg-[var(--accent)]/10" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-[var(--primary)] mb-4"
        >
          {t("title")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          {t("name")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className=" mt-6 text-[var(--muted)] text-lg md:text-xl max-w-2xl mx-auto
"
        >
          {t("subtitle")}
        </motion.p>

        <div
          className="
    mt-4
    inline-flex
    items-center
    gap-2
    text-[var(--accent)]
  "
        >
          <span
            className="
      w-2
      h-2
      rounded-full
      bg-[var(--accent)]
    "
          />
          {t("available")}
        </div>

        <div
          className="
    mt-8
    flex
    justify-center
    gap-3
    flex-wrap
  "
        >
          <span className=" px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition">
            React
          </span>

          <span className=" px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition">
            Next.js
          </span>

          <span className=" px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition">
            JavaScript
          </span>

          <span className=" px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition">
            SEO
          </span>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl bg-[var(--primary)] hover:opacity-90 transition"
          >
            {t("projects")}
          </a>

          <a
            href="/Fard.Mohammadmehdi.pdf"
            download
            className="px-6 py-3 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] transition"
          >
            {t("downloadResume")}
          </a>
        </div>
      </div>
    </section>
  );
}
