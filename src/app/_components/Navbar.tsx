"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      id="main-header"
      className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 border-b border-gray-200 shadow-sm"
    >
      <nav className="relative mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight hover:opacity-80 transition"
        >
          Claude Widmer
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-12 items-center text-lg font-semibold text-gray-800">
          <Link href="/" className="hover:text-accent-500 transition">Home</Link>
          <Link href="/masterarbeit_public" className="hover:text-accent-500 transition">Masterarbeit</Link>
          <Link href="/blog_overview" className="hover:text-accent-500 transition">Alle Blogs</Link>
          <Link href="/about" className="hover:text-accent-500 transition">Über mich</Link>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded hover:bg-gray-100 transition"
          aria-label="Menü öffnen"
        >
          <span className="w-6 h-0.5 bg-gray-800" />
          <span className="w-6 h-0.5 bg-gray-800" />
          <span className="w-6 h-0.5 bg-gray-800" />
        </button>

        {/* Mobile Dropdown */}
        <div
          className={`absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg overflow-hidden transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            open
              ? "max-h-96 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4"
          }`}
        >
          <nav className="flex flex-col gap-4 px-6 py-6 text-lg font-semibold text-gray-800">
            <Link href="/" onClick={() => setOpen(false)} className="hover:text-accent-500 transition">
              Home
            </Link>
            <Link href="/masterarbeit" onClick={() => setOpen(false)} className="hover:text-accent-500 transition">
              Masterarbeit
            </Link>
            <Link href="/blog_overview" onClick={() => setOpen(false)} className="hover:text-accent-500 transition">
              Alle Blogs
            </Link>
            <Link href="/about" onClick={() => setOpen(false)} className="hover:text-accent-500 transition">
              Über mich
            </Link>
          </nav>
        </div>
      </nav>
    </header>
  );
}
