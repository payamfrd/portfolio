"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const formHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/contact", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (data.success) {
      alert("Message sent successfully");
    } else {
      alert("Something went wrong");
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

  return (
    <div
      className="
    mt-12
    p-8
    rounded-3xl
    border
    border-slate-800
    bg-slate-900/50
  "
    >
      <form onSubmit={handleSubmit} className="mt-12 space-y-6">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={formHandler}
          className="
    w-full
    p-4
    rounded-xl
    bg-slate-900
    border
    border-slate-800
  "
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={formHandler}
          className="
    w-full
    p-4
    rounded-xl
    bg-slate-900
    border
    border-slate-800
  "
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={formHandler}
          className="
    w-full
    p-4
    rounded-xl
    bg-slate-900
    border
    border-slate-800
  "
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={formHandler}
          className="
    w-full
    p-4
    rounded-xl
    bg-slate-900
    border
    border-slate-800
  "
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={formHandler}
          className="
    w-full
    p-4
    rounded-xl
    bg-slate-900
    border
    border-slate-800
  "
        />
        <select
          name="projectType"
          value={form.projectType}
          onChange={formHandler}
          className="
    w-full
    p-4
    rounded-xl
    bg-slate-900
    border
    border-slate-800
  "
        >
          <option value="">Project Type</option>

          <option>Freelance</option>

          <option>Part-Time</option>

          <option>Full-Time</option>

          <option>Consulting</option>
        </select>
        <input
          type="text"
          name="budget"
          placeholder="Budget"
          value={form.budget}
          onChange={formHandler}
          className="
    w-full
    p-4
    rounded-xl
    bg-slate-900
    border
    border-slate-800
  "
        />
        <textarea
          rows={6}
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={formHandler}
          className="
    w-full
    p-4
    rounded-xl
    bg-slate-900
    border
    border-slate-800
  "
        />
        <a
          target="_blank"
          href={`https://wa.me/98930181747?text=${encodeURIComponent(whatsappMessage)}`}
          className="
    px-6
    py-3
    rounded-xl
    bg-green-600
    inline-block
  "
        >
          Send via WhatsApp
        </a>
      </form>
    </div>
  );
}
