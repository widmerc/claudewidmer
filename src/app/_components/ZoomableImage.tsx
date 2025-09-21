"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ZoomableImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
    className?: string;
}

export default function ZoomableImage({
    src,
    alt,
    width,
    height,
    caption,
    className,
}: ZoomableImageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [closing, setClosing] = useState(false);

    // Escape-Key schliesst Vollbild
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") startClose();
        };
        if (isOpen) window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen]);

    // Scroll-Lock für Body
    useEffect(() => {
        if (isOpen) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = prev;
            };
        }
    }, [isOpen]);

    const startClose = () => {
        setClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setClosing(false);
        }, 300);
    };

    return (
        <>
            {/* Thumbnail */}
            <div
                className={`cursor-pointer rounded-xl overflow-hidden bg-white shadow-lg ${className || ""}`}
                onClick={() => setIsOpen(true)}
            >
                <div className="relative m-2 border border-gray-300 rounded-lg overflow-hidden group">
                    <Image
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        className="w-full h-auto object-contain transition-transform group-hover:scale-102"
                    />
                    {/* Overlay beim Hover */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs sm:text-sm py-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                        Zum Vergrössern anklicken
                    </div>
                </div>
                {caption && (
                    <div className="px-3 py-2 border-t border-gray-200 bg-white text-center">
                        <p className="text-base text-gray-800 leading-relaxed">{caption}</p>
                    </div>
                )}

            </div>

            {/* Modal Vollbild */}
            {isOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 ${closing ? "animate-fadeOut" : "animate-fadeIn"
                        }`}
                    onClick={startClose}
                >
                    <div
                        className={`relative max-w-6xl w-full max-h-[90vh] flex flex-col border-2 border-accent-3 rounded-xl bg-white ${closing ? "animate-zoomOut" : "animate-zoomIn"
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Bild */}
                        <Image
                            src={src}
                            alt={alt}
                            width={1600}
                            height={1200}
                            className="rounded-t-lg w-full h-auto object-contain bg-black"
                        />

                        {/* Caption unten */}
                        {caption && (
                            <div className="bg-white px-4 py-3 rounded-b-lg border-t border-gray-200 text-center">
                                <p className="text-base text-gray-800 leading-relaxed">{caption}</p>
                            </div>
                        )}

                        {/* Close Button */}
                        <button
                            className="absolute top-2 right-2 text-accent-3 text-3xl font-bold"
                            onClick={startClose}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Animations */}
            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes zoomIn {
          from {
            transform: scale(0.95);
            opacity: 0.7;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes zoomOut {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(0.95);
            opacity: 0.7;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        .animate-fadeOut {
          animation: fadeOut 0.3s ease forwards;
        }
        .animate-zoomIn {
          animation: zoomIn 0.3s ease forwards;
        }
        .animate-zoomOut {
          animation: zoomOut 0.3s ease forwards;
        }
      `}</style>
        </>
    );
}
