---
title: "Schulwegsicherheit automatisiert bewerten (Teil 2)"
excerpt: "Im zweiten Teil zeige ich, wie ich YOLOv11 mit gedrehten Bounding Boxes auf Luftbilder anwende, um Fussgängerstreifen automatisiert zu erkennen – und damit den ersten Schritt zur KI-gestützten Schulwegklassifikation mache."
coverImage: "/img/Blog1/Title.png"


date: "2025-06-01T12:00:00.000Z"
author:
  name: Claude Widmer
  picture: "/img/Blog1/Title.png"
ogImage:
  url: "/img/Blog1/Title.png"
tags: ["Masterarbeit", "YOLO11", "Technisch"]

---

# Schulwegsicherheit automatisiert bewerten (Teil 2)
(#Masterarbeit #YOLOv11 #Rastermodell #StreetSafety)

## KI auf Luftbildern: Fussgängerstreifen automatisch erkennen

Nachdem ich im ersten Teil meine Motivation und den konzeptionellen Rahmen vorgestellt habe, geht es nun ans Eingemachte:  
Ich habe ein erstes Modell trainiert, das Fussgängerstreifen in Luftbildern automatisch erkennt – auf Basis von **YOLOv11** mit **gedrehten Bounding Boxes (OBB)**.

Das Ziel:  
> **Automatisierte Erkennung von Fussgängern und anderen Merkmalen auf Luftbildern**

---

## Mein Setting
Python, eigener PC mit ryzen 7900x und RTX4080 (cuda für YOLO Training), Internetverbindung ;).


### Python: Klassenbasiert
-> ich habe verschiedene Klassen für das Projekt gemacht:
... 
...
...
...

Danach habe ich mein eigenes "rezeptbuch" gehabt, was alles automatishc macht:
1. in QGIS Linien zeichnen und als Attribut die Art des Features beschreiben
2. Die Pyhton Klasse CreateBoundingBox ausführen
3. ...