'use client';

import React, { useEffect, useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import PageWrapper from './PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';


const rawSkills = [
  { subject: { short: 'GIS', long: 'Geoinformationssysteme' }, value: 90, category: ['Arbeit', 'Studium'] },
  { subject: { short: 'QGIS', long: 'QGIS' }, value: 90, category: ['Arbeit'] },
  { subject: { short: 'PyQGIS', long: 'PyQGIS' }, value: 85, category: ['Arbeit', 'Studium', 'Programmieren'] },
  { subject: { short: 'API', long: 'Geodaten (API)' }, value: 70, category: ['Arbeit'] },
  { subject: { short: 'PostGIS', long: 'PostGIS' }, value: 75, category: ['Studium'] },
  { subject: { short: 'Interlis', long: 'Interlis' }, value: 80, category: ['Arbeit'] },
  { subject: { short: 'ArcGIS', long: 'ArcGIS' }, value: 60, category: ['Arbeit', 'Studium'] },
  { subject: { short: 'R', long: 'R' }, value: 80, category: ['Studium', 'Programmieren'] },
  { subject: { short: 'Python', long: 'Python' }, value: 75, category: ['Arbeit', 'Studium', 'Programmieren'] },
  { subject: { short: 'React', long: 'React' }, value: 50, category: ['Freizeit', 'Programmieren'] },
  { subject: { short: 'Next.js', long: 'Next.js' }, value: 50, category: ['Freizeit', 'Programmieren'] },
  { subject: { short: 'RShiny', long: 'RShiny' }, value: 70, category: ['Studium', 'Programmieren'] },
  { subject: { short: 'TS', long: 'Typescript' }, value: 50, category: ['Freizeit', 'Programmieren'] },
  { subject: { short: 'CV', long: 'Computer Vision' }, value: 60, category: ['Studium'] },
  { subject: { short: 'Statistik', long: 'Statistik' }, value: 65, category: ['Arbeit', 'Studium'] },
  { subject: { short: 'Kartographie', long: 'Kartographie' }, value: 85, category: ['Arbeit', 'Studium'] },
  { subject: { short: 'Analysen', long: 'Analysen' }, value: 90, category: ['Arbeit', 'Studium'] },
  { subject: { short: 'MKA', long: 'Multikriterienanalyse' }, value: 85, category: ['Arbeit', 'Studium'] },
  { subject: { short: 'Geomedia', long: 'Geomedia' }, value: 40, category: ['Arbeit'] },
  { subject: { short: 'Raumplanung', long: 'Raumplanung' }, value: 70, category: ['Arbeit'] },
  { subject: { short: 'Webdev', long: 'Webentwicklung' }, value: 60, category: ['Freizeit'] },
  { subject: { short: 'Klavier', long: 'Klavier' }, value: 60, category: ['Freizeit'] },
  { subject: { short: 'Schwimmen', long: 'Schwimmen' }, value: 75, category: ['Freizeit'] },
  { subject: { short: 'PC-Bau', long: 'PC-Bau' }, value: 70, category: ['Freizeit'] }
];
const categories = ['Gesamt', 'Arbeit', 'Studium', 'Programmieren', 'Freizeit'] as const;

const descriptions: Record<(typeof categories)[number], string> = {
  Gesamt: 'Diese Kategorie zeigt dir einen vollständigen Überblick über alle meine Fähigkeiten – unabhängig davon, ob ich sie im Beruf, im Studium oder in der Freizeit erworben habe. Klicke auf eine spezifische Kategorie, um die entsprechenden Fähigkeiten zu filtern.',
  Arbeit: 'Während meiner beruflichen Tätigkeit bei Suisseplan Ingenieure Raum+Landschaft habe ich tiefgehende Erfahrungen in der Raumplanung, Geodatenverarbeitung, GIS-Analyse und kartographischer Darstellung gesammelt. Der Fokus lag oft auf konkreten Projekten mit PyQGIS, Interlis oder multikriteriellen Analysen.',
  Studium: 'Im Rahmen meines Geographie-Studiums an der Universität Zürich – mit Nebenfach Datenanalyse in den Naturwissenschaften – habe ich ein breites Spektrum an wissenschaftlichen und technischen Kompetenzen aufgebaut, darunter Statistik, R, Python, Computer Vision sowie raumbezogene Modellierungen.',
  Programmieren: 'Viele meiner technischen Fähigkeiten resultieren aus praktischer Programmiererfahrung – sowohl im Studium als auch in der Freizeit. Ich habe mit Python, R, TypeScript, React, Next.js und RShiny gearbeitet, inklusive Entwicklung interaktiver Visualisierungen, QGIS-Plugins und Webseiten. Diese Kenntnisse setze ich ein, um datenbasierte Lösungen effizient zu realisieren.',
  Freizeit: 'In meiner Freizeit habe ich mir zahlreiche Fertigkeiten autodidaktisch angeeignet – vom Bauen von Computern, über Webentwicklung mit modernen Technologien bis hin zum Klavierspielen und sportlichen Aktivitäten wie Schwimmen. Diese Interessen stärken mein technisches Verständnis und fördern Ausgleich und Kreativität.'
};
function useResponsiveChartSettings() {
  const [fontSize, setFontSize] = useState(9);
  const [outerRadius, setOuterRadius] = useState('60%');

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setFontSize(9);
        setOuterRadius('50%');
      } else if (width < 1024) {
        setFontSize(11);
        setOuterRadius('60%');
      } else {
        setFontSize(13);
        setOuterRadius('70%');
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return { fontSize, outerRadius };
}

export default function SkillSpiderChart() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>('Gesamt');
  const { fontSize, outerRadius } = useResponsiveChartSettings();

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  const filteredSkills =
    selectedCategory === 'Gesamt'
      ? rawSkills
      : rawSkills.filter((skill) => skill.category.includes(selectedCategory));

  const chartData = filteredSkills.map((skill) => ({
    ...skill,
    subject: skill.subject.short // immer kurze Bezeichnung, egal ob mobile oder nicht
  }));

  return (
    <PageWrapper >

      <div className="w-full max-w-6xl mx-auto p-2 sm:p-1">
                  <p className="text-xs text-gray-500 mb-2 text-center">Anklicken für eine detaillierte Ansicht der Fähigkeiten</p>

        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1 rounded-full border text-sm font-bold transition
                ${
                  selectedCategory === cat
                    ? 'bg-accent-1 text-white border-accent-1'
                    : 'bg-white text-gray-700 border-accent-3'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
<div className="w-full lg:w-2/3 h-[250px] sm:h-[300px] md:h-[400px] flex items-start">
  <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius={outerRadius} data={chartData} margin={isMobile ? { top: -70, right: 0, bottom: -70, left: 0 } : { top: -10, right: 0, bottom: -10, left: 0 }}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'currentColor', fontSize }} />
                <Radar
                  name="Skills"
                  dataKey="value"
                  stroke="#c0d896"
                  strokeWidth={2}
                  fill="#c0d896"
                  fillOpacity={0.4}

                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full lg:w-1/2 text-gray-800 text-sm sm:text-base lg:text-lg leading-relaxed">
<AnimatePresence mode="wait">
  <motion.div
    key={selectedCategory}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
  >
    <h3 className="text-lg font-semibold mb-2">Beschreibung ({selectedCategory})</h3>
    <p>{descriptions[selectedCategory]}</p>
  </motion.div>
</AnimatePresence>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-500 text-center">
  <p>Abkürzungen:</p>
  <p>
    {rawSkills
      .filter((skill) => skill.subject.short !== skill.subject.long)
      .map((skill) => `${skill.subject.short} / ${skill.subject.long}`)
      .join(' | ')}
  </p>
</div>
      </div>
    </PageWrapper>
  );
}
