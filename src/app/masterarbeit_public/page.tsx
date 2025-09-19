import React from "react";
import Image from "next/image";
import FadeInOnScroll from "@/app/_components/FadeInOnScroll";
import { SectionSeparator } from "@/app/_components/section-separator";

export default async function MasterarbeitPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      {/* Titel */}
      <FadeInOnScroll>
        <SectionSeparator text="Masterarbeit" className="mb-10" />
      </FadeInOnScroll>

      {/* Overview Bild */}
      <FadeInOnScroll>
        <div className="flex justify-center mb-10">
          <div className="bg-white p-3 rounded-xl shadow-xl inline-block max-w-2xl w-full">
            <Image
              src="/img/Masterarbeit/Overview.png"
              alt="Übersicht Zürich mit Wegenetz"
              width={1200}
              height={800}
              className="rounded-lg w-full h-auto"
            />
            <p className="text-sm text-gray-600 mt-2 text-center">
              Übersichtskarte von Zürich mit dem verwendeten Wegenetz.
            </p>
          </div>
        </div>
      </FadeInOnScroll>

      {/* Einleitung */}
      <FadeInOnScroll>
        <div className="max-w-5xl mx-auto px-4 mb-12 space-y-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            In meiner Masterarbeit habe ich untersucht, wie man{" "}
            <span className="font-semibold text-accent-3">
              sichere Schulwege in Zürich
            </span>{" "}
            automatisch berechnen kann. 
            Die gesamte Arbeit basiert nur auf{" "}
            <span className="font-semibold text-accent-3">
              zwei Datenquellen: Street-Level-Bildern und Luftbildern
            </span>
            . Diese Beschränkung ist spannend, zeigt aber auch die Grenzen 
            des Ansatzes.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Insgesamt habe ich dabei über{" "}
            <span className="font-semibold text-accent-3">
              1.2 Millionen Street-Level-Bilder
            </span>{" "}
            automatisch analysiert. Daraus konnte ich Informationen zu 
            Zebrastreifen, Trottoirs und Verkehrsschildern gewinnen.
          </p>
      </FadeInOnScroll>

      <FadeInOnScroll>
        <SectionSeparator text="Vorgehen" className="mb-2" />
      </FadeInOnScroll>
      
      
      <FadeInOnScroll>
          <p className="text-lg text-gray-700 leading-relaxed">
            Mein Vorgehen war in mehreren Schritten aufgebaut:
          </p>

          <ul className="list-disc pl-6 text-lg text-gray-700 leading-relaxed space-y-2">
            <li>
              <span className="font-semibold">1. Bilder sammeln:</span>{" "}
              Zuerst habe ich frei verfügbare Bilder aus der Stadt Zürich
              zusammengetragen – sowohl aus der Straßenperspektive als auch aus
              der Vogelperspektive.
            </li>
            <li>
              <span className="font-semibold">2. Objekte erkennen:</span>{" "}
              Mit Hilfe von KI-Modellen habe ich automatisch wichtige Elemente
              wie Zebrastreifen, Trottoirs und Verkehrsschilder erkannt. Dafür
              wurden sowohl <em>orientierte Bounding Boxes</em> (OBB) als auch{" "}
              <em>Segmentierungen</em> verwendet.
            </li>
            <li>
              <span className="font-semibold">3. Sicherheitswerte berechnen:</span>{" "}
              Aus diesen Erkennungen habe ich jedem Abschnitt im Wegenetz einen
              Sicherheitswert zugewiesen. Ein Weg mit vielen sicheren Elementen
              erhält eine höhere Bewertung.
            </li>
            <li>
              <span className="font-semibold">4. Routing-Algorithmus anwenden:</span>{" "}
              Mit einem speziellen Algorithmus habe ich Wege berechnet, die
              nicht nur kurz, sondern auch möglichst sicher sind. So lassen sich
              alternative Routen vergleichen.
            </li>
            <li>
              <span className="font-semibold">5. Visualisierung:</span>{" "}
              Zum Schluss habe ich die Ergebnisse auf einer Karte dargestellt,
              so dass man die Unterschiede zwischen normalen und sicheren
              Schulwegen sofort sehen kann.
            </li>
          </ul>
      </FadeInOnScroll>
      <FadeInOnScroll>
          <p className="text-lg text-gray-700 leading-relaxed">
            Das Ergebnis ist ein digitales Wegenetz, das Sicherheit in den
            Vordergrund stellt. Eltern, Schulen oder die Stadtverwaltung können
            damit besser einschätzen, welche Routen für Kinder besonders
            geeignet sind. Gleichzeitig muss man betonen, dass{" "}
            <span className="font-semibold text-accent-3">
              nur Informationen aus Bildern berücksichtigt wurden
            </span>{" "}
            – andere Faktoren wie Verkehrsdichte oder Unfalldaten fehlen.
          </p>
        </div>
      </FadeInOnScroll>

      {/* Beispielbilder: OBB, Segmentation, YOLO und SWISSIMAGE */}
      <FadeInOnScroll>
        <div className="max-w-5xl mx-auto px-4 mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-3 rounded-xl shadow-lg">
            <Image
              src="/img/Masterarbeit/yolo_detection_example.png"
              alt="Beispiel: YOLO Detection"
              width={800}
              height={600}
              className="rounded-lg w-full h-auto"
            />
            <p className="text-sm text-gray-600 mt-2 text-center">
              Beispiel: Objekterkennung von Street-Level Bildern.
            </p>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-lg">
            <Image
              src="/img/Masterarbeit/SWISSIMAGE_Detections_2.png"
              alt="Beispiel: SWISSIMAGE Detections"
              width={800}
              height={600}
              className="rounded-lg w-full h-auto"
            />
            <p className="text-sm text-gray-600 mt-2 text-center">
              Beispiel: Automatische Erkennung aus Luftbildern (SWISSIMAGE).
            </p>
          </div>
        </div>
      </FadeInOnScroll>
    </main>
  );
}
