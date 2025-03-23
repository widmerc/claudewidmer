import React from "react";
import { format } from "date-fns";

type EducationProps = {
  institution: string;
  degree: string;
  period: string;
  skills: string;
};

type ExperienceProps = {
  position: string;
  company: string;
  period: string;
  location: string;
  description: string;
};

const today = format(new Date(), "MMMM yyyy");

const CV: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg mt-10 mb-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">Lebenslauf</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bildung */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Bildung</h2>
          <div className="space-y-4">
            <Education
              institution="Universität Zürich"
              degree="Master of Science - MS, Geografische Informationswissenschaft und Kartografie"
              period={`Jan. 2024 – ${today}`}
              skills="Datenverarbeitung, GitHub, GIS, R, Python, Geodaten, Räumliche Analyse, R Shiny, Quantum GIS, Maschinelles Lernen, Leaflet, Statistik, SQL, Data Science"
            />
            <Education
              institution="Universität Zürich"
              degree="Bachelor of Science - BS, Geografie, Datenanalyse in den Naturwissenschaften"
              period="Juni 2020 – Jan. 2024"
              skills="GitHub, GIS, R, Python, ArcGIS-Produkte, Geodaten, Räumliche Analyse, Quantum GIS, Kartografie, SQL"
            />
            <Education
              institution="Kantonsschule Alpenquai"
              degree="Matura mit Schwerpunkt Wirtschaft und Recht"
              period="Juni 2013 – Juli 2019"
              skills="Geographie, Maturaarbeit: 'Die Entwicklung des Hirschmatt- und Neustadtquartiers'"
            />
          </div>
        </section>
        
        {/* Berufserfahrung */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Berufserfahrung</h2>
          <div className="space-y-4">
            <Experience
              position="Raumplaner / GIS"
              company="suisseplan | raum + landschaft"
              period={`Sept. 2022 – ${today}`}
              location="Zürich, Schweiz"
              description="Räumliche Analyse und Kartografie"
            />
            <Experience
              position="Raumplaner (Praktikum)"
              company="Planteam S AG"
              period="Aug. 2019 – Dez. 2019 (5 Monate)"
              location="Luzern, Schweiz"
              description="Mitarbeit an Ortsplanungen, Erstellung von Statistiken, Plänen & Grafiken (QGIS, InDesign, Illustrator), Mitverfassen von Planungsberichten"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

const Education: React.FC<EducationProps> = ({ institution, degree, period, skills }) => (
  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{institution}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-300">{degree}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">{period}</p>
    <p className="text-sm mt-2 text-gray-800 dark:text-white">{skills}</p>
  </div>
);

const Experience: React.FC<ExperienceProps> = ({ position, company, period, location, description }) => (
  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{position} @ {company}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-300">{period} | {location}</p>
    <p className="text-sm mt-2 text-gray-800 dark:text-white">{description}</p>
  </div>
);

export default CV;
