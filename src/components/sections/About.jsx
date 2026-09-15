import profile from "@/data/profile";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Code2, Network, BriefcaseBusiness } from "lucide-react";

import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function About() {
  const t = useTranslations("about");

  const { projects, experience, technologies } = profile.stats;

  const socialLinks = [
    {
      href: profile.github,
      label: "GitHub",
      Icon: FaGithub,
      color: "var(--github)",
    },
    {
      href: profile.linkedin,
      label: "LinkedIn",
      Icon: FaLinkedin,
      color: "#0A66C2",
    },
    {
      href: `https://wa.me/${profile.whatsapp}`,
      label: "WhatsApp",
      Icon: FaWhatsapp,
      color: "#25D366",
    },
  ];

  const specialties = [
    {
      label: t("frontend"),
      Icon: Code2,
    },
    {
      label: t("network"),
      Icon: Network,
    },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section-divider scroll-mt-24 py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className="
            grid
            items-center
            gap-12
            md:grid-cols-2
            lg:gap-20
          "
        >
          {/* =========================
              PHOTO
          ========================== */}

          <div
            className="
              relative
              flex
              justify-center
            "
          >
            {/* Ambient Glow */}

            <div
              aria-hidden="true"
              className="
                absolute
                left-1/2
                top-1/2
                h-[280px]
                w-[280px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[var(--primary)]/10
                blur-3xl
                sm:h-[340px]
                sm:w-[340px]
              "
            />

            {/* Image */}

            <div
              className="
                relative
                h-[280px]
                w-[280px]
                overflow-hidden
                rounded-3xl
                border
                border-[var(--border)]
                bg-[var(--card)]
                shadow-xl
                sm:h-[320px]
                sm:w-[320px]
              "
            >
              <Image
                src="/my-pic.webp"
                alt="Mohammadmehdi Fard (Payam Fard) - IT Specialist, Network and Front-End Developer"
                fill
                sizes="(max-width: 640px) 280px, 320px"
                className="
                  object-cover
                  transition-transform
                  duration-500
                  hover:scale-105
                "
              />
            </div>
          </div>

          {/* =========================
              CONTENT
          ========================== */}

          <div className="text-center md:text-start">
            {/* Section Label */}

            <span
              className="
                inline-flex
                items-center
                gap-2
                font-medium
                text-[var(--primary)]
              "
            >
              <BriefcaseBusiness aria-hidden="true" className="h-4 w-4" />

              {t("about")}
            </span>

            {/* Title */}

            <h2
              id="about-title"
              className="
                mt-4
                text-3xl
                font-bold
                tracking-tight
                sm:text-4xl
                lg:text-5xl
              "
            >
              {t("title")}
            </h2>

            {/* Specialties */}

            <div
              className="
                mx-auto
                mt-6
                flex
                flex-wrap
                justify-center
                gap-3
                md:mx-0
                md:justify-start
              "
              aria-label={t("specialties")}
            >
              {specialties.map(({ label, Icon }) => (
                <span
                  key={label}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-[var(--border)]
                    bg-[var(--card)]/70
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-[var(--text)]
                    shadow-sm
                  "
                >
                  <Icon
                    aria-hidden="true"
                    className="
                      h-4
                      w-4
                      text-[var(--primary)]
                    "
                  />

                  {label}
                </span>
              ))}
            </div>

            {/* Description */}

            <p
              className="
                mx-auto
                mt-6
                text-justify
                max-w-2xl
                text-[var(--muted)]
                leading-8
                md:mx-0
              "
            >
              {t("description")}
            </p>

            {/* =========================
                STATS
            ========================== */}

            <div
              className="
                mx-auto
                mt-10
                grid
                max-w-2xl
                grid-cols-3
                gap-4
                sm:gap-6
                md:mx-0
              "
            >
              <div>
                <h3
                  className="
                    text-2xl
                    font-bold
                    text-[var(--primary)]
                    sm:text-3xl
                  "
                >
                  {projects}+
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    text-[var(--muted)]
                    sm:text-base
                  "
                >
                  {t("projects")}
                </p>
              </div>

              <div>
                <h3
                  className="
                    text-2xl
                    font-bold
                    text-[var(--primary)]
                    sm:text-3xl
                  "
                >
                  {experience}+
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    text-[var(--muted)]
                    sm:text-base
                  "
                >
                  {t("year")}
                </p>
              </div>

              <div>
                <h3
                  className="
                    text-2xl
                    font-bold
                    text-[var(--primary)]
                    sm:text-3xl
                  "
                >
                  {technologies}+
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    text-[var(--muted)]
                    sm:text-base
                  "
                >
                  {t("skills")}
                </p>
              </div>
            </div>

            {/* =========================
                SOCIAL LINKS
            ========================== */}

            <div
              className="
                mx-auto
                mt-10
                flex
                justify-center
                gap-3
                md:mx-0
                md:justify-start
              "
              aria-label={t("socialLinks")}
            >
              {socialLinks.map(({ href, label, Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="
                      social-link
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      border
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[var(--social-color)]
                      focus-visible:ring-offset-2
                    "
                  style={{
                    "--social-color": color,
                  }}
                >
                  <Icon aria-hidden="true" className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
