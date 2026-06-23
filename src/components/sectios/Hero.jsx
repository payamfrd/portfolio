"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl bg-blue-500/20" />

        <div className="absolute bottom-20 right-20 w-[300px] h-[300px] rounded-full blur-3xl bg-cyan-500/20" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-blue-400 mb-4"
        >
          Front-End Developer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          Mohammadmehdi Fard
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-slate-400 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Building modern, responsive and high-performance web applications with
          React and Next.js.
        </motion.p>
        <div
          className="
    mt-8
    flex
    justify-center
    gap-3
    flex-wrap
  "
        >
          <span className="px-4 py-2 rounded-full border border-slate-700">
            React
          </span>

          <span className="px-4 py-2 rounded-full border border-slate-700">
            Next.js
          </span>

          <span className="px-4 py-2 rounded-full border border-slate-700">
            JavaScript
          </span>

          <span className="px-4 py-2 rounded-full border border-slate-700">
            SEO
          </span>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
          >
            View Projects
          </a>

          <a
            href="/Fard.Mohammadmehdi.pdf"
            download
            className="px-6 py-3 rounded-xl border border-slate-700 hover:border-blue-500 transition"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
