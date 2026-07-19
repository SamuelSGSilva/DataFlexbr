"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const GALLERY_IMAGES = [
  {
    src: "/img/produto-vertical.webp",
    alt: "Equipamento DataFlex — vista vertical",
  },
  {
    src: "/img/equipamento.webp",
    alt: "Equipamento DataFlex — vista de conectores",
  },
  {
    src: "/img/software.webp",
    alt: "Tela do software DataFlex",
  },
];

export function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
    setIsAutoPlay(false);
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) =>
      prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1
    );
    setIsAutoPlay(false);
  };

  return (
    <div className="mt-10 overflow-hidden rounded-df border border-df-line bg-black shadow-2xl shadow-black/50">
      {/* Carousel Container */}
      <div className="relative aspect-video w-full overflow-hidden">
        {/* Slides with smooth fade transition */}
        <div className="relative h-full w-full">
          {GALLERY_IMAGES.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
            >
              <div className="relative h-full w-full bg-gradient-to-br from-black via-df-dark to-black flex items-center justify-center">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain p-6 md:p-8"
                  priority={index === 0}
                  quality={90}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/20 via-transparent to-black/20" />

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 group rounded-full bg-df-red/80 p-3 text-white transition-all duration-300 hover:bg-df-red hover:scale-110 md:p-4"
          aria-label="Previous slide"
        >
          <svg
            className="h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 group rounded-full bg-df-red/80 p-3 text-white transition-all duration-300 hover:bg-df-red hover:scale-110 md:p-4"
          aria-label="Next slide"
        >
          <svg
            className="h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Pagination Dots with enhanced styling */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3 md:gap-4">
          {GALLERY_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-500 rounded-full ${
                index === currentIndex
                  ? "h-3 w-8 md:h-3 md:w-10 bg-df-red shadow-lg shadow-df-red/50"
                  : "h-2 w-2 md:h-3 md:w-3 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 backdrop-blur-sm">
          <span className="text-sm font-medium text-white">
            {currentIndex + 1}
          </span>
          <span className="text-sm text-white/60">/</span>
          <span className="text-sm font-medium text-white/60">
            {GALLERY_IMAGES.length}
          </span>
        </div>

        {/* Autoplay indicator */}
        {isAutoPlay && (
          <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-df-red animate-pulse" />
            <span className="text-xs font-medium text-white/80">Automático</span>
          </div>
        )}
      </div>
    </div>
  );
}
