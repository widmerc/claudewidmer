"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images?: { src: string; alt?: string }[];
  folder?: string; // Neu: Ordnername als Input
  title?: string;
}

export default function ImageGallery({ images, folder, title }: ImageGalleryProps) {
  const [galleryImages, setGalleryImages] = useState<{ src: string; alt?: string }[]>(images || []);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
  };
  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
  };

  // ESC zum Schließen des Lightbox-Vollbildmodus
  React.useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <section className="my-8">
      {title && <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryImages.map((img, i) => (
          <div key={img.src} className="flex flex-col items-center">
            <Image
              src={img.src}
              alt={img.alt || `Bild ${i + 1}`}
              className="rounded-lg shadow-lg max-h-[400px] w-full object-cover max-w-3xl mb-2 cursor-pointer transition-transform hover:scale-105"
              width={800}
              height={400}
              onClick={() => setLightboxIndex(i)}
              style={{ objectFit: 'cover', cursor: 'pointer' }}
            />
            {img.alt && <span className="text-sm text-gray-500 mt-1">{img.alt}</span>}
          </div>
        ))}
      </div>
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-80 backdrop-blur-sm pt-16 sm:pt-24"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-full w-full h-full flex flex-col items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-accent-2 text-5xl font-bold bg-white bg-opacity-60 rounded-full w-16 h-16 flex items-center justify-center hover:bg-accent-1 hover:text-black hover:bg-opacity-90 transition border-4 border-accent-2"
              onClick={closeLightbox}
              aria-label="Schließen"
              style={{zIndex: 10}}
            >
              ×
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-1 bg-white text-5xl font-bold bg-opacity-60 rounded-full w-16 h-16 flex items-center justify-center hover:bg-accent-1 hover:text-black hover:bg-opacity-90 transition border-4 border-accent-1"
              onClick={showPrev}
              aria-label="Vorheriges Bild"
              style={{zIndex: 10}}
            >
              ‹
            </button>
            <Image
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt || ''}
              className="lightbox-img rounded-lg shadow-2xl max-h-[calc(98vh-4rem)] w-auto max-w-[98vw] object-contain"
              width={1200}
              height={800}
              style={{boxShadow: '0 0 40px 8px rgba(0,0,0,0.7)', objectFit: 'contain'}} 
              priority
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-accent-1 bg-white text-5xl font-bold bg-opacity-60 rounded-full w-16 h-16 flex items-center justify-center hover:bg-accent-1 hover:text-black hover:bg-opacity-90 transition border-4 border-accent-1"
              onClick={showNext}
              aria-label="Nächstes Bild"
              style={{zIndex: 10}}
            >
              ›
            </button>
            {galleryImages[lightboxIndex].alt && (
              <span className="text-white text-lg mt-6 bg-opacity-40 px-6 py-3 rounded shadow-lg">
                {galleryImages[lightboxIndex].alt}
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
