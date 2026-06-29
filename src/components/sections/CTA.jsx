"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CTA() {
  const t = useTranslations("cta");
  const params = useParams();
  const locale = params.locale;

  return (
    <section className="py-32">
      <div className=" relative max-w-5xl mx-auto px-6">
        <div className=" absolute -inset-8 rounded-full bg-[var(--primary)]/10 dark:bg-[var(--accent)]/10 blur-3xl " />

        <div
          className="
          relative
            rounded-3xl
            border
            border-[var(--border)]
            bg-[var(--card)]
            p-8 md:p-12
            text-center
            hover:border-[var(--accent)]
            transition-all duration-300
          "
        >
          <h2
            className="
              text-4xl
              md:text-5xl
              font-bold
            "
          >
            {t("title")}
          </h2>

          <p
            className="
              mt-6
              text-[var(--muted)]
              max-w-2xl
              mx-auto
            "
          >
            {t("description")}
          </p>

          <div
            className="
              mt-10
              flex
              flex-col
              sm:flex-row
              justify-center
              gap-4
            "
          >
            <Link
              href={`/${locale}/contact`}
              aria-label={t("contact")}
              className="
                px-6
                py-3
                rounded-xl
                bg-[var(--primary)]
text-[var(--text)]
hover:opacity-90
                transition-all duration-300
hover:-translate-y-1
              "
            >
              {t("contact")}
            </Link>
            <a
              href="https://wa.me/989301801747"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("whatsapp")}
              className="
    px-6
    py-3
    rounded-xl
    bg-green-600
    text-white
    hover:opacity-90
    transition-all duration-300
hover:-translate-y-1
  "
            >
              {t("whatsapp")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
