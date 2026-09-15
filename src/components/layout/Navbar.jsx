"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";

import { Menu, X, ChevronRight, ChevronLeft } from "lucide-react";

// Dark/Light mode
import ThemeToggle from "./ThemeToggle";
// Language
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

import useActiveSection from "@/hooks/useActiveSection";

const Navbar = () => {
  const sectionHref = (id) => `/${locale}/#${id}`;

  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  const t = useTranslations("nav");

  const { locale = "en" } = useParams();

  const isFa = locale === "fa";

  const pathname = usePathname();

  const activeSection = useActiveSection();

  const navLinkClass = (href) => {
    const isActive = pathname === href || pathname.startsWith(`${href}/`);

    return `
    transition
    ${
      isActive
        ? "text-[var(--primary)] font-semibold"
        : "hover:text-[var(--accent)]"
    }
  `;
  };

  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  const sectionLinkClass = (section) => {
    const isActive = isHomePage && activeSection === section;

    return `
    transition
    ${
      isActive
        ? "text-[var(--primary)] font-semibold"
        : "hover:text-[var(--accent)]"
    }
  `;
  };

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setMobileProjectsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header className="fixed top-0 w-full z-40 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur max-md:backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,.04)] dark:shadow-[0_1px_0_rgba(255,255,255,.04)]">
      <div className="px-3 lg:w-5xl xl:w-7xl mx-auto max-w-7xl lg:px-6 h-16 flex items-center justify-between z-30">
        <Link
          href={`/${locale}/`}
          aria-label={t("logoIcon")}
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/profile.png"
            alt="Mohammadmehdi Fard (Payam Fard) - Front-End Developer"
            width={50}
            height={50}
            className=" rounded-full object-cover border border-[var(--border)] hover:scale-105 transition duration-300 "
          />
          <div className="hidden lg:block">
            <p className="font-semibold">{t("name")}</p>

            <p className="text-xs text-[var(--muted)]">{t("title")}</p>
          </div>
        </Link>

        <nav className="hidden lg:flex gap-8">
          <Link
            href={sectionHref("about")}
            className={sectionLinkClass("about")}
            onClick={() => setIsOpen(false)}
          >
            {t("about")}
          </Link>
          <Link
            href={sectionHref("experience")}
            className={sectionLinkClass("experience")}
            onClick={() => setIsOpen(false)}
          >
            {t("experience")}
          </Link>
          <Link
            href={sectionHref("skills")}
            className={sectionLinkClass("skills")}
            onClick={() => setIsOpen(false)}
          >
            {t("skills")}
          </Link>
          {/* <Link
            href={sectionHref("projects")}
            className={sectionLinkClass("projects")}
            onClick={() => setIsOpen(false)}
          >
            {t("projects")}
          </Link> */}

          <div
            className="relative flex items-center h-full"
            onMouseEnter={() => setProjectsOpen(true)}
            onMouseLeave={() => setProjectsOpen(false)}
          >
            <button
              className={`
    flex items-center gap-1 transition
    ${
      activeSection === "projects"
        ? "text-[var(--primary)] font-semibold"
        : "hover:text-[var(--accent)]"
    }
  `}
            >
              {t("projects")}
              {isFa ? (
                <ChevronLeft
                  size={16}
                  className={`transition-transform ${
                    projectsOpen ? "-rotate-90" : ""
                  }`}
                />
              ) : (
                <ChevronRight
                  size={16}
                  className={`transition-transform ${
                    projectsOpen ? "rotate-90" : ""
                  }`}
                />
              )}
            </button>

            <div
              className={`
    absolute
    top-full
    p-2
       min-w-[220px]
    rounded-2xl
    border
    border-[var(--border)]
    bg-[var(--card)]
    shadow-xl

    z-50
    ${isFa ? "right-0" : "left-0"}

    opacity-0
    invisible
    translate-y-2

    transition-all duration-200

    ${projectsOpen ? "opacity-100 visible translate-y-0" : ""}
  `}
            >
              <Link
                href={sectionHref("projects")}
                className="
          block
          px-4
          py-3
          hover:bg-[var(--bg)]
          hover:text-[var(--accent)]
          rounded-xl
          transition
        "
              >
                {t("featuredProjects")}
              </Link>

              <Link
                href={`/${locale}/projects`}
                className="
          block
          px-4
          py-3
          hover:bg-[var(--bg)]
          hover:text-[var(--accent)]
          rounded-xl
          transition
        "
              >
                {t("allProjects")}
              </Link>
            </div>
          </div>
          <Link
            href={sectionHref("certificates")}
            className={sectionLinkClass("certificates")}
            onClick={() => setIsOpen(false)}
          >
            {t("certificates")}
          </Link>
          <Link
            href={`/${locale}/blog`}
            className={navLinkClass(`/${locale}/blog`)}
          >
            {t("blog")}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className={navLinkClass(`/${locale}/contact`)}
          >
            {t("contact")}
          </Link>
        </nav>
        <div className="flex items-center gap-2 lg:gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
          {/* Mobile Responsive */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 z-50  `}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isOpen && (
          <div
            id="mobile-menu"
            className="
      lg:hidden
      fixed
      top-16
      left-0
      right-0
      min-h-[calc(100dvh-4rem)]
      z-30
      bg-[var(--card)]
      border-b
      border-[var(--border)]
      shadow-lg
      overflow-y-auto
overscroll-contain
    "
          >
            <div
              className={`
          flex
          flex-col
          items-start
          p-6
          gap-5
           ${isFa ? "text-right" : "text-left"}
        `}
            >
              <Link
                href={sectionHref("about")}
                onClick={() => setIsOpen(false)}
              >
                {t("about")}
              </Link>

              <Link
                href={sectionHref("experience")}
                onClick={() => setIsOpen(false)}
              >
                {t("experience")}
              </Link>

              <Link
                href={sectionHref("skills")}
                onClick={() => setIsOpen(false)}
              >
                {t("skills")}
              </Link>

              {/* <Link
              href={sectionHref("projects")}
              onClick={() => setIsOpen(false)}
            >
              {t("projects")}
            </Link> */}

              {/* <div className="flex flex-col gap-3">
                <span className="font-medium">{t("projects")}</span>

                <Link
                  href={sectionHref("projects")}
                  onClick={() => setIsOpen(false)}
                  className={`
  text-[var(--muted)]
  ${isFa ? "pr-4" : "pl-4"}
`}
                >
                  {t("featuredProjects")}
                </Link>

                <Link
                  href={`/${locale}/projects`}
                  onClick={() => setIsOpen(false)}
                  className={`
  text-[var(--muted)]
  ${isFa ? "pr-4" : "pl-4"}
`}
                >
                  {t("allProjects")}
                </Link>
              </div> */}

              <div className="w-full">
                <button
                  onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                  className={`
      flex
      items-center
      justify-between
      w-full
      font-medium
    `}
                >
                  <span>{t("projects")}</span>

                  {isFa ? (
                    <ChevronLeft
                      size={18}
                      className={`
          transition-transform
          duration-200
          ${mobileProjectsOpen ? "-rotate-90" : ""}
        `}
                    />
                  ) : (
                    <ChevronRight
                      size={18}
                      className={`
          transition-transform
          duration-200
          ${mobileProjectsOpen ? "rotate-90" : ""}
        `}
                    />
                  )}
                </button>

                <div
                  className={`
      overflow-hidden
      transition-all
      duration-300
      ${mobileProjectsOpen ? "max-h-96 mt-3" : "max-h-0"}
    `}
                >
                  <div className="flex flex-col gap-3">
                    <Link
                      href={sectionHref("projects")}
                      onClick={() => {
                        setIsOpen(false);
                        setMobileProjectsOpen(false);
                      }}
                      className={`
          text-[var(--muted)]
          ${isFa ? "pr-4" : "pl-4"}
        `}
                    >
                      {t("featuredProjects")}
                    </Link>

                    <Link
                      href={`/${locale}/projects`}
                      onClick={() => {
                        setIsOpen(false);
                        setMobileProjectsOpen(false);
                      }}
                      className={`
          text-[var(--muted)]
          ${isFa ? "pr-4" : "pl-4"}
        `}
                    >
                      {t("allProjects")}
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href={sectionHref("certificates")}
                onClick={() => setIsOpen(false)}
              >
                {t("certificates")}
              </Link>

              <Link href={`/${locale}/blog`} onClick={() => setIsOpen(false)}>
                {t("blog")}
              </Link>

              <Link
                href={`/${locale}/contact`}
                onClick={() => setIsOpen(false)}
              >
                {t("contact")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
