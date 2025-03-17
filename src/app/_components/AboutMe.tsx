import React from "react";

const AboutMe: React.FC = () => {
  return (
<div className="flex flex-col items-center justify-start py-4 px-4 bg-gray-10 dark:bg-slate-800 h-[60vh]">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
        Über mich
      </h1>

      {/* Content */}
      <p className="text-base text-gray-700 dark:text-gray-300 max-w-lg text-center">
        Diese Webseite ist im Aufbau. Hier werde ich mehr über mich und meine
        Projekte teilen. Bleib dran!
      </p>
      
    </div>
  );
};

export default AboutMe;
