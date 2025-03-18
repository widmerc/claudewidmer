import React from "react";
import SkillCard from "@/app/_components/SkillCard";

const AboutMe: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start py-4 px-4 bg-gray-10">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
        Über mich
      </h1>

      {/* Content */}
      <p className="text-base text-gray-700 dark:text-gray-300 max-w-lg text-center mb-12">
        Diese Webseite ist im Aufbau.
        Hier werde ich mehr über mich und meine Projekte teilen. Mein Fokus ist:
      </p>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 max-w-4xl w-full">

      <SkillCard
        backgroundImage="./img/QGIS.png"
        text="QGIS"
      />
        <SkillCard
        backgroundImage="./img/python.png"
        text="Python"
      />
        <SkillCard
        backgroundImage="./img/nextjs.png"
        text="Next.js"
      />
      
      <SkillCard
        backgroundImage="./img/Qwc2.png"
        text="QGisWebClient2"
      />

      <SkillCard
        backgroundImage="./img/QFieldCloud.png"
        text="QFieldCloud"
      />

      <SkillCard
        backgroundImage="./img/PyQGIS.png"
        text="QGIS Plugins"
      />

          </div>

    </div>
  );
};

export default AboutMe;