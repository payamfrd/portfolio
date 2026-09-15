"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function SiteBackground() {
  const shouldReduceMotion = useReducedMotion();

  const primaryAnimation = shouldReduceMotion
    ? {}
    : {
        x: [0, 80, 20, 0],
        y: [0, 50, 90, 0],
        scale: [1, 1.08, 0.98, 1],
      };

  const accentAnimation = shouldReduceMotion
    ? {}
    : {
        x: [0, -80, -20, 0],
        y: [0, -50, -90, 0],
        scale: [1, 0.96, 1.08, 1],
      };

  return (
    <div className="site-background" aria-hidden="true">
      <motion.div
        className="background-blob background-blob-primary"
        animate={primaryAnimation}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="background-blob background-blob-accent"
        animate={accentAnimation}
        transition={{
          duration: 55,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
