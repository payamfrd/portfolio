import Image from "next/image";

export default function ProjectCard({ project }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] transition duration-300 hover:-translate-y-2 hover:border-[var(--accent)] hover:shadow-[0_0_25px_rgba(249,115,22,0.15)] ">
      <div className="relative h-60">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className=" object-cover transition duration-500 group-hover:scale-105 "
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold">{project.title}</h3>

        <p
          className="
            mt-4
            text-[var(--muted)]
          "
        >
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className=" px-3 py-1 rounded-full border border-[var(--border)] text-sm hover:border-[var(--accent)] transition "
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="
              px-4
              py-2
              rounded-xl

              border
              border-[var(--border)]

              hover:border-[var(--accent)]
              hover:text-[var(--accent)]
              transition
            "
            >
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="
              px-4
              py-2
              rounded-xl

              bg-[var(--primary)]
              text-white

              hover:opacity-90
              hover:shadow-[0_0_20px_rgba(37,99,235,0.35)]
              transition
            "
            >
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
