"use client";

import { motion } from "framer-motion";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import ResumeButton from "../elements/ResumeButton";

import HeroCodeWindow from "../ui/hero/HeroCodeWindow";
import MouseGlow from "../ui/hero/MouseGlow";
import HeroAurora from "../ui/hero/HeroAurora";
import HeroParticles from "../ui/hero/HeroParticles";
import HeroOrbit from "../ui/hero/HeroOrbit";

import { FaReact, FaNetworkWired, FaJsSquare } from "react-icons/fa";
import { DiCisco } from "react-icons/di";
import { RiNextjsFill } from "react-icons/ri";
import { CctvIcon } from "lucide-react";

export default function Hero() {
  const heroRef = useRef(null);

  const t = useTranslations("hero");

  const { locale } = useParams();

  return (
    <section
      ref={heroRef}
      aria-labelledby="hero-title"
      className="section-divider pt-32 pb-24 relative min-h-screen flex items-center justify-center scroll-mt-24 overflow-x-clip"
    >
      <HeroAurora />
      <HeroParticles />
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className=" absolute inset-0 opacity-[0.10] bg-[radial-gradient(circle,var(--text)_1px,transparent_1px)] [background-size:24px_24px] " />
        {/* <div className="absolute top-36 lg:top-24 left-1/2 -translate-x-1/2 w-[280px] h-[280px] md:w-[500px] md:h-[500px] rounded-full blur-3xl bg-[var(--primary)]/5" /> */}

        {/* <div className="absolute top-64 lg:top-auto lg:bottom-20 lg:right-20 w-[280px] h-[280px] rounded-full blur-3xl bg-[var(--accent)]/5" /> */}

        <div className="hidden lg:block absolute top-5 w-[520px] h-[520px] left-1/2 -translate-x-1/2 rounded-full border border-[var(--primary)]/15 " />
        <div className="hidden lg:block absolute top-8 w-[480px] h-[480px] left-1/2 -translate-x-1/2 rounded-full border border-[var(--accent)]/22 " />
        <div className="hidden lg:block absolute top-10 w-[360px] h-[360px] left-1/2 -translate-x-1/2 rounded-full border border-[var(--muted)]/10 " />
      </div>

      <MouseGlow containerRef={heroRef} />
      <div
        className={` relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-14 lg:gap-20 xl:gap-28

${
  locale === "fa"
    ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
    : ""
}
`}
      >
        <div
          className={`lg:max-w-xl md:max-w-4xl text-center ${locale === "fa" ? " lg:text-right" : " lg:text-left"}`}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={` inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm text-[var(--primary)]
              ${locale === "fa" ? "mx-auto lg:mr-0" : "mx-auto lg:ml-0"}`}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />

            {t("available")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-[var(--text)]"
          >
            {t("name")}{" "}
            <span className="text-[var(--accent)]">{t("lastName")}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className=" mt-4 text-xl md:text-3xl font-semibold text-[var(--primary)]"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className={`text-justify mt-8 max-w-2xl text-base sm:text-lg lg:text-xl leading-7 md:leading-8 text-[var(--muted)] ${locale === "fa" ? "mx-auto lg:mr-0" : "mx-auto lg:ml-0"}`}
          >
            {t("subtitle")}
          </motion.p>

          <div dir="ltr">
            <ul
              aria-label={t("skill")}
              className={` mt-8 flex flex-wrap gap-3 justify-center
${locale === "fa" ? "lg:justify-end" : "lg:justify-start"}`}
            >
              <li className="flex justify-center items-center gap-2 h-11 min-w-fit px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition hover:-translate-y-1 hover:shadow-lg">
                <FaJsSquare className="text-yellow-400" aria-hidden="true" />{" "}
                {t("javascript")}
              </li>

              <li className="flex justify-center items-center gap-2 h-11 min-w-fit px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition hover:-translate-y-1 hover:shadow-lg">
                <FaReact className="text-sky-400" aria-hidden="true" />{" "}
                {t("react")}
              </li>

              <li className="flex justify-center items-center gap-2 h-11 min-w-fit px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition hover:-translate-y-1 hover:shadow-lg">
                <RiNextjsFill className="text-gray-400" aria-hidden="true" />{" "}
                {t("nextjs")}
              </li>

              <li className="flex justify-center items-center gap-2 h-11 min-w-fit px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition hover:-translate-y-1 hover:shadow-lg">
                <FaNetworkWired
                  className="text-[var(--primary)]"
                  aria-hidden="true"
                />{" "}
                {t("itNetwork")}
              </li>

              <li className="flex justify-center items-center gap-2 h-11 min-w-fit px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition hover:-translate-y-1 hover:shadow-lg">
                <DiCisco
                  size={30}
                  className="text-[var(--text)]"
                  aria-hidden="true"
                />{" "}
                {t("ccna")}
              </li>

              <li className="flex justify-center items-center gap-2 h-11 min-w-fit px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition hover:-translate-y-1 hover:shadow-lg">
                <CctvIcon className="text-[var(--accent)]" aria-hidden="true" />{" "}
                {t("cctv")}
              </li>
            </ul>
          </div>

          <div
            className="relative
    z-10
    mt-10
    flex
    flex-col
    items-stretch
    justify-center
    gap-4
    sm:flex-row
    sm:items-center
    lg:justify-start"
          >
            <a
              href={`/${locale}/contact`}
              aria-label="Hire Me"
              className="w-full h-12 sm:w-auto px-6 py-3 rounded-xl bg-[var(--accent)] hover:opacity-90 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-95"
            >
              {t("hireMe")}
            </a>

            <a
              href={`/${locale}#projects`}
              aria-label="Projects"
              className="w-full h-12 sm:w-auto px-6 py-3 rounded-xl bg-[var(--primary)] hover:opacity-90 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-95"
            >
              {t("projects")}
            </a>

            <ResumeButton />
          </div>
        </div>

        {/* Right Side */}
        <div className=" relative flex w-full min-h-[360px] items-center justify-center sm:min-h-[450px] lg:min-h-[620px] ">
          <HeroOrbit />

          <HeroCodeWindow />
        </div>
      </div>
    </section>
  );
}
