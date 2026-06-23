import Image from "next/image";

import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function About() {
  return (
    <section
      id="about"
      className="
        py-32
      "
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Photo */}

          <div className="flex justify-center">
            <div
              className="
                relative
                w-[320px]
                h-[320px]
                rounded-3xl
                overflow-hidden
                border
                border-slate-800
              "
            >
              <Image
                src="/profile.jpg"
                alt="Mohammadmehdi Fard"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}

          <div>
            <span
              className="
                text-blue-400
                font-medium
              "
            >
              About Me
            </span>

            <h2
              className="
                mt-4
                text-4xl
                md:text-5xl
                font-bold
              "
            >
              Front-End Developer
            </h2>

            <p className="mt-6 text-slate-400 leading-8">
              I'm passionate about building modern, fast and responsive web
              applications using React, Next.js and JavaScript. I enjoy creating
              clean user experiences and writing maintainable code.
            </p>

            {/* Stats */}

            <div
              className="
                mt-10
                grid
                grid-cols-3
                gap-6
              "
            >
              <div>
                <h3 className="text-3xl font-bold">10+</h3>

                <p className="text-slate-400">Projects</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">3+</h3>

                <p className="text-slate-400">Years</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">15+</h3>

                <p className="text-slate-400">Skills</p>
              </div>
            </div>

            {/* Social */}

            <div
              className="
                mt-10
                flex
                gap-4
              "
            >
              <a
                href="#"
                target="_blank"
                className="
                  p-3
                  rounded-xl
                  border
                  border-slate-700
                  hover:border-blue-500
                  transition
                "
              >
                <FaGithub />
              </a>

              <a
                href="#"
                target="_blank"
                className="
                  p-3
                  rounded-xl
                  border
                  border-slate-700
                  hover:border-blue-500
                  transition
                "
              >
                <FaLinkedin />
              </a>

              <a
                href="#"
                target="_blank"
                className="
                  p-3
                  rounded-xl
                  border
                  border-slate-700
                  hover:border-blue-500
                  transition
                "
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
