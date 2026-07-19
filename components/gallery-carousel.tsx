"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const GALLERY_IMAGES = [
  {
    src: "/img/maleta-hero.webp",
    alt: "Maleta DataFlex by Tael",
  },
  {
    src: "/img/software.webp",
    alt: "Tela do software DataFlex",
  },
  {
    src: "/img/equipamento.webp",
    alt: "Equipamento DataFlex — vista de conectores",
  },
  {
    src: "/img/produto-hero.webp",
    alt: "Conector do equipamento DataFlex",
  },
  {
    src: "/img/produto-vertical.webp",
    alt: "Equipamento DataFlex — vista vertical",
  },
  {
    src: "/img/maleta.webp",
    alt: "Maleta de transporte DataFlex",
  },
];

const AUTOPLAY_MS = 5000;

export function GalleryCarousel() {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoplay]);

  const pauseThenResume = useCallback(() => {
    setAutoplay(false);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setAutoplay(true), 8000);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      setIndex((i + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
      pauseThenResume();
    },
    [pauseThenResume]
  );

  useEffect(() => () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  return (
    <div className="mt-10">
      {/* Imagem principal */}
      <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-df border border-df-line bg-gradient-to-br from-df-panel via-df-dark to-df-panel shadow-2xl shadow-black/40 md:aspect-[16/10]">
        {GALLERY_IMAGES.map((img, i) => (
          <div
            key={img.src}
            className={`absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-700 ease-out md:p-10 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 1152px, 100vw"
              className="object-contain"
              priority={i === 0}
              quality={90}
            />
          </div>
        ))}

        {/* Setas — aparecem no hover em telas grandes, sempre visíveis no mobile */}
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Foto anterior"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-df-red md:opacity-0 md:group-hover:opacity-100"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 19 8 12l7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Próxima foto"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-df-red md:opacity-0 md:group-hover:opacity-100"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Contador discreto */}
        <span className="absolute bottom-3 right-4 text-xs font-medium tabular-nums text-white/70">
          {index + 1} / {GALLERY_IMAGES.length}
        </span>
      </div>

      {/* Faixa de miniaturas */}
      <div className="df-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
        {GALLERY_IMAGES.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ver foto ${i + 1}: ${img.alt}`}
            aria-current={i === index}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-df border-2 transition ${
              i === index
                ? "border-df-red"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={img.src}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
