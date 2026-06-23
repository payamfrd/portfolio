"use client";

import { motion } from "framer-motion";

import projects from "@/data/projects";

import ProjectCard from "@/components/ui/ProjectCard";

export default function Projects() {
  return (
    <section
      id="projects"
      className="
        scroll-mt-24
        py-32
      "
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <span className="text-blue-400">My Projects</span>

          <h2
            className="
              mt-4
              text-4xl
              md:text-5xl
              font-bold
            "
          >
            Featured Work
          </h2>
        </div>

        <div
          className="
            mt-16
            grid
            lg:grid-cols-2
            gap-8
          "
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
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
                delay: index * 0.1,
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
