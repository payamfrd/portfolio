"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

function normalizeDigits(value = "") {
  return String(value)
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
}

function isValidPhone(value) {
  const normalized = normalizeDigits(value).replace(/[()\s.-]/g, "");

  if (!normalized) {
    return true;
  }

  return /^\+?\d{7,15}$/.test(normalized);
}

function Icon({ name, className = "h-5 w-5" }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (name) {
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c.8-3.5 3.2-5.5 7-5.5s6.2 2 7 5.5" />
        </svg>
      );

    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );

    case "phone":
      return (
        <svg {...common}>
          <path d="M6.5 3.5 9 3l2 5-2 1.5a15 15 0 0 0 5.5 5.5L16 13l5 2-.5 2.5A3 3 0 0 1 17.5 20C10 20 4 14 4 6.5a3 3 0 0 1 2.5-3Z" />
        </svg>
      );

    case "building":
      return (
        <svg {...common}>
          <path d="M4 21V5l8-2 8 2v16" />
          <path d="M8 8h1M8 12h1M8 16h1M15 8h1M15 12h1M15 16h1" />
          <path d="M10 21v-3h4v3" />
        </svg>
      );

    case "briefcase":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
        </svg>
      );

    case "wallet":
      return (
        <svg {...common}>
          <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H19a1 1 0 0 1 1 1v3H7a3 3 0 0 0 0 6h13v5H6.5A2.5 2.5 0 0 1 4 16.5v-10Z" />
          <path d="M20 8H7a3 3 0 0 0 0 6h13v-6Z" />
          <path d="M16 11h1" />
        </svg>
      );

    case "message":
      return (
        <svg {...common}>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H10l-5 4v-14.5Z" />
        </svg>
      );

    case "chevron":
      return (
        <svg {...common}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );

    case "send":
      return (
        <svg {...common}>
          <path d="m21 3-7.5 18-3.5-7-7-3.5L21 3Z" />
          <path d="M10 14 21 3" />
        </svg>
      );

    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M20 11.5A8 8 0 0 1 8.3 18.8L4 20l1.2-4.2A8 8 0 1 1 20 11.5Z" />
          <path d="M8.5 8.5c.3-.6.6-.7 1-.7h.5c.2 0 .4.1.5.4l.7 1.7c.1.3.1.5-.1.7l-.6.7c.8 1.4 1.8 2.3 3.2 3l.7-.7c.2-.2.4-.2.7-.1l1.7.8c.3.1.4.3.4.5v.5c0 .4-.1.7-.7 1-1 .5-2.5.2-4.2-.7-2.4-1.3-4.1-3-5.3-5.4-.8-1.7-1-3.2-.5-4.2Z" />
        </svg>
      );

    default:
      return null;
  }
}

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: "",
  budget: "",
  message: "",
  honeypot: "",
};

export default function ContactPage() {
  const t = useTranslations("contact");
  const params = useParams();

  const locale = params?.locale === "fa" ? "fa" : "en";

  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const whatsappMessage = useMemo(
    () =>
      [
        `${t("name")}: ${form.name}`,
        `${t("email")}: ${form.email}`,
        `${t("phone")}: ${form.phone}`,
        `${t("company")}: ${form.company}`,
        `${t("projectType.title")}: ${form.projectType}`,
        `${t("budget")}: ${form.budget}`,
        "",
        `${t("message")}:`,
        form.message,
      ].join("\n"),
    [form, t],
  );

  const canSendWhatsapp =
    Boolean(form.name.trim()) &&
    Boolean(form.email.trim()) &&
    Boolean(form.message.trim()) &&
    isValidEmail(form.email);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const company = form.company.trim();
    const budget = form.budget.trim();
    const message = form.message.trim();

    if (!name) {
      toast.error(t("nameRequired"));
      return false;
    }

    if (name.length > 100) {
      toast.error(t("nameTooLong"));
      return false;
    }

    if (!email) {
      toast.error(t("emailRequired"));
      return false;
    }

    if (email.length > 200) {
      toast.error(t("emailTooLong"));
      return false;
    }

    if (!isValidEmail(email)) {
      toast.error(t("invalidEmail"));
      return false;
    }

    if (phone.length > 50) {
      toast.error(t("phoneTooLong"));
      return false;
    }

    if (phone && !isValidPhone(phone)) {
      toast.error(t("invalidPhone"));
      return false;
    }

    if (company.length > 200) {
      toast.error(t("companyTooLong"));
      return false;
    }

    if (budget.length > 100) {
      toast.error(t("budgetTooLong"));
      return false;
    }

    if (!message) {
      toast.error(t("messageRequired"));
      return false;
    }

    if (message.length < 10) {
      toast.error(t("messageTooShort"));
      return false;
    }

    if (message.length > 3000) {
      toast.error(t("messageTooLong"));
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...form,
          locale,
        }),
      });

      let data = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.ok && data?.success) {
        toast.success(t("success"));
        setForm(INITIAL_FORM);
        return;
      }

      if (response.status === 429) {
        toast.error(t("tooManyRequests"));
        return;
      }

      if (response.status === 400) {
        const errorMap = {
          INVALID_EMAIL: "invalidEmail",
          INVALID_PHONE: "invalidPhone",
          MESSAGE_TOO_SHORT: "messageTooShort",
          MESSAGE_TOO_LONG: "messageTooLong",
          INVALID_INPUT: "error",
        };

        const messageKey = errorMap[data?.error];

        toast.error(t(messageKey || "error"));
        return;
      }

      if (response.status === 413) {
        toast.error(t("requestTooLarge"));
        return;
      }

      if (response.status === 503) {
        toast.error(t("serviceUnavailable"));
        return;
      }

      toast.error(t("error"));
    } catch {
      toast.error(t("networkError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="mx-auto mt-24 w-full max-w-5xl px-4 pb-20 sm:px-6 lg:px-8"
      aria-labelledby="contact-form-title"
    >
      <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
        <div className="border-b border-[var(--border)] p-6 sm:p-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1
              id="contact-form-title"
              className="text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl"
            >
              {t("title")}
            </h1>

            <p className="mt-3 leading-7 text-[var(--muted)]">
              {t("description")}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-5 sm:p-8">
          <div aria-hidden="true" className="hidden">
            <label htmlFor="contact-honeypot">Website</label>
            <input
              id="contact-honeypot"
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={updateField}
              autoComplete="off"
              tabIndex={-1}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block text-sm font-semibold text-[var(--text)]"
              >
                {t("name")}
                <span className="ms-1 text-red-500">*</span>
              </label>

              <div className="relative">
                <Icon
                  name="user"
                  className={`pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)] ${
                    locale === "fa" ? "right-4" : "left-4"
                  }`}
                />

                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  autoComplete="name"
                  maxLength={100}
                  required
                  placeholder={t("namePlaceholder")}
                  className={`min-h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] transition focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 ${
                    locale === "fa" ? "pr-12 pl-4" : "pl-12 pr-4"
                  }`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block text-sm font-semibold text-[var(--text)]"
              >
                {t("email")}
                <span className="ms-1 text-red-500">*</span>
              </label>

              <div className="relative">
                <Icon
                  name="mail"
                  className={`pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)] ${
                    locale === "fa" ? "right-4" : "left-4"
                  }`}
                />

                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  autoComplete="email"
                  maxLength={200}
                  required
                  inputMode="email"
                  placeholder={t("emailPlaceholder")}
                  className="min-h-12 text-start w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-12 text-[var(--text)] transition focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className="mb-2 block text-sm font-semibold text-[var(--text)]"
              >
                {t("phone")}
              </label>

              <div className="relative">
                <Icon
                  name="phone"
                  className={`pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)] ${
                    locale === "fa" ? "right-4" : "left-4"
                  }`}
                />

                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={updateField}
                  autoComplete="tel"
                  maxLength={50}
                  inputMode="tel"
                  placeholder={t("phonePlaceholder")}
                  className="min-h-12 text-start in-rtl:text-right w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-12 text-[var(--text)] transition focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-company"
                className="mb-2 block text-sm font-semibold text-[var(--text)]"
              >
                {t("company")}
              </label>

              <div className="relative">
                <Icon
                  name="building"
                  className={`pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)] ${
                    locale === "fa" ? "right-4" : "left-4"
                  }`}
                />

                <input
                  id="contact-company"
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={updateField}
                  autoComplete="organization"
                  maxLength={200}
                  placeholder={t("companyPlaceholder")}
                  className={`min-h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] transition focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 ${
                    locale === "fa" ? "pr-12 pl-4" : "pl-12 pr-4"
                  }`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-project-type"
                className="mb-2 block text-sm font-semibold text-[var(--text)]"
              >
                {t("projectType.title")}
              </label>

              <div className="relative">
                <Icon
                  name="briefcase"
                  className={`pointer-events-none absolute top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-[var(--muted)] ${
                    locale === "fa" ? "right-4" : "left-4"
                  }`}
                />

                <select
                  id="contact-project-type"
                  name="projectType"
                  value={form.projectType}
                  onChange={updateField}
                  className={`min-h-12 w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] transition focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 ${
                    locale === "fa" ? "pr-12 pl-11" : "pl-12 pr-11"
                  }`}
                >
                  <option value="">{t("projectType.placeholder")}</option>
                  <option value="freelance">
                    {t("projectType.freelance")}
                  </option>
                  <option value="partTime">{t("projectType.partTime")}</option>
                  <option value="fullTime">{t("projectType.fullTime")}</option>
                  <option value="consulting">
                    {t("projectType.consulting")}
                  </option>
                </select>

                <Icon
                  name="chevron"
                  className={`pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)] ${
                    locale === "fa" ? "left-4" : "right-4"
                  }`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-budget"
                className="mb-2 block text-sm font-semibold text-[var(--text)]"
              >
                {t("budget")}
              </label>

              <div className="relative">
                <Icon
                  name="wallet"
                  className={`pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)] ${
                    locale === "fa" ? "right-4" : "left-4"
                  }`}
                />

                <input
                  id="contact-budget"
                  type="text"
                  name="budget"
                  value={form.budget}
                  onChange={updateField}
                  maxLength={100}
                  placeholder={t("budgetPlaceholder")}
                  className={`min-h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] transition focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 ${
                    locale === "fa" ? "pr-12 pl-4" : "pl-12 pr-4"
                  }`}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-semibold text-[var(--text)]"
              >
                {t("message")}
                <span className="ms-1 text-red-500">*</span>
              </label>

              <div className="relative">
                <Icon
                  name="message"
                  className={`pointer-events-none absolute top-4 h-5 w-5 text-[var(--muted)] ${
                    locale === "fa" ? "right-4" : "left-4"
                  }`}
                />

                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={updateField}
                  required
                  maxLength={3000}
                  rows={6}
                  placeholder={t("messagePlaceholder")}
                  className={`min-h-40 w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--bg)] py-4 text-[var(--text)] transition focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 ${
                    locale === "fa" ? "pr-12 pl-4" : "pl-12 pr-4"
                  }`}
                />
              </div>

              <div
                className="mt-2 text-xs text-[var(--muted)]"
                aria-live="polite"
              >
                {form.message.length}/3000
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon
                name="send"
                className={`h-5 w-5 ${loading ? "animate-pulse" : ""}`}
              />

              <span>{loading ? t("sending") : t("send")}</span>
            </button>

            <a
              href={`https://wa.me/989301801747?text=${encodeURIComponent(
                whatsappMessage,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!canSendWhatsapp || loading}
              onClick={(event) => {
                if (!canSendWhatsapp || loading) {
                  event.preventDefault();
                  toast.error(t("completeFormForWhatsapp"));
                }
              }}
              className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-green-600 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card)] dark:text-green-400 dark:hover:text-white ${
                !canSendWhatsapp || loading
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              <Icon name="whatsapp" className="h-5 w-5" />
              <span>{t("whatsapp")}</span>
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
