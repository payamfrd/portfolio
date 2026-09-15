"use client";

import { motion } from "framer-motion";
import { code } from "@/data/hero/heroCode";

export default function HeroCodeWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      dir="ltr"
      className="relative z-20 mx-auto w-full max-w-[320px] text-left sm:max-w-[420px] md:max-w-[520px] lg:max-w-[620px]"
      style={{
        direction: "ltr",
        unicodeBidi: "isolate",
      }}
    >
      <div className=" rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--card)] backdrop-blur-xl shadow-2xl ">
        {/* Header */}

        <div className=" flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-4 border-b border-[var(--border)] ">
          <span
            aria-hidden="true"
            className="w-3 h-3 rounded-full bg-yellow-500"
          />
          <span
            aria-hidden="true"
            className="w-3 h-3 rounded-full bg-green-500"
          />
          <span
            aria-hidden="true"
            className="w-3 h-3 rounded-full bg-red-500"
          />

          <p className=" ml-4 text-sm text-[var(--muted)] font-medium ">
            app/page.jsx
          </p>
        </div>

        {/* Code */}

        <div className="bg-[#1E1E1E] p-4 font-mono text-[10px] leading-6 text-[#D4D4D4] sm:p-6 sm:text-[11px] sm:leading-7 md:p-8 md:text-sm md:leading-8 lg:text-lg lg:leading-9 overflow-x-auto">
          {code.map((line, index) => (
            <motion.div
              key={line.id}
              initial={{
                opacity: 0,
                x: -15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              className="flex"
            >
              <span className="select-none text-[#6A9955] mr-3 sm:mr-5 w-5 sm:w-6 text-xs sm:text-sm ">
                {index + 1}
              </span>

              <span className="flex-1">{line.content}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
