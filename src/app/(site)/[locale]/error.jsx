"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Error({ error, reset }) {
  const t = useTranslations("errorPage");
  const params = useParams();

  const locale = params?.locale === "fa" ? "fa" : "en";

  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main
      className="flex min-h-screen items-center justify-center px-6 py-24"
      aria-labelledby="error-title"
    >
      <div className="w-full max-w-xl text-center">
        <span className="font-semibold text-[var(--accent)]" aria-hidden="true">
          {t("label")}
        </span>

        <h1
          id="error-title"
          className="mt-4 text-5xl font-bold leading-tight tracking-tight text-[var(--text)] md:text-7xl"
        >
          {t("title")}
        </h1>

        <p className="mt-6 leading-8 text-[var(--muted)]">{t("description")}</p>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => reset()}
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
              hover:-translate-y-0.5
              hover:opacity-90
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--primary)]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[var(--bg)]
            "
          >
            {t("retry")}
          </button>

          <Link
            href={`/${locale}`}
            className="
              inline-flex
              min-h-12
              items-center
              justify-center
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--card)]
              px-6
              py-3
              font-semibold
              text-[var(--text)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-[var(--accent)]
              hover:text-[var(--primary)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--primary)]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[var(--bg)]
            "
          >
            {t("home")}
          </Link>
        </div>
      </div>
    </main>
  );
}
