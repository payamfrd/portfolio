"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Error({ error, reset }) {
  const t = useTranslations("errorPage");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <span className="text-[var(--accent)] font-semibold">{t("label")}</span>

        <h1 className="mt-4 text-5xl md:text-7xl font-bold leading-tight">
          {t("title")}
        </h1>

        <p className="mt-6 text-[var(--muted)]">{t("description")}</p>

        <button
          onClick={() => reset()}
          className="
mt-8
px-6
py-3
rounded-xl
bg-[var(--primary)]
text-white
hover:opacity-90
hover:-translate-y-0.5
transition
"
        >
          {t("retry")}
        </button>
        <Link
          href="/"
          className="
    mt-4
    block
    text-[var(--primary)]
    hover:underline
  "
        >
          {t("home")}
        </Link>
      </div>
    </main>
  );
}
