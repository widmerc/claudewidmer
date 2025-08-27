import './globals.css'
import Navbar from './_components/Navbar'
import Footer from './_components/footer'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.claudewidmer.ch'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Claude Widmer – Geoinformatik & Web-GIS',
    template: '%s | Claude Widmer',
  },
  description: 'Offizielle Website von Claude Widmer: Geoinformatik, QGIS, räumliche Datenanalyse, Data Science und moderne Web-GIS Projekte. Blogartikel, Projekte, Lebenslauf und mehr.',
  keywords: ['Geoinformatik','QGIS','Web GIS','Data Science','Python','Next.js','Claude Widmer','räumliche Daten','GIS Schweiz'],
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
  openGraph: {
    siteName: 'claudewidmer.ch',
    type: 'website',
    url: siteUrl,
    title: 'Claude Widmer – Geoinformatik & Web-GIS',
    description: 'Geoinformatik, räumliche Datenanalyse, QGIS & moderne Webtechnologien – Projekte und Blog.',
    images: [
      // Prefer optimierte WebP; stelle sicher, dass /public/img/background.webp existiert.
      {
        url: `${siteUrl}/img/background.webp`,
        width: 1920,
        height: 1080,
        alt: 'Claude Widmer – Geoinformatik & Web-GIS',
        type: 'image/webp'
      },
      // Fallback PNG als zweite Option
      {
        url: `${siteUrl}/img/background.png`,
        width: 1920,
        height: 1080,
        alt: 'Claude Widmer – Geoinformatik & Web-GIS'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Widmer – Geoinformatik & Web-GIS',
    description: 'Geoinformatik, räumliche Datenanalyse & moderne Webtechnologien – Projekte & Blog.',
    images: [`${siteUrl}/img/background.webp`, `${siteUrl}/img/background.png`]
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: '/favicon/apple-touch-icon.png'
  }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='de' className='bg-white text-gray-900 antialiased'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        {/* Title is handled by Next.js metadata; static <title> kept as fallback */}
        <title>Claude Widmer – Geoinformatik & Web-GIS</title>
        <link rel='icon' href='favicon/favicon.ico' />
        {/* Structured Data: WebSite + Organization + Person */}
        <script
          type='application/ld+json'
          // Using one combined graph keeps payload small
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  url: siteUrl,
                  name: 'claudewidmer.ch',
                  inLanguage: 'de-CH',
                  description: 'Geoinformatik, QGIS, räumliche Datenanalyse, Data Science & moderne Web-GIS Projekte von Claude Widmer.',
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: `${siteUrl}/blog_overview?query={search_term_string}`,
                    'query-input': 'required name=search_term_string'
                  }
                },
                {
                  '@type': 'Organization',
                  name: 'Claude Widmer',
                  url: siteUrl,
                  logo: {
                    '@type': 'ImageObject',
                    url: `${siteUrl}/favicon/android-chrome-192x192.png`
                  },
                  sameAs: [
                    'https://github.com/widmerc',
                    'https://www.linkedin.com/in/claude-widmer'
                  ]
                },
                {
                  '@type': 'Person',
                  name: 'Claude Widmer',
                  url: siteUrl,
                  worksFor: { '@type': 'Organization', name: 'Claude Widmer' },
                  sameAs: [
                    'https://github.com/widmerc',
                    'https://www.linkedin.com/in/claude-widmer'
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}