import { cookies } from "next/headers";
import {
  DATACENTER_COOKIE,
  verifyDataCenterToken,
} from "@/lib/datacenter-auth";
import { getDataCenterPosts } from "@/lib/datacenter-posts";
import { logoutDataCenter, removeDataCenterPost } from "./actions";
import { DataCenterLoginForm } from "./login-form";
import { PostForm } from "./post-form";

export const metadata = {
  title: "DataCenter — DataFlex",
  robots: { index: false, follow: false },
};

export default async function DataCenterPage() {
  const cookieStore = await cookies();
  const authenticated = await verifyDataCenterToken(
    cookieStore.get(DATACENTER_COOKIE)?.value
  );

  if (!authenticated) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-6 py-16">
        <p className="text-xs font-medium uppercase tracking-wide text-df-red">
          Área restrita
        </p>
        <h1 className="mt-2 font-heading text-3xl uppercase tracking-tight">
          Acesso DataCenter
        </h1>
        <p className="mt-2 text-sm text-df-muted">
          Login exclusivo para parceiros DataFlex.
        </p>
        <DataCenterLoginForm />
      </main>
    );
  }

  const posts = await getDataCenterPosts();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-df-red">
            Área restrita
          </p>
          <h1 className="mt-2 font-heading text-3xl uppercase tracking-tight">
            DataCenter
          </h1>
        </div>
        <form action={logoutDataCenter}>
          <button className="rounded-df border border-white/30 bg-df-dark/60 px-4 py-2 text-sm text-white hover:border-white/60">
            Sair
          </button>
        </form>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <PostForm />

        <div className="flex flex-col gap-4">
          {posts.length === 0 && (
            <p className="rounded-df border border-df-line bg-df-panel px-6 py-10 text-center text-df-muted">
              Nenhum item publicado ainda. Use o formulário ao lado para
              adicionar o primeiro.
            </p>
          )}
          {posts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-df border border-df-line bg-df-panel"
            >
              {post.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.imageUrl}
                  alt=""
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-heading text-lg uppercase tracking-tight">
                    {post.title}
                  </h3>
                  <form action={removeDataCenterPost.bind(null, post.id)}>
                    <button
                      type="submit"
                      aria-label="Excluir item"
                      className="shrink-0 rounded-df border border-df-line px-3 py-1.5 text-xs text-df-muted transition hover:border-df-red hover:text-df-red"
                    >
                      Excluir
                    </button>
                  </form>
                </div>
                {post.body && (
                  <p className="mt-2 whitespace-pre-line text-sm text-df-muted">
                    {post.body}
                  </p>
                )}
                <p className="mt-3 text-xs text-df-muted/60">
                  {new Date(post.createdAt).toLocaleString("pt-BR")}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
