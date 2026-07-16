import { getModules } from "@/lib/trainings";
import { getUser, isSupabaseConfigured } from "@/lib/supabase/server";
import { signOut } from "@/lib/auth-actions";

export const metadata = {
  title: "Treinamentos — DataFlex",
  description: "Portal de treinamentos exclusivo para clientes DataFlex.",
};

export default async function TreinamentosPage() {
  const user = await getUser();
  const modules = await getModules();
  const configured = isSupabaseConfigured();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Portal de treinamentos</h1>
          <p className="mt-1 text-sm text-neutral-400">
            {user ? `Logado como ${user.email}` : "Conteúdo exclusivo para clientes"}
          </p>
        </div>
        {user && (
          <form action={signOut}>
            <button className="rounded-lg border border-neutral-700 px-4 py-2 text-sm hover:border-neutral-500">
              Sair
            </button>
          </form>
        )}
      </div>

      {!configured && (
        <p className="mt-6 rounded-lg border border-amber-900 bg-amber-950 px-4 py-3 text-sm text-amber-300">
          Modo de desenvolvimento: o Supabase ainda não foi configurado, então o
          portal está aberto e usando o conteúdo do arquivo local. Com o
          .env.local preenchido, esta página passa a exigir login.
        </p>
      )}

      <div className="mt-10 flex flex-col gap-12">
        {modules.map((mod) => (
          <section key={mod.slug}>
            <h2 className="text-xl font-semibold">{mod.title}</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mod.lessons.map((lesson) => (
                <article key={lesson.slug}>
                  <div className="aspect-video overflow-hidden rounded-lg border border-neutral-800">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${lesson.youtubeId}?rel=0&modestbranding=1`}
                      title={lesson.title}
                      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                      allowFullScreen
                      loading="lazy"
                      className="h-full w-full"
                    />
                  </div>
                  <h3 className="mt-2 text-sm font-medium">{lesson.title}</h3>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
