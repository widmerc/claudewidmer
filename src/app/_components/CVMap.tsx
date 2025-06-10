'use client';

import { useRef, useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { Map as LeafletMap } from 'leaflet';
import { motion } from 'framer-motion';

// Leaflet Icons konfigurieren
delete (L.Icon.Default.prototype as any)._getIconUrl;
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
  const defaultPosition: [number, number] = [46.8, 8.3];

  const resetFlyTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      Object.values(markerRefs.current).forEach((marker) => marker.closeTooltip());
      setHoveredId(null);
      mapRef.current?.flyTo(defaultPosition, 8, { duration: 4 });
    }, 10000);
  };

  const handleHover = (id: string, position: [number, number]) => {
    if (typeof window === 'undefined') return;
    Object.values(markerRefs.current).forEach((marker) => marker.closeTooltip());
    setHoveredId(id);

    const isMobile = window.innerWidth < 768;
    const zoomLevel = isMobile ? 16 : 18;

    mapRef.current?.flyTo(position, zoomLevel, { duration: 2 });
    markerRefs.current[id]?.openTooltip();
    resetFlyTimeout();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    resetFlyTimeout();

    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      let currentIndex = 0;
      const flyInterval = setInterval(() => {
        const next = entries[currentIndex];
        if (next) {
          handleHover(next.id, next.position);
          currentIndex = (currentIndex + 1) % entries.length;
        }
      }, 8000);

      return () => {
        clearInterval(flyInterval);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div>
      <h2 className="text-xl font-small text-center text-gray-800 dark:text-white mb-4">
        Visuell dargestellt
      </h2>
      <div className="w-full h-[300px] md:h-[500px] rounded overflow-hidden mb-10 z-0 shadow-lg border-2 border-gray-200 dark:border-gray-700">
        <MapContainer
          center={defaultPosition}
          zoom={8}
          dragging={false}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          boxZoom={false}
          keyboard={false}
          touchZoom={false}
          style={{ height: '100%', width: '100%' }}
          ref={(instance) => {
            if (instance) mapRef.current = instance;
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {entries.map((entry) => {
            const color = entry.type === 'education' ? '#ae96d8' : '#9fc35e';
            const size = hoveredId === entry.id ? 20 : 14;

            return (
              <Marker
                key={entry.id}
                position={entry.position}
                icon={new L.DivIcon({
                  className: 'custom-icon',
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
                  className="!bg-white !text-gray-900 !rounded !px-3 !py-1 !text-sm !shadow-md dark:!bg-gray-800 dark:!text-white"
                >
                  {entry.label}
                </Tooltip>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">🎓 Bildung</h2>
          {entries.filter(e => e.type === 'education').map((entry) => (
            <motion.div
              key={entry.id}
              className="p-4 rounded-lg shadow-md transition border-2 cursor-pointer border-accent-2 hover:bg-blue-50 dark:border-blue-600"
              onMouseEnter={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => {
                  handleHover(entry.id, entry.position);
                }, 500);
              }} onMouseLeave={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                setHoveredId(null);
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{entry.label}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{entry.title}</p>
              {entry.start && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {entry.start.toLocaleDateString('de-CH', { year: 'numeric', month: 'short' })} –{' '}
                  {entry.end
                    ? entry.end.toLocaleDateString('de-CH', { year: 'numeric', month: 'short' })
                    : 'Heute'}{' '}
                  ({formatDuration(entry.start, entry.end ?? new Date())})
                </p>
              )}
              <p className="text-sm mt-2 text-gray-800 dark:text-white">{entry.details}</p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">💼 Erfahrung</h2>
          {entries.filter(e => e.type === 'experience').map((entry) => (
            <motion.div
              key={entry.id}
              className="p-4 rounded-lg shadow-md transition border-2 cursor-pointer border-accent-3 hover:bg-green-50 dark:border-green-600"
              onMouseEnter={() => handleHover(entry.id, entry.position)}
              onMouseLeave={() => setHoveredId(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{entry.label}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{entry.title}</p>
              {entry.start && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {entry.start.toLocaleDateString('de-CH', { year: 'numeric', month: 'short' })} –{' '}
                  {entry.end
                    ? entry.end.toLocaleDateString('de-CH', { year: 'numeric', month: 'short' })
                    : 'Heute'}{' '}
                  ({formatDuration(entry.start, entry.end ?? new Date())})
                </p>
              )}
              <p className="text-sm mt-2 text-gray-800 dark:text-white">{entry.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
