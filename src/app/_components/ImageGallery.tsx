"use client";

import React, { useState } from 'react';

interface ImageGalleryProps {
  images: { src: string; alt?: string }[];
  title?: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  };
  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  };

  return (
    <section className="my-8">
      {title && <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <div key={img.src} className="flex flex-col items-center">
            <img
              src={img.src}
              alt={img.alt || `Bild ${i + 1}`}
              className="rounded-lg shadow-lg max-h-[400px] w-full object-cover max-w-3xl mb-2 cursor-pointer transition-transform hover:scale-105"
              onClick={() => openLightbox(i)}
            />
            {img.alt && <span className="text-sm text-gray-500 mt-1">{img.alt}</span>}
          </div>
        ))}
      </div>
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-80 backdrop-blur-sm"
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
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt || ''}
              className="lightbox-img rounded-lg shadow-2xl max-h-[98vh] w-auto max-w-[98vw] object-contain"
              style={{boxShadow: '0 0 40px 8px rgba(0,0,0,0.7)'}}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-accent-1 bg-white text-5xl font-bold bg-opacity-60 rounded-full w-16 h-16 flex items-center justify-center hover:bg-accent-1 hover:text-black hover:bg-opacity-90 transition border-4 border-accent-1"
              onClick={showNext}
              aria-label="Nächstes Bild"
              style={{zIndex: 10}}
            >
              ›
            </button>
            {images[lightboxIndex].alt && (
              <span className="text-white text-lg mt-6 bg-opacity-40 px-6 py-3 rounded shadow-lg">
                {images[lightboxIndex].alt}
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
