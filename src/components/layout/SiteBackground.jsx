"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function SiteBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="site-background" aria-hidden="true">
      <motion.div
        className="background-blob background-blob-primary"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 80, 20, 0],
                y: [0, 50, 90, 0],
                scale: [1, 1.08, 0.98, 1],
              }
        }
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="background-blob background-blob-accent"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, -80, -20, 0],
                y: [0, -50, -90, 0],
                scale: [1, 0.96, 1.08, 1],
              }
        }
        transition={{
          duration: 55,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
