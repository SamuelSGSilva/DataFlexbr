"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Install modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

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
  return (
    <div className="mt-10 overflow-hidden rounded-df border border-df-line bg-df-panel shadow-2xl">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="aspect-video w-full"
      >
        {GALLERY_IMAGES.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-contain p-4"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
