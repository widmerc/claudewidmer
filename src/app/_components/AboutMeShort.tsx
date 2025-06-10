import React from "react";
import SkillCard from "@/app/_components/SkillCard";
import PageWrapper from "@/app/_components/PageWrapper";
import Navbar from "@/app/_components/Navbar";
import AboutMeButton from "@/app/_components/Fancy_About_Me_Button";

const AboutMe: React.FC = () => {
  return (
<section id="about">
        <PageWrapper>
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Ich bin <span className="font-semibold text-accent-3 dark:text-blue-400">Claude Widmer</span> und arbeite im GIS-Bereich. Privat beschäftige ich mich mit Web-Technologien und datenbasierten Projekten.
          </p>
        </div>


        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Möchtest du mehr über mich erfahren?</h3>
          <AboutMeButton />
        </div>
      </PageWrapper>
    </section>
  );
};

export default AboutMe;
