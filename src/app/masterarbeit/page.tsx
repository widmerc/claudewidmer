import React from "react";
import PdfViewer from "../_components/PdfViewer";
import { getAllPosts } from "@/lib/api";
import Image from "next/image";
import PageWrapper from "@/app/_components/PageWrapper";
import { SectionSeparator } from "@/app/_components/section-separator";
import FadeInOnScroll from "@/app/_components/FadeInOnScroll";
import BlogListSimple, { Post } from "@/app/_components/BlogListSimple";

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
            <div className="bg-white p-3 rounded-xl shadow-xl inline-block max-w-3xl w-full">
              <Image
                src="/img/Masterarbeit/Overview.png"
                alt="Übersicht Zürich mit Wegenetz"
                width={1200}
                height={800}
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </FadeInOnScroll>

        {/* Einleitung */}
        <FadeInOnScroll>
          <div className="max-w-3xl mx-auto px-4 mb-12">
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
            <div className="bg-white p-3 rounded-xl shadow-xl inline-block max-w-3xl w-full">
              <Image
                src="/img/Masterarbeit/depth_example1.png"
                alt="Depth Beispiel"
                width={1200}
                height={800}
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </FadeInOnScroll>
        <FadeInOnScroll>
          <div className="max-w-3xl mx-auto px-4 mb-14">
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
            <div className="bg-white p-3 rounded-xl shadow-xl inline-block max-w-3xl w-full">
              <Image
                src="/img/Masterarbeit/yolo_detection_example1.jpg"
                alt="YOLO Detection Beispiel"
                width={1200}
                height={800}
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </FadeInOnScroll>
        <FadeInOnScroll>
          <div className="max-w-3xl mx-auto px-4 mb-12">
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
            </div>
          </div>
        </FadeInOnScroll>
        <FadeInOnScroll>
          <div className="max-w-3xl mx-auto px-4 mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              Diese erkannten Objekte werden mit dem Strassennetzwerk verknüpft
              und in Routing-Analysen integriert. So kann nicht nur der
              kürzeste, sondern auch der sicherste Schulweg berechnet werden.
            </p>
          </div>
        </FadeInOnScroll>

        {/* PDF Viewer */}
        <FadeInOnScroll>
          <div className="max-w-3xl mx-auto px-4 mb-16">
            <p className="text-base text-gray-600 mb-6">
              Hier kannst du den momentanen Stand der Arbeit direkt lesen oder
              herunterladen:
            </p>
            <PdfViewer url={PDF_URL} title="Masterarbeit PDF" height="78vh" />
          </div>
        </FadeInOnScroll>
        <FadeInOnScroll>
          <div className="max-w-3xl mx-auto px-4 mb-16">
            <PdfViewer url={PDF_URL2} title="Overview Road Network Classified Rule Based" height="78vh" />
          </div>

            <div className="max-w-3xl mx-auto px-4 mb-16">
            <PdfViewer url={PDF_URL3} title="Overview Road Network Classified ML" height="78vh" />
          </div>
        </FadeInOnScroll>


      </section>

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
