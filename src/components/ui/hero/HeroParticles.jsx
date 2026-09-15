"use client";

import { particles } from "@/data/hero/heroParticles";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroParticles() {
  const [count, setCount] = useState(25);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) {
        setCount(8);
      } else if (window.innerWidth < 992) {
        setCount(15);
      } else {
        setCount(25);
      }
    };

    updateCount();

    window.addEventListener("resize", updateCount);

    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {particles.slice(0, count).map((particle) => (
        <motion.div
          key={particle.id}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -12, 0],
                  x: [0, 4, -4, 0],
                  opacity: [0.2, 0.45, 0.2],
                  scale: [1, 1.15, 1],
                }
          }
          transition={{
            repeat: Infinity,
            duration: particle.duration,
            ease: "easeInOut",
          }}
          style={{
            left: particle.x,

            top: particle.y,

            width: particle.size,

            height: particle.size,

            willChange: "transform",
          }}
          className={` absolute rounded-full opacity-40 shadow-[0_0_12px_var(--accent)] ${
            particle.color === "primary"
              ? "bg-[var(--primary)]"
              : "bg-[var(--accent)]"
          } `}
        />
      ))}
    </div>
  );
}
