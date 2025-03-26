import React from "react";
import SkillCard from "@/app/_components/SkillCard";

const AboutMe: React.FC = () => {
  return (
    <div className="max-w-9xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg mt-10 mb-12">

      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Über mich
      </h1>

      {/* Content */}
      <p className="text-base text-center mb-6 text-gray-800 dark:text-white">
        Diese Webseite ist im Aufbau.        Hier werde ich mehr über mich und meine Projekte teilen. Mein Fokus ist:
      </p>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 max-w-4xl w-full mx-auto">

      <SkillCard
        backgroundImage="./img/QGIS.png"
        text="QGIS"
      />
            <SkillCard
        backgroundImage="./img/PyQGIS.png"
        text="QGIS Plugins"
      />
        <SkillCard
        backgroundImage="./img/python.png"
        text="Python"
      />
      
      <SkillCard
        backgroundImage="./img/QWC2.png"
        text="QGisWebClient2"
      />

      <SkillCard
        backgroundImage="./img/QFieldCloud.png"
        text="QFieldCloud"
      />

    <SkillCard
        backgroundImage="./img/nextjs.png"
        text="Next.js"
      />


          </div>

    </div>
  );
};

export default AboutMe;