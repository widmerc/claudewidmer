'use client';

import React from "react";
import SkillRadar from "@/app/_components/SkillRadar";
import CV from "@/app/_components/CV";
import { SectionSeparator } from "@/app/_components/section-separator";
import FadeInOnScroll from "@/app/_components/FadeInOnScroll";
import SkillCard from "@/app/_components/SkillCard";

const About: React.FC = () => {
  const birthDate = new Date(2001, 5, 2); // 2. Juni 2001
  const now = new Date();
  const age =
    now.getFullYear() -
    birthDate.getFullYear() -
    (now < new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);

  return (
    <>
      <FadeInOnScroll>
        <SectionSeparator text="Über mich" />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <section className="max-w-3xl mx-auto text-center mb-6 px-4">
          <p className="text-md text-gray-700 leading-relaxed mb-4">
            Ich bin {age} Jahre alt, begeistere mich für Geoinformatik, räumliche Datenanalyse und moderne Webtechnologien.
            Mit Erfahrung aus Studium, Beruf und Freizeit entwickle ich datengetriebene Lösungen mit GIS, Python, R und Webtechnologien.
            Unten seht ihr eine Auswahl meiner Fähigkeiten, meines bisherigen Werdegangs sowie Stationen aus Studium, Beruf und Freizeit – interaktiv und visuell aufbereitet.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/claude-widmer-a93315251/"
              className="mx-3 text-black hover:text-blue-600 duration-200 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                  clipRule="evenodd"
                />
                <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/claudewidmer"
              className="mx-3 text-black hover:text-gray-800 duration-200 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12 0a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58v-2.24c-3.34.73-4.04-1.6-4.04-1.6a3.18 3.18 0 00-1.34-1.76c-1.1-.75.08-.74.08-.74a2.5 2.5 0 011.82 1.22 2.55 2.55 0 003.48 1 2.56 2.56 0 01.76-1.6c-2.66-.3-5.46-1.33-5.46-5.9a4.6 4.6 0 011.22-3.2 4.28 4.28 0 01.12-3.16s1-.32 3.3 1.22a11.34 11.34 0 016 0c2.28-1.54 3.3-1.22 3.3-1.22a4.28 4.28 0 01.12 3.16 4.6 4.6 0 011.22 3.2c0 4.6-2.8 5.6-5.48 5.9a2.87 2.87 0 01.82 2.22v3.3c0 .32.22.68.82.58A12 12 0 0012 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </section>
      </FadeInOnScroll>
      <FadeInOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto my-8">
          <SkillCard backgroundImage="/img/QGIS.png" text="QGIS" />
          <SkillCard backgroundImage="/img/PyQGIS.png" text="QGIS Plugins" />
          <SkillCard backgroundImage="/img/python.png" text="Python" />
          <SkillCard backgroundImage="/img/QFieldCloud.png" text="QFieldCloud" />
          <SkillCard backgroundImage="/img/QWC2.png" text="QGIS Web Client 2" />
          <SkillCard backgroundImage="/img/R.png" text="R" />
          <SkillCard backgroundImage="/img/nextjs.png" text="NextJS" />
          <SkillCard backgroundImage="/img/React.png" text="React" />
        </div>
      </FadeInOnScroll>


      <FadeInOnScroll>
        <SectionSeparator text="Meine Fähigkeiten" />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <SkillRadar />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <SectionSeparator text="Lebenslauf" className="mt-0" />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <CV />
        <SectionSeparator text="Neugierig?" className="mt-0" />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <section className="max-w-3xl mx-auto text-center mt-4 px-4 mb-12">
          <p className="text-gray-700">
            Wenn du mehr über meine Projekte erfahren möchtest, kannst du auch gerne meine Blogs durchstöbern.
          </p>
          <div className="flex justify-center mt-4">
            <a
              href="/blog_overview"
              className="px-6 py-2 bg-accent-3 text-white font-bold rounded-lg shadow-md hover:bg-accent-3 transition-colors"
            >
              Zu den Blogs
            </a>
          </div>
        </section>
      </FadeInOnScroll>
    </>
  );
};

export default About;
