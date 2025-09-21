"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import chroma from "chroma-js";
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
  // allow additional properties without using `any`
  [key: string]: unknown;
};

export default function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const geoJsonRef = useRef<LeafletGeoJSON | null>(null);
  const geoDataRef = useRef<
    FeatureCollection<Geometry, ZurichFeatureProps> | null
  >(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [styleMode, setStyleMode] = useState<"ml" | "rule">("ml");
  const [selectedKreis, setSelectedKreis] = useState<string>("Kreis 1");
  const [basemap, setBasemap] = useState<"light" | "dark">("light");

  // Farbskala
  const scale = useMemo(() => chroma.scale("RdYlGn").domain([0, 100]), []);
  const getColor = useCallback((d: number) => scale(d).hex(), [scale]);
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

      // Filter features
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
            // Safely bind popup if available
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

  // Keep a stable reference to the latest renderGeoJson without forcing initMap to change
  const renderGeoJsonRef = useRef(renderGeoJson);
  useEffect(() => {
    renderGeoJsonRef.current = renderGeoJson;
  }, [renderGeoJson]);

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

      // Basis-Attribution
      let attribution = `
        &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>,
        <a href="https://www.mapillary.com/">Mapillary</a>,
        <a href="https://www.stadt-zuerich.ch/">Stadt Zürich</a>,
        <a href="https://www.swisstopo.admin.ch/">swisstopo</a>,
        Claude Widmer
      `;

      // Tile Layer wählen
      let url: string;
      const options: LayerOptions & { subdomains?: string; maxZoom?: number } = {};
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
        div.innerHTML = `<b>${styleMode === "ml" ? "ML" : "RB"} Score</b><br>`;

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
    [basemap, getColor, selectedKreis]
  );

  // Effekt: Style/Kreis wechseln
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

  // Effekt: Basemap wechseln
  useEffect(() => {
    if (mapRef.current && geoDataRef.current) {
      initMap(mapContainer.current!);
    }
  }, [basemap, initMap]);

  // --- einziges Return der Komponente ---
  return (
    <div className="relative w-full h-[600px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/60">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 border-2 border-accent-3 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-gray-700">Karte wird geladen...</p>
          </div>
        </div>
      )}

      {!isMapReady && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/80 rounded-xl shadow-lg border-2 border-accent-3">
          <button
            onClick={() => initMap(mapContainer.current!)}
            className="px-6 py-3 rounded-lg bg-accent-3 text-white shadow-lg"
          >
            Karte laden
          </button>
        </div>
      )}

      {isMapReady && (
        <div className="absolute top-4 right-4 z-[1000] flex gap-2 bg-white/90 p-2 rounded-lg shadow-lg border">
          {/* Buttons ML / RB */}
          <button
            className={`px-3 py-1 rounded ${
              styleMode === "ml"
                ? "bg-accent-3 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setStyleMode("ml")}
          >
            ML
          </button>
          <button
            className={`px-3 py-1 rounded ${
              styleMode === "rule"
                ? "bg-accent-3 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setStyleMode("rule")}
          >
            RB
          </button>

          {/* Auswahl Kreise */}
          <select
            value={selectedKreis}
            onChange={(e) => setSelectedKreis(e.target.value)}
            className="ml-2 p-1 border rounded"
          >
            <option value="all">Alle Kreise (langsam)</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={`Kreis ${i + 1}`}>
                Kreis {i + 1}
              </option>
            ))}
          </select>

          {/* Basemap Auswahl */}
          <select
            value={basemap}
            onChange={(e) => setBasemap(e.target.value as "light" | "dark")}
            className="ml-2 p-1 border rounded"
          >
            <option value="light">Carto Light</option>
            <option value="dark">ArcGIS Luftbild</option>
          </select>
        </div>
      )}

      {/* Karte */}
      <div
        ref={mapContainer}
        className="w-full h-full rounded-xl shadow-lg border-2 border-gray-300"
      />
    </div>
  );
}
