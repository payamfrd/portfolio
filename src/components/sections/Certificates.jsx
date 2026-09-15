"use client";

import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { FaAward, FaChevronDown } from "react-icons/fa";

import certificates from "@/data/certificates/certificates";

import CertificateCard from "../ui/certificates/CertificateCard";
import CertificatesFilter from "../elements/CertificatesFilter";

const CertificateModal = dynamic(
  () => import("../ui/certificates/CertificateModal"),
  {
    ssr: false,
  },
);

const FEATURED_LIMIT = 6;

export default function Certificates() {
  const t = useTranslations("certificates");

  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filteredCertificates = useMemo(() => {
    if (activeCategory === "all") {
      return certificates;
    }

    return certificates.filter(
      (certificate) => certificate.category === activeCategory,
    );
  }, [activeCategory]);

  const featuredCertificates = useMemo(
    () => filteredCertificates.filter((certificate) => certificate.featured),
    [filteredCertificates],
  );

  const regularCertificates = useMemo(
    () => filteredCertificates.filter((certificate) => !certificate.featured),
    [filteredCertificates],
  );

  /**
   * Initial view:
   * 1. Show featured certificates first.
   * 2. If fewer than FEATURED_LIMIT featured items exist,
   *    fill the remaining slots with regular certificates.
   */
  const initialCertificates = useMemo(() => {
    const featured = featuredCertificates.slice(0, FEATURED_LIMIT);

    const remainingSlots = Math.max(
      0,
      FEATURED_LIMIT - featured.length,
    );

    const regular = regularCertificates.slice(0, remainingSlots);

    return [...featured, ...regular];
  }, [featuredCertificates, regularCertificates]);

  const visibleCertificates = showAll
    ? filteredCertificates
    : initialCertificates;

  const hasMoreCertificates =
    filteredCertificates.length > visibleCertificates.length;

  const categoryCounts = useMemo(() => {
    const counts = {
      all: certificates.length,
      frontend: 0,
      network: 0,
      other: 0,
    };

    certificates.forEach(({ category }) => {
      if (category in counts && category !== "all") {
        counts[category] += 1;
      }
    });

    return counts;
  }, []);

  const getCategoryCount = useCallback(
    (category) => categoryCounts[category] ?? 0,
    [categoryCounts],
  );

  const handleClose = useCallback(() => {
    setSelectedCertificate(null);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
    setShowAll(false);
  }, []);

  const handleShowMore = useCallback(() => {
    setShowAll(true);
  }, []);

  const handleShowLess = useCallback(() => {
    setShowAll(false);

    window.requestAnimationFrame(() => {
      document.getElementById("certificates-title")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, []);

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-title"
      className="section-divider scroll-mt-24 py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* Header */}
        <header className="text-center">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)]">
            <FaAward aria-hidden="true" />
            {t("subtitle")}
          </span>

          <h2
            id="certificates-title"
            className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            {t("title")}
          </h2>
        </header>

        {/* Filters */}
        <CertificatesFilter
          activeCategory={activeCategory}
          setActiveCategory={handleCategoryChange}
          t={t}
          getCategoryCount={getCategoryCount}
        />

        {/* Filtered count */}
        <div
          className="mt-8 flex items-center justify-center gap-2 text-sm text-[var(--muted)]"
          role="status"
          aria-live="polite"
        >
          <FaAward
            className="text-[var(--accent)]"
            aria-hidden="true"
          />

          <span>
            {t("earned", {
              count: filteredCertificates.length,
            })}
          </span>
        </div>

        {/* Certificates */}
        {filteredCertificates.length > 0 ? (
          <>
            <div
              id="certificates-grid"
              className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8"
            >
              {visibleCertificates.map((certificate, index) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  index={index}
                  onOpen={setSelectedCertificate}
                />
              ))}
            </div>

            {/* Show More */}
            {hasMoreCertificates && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={handleShowMore}
                  aria-controls="certificates-grid"
                  aria-expanded={showAll}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 py-3 font-medium text-[var(--text)] shadow-sm transition-all duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
                >
                  {t("showMore")}

                  <FaChevronDown
                    className="text-sm"
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}

            {/* Show Less */}
            {showAll && filteredCertificates.length > FEATURED_LIMIT && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={handleShowLess}
                  aria-controls="certificates-grid"
                  aria-expanded={showAll}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 py-3 font-medium text-[var(--text)] transition-all duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
                >
                  {t("showLess")}
                </button>
              </div>
            )}
          </>
        ) : (
          <div
            className="mx-auto mt-12 flex max-w-md flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center"
            role="status"
          >
            <FaAward
              className="mb-4 text-3xl text-[var(--muted)]"
              aria-hidden="true"
            />

            <p className="text-[var(--muted)]">
              {t("noCertificatesFound")}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={handleClose}
      />
    </section>
  );
}