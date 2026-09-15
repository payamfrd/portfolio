"use client";

import { useEffect, useRef, useState } from "react";
import ResumeModal from "../ui/ResumeModal";
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaDownload,
  FaEye,
} from "react-icons/fa";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const ResumeButton = () => {
  const menuRef = useRef(null);
  const t = useTranslations("hero");
  const [resumeOpen, setResumeOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const params = useParams();
  const locale = params.locale;

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setResumeOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      role="presentation"
      className="relative md:w-fit w-full sm:w-auto inline-block active:scale-95"
      onMouseEnter={() => {
        if (window.innerWidth >= 768) setOpen(true);
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= 768) setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="resume-menu"
        className="
        flex
        items-center
        justify-center
        w-full
        h-12
    min-w-32
        gap-2
     px-6 py-3
      rounded-xl
      border-1 border-[var(--border)]
      hover:border-[var(--accent)] transition select-none
      focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-[var(--accent)]
focus-visible:ring-offset-2
    "
      >
        {t("resume")}
        {open ? (
          <FaAngleDown />
        ) : locale === "fa" ? (
          <FaAngleLeft />
        ) : (
          <FaAngleRight />
        )}
      </button>

      <div
        id="resume-menu"
        role="menu"
        tabIndex={-1}
        className={`
    absolute
    top-full
    text-[var(--muted)]
    
    right-0
    min-w-32
w-full
    bg-[var(--card)]
    border border-[var(--border)]
    rounded-xl
    overflow-hidden

   transition-all
duration-200
ease-out
origin-top-right
shadow-xl
z-50

    ${
      open
        ? "opacity-100 visible translate-y-0 scale-100"
        : "opacity-0 invisible -translate-y-2 scale-95 pointer-events-none"
    }

  `}
      >
        <button
          onClick={() => {
            setResumeOpen(true);
            setOpen(false);
          }}
          role="menuitem"
          className=" w-full flex items-center gap-3 px-4 py-3 border-b border-[var(--border)] transition-colors hover:bg-[var(--primary)] hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
          style={{
            cursor: "pointer",
          }}
        >
          {t("viewResume")}
          <FaEye size={14} />
        </button>

        <a
          href="/Fard.Mohammadmehdi.pdf"
          download
          onClick={() => setOpen(false)}
          role="menuitem"
          className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[var(--primary)] hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
        >
          {t("downloadResume")}
          <FaDownload size={14} />
        </a>
      </div>
      {resumeOpen && (
        <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      )}
    </div>
  );
};

export default ResumeButton;
