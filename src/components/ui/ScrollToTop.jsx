"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const { locale = "en" } = useParams();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed
        bottom-6
       ${locale === "fa" ? "left-6" : "right-6"}
        z-50

        p-3
        rounded-2xl

        bg-[var(--primary)]
        text-white

        shadow-lg

        transition-all
        duration-300

        hover:scale-110

        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }
      `}
    >
      <ChevronUp size={20} />
    </button>
  );
}
