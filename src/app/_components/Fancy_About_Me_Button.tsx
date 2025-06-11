"use client";

import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { useRouter } from "next/navigation";

const FancyAboutMeButton = () => {
  const [explode, setExplode] = useState(false);
  const router = useRouter();

  const handleHover = () => {
    if (explode) return; // während der Animation kein weiterer Trigger
    setExplode(true);
    setTimeout(() => setExplode(false), 1600); // entspricht duration
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => router.push("/about")}
        onMouseEnter={handleHover}
        className="inline-flex items-center px-4 py-1 rounded-full border-2 border-accent-1 text-accent-1 font-extrabold text-lg tracking-wide bg-white shadow-md hover:bg-accent-1 hover:text-white hover:shadow-lg transition-all duration-200"
        style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}
        title="Über mich"
      >
        Mehr erfahren
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>

      {explode && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <ConfettiExplosion
            force={1}
            duration={1500}
            particleCount={20}
            width={200}
            height={500}
            colors={[
              "#c0d896",
              "#ae96d8",
              "#9fc35e",
              "#d89696",
              "#96d8ae",
              "#5e9fc3"
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default FancyAboutMeButton;
