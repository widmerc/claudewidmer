import './globals.css'
import Navbar from './_components/Navbar'
import Footer from './_components/footer'

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
      </body>
    </html>
  )
}