import Image from "next/image";

export default function ProjectCard({ project }) {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/50
        transition
        duration-300
        hover:-translate-y-2
        hover:border-blue-500
      "
    >
      <div className="relative h-60">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold">{project.title}</h3>

        <p className="mt-4 text-slate-400">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="
                px-3
                py-1
                rounded-full
                border
                border-slate-700
                text-sm
              "
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-4">
          <a
            href={project.github}
            target="_blank"
            className="
              px-4
              py-2
              rounded-xl
              border
              border-slate-700
            "
          >
            GitHub
          </a>

          <a
            href={project.demo}
            target="_blank"
            className="
              px-4
              py-2
              rounded-xl
              bg-blue-600
            "
          >
            Demo
          </a>
        </div>
      </div>
    </div>
  );
}
