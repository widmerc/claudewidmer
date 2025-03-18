import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const StandorteWechselnKarte = () => {
  // Liste von Standorten, zwischen denen gewechselt wird
  const standorte = [
    {
      name: "Firma A",
      position: "Softwareentwickler",
      lat: 47.3769, // Latitude für Zürich
      lng: 8.5417,  // Longitude für Zürich
    },
    {
      name: "Firma B",
      position: "Projektleiter",
      lat: 46.9481, // Latitude für Genf
      lng: 6.9570,  // Longitude für Genf
    },
    {
      institution: "Universität Zürich",
      studium: "Informatik",
      lat: 47.3769, // Latitude für Zürich
      lng: 8.5400,  // Longitude für Zürich
    },
    {
      institution: "ETH Zürich",
      studium: "Mathematik",
      lat: 47.3769, // Latitude für Zürich
      lng: 8.5615,  // Longitude für Zürich
    },
  ];

  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);

  // Funktion zum Wechseln der Standorte
  const wechselnStandort = () => {
    setCurrentLocationIndex((prevIndex) => (prevIndex + 1) % standorte.length);
  };

  // Wechsel alle 5 Sekunden
  useEffect(() => {
    const interval = setInterval(wechselnStandort, 5000); // alle 5 Sekunden wechseln
    return () => clearInterval(interval); // Intervalle stoppen, wenn die Komponente entfernt wird
  }, []);

  const aktuellePosition = standorte[currentLocationIndex];

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer center={[aktuellePosition.lat, aktuellePosition.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/your-mapbox-user/ck0j8suvq0my1igoxxvti54zi/tiles/{z}/{x}/{y}?access_token=your-access-token"
          attribution="&copy; <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        
        {/* Marker für den aktuellen Standort */}
        <Marker position={[aktuellePosition.lat, aktuellePosition.lng]} icon={new L.Icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png' })}>
          <Popup>
            <strong>{aktuellePosition.name || aktuellePosition.institution}</strong><br />
            {aktuellePosition.position || aktuellePosition.studium}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default StandorteWechselnKarte;
