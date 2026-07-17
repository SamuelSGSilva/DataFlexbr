"use client";

import { useState } from "react";
import type { Lesson } from "@/lib/trainings";

/**
 * Card sem miniatura: ícone de play sobre um fundo neutro e o título da
 * aula. O vídeo só carrega (como player real) quando o usuário clica.
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
    <article className="w-56 shrink-0 snap-start">
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Assistir: ${lesson.title}`}
        className="group flex h-40 w-full flex-col justify-between rounded-df border border-df-line bg-gradient-to-br from-df-panel to-df-dark p-4 text-left transition hover:border-df-red"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-df-red text-white shadow transition group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <h3 className="text-sm font-medium leading-snug line-clamp-3">
          {lesson.title}
        </h3>
      </button>
    </article>
  );
}
