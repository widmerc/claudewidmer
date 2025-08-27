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
    default: 'Claude Widmer',
    template: '%s | Claude Widmer',
  },
  description: 'Geoinformatik, räumliche Datenanalyse und moderne Webtechnologien – Projekte & Blog von Claude Widmer.',
  openGraph: {
    siteName: 'claudewidmer.ch',
    type: 'website',
    url: siteUrl,
    title: 'Claude Widmer',
    description: 'Geoinformatik, räumliche Datenanalyse und moderne Webtechnologien – Projekte & Blog.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Widmer',
    description: 'Geoinformatik, räumliche Datenanalyse und moderne Webtechnologien – Projekte & Blog.',
  },
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
  <title>Claude Widmer</title>
        <link rel='icon' href='favicon/favicon.ico' />
        {/* Add other head elements like Favicon here */}
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