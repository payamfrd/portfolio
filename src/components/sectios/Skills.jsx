"use client";

import skills from "@/data/skills";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <section
      id="skills"
      className="
        scroll-mt-24
        py-32
      "
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <span className="text-blue-400">My Skills</span>

          <h2
            className="
              mt-4
              text-4xl
              md:text-5xl
              font-bold
            "
          >
            Technologies & Tools
          </h2>
        </div>

        <div
          className="
            mt-16
            grid
            md:grid-cols-3
            gap-8
          "
        >
          {skills.map((group,index) => (
            <motion.div
              key={group.category}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.25,
              }}
              className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500"
            >
              <h3
                className="
                  text-2xl
                  font-bold
                  mb-6
                "
              >
                {group.category}
              </h3>

              <div
                className="
                  flex
                  flex-wrap
                  gap-3
                "
              >
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="
                      px-4
                      py-2
                      rounded-full
                      border
                      border-slate-700
                      hover:border-blue-500
                      transition
                    "
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
