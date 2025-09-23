import React from "react";
import Image from "next/image";
import FadeInOnScroll from "@/app/_components/FadeInOnScroll";
import { SectionSeparator } from "@/app/_components/section-separator";
import { ExternalLink } from "lucide-react";
import Map from "@/app/_components/Map";
import PdfViewer from "@/app/_components/PdfViewer";
import RevealBox from "@/app/_components/RevealBox";
import ZoomableImage from "@/app/_components/ZoomableImage";
import { getAllPosts } from "@/lib/api";
import BlogListSimple, { Post } from "@/app/_components/BlogListSimple";



const PDF_URL2 = "/api/pdf-proxy?url=https%3A%2F%2Fwww.dropbox.com%2Fscl%2Ffi%2F39ldpz2pnz22grrtc1yjd%2FOverview-Road-Network-Classified-ML.pdf%3Frlkey%3Dozwffi73vku21kihne81ijydd%26st%3Dmribwwi6%26dl%3D0";
const PDF_URL3 = "/api/pdf-proxy?url=https%3A%2F%2Fwww.dropbox.com%2Fscl%2Ffi%2F9jvvj6eryy6vtfhr94qhd%2FOverview-Road-Network-Classified-Rule-Based.pdf%3Frlkey%3De84vm9fn5cfk21w7zteogemhg%26st%3Dzj57i812%26dl%3D0";
export default async function MasterarbeitPage() {
  const posts = await getAllPosts();

  // Nur Posts mit Tag "Masterarbeit" herausfiltern
  const tag = "Masterarbeit";
  const filteredPosts = (posts as Post[]).filter(
    (post) => Array.isArray(post.tags) && post.tags.includes(tag)
  );

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      {/* Titel */}
      <FadeInOnScroll>
        <div className="text-center mb-2">
          <div className="flex items-center">
            <hr className="flex-grow border-neutral-200" />
            <h1 className="mx-4 text-4xl md:text-5xl font-bold text-gray-800 whitespace-nowrap">
              Sichere Schulwege in Zürich
            </h1>
            <hr className="flex-grow border-neutral-200" />
          </div>
          <p className="text-lg md:text-xl text-gray-600 mt-2">
            Automatisierte Sicherheitsbewertung allein durch Bildinformationen
          </p>

          <p className="text-sm text-gray-500 mt-4">
            Masterarbeit von:<br />
            Claude Widmer – cand. MSc Geographie (Fokus GIS)
          </p>

          <p className="text-sm text-gray-500 mt-4">
            Betreut von:<br />
            Ross Purves, Prof. Dr. – Professor, Geocomputation<br />
            Tumasch Reichenbacher, Dr. – Group Leader, Geographic Information Visualization and Analysis
          </p>
        </div>
      </FadeInOnScroll>



      {/* Overview Bild */}
      <FadeInOnScroll>
        <div className="flex justify-center mb-4">
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

      <FadeInOnScroll>
        <SectionSeparator text="Einleitung" className="mb-2" />
      </FadeInOnScroll>

      {/* Einleitung */}
      <FadeInOnScroll>
        <div className="max-w-5xl mx-auto px-4 mb-12 space-y-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            In meiner Masterarbeit habe ich untersucht, wie man{" "}
            <span className="font-semibold text-accent-3">
              sichere Schulwege in Zürich
            </span>{" "}
            automatisch ermitteln kann. Die gesamte Arbeit basiert nur auf{" "}
            <span className="font-semibold text-accent-3">
              zwei Datenquellen: Street-Level-Bildern und Luftbildern
            </span>
            .
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Insgesamt habe ich dabei über{" "}
            <span className="font-semibold text-accent-3">
              1.2 Millionen Street-Level-Bilder
            </span>{" "}
            automatisch analysiert. Zusätzlich habe ich{" "}
            <span className="font-semibold text-accent-3">
              Luftbilder mit rund 90 Milliarden Pixeln
            </span>{" "}
            ausgewertet (entspricht dem gesamten Stadtgebiet bei 10 cm² Auflösung).
            Daraus ergaben sich wertvolle Hinweise zu Zebrastreifen, Trottoirs und
            Verkehrsschildern. Auf Grundlage dieser Informationen konnte das von mir programmierte Modell{" "}
            <span className="font-semibold text-accent-3">
              sichere Schulwege erkennen
            </span>
            . Die gesamte Arbeit habe ich mit offen verfügbarer Software und
            Open-Source-Packages umgesetzt, den Ablauf der automatischen Auswertung
            selbst programmiert und zusätzlich{" "}
            <span className="font-semibold text-accent-3">
              eigene Algorithmen
            </span>{" "}
            entwickelt.
          </p>
        </div>
      </FadeInOnScroll>


      <FadeInOnScroll>
        <SectionSeparator text="Vorgehen" className="mb-2" />
      </FadeInOnScroll>

      {/* Vorgehen-Text und Liste */}
      <FadeInOnScroll>
        <div className="max-w-5xl mx-auto px-4 mb-5 space-y-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            Mein Vorgehen gliedert sich in fünf Hauptschritte:
          </p>
          <ul className="list-disc pl-6 text-lg text-gray-700 leading-relaxed space-y-2">
            <li>
              <span className="font-semibold text-accent-3">1. Bilder sammeln:</span>{" "}
              Zuerst habe ich frei verfügbare Bilder aus der Stadt Zürich
              zusammengetragen – sowohl aus der Strassenperspektive (
              <a
                href="https://www.mapillary.com/app/?lat=47.3792705583877&lng=8.534886187930056&z=13.313509941651894"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center underline hover:text-accent-2 transition"
              >
                Mapillary
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
              ) als auch aus der Vogelperspektive (
              <a
                href="https://www.swisstopo.admin.ch/de/orthobilder-swissimage-10-cm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center underline hover:text-accent-2 transition"
              >
                SWISSIMAGE
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>{" "}
              von swisstopo).
            </li>
            <li>
              <span className="font-semibold text-accent-3">2. Objekte erkennen:</span>{" "}
              Mit Hilfe von KI-Software{" "}
              (<a
                href="https://www.ultralytics.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center underline hover:text-accent-2 transition"
              >
                Ultralytics
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
              ) habe ich ein eigenes Modell trainiert. Das Training dauerte rund{" "}
              <span className="font-semibold text-accent-3">48 Stunden</span> auf einem leitstungsfähigen Computer.
              Ziel war es, wichtige Elemente im Strassenraum automatisch
              zu erkennen – zum Beispiel Zebrastreifen, Trottoirs oder Verkehrsschilder.
              Damit konnte ich die{" "}
              <span className="italic">Datengrundlage für die Bewertung der Sicherheit von Schulwegen</span>{" "}
              schaffen.
            </li>

            <li>
              <span className="font-semibold text-accent-3">3. Sicherheitswerte berechnen:</span>{" "}
              Anschliessend wurde die Schulwegsicherheit auf zwei Arten bewertet:
              Einerseits mit einem <span className="italic">Machine-Learning-Verfahren</span>,
              das ich selbst programmiert und umgesetzt habe. Dieses Verfahren lernte aus
              Beispieldaten und dem bestehenden{" "}
              <a
                href="https://www.stadt-zuerich.ch/de/mobilitaet/verkehrssicherheit/schulwege.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center underline hover:text-accent-2 transition"
              >
                Online-Schulwegplan der Stadt Zürich (Polizei Zürich)
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>{" "}
              selbständig zwischen sicheren und unsicheren Abschnitten zu unterscheiden.
              Andererseits habe ich eine regelbasierte Logik programmiert, bei der es Punktabzüge gibt,
              wenn beispielsweise ein Zebrastreifen fehlt.
              Auf diese Weise erhielt jeder Abschnitt einen{" "}
              <span className="italic">Sicherheitswert</span>,
              den man später nicht nur für die Routenberechnung nutzen konnte,
              sondern der auch hilft, die Sicherheit einzelner Strassenabschnitte oder Quartiere besser einzuschätzen.

            </li>

            <li>
              <span className="font-semibold text-accent-3">4. Routen berechnen:</span>{" "}
              Die Sicherheitswerte habe ich in einen von mir selbst programmierten Routing-Algorithmus integriert.
              Dadurch lassen sich Wege finden, die nicht nur kurz, sondern auch möglichst sicher sind.
              So können Eltern oder Behörden verschiedene Routen vergleichen – zum Beispiel den schnellsten
              Weg im Vergleich zum sichersten Schulweg. Dafür habe ich ein {" "}
              <a
                href="https://qgis.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center underline hover:text-accent-2 transition"
              >
                QGIS Plugin
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>{" "}
              programmiert, welches zur freien Benutzung durch mich freigeschaltet wurde. Nach Abschluss meiner Masterarbeit plane ich, die Funktionalität zusätzlich auch als{" "}
              <a
                href="https://www.esri.com/en-us/arcgis/products/arcgis-pro/overview"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center underline hover:text-accent-2 transition"
              >
                ArcGIS&nbsp;Pro Plugin
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
              , über eine <span className="italic">Webkarte</span> sowie eine{" "}
              <span className="italic">API (Programmierschnittstelle)</span> umzusetzen.
            </li>

            <li>
              <span className="font-semibold text-accent-3">5. Visualisierung:</span>{" "}
              Zum Schluss habe ich die Ergebnisse auf einer Karte dargestellt
              und für weitere Anwendungen exportiert. Auf dieser Karte hat jeder
              Strassenabschnitt eine eigene <span className="italic">Sicherheitsbewertung (von 0 zu 100)</span>.
            </li>
          </ul>
        </div>
      </FadeInOnScroll>
      {/* Vorgehen-Fazit */}
      <FadeInOnScroll>
        <div className="max-w-5xl mx-auto px-4 mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            Das Ergebnis ist ein digitales Wegnetz. Eltern, Schulen oder die Stadtverwaltung können
            damit besser einschätzen, welche Routen für Kinder besonders
            geeignet sind.
          </p>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll>
        <SectionSeparator text="Resultat Web-Karte" className="mb-2" />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <div className="max-w-5xl mx-auto px-4 mb-12">
          <div className="bg-white p-3 rounded-xl shadow-lg">
            <Map />
            <p className="text-sm text-gray-600 mt-2 text-center">
              Interaktive Karte mit Sicherheits-Scores auf Basis von{" "}
              <span className="font-medium">ML</span> (Machine Learning) und{" "}
              <span className="font-medium">RB</span> (regelbasierter Ansatz).
              <br />
              Die Darstellung ist ein erster Prototyp und dient der
              Veranschaulichung der Ergebnisse.
              <br />
              Bitte beachten: Die Karte reagiert derzeit noch etwas langsam – insbesondere
              beim Laden aller Kreise kann es zu längeren Wartezeiten kommen.
            </p>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Die Datenbasis umfasst das gesamte Strassennetz der Stadt Zürich und erlaubt
              eine erste Einschätzung von sichereren und weniger sicheren Strassenabschnitten.
              Die Resultate sind als explorativer Ansatz zu verstehen und ersetzen keine
              offiziellen Bewertungen.
            </p>
          </div>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll>
        <SectionSeparator text="Resultat Karte (PDF)" className="mb-2" />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <RevealBox title="Overview Road Network Classified Rule Based">
            <PdfViewer
              url={PDF_URL2}
              title="Overview Road Network Classified Rule Based"
              height="78vh"
            />
          </RevealBox>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Diese PDF-Version zeigt die regelbasierte Klassifikation des Strassennetzes.
          </p>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll>
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <RevealBox title="Overview Road Network Classified ML">
            <PdfViewer
              url={PDF_URL3}
              title="Overview Road Network Classified ML"
              height="78vh"
            />
          </RevealBox>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Diese PDF-Version zeigt die Ergebnisse der Klassifikation mit Machine Learning.
            Auch hier wird das gesamte Strassennetz der Stadt Zürich dargestellt.
          </p>
        </div>
      </FadeInOnScroll>

      {/* ======================================== */}
      {/* Limitationen */}
      {/* ======================================== */}
      <FadeInOnScroll>
        <SectionSeparator text="Limitationen" className="mb-2" />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <div className="max-w-5xl mx-auto px-4 mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            Es ist wichtig zu betonen, dass die Ergebnisse meiner Masterarbeit
            <span className="font-semibold text-accent-3">
              {" "}
              ausschliesslich auf Informationen aus Street-Level-Bildern und Luftbildern beruhen,
            </span>{" "}
            die mit meinem selbst entwickelten KI-Modell automatisch erkannt wurden.
            Andere wichtige Faktoren,
            wie Verkehrsdichte, Unfalldaten oder die Qualität der Infrastruktur,
            wurden nicht berücksichtigt. In einer späteren Version (nach meiner Masterarbeit) könnte ich aber noch mehr programmieren und zum Beispiel
            weitere GIS-Daten der Stadt Zürich in mein Modell einbeziehen, um die Sicherheit umfassender zu bewerten. Daher sollten die Resultate als erster
            explorativer Ansatz verstanden werden und ersetzen keine offiziellen
            Bewertungen der Schulwegsicherheit.
            <br /><br />
            Ebenfalls können die Street-Level-Bilder zeitlich veraltet sein oder
            nicht alle Strassenabschnitte abdecken. Auch die Qualität der
            Luftbilder kann variieren, was die Erkennung von Objekten erschwert.
            Diese Limitationen sollten bei der Interpretation der Ergebnisse
            stets berücksichtigt werden.
            <br /><br />
            Zudem ist zu beachten, dass die Schulwegsicherheit stark von subjektiven Faktoren 
            abhängt, wie etwa dem Alter des Kindes, dem Geschlecht, individuellen Bedürfnissen 
            oder der persönlichen Risikobereitschaft.
            <br /><br />

            Weitere Limitationen werde ich im Verlauf des nächsten Monats
            detailliert erarbeiten und in meine Masterarbeit integrieren.
          </p>
        </div>
      </FadeInOnScroll>

      {/* ======================================== */}
      {/* Weitere Impressionen */}
      {/* ======================================== */}
      <FadeInOnScroll>
        <SectionSeparator text="Weitere Impressionen" className="mb-10" />
      </FadeInOnScroll>

      {/* Einführung */}
      <FadeInOnScroll>
        <div className="max-w-5xl mx-auto px-4 mb-12">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Die folgenden Impressionen zeigen Zwischenschritte und Ergebnisse
            der Methodik – von der Verknüpfung erkannter Objekte mit dem Strassennetz,
            über die Bewertung der Modelle, bis hin zu grossräumigen Karten mit allen
            erkannten Objekten aus SWISSIMAGE und Mapillary.
          </p>
        </div>
      </FadeInOnScroll>

      {/* Schritt 1: Verknüpfung Objekte & Strassennetz */}
{/* YOLO Detection Beispiel */}
<FadeInOnScroll>
  <div className="max-w-5xl mx-auto px-4 mb-10">
    <div className="grid grid-cols-1 gap-6">
      <ZoomableImage
        src="/img/Masterarbeit/yolo_detection_example1.jpg"
        alt="YOLO Detection Beispiel"
        width={1200}
        height={800}
        caption="Beispiel einer YOLO-Detektion: Mein Modell erkennt sicherheitsrelevante Objekte wie Zebrastreifen oder Ampeln."
      />
    </div>
  </div>
</FadeInOnScroll>

<FadeInOnScroll>
  <div className="max-w-5xl mx-auto px-4 mb-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ZoomableImage
        src="/img/Masterarbeit/Methodology_Classification_SWISSIMAGE_match2.png"
        alt="Coverage pro Strassensegment"
        width={800}
        height={600}
        caption="Hier erkennt mein Modell die Tramlinien von Zürich sehr deutlich. Diese wurden ausschliesslich anhand der Luftbilder identifiziert."
      />
      <ZoomableImage
        src="/img/Masterarbeit/boxplot_conf_per_class.png"
        alt="Verteilung der Modell-Konfidenzen pro Klasse"
        width={1000}
        height={700}
        caption="Verteilung der Modell-Konfidenzen pro Klasse (Boxplot). Diese Klassen wurden in den Luftbildern von meiner trainierten KI erkannt."
      />
    </div>
  </div>
</FadeInOnScroll>


      {/* Schritt 3: Ergebnisse auf SWISSIMAGE */}
      <FadeInOnScroll>
        <div className="max-w-5xl mx-auto px-4 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-3 rounded-xl shadow-xl">
              <ZoomableImage
                src="/img/Masterarbeit/SWISSIMAGE_Detections_1.png"
                alt="SWISSIMAGE Detections – Innenstadt Detail"
                width={800}
                height={800}
                caption="Übersicht aller erkannten Objekte vom Luftbild in der Stadt Zürich."
              />
            </div>
            <div className="bg-white p-3 rounded-xl shadow-xl">
              <ZoomableImage
                src="/img/Masterarbeit/SWISSIMAGE_Detections_2.png"
                alt="SWISSIMAGE Detections – Innenstadt Luftbild"
                width={800}
                height={800}
                caption="Hier näher herangezoomt auf die Innenstadt. Es sind viele Klassen erkannt worden."
              />
            </div>
            <div className="bg-white p-3 rounded-xl shadow-xl">
              <ZoomableImage
                src="/img/Masterarbeit/SWISSIMAGE_Detections_3.png"
                alt="SWISSIMAGE Detections – Stadt Zürich gesamt"
                width={800}
                height={800}
                caption="Detailansicht bei der Sihlbrücke."
              />
            </div>
            <div className="bg-white p-3 rounded-xl shadow-xl">
              <ZoomableImage
                src="/img/Masterarbeit/SWISSIMAGE_Detections_4.png"
                alt="SWISSIMAGE Detections – Quartierdetail"
                width={800}
                height={800}
                caption="Detailansicht bei der Sihlbrücke mit Luftbild."
              />
            </div>
          </div>
        </div>
      </FadeInOnScroll>

      {/* Schritt 4: Ergebnisse auf Mapillary */}
      <FadeInOnScroll>
        <div className="max-w-5xl mx-auto px-4 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-3 rounded-xl shadow-xl">
              <ZoomableImage
                src="/img/Masterarbeit/Overview_Mapillary1.png"
                alt="Mapillary Crosswalk Punkte"
                width={800}
                height={800}
                caption="Hier sieht man die erkannten Zebrastreifen aus den Street-Level Bildern, erkannt durch meine trainierte KI."
              />
            </div>
            <div className="bg-white p-3 rounded-xl shadow-xl">
              <ZoomableImage
                src="/img/Masterarbeit/Overview_Mapillary2.png"
                alt="Mapillary Crosswalk Raster"
                width={800}
                height={800}
                caption="Hier sind die Wahrscheinlichkeiten für Zebrastreifen dargestellt."
              />
            </div>
          </div>
        </div>
      </FadeInOnScroll>


      {/* ======================================== */}
      {/* Kontakt & Rückmeldung */}
      {/* ======================================== */}
      <FadeInOnScroll>
        <SectionSeparator text="Kontakt & Rückmeldung" className="mb-6" />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <div className="max-w-5xl mx-auto px-4 mb-20">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
              Ich freue mich über Rückmeldungen, Fragen oder Anregungen zu meiner Masterarbeit.
              Sehr gerne können Sie mich direkt per E-Mail kontaktieren oder sich über LinkedIn mit mir vernetzen.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* LinkedIn Button */}
              <a
                href="https://www.linkedin.com/in/claude-widmer-a93315251/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-6 py-3 text-center rounded-lg bg-accent-3 text-white font-semibold shadow hover:bg-accent-3/90 transition"
              >
                LinkedIn Profil ansehen
              </a>
              {/* Email Button */}
              <a
                href="mailto:claude.widmer@uzh.ch"
                className="flex-1 sm:flex-initial px-6 py-3 text-center rounded-lg bg-gray-100 text-gray-700 font-semibold shadow border border-gray-300 hover:bg-gray-200 transition"
              >
                E-Mail schreiben
              </a>
            </div>
          </div>
        </div>
      </FadeInOnScroll>

      {/* ======================================== */}
      {/* Blogbeiträge zur Masterarbeit */}
      {/* ======================================== */}
      {filteredPosts.length > 0 && (
        <>
          <FadeInOnScroll>
            <SectionSeparator text="Beiträge zur Masterarbeit" className="mb-6" />
          </FadeInOnScroll>

          <FadeInOnScroll>
            <div className="max-w-5xl mx-auto px-4 mb-20">
              <p className="text-lg text-gray-700 mb-6 text-center">
                Für weiterführende Informationen und technische Details zur Masterarbeit
                stehen folgende Blogbeiträge zur Verfügung:
              </p>
              <div className="max-w-5xl mx-auto px-4">
                <BlogListSimple posts={filteredPosts} tag={tag} />
              </div>
            </div>
          </FadeInOnScroll>
        </>
      )}

    </main>
  );
}
