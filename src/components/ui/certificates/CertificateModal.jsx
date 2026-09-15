"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useTranslations } from "next-intl";

import {
  FaAward,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaTimes,
} from "react-icons/fa";

export default function CertificateModal({ certificate, onClose }) {
  const t = useTranslations("certificates");
  const tData = useTranslations("certificatesData");

  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!certificate) {
      return undefined;
    }

    previousActiveElementRef.current = document.activeElement;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const focusableSelector = [
      "button:not([disabled])",
      "a[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ].join(",");

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const modal = modalRef.current;

      if (!modal) {
        return;
      }

      const focusableElements = modal.querySelectorAll(focusableSelector);

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const animationFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = previousOverflow;

      const previousElement = previousActiveElementRef.current;

      if (previousElement && typeof previousElement.focus === "function") {
        previousElement.focus();
      }
    };
  }, [certificate, onClose]);

  const hasVerifyUrl =
    Boolean(certificate?.verifyUrl) && certificate.verifyUrl !== "#";

  const title = certificate ? tData(`${certificate.slug}.title`) : "";

  const description = certificate
    ? tData(`${certificate.slug}.description`)
    : "";

  const transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.25 };

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-3 backdrop-blur-md sm:p-6"
          onClick={onClose}
          aria-hidden="true"
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`certificate-title-${certificate.slug}`}
            aria-describedby={`certificate-description-${certificate.slug}`}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.96,
                    y: 20,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={
              shouldReduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 0,
                    scale: 0.96,
                    y: 20,
                  }
            }
            transition={transition}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[94vh] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl"
            aria-hidden="false"
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={t("close")}
              className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)]/90 text-[var(--text)] shadow-lg backdrop-blur transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card)]"
            >
              <FaTimes aria-hidden="true" />
            </button>

            {/* Certificate Image */}
            <div className="px-3 pt-3 sm:px-6 sm:pt-6">
              <div className="relative aspect-[16/11] max-h-[70vh] w-full overflow-hidden rounded-2xl bg-[var(--bg)]">
                {certificate.image ? (
                  <Image
                    src={certificate.image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 92vw, 1000px"
                    className="rounded-2xl object-contain p-2 sm:p-4"
                  />
                ) : (
                  <div
                    className="flex h-full items-center justify-center bg-[var(--bg)] text-[var(--muted)]"
                    aria-hidden="true"
                  >
                    <FaAward className="fill-[var(--accent)] text-5xl sm:text-8xl" />
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-8">
              <h2
                id={`certificate-title-${certificate.slug}`}
                className="pr-12 text-2xl font-bold sm:text-3xl"
              >
                {title}
              </h2>

              <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Issuer */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <dt className="mb-2 inline-flex items-center gap-2 text-sm text-[var(--muted)]">
                    <FaAward
                      className="text-[var(--primary)]"
                      aria-hidden="true"
                    />

                    {t("issuer")}
                  </dt>

                  <dd className="break-words font-medium">
                    {tData(`${certificate.slug}.issuer`)}
                  </dd>
                </div>

                {/* Year */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <dt className="mb-2 inline-flex items-center gap-2 text-sm text-[var(--muted)]">
                    <FaCalendarAlt
                      className="text-[var(--accent)]"
                      aria-hidden="true"
                    />

                    {t("year")}
                  </dt>

                  <dd className="font-medium">
                    {tData(`${certificate.slug}.year`)}
                  </dd>
                </div>
              </dl>

              {/* Description */}
              <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <p
                  id={`certificate-description-${certificate.slug}`}
                  className="leading-7 text-[var(--muted)]"
                >
                  {description}
                </p>
              </div>

              {/* Verification */}
              {hasVerifyUrl && (
                <a
                  href={certificate.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 font-medium text-white transition-colors hover:bg-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card)]"
                >
                  <FaExternalLinkAlt aria-hidden="true" />
                  {t("verify")}
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
