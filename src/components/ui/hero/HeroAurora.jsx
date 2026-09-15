"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function HeroAurora() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
      {/* Wave 1 */}

      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [-140, 140, -140],
                rotate: [0, 8, -8, 0],
              }
        }
        style={{
          willChange: "transform",
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
absolute
top-24

md:top-10
left-1/2
-translate-x-1/2

w-[150vw]
max-w-[1200px]
h-[120px] md:h-[180px]

rounded-full

bg-gradient-to-r
from-transparent
via-[var(--primary)]
to-transparent

opacity-[0.06] md:opacity-[0.10]

blur-[40px] md:blur-[50px] xl:blur-[70px]
mix-blend-screen
"
      />

      {/* Wave 2 */}

      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [160, -160, 160],
                rotate: [0, -8, 8, 0],
              }
        }
        style={{
          willChange: "transform",
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
absolute
bottom-10
left-1/2
-translate-x-1/2

w-[170vw]
max-w-[1100px] h-[140px] md:h-[200px]

rounded-full

bg-gradient-to-r
from-transparent
via-[var(--accent)]
to-transparent

opacity-[0.05] md:opacity-[0.08]

blur-[45px] md:blur-[70px] xl:blur-[90px]
mix-blend-screen
"
      />

      {/* Wave 3 */}

      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [-80, 80, -80],

                rotate: [0, -4, 4, 0],
              }
        }
        style={{
          willChange: "transform",
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="hidden
md:block
absolute
top-1/2
left-1/2
-translate-x-1/2
-translate-y-1/2

w-[150vw]
max-w-[900px] h-[90px] md:h-[130px]

rounded-full

bg-gradient-to-r
from-transparent via-[var(--primary)]
to-transparent

opacity-[0.05]

blur-[60px] xl:blur-[90px]
mix-blend-screen
"
      />
    </div>
  );
}
