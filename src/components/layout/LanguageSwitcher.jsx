"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const t = useTranslations("language");

  const isFa = pathname.startsWith("/fa");

  const switchTo = isFa
    ? pathname.replace("/fa", "/en")
    : pathname.replace("/en", "/fa");

  return (
    <Link
      href={switchTo}
      aria-label={isFa ? t("english") : t("persian")}
      title={isFa ? t("english") : t("persian")}
      className="
        px-2.5
        py-1.5
        rounded-xl
        border
        border-[var(--border)]
        bg-[var(--card)]
        hover:border-[var(--accent)]
        hover:text-[var(--primary)]
        transition
      "
    >
      {isFa ? "EN" : "فا"}
    </Link>
  );
}
