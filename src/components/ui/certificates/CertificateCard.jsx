"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";

import { FaAward, FaCalendarAlt, FaExternalLinkAlt } from "react-icons/fa";

export default function CertificateCard({ certificate, onOpen, index }) {
  const tData = useTranslations("certificatesData");
  const t = useTranslations("certificates");
  const shouldReduceMotion = useReducedMotion();

  const title = tData(`${certificate.slug}.title`);
  const issuer = tData(`${certificate.slug}.issuer`);
  const year = tData(`${certificate.slug}.year`);

  const hasImage = Boolean(certificate.image);

  const hasVerifyUrl =
    Boolean(certificate.verifyUrl) && certificate.verifyUrl !== "#";

  const handleOpen = () => {
    onOpen(certificate);
  };

  return (
    <motion.article
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 24,
            }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.45,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.05, 0.25),
      }}
      className="group h-full rounded-3xl border border-[var(--border)] bg-[var(--card)] p-3 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_0_25px_rgba(249,115,22,0.12)]"
    >
      {/* Main Card Action */}
      <button
        type="button"
        onClick={handleOpen}
        aria-haspopup="dialog"
        aria-label={`${title} - ${t("open")}`}
        className="block w-full cursor-pointer rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
      >
        {/* Image / Placeholder */}
        <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-[var(--bg)]">
          {hasImage ? (
            <Image
              src={certificate.image}
              alt={title}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              className="rounded-2xl object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div
              className="flex h-full items-center justify-center text-[var(--muted)]"
              aria-hidden="true"
            >
              <FaAward className="fill-[var(--accent)] text-8xl" />
            </div>
          )}

          {/* Featured Badge */}
          {certificate.featured && (
            <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-[var(--primary)] px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
              <FaAward aria-hidden="true" />
              {t("featured")}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col items-start p-4 sm:p-5">
          <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-7">
            {title}
          </h3>

          <div className="mt-4 flex flex-col gap-2 text-sm text-[var(--muted)]">
            {/* Issuer */}
            <span className="flex items-start gap-2">
              <FaAward
                className="mt-0.5 shrink-0 text-[var(--primary)]"
                aria-hidden="true"
              />

              <span className="line-clamp-2 break-words">{issuer}</span>
            </span>

            {/* Year */}
            <span className="inline-flex items-center gap-2">
              <FaCalendarAlt
                className="shrink-0 text-[var(--accent)]"
                aria-hidden="true"
              />

              <span>{year}</span>
            </span>
          </div>
        </div>
      </button>

      {/* Verification Link */}
      {hasVerifyUrl && (
        <div className="px-4 pb-4 sm:px-5 sm:pb-5">
          <a
            href={certificate.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--primary)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card)]"
          >
            <FaExternalLinkAlt className="text-xs" aria-hidden="true" />

            {t("verify")}
          </a>
        </div>
      )}
    </motion.article>
  );
}
