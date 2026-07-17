"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Fileira horizontal com scroll (arraste ou barra) e setas para
 * avançar/voltar. As setas somem sozinhas quando não há mais para onde ir.
 */
export function LessonCarousel({ children }: { children: React.ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  function scroll(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="df-scrollbar flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
      >
        {children}
      </div>

      {canLeft && (
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Aulas anteriores"
          className="absolute inset-y-0 left-0 z-10 flex w-10 items-center justify-center bg-gradient-to-r from-df-dark to-transparent pb-4 text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-df-line bg-df-dark/90 shadow-lg transition hover:border-df-red hover:bg-df-red">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M15.4 6.6 9.9 12l5.5 5.4-1.4 1.6-7-7 7-7z" />
            </svg>
          </span>
        </button>
      )}

      {canRight && (
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Próximas aulas"
          className="absolute inset-y-0 right-0 z-10 flex w-10 items-center justify-center bg-gradient-to-l from-df-dark to-transparent pb-4 text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-df-line bg-df-dark/90 shadow-lg transition hover:border-df-red hover:bg-df-red">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M8.6 6.6 14.1 12l-5.5 5.4 1.4 1.6 7-7-7-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
