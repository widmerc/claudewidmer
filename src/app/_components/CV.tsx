import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";

// Function to convert coordinates to image coordinates
const convertToImageCoords = (
  easting: number,
  northing: number,
  minEasting: number,
  maxEasting: number,
  minNorthing: number,
  maxNorthing: number,
  imgWidth: number,
  imgHeight: number
): { x: number; y: number } => {
  const x = ((easting - minEasting) / (maxEasting - minEasting)) * imgWidth;
  const y = imgHeight - ((northing - minNorthing) / (maxNorthing - minNorthing)) * imgHeight;
  return { x, y };
};


const CV: React.FC = () => {
  const [hoveredLocation, setHoveredLocation] = useState<{ x: number; y: number } | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<"education" | "experience" | null>(null);

  const mapRef = useRef<HTMLImageElement | null>(null);

// State to hold image dimensions
const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

// Update image dimensions dynamically when loaded and on window resize
useEffect(() => {
  const updateImageDimensions = () => {
    if (mapRef.current) {
      const { width, height } = mapRef.current.getBoundingClientRect();
      setImageDimensions({ width, height });
    }
  };

  // Initial dimension calculation when component mounts
  updateImageDimensions();

  // Add event listener for window resize to update dimensions when resizing
  window.addEventListener("resize", updateImageDimensions);

  // Clean up the event listener on unmount
  return () => {
    window.removeEventListener("resize", updateImageDimensions);
  };
}, []); // Empty dependency array means it only runs on mount and unmount


  return (
    <div className="max-w-9xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg mt-10 mb-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">Lebenslauf</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Karte - nimmt 1/2 des Bildschirms auf großen Bildschirmen */}
        <div className="lg:col-span-2 w-full">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Karte</h2>
          <div className="relative">
          <div className="w-full relative">

            <Image
              src="/img/switzerland.png"
              alt="Map of Switzerland"
              layout="responsive"
              width={500}  // Standard Breite
              height={400} // Standard Höhe
              className="border border-gray-400 rounded"
              ref={mapRef}
            />
      </div>

            {/* Marker für Städte */}
            {hoveredLocation && imageDimensions.width && imageDimensions.height && (
              <motion.div
                className={`absolute w-4 h-4 rounded-full ${hoveredCategory === "education" ? "bg-accent-3" : "bg-accent-2"
                  }`} 
                style={{
                  left: `${hoveredLocation.x}px`,
                  top: `${hoveredLocation.y}px`,
                  transform: "translate(-50%, -50%)",
                  opacity: 0.9, // Marker transparent
                }}
                animate={{ scale: 2, opacity: 0.5 }}
                transition={{ duration: 0.4 }}
                // Variablen für die Animation
                initial={{ scale: 10, opacity: 0 }}
              />
            )} 
          </div>
        </div>

        {/* Bildung - nimmt 1/4 des Bildschirms auf großen Bildschirmen */}
        <div className="lg:col-span-1 w-full">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Bildung</h2>
            <div className="space-y-4">
              <Education
                institution="Universität Zürich"
                degree="Master of Science - MS, Geografische Informationswissenschaft und Kartografie"
                period={`Jan. 2022 – Heute (${new Date().getFullYear() - 2022 - (new Date().getMonth() < 1 ? 1 : 0)} Jahre)`} // Berechnung direkt im period
                skills="Datenverarbeitung, GitHub, GIS, R, Python, Geodaten, Räumliche Analyse, R Shiny, Quantum GIS, Maschinelles Lernen, Leaflet, Statistik, SQL, Data Science"
                coordinates={{ lon: 2683813.1, lat: 1250210.3 }}
                setHoveredLocation={setHoveredLocation}
                setHoveredCategory={setHoveredCategory}
                imageDimensions={imageDimensions}
              />
              <Education
                institution="Universität Zürich"
                degree="Bachelor of Science - BS, Geografie, Datenanalyse in den Naturwissenschaften"
                period="Juni 2020 – Jan. 2024 (3 Jahre)"
                skills="GitHub, GIS, R, Python, ArcGIS-Produkte, Geodaten, Räumliche Analyse, Quantum GIS, Kartografie, SQL"
                coordinates={{ lon: 2683813.1, lat: 1250210.3 }}
                setHoveredLocation={setHoveredLocation}
                setHoveredCategory={setHoveredCategory}
                imageDimensions={imageDimensions}
              />
              <Education
                institution="Kantonsschule Alpenquai"
                degree="Matura mit Schwerpunkt Wirtschaft und Recht"
                period="Juni 2013 – Juli 2019 (6 Jahre)"
                skills="Geographie, Maturaarbeit: 'Die Entwicklung des Hirschmatt- und Neustadtquartiers'"
                coordinates={{ lon: 2667118.74, lat: 1210590.46 }}
                setHoveredLocation={setHoveredLocation}
                setHoveredCategory={setHoveredCategory}
                imageDimensions={imageDimensions}
              />
            </div>
          </section>
        </div>

        {/* Berufserfahrung - nimmt 1/4 des Bildschirms auf großen Bildschirmen */}
        <div className="lg:col-span-1 w-full">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Berufserfahrung</h2>
            <div className="space-y-4">
              <Experience
                position="Raumplaner / GIS"
                company="suisseplan | raum + landschaft"
                period={`Sept. 2022 – Heute (${new Date().getFullYear() - 2022 - (new Date().getMonth() < 8 ? 1 : 0)} Jahre)`}
                description="Räumliche Analyse und Kartografie"
                coordinates={{ lon: 2684172.8, lat: 1252458.9 }}
                setHoveredLocation={setHoveredLocation}
                setHoveredCategory={setHoveredCategory}
                imageDimensions={imageDimensions}
              />
              <Experience
                position="Raumplaner (Praktikum)"
                company="Planteam S AG"
                period="Aug. 2019 – Dez. 2019 (5 Monate)"
                description="Mitarbeit an Ortsplanungen, Erstellung von Statistiken, Plänen & Grafiken (QGIS, InDesign, Illustrator), Mitverfassen von Planungsberichten"
                coordinates={{ lon: 2666493.49, lat: 1211251.46 }}
                setHoveredLocation={setHoveredLocation}
                setHoveredCategory={setHoveredCategory}
                imageDimensions={imageDimensions}
              />
            </div>
          </section>
        </div>
      </div>

    </div>
  );
};

const Education: React.FC<{
  institution: string;
  degree: string;
  period: string;
  skills: string;
  coordinates: { lon: number; lat: number };
  setHoveredLocation: React.Dispatch<React.SetStateAction<{ x: number; y: number } | null>>;
  setHoveredCategory: React.Dispatch<React.SetStateAction<"education" | "experience" | null>>;
  imageDimensions: { width: number; height: number };
}> = ({
  institution,
  degree,
  period,
  skills,
  coordinates,
  setHoveredLocation,
  setHoveredCategory,
  imageDimensions,
}) => {
    const { x, y } = convertToImageCoords(
      coordinates.lon,
      coordinates.lat,
      2634506.633,
      2723606.633,
      1191760.109,
      1254720.362,
      imageDimensions.width,
      imageDimensions.height
    );

    return (
      <div
        className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:bg-gray-200 hover:border-accent-3 border-2"
        onMouseEnter={() => {
          setHoveredLocation({ x, y });
          setHoveredCategory("education");
        }}
        onMouseLeave={() => {
          setHoveredLocation(null);
          setHoveredCategory(null);
        }}
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{institution}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{degree}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 ">{period}</p>
        <p className="text-sm mt-2 text-gray-800 dark:text-white hidden md:block">{skills}</p>
        </div>
    );
  };

const Experience: React.FC<{
  position: string;
  company: string;
  period: string;
  description: string;
  coordinates: { lon: number; lat: number };
  setHoveredLocation: React.Dispatch<React.SetStateAction<{ x: number; y: number } | null>>;
  setHoveredCategory: React.Dispatch<React.SetStateAction<"education" | "experience" | null>>;
  imageDimensions: { width: number; height: number };
}> = ({
  position,
  company,
  period,
  description,
  coordinates,
  setHoveredLocation,
  setHoveredCategory,
  imageDimensions,
}) => {
    const { x, y } = convertToImageCoords(
      coordinates.lon,
      coordinates.lat,
      2634506.633,
      2723606.633,
      1191760.109,
      1254720.362,
      imageDimensions.width,
      imageDimensions.height
    );

    return (
      <div
        className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:bg-gray-200 hover:border-accent-2 border-2"
        onMouseEnter={() => {
          setHoveredLocation({ x, y });
          setHoveredCategory("experience");
        }}
        onMouseLeave={() => {
          setHoveredLocation(null);
          setHoveredCategory(null);
        }}
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{position} @ {company}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{period}</p>
        <p className="text-sm mt-2 text-gray-800 dark:text-white hidden md:block">{description}</p>
      </div>
    );
  };

export default CV;
