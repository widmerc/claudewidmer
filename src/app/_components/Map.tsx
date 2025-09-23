"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import chroma from "chroma-js";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type {
  Map as LeafletMap,
  GeoJSON as LeafletGeoJSON,
  Layer,
  LayerOptions,
} from "leaflet";
import type { FeatureCollection, Feature, Geometry } from "geojson";

// GeoJSON properties for Zurich features used in this map
type ZurichFeatureProps = {
  STADTKREIS: string;
  safety_score_ML?: number | string | null;
  safety_score_RB?: number | string | null;
  [key: string]: unknown;
};

export default function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const geoJsonRef = useRef<LeafletGeoJSON | null>(null);
  const geoDataRef = useRef<
    FeatureCollection<Geometry, ZurichFeatureProps> | null
  >(null);

  const [isOpen, setIsOpen] = useState(false); // Fullscreen Overlay
  const [isLoading, setIsLoading] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [styleMode, setStyleMode] = useState<"ml" | "rule">("ml");
  const [selectedKreis, setSelectedKreis] = useState<string>("Kreis 1");
  const [basemap, setBasemap] = useState<"light" | "dark">("light");

  // Farbskala
  const scale = useMemo(() => chroma.scale("RdYlGn").domain([0, 100]), []);
  const getColor = useCallback((d: number) => scale(d).hex(), [scale]);

  // GeoJSON rendern
  const renderGeoJson = useCallback(
    async (
      L: typeof import("leaflet"),
      data: FeatureCollection<Geometry, ZurichFeatureProps>,
      kreis: string
    ) => {
      if (!mapRef.current) return;

      if (geoJsonRef.current) {
        geoJsonRef.current.remove();
        geoJsonRef.current = null;
      }

      const filtered: FeatureCollection<Geometry, ZurichFeatureProps> =
        kreis === "all"
          ? data
          : {
            ...data,
            features: data.features.filter(
              (f: Feature<Geometry, ZurichFeatureProps>) =>
                !!f.properties && f.properties.STADTKREIS === kreis
            ),
          };

      geoJsonRef.current = L.geoJSON(filtered, {
        style: (featureArg) => {
          const feature = featureArg as
            | Feature<Geometry, ZurichFeatureProps>
            | undefined;
          const raw =
            styleMode === "ml"
              ? feature?.properties?.safety_score_ML
              : feature?.properties?.safety_score_RB;
          const score = typeof raw === "string" ? parseFloat(raw) : raw ?? 0;
          return {
            color: getColor(score),
            weight: 3,
            opacity: 1,
          };
        },
        onEachFeature: (featureArg, layer: Layer) => {
          const feature = featureArg as
            | Feature<Geometry, ZurichFeatureProps>
            | undefined;
          if (feature?.properties) {
            const content = `
              <b>Kreis:</b> ${feature.properties.STADTKREIS}<br/>
              <b>ML Score:</b> ${feature.properties.safety_score_ML ?? "-"}<br/>
              <b>RB Score:</b> ${feature.properties.safety_score_RB ?? "-"}
            `;
            const layerWithPopup = layer as unknown as {
              bindPopup: (html: string) => void;
            };
            if (typeof layerWithPopup.bindPopup === "function") {
              layerWithPopup.bindPopup(content);
            }
          }
        },
      }).addTo(mapRef.current);

      if (geoJsonRef.current.getBounds().isValid()) {
        mapRef.current.fitBounds(geoJsonRef.current.getBounds());
      }

      setIsLoading(false);
    },
    [getColor, styleMode]
  );

  // Referenz behalten
  const renderGeoJsonRef = useRef(renderGeoJson);
  useEffect(() => {
    renderGeoJsonRef.current = renderGeoJson;
  }, [renderGeoJson]);

  // Map initialisieren
  const initMap = useCallback(
    async (container: HTMLDivElement) => {
      setIsLoading(true);
      const L = await import("leaflet");

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const map = L.map(container).setView([47.3769, 8.5417], 12);
      mapRef.current = map;

      // Attribution
      let attribution = `
        &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>,
        <a href="https://www.mapillary.com/">Mapillary</a>,
        <a href="https://www.stadt-zuerich.ch/">Stadt Zürich</a>,
        <a href="https://www.swisstopo.admin.ch/">swisstopo</a>,
        Claude Widmer
      `;

      // Tile Layer
      let url: string;
      const options: LayerOptions & { subdomains?: string; maxZoom?: number } =
        {};
      if (basemap === "light") {
        url =
          "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
        options.subdomains = "abcd";
        attribution += `, <a href="https://carto.com/">Carto</a>`;
        options.maxZoom = 20;
      } else {
        url =
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
        attribution += `, <a href="https://www.esri.com/">Esri</a>`;
        options.maxZoom = 20;
      }
      options.attribution = attribution;

      L.tileLayer(url, options).addTo(map);

      // Legende
      const legend = new L.Control({ position: "bottomright" });
      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        div.style.background = "white";
        div.style.padding = "6px 8px";
        div.style.borderRadius = "6px";
        div.style.boxShadow = "0 0 6px rgba(0,0,0,0.3)";
        div.innerHTML = `<b>${styleMode === "ml" ? "ML" : "RB"} Safety Score</b><br>`;

        const grades = [0, 20, 40, 60, 80, 100];
        for (let i = 0; i < grades.length; i++) {
          const from = grades[i];
          const to = grades[i + 1];
          div.innerHTML +=
            `<i style="background:${getColor(
              from + 1
            )}; width:18px; height:18px; display:inline-block; margin-right:6px;"></i>` +
            `${from}${to ? "&ndash;" + to : "+"}<br>`;
        }
        return div;
      };
      legend.addTo(map);

      // GeoJSON laden
      if (!geoDataRef.current) {
        const response = await fetch("/img/leaflet/data.geojson");
        geoDataRef.current = (await response.json()) as FeatureCollection<
          Geometry,
          ZurichFeatureProps
        >;
      }

      if (geoDataRef.current) {
        await renderGeoJsonRef.current(L, geoDataRef.current, selectedKreis);
      }

      setIsLoading(false);
      setIsMapReady(true);
    },
    [basemap, getColor, selectedKreis, styleMode]
  );

  // Style/Kreis wechseln
  useEffect(() => {
    if (mapRef.current && geoDataRef.current) {
      setIsLoading(true);
      import("leaflet").then((L) => {
        setTimeout(() => {
          renderGeoJson(
            L,
            geoDataRef.current as FeatureCollection<Geometry, ZurichFeatureProps>,
            selectedKreis
          );
        }, 50);
      });
    }
  }, [renderGeoJson, selectedKreis]);

  // Basemap wechseln
  useEffect(() => {
    if (mapRef.current && geoDataRef.current) {
      initMap(mapContainer.current!);
    }
  }, [basemap, initMap]);

  // Scroll sperren wenn Overlay offen
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (mapContainer.current && !isMapReady) {
        initMap(mapContainer.current);
      }
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, initMap, isMapReady]);

  // ESC-Taste schliesst Overlay
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setIsMapReady(false);
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      }
    }
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  // --- Return ---
  return (
    <div>
      {/* Button zum Öffnen */}
      {!isOpen && (
        <div className="w-full h-[20vh] flex items-center justify-center">
          <button
            onClick={() => setIsOpen(true)}
            className="px-8 py-3 text-xl font-semibold rounded-xl bg-accent-3 text-white shadow-lg hover:bg-accent-2"
          >
            Webkarte öffnen
          </button>

        </div>
      )}


      {/* Fullscreen Overlay mit Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[1000] bg-white flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* X Button */}
            <div className="absolute top-4 right-4 z-[1100]">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsMapReady(false);
                  if (mapRef.current) {
                    mapRef.current.remove();
                    mapRef.current = null;
                  }
                }}
                className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/60">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 border-2 border-accent-3 border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p className="text-gray-700">Karte wird geladen...</p>
                </div>
              </div>
            )}

            {/* Toolbar */}
            {isMapReady && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1050] flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-white/90 p-3 rounded-xl shadow-lg border max-w-[95%] sm:max-w-[80%]">
                <span className="hidden sm:block font-semibold text-gray-700 pr-2">
                  Konfiguration:
                </span>

                <select
                  value={styleMode}
                  onChange={(e) =>
                    setStyleMode(e.target.value as "ml" | "rule")
                  }
                  className="p-2 border rounded-lg shadow-sm hover:border-gray-400 transition"
                >
                  <option value="ml">ML (Machine Learning)</option>
                  <option value="rule">RB (Regel-basiert)</option>
                </select>

                <select
                  value={selectedKreis}
                  onChange={(e) => setSelectedKreis(e.target.value)}
                  className="p-2 border rounded-lg shadow-sm hover:border-gray-400 transition"
                >
                  <option value="all">Alle Kreise (langsam)</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={`Kreis ${i + 1}`}>
                      Kreis {i + 1}
                    </option>
                  ))}
                </select>

                <select
                  value={basemap}
                  onChange={(e) =>
                    setBasemap(e.target.value as "light" | "dark")
                  }
                  className="p-2 border rounded-lg shadow-sm hover:border-gray-400 transition"
                >
                  <option value="light">Carto Light</option>
                  <option value="dark">ArcGIS Luftbild</option>
                </select>
              </div>
            )}

            {/* Karte + Info-Box unten */}
            <motion.div
              ref={mapContainer}
              className="w-full h-full relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 text-gray-700 text-sm px-4 py-2 rounded-lg z-900 shadow-md border">
                Routing-Algorithmus ist noch nicht in die Karte eingebaut
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
