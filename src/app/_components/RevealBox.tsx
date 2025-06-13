"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RevealBoxProps {
  title: string;
  children: React.ReactNode;
}

const RevealBox: React.FC<RevealBoxProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-6 border-3 border-accent-1 rounded-lg bg-white/80 shadow-md">
      <button
        className="w-full text-left px-4 py-3 font-semibold hover:bg-accent-1/10 focus:outline-none focus:ring-2 focus:ring-accent-1 rounded-t-lg flex items-center justify-between"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className="ml-2 text-xl">{open ? "▲" : "▼"}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 py-4 border-t border-accent-1 bg-white dark:bg-gray-900 rounded-b-lg">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RevealBox;
