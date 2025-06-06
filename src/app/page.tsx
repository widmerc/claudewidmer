// import { useState } from "react";
import Container from "@/app/_components/container";
import { ThemeSwitcher } from "@/app/_components/theme-switcher";
import AboutMe from "@/app/_components/AboutMeShort";
import CV from "@/app/_components/CV";
import TitleScreen from "@/app/_components/TitleScreen";
import BlogpostSection from "@/app/_components//BlogpostSection";
import "@/app/globals.css";
import Navbar from "@/app/_components/Navbar";


export default function Index() {

  return (
    <main>
      <div>
      <TitleScreen />
      </div>

      <Container>
        <div className="mt-10"></div>
        <AboutMe />
        {/* <ThemeSwitcher /> */}
        {/* <div className="mt-10"></div> */}
        <BlogpostSection />
        <CV />
      </Container>
    </main>
  );
}
