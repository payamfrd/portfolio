"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

import Image from "next/image";
import { FaTimes } from "react-icons/fa";

export default function ResumeModal({ open, onClose }) {
  const t = useTranslations("hero");
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="
        fixed inset-0 z-50
        flex
        items-center
        justify-center
        bg-[var(--bg)]
      "
          style={{
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
    w-[95vw]
    sm:w-fit
    max-h-[90vh]
    bg-[var(--card)]
    rounded-2xl
    overflow-hidden
mt-16
max-w-6xl
flex
flex-col

  "
          >
            <div
              className="
    flex
    items-center
    justify-between
    p-4
    border-b
    border-[var(--border)]
  "
            >
              <h2 id="resume-title" className="font-semibold text-lg">
                {t("resume")}
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 justify-around items-center mx-auto">
                <a
                  href="/Fard.Mohammadmehdi.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
      px-4 py-2
      rounded-xl
      border border-[var(--border)]
      hover:border-[var(--accent)] transition
    "
                >
                  {t("openPdf")}
                </a>

                <a
                  href="/Fard.Mohammadmehdi.pdf"
                  download
                  className="
      px-4 py-2
      rounded-xl
      bg-[var(--primary)] 
      hover:opacity-90 transition
    "
                >
                  {t("downloadResume")}
                </a>
              </div>
              <button
                type="button"
                aria-label="Close resume"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="
      hover:text-[var(--primary)]
      transition
    "
              >
                <FaTimes />
              </button>
            </div>
            <div
              className="p-6 overflow-y-auto overscroll-contain scrollbar-hide"
              style={{
                height: "calc(90vh - 80px)",
              }}
            >
              <div className="flex flex-col md:p-10 gap-5 max-w-5xl mx-auto ">
                <Image
                  src="/Resume.jpg"
                  alt="Resume"
                  priority
                  width={500}
                  height={800}
                  className=" rounded-xl shadow-xl transition duration-500 md:hover:scale-120"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
