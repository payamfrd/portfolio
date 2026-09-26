"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = [
  "about",
  "experience",
  "skills",
  "projects",
  "certificates",
];

export default function useActiveSection() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    let frameId = null;

    const updateActiveSection = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = null;

        const marker = window.innerHeight * 0.35;

        const reachedBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 80;

        if (reachedBottom) {
          setActiveSection(SECTION_IDS[SECTION_IDS.length - 1]);
          return;
        }

        let currentSection = SECTION_IDS[0];

        for (const id of SECTION_IDS) {
          const element = document.getElementById(id);

          if (!element) continue;

          const { top } = element.getBoundingClientRect();

          if (top <= marker) {
            currentSection = id;
          }
        }

        setActiveSection(currentSection);
      });
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return activeSection;
}
