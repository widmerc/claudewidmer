"use client";

import React, { useEffect, useState } from 'react';
import SkillCard from './SkillCard';
import { AnimatePresence, motion } from 'framer-motion';

const skills = [
  { backgroundImage: "/img/QGIS.png", text: "QGIS" },
  { backgroundImage: "/img/PyQGIS.png", text: "QGIS Plugins" },
  { backgroundImage: "/img/python.png", text: "Python" },
  { backgroundImage: "/img/QWC2.png", text: "QGisWebClient2" },
  { backgroundImage: "/img/QFieldCloud.png", text: "QFieldCloud" },
  { backgroundImage: "/img/nextjs.png", text: "Next.js" },
];

function getRandomSkill(excludeIndex: number) {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * skills.length);
  } while (newIndex === excludeIndex);
  return newIndex;
}

export function TitleScreen() {
  const [index, setIndex] = useState(0);
  const [availableHeight, setAvailableHeight] = useState<number | null>(null);

  // Höhe dynamisch berechnen basierend auf dem Header
useEffect(() => {
  const updateHeight = () => {
    const header = document.getElementById("main-header");
    const headerHeight = header?.offsetHeight || 0;

    // visualViewport ist in Safari/iOS zuverlässiger als innerHeight
    const vv = window.visualViewport;
    const viewportHeight = vv?.height ?? window.innerHeight;

    setAvailableHeight(viewportHeight - headerHeight);
  };

  updateHeight();

  const vv = window.visualViewport;
  vv?.addEventListener("resize", updateHeight);
  vv?.addEventListener("scroll", updateHeight); // URL-Bar Ein-/Ausfahren
  window.addEventListener("orientationchange", updateHeight);

  return () => {
    vv?.removeEventListener("resize", updateHeight);
    vv?.removeEventListener("scroll", updateHeight);
    window.removeEventListener("orientationchange", updateHeight);
  };
}, []);

  // SkillCard rotieren
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => getRandomSkill(prev));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentSkill = skills[index];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: availableHeight ? `${availableHeight}px` : "100dvh" }}
    >
      {/* Hintergrundbild */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url(/img/background.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

      {/* Inhalt */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-xl">
          Claude Widmer
        </h1>
        <p className="text-lg md:text-2xl mt-4 text-white/90">
          GIS-Enthusiast | QGIS | Data Science | Web-GIS
        </p>
        <p className="mt-2 text-white/70 text-sm md:text-base italic mb-0">
          Tools, die ich nutze:
        </p>

        {/* SkillCard mit Animation */}
        <div className="mt-4 w-64 h-40 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSkill.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute w-full h-full"
            >
              <SkillCard
                backgroundImage={currentSkill.backgroundImage}
                text={currentSkill.text}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll Hinweis mit Framer Motion */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center z-10">
        <motion.div
          className="flex flex-col items-center text-white/80 cursor-pointer"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19l-7-7h14z" />
          </svg>
          <span className="text-m mt-2 mb-4">Scroll down</span>
        </motion.div>
      </div>
    </section>
  );
}
