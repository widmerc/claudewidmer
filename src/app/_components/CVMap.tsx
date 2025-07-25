'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { Map as LeafletMap } from 'leaflet';
import { motion } from 'framer-motion';

// Leaflet Icons konfigurieren
// TypeScript-safe way to delete _getIconUrl from the prototype
delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

type Entry = {
  id: string;
  label: string;
  position: [number, number];
  type: 'education' | 'experience';
  title: string;
  details: string;
  start?: Date;
  end?: Date | null;
};

type CVMapProps = {
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
};

const formatDuration = (start: Date, end: Date = new Date()) => {
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const yearStr = years > 0 ? `${years} Jahr${years > 1 ? 'e' : ''}` : '';
  const monthStr = remainingMonths > 0 ? `${remainingMonths} Monat${remainingMonths > 1 ? 'e' : ''}` : '';
  return [yearStr, monthStr].filter(Boolean).join(', ');
};

const entries: Entry[] = [
  {
    id: 'edu-1',
    label: 'Universität Zürich – MSc Geoinformation',
    position: [47.39651977104244, 8.54938501828369],
    type: 'education',
    title: 'Master of Science - MS, Geografische Informationswissenschaft und Kartografie',
    details: 'Datenverarbeitung, GitHub, GIS, R, Python, Geodaten, Räumliche Analyse, R Shiny, Quantum GIS, Maschinelles Lernen, Leaflet, Statistik, SQL, Data Science',
    start: new Date(2023, 7),
    end: null,
  },
  {
    id: 'edu-2',
    label: 'Universität Zürich – BSc Geografie',
    position: [47.39651977104244, 8.54938501828369],
    type: 'education',
    title: 'Bachelor of Science - BS, Geografie, Datenanalyse in den Naturwissenschaften',
    details: 'GitHub, GIS, R, Python, ArcGIS-Produkte, Geodaten, Räumliche Analyse, Quantum GIS, Kartografie, SQL',
    start: new Date(2020, 7),
    end: new Date(2023, 7),
  },
  {
    id: 'edu-3',
    label: 'Kantonsschule Alpenquai – Matura',
    position: [47.043029167516984, 8.32192418581824],
    type: 'education',
    title: 'Matura mit Schwerpunkt Wirtschaft und Recht',
    details: "Geografie, Maturaarbeit: 'Die Entwicklung des Hirschmatt- und Neustadtquartiers'",
    start: new Date(2013, 5),
    end: new Date(2019, 6),
  },
  {
    id: 'exp-1',
    label: 'Raumplaner – Suisseplan',
    position: [47.41647684456671, 8.553257069740399],
    type: 'experience',
    title: 'Raumplaner / GIS',
    details: 'Räumliche Analyse und Kartografie, Entwicklung von internen PyQGIS-Plugins, Multikriterienanalyse (rasterbasiert) und Sichtbarkeitsanalysen',
    start: new Date(2022, 8),
    end: null,
  },
  {
    id: 'exp-2',
    label: 'Praktikum – Planteam S AG',
    position: [47.04906390062295, 8.313668914225941],
    type: 'experience',
    title: 'Raumplaner (Praktikum)',
    details: 'Mitarbeit an Ortsplanungen, Erstellung von Statistiken, Plänen & Grafiken (QGIS, InDesign, Illustrator), Mitverfassen von Planungsberichten',
    start: new Date(2019, 7),
    end: new Date(2019, 11),
  },
];

export default function CVMap({ hoveredId, setHoveredId }: CVMapProps) {
  const [mounted, setMounted] = useState(false);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRefs = useRef<Record<string, L.Marker>>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  // const defaultPosition: [number, number] = [46.8, 8.3];
  const [activeTab, setActiveTab] = useState<'education' | 'experience'>('education');

  const bounds = L.latLngBounds(entries.map(entry => entry.position));
  const extendedBounds = bounds.pad(0.1); // Add 20% margin

  const resetFlyTimeout = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      Object.values(markerRefs.current).forEach((marker) => marker.closeTooltip());
      setHoveredId(null);
      mapRef.current?.flyToBounds(extendedBounds, { duration: 4 });
    }, 10000);
  }, [extendedBounds, setHoveredId]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    resetFlyTimeout();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [mounted, resetFlyTimeout]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
useEffect(() => {
  if (!mounted || isMobile) return;

  const runTour = async () => {
    const sequence: ('education' | 'experience')[] = ['education', 'experience'];

    while (true) {
      for (const type of sequence) {
        setActiveTab(type);

        // ⏱ Warten, bis Marker sichtbar/renderbar sind
        await new Promise(r => setTimeout(r, 300));

        const filtered = entries.filter(e => e.type === type).reverse();

        for (const entry of filtered) {
          // ✅ 1. Box sofort hervorheben
          const boxElement = document.getElementById(entry.id);
          if (boxElement) {
            boxElement.classList.add(type === 'education' ? 'bg-purple-50' : 'bg-green-50');
            setTimeout(() => {
              boxElement.classList.remove(type === 'education' ? 'bg-purple-50' : 'bg-green-50');
            }, 10000);
          }

          // ✅ 2. FlyTo (4s)
          mapRef.current?.flyTo(entry.position, 16, { duration: 4 });
          await new Promise(r => setTimeout(r, 4000));

          // ✅ 3. Tooltip öffnen
          markerRefs.current[entry.id]?.openTooltip();

          // ✅ 4. Tooltip sichtbar lassen (5s)
          await new Promise(r => setTimeout(r, 5000));
          markerRefs.current[entry.id]?.closeTooltip();

          // ✅ 5. Kurze Pause (1s)
          await new Promise(r => setTimeout(r, 1000));
        }

        // ✅ 6. Pause zwischen Bildung & Erfahrung
        await new Promise(r => setTimeout(r, 5000));
      }

      // ✅ 7. Zurück zur Startübersicht
      setActiveTab('education');
      await new Promise(r => setTimeout(r, 300)); // Wieder Marker laden lassen
      mapRef.current?.flyToBounds(extendedBounds, { duration: 4 });
      await new Promise(r => setTimeout(r, 5000));
    }
  };

  runTour();
}, [mounted, isMobile, extendedBounds]);





  if (!mounted) return null;

  return (
    <div>
      <h2 className="text-xl font-small text-center text-gray-800 mb-4">
        Visuell dargestellt
      </h2>
      <div className="w-full h-[25vh] md:h-[500px] rounded overflow-hidden mb-10 z-0 shadow-lg border-2 border-gray-200">
        <MapContainer
          bounds={extendedBounds}
          dragging={isMobile}
          zoomControl={isMobile}
          scrollWheelZoom={isMobile}
          doubleClickZoom={false}
          boxZoom={false}
          keyboard={false}
          touchZoom={isMobile}
          style={{ height: '100%', width: '100%' }}
          ref={(instance) => {
            if (instance) mapRef.current = instance;
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {entries.filter(e => !isMobile || e.type === activeTab).map((entry) => {
            const color = entry.type === 'education' ? '#ae96d8' : '#9fc35e';
            const size = hoveredId === entry.id ? 20 : 14;
            const hoverClass = entry.type === 'education' ? 'hover:bg-purple-50' : 'hover:bg-green-50';

            return (
              <Marker
                key={entry.id}
                position={entry.position}
                icon={new L.DivIcon({
                  className: `custom-icon ${hoverClass}`,
                  html: `<div style="background-color: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 6px ${color};"></div>`,
                  iconSize: [size, size],
                  iconAnchor: [size / 2, size / 2],
                  popupAnchor: [0, -size / 2],
                })}
                ref={(ref) => {
                  if (ref) markerRefs.current[entry.id] = ref;
                }}
                eventHandlers={{
                  mouseover: () => {
                    Object.values(markerRefs.current).forEach((marker) => marker.closeTooltip());
                    setHoveredId(entry.id);
                    markerRefs.current[entry.id]?.openTooltip();
                    resetFlyTimeout();
                  },
                  mouseout: () => {
                    setHoveredId(null);
                    markerRefs.current[entry.id]?.closeTooltip();
                  },
                }}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -10]}
                  className="!bg-white !text-gray-900 !rounded !px-3 !py-1 !text-sm !shadow-md"
                  permanent={hoveredId === entry.id}
                >
                  <div>
                    <p className="font-bold">{entry.title}</p>
                    {entry.start && (
                      <p>
                        {entry.start.toLocaleDateString('de-CH', { year: 'numeric', month: 'short' })} –{' '}
                        {entry.end
                          ? entry.end.toLocaleDateString('de-CH', { year: 'numeric', month: 'short' })
                          : 'Heute'}
                      </p>
                    )}
                  </div>
                </Tooltip>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {isMobile ? (
        <div className="flex justify-center mb-4">
          <div>
            <div className="flex justify-center mb-0">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className={`w-full px-6 py-3 border-2 font-bold text-gray-700 rounded-t-lg transition-colors duration-600 ${activeTab === 'education' ? 'bg-accent-2 border-accent-2 text-white' : 'bg-gray-100 border-gray-300'}`}
                onClick={() => setActiveTab('education')}
              >
                🎓 Bildung
              </motion.button>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className={`w-full px-6 py-3 border-2 font-bold text-gray-700 rounded-t-lg transition-colors duration-600 ${activeTab === 'experience' ? 'bg-accent-3 border-accent-3 text-white' : 'bg-gray-200 border-gray-300'}`}
                onClick={() => setActiveTab('experience')}
              >
                💼 Erfahrung
              </motion.button>
            </div>

            <div className="space-y-6">
              {activeTab === 'education' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="p-6 rounded-b-lg rounded-t-none shadow-md bg-[#ae96d8] text-white"
                >
                  {entries.filter(e => e.type === 'education').map((entry) => (
                    <motion.div
                      key={entry.id}
                      id={entry.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="p-6 rounded-lg shadow-lg bg-white text-black mb-4 border border-gray-300 hover:shadow-xl hover:bg-gray-50 transition-all"
                    >
                      <h3 className="text-lg font-bold text-gray-800">{entry.label}</h3>
                      <p className="text-sm text-gray-600">{entry.title}</p>
                      {entry.start && (
                        <p className="text-sm text-gray-500">
                          {entry.start.toLocaleDateString('de-CH', { year: 'numeric', month: 'short' })} –{' '}
                          {entry.end
                            ? entry.end.toLocaleDateString('de-CH', { year: 'numeric', month: 'short' })
                            : 'Heute'}{' '}
                          ({formatDuration(entry.start, entry.end ?? new Date())})
                        </p>
                      )}
                      <p className="text-sm mt-2 text-gray-800">{entry.details}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'experience' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="p-6 rounded-b-lg rounded-t-none shadow-md bg-accent-3 text-white"
                >
                  {entries.filter(e => e.type === 'experience').map((entry) => (
                    <motion.div
                      key={entry.id}
                      id={entry.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="p-6 rounded-lg shadow-lg bg-white text-black mb-4 border border-gray-300 hover:shadow-xl hover:bg-gray-50 transition-all"
                    >
                      <h3 className="text-lg font-bold text-gray-800">{entry.label}</h3>
                      <p className="text-sm text-gray-600">{entry.title}</p>
                      {entry.start && (
                        <p className="text-sm text-gray-500">
                          {entry.start.toLocaleDateString('de-CH', { year: 'numeric', month: 'short' })} –{' '}
                          {entry.end
                            ? entry.end.toLocaleDateString('de-CH', { year: 'numeric', month: 'short' })
                            : 'Heute'}{' '}
                          ({formatDuration(entry.start, entry.end ?? new Date())})
                        </p>
                      )}
                      <p className="text-sm mt-2 text-gray-800">{entry.details}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">🎓 Bildung</h2>
            {entries.filter(e => e.type === 'education').map((entry) => (
              <motion.div
                key={entry.id}
                id={entry.id} 
                className="p-4 rounded-lg shadow-md transition border-2 cursor-pointer border-accent-2 hover:bg-purple-50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-gray-800">{entry.label}</h3>
                <p className="text-sm text-gray-600">{entry.title}</p>
                {entry.start && (
                  <p className="text-sm text-gray-500">
                    {entry.start.toLocaleDateString('de-CH', { year: 'numeric', month: 'short' })} –{' '}
                    {entry.end
                      ? entry.end.toLocaleDateString('de-CH', { year: 'numeric', month: 'short' })
                      : 'Heute'}{' '}
                    ({formatDuration(entry.start, entry.end ?? new Date())})
                  </p>
                )}
                <p className="text-sm mt-2 text-gray-800">{entry.details}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">💼 Erfahrung</h2>
            {entries.filter(e => e.type === 'experience').map((entry) => (
              <motion.div
                key={entry.id}
                id={entry.id}
                className="p-4 rounded-lg shadow-md transition border-2 cursor-pointer border-accent-3 hover:bg-green-50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-gray-800">{entry.label}</h3>
                <p className="text-sm text-gray-600">{entry.title}</p>
                {entry.start && (
                  <p className="text-sm text-gray-500">
                    {entry.start.toLocaleDateString('de-CH', { year: 'numeric', month: 'short' })} –{' '}
                    {entry.end
                      ? entry.end.toLocaleDateString('de-CH', { year: 'numeric', month: 'short' })
                      : 'Heute'}{' '}
                    ({formatDuration(entry.start, entry.end ?? new Date())})
                  </p>
                )}
                <p className="text-sm mt-2 text-gray-800">{entry.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
