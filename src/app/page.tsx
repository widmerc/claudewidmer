"use client"
import { useState } from "react";
import Container from "@/app/_components/container";
import { ThemeSwitcher } from "@/app/_components/theme-switcher";
import AboutMe from "@/app/_components/AboutMe";
import CV from "@/app/_components/CV";
import TitleScreen from "@/app/_components/TitleScreen";


export default function Index() {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null); // Hover State für Karte

  return (
    <main>
      <div>
      <TitleScreen />
      </div>
      <Container>
        <div className="mt-10"></div>
        <AboutMe />
        {/* <ThemeSwitcher /> */}
        <CV />
      </Container>
    </main>
  );
}
