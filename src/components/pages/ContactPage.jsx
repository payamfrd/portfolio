"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const t = useTranslations("contact");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
    honeypot: "",
  });

  const formHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Name
    if (!form.name.trim()) {
      toast.error(t("nameRequired"));
      return;
    }

    // Email
    if (!form.email.trim()) {
      toast.error(t("emailRequired"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      toast.error(t("invalidEmail"));
      return;
    }

    // Message
    if (!form.message.trim()) {
      toast.error(t("messageRequired"));
      return;
    }

    if (form.message.trim().length < 10) {
      toast.error(t("messageTooShort"));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(t("success"));
        setForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          projectType: "",
          budget: "",
          message: "",
          honeypot: "",
        });
      } else {
        if (response.status === 429) {
          toast.error(t("tooManyRequests"));
          return;
        }
        toast.error(t("error"));
      }
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = `Name: ${form.name}

Email: ${form.email}

Phone: ${form.phone}

Company: ${form.company}

Project Type: ${form.projectType}

Budget: ${form.budget}

Message:
${form.message}`;

  const canSendWhatsapp =
    form.name.trim() && form.email.trim() && form.message.trim();

  return (
    <div
      className="
    mt-12
    p-8
    rounded-3xl
    border
    border-[var(--border)]
bg-[var(--card)]
  "
    >
      <form onSubmit={handleSubmit} className="mt-12 space-y-6">
        <input
          type="text"
          name="honeypot"
          value={form.honeypot}
          onChange={formHandler}
          autoComplete="off"
          tabIndex={-1}
          className="hidden"
        />

        <input
          type="text"
          name="name"
          placeholder={t("name")}
          value={form.name}
          onChange={formHandler}
          autoComplete="name"
          aria-label={t("name")}
          className="
    w-full
    p-4
    rounded-xl
    bg-[var(--card)]
border
border-[var(--border)]

focus:outline-none
focus:border-[var(--primary)]

transition
  "
        />
        <input
          type="email"
          name="email"
          placeholder={t("email")}
          value={form.email}
          onChange={formHandler}
          autoComplete="email"
          aria-label={t("email")}
          className="
    w-full
    p-4
    rounded-xl
    bg-[var(--card)]
border
border-[var(--border)]

focus:outline-none
focus:border-[var(--primary)]

transition
  "
        />
        <input
          type="tel"
          name="phone"
          placeholder={t("phone")}
          value={form.phone}
          onChange={formHandler}
          autoComplete="tel"
          aria-label={t("phone")}
          className="
    w-full
    p-4
    rounded-xl
    bg-[var(--card)]
border
border-[var(--border)]

focus:outline-none
focus:border-[var(--primary)]

transition
  "
        />
        <input
          type="text"
          name="company"
          placeholder={t("company")}
          value={form.company}
          onChange={formHandler}
          autoComplete="organization"
          aria-label={t("company")}
          className="
    w-full
    p-4
    rounded-xl
    bg-[var(--card)]
border
border-[var(--border)]

focus:outline-none
focus:border-[var(--primary)]

transition
  "
        />
        <select
          name="projectType"
          value={form.projectType}
          onChange={formHandler}
          aria-label={t("projectType.title")}
          className="
    w-full
    p-4
    rounded-xl
    bg-[var(--card)]
border
border-[var(--border)]

focus:outline-none
focus:border-[var(--primary)]

transition
  "
        >
          <option value="">{t("projectType.title")}</option>

          <option>{t("projectType.freelance")}</option>

          <option>{t("projectType.partTime")}</option>

          <option>{t("projectType.fullTime")}</option>

          <option>{t("projectType.consulting")}</option>
        </select>
        <input
          type="text"
          name="budget"
          placeholder={t("budget")}
          value={form.budget}
          onChange={formHandler}
          aria-label={t("budget")}
          className="
    w-full
    p-4
    rounded-xl
    bg-[var(--card)]
border
border-[var(--border)]

focus:outline-none
focus:border-[var(--primary)]

transition
  "
        />
        <textarea
          rows={6}
          name="message"
          placeholder={t("message")}
          value={form.message}
          onChange={formHandler}
          aria-label={t("message")}
          autoComplete="off"
          className="
    w-full
    p-4
    rounded-xl
    bg-[var(--card)]
border
border-[var(--border)]

focus:outline-none
focus:border-[var(--primary)]

transition
resize-none
  "
        />
        <button
          type="submit"
          disabled={loading}
          className="
    px-6
    py-3
    rounded-xl
    bg-[var(--primary)]
    text-white
    hover:opacity-90
    transition
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
        >
          {loading ? t("sending") : t("send")}
        </button>

        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://wa.me/989301801747?text=${encodeURIComponent(
            whatsappMessage,
          )}`}
          className={`
    px-6
    py-3
    rounded-xl
    bg-green-600
    inline-block
    transition

    ${!canSendWhatsapp || loading ? "pointer-events-none opacity-50" : ""}
  `}
        >
          {t("whatsapp")}
        </a>
      </form>
    </div>
  );
}
