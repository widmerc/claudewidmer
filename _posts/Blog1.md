---
title: "Schulwegsicherheit automatisiert bewerten (Teil 1)"
excerpt: "Wie sicher sind unsere Schulwege wirklich – und wie kann moderne Technologie helfen, das objektiv zu bewerten? In meiner neuen Blog-Serie nehme ich euch mit auf die Reise durch meine Masterarbeit über automatisierte Schulwegsicherheit in Zürich."
coverImage: "/img/Blog1/Title.png"
date: "2025-05-20T05:35:07.322Z"
author:
  name: Claude Widmer
  picture: "/img/Blog1/Title.png"
ogImage:
  url: "/img/Blog1/Title.png"
tags: ["Masterarbeit"]

---
## Teil 1: Thema und Motivation

Willkommen zur ersten Ausgabe meiner Blog-Serie zur Masterarbeit. Ich möchte euch hier regelmässig mitnehmen in die verschiedenen Phasen meines Projekts – von der ersten Idee bis zur finalen Umsetzung. Dabei soll der Blog nicht nur mein persönlicher Prozess dokumentieren, sondern auch Fachinteressierten, Stadtplanenden oder einfach neugierigen Leserinnen und Lesern spannende Einblicke geben.

## Thema: Automatisierte Bewertung von Schulwegsicherheit mit Computer Vision

Die Sicherheit von Schulwegen ist ein zentrales Thema – nicht nur für Zürich. Wenn Kinder ihren Schulweg alleine bewältigen, müssen sie sich in komplexen Verkehrssituationen orientieren können. Der städtische Raum sollte sie dabei bestmöglich schützen.

Heute existieren in vielen Städten Schulwegkarten – auch Zürich hat solche entwickelt ([hier mehr](https://www.stadt-zuerich.ch/schulen/de/organisation/schulwegsicherheit.html)). Das Problem: Diese basieren meist auf **manuellen Einschätzungen**. Die Bewertungen sind dadurch **zeitintensiv**, **wenig skalierbar** und zum Teil **subjektiv**.

Genau hier setzt meine Masterarbeit an. Ich entwickle ein **automatisiertes Framework**, das auf Basis von **Street-Level-Bildern (Mapillary)**, **OpenStreetMap-Daten** und **Computer-Vision-Technologien** wie **YOLO** (You Only Look Once) sicherheitsrelevante Merkmale automatisch erkennt. Dazu gehören u.a.:

- Fussgängerstreifen  
- Verkehrsinseln  
- Ampeln  
- Schulzonen und Temporeduktionen  
- Fahrbahnbreite und Sichtverhältnisse 
- ... 

## Motivation: Warum ist das relevant?

![Kinder im Verkehr Illustration](https://www.tcs.ch/mam/Digital-Media/Images/Illustrations/weblication/wThumbnails/die-strasse-und-ich-fussgaengerstreifen-9514cd287b1cc43g2a3d1ddd6e5be85b.webp)
*Foto: Illustration TCS Schweiz*

Die Motivation für meine Arbeit ist dreigeteilt:

1. **Gesellschaftlich**: Kinder sollen ihren Schulweg sicher und selbständig zurücklegen können. Nur wenn Wege sicher sind, ist aktive Mobilität im Alltag möglich – mit positiven Folgen für Gesundheit, Umwelt und Stadtklima.

2. **Fachlich**: In der Forschung gibt es zwar zahlreiche Studien zu Schulwegsicherheit oder auch zur Nutzung von Street-Level Imagery in der Stadtplanung – doch die Kombination beider Ansätze wurde bislang kaum gemacht.

3. **Technologisch**: Der Einsatz von Computer Vision in der urbanen Analyse ist ein dynamisches Feld. Die Möglichkeit, damit automatisiert Infrastrukturmerkmale zu erkennen, eröffnet ganz neue Perspektiven für datenbasierte Stadtplanung.

## Mein Workflow: Von der Idee zur Umsetzung

Die Masterarbeit folgt einem klar strukturierten Arbeitsprozess, der mehrere Phasen umfasst:

1. **Datenbeschaffung**  
   Sammlung und Aufbereitung von Mapillary-Bildern, OSM-Daten und städtischen Geodaten

   
<div class="responsive-iframe">
  <iframe
    src="https://www.mapillary.com/embed?map_style=Mapillary%20light&image_key=1453935251611353&x=0.5&y=0.5&style=split"
    allowfullscreen
  ></iframe>
</div>

*Mapillary ist eine open-source Datenbank für strassenbasierte Bilder*


2. **Feature-Erkennung**  
   Anwendung von Objekterkennungsalgorithmen (z. B. YOLO) auf Street-Level-Bilder zur Identifikation sicherheitsrelevanter Merkmale

3. **Georeferenzierung & Netzwerkmodellierung**  
   Zuordnung der erkannten Merkmale auf ein GIS-Netzwerk/GIS-Karte – dabei Abwägung zwischen Vektor- und Rasterdaten

4. **Klassifikation**  
   Bewertung der Sicherheit mittels Machine Learning (z. B. Entscheidungsbäume, Random Forest oder neuronale Netze)

5. **Validierung**  
   Abgleich mit offiziellen Schulwegplänen und punktueller Vor-Ort-Kontrolle ausgewählter Routen

6. **Übertragbarkeit**  
   Diskussion, wie sich das Framework auf andere Städte und Regionen anwenden lässt

7. **Visualisierung**
   Eine visuell schöne Darstellung der Karte und einen möglichen Routenmechanismus

## Ausblick

Die kommenden Beiträge dieser Blog-Serie werden jeweils einen dieser Schritte näher beleuchten. Ich werde über technische Herausforderungen schreiben, über ethische Fragen beim Einsatz von KI im öffentlichen Raum und auch über ganz praktische Dinge: Welche Daten waren schwer zu bekommen? Was hat gut funktioniert – und was weniger?

---

Bleibt also dran – im nächsten Beitrag geht es um den ersten technischen Ansatz und meine ersten Experimente mit YOLO auf **SWISSIMAGE-Luftbildern** zur Erkennung sicherheitsrelevanter Merkmale aus der Vogelperspektive.
