"use client";

import { useState } from "react";
import { youtubeThumbnail } from "@/lib/youtube";
import type { Lesson } from "@/lib/trainings";

/**
 * Mostra a miniatura real do YouTube e só carrega o player (iframe)
 * quando o usuário clica — mesmo padrão do site antigo, evita baixar
 * os 16 vídeos de uma vez só.
 */
export function LessonCard({ lesson }: { lesson: Lesson }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <article className="w-72 shrink-0 snap-start sm:w-80">
        <div className="aspect-video overflow-hidden rounded-df border border-df-line">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${lesson.youtubeId}?rel=0&modestbranding=1&autoplay=1`}
            title={lesson.title}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
        <h3 className="mt-2 text-sm font-medium">{lesson.title}</h3>
      </article>
    );
  }

  return (
    <article className="w-72 shrink-0 snap-start sm:w-80">
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Assistir: ${lesson.title}`}
        className="group relative block aspect-video w-full overflow-hidden rounded-df border border-df-line bg-df-panel"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={youtubeThumbnail(lesson.youtubeId)}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition group-hover:opacity-80"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-df-red text-white shadow-lg transition group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </button>
      <h3 className="mt-2 text-sm font-medium">{lesson.title}</h3>
    </article>
  );
}
