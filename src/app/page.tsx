// import { ThemeSwitcher } from "@/app/_components/theme-switcher";
import AboutMe from "@/app/_components/AboutMeShort";
import CV from "@/app/_components/CV";
import { TitleScreen } from "@/app/_components/TitleScreen";
import "@/app/globals.css";
import { SectionSeparator } from "./_components/section-separator";
import FadeInOnScroll from "@/app/_components/FadeInOnScroll";
import BlogPostSlider from "@/app/_components/BlogPostSlider";

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
        <BlogPostSlider />
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
