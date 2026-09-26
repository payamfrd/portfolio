"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const LOCALE_COOKIE = "portfolio-locale";
const LOCALE_STORAGE_KEY = "portfolio-locale";

const SUPPORTED_LOCALES = ["fa", "en"];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");

  const isFa = pathname.startsWith("/fa");
  const currentLocale = isFa ? "fa" : "en";
  const targetLocale = isFa ? "en" : "fa";

  const switchLanguage = () => {
    if (!SUPPORTED_LOCALES.includes(targetLocale)) {
      return;
    }

    try {
      const cookieParts = [
        `${LOCALE_COOKIE}=${targetLocale}`,
        "Path=/",
        "Max-Age=31536000",
        "SameSite=Lax",
      ];

      if (window.location.protocol === "https:") {
        cookieParts.push("Secure");
      }

      document.cookie = cookieParts.join("; ");

      localStorage.setItem(LOCALE_STORAGE_KEY, targetLocale);
    } catch {
      // Storage can be unavailable in restricted browser environments.
    }

    const pathWithoutLocale = pathname.replace(/^\/(fa|en)(?=\/|$)/, "");

    const nextPath =
      pathWithoutLocale === ""
        ? `/${targetLocale}`
        : `/${targetLocale}${pathWithoutLocale}`;

    const queryString = window.location.search;
    const hash = window.location.hash;

    const nextUrl = `${nextPath}${queryString}${hash}`;

    /*
     * replace() is intentional.
     *
     * Changing the language must not create a new browser-history entry.
     * Therefore the Back button will not return only to the previous locale.
     */
    router.replace(nextUrl, {
      scroll: false,
    });
  };

  return (
    <button
      type="button"
      onClick={switchLanguage}
      aria-label={currentLocale === "fa" ? t("english") : t("persian")}
      title={currentLocale === "fa" ? t("english") : t("persian")}
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
      {currentLocale === "fa" ? "EN" : "فا"}
    </button>
  );
}
