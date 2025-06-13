"use client";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import styles from './switch.module.css';

const STORAGE_KEY = "nextjs-blog-starter-theme";
const modes: ("dark" | "light")[] = ["dark", "light"];

declare global {
  var updateDOM: () => void;
}

export const NoFOUCScript = (storageKey: string) => {
  const [DARK, LIGHT] = ["dark", "light"];

  const modifyTransition = () => {
    const css = document.createElement("style");
    css.textContent = "*,*:after,*:before{transition:none !important;}"; 
    document.head.appendChild(css);

    return () => {
      getComputedStyle(document.body);
      setTimeout(() => document.head.removeChild(css), 1);
    };
  };

  window.updateDOM = () => {
    const restoreTransitions = modifyTransition();
    const mode = localStorage.getItem(storageKey) ?? LIGHT;
    const classList = document.documentElement.classList;
    if (mode === DARK) classList.add(DARK);
    else classList.remove(DARK);
    document.documentElement.setAttribute("data-mode", mode);
    restoreTransitions();
  };
  window.updateDOM();
};

const Switch = () => {
  const [mode, setMode] = useState<"dark" | "light">(
    () =>
      ((typeof localStorage !== "undefined" &&
        localStorage.getItem(STORAGE_KEY)) ?? 
        "light") as "dark" | "light"
  );

  useEffect(() => {
    // Sicherstellen, dass window.updateDOM existiert
    if (typeof window !== "undefined" && window.updateDOM) {
      const updateDOM = window.updateDOM;
    }

    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key === STORAGE_KEY) {
        setMode(e.newValue as "dark" | "light");
      }
    };

    addEventListener("storage", handleStorageChange);

    return () => {
      removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.updateDOM) {
      localStorage.setItem(STORAGE_KEY, mode);
      window.updateDOM();
    }
  }, [mode]);

  const handleModeSwitch = () => {
    const index = modes.indexOf(mode);
    setMode(modes[(index + 1) % modes.length]);
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.toggle}
        onClick={handleModeSwitch}
        layout
      >
        <motion.div
          className={styles.circle}
          layout
          initial={{ x: mode === "dark" ? 36 : 2 }}
          animate={{ x: mode === "dark" ? 36 : 2 }}
          transition={{ type: "spring", stiffness: 700, damping: 20 }}
        >
          <AnimatePresence mode="wait">
            {mode === "dark" ? (
              <motion.div
                key="moon"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Moon size={20} className="text-yellow-400" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Sun size={20} className="text-yellow-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

const Script = memo(function Script() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(${NoFOUCScript.toString()})('${STORAGE_KEY}')`,
      }}
    />
  );
});

export const ThemeSwitcher = () => {
  return (
    <>
      <Script />
      <Switch />
    </>
  );
};
