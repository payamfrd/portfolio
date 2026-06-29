"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // const { theme, setTheme } = useTheme();
  const { resolvedTheme, setTheme } = useTheme();

  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;

  return (
    <button
      // onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className=" p-2 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition "
    >
      {/* {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />} */}
      {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
