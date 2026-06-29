import { useTranslations } from "next-intl";
import Image from "next/image";

import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function About() {
  const t = useTranslations("about");
  return (
    <section className="py-32 section-divider scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Photo */}

          <div className="relative flex justify-center">
            {/* Glow */}
            <div className=" absolute -inset-8 rounded-full bg-[var(--primary)]/15 blur-3xl " />

            <div className="relative w-[320px] h-[320px] rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--card)]">
              <Image
                src="/my-pic.jpg"
                alt="Mohammadmehdi Fard"
                fill
                className=" object-cover hover:scale-105 transition duration-500 "
              />
            </div>
          </div>

          {/* Content */}

          <div>
            <span
              className="
                text-[var(--primary)]
                font-medium
              "
            >
              {t("about")}
            </span>

            <h2
              className="
                mt-4
                text-4xl
                md:text-5xl
                font-bold
              "
            >
              {t("title")}
            </h2>

            <p className="mt-6 text-[var(--muted)] leading-8">
              {t("description")}
            </p>

            {/* Stats */}

            <div
              className="
                mt-10
                grid
                grid-cols-3
                gap-6
                max-md:justify-around
              "
            >
              <div className="max-md:text-center">
                <h3 className="text-3xl font-bold text-[var(--primary)]">
                  10+
                </h3>

                <p className="text-[var(--muted)]">{t("projects")}</p>
              </div>

              <div className="max-md:text-center">
                <h3 className="text-3xl font-bold text-[var(--primary)]">3+</h3>

                <p className="text-[var(--muted)]">{t("year")}</p>
              </div>

              <div className="max-md:text-center">
                <h3 className="text-3xl font-bold text-[var(--primary)]">
                  15+
                </h3>

                <p className="text-[var(--muted)]">{t("skills")}</p>
              </div>
            </div>

            {/* Social */}

            <div
              className="
                mt-10
                flex
                gap-4
                max-md:justify-around

              "
            >
              <a
                aria-label="Github"
                href="https://github.com/payamfrd"
                target="_blank"
                rel="noopener noreferrer"
                className=" p-3 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-1 transition-all duration-300"
              >
                <FaGithub />
              </a>

              <a
                aria-label="LinkedIn"
                href="https://www.linkedin.com/in/mohammadmehdi-fard-a430a1222"
                target="_blank"
                rel="noopener noreferrer"
                className=" p-3 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-1 transition-all duration-300"
              >
                <FaLinkedin />
              </a>

              <a
                aria-label="WhatsApp"
                href="https://wa.me/989301801747"
                target="_blank"
                rel="noopener noreferrer"
                className=" p-3 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-1 transition-all duration-300"
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
