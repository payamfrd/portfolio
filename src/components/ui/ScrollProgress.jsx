"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY;

      const height = document.documentElement.scrollHeight - window.innerHeight;

      const progress = (scrollTop / height) * 100;

      setProgress(progress);
    };

    window.addEventListener("scroll", calculateProgress);

    calculateProgress();

    return () => window.removeEventListener("scroll", calculateProgress);
  }, []);

  return (
    <div
      className=" fixed top-0 left-0 z-[100] h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-[width] duration-100 "
      style={{
        width: `${progress}%`,
      }}
    />
  );
}
