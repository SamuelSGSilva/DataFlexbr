"use client";

import { useActionState, useState } from "react";
import { editDataCenterPost, removeDataCenterPost, type PostResult } from "./actions";
import type { DataCenterPost } from "@/lib/datacenter-posts";

const inputClass =
  "rounded-df border border-df-line bg-df-dark px-4 py-3 text-sm outline-none focus:border-df-red";

export function PostItem({ post }: { post: DataCenterPost }) {
  const [editing, setEditing] = useState(false);
  const [state, action, pending] = useActionState<PostResult, FormData>(
    editDataCenterPost.bind(null, post.id),
    undefined
  );

  if (editing) {
    return (
      <form
        action={async (formData) => {
          await action(formData);
          setEditing(false);
        }}
        className="flex flex-col gap-3 rounded-df border border-df-line bg-df-panel p-6"
      >
        <label className="flex flex-col gap-1 text-sm">
          Título
          <input name="title" required defaultValue={post.title} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Texto
          <textarea name="body" rows={4} defaultValue={post.body} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Link de uma imagem (opcional)
          <input
            name="imageUrl"
            type="url"
            defaultValue={post.imageUrl ?? ""}
            className={inputClass}
          />
        </label>
        {state?.error && (
          <p className="rounded-df border border-df-red/50 bg-df-red/10 px-4 py-3 text-sm text-red-300">
            {state.error}
          </p>
        )}
        <div className="mt-1 flex gap-2">
          <button
            type="submit"
            disabled={pending}
            className="rounded-df bg-df-red px-5 py-2.5 text-sm font-semibold text-white hover:bg-df-red-hover disabled:opacity-60"
          >
            {pending ? "Salvando…" : "Salvar"}
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-df border border-df-line px-5 py-2.5 text-sm text-df-muted hover:border-white/40"
          >
            Cancelar
          </button>
        </div>
      </form>
    );
  }

  return (
    <article className="overflow-hidden rounded-df border border-df-line bg-df-panel">
      {post.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.imageUrl} alt="" className="h-48 w-full object-cover" />
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-heading text-lg uppercase tracking-tight">{post.title}</h3>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="rounded-df border border-df-line px-3 py-1.5 text-xs text-df-muted transition hover:border-white/50 hover:text-white"
            >
              Editar
            </button>
            <form action={removeDataCenterPost.bind(null, post.id)}>
              <button
                type="submit"
                aria-label="Excluir item"
                className="rounded-df border border-df-line px-3 py-1.5 text-xs text-df-muted transition hover:border-df-red hover:text-df-red"
              >
                Excluir
              </button>
            </form>
          </div>
        </div>
        {post.body && (
          <p className="mt-2 whitespace-pre-line text-sm text-df-muted">{post.body}</p>
        )}
        <p className="mt-3 text-xs text-df-muted/60">
          {new Date(post.createdAt).toLocaleString("pt-BR")}
        </p>
      </div>
    </article>
  );
}
