"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const params = useParams();
  const locale = params?.locale || "en";

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handler, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      aria-label={locale === "fa" ? "بازگشت به بالا" : "Scroll to top"}
      className={`
        fixed
        bottom-6
        ${locale === "fa" ? "left-6" : "right-6"}
        z-50
        rounded-2xl
        bg-[var(--primary)]
        p-3
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:scale-110

        ${
          visible
            ? "opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 translate-y-4"
        }
      `}
    >
      <ChevronUp size={20} />
    </button>
  );
}
