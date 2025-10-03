"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Map as LeafletMap, GeoJSON as LeafletGeoJSON, TileLayer } from "leaflet";
import type { FeatureCollection, Geometry } from "geojson";

// Typ für Daten
type ZurichFeatureProps = {
  STADTKREIS: string;
  safety_score_ML?: number | string | null;
  safety_score_RB?: number | string | null;
};

// QGIS-Klassenfarben
const colorClasses = [
  { min: 0, max: 20, color: "#d7191c" },
  { min: 20, max: 50, color: "#f07c4a" },
  { min: 50, max: 60, color: "#fec981" },
  { min: 60, max: 70, color: "#ffffc0" },
  { min: 70, max: 80, color: "#c4e687" },
  { min: 80, max: 90, color: "#77c35c" },
  { min: 90, max: 100, color: "#1a9641" },
];

// Hilfsfunktion für Farbe
const getColor = (val: number | null | undefined) => {
  if (val == null || isNaN(val)) return "#ccc";
  for (const c of colorClasses) {
    if (val >= c.min && val < c.max) return c.color;
  }
  return colorClasses[colorClasses.length - 1].color;
};

export default function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const tileLayerRef = useRef<TileLayer | null>(null);
  const geoJsonRef = useRef<LeafletGeoJSON | null>(null);
  const dataRef = useRef<FeatureCollection<Geometry, ZurichFeatureProps> | null>(null);
  const legendDivRef = useRef<HTMLDivElement | null>(null);
  const styleModeRef = useRef<"ml" | "rule">("ml");

  const [isOpen, setIsOpen] = useState(false);
  const [styleMode, setStyleMode] = useState<"ml" | "rule">("ml");
  const [selectedKreis, setSelectedKreis] = useState("Kreis 1");
  const [basemap, setBasemap] = useState<"light" | "dark">("light");

  // GeoJSON zeichnen/aktualisieren (vor Effekten definiert, damit als Abhängigkeit genutzt werden kann)
  const drawGeoJson = useCallback(async (L: typeof import("leaflet")) => {
    if (!mapRef.current || !dataRef.current) return;

    if (geoJsonRef.current) {
      geoJsonRef.current.remove();
    }

    const filtered =
      selectedKreis === "all"
        ? dataRef.current
        : {
            ...dataRef.current,
            features: dataRef.current.features.filter(
              (f) => f.properties?.STADTKREIS === selectedKreis
            ),
          };

    geoJsonRef.current = L.geoJSON(filtered, {
      style: (f) => {
        const raw =
          f && f.properties
            ? styleModeRef.current === "ml"
              ? f.properties.safety_score_ML
              : f.properties.safety_score_RB
            : undefined;
        const score = typeof raw === "string" ? parseFloat(raw) : raw ?? 0;
        return { color: getColor(score), weight: 3, opacity: 1 };
      },
      onEachFeature: (f, layer) => {
        const content = `
          <b>Kreis:</b> ${f.properties?.STADTKREIS}<br/>
          <b>ML Score:</b> ${f.properties?.safety_score_ML ?? "-"}<br/>
          <b>RB Score:</b> ${f.properties?.safety_score_RB ?? "-"}
        `;
        layer.bindPopup(content);
      },
    }).addTo(mapRef.current);

    if (geoJsonRef.current.getBounds().isValid()) {
      mapRef.current.fitBounds(geoJsonRef.current.getBounds());
    }
  }, [selectedKreis]);

  // Karte initialisieren
  useEffect(() => {
    if (!isOpen || !mapContainer.current || mapRef.current) return;

    (async () => {
      const L = await import("leaflet");
      await import("leaflet-control-geocoder");

      const map = L.map(mapContainer.current!).setView([47.3769, 8.5417], 12);
      mapRef.current = map;

      // TileLayer
      const tile = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd", attribution: "&copy; OSM, Carto", maxZoom: 20 }
      );
      tile.addTo(map);
      tileLayerRef.current = tile;

      // Geocoder
      L.Control.geocoder({ placeholder: "Adresse suchen...", position: "topleft" }).addTo(map);

      // Legende
      const legend = new L.Control({ position: "bottomright" });
      legend.onAdd = () => {
        const div = (legendDivRef.current = L.DomUtil.create("div", "info legend"));
        div.style.background = "white";
        div.style.padding = "6px 8px";
        div.style.borderRadius = "6px";
        div.style.boxShadow = "0 0 6px rgba(0,0,0,0.3)";
        // Inhalt wird separat anhand von styleMode aktualisiert
        div.innerHTML = "";
        colorClasses.forEach(({ min, max, color }) => {
          div.innerHTML += `<i style="background:${color};width:18px;height:18px;display:inline-block;margin-right:6px;"></i>${min} – ${max}<br>`;
        });
        return div;
      };
      legend.addTo(map);

      // Daten laden
      const res = await fetch("/img/leaflet/data_geojson.geojson");
      dataRef.current = await res.json();

      // Zeichnen
      drawGeoJson(L);
    })();
  }, [isOpen, drawGeoJson]);

  // GeoJSON zeichnen/aktualisieren
  // drawGeoJson is defined above

  // StyleMode Wechsel → nur Style neu setzen
  useEffect(() => {
    // keep ref in sync for functions using it
    styleModeRef.current = styleMode;

    if (geoJsonRef.current) {
      geoJsonRef.current.setStyle((f) => {
        if (!f || !f.properties) return { color: getColor(null), weight: 3, opacity: 1 };
        const raw =
          styleMode === "ml" ? f.properties.safety_score_ML : f.properties.safety_score_RB;
        const score = typeof raw === "string" ? parseFloat(raw) : raw ?? 0;
        return { color: getColor(score), weight: 3, opacity: 1 };
      });
    }
  }, [styleMode]);

  // Update legend title when style mode changes
  useEffect(() => {
    if (legendDivRef.current) {
      const title = `<b>${styleMode.toUpperCase()} Safety Score</b><br>`;
      // Rebuild legend content with updated title
      let body = "";
      colorClasses.forEach(({ min, max, color }) => {
        body += `<i style="background:${color};width:18px;height:18px;display:inline-block;margin-right:6px;"></i>${min} – ${max}<br>`;
      });
      legendDivRef.current.innerHTML = title + body;
    }
  }, [styleMode]);

  // Basemap wechseln → nur TileLayer austauschen
  useEffect(() => {
    if (!mapRef.current) return;
    import("leaflet").then((L) => {
      if (tileLayerRef.current) tileLayerRef.current.remove();
      const url =
        basemap === "light"
          ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      const options =
        basemap === "light"
          ? { subdomains: "abcd", attribution: "&copy; OSM, Carto", maxZoom: 20 }
          : { attribution: "&copy; Esri", maxZoom: 20 };
      tileLayerRef.current = L.tileLayer(url, options).addTo(mapRef.current!);
    });
  }, [basemap]);

  // Kreiswechsel → GeoJSON neu rendern
  useEffect(() => {
    if (mapRef.current && dataRef.current) {
      import("leaflet").then((L) => drawGeoJson(L));
    }
  }, [selectedKreis, drawGeoJson]);

  return (
    <div>
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[1000] bg-white flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Schliessen */}
            <div className="absolute top-4 right-4 z-[1100]">
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (mapRef.current) {
                    mapRef.current.remove();
                    mapRef.current = null;
                  }
                  geoJsonRef.current = null;
                  tileLayerRef.current = null;
                  dataRef.current = null;
                }}
                className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Toolbar */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1050] flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-white/90 p-3 rounded-xl shadow-lg border">
              <select
                value={styleMode}
                onChange={(e) => setStyleMode(e.target.value as "ml" | "rule")}
                className="p-2 border rounded-lg shadow-sm"
              >
                <option value="ml">ML (Machine Learning)</option>
                <option value="rule">RB (Regel-basiert)</option>
              </select>
              <select
                value={selectedKreis}
                onChange={(e) => setSelectedKreis(e.target.value)}
                className="p-2 border rounded-lg shadow-sm"
              >
                <option value="all">Alle Kreise</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={`Kreis ${i + 1}`}>
                    Kreis {i + 1}
                  </option>
                ))}
              </select>
              <select
                value={basemap}
                onChange={(e) => setBasemap(e.target.value as "light" | "dark")}
                className="p-2 border rounded-lg shadow-sm"
              >
                <option value="light">Carto Light</option>
                <option value="dark">ArcGIS Luftbild</option>
              </select>
            </div>

            {/* Karte */}
          <motion.div
            ref={mapContainer}
            className="w-full h-full relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 text-gray-700 text-sm px-4 z-1000 py-2 rounded-lg shadow-md border">
              Routing-Algorithmus ist noch nicht eingebaut
            </div>
            {selectedKreis === "all" && (
              <div className="absolute bottom-20 left-4 bg-yellow-100 text-gray-800 text-sm px-4 py-2 rounded-lg shadow-md border z-[1000]">
                Hinweis: Das Laden aller Kreise kann etwas länger dauern
              </div>
            )}
          </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
