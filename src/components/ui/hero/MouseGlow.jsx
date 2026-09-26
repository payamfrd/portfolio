"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { useEffect, useState } from "react";

const DEFAULT_DIAMETER = 280;

function getGlowDiameter(width) {
  if (width > 1600) return 420;
  if (width > 1200) return 360;

  return 280;
}

function getGlowSize(width) {
  if (width > 1600) return 500;
  if (width > 1200) return 420;

  return 320;
}

export default function MouseGlow({ containerRef }) {
  const [glowDiameter, setGlowDiameter] = useState(DEFAULT_DIAMETER);

  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const x = useSpring(mouseX, {
    stiffness: 45,
    damping: 20,
    mass: 1,
  });

  const y = useSpring(mouseY, {
    stiffness: 45,
    damping: 20,
    mass: 1,
  });

  const accentX = useTransform(x, (value) => value + 20);

  const accentY = useTransform(y, (value) => value + 20);

  useEffect(() => {
    setMounted(true);

    if (window.innerWidth < 768) {
      return;
    }

    const container = containerRef?.current;

    if (!container) {
      return;
    }

    let glowSize = getGlowSize(window.innerWidth);

    const updateDimensions = () => {
      const width = window.innerWidth;

      glowSize = getGlowSize(width);

      setGlowDiameter(getGlowDiameter(width));
    };

    const handlePointerMove = (event) => {
      const rect = container.getBoundingClientRect();

      mouseX.set(event.clientX - rect.left - glowSize / 2);

      mouseY.set(event.clientY - rect.top - glowSize / 2);
    };

    const handleMouseLeave = () => {
      const rect = container.getBoundingClientRect();

      mouseX.set(rect.width / 2 - glowSize / 2);

      mouseY.set(rect.height / 2 - glowSize / 2);
    };

    const handleResize = () => {
      updateDimensions();
    };

    updateDimensions();

    container.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    container.addEventListener("mouseleave", handleMouseLeave, {
      passive: true,
    });

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);

      container.removeEventListener("mouseleave", handleMouseLeave);

      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef, mouseX, mouseY]);

  const glowStyle = {
    x,
    y,
    width: glowDiameter,
    height: glowDiameter,
    willChange: mounted ? "transform" : "auto",
  };

  const accentGlowStyle = {
    x: accentX,
    y: accentY,
    width: glowDiameter,
    height: glowDiameter,
    willChange: mounted ? "transform" : "auto",
  };

  return (
    <div
      dir="ltr"
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        overflow-hidden
      "
    >
      <motion.div
        initial={false}
        style={glowStyle}
        className="
          absolute
          rounded-full
          bg-[var(--primary)]
          opacity-[0.08]
          blur-[90px]
          mix-blend-screen
        "
      />

      <motion.div
        initial={false}
        style={accentGlowStyle}
        className="
          absolute
          rounded-full
          bg-[var(--accent)]
          opacity-[0.10]
          blur-[70px]
          mix-blend-screen
        "
      />
    </div>
  );
}
