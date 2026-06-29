"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useParams, usePathname } from "next/navigation";

import { Menu, X } from "lucide-react";

// Dark/Light mode
import ThemeToggle from "./ThemeToggle";
// Language
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

import useActiveSection from "@/hooks/useActiveSection";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations("nav");

  // const params = useParams();
  // const locale = params?.locale ?? "en";
  const { locale = "en" } = useParams();

  const pathname = usePathname();

  const activeSection = useActiveSection();

  const navLinkClass = (href) => {
    const isActive = pathname.startsWith(href);

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

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur max-md:backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,.04)]
dark:shadow-[0_1px_0_rgba(255,255,255,.04)]"
    >
      {/* Mobile Responsive */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" md:hidden absolute right-4 top-4 p-2 z-50 "
      >
        {isOpen ? <X /> : <Menu />}
      </button>
      {isOpen && (
        <div
          className="
        md:hidden
        border-t
      bg-[var(--card)]
border-[var(--border)]
      "
        >
          <div
            className="
          flex
          flex-col
          p-6
          gap-5
        "
          >
            <Link href={`/${locale}#about`} onClick={() => setIsOpen(false)}>
              {t("about")}
            </Link>

            <Link href={`/${locale}#skills`} onClick={() => setIsOpen(false)}>
              {t("skills")}
            </Link>

            <Link href={`/${locale}#projects`} onClick={() => setIsOpen(false)}>
              {t("projects")}
            </Link>

            <Link href={`/${locale}/blog`} onClick={() => setIsOpen(false)}>
              {t("blog")}
            </Link>

            <Link href={`/${locale}/contact`} onClick={() => setIsOpen(false)}>
              {t("contact")}
            </Link>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href={`/${locale}/`}
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/prof.png"
            alt="Mohammadmehdi Fard"
            width={50}
            height={50}
            className=" rounded-full object-cover border border-[var(--border)] hover:scale-105 transition duration-300 "
          />
          <div className="hidden md:block">
            <p className="font-semibold">{t("name")}</p>

            <p className="text-xs text-[var(--muted)]">{t("title")}</p>
          </div>
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link
            href={`/${locale}#about`}
            className={sectionLinkClass("about")}
            onClick={() => setIsOpen(false)}
          >
            {t("about")}
          </Link>
          <Link
            href={`/${locale}#skills`}
            className={sectionLinkClass("skills")}
            onClick={() => setIsOpen(false)}
          >
            {t("skills")}
          </Link>
          <Link
            href={`/${locale}#projects`}
            className={sectionLinkClass("projects")}
            onClick={() => setIsOpen(false)}
          >
            {t("projects")}
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
        <div className="flex items-center gap-2 md:gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
