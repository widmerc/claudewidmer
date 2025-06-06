'use client';

import Link from "next/link";
import PageWrapper from "@/app/_components/PageWrapper";
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
<PageWrapper className="py-4 bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-xl rounded-xl">
      <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        {/* Logo mit Motion-Animation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="text-2xl font-extrabold text-accent-3 dark:text-green-400 hover:text-accent-2 dark:hover:text-accent-2 transition duration-300 tracking-tight"
          >
            claudewidmer.ch
          </Link>
        </motion.div>

        {/* Navigation mit Hover-Effekt */}
        <div className="flex gap-6 text-base font-medium text-gray-700 dark:text-gray-200">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About me" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative group transition-colors duration-300 hover:text-accent-2 dark:hover:text-green-400"
            >
              {label}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-accent-2 dark:bg-green-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </nav>
    </PageWrapper>
  );
}
