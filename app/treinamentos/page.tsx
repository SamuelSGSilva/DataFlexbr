import { getModules } from "@/lib/trainings";
import { getLeadSession, signOutGate } from "@/lib/gate-actions";
import { youtubeThumbnail } from "@/lib/youtube";
import { LessonCard } from "./lesson-card";

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
          <h1 className="text-3xl font-bold">Portal de treinamentos</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Conteúdo exclusivo para cadastrados
          </p>
        </div>
        {leadId && (
          <form action={signOutGate}>
            <button className="rounded-lg border border-neutral-700 px-4 py-2 text-sm hover:border-neutral-500">
              Sair
            </button>
          </form>
        )}
      </div>

      {!gateConfigured && (
        <p className="mt-6 rounded-lg border border-amber-900 bg-amber-950 px-4 py-3 text-sm text-amber-300">
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
                  className="relative mb-4 overflow-hidden rounded-xl border border-neutral-800 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${youtubeThumbnail(heroLesson.youtubeId)})`,
                  }}
                >
                  <div className="bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/10 px-6 py-10">
                    <h2 className="text-xl font-semibold">{mod.title}</h2>
                    <p className="mt-1 text-sm text-neutral-300">
                      {mod.lessons.length}{" "}
                      {mod.lessons.length === 1 ? "aula" : "aulas"}
                    </p>
                  </div>
                </div>
              )}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {mod.lessons.map((lesson) => (
                  <LessonCard key={lesson.slug} lesson={lesson} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
