"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function ThemeToggle() {
  const t = useTranslations("theme");

  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? t("light") : t("dark")}
      title={isDark ? t("light") : t("dark")}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
      p-2
      rounded-xl
      border
      border-[var(--border)]
      bg-[var(--card)]
      hover:border-[var(--accent)]
      transition
      focus:outline-none
      focus:ring-2
      focus:ring-[var(--primary)]
      focus:ring-offset-2
      "
    >
      {isDark ? (
        <Sun
          size={18}
          className="text-[var(--accent)] transition-transform duration-300"
        />
      ) : (
        <Moon
          size={18}
          className="text-[var(--primary)] transition-transform duration-300"
        />
      )}
    </button>
  );
}
