"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const GALLERY_IMAGES = [
  {
    src: "https://dataflexbr.com/wp-content/uploads/2026/05/dataflex-etiqueta-caixa-box12.3-x-12.3-cm-2048-x-1365-px.png",
    alt: "DataFlex - Etiqueta Caixa",
  },
  {
    src: "https://dataflexbr.com/wp-content/uploads/2026/04/Maleta-1.png",
    alt: "Maleta DataFlex",
  },
  {
    src: "https://dataflexbr.com/wp-content/uploads/2026/04/Equipamento-DataFlex.png",
    alt: "Equipamento DataFlex",
  },
  {
    src: "/img/equipamento.webp",
    alt: "Equipamento DataFlex - Vista de perto",
  },
  {
    src: "/img/produto-vertical.webp",
    alt: "Equipamento DataFlex - Vista vertical",
  },
  {
    src: "/img/maleta.webp",
    alt: "Maleta DataFlex - Vista frontal",
  },
];

export function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1
    );
    setIsAutoPlay(false);
  };

  return (
    <div className="mt-10 overflow-hidden rounded-df border border-df-line bg-df-panel shadow-2xl">
      {/* Carousel Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {/* Slides */}
        <div className="relative h-full w-full">
          {GALLERY_IMAGES.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-contain p-4"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/75"
          aria-label="Previous slide"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/75"
          aria-label="Next slide"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {GALLERY_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition ${
                index === currentIndex
                  ? "w-8 bg-df-red"
                  : "w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
