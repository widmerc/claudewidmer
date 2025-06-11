---
title: "Schulwegsicherheit automatisiert bewerten (Teil 2)"
excerpt: "Im zweiten Teil zeige ich, wie ich YOLOv11 mit gedrehten Bounding Boxes auf Luftbilder anwende, um Fussgängerstreifen automatisiert zu erkennen – und damit den ersten Schritt zur KI-gestützten Schulwegklassifikation mache."
coverImage: "/img/Blog2/Title.jpg"


date: "2025-06-01T12:00:00.000Z"
author:
  name: Claude Widmer
  picture: "/img/Blog2/Title.jpg"
ogImage:
  url: "/img/Blog2/Title.jpg"
tags: ["Masterarbeit"]

---
## KI auf Luftbildern: **Fussgängerstreifen automatisch erkennen**

Nachdem ich im ersten Teil meine Motivation und den konzeptionellen Rahmen vorgestellt habe, geht es nun ans **Eigentliche**:

> Ich habe ein erstes Modell trainiert, das **Fussgängerstreifen in Luftbildern automatisch erkennt** – auf Basis von **YOLOv11** mit **gedrehten Bounding Boxes (OBB)**.

**Das Ziel:**
> **Automatisierte Erkennung von Fussgängern und anderen Merkmalen auf Luftbildern**


---


## Was habe ich vor – was ist **Image Recognition**?

Image Recognition ist eine Art von **Artificial Intelligence (AI)**. In einfachen Worten: Sie versucht, Muster und Objekte in Bildern zu erkennen – ähnlich wie das menschliche Auge, nur automatisiert und viel schneller.

### Was sind die **Inputs**?
- **Viele verschiedene Klassifikationen:** Für ein gutes Modell braucht man oft **mindestens 1000 Bilder pro Klasse**.
  - Ich habe zunächst nur **2 Klassen** verwendet: **Fussgänger** und **Vortrittsregeln**.
  - *(Siehe Beispielbild unten)*

  <img src="/img/blog2/Blog1_Klassifikationen.png" alt="Klassifikationen" style="aspect-ratio: 5/3;" />


- **Viele Bounding Boxes:** Also Boxen, die zeigen, wo sich welches Feature befindet: Klasse, x1, x2, x3, x4, y1, y2, y3, y4 *(siehe YOLO Oriented Bounding Boxes)*

  <img src="/img/Blog2/aabb_vs_obb_madmann91_github.svg" alt="Bounding Boxes" style="aspect-ratio: 5/3;" />

### Und jetzt?

Mit einer Programmiersprache – ich benutze **Python** – kann man bereits vortrainierte Modelle nutzen, um diese mit eigenen Daten weiter zu trainieren. Je komplexer das Modell, desto länger dauert das Training (tendenziell), aber auch die Ergebnisse werden besser.

> **Für meine Masterarbeit verwende ich YOLOv11** – ein kostenloses Modell für Forschungszwecke. Alternativen wären z.B. FastCRN oder andere.

Wie läuft das Training ab?

#### Mein Setting
Für diese Modelle braucht man einen **leistungsstarken PC** oder Cloud-Services. Mein Setup:s
- **Ryzen 7900x** und **RTX4080** (CUDA für YOLO Training)
- **Gute Internetverbindung** (über 20GB Luftbilder werden benötigt)
- **6–7 Stunden Wartezeit**
<img src="/img/blog2/My_Setting.jpg" alt="MySetting" style="max-width: 50%;" />



### **Python Code – Schritt für Schritt**

1. **Herunterladen aller Luftbilder**, die mit den Oriented Bounding Boxes überschneiden.
2. **Zuschneiden** der Luftbilder in 512x512px Bilder (.tif): Die Koordinaten bleiben erhalten und sind georeferenziert.
3. **Umrechnen der Bounding Box-Koordinaten** auf relative Werte (YOLO-Standard).
![Dummy Bild: Koordinatenumrechnung](https://dummyimage.com/400x200/cccccc/000000&text=Koordinatenumrechnung)
4. **Modelltraining starten:**
   - Je mehr **Epochs** (Wiederholungen), desto besser lernt das Modell.
   - Je mehr **Bilder pro Durchlauf**, desto schneller das Training (aber auch höhere Hardware-Anforderungen).
   - **Komplexere Modelle** finden mehr Features (z.B. ist das Nano-Modell schlechter als das Small- oder Medium-Modell).
5. Nach ca. **5–6 Stunden Trainingszeit** habe ich die Bounding Boxes der erkannten Features.
6. **Umrechnung** von relativen zu absoluten Koordinaten und **Validierung der Ergebnisse**.
7. Jetzt kann das Modell **beliebig viele Luftbilder in wenigen Millisekunden bewerten**.

---

### **Python: Technisch**

Für alle, die es genauer wissen wollen, gibt es einen eigenen Beitrag (Teil 2.1), der die technischen Hintergründe erklärt.

---

## **Resultat**

Ich habe mein trainiertes Modell jetzt für die **Region Zürich** angewendet. Hier seht ihr das Resultat in einer **modularen Webkarte**:

![Dummy Bild: Webkarte Resultat](https://dummyimage.com/600x300/cccccc/000000&text=Webkarte+mit+Bounding+Boxes)

*(Leaflet Map / RShiny mit allen Oriented Bounding Boxes und WMS-Hintergrundkarte)*

---

## **Ausblick**

Im nächsten Beitrag (Teil 3) geht es um die **Erarbeitung eines automatisierten Workflows**: Wie kann ich mein "Rezeptbuch" für die Allgemeinheit (mit Python-Erfahrung) zur Verfügung stellen?

**Bleibt dran!**

---
Claude