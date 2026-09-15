import Link from "next/link";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FiArrowUpRight, FiDownload, FiHeart } from "react-icons/fi";

import { getAllPosts } from "@/lib/blog";
import { getTranslations } from "next-intl/server";

const Footer = async ({ locale }) => {
  const t = await getTranslations({
    locale,
    namespace: "footer",
  });

  const posts = getAllPosts(locale)
    .map((post) => ({
      ...post,
      views: Number(post.views ?? post.viewCount ?? 0),
    }))
    .sort((a, b) => {
      if (b.views !== a.views) {
        return b.views - a.views;
      }

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: "https://github.com/payamfrd",
      label: t("github"),
      icon: FaGithub,
      iconClass: "text-[var(--text)]",
      hoverClass:
        "hover:border-[#181717]/20 hover:bg-[#181700]/5 dark:hover:border-white/20 dark:hover:bg-white/10",
    },
    {
      href: "https://www.linkedin.com/in/mohammadmehdi-fard-a430a1222",
      label: t("linkedin"),
      icon: FaLinkedin,
      iconClass: "text-[#0A66C2]",
      hoverClass: "hover:border-[#0A66C2]/20 hover:bg-[#0A66C2]/5",
    },
    {
      href: "https://wa.me/989301801747",
      label: t("whatsapp"),
      icon: FaWhatsapp,
      iconClass: "text-[#25D366]",
      hoverClass: "hover:border-[#25D366]/20 hover:bg-[#25D366]/5",
    },
    {
      href: "mailto:Fard.Mohammadmehdi@gmail.com",
      label: t("email"),
      icon: HiOutlineMailOpen,
      iconClass: "text-[var(--primary)]",
      hoverClass:
        "hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/5",
    },
  ];

  return (
    <footer
      className="
        mt-24
        border-t-2
        border-[var(--border)]
        bg-[var(--bg)]
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          grid-cols-1
          gap-10
          px-5
          py-14
          sm:px-6
          sm:grid-cols-2
          lg:grid-cols-4
          lg:gap-8
          lg:px-10
        "
      >
        {/* Brand */}
        <div className="flex flex-col">
          <h3
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              text-lg
              font-bold
              text-[var(--text)]
            "
          >
            <span
              aria-hidden="true"
              className="
                h-2
                w-2
                shrink-0
                rounded-full
                bg-[var(--primary)]
              "
            />

            <span>{t("name")}</span>
          </h3>

          <div
            aria-hidden="true"
            className="
              mt-3
              h-px
              w-full
              max-w-52
              bg-[var(--primary)]
            "
          />

          <p
            className="
              mt-4
              max-w-xs
              leading-7
              text-[var(--muted)]
            "
          >
            {t("title")}
          </p>

          {/* SEO identity context */}
          <p className="sr-only">
            Mohammadmehdi Payam Fard — Front-End Developer and Network & IT
            Specialist
          </p>

          <a
            href="/Fard.Mohammadmehdi.pdf"
            download
            className="
              mt-6
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-xl
              bg-[var(--primary)]
              px-4
              py-2.5
              font-medium
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:opacity-90
              focus:outline-none
              focus:ring-2
              focus:ring-[var(--primary)]
              focus:ring-offset-2
              focus:ring-offset-[var(--bg)]
            "
          >
            <FiDownload size={16} aria-hidden="true" className="shrink-0" />

            <span>{t("downloadResume")}</span>
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h4
            className="
              inline-flex
              items-center
              gap-2
              text-base
              font-bold
              text-[var(--text)]
            "
          >
            <span
              aria-hidden="true"
              className="
                h-5
                w-1
                shrink-0
                rounded-full
                bg-[var(--primary)]
              "
            />

            <span>{t("quickLinks")}</span>
          </h4>

          <div
            aria-hidden="true"
            className="
              mt-3
              h-px
              w-full
              max-w-32
              bg-[var(--border)]
            "
          />

          <ul className="mt-5 space-y-3">
            <li>
              <Link
                href={`/${locale}#about`}
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  text-[var(--muted)]
                  transition-colors
                  duration-200
                  hover:text-[var(--primary)]
                  focus:outline-none
                  focus:text-[var(--primary)]
                "
              >
                <FiArrowUpRight
                  size={14}
                  aria-hidden="true"
                  className="
                    shrink-0
                    transition-transform
                    duration-200
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />

                <span>{t("about")}</span>
              </Link>
            </li>

            <li>
              <Link
                href={`/${locale}#skills`}
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  text-[var(--muted)]
                  transition-colors
                  duration-200
                  hover:text-[var(--primary)]
                  focus:outline-none
                  focus:text-[var(--primary)]
                "
              >
                <FiArrowUpRight
                  size={14}
                  aria-hidden="true"
                  className="
                    shrink-0
                    transition-transform
                    duration-200
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />

                <span>{t("skills")}</span>
              </Link>
            </li>

            <li>
              <Link
                href={`/${locale}#projects`}
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  text-[var(--muted)]
                  transition-colors
                  duration-200
                  hover:text-[var(--primary)]
                  focus:outline-none
                  focus:text-[var(--primary)]
                "
              >
                <FiArrowUpRight
                  size={14}
                  aria-hidden="true"
                  className="
                    shrink-0
                    transition-transform
                    duration-200
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />

                <span>{t("projects")}</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Popular Posts */}
        <div>
          <h4
            className="
              inline-flex
              items-center
              gap-2
              text-base
              font-bold
              text-[var(--text)]
            "
          >
            <span
              aria-hidden="true"
              className="
                h-5
                w-1
                shrink-0
                rounded-full
                bg-[var(--primary)]
              "
            />

            <span>{t("popularPosts")}</span>
          </h4>

          <div
            aria-hidden="true"
            className="
              mt-3
              h-px
              w-full
              max-w-32
              bg-[var(--border)]
            "
          />

          <ul className="mt-5 space-y-3">
            {posts.length > 0 ? (
              posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="
                      group
                      inline-flex
                      max-w-full
                      items-start
                      gap-2
                      text-[var(--muted)]
                      transition-colors
                      duration-200
                      hover:text-[var(--primary)]
                      focus:outline-none
                      focus:text-[var(--primary)]
                    "
                  >
                    <FiArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="
                        mt-1
                        shrink-0
                        text-[var(--primary)]
                        transition-transform
                        duration-200
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                    />

                    <span className="line-clamp-2 leading-6">{post.title}</span>
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-sm text-[var(--muted)]">
                {t("noPopularPosts")}
              </li>
            )}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4
            className="
              inline-flex
              items-center
              gap-2
              text-base
              font-bold
              text-[var(--text)]
            "
          >
            <span
              aria-hidden="true"
              className="
                h-5
                w-1
                shrink-0
                rounded-full
                bg-[var(--primary)]
              "
            />

            <span>{t("connect")}</span>
          </h4>

          <div
            aria-hidden="true"
            className="
              mt-3
              h-px
              w-full
              max-w-32
              bg-[var(--border)]
            "
          />

          <ul className="mt-5 space-y-2">
            {socialLinks.map(
              ({ href, label, icon: Icon, iconClass, hoverClass }) => {
                const isExternal = href.startsWith("http");

                return (
                  <li key={label}>
                    <a
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      className={`
                        group
                        inline-flex
                        w-fit
                        items-center
                        gap-3
                        rounded-xl
                        border
                        border-transparent
                        px-2.5
                        py-2
                        text-[var(--muted)]
                        transition-all
                        duration-200
                        ${hoverClass}
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[var(--primary)]
                        focus:ring-offset-2
                        focus:ring-offset-[var(--bg)]
                      `}
                    >
                      <span
                        className="
                          flex
                          h-5
                          w-5
                          shrink-0
                          items-center
                          justify-center
                        "
                      >
                        <Icon
                          size={20}
                          aria-hidden="true"
                          className={`
                            ${iconClass}
                            transition-transform
                            duration-200
                            group-hover:scale-110
                          `}
                        />
                      </span>

                      <span>{label}</span>
                    </a>
                  </li>
                );
              },
            )}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-[var(--border)]">
        <div
          dir="ltr"
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            justify-center
            gap-2
            px-5
            py-6
            text-center
            text-sm
            text-[var(--muted)]
            sm:px-6
            md:flex-row
            md:gap-1
            lg:px-10
          "
        >
          <span>
            &copy; {currentYear}{" "}
            <span className="text-[var(--accent)]">Mohammadmehdi Fard</span>
          </span>

          <span className="hidden md:inline" aria-hidden="true">
            •
          </span>

          <span className="inline-flex items-center gap-1">
            <FiHeart
              size={13}
              aria-hidden="true"
              className="fill-red-500 text-red-500"
            />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
