import React from "react";
import SkillCard from "@/app/_components/SkillCard";
import PageWrapper from "@/app/_components/PageWrapper";
import Navbar from "@/app/_components/Navbar";
import FancyAboutMeButton from "@/app/_components/Fancy_About_Me_Button";

const AboutMe: React.FC = () => {
  return (
<PageWrapper>
  <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800 dark:text-white">
    Hallo 🗺️
  </h1>

  <p className="text-lg text-center text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
    Ich bin <span className="font-semibold text-accent-3 dark:text-blue-400">Claude Widmer</span> und arbeite im GIS-Bereich.  
    Privat beschäftige ich mich mit Web-Technologien und datenbasierten Projekten.
  </p>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4 w-full mx-auto mb-12">
    <SkillCard backgroundImage="/img/QGIS.png" text="QGIS" />
    <SkillCard backgroundImage="/img/PyQGIS.png" text="QGIS Plugins" />
    <SkillCard backgroundImage="/img/python.png" text="Python" />
    <SkillCard backgroundImage="/img/QWC2.png" text="QGisWebClient2" />
    <SkillCard backgroundImage="/img/QFieldCloud.png" text="QFieldCloud" />
    <SkillCard backgroundImage="/img/nextjs.png" text="Next.js" />
  </div>

  <div className="text-center mb-10">
    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
      Möchtest du mehr über mich erfahren?
    </h3>
  <FancyAboutMeButton />
  </div>

</PageWrapper>

  );
};

export default AboutMe;
