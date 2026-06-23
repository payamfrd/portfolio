"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Menu, X } from "lucide-react";

// Dark/Light mode
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur max-md:backdrop-blur-xl max-md:bg-slate-950/70 ">
      {/* Mobile Responsive */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 right-0 absolute"
      >
        {isOpen ? <X /> : <Menu />}
      </button>
      {isOpen && (
        <div
          className="
        md:hidden
        border-t
        border-slate-800
        bg-slate-950
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
            <a href="#about" onClick={() => setIsOpen(false)}>
              About
            </a>

            <a href="#skills" onClick={() => setIsOpen(false)}>
              Skills
            </a>

            <a href="#projects" onClick={() => setIsOpen(false)}>
              Projects
            </a>

            <Link href="/blog" onClick={() => setIsOpen(false)}>
              Blog
            </Link>

            <Link href="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/profile.jpg"
            alt="Mohammadmehdi Fard"
            width={50}
            height={50}
            className="
      rounded-full
      object-cover
      border
      border-slate-700
    "
          />
          <div className="hidden md:block">
            <p className="font-semibold">Mohammadmehdi Fard</p>

            <p className="text-xs text-slate-400">Front-End Developer</p>
          </div>
        </Link>

        <nav className="hidden md:flex gap-8">
          <a href="#about" className="hover:text-blue-400 transition">
            About
          </a>
          <a href="#skills" className="hover:text-blue-400 transition">
            Skills
          </a>
          <a href="#projects" className="hover:text-blue-400 transition">
            Projects
          </a>
          <Link href="/blog" className="hover:text-blue-400 transition">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-blue-400 transition">
            Contact
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
