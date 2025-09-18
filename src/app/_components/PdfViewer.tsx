"use client";
import React, { useRef, useEffect, useState } from "react";

type Props = {
  url: string;
  title?: string;
  height?: string | number;
  preload?: boolean;
};

export default function PdfViewer({
  url,
  title = "Document",
  height = "80vh",
  preload = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [closing, setClosing] = useState(false);
  const [loaded, setLoaded] = useState(preload);
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile
  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent));
    checkMobile();
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (expanded) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [expanded]);

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") startClose();
    };
    if (expanded) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  const openInNewTab = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const triggerDownload = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const startClose = () => {
    setClosing(true);
    setTimeout(() => {
      setExpanded(false);
      setClosing(false);
    }, 350);
  };

  return (
    <div
      ref={containerRef}
      className="w-full rounded-xl shadow-lg bg-white border border-gray-200"
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gradient-to-r from-white/90 to-gray-100/90">
        <h3 className="m-0 text-xl font-bold text-gray-800">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={triggerDownload}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-100 transition"
          >
            Herunterladen
          </button>
          <button
            onClick={openInNewTab}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-100 transition"
          >
            Extern öffnen
          </button>
          {!isMobile && (
            <button
              onClick={() => loaded && setExpanded(true)}
              disabled={!loaded}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium shadow transition ${loaded
                  ? "bg-accent-3 text-white hover:bg-accent-3/90"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              Vergrössern
            </button>
          )}
        </div>
      </div>

      {/* Inline View */}
<div
  className="p-4"
  style={{
    height: isMobile
      ? "auto" // Mobile → automatisch Höhe anpassen
      : typeof height === "number"
      ? `${height}px`
      : height,
  }}
>
  {!loaded ? (
    <div className="flex flex-col items-center justify-center h-full text-center">
      {isMobile ? (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-700 mb-2">
            Auf mobilen Geräten kann das PDF nicht eingebettet angezeigt werden.
          </p>
          <p className="text-gray-500 text-sm mb-4">
            Bitte im neuen Tab öffnen.  
            Am PC kannst du es direkt hier einsehen.
          </p>
          <button
            onClick={openInNewTab}
            className="px-6 py-2 bg-accent-3 text-white font-bold rounded-lg shadow hover:bg-accent-3/90 transition"
          >
            PDF im neuen Tab öffnen
          </button>
        </div>
      ) : (
        <>
          <p className="text-gray-700 mb-4">Das PDF wurde noch nicht geladen.</p>
          <button
            onClick={() => setLoaded(true)}
            className="px-6 py-2 bg-accent-3 text-white font-bold rounded-lg shadow hover:bg-accent-3/90 transition"
          >
            PDF laden
          </button>
        </>
      )}
    </div>
  ) : (
    !isMobile && (
      <iframe
        src={url}
        title={title}
        width="100%"
        height="100%"
        className="border-0 block rounded-lg"
      />
    )
  )}
</div>



{/* Expanded overlay (nur Desktop) */}
{expanded && !isMobile && (
  <div
    role="dialog"
    aria-modal="true"
    onClick={startClose}
    className={`fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-0 md:p-5 ${
      closing ? "animate-fadeOut" : "animate-fadeIn"
    }`}
  >
<div
  onClick={(e) => e.stopPropagation()}
  className={`bg-white rounded-none md:rounded-t-xl shadow-2xl border border-gray-200 flex flex-col w-screen h-screen md:w-[90vw] md:h-[96vh] md:max-w-[1200px] ${
    closing ? "animate-zoomOut" : "animate-zoomIn"
  }`}
>

      {/* Toolbar oben */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gradient-to-r from-white/90 to-gray-100/90">
        <h3 className="m-0 text-xl font-bold text-gray-800">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={triggerDownload}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-100 transition"
          >
            Herunterladen
          </button>
          <button
            onClick={openInNewTab}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-100 transition"
          >
            Extern öffnen
          </button>
          <button
            onClick={startClose}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-accent-3 text-white shadow hover:bg-accent-3/90 transition"
          >
            Schliessen
          </button>
        </div>
      </div>

      {/* PDF Inhalt mit Abstand */}
      <div className="flex-grow w-full h-full p-4">
        <iframe
          src={url}
          title={title}
          className="w-full h-full border rounded-lg shadow-inner"
        />
      </div>
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
            transform: scale(0.9);
            opacity: 0.6;
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
            transform: scale(0.9);
            opacity: 0.6;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease forwards;
        }
        .animate-fadeOut {
          animation: fadeOut 0.35s ease forwards;
        }
        .animate-zoomIn {
          animation: zoomIn 0.35s ease forwards;
        }
        .animate-zoomOut {
          animation: zoomOut 0.35s ease forwards;
        }
      `}</style>
    </div>
  );
}
