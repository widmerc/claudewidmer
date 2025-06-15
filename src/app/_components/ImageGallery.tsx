"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface ImageGalleryProps {
  images?: { src: string; alt?: string }[];
  folder?: string;
  title?: string;
  showAll?: boolean; // Neu: steuert, ob alle Bilder oder nur das erste angezeigt werden
}

// Hilfsfunktion für Geräteerkennung
function isMobile() {
  if (typeof window === 'undefined') return false;
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(window.navigator.userAgent);
}

export default function ImageGallery({ images, folder, title, showAll = true }: ImageGalleryProps) {
  const [galleryImages, setGalleryImages] = useState<{ src: string; alt?: string }[]>(images || []);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Wenn folder gesetzt ist, lade alle Bilder aus dem Ordner (nur clientseitig!)
  useEffect(() => {
    if (!folder) return;
    async function fetchImages() {
      const res = await fetch(`/api/list-images?folder=${encodeURIComponent(folder ?? '')}`);
      if (res.ok) {
        const files: string[] = await res.json();
        setGalleryImages(files.map(f => ({ src: `${folder}/${f}` })));
      }
    }
    fetchImages();
  }, [folder]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      // entfernt: setLightboxVisible(true);
    }
  }, [lightboxIndex]);

  const closeLightbox = () => {
    // entfernt: setLightboxVisible(false);
    setTimeout(() => setLightboxIndex(null), 250); // Nach Animation entfernen
  };

  // ESC zum Schließen des Lightbox-Vollbildmodus und Scroll-Lock, sowie Pfeiltasten für Navigation
  React.useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setLightboxIndex(prev => prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null);
      if (e.key === 'ArrowRight') setLightboxIndex(prev => prev !== null ? (prev + 1) % galleryImages.length : null);
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
    // eslint-disable-next-line
  }, [lightboxIndex]);

  const visibleImages = showAll ? galleryImages : galleryImages.slice(0, 1);

  return (
    <section className="my-8">
      {title && <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {visibleImages.map((img, i) => (
      <div key={img.src} className="flex flex-col items-center">
      <div
        className={`relative w-full`}
        style={{ maxWidth: 800, maxHeight: 400 }}
      >
        {/* Karteikarten-Effekt, nur wenn showAll=false und mehrere Bilder */}
        {!showAll && galleryImages.length > 1 && (
        <>
        <div className="absolute left-2 top-2 w-[96%] h-[92%] rounded-lg bg-gray-300 opacity-40 z-0 rotate-2" style={{boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}} />
        <div className="absolute left-4 top-4 w-[92%] h-[88%] rounded-lg bg-gray-300 opacity-30 z-0 -rotate-2" style={{boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}} />
        </>
        )}
        <Image
        src={img.src}
        alt={img.alt || `Bild ${i + 1}`}
        className={`relative rounded-lg shadow-lg max-h-[400px] w-full object-cover max-w-3xl mb-2 cursor-pointer transition-transform hover:scale-105 ${!isMobile() ? 'hover:z-20 group' : ''}`}
        width={800}
        height={400}
        onClick={() => { setOpen(true); setCurrentIndex(i); }}
        style={{ objectFit: 'cover', cursor: 'pointer', transition: 'transform 0.3s', zIndex: 1, scrollBehavior: 'smooth' }}
        />
        {!showAll && galleryImages.length > 1 && (
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs rounded px-2 py-1 flex items-center gap-1 z-10">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Zm2 0v14h12V5H6Zm2 2h8v2H8V7Zm0 4h8v2H8v-2Zm0 4h5v2H8v-2Z"/></svg>
        Galerie ({galleryImages.length} Bilder)
        </div>
        )}
      </div>
      {img.alt && <span className="text-sm text-gray-500 mt-1">{img.alt}</span>}
      </div>
      ))}
      </div>
      <Lightbox
      open={open}
      close={() => setOpen(false)}
      slides={galleryImages.map(img => ({ src: img.src, description: img.alt }))}
      index={currentIndex}
      plugins={[Captions, Thumbnails, Slideshow, Fullscreen, Zoom]}
      carousel={{ finite: false }}
      animation={{ swipe: 300 }}
      zoom={{
      maxZoomPixelRatio: 4,
      scrollToZoom: false,
      zoomInMultiplier: 2,
      doubleTapDelay: 300,
      }}
      styles={{
      container: { background: "rgba(0,0,0,0.8)", scrollBehavior: "smooth" },
      }}
      />
    </section>
  );
}