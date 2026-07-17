import { youtubeThumbnail } from "@/lib/youtube";
import type { Module } from "@/lib/trainings";

/**
 * Banner de destaque no topo do portal: usa a miniatura da primeira aula
 * do módulo em destaque como fundo, com um botão que leva direto até ele.
 */
export function TrainingHero({
  featuredModule,
  onLogout,
}: {
  featuredModule: Module;
  onLogout?: React.ReactNode;
}) {
  const firstLesson = featuredModule.lessons[0];
  const aulaCount = featuredModule.lessons.length;

  return (
    <div
      className="relative w-full bg-cover bg-center"
      style={{
        backgroundImage: firstLesson
          ? `url(${youtubeThumbnail(firstLesson.youtubeId, "maxresdefault")})`
          : undefined,
      }}
    >
      <div className="bg-gradient-to-r from-df-dark via-df-dark/85 to-df-dark/30">
        <div className="bg-gradient-to-t from-df-dark via-df-dark/10 to-transparent px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto flex w-full max-w-5xl items-start justify-between">
            <div className="max-w-xl">
              <h1 className="font-heading text-4xl md:text-5xl">
                Treinamentos DataFlex
              </h1>
              <p className="mt-2 text-df-muted">
                Capacitação profissional do básico ao avançado.
              </p>

              <span className="mt-8 inline-block rounded-df bg-df-red px-3 py-1 text-xs font-medium uppercase tracking-wide text-white">
                {featuredModule.title}
              </span>
              <h2 className="mt-3 font-heading text-2xl">
                {featuredModule.title}
              </h2>
              <p className="mt-1 text-sm text-df-muted">
                {aulaCount} {aulaCount === 1 ? "aula" : "aulas"}
              </p>

              <a
                href={`#${featuredModule.slug}`}
                className="mt-6 inline-flex items-center gap-2 rounded-df bg-df-red px-5 py-3 font-medium text-white transition hover:bg-df-red-hover"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Começar agora
              </a>
            </div>

            {onLogout && <div className="shrink-0">{onLogout}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
