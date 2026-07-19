import { getModules } from "@/lib/trainings";
import { getLeadSession, signOutGate } from "@/lib/gate-actions";
import { LessonCard } from "./lesson-card";
import { LessonCarousel } from "./lesson-carousel";
import { TrainingHero } from "./training-hero";

export const metadata = {
  title: "Treinamentos — DataFlex",
  description: "Portal de treinamentos exclusivo para cadastrados DataFlex.",
};

export default async function TreinamentosPage() {
  const leadId = await getLeadSession();
  const modules = await getModules();
  const gateConfigured = Boolean(process.env.ACCESS_TOKEN_SECRET);
  const featuredModule = modules[0];

  const logoutButton = leadId && (
    <form action={signOutGate}>
      <button className="rounded-df border border-white/30 bg-df-dark/60 px-4 py-2 text-sm text-white hover:border-white/60">
        Sair
      </button>
    </form>
  );

  return (
    <>
      {featuredModule && (
        <TrainingHero featuredModule={featuredModule} onLogout={logoutButton} />
      )}

      <main className="mx-auto w-full max-w-5xl px-6 py-16">
        {!featuredModule && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-heading text-3xl uppercase tracking-tight">
              Portal de treinamentos
            </h1>
            {logoutButton}
          </div>
        )}

        {!gateConfigured && (
          <p className="rounded-df border border-amber-900 bg-amber-950 px-4 py-3 text-sm text-amber-300">
            Modo de desenvolvimento: defina ACCESS_TOKEN_SECRET no .env.local
            para o portal passar a exigir cadastro.
          </p>
        )}

        <div className="mt-10 flex flex-col gap-14">
          {modules
            .filter((mod) => mod.lessons.length > 0)
            .map((mod, i) => (
              <section key={mod.slug} id={mod.slug} className="scroll-mt-20">
                <div className="mb-5 flex items-center gap-4 border-b border-df-line pb-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-df-red/15 font-heading text-lg text-df-red ring-1 ring-df-red/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-df-muted">
                      Módulo
                    </p>
                    <h2 className="font-heading text-xl uppercase tracking-tight">
                      {mod.title}
                    </h2>
                  </div>
                  <span className="ml-auto shrink-0 rounded-full border border-df-line px-3 py-1 text-xs font-medium text-df-muted">
                    {mod.lessons.length}{" "}
                    {mod.lessons.length === 1 ? "aula" : "aulas"}
                  </span>
                </div>
                <LessonCarousel>
                  {mod.lessons.map((lesson) => (
                    <LessonCard key={lesson.slug} lesson={lesson} />
                  ))}
                </LessonCarousel>
              </section>
            ))}
        </div>
      </main>
    </>
  );
}
