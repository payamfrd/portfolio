"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function CTA() {
  const t = useTranslations("cta");
  const params = useParams();

  const locale = params?.locale === "fa" ? "fa" : "en";

  return (
    <section
      className="scroll-mt-24 py-24 md:py-32"
      aria-labelledby="cta-title"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden">
          {/* Decorative Glow */}
          <div
            className="
              pointer-events-none
              absolute
              -inset-8
              rounded-full
              bg-[var(--primary)]/10
              blur-3xl
              dark:bg-[var(--accent)]/10
            "
            aria-hidden="true"
          />

          {/* CTA Card */}
          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-[var(--border)]
              bg-[var(--card)]
              p-8
              text-center
              transition-all
              duration-300
              hover:border-[var(--accent)]
              sm:p-10
              md:p-12
            "
          >
            <h2
              id="cta-title"
              className="
                text-3xl
                font-bold
                tracking-tight
                text-[var(--text)]
                sm:text-4xl
                md:text-5xl
              "
            >
              {t("title")}
            </h2>

            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                leading-8
                text-[var(--muted)]
              "
            >
              {t("description")}
            </p>

            <div
              className="
                mt-10
                flex
                flex-col
                items-stretch
                justify-center
                gap-4
                sm:flex-row
                sm:items-center
              "
            >
              {/* Contact */}
              <Link
                href={`/${locale}/contact`}
                className="
                  inline-flex
                  min-h-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--primary)]
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[var(--accent)]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--primary)]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[var(--card)]
                "
              >
                {t("contact")}
              </Link>

              {/* WhatsApp */}
              <a
                href="https://wa.me/989301801747"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  min-h-12
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[var(--border)]
                  bg-[var(--bg)]
                  px-6
                  py-3
                  font-semibold
                  text-[var(--text)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-green-500
                  hover:bg-green-500
                  hover:text-white
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-green-500
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[var(--card)]
                "
              >
                {t("whatsapp")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
