// "use client";
// import { useState, useEffect, useRef } from "react";
// import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";

// // Define the types for the location data
// type Location = [number, number, string, string];

// const locations: Location[] = [
//   [47.3769, 8.5417, "Zürich", "Universität Zürich<br>Master of Science - MS, Geografische Informationswissenschaft und Kartografie<br>Jan. 2024 – March 2025<br><strong>Skills:</strong> Datenverarbeitung, GitHub, GIS, R, Python, Geodaten, R Shiny, Quantum GIS, Maschinelles Lernen, Leaflet, Statistik, SQL, Data Science"],
//   [48.8566, 2.3522, "Paris", "Sorbonne Université<br>Master in Informatik<br>Sept. 2023 – Aug. 2024<br><strong>Skills:</strong> C++, JavaScript, Webentwicklung, Datenbanken, Cloud-Computing, Algorithmen"]];

// interface DynamicMapProps {
//   position: [number, number];
//   zoom: number;
// }

// export default function DynamicMap({ position, zoom }: DynamicMapProps) {
//   const [currentPosition, setCurrentPosition] = useState<[number, number]>(position);
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const mapRef = useRef<any>(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const interval = setInterval(() => {
//         const nextIndex = (currentIndex + 1) % locations.length;
//         setCurrentIndex(nextIndex);
//         setCurrentPosition(locations[nextIndex].slice(0, 2) as [number, number]);
//       }, 10000); // Every 10 seconds

//       return () => clearInterval(interval);
//     }
//   }, [currentIndex]);

//   // Adjust map when position changes
//   useEffect(() => {
//     if (mapRef.current) {
//       mapRef.current.flyTo(currentPosition, zoom, {
//         animate: true,
//         duration: 5,
//       });
//     }
//   }, [currentPosition, zoom]);

//   return (
//     <MapContainer
//       center={currentPosition}
//       zoom={zoom}
//       scrollWheelZoom={false}
//       style={{ height: "500px", width: "100%" }}
//       ref={mapRef}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {locations.map(([lat, lon, city, educationDetails], index) => (
//         <Marker key={index} position={[lat, lon]}>
//           <Popup autoClose={false}>
//             <h4>{city}</h4>
//             <div dangerouslySetInnerHTML={{ __html: educationDetails }} />
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// }
