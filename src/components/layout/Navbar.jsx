"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold">
          MF
        </Link>
        <nav className="hidden md:flex gap-8">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
