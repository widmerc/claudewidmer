// import { useState } from "react";
import Container from "@/app/_components/container";
import { ThemeSwitcher } from "@/app/_components/theme-switcher";
import AboutMe from "@/app/_components/AboutMeShort";
import CV from "@/app/_components/CV";
import { TitleScreen } from "@/app/_components/TitleScreen";
import BlogPostSection from "@/app/_components/BlogPostSection";
import Navbar from "@/app/_components/Navbar";
import PageWrapper from "./_components/PageWrapper";
import { SectionSeparator } from "./_components/section-separator";
import FadeInOnScroll from "@/app/_components/FadeInOnScroll";

export default function Index() {

  return (
    <main>
      <div>
        <TitleScreen />
      </div>
      <FadeInOnScroll>
        <SectionSeparator text="Hallo 🗺️" />
      </FadeInOnScroll>

      <div className="mt-10"></div>
      <FadeInOnScroll>
        <AboutMe />
      </FadeInOnScroll>

      <FadeInOnScroll>

        <SectionSeparator text="Blogposts" />
      </FadeInOnScroll>


      {/* <ThemeSwitcher /> */}
      <FadeInOnScroll>
        <BlogPostSection />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <SectionSeparator text="Mein Lebenslauf" />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <CV />
      </FadeInOnScroll>

    </main>
  );
}
