---
title: "Webseite Teil 2 – Der Einstieg: Die Titelseite"
excerpt: "Wie ich meine persönliche Startseite gestaltet habe – visuell, responsiv und klar strukturiert."
coverImage: "/img/Webseite-2/Titelbild.png"
date: "2025-04-07T12:00:00.000Z"
author:
  name: Claude Widmer
  picture: "/img/Webseite-2/Titelbild.png"
ogImage:
  url: "/img/Webseite-2/Titelbild.png"
tags: ["Webseite", "Next.js", "Komponenten"]
---

# 🌄 Webseite Teil 2 – Der Einstieg: Die Titelseite

Im [ersten Teil meines Blogposts](/blog/webseiteaufbau) habe ich beschrieben, wie ich meine Webseite technisch aufgebaut, strukturiert und mit Komponenten modularisiert habe. Nun möchte ich Schritt für Schritt auf die wichtigsten Bestandteile eingehen – und beginne ganz vorne: mit der **Titelseite**.

---

## 🎬 `TitleScreen.tsx` – Der visuelle Einstieg

Wenn man meine Webseite öffnet, sieht man als erstes ein ganzseitiges Bild mit einer klaren Botschaft: **wer ich bin** und **wofür ich stehe**. Diese erste Sektion nennt sich `TitleScreen.tsx` und erfüllt gleich mehrere Aufgaben:

- **Identität zeigen**: Mein Name steht im Zentrum, zusammen mit meinem Fachgebiet: GIS, QGIS, Data Science, Web-GIS.  
- **Stimmung setzen**: Das Hintergrundbild vermittelt Atmosphäre. Ich habe es bewusst grossflächig und dezent gehalten – keine Ablenkung, sondern ein ruhiger Einstieg.  
- **Responsive Design**: Die Schriftgrössen passen sich je nach Bildschirm an, damit es auch auf Smartphones gut aussieht.  
- **Usability-Element**: Ein animierter „Scroll down“-Pfeil unten signalisiert: Es geht weiter. Besucher:innen sollen neugierig nach unten scrollen.

---

### 🧩 Code-Struktur (Ausschnitt)

```tsx
<section className="relative w-full h-screen overflow-hidden">
  {/* HINTERGRUNDBILD */}
  <div
    className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
    style={{ backgroundImage: 'url(/img/background.png)' }}
  ></div>

  {/* DUNKLE ÜBERLAGERUNG */}
  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

  {/* ZENTRIERTER TEXT-INHALT */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
    <h1 className="text-5xl md:text-7xl font-bold">Claude Widmer</h1>
    <p className="text-lg md:text-2xl mt-4">GIS-Enthusiast | QGIS | Data Science | Web-GIS</p>
  </div>

  {/* PFEIL NACH UNTEN (INTERAKTIONS-HINWEIS) */}
  <div className="absolute bottom-20 left-0 right-0 flex justify-center animate-bounce text-white">
    <svg>...</svg>
    <span className="mb-2 text-lg">scroll down</span>
  </div>
</section>
```

---

## 🧠 Warum das wichtig ist

Der `TitleScreen` ist kein reines Designelement – er ist ein **digitaler erster Eindruck**.  
In wenigen Sekunden muss klar werden, worum es auf dieser Seite geht. Und genau das war mein Ziel:  
Einen aufgeräumten, fokussierten Einstieg zu schaffen, der **mich als Person, meine Themen und meine Arbeit** kurz und prägnant zusammenfasst.

---

## 🔜 Wie geht’s weiter?

Im nächsten Teil zeige ich dir die `AboutMe.tsx` Komponente – wo ich meinen Werdegang, meine Interessen und Skills darstelle.  
Diese Informationen sind direkt unter dem TitleScreen eingebettet – und machen den Einstieg in meine digitale Welt komplett.

---

Claude 👨‍💻
