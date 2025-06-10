"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Navbar() {
  return (
    <header
      id="main-header"
      className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 shadow-sm"
    >
<nav className=" mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight hover:opacity-80 transition"
        >
          Claude Widmer
        </Link>
        <div className="flex gap-12 items-center text-lg font-semibold text-gray-800 dark:text-white">
          <Link href="/about" className="hover:text-accent-500 transition">
            Über mich
          </Link>
          <Link href="/blogs" className="hover:text-accent-500 transition">
            Alle Blogs
          </Link>
        </div>
      </nav>
    </header>
  );
}
