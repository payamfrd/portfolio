"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { Menu, X, ChevronRight, ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import useActiveSection from "@/hooks/useActiveSection";

const Navbar = () => {
  const { locale = "fa" } = useParams();
  const pathname = usePathname();
  const t = useTranslations("nav");

  const isFa = locale === "fa";
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  const activeSection = useActiveSection();

  const [isOpen, setIsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);

  const projectsDropdownRef = useRef(null);

  const sectionHref = (id) => `/${locale}/#${id}`;

  const closeMenus = () => {
    setIsOpen(false);
    setProjectsOpen(false);
    setMobileProjectsOpen(false);
  };

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

  const mobileSectionLinkClass = (section) => {
    const isActive = isHomePage && activeSection === section;

    return `
      w-full
      rounded-xl
      px-3
      py-2
      transition
      ${
        isActive
          ? "bg-[var(--primary)]/10 text-[var(--primary)] font-semibold"
          : "text-[var(--text)] hover:bg-[var(--bg)] hover:text-[var(--accent)]"
      }
    `;
  };

  const isBlogActive =
    pathname === `/${locale}/blog` || pathname.startsWith(`/${locale}/blog/`);

  const isContactActive =
    pathname === `/${locale}/contact` ||
    pathname.startsWith(`/${locale}/contact/`);

  const isProjectsPage =
    pathname === `/${locale}/projects` ||
    pathname.startsWith(`/${locale}/projects/`);

  const isProjectsActive =
    isProjectsPage || (isHomePage && activeSection === "projects");

  const isFeaturedProjectsActive = isHomePage && activeSection === "projects";

  /*
   * Prevent background page scrolling while the mobile menu
   * is open.
   */
  useEffect(() => {
    if (!isOpen) return;

    const previousHtmlOverflow = document.documentElement.style.overflow;

    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;

      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isOpen]);

  /*
   * Close menus with Escape.
   */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;

      setIsOpen(false);
      setMobileProjectsOpen(false);
      setProjectsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /*
   * Close menus whenever the route changes.
   */
  useEffect(() => {
    setIsOpen(false);
    setMobileProjectsOpen(false);
    setProjectsOpen(false);
  }, [pathname]);

  /*
   * Close desktop Projects dropdown when focus leaves it.
   */
  const handleProjectsBlur = (event) => {
    const nextFocusedElement = event.relatedTarget;

    if (
      !nextFocusedElement ||
      !projectsDropdownRef.current?.contains(nextFocusedElement)
    ) {
      setProjectsOpen(false);
    }
  };

  return (
    <header
      className="
        fixed
        top-0
        z-40
        w-full
        border-b
        border-[var(--border)]
        bg-[var(--bg)]/90
        backdrop-blur
        max-md:backdrop-blur-xl
        shadow-[0_1px_0_rgba(0,0,0,.04)]
        dark:shadow-[0_1px_0_rgba(255,255,255,.04)]
      "
    >
      <div
        className="
          mx-auto
          flex
          h-16
          max-w-7xl
          items-center
          justify-between
          px-3
          lg:px-6
        "
      >
        {/* Logo / Brand */}
        <Link
          href={`/${locale}/`}
          aria-label={t("logoIcon")}
          className="flex items-center gap-3"
          onClick={closeMenus}
        >
          <Image
            src="/profile.png"
            alt="Mohammadmehdi Fard profile"
            width={50}
            height={50}
            priority
            className="
              rounded-full
              border
              border-[var(--border)]
              object-cover
              transition
              duration-300
              hover:scale-105
            "
          />

          <div className="hidden lg:block">
            <p className="font-semibold">{t("name")}</p>

            <p className="text-xs text-[var(--muted)]">{t("title")}</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {/* About */}
          <Link
            href={sectionHref("about")}
            className={sectionLinkClass("about")}
          >
            {t("about")}
          </Link>

          {/* Experience */}
          <Link
            href={sectionHref("experience")}
            className={sectionLinkClass("experience")}
          >
            {t("experience")}
          </Link>

          {/* Skills */}
          <Link
            href={sectionHref("skills")}
            className={sectionLinkClass("skills")}
          >
            {t("skills")}
          </Link>

          {/* Projects Dropdown */}
          <div
            ref={projectsDropdownRef}
            className="relative flex h-full items-center"
            onMouseEnter={() => setProjectsOpen(true)}
            onMouseLeave={() => setProjectsOpen(false)}
            onFocus={() => setProjectsOpen(true)}
            onBlur={handleProjectsBlur}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={projectsOpen}
              aria-controls="desktop-projects-menu"
              onClick={() => setProjectsOpen((previous) => !previous)}
              className={`
                flex
                items-center
                gap-1
                transition
                ${
                  isProjectsActive
                    ? "font-semibold text-[var(--primary)]"
                    : "hover:text-[var(--accent)]"
                }
              `}
            >
              {t("projects")}

              {isFa ? (
                <ChevronLeft
                  size={16}
                  aria-hidden="true"
                  className={`
                    transition-transform
                    duration-200
                    ${projectsOpen ? "-rotate-90" : ""}
                  `}
                />
              ) : (
                <ChevronRight
                  size={16}
                  aria-hidden="true"
                  className={`
                    transition-transform
                    duration-200
                    ${projectsOpen ? "rotate-90" : ""}
                  `}
                />
              )}
            </button>

            <div
              id="desktop-projects-menu"
              role="menu"
              aria-hidden={!projectsOpen}
              className={`
                absolute
                top-full
                z-50
                min-w-[220px]
                rounded-2xl
                border
                border-[var(--border)]
                bg-[var(--card)]
                p-2
                shadow-xl
                transition-all
                duration-200
                ${isFa ? "right-0" : "left-0"}
                ${
                  projectsOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible translate-y-2 opacity-0"
                }
              `}
            >
              {/* Featured Projects */}
              <Link
                href={sectionHref("projects")}
                role="menuitem"
                tabIndex={projectsOpen ? 0 : -1}
                aria-current={isFeaturedProjectsActive ? "page" : undefined}
                className={`
                  block
                  rounded-xl
                  px-4
                  py-3
                  transition
                  ${
                    isFeaturedProjectsActive
                      ? "bg-[var(--primary)]/10 font-semibold text-[var(--primary)]"
                      : "hover:bg-[var(--bg)] hover:text-[var(--accent)]"
                  }
                `}
              >
                {t("featuredProjects")}
              </Link>

              {/* All Projects */}
              <Link
                href={`/${locale}/projects`}
                role="menuitem"
                tabIndex={projectsOpen ? 0 : -1}
                aria-current={isProjectsPage ? "page" : undefined}
                className={`
                  block
                  rounded-xl
                  px-4
                  py-3
                  transition
                  ${
                    isProjectsPage
                      ? "bg-[var(--primary)]/10 font-semibold text-[var(--primary)]"
                      : "hover:bg-[var(--bg)] hover:text-[var(--accent)]"
                  }
                `}
              >
                {t("allProjects")}
              </Link>
            </div>
          </div>

          {/* Certificates */}
          <Link
            href={sectionHref("certificates")}
            className={sectionLinkClass("certificates")}
          >
            {t("certificates")}
          </Link>

          {/* Blog */}
          <Link
            href={`/${locale}/blog`}
            className={navLinkClass(`/${locale}/blog`)}
            aria-current={isBlogActive ? "page" : undefined}
          >
            {t("blog")}
          </Link>

          {/* Contact */}
          <Link
            href={`/${locale}/contact`}
            className={navLinkClass(`/${locale}/contact`)}
            aria-current={isContactActive ? "page" : undefined}
          >
            {t("contact")}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 lg:gap-4">
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => {
              setIsOpen((previous) => !previous);
              setProjectsOpen(false);
            }}
            className="z-50 rounded-xl p-2 transition hover:bg-[var(--card)] lg:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="
              fixed
              left-0
              right-0
              top-16
              z-30
              min-h-[calc(100dvh-4rem)]
              overflow-y-auto
              overscroll-contain
              border-b
              border-[var(--border)]
              bg-[var(--card)]
              shadow-lg
              lg:hidden
            "
          >
            <nav
              aria-label="Mobile navigation"
              className={`
                flex
                flex-col
                items-start
                gap-3
                p-6
                ${isFa ? "text-right" : "text-left"}
              `}
            >
              {/* About */}
              <Link
                href={sectionHref("about")}
                className={mobileSectionLinkClass("about")}
                onClick={closeMenus}
              >
                {t("about")}
              </Link>

              {/* Experience */}
              <Link
                href={sectionHref("experience")}
                className={mobileSectionLinkClass("experience")}
                onClick={closeMenus}
              >
                {t("experience")}
              </Link>

              {/* Skills */}
              <Link
                href={sectionHref("skills")}
                className={mobileSectionLinkClass("skills")}
                onClick={closeMenus}
              >
                {t("skills")}
              </Link>

              {/* Projects */}
              <div className="w-full">
                <button
                  type="button"
                  onClick={() => setMobileProjectsOpen((previous) => !previous)}
                  aria-haspopup="menu"
                  aria-expanded={mobileProjectsOpen}
                  aria-controls="mobile-projects-menu"
                  className={`
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    px-3
                    py-2
                    font-medium
                    transition
                    ${
                      isProjectsActive
                        ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                        : "text-[var(--text)] hover:bg-[var(--bg)] hover:text-[var(--accent)]"
                    }
                  `}
                >
                  <span>{t("projects")}</span>

                  {isFa ? (
                    <ChevronLeft
                      size={18}
                      aria-hidden="true"
                      className={`
                        transition-transform
                        duration-200
                        ${mobileProjectsOpen ? "-rotate-90" : ""}
                      `}
                    />
                  ) : (
                    <ChevronRight
                      size={18}
                      aria-hidden="true"
                      className={`
                        transition-transform
                        duration-200
                        ${mobileProjectsOpen ? "rotate-90" : ""}
                      `}
                    />
                  )}
                </button>

                <div
                  id="mobile-projects-menu"
                  role="menu"
                  aria-hidden={!mobileProjectsOpen}
                  className={`
                    overflow-hidden
                    transition-all
                    duration-300
                    ${
                      mobileProjectsOpen
                        ? "mt-2 max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }
                  `}
                >
                  <div className="flex flex-col gap-1">
                    {/* Featured Projects */}
                    <Link
                      href={sectionHref("projects")}
                      role="menuitem"
                      tabIndex={mobileProjectsOpen ? 0 : -1}
                      aria-current={
                        isFeaturedProjectsActive ? "page" : undefined
                      }
                      className={`
                        w-full
                        rounded-xl
                        px-3
                        py-2
                        ${isFa ? "pr-7" : "pl-7"}
                        transition
                        ${
                          isFeaturedProjectsActive
                            ? "bg-[var(--primary)]/10 font-semibold text-[var(--primary)]"
                            : "text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--accent)]"
                        }
                      `}
                      onClick={closeMenus}
                    >
                      {t("featuredProjects")}
                    </Link>

                    {/* All Projects */}
                    <Link
                      href={`/${locale}/projects`}
                      role="menuitem"
                      tabIndex={mobileProjectsOpen ? 0 : -1}
                      aria-current={isProjectsPage ? "page" : undefined}
                      className={`
                        w-full
                        rounded-xl
                        px-3
                        py-2
                        ${isFa ? "pr-7" : "pl-7"}
                        transition
                        ${
                          isProjectsPage
                            ? "bg-[var(--primary)]/10 font-semibold text-[var(--primary)]"
                            : "text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--accent)]"
                        }
                      `}
                      onClick={closeMenus}
                    >
                      {t("allProjects")}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Certificates */}
              <Link
                href={sectionHref("certificates")}
                className={mobileSectionLinkClass("certificates")}
                onClick={closeMenus}
              >
                {t("certificates")}
              </Link>

              {/* Blog */}
              <Link
                href={`/${locale}/blog`}
                aria-current={isBlogActive ? "page" : undefined}
                className={`
                  w-full
                  rounded-xl
                  px-3
                  py-2
                  transition
                  ${
                    isBlogActive
                      ? "bg-[var(--primary)]/10 font-semibold text-[var(--primary)]"
                      : "text-[var(--text)] hover:bg-[var(--bg)] hover:text-[var(--accent)]"
                  }
                `}
                onClick={closeMenus}
              >
                {t("blog")}
              </Link>

              {/* Contact */}
              <Link
                href={`/${locale}/contact`}
                aria-current={isContactActive ? "page" : undefined}
                className={`
                  w-full
                  rounded-xl
                  px-3
                  py-2
                  transition
                  ${
                    isContactActive
                      ? "bg-[var(--primary)]/10 font-semibold text-[var(--primary)]"
                      : "text-[var(--text)] hover:bg-[var(--bg)] hover:text-[var(--accent)]"
                  }
                `}
                onClick={closeMenus}
              >
                {t("contact")}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
