import { getModules } from "@/lib/trainings";
import { getLeadSession, signOutGate } from "@/lib/gate-actions";
import { youtubeThumbnail } from "@/lib/youtube";
import { LessonCard } from "./lesson-card";
import { LessonCarousel } from "./lesson-carousel";

export const metadata = {
  title: "Treinamentos — DataFlex",
  description: "Portal de treinamentos exclusivo para cadastrados DataFlex.",
};

export default async function TreinamentosPage() {
  const leadId = await getLeadSession();
  const modules = await getModules();
  const gateConfigured = Boolean(process.env.ACCESS_TOKEN_SECRET);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl uppercase tracking-tight">
            Portal de treinamentos
          </h1>
          <p className="mt-1 text-sm text-df-muted">
            Conteúdo exclusivo para cadastrados
          </p>
        </div>
        {leadId && (
          <form action={signOutGate}>
            <button className="rounded-df border border-df-line px-4 py-2 text-sm hover:border-white/40">
              Sair
            </button>
          </form>
        )}
      </div>

      {!gateConfigured && (
        <p className="mt-6 rounded-df border border-amber-900 bg-amber-950 px-4 py-3 text-sm text-amber-300">
          Modo de desenvolvimento: defina ACCESS_TOKEN_SECRET no .env.local
          para o portal passar a exigir cadastro.
        </p>
      )}

      <div className="mt-10 flex flex-col gap-14">
        {modules.map((mod) => {
          const heroLesson = mod.lessons[0];
          return (
            <section key={mod.slug}>
              {heroLesson && (
                <div
                  className="relative mb-4 overflow-hidden rounded-df border border-df-line bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${youtubeThumbnail(heroLesson.youtubeId)})`,
                  }}
                >
                  <div className="bg-gradient-to-t from-df-dark via-df-dark/70 to-df-dark/10 px-6 py-10">
                    <h2 className="font-heading text-xl uppercase tracking-tight">
                      {mod.title}
                    </h2>
                    <p className="mt-1 text-sm text-df-muted">
                      {mod.lessons.length}{" "}
                      {mod.lessons.length === 1 ? "aula" : "aulas"}
                    </p>
                  </div>
                </div>
              )}
              <LessonCarousel>
                {mod.lessons.map((lesson) => (
                  <LessonCard key={lesson.slug} lesson={lesson} />
                ))}
              </LessonCarousel>
            </section>
          );
        })}
      </div>
    </main>
  );
}
