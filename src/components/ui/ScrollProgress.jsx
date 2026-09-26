"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  const params = useParams();
  const locale = params?.locale || "en";

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;

      if (height <= 0) {
        setProgress(0);
        return;
      }

      setProgress((scrollTop / height) * 100);
    };

    window.addEventListener("scroll", calculateProgress, {
      passive: true,
    });

    calculateProgress();

    return () => window.removeEventListener("scroll", calculateProgress);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`
        fixed
        top-0
        z-[100]
        h-1
        bg-gradient-to-r
        from-[var(--primary)]
        to-[var(--accent)]
        transition-[width]
        duration-100
        ${locale === "fa" ? "right-0" : "left-0"}
      `}
      style={{
        width: `${progress}%`,
      }}
    />
  );
}
