import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./_components/Navbar";
import Footer from "./_components/footer";
import "@/app/globals.css";

// Simple cn utility to join class names
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="scroll-smooth">
        
        <body className={cn(inter.className, "bg-white text-gray-900 antialiased")}>        
      <Navbar />

        <main>
          {children}
        </main>

      <Footer />
      </body>
    </html>
  );
}
