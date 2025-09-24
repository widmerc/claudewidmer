"use client";

import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Slide = {
  src: string;
  caption?: string;
};

type ImageSliderProps = {
  slides: Slide[];
  autoPlay?: boolean | { delay?: number; disableOnInteraction?: boolean };
  interval?: number;
  pauseOnHover?: boolean;
  playOnlyInView?: boolean; // 👈 neues Prop
};

export default function ImageSlider({
  slides,
  autoPlay = true,
  interval = 5000,
  pauseOnHover = true,
  playOnlyInView = true,
}: ImageSliderProps) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Autoplay config
  const autoplayConfig =
    autoPlay === true
      ? { delay: interval, disableOnInteraction: false }
      : autoPlay === false
      ? false
      : { delay: interval, ...autoPlay };

  // Pause on hover
  const handleMouseEnter = () => {
    if (pauseOnHover && swiperRef.current) {
      swiperRef.current.autoplay?.stop();
    }
  };
  const handleMouseLeave = () => {
    if (pauseOnHover && swiperRef.current) {
      swiperRef.current.autoplay?.start();
    }
  };

  // Autoplay nur wenn im Viewport
  useEffect(() => {
    if (!playOnlyInView || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (swiperRef.current?.autoplay) {
          if (entry.isIntersecting) {
            swiperRef.current.autoplay.start();
          } else {
            swiperRef.current.autoplay.stop();
          }
        }
      },
      { threshold: 0.3 } // mind. 30% sichtbar
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [playOnlyInView]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-3xl mx-auto relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={autoplayConfig}
        loop
        className="rounded-xl shadow-lg"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center">
              <img
                src={slide.src}
                alt={slide.caption ?? `Slide ${index + 1}`}
                className="w-full h-auto rounded-t-xl object-cover"
              />
              {slide.caption && (
                <div className="w-full bg-white text-gray-700 text-sm p-3 rounded-b-xl shadow-inner">
                  {slide.caption}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swiper styles */}
      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: #9fc35e; /* accent-3 */
          background: white;
          border-radius: 9999px;
          padding: 12px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }
        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 18px;
        }
        .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #9fc35e;
        }
      `}</style>
    </div>
  );
}
