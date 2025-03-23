// "use client";
// import dynamic from "next/dynamic";
// import "leaflet/dist/leaflet.css";
// import "leaflet-defaulticon-compatibility";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

// // Dynamischer Import der Karte (stellt sicher, dass sie nur im Client geladen wird)
// const DynamicMap = dynamic(() => import("./DynamicMap"), { ssr: false });

// export default function MyMap(props: any) {
//   return <DynamicMap {...props} />;
// }