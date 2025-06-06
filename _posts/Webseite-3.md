---
title: "Webseite Teil 3 – About Me & Skills"
excerpt: "In diesem Teil zeige ich, wie ich die Komponente AboutMe aufgebaut habe – inklusive interaktiver SkillCards."
coverImage: "/img/Webseite-3/Titelbild.png"
date: "2025-04-11T12:00:00.000Z"
author:
  name: Claude Widmer
  picture: "/img/Webseite-3/Titelbild.png"
ogImage:
  url: "/img/Webseite-3/Titelbild.png"
tags: ["Webseite"]
---

# 🙋‍♂️ Webseite Teil 3 – About Me & Skills

Nach dem visuellen Einstieg mit der `TitleScreen`-Komponente folgt direkt der Bereich **„Über mich“**. Diese Sektion soll Besucher:innen zeigen, **wer ich bin**, **was ich mache** und **womit ich arbeite**.

---

## 👤 `AboutMe.tsx` – Wer steckt hinter der Seite?

Die Komponente `AboutMe.tsx` besteht aus drei Bereichen:

1. **Ein Titel** – klar und zentriert.
2. **Ein kurzer Vorstellungstext** – wer ich bin, was ich beruflich mache und was man auf der Seite erwarten kann.
3. **Ein Grid aus sogenannten SkillCards** – interaktive Karten, die Technologien und Tools zeigen, mit denen ich arbeite.

---

## 🧩 Code-Struktur (vereinfacht)

```tsx
<PageWrapper>
  <h1>Über mich</h1>
  <p>Ich bin Claude Widmer und arbeite im GIS-Bereich ...</p>

  <div className="grid ...">
    <SkillCard backgroundImage="./img/QGIS.png" text="QGIS" />
    <SkillCard backgroundImage="./img/PyQGIS.png" text="QGIS Plugins" />
    ...
  </div>
</PageWrapper>
```

---

## 🛠️ `SkillCard.tsx` – visuelle Übersicht meiner Tools

Jede `SkillCard` ist eine kleine interaktive Kachel mit einem Bild im Hintergrund (z. B. QGIS-Logo) und einem Titel, der beim Hover eingeblendet wird.  
Das Ganze funktioniert mit Tailwind CSS und etwas Hover-Logik:

```tsx
<div
  className="relative bg-cover bg-center p-8 rounded-lg border-4 group"
  style={{ backgroundImage: `url(${backgroundImage})` }}
>
  <div className="absolute inset-0 bg-white dark:bg-gray-800 opacity-0 group-hover:opacity-90 transition-opacity duration-500 z-0"></div>
  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white opacity-0 group-hover:opacity-100 z-10">
    {text}
  </h2>
</div>
```

---

## 🎯 Warum das so gebaut ist

Ich wollte bewusst eine Kombination aus **Inhalt + Visualisierung**:  
Etwas Text, aber auch etwas zum „Klicken“ und Entdecken – ohne gleich mit zu vielen Infos zu überfordern.  
Die Karten sind responsiv, passen sich dem Bildschirm an und machen die wichtigsten Skills visuell erfassbar.

---

## 🔜 Wie geht’s weiter?

Im nächsten Teil geht es um den **Kartenbereich und meinen Lebenslauf (`CV.tsx`)** – wie ich meinen Werdegang übersichtlich darstelle und welche interaktiven Elemente dabei zum Einsatz kommen.

---

Claude 👨‍💻
