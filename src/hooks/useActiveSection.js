"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = [
  "about",
  "experience",
  "skills",
  "projects",
  "certificates",
];

const BOTTOM_OFFSET = 80;

export default function useActiveSection() {
  const [activeSection, setActiveSection] = useState(SECTION_IDS[0]);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter(Boolean);

    if (sections.length === 0) {
      return undefined;
    }

    let frameId = null;

    const updateFromScrollPosition = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = null;

        const reachedBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - BOTTOM_OFFSET;

        if (reachedBottom) {
          const lastSection = sections[sections.length - 1];

          if (lastSection?.id) {
            setActiveSection(lastSection.id);
          }

          return;
        }

        const marker = window.innerHeight * 0.35;

        let currentSection = sections[0];

        for (const section of sections) {
          const { top } = section.getBoundingClientRect();

          if (top <= marker) {
            currentSection = section;
          }
        }

        if (currentSection?.id) {
          setActiveSection(currentSection.id);
        }
      });
    };

    /*
     * IntersectionObserver improves section detection while
     * the user is moving through the page.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );

        const closestSection = visibleSections[0];

        if (closestSection?.target?.id) {
          setActiveSection(closestSection.target.id);
        }

        updateFromScrollPosition();
      },
      {
        root: null,
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    updateFromScrollPosition();

    window.addEventListener("scroll", updateFromScrollPosition, {
      passive: true,
    });

    window.addEventListener("resize", updateFromScrollPosition);

    return () => {
      observer.disconnect();

      window.removeEventListener("scroll", updateFromScrollPosition);

      window.removeEventListener("resize", updateFromScrollPosition);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return activeSection;
}
