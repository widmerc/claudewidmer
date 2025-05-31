// import { useState } from "react";
import Container from "@/app/_components/container";
import { ThemeSwitcher } from "@/app/_components/theme-switcher";
import AboutMe from "@/app/_components/AboutMe";
import CV from "@/app/_components/CV";
import TitleScreen from "@/app/_components/TitleScreen";
import BlogpostSection from "@/app/_components//BlogpostSection";


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
        {/* <BlogpostSection /> */}
        <CV />
      </Container>
    </main>
  );
}
