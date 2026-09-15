"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { FaReact, FaJsSquare, FaGitAlt, FaNetworkWired } from "react-icons/fa";

import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";

const icons = [
  { Icon: FaReact, color: "#61DAFB", angle: 0 },
  { Icon: RiNextjsFill, color: "#ffffff", angle: 60 },
  { Icon: FaJsSquare, color: "#F7DF1E", angle: 120 },
  { Icon: RiTailwindCssFill, color: "#38BDF8", angle: 180 },
  { Icon: FaGitAlt, color: "#F05032", angle: 240 },
  { Icon: FaNetworkWired, color: "#7C3AED", angle: 300 },
];

export default function HeroOrbit() {
  const shouldReduceMotion = useReducedMotion();
  const [radius, setRadius] = useState(270);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) {
        setRadius(85);
      } else if (window.innerWidth < 1024) {
        setRadius(155);
      } else if (window.innerWidth < 1440) {
        setRadius(230);
      } else {
        setRadius(260);
      }
    };

    update();

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  const orbitTransition = {
    duration: 35,
    repeat: Infinity,
    ease: "linear",
  };

  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { rotate: 360 }}
      transition={orbitTransition}
      dir="ltr"
      style={{
        willChange: "transform",
      }}
      className="absolute inset-0 z-0 mx-auto block aspect-square w-full max-w-[700px] opacity-20 pointer-events-none sm:opacity-35 md:opacity-50 xl:opacity-60"
    >
      {icons.map(({ Icon, color, angle }, index) => {
        const rad = (angle * Math.PI) / 180;

        const x = Math.cos(rad) * radius;

        const y = Math.sin(rad) * radius;

        return (
          <motion.div
            key={index}
            animate={shouldReduceMotion ? {} : { rotate: -360 }}
            transition={orbitTransition}
            className=" absolute left-1/2 top-1/2 transform-gpu "
            style={{
              x,
              y,
              willChange: "transform",
            }}
          >
            <motion.div className=" -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-lg shadow-lg flex items-center justify-center ">
              <Icon
                className="pointer-events-none text-xl md:text-2xl drop-shadow-md"
                color={color}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
