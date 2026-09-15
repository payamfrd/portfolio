"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function MouseGlow({ containerRef }) {
  const getDiameter = () => {
    if (typeof window === "undefined") return 280;

    if (window.innerWidth > 1600) return 420;

    if (window.innerWidth > 1200) return 360;

    return 280;
  };
  const [glowDiameter, setGlowDiameter] = useState(getDiameter);

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

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const container = containerRef?.current;

    if (!container) return;

    let glowSize = getGlowSize();
    function getGlowSize() {
      if (window.innerWidth > 1600) return 500;
      if (window.innerWidth > 1200) return 420;
      return 320;
    }

    const getDiameter = () => {
      if (window.innerWidth > 1600) return 420;

      if (window.innerWidth > 1200) return 360;

      return 280;
    };

    const handleResize = () => {
      glowSize = getGlowSize();

      setGlowDiameter(getDiameter());
    };
    const handleMouseLeave = () => {
      const rect = container.getBoundingClientRect();

      mouseX.set(rect.width / 2 - glowSize / 2);

      mouseY.set(rect.height / 2 - glowSize / 2);
    };
    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();

      mouseX.set(e.clientX - rect.left - glowSize / 2);

      mouseY.set(e.clientY - rect.top - glowSize / 2);
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseenter", handlePointerMove);
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseenter", handlePointerMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [mouseX, mouseY, containerRef]);

  const accentX = useTransform(x, (v) => v + 20);

  const accentY = useTransform(y, (v) => v + 20);

  return (
    <div
      dir="ltr"
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
    >
      <motion.div
        style={{
          x,
          y,
          width: glowDiameter,
          height: glowDiameter,
          willChange: "transform",
        }}
        className="
          absolute       
          rounded-full
          blur-[90px]
          bg-[var(--primary)]
          opacity-[0.08]
          mix-blend-screen
                  "
      />

      <motion.div
        style={{
          x: accentX,
          y: accentY,
          width: glowDiameter,
          height: glowDiameter,
          willChange: "transform",
        }}
        className="
          absolute
          rounded-full
          blur-[70px]
          bg-[var(--accent)]
          opacity-[0.10]
          mix-blend-screen
        "
      />
    </div>
  );
}
