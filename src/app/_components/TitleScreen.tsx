"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import SkillCard from './SkillCard';
import dynamic from 'next/dynamic';

// Framer Motion dynamisch (reduziert initial JS)
const MotionPresence = dynamic(async () => {
  const mod = await import('framer-motion');
  return { default: ({ children }: { children: React.ReactNode }) => <mod.AnimatePresence mode="wait">{children}</mod.AnimatePresence> };
}, { ssr: false });
const MotionDiv = dynamic(async () => {
  const mod = await import('framer-motion');
  return { default: mod.motion.div };
}, { ssr: false });

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
  // Rotation erst nach Idle für bessere LCP
  useEffect(() => {
    const start = () => {
      const interval = setInterval(() => {
        setIndex(prev => getRandomSkill(prev));
      }, 6000);
      return () => clearInterval(interval);
    };
    // Safe feature detection with typed fallback
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(() => start());
      return () => w.cancelIdleCallback?.(id);
    }
    return start();
  }, []);

  const currentSkill = skills[index];
  // Versuche bevorzugt WebP zu laden, falle auf PNG zurück, falls 404
  const [bgSrc, setBgSrc] = useState('/img/background.webp');
  useEffect(() => {
    let cancelled = false;
    fetch('/img/background.webp', { method: 'HEAD' })
      .then(r => { if (!r.ok && !cancelled) setBgSrc('/img/background.png'); })
      .catch(() => { if (!cancelled) setBgSrc('/img/background.png'); });
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="relative w-full overflow-hidden min-h-screen flex flex-col justify-center items-center">
      {/* Hintergrundbild optimiert mit next/image für bessere LCP & automatische WebP-Auslieferung */}
      <Image
        src={bgSrc}
        alt="Abstrakter Hintergrund"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        placeholder="empty"
      />
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

      {/* Inhalt */}
  <div className="relative z-10 flex flex-col items-center text-white text-center px-6">
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
          <MotionPresence>
            <MotionDiv
              key={currentSkill.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute w-full h-full"
            >
              <SkillCard backgroundImage={currentSkill.backgroundImage} text={currentSkill.text} />
            </MotionDiv>
          </MotionPresence>
        </div>
      </div>

      {/* Scroll Hinweis mit Framer Motion */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center z-10">
        <MotionDiv
          className="flex flex-col items-center text-white/80 cursor-pointer"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
        </MotionDiv>
      </div>
    </section>
  );
}
