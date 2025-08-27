## claudewidmer.ch

Persönliche Website & Blog: https://www.claudewidmer.ch/

Features:
- Next.js App Router (TypeScript, MDX Blogs)
- Dynamische Blogseiten /blogs/[slug]
- SEO: sitemap.xml, robots.txt, Canonical, Open Graph, Twitter Cards
- Strukturierte Daten (Article JSON-LD) für Rich Results
- Tags & vorheriger/nächster Beitrag mit thematischer Logik
- Skill Radar, CV, interaktive Komponenten

Projektstruktur (Auszug):
src/app – Routen & Seiten
src/blogs – MDX Blogposts
src/lib/mdx.ts – Laden & Sortieren der Posts

Lokale Entwicklung:
pnpm install
pnpm dev

Wichtige ENV Variable (Deployment):
NEXT_PUBLIC_SITE_URL=https://www.claudewidmer.ch

Blog-Metadaten (Frontmatter in .mdx):
title, description, date, tags, coverImage

Deployment (z.B. Vercel):
1. Repo verbinden
2. ENV setzen
3. Build ausführen lassen

SEO Check nach Deployment:
- /robots.txt
- /sitemap.xml
- Einzelner Blog im Rich Results Test

Lizenz: privat / persönlich.
