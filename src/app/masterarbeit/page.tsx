import React from "react";
import PdfViewer from "../_components/PdfViewer";
import { getAllPosts } from "@/lib/api";
import Image from "next/image";
import PageWrapper from "@/app/_components/PageWrapper";
import { SectionSeparator } from "@/app/_components/section-separator";
import FadeInOnScroll from "@/app/_components/FadeInOnScroll";
import BlogListSimple, { Post } from "@/app/_components/BlogListSimple";
import RevealBox from "@/app/_components/RevealBox";

// Default: local copy
const PDF_URL = "/api/pdf-proxy?url=https%3A%2F%2Fwww.dropbox.com%2Fscl%2Ffi%2F69wczx7100jxvqnz3mj6n%2Fmain.pdf%3Frlkey%3Dsubuk5bs2kuwg09jk2qjz96qi%26st%3D3j4grwqy%26dl%3D0";
const PDF_URL2 = "/api/pdf-proxy?url=https%3A%2F%2Fwww.dropbox.com%2Fscl%2Ffi%2F39ldpz2pnz22grrtc1yjd%2FOverview-Road-Network-Classified-ML.pdf%3Frlkey%3Dozwffi73vku21kihne81ijydd%26st%3Dmribwwi6%26dl%3D0";
const PDF_URL3 = "/api/pdf-proxy?url=https%3A%2F%2Fwww.dropbox.com%2Fscl%2Ffi%2F9jvvj6eryy6vtfhr94qhd%2FOverview-Road-Network-Classified-Rule-Based.pdf%3Frlkey%3De84vm9fn5cfk21w7zteogemhg%26st%3Dzj57i812%26dl%3D0";

// Hinweise: Falls du eine Datei in Dropbox benutzen willst, kopiere den freigabe-Link
// (z.B. https://www.dropbox.com/s/abcd1234/myfile.pdf) und verwende die Proxy-Route
// /api/pdf-proxy?url=<encoded-url>
// Beispiel (client-side): /api/pdf-proxy?url=https%3A%2F%2Fwww.dropbox.com%2Fs%2Fabcd1234%2Fmyfile.pdf
// Der Proxy setzt automatisch dl=1 für Dropbox-Links und liefert die Datei server-side
// weiter — so umgehst du CORS- und Content-Disposition-Probleme.

export default async function MasterarbeitPage() {
  const posts = await getAllPosts();

  // Nur Posts mit Tag "Masterarbeit"
  const tag = "Masterarbeit";

  // type-guard: checks whether value has tags array
  function hasTags(value: unknown): value is { tags: unknown } {
    return !!value && typeof value === "object" && "tags" in value;
  }

  const filteredPosts = posts.filter((post) => {
    if (!hasTags(post)) return false;
    // safe access to tags
    const candidate = (post as unknown) as { tags?: unknown };
    const tags = candidate.tags;
    return Array.isArray(tags) && tags.includes(tag);
  }) as Post[];
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <section id="masterarbeit" className="text-center">
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
          <div className="max-w-5xl mx-auto px-4 mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              In meiner Masterarbeit beschäftige ich mich mit der{" "}
              <span className="font-semibold text-accent-3">
                Sicherheit von Schulwegen in Zürich
              </span>
              . Ziel ist es, ein automatisiertes und datenbasiertes Verfahren zu
              entwickeln, das mit Hilfe von Street-Level-Bildern und modernen
              Computer-Vision-Methoden sicherheitsrelevante Elemente wie
              Zebrastreifen, Trottoirs, Verkehrsschilder oder
              Verkehrsberuhigungen automatisch erkennt und bewertet.
            </p>
          </div>
        </FadeInOnScroll>

        {/* Depth Beispiel */}
        <FadeInOnScroll>
          <div className="flex justify-center mb-8">
            <div className="bg-white p-3 rounded-xl shadow-xl inline-block max-w-5xl w-full">
              <Image
                src="/img/Masterarbeit/depth_example1.png"
                alt="Depth Beispiel"
                width={1200}
                height={800}
                className="rounded-lg w-full h-auto"
              />
              <p className="text-sm text-gray-600 mt-2 text-center">
                Beispiel einer Tiefenschätzung: automatische Analyse komplexer
                Straßensituationen.
              </p>
            </div>
          </div>
        </FadeInOnScroll>
        <FadeInOnScroll>
          <div className="max-w-5xl mx-auto px-4 mb-14">
            <p className="text-lg text-gray-700 leading-relaxed">
              Durch moderne KI-Methoden wie Tiefenschätzung und Bildsegmentierung
              können komplexe Strassen- und Kreuzungssituationen automatisch
              ausgewertet werden.
            </p>
          </div>
        </FadeInOnScroll>

        {/* YOLO Detection Beispiel */}
        <FadeInOnScroll>
          <div className="flex justify-center mb-8">
            <div className="bg-white p-3 rounded-xl shadow-xl inline-block max-w-5xl w-full">
              <Image
                src="/img/Masterarbeit/yolo_detection_example1.jpg"
                alt="YOLO Detection Beispiel"
                width={1200}
                height={800}
                className="rounded-lg w-full h-auto"
              />
              <p className="text-sm text-gray-600 mt-2 text-center">
                Beispiel einer YOLO-Detektion: Erkennung sicherheitsrelevanter
                Objekte wie Zebrastreifen oder Ampeln.
              </p>
            </div>
          </div>
        </FadeInOnScroll>
        <FadeInOnScroll>
          <div className="max-w-5xl mx-auto px-4 mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              Mit Hilfe von Objekterkennungs-Algorithmen (z. B. YOLO) können
              sicherheitsrelevante Elemente wie Zebrastreifen, Ampeln oder
              Verkehrsschilder automatisch erkannt werden.
            </p>
          </div>
        </FadeInOnScroll>

        {/* Methodology Beispiel */}
        <FadeInOnScroll>
          <div className="flex justify-center mb-8">
            <div className="bg-white p-3 rounded-xl shadow-xl inline-block max-w-3xl w-full">
              <Image
                src="/img/Masterarbeit/Methodology_Geolocation4.png"
                alt="Methodologie Geolocation"
                width={1200}
                height={800}
                className="rounded-lg w-full h-auto"
              />
              <p className="text-sm text-gray-600 mt-2 text-center">
                Beispiel der Methodik: Verknüpfung der erkannten Objekte mit dem
                Straßennetzwerk.
              </p>
            </div>
          </div>
        </FadeInOnScroll>
        <FadeInOnScroll>
          <div className="max-w-5xl mx-auto px-4 mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              Diese erkannten Objekte werden mit dem Strassennetzwerk verknüpft
              und in Routing-Analysen integriert. So kann nicht nur der
              kürzeste, sondern auch der sicherste Schulweg berechnet werden.
            </p>
          </div>
        </FadeInOnScroll>

{/* ======================================== */}
{/* PDF Viewer - Einzelne RevealBoxen */}
{/* ======================================== */}

<FadeInOnScroll>
  <div className="max-w-5xl mx-auto px-4 mb-16">
    <RevealBox title="📑 Masterarbeit PDF">
      <p className="text-base text-gray-600 mb-6">
        Hier kannst du den momentanen Stand der Arbeit direkt lesen oder
        herunterladen:
      </p>
      <PdfViewer url={PDF_URL} title="Masterarbeit PDF" height="78vh" />
    </RevealBox>
  </div>
</FadeInOnScroll>

<FadeInOnScroll>
  <div className="max-w-5xl mx-auto px-4 mb-16">
    <RevealBox title="📊 Overview Road Network Classified Rule Based">
      <PdfViewer
        url={PDF_URL2}
        title="Overview Road Network Classified Rule Based"
        height="78vh"
      />
    </RevealBox>
  </div>
</FadeInOnScroll>

<FadeInOnScroll>
  <div className="max-w-5xl mx-auto px-4 mb-16">
    <RevealBox title="🤖 Overview Road Network Classified ML">
      <PdfViewer
        url={PDF_URL3}
        title="Overview Road Network Classified ML"
        height="78vh"
      />
    </RevealBox>
  </div>
</FadeInOnScroll>




      </section>


      {/* ======================================== */}
      {/* QGIS Plugin API - Abschnitt */}
      {/* ======================================== */}
      <FadeInOnScroll>
        <SectionSeparator text="QGIS Plugin API" className="mb-10" />
      </FadeInOnScroll>

      {/* Einleitungstext */}
      <FadeInOnScroll>
        <div className="max-w-5xl mx-auto px-4 mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            Für die Arbeit wurde ein QGIS-Processing-Skript erstellt, das Routen von
            einem entfernten Routing-API abruft. Das Skript unterstützt das Schweizer
            Koordinatensystem LV95 / EPSG:2056 und speichert die Ergebnisse direkt als
            Vektorlayer (GeoPackage oder GeoJSON) im aktuellen QGIS-Projekt.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Parallel dazu wurde ein schlanker FastAPI-Dienst entwickelt, der
            <em> k-kürzeste Alternativrouten </em> berechnet. Grundlage ist eine
            Kostenfunktion, die Weglänge und Sicherheit kombiniert. Das API lädt das
            Fußwegenetz mit den berechneten Sicherheitswerten beim Start vor und gibt
            die Ergebnisse als GeoJSON zurück. Für Tests und Demonstrationen wurde der
            Dienst auf <strong> Render.com (Free Tier) </strong> bereitgestellt.
          </p>

          {/* Render Deployment Bild */}
          <div className="flex justify-center mb-16">
            <div className="bg-white p-3 rounded-xl shadow-xl inline-block max-w-3xl w-full">
              <Image
                src="/img/Masterarbeit/Render.png"
                alt="Deployment / Dashboard des Routing-API (Beispiel auf Render.com)"
                width={1000}
                height={640}
                className="rounded-lg w-full h-auto"
              />
              <p className="text-sm text-gray-600 mt-2 text-center">
                Deployment des Routing-APIs auf Render.com (Beispiel Dashboard).
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Das QGIS-Skript (<code>qgis_processing_load_route.py</code>) ruft dieses API
            ab, schreibt das Ergebnis lokal und versieht die Routen automatisch mit einem
            Standardstil (rote Linie, 1 pt). So lässt sich das Routing reproduzierbar in
            der Forschung nutzen und gleichzeitig praktisch in QGIS anwenden, etwa durch
            Planerinnen und Planer, die interaktiv sichere Routen abfragen und darstellen
            möchten.
          </p>
        </div>
      </FadeInOnScroll>

      {/* QGIS Plugin Screenshot 1 */}
      <FadeInOnScroll>
        <div className="flex justify-center mb-8">
          <div className="bg-white p-3 rounded-xl shadow-xl inline-block max-w-3xl w-full">
            <Image
              src="/img/Masterarbeit/API_QGIS.png"
              alt="QGIS Plugin UI: Routing - Route aus Routing-API laden"
              width={1000}
              height={720}
              className="rounded-lg w-full h-auto"
            />
            <p className="text-sm text-gray-600 mt-2 text-center">
              QGIS-Plugin: Benutzeroberfläche zum Laden einer Route aus dem Routing-API.
            </p>
          </div>
        </div>
      </FadeInOnScroll>

      {/* QGIS Plugin Screenshot 2 */}
      <FadeInOnScroll>
        <div className="flex justify-center mb-8">
          <div className="bg-white p-3 rounded-xl shadow-xl inline-block max-w-3xl w-full">
            <Image
              src="/img/Masterarbeit/API_QGIS2.jpg"
              alt="QGIS Plugin UI: Routing - Route aus Routing-API laden"
              width={1000}
              height={720}
              className="rounded-lg w-full h-auto"
            />
            <p className="text-sm text-gray-600 mt-2 text-center">
              Ein Resultat-Beispiels des QGIS-Plugins mit geladenen Routing-Ergebnissen.
            </p>
          </div>
        </div>
      </FadeInOnScroll>


      {/* Weitere Eindrücke */}
      <FadeInOnScroll>
        <SectionSeparator text="Weitere Eindrücke" className="mb-10" />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <div className="max-w-5xl mx-auto px-4 mb-12">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Neben der Methodik und dem Routing-API bietet die Arbeit zahlreiche
            weitere spannende Eindrücke. Dazu gehören Zwischenergebnisse der
            YOLO-Klassifikationen, die Verteilung der Modell-Konfidenzen sowie
            großräumige und detaillierte Karten mit allen erkannten Objekten
            aus SWISSIMAGE und Mapillary.
          </p>
        </div>
      </FadeInOnScroll>

      {/* Zwei Bilder nebeneinander: Methodology Match */}
      <FadeInOnScroll>
        <div className="max-w-5xl mx-auto px-4 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-3 rounded-xl shadow-xl">
              <Image
                src="/img/Masterarbeit/Methodology_Classification_SWISSIMAGE_match1.png"
                alt="Overlay von YOLO-Detektionen und Straßennetz"
                width={800}
                height={600}
                className="rounded-lg w-full h-auto"
              />
              <p className="text-sm text-gray-600 mt-2 text-center">
                Die erkannten Objekte werden gepuffert um mit dem Strassennetz zu matchen.
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-xl">
              <Image
                src="/img/Masterarbeit/Methodology_Classification_SWISSIMAGE_match2.png"
                alt="Resultierende Coverage-Werte je Straßensegment"
                width={800}
                height={600}
                className="rounded-lg w-full h-auto"
              />
              <p className="text-sm text-gray-600 mt-2 text-center">
                Hier sieht man die Tramlinien von Zürich relativ gut. Diese Tramlinien wurden nur durch die Luftbilder erkannt.
              </p>
            </div>
          </div>
        </div>
      </FadeInOnScroll>

      {/* Boxplot: Confidence per Class */}
      <FadeInOnScroll>
        <div className="max-w-5xl mx-auto px-4 mb-10">
          <div className="bg-white p-3 rounded-xl shadow-xl">
            <Image
              src="/img/Masterarbeit/boxplot_conf_per_class.png"
              alt="Verteilung der Modell-Konfidenzen pro Klasse"
              width={1000}
              height={700}
              className="rounded-lg w-full h-auto"
            />
            <p className="text-sm text-gray-600 mt-2 text-center">
              Verteilung der Modell-Konfidenzen pro Klasse (Boxplot). Diese Klassen wurden vom Luftbild erkannt.
            </p>
          </div>
        </div>
      </FadeInOnScroll>

      {/* SWISSIMAGE Detections – 4 Karten */}
      <FadeInOnScroll>
        <div className="max-w-5xl mx-auto px-4 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-3 rounded-xl shadow-xl">
              <Image
                src="/img/Masterarbeit/SWISSIMAGE_Detections_1.png"
                alt="SWISSIMAGE Detections – Innenstadt Detail"
                width={800}
                height={800}
                className="rounded-lg w-full h-auto"
              />
              <p className="text-sm text-gray-600 mt-2 text-center">
                Übersicht aller erkannten Objekte vom Luftbild in der Stadt Zürich.
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-xl">
              <Image
                src="/img/Masterarbeit/SWISSIMAGE_Detections_2.png"
                alt="SWISSIMAGE Detections – Innenstadt Luftbild"
                width={800}
                height={800}
                className="rounded-lg w-full h-auto"
              />
              <p className="text-sm text-gray-600 mt-2 text-center">
                Hier näher herangezoomt auf die Innenstadt. Es sind viele Klassen erkannt worden.
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-xl">
              <Image
                src="/img/Masterarbeit/SWISSIMAGE_Detections_3.png"
                alt="SWISSIMAGE Detections – Stadt Zürich gesamt"
                width={800}
                height={800}
                className="rounded-lg w-full h-auto"
              />
              <p className="text-sm text-gray-600 mt-2 text-center">
                Detailansicht bei der Sihlbrücke.
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-xl">
              <Image
                src="/img/Masterarbeit/SWISSIMAGE_Detections_4.png"
                alt="SWISSIMAGE Detections – Quartierdetail"
                width={800}
                height={800}
                className="rounded-lg w-full h-auto"
              />
              <p className="text-sm text-gray-600 mt-2 text-center">
                Detailansicht bei der Sihlbrücke mit Luftbild.
              </p>
            </div>
          </div>
        </div>
      </FadeInOnScroll>

      {/* Mapillary Crosswalk – Punkte vs Raster */}
      <FadeInOnScroll>
        <div className="max-w-5xl mx-auto px-4 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-3 rounded-xl shadow-xl">
              <Image
                src="/img/Masterarbeit/Overview_Mapillary1.png"
                alt="Mapillary Crosswalk Punkte"
                width={800}
                height={800}
                className="rounded-lg w-full h-auto"
              />
              <p className="text-sm text-gray-600 mt-2 text-center">
                Hier sieht man die erkennten Zebrastreifen aus den Street-Level Bildern erkannt durch Computer Vision.
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-xl">
              <Image
                src="/img/Masterarbeit/Overview_Mapillary2.png"
                alt="Mapillary Crosswalk Raster"
                width={800}
                height={800}
                className="rounded-lg w-full h-auto"
              />
              <p className="text-sm text-gray-600 mt-2 text-center">
                Die erkannten Zebrastreifen wurden aggregiert um es später mit dem Wegenetz zu matchen.
              </p>
            </div>
          </div>
        </div>
      </FadeInOnScroll>


      {/* Blogposts nur mit Masterarbeit */}
      {filteredPosts.length > 0 && (
        <PageWrapper>
          <SectionSeparator text="Beiträge zur Masterarbeit" />

          <FadeInOnScroll>
            <p className="text-lg text-gray-700 mb-6">
              Hier findest du alle Blogbeiträge, die direkt mit meiner
              Masterarbeit zu tun haben.
            </p>
          </FadeInOnScroll>

          <BlogListSimple posts={filteredPosts} tag="masterarbeit" />

        </PageWrapper>
      )}
    </main>
  );
}
