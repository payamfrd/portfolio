"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function ThemeToggle() {
  const t = useTranslations("theme");
  const { resolvedTheme, setTheme } = useTheme();

  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
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
      "
    >
      {isDark ? (
        <Sun
          size={18}
          className="
            text-[var(--accent)]
            transition-all
    duration-300
    rotate-0
            
          "
        />
      ) : (
        <Moon
          size={18}
          className="
            text-[var(--primary)]
             transition-all
    duration-300
            
          "
        />
      )}
    </button>
  );
}
