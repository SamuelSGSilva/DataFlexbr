"use client";

import { useActionState, useRef } from "react";
import { addDataCenterPost, type PostResult } from "./actions";

const inputClass =
  "rounded-df border border-df-line bg-df-dark px-4 py-3 text-sm outline-none focus:border-df-red";

export function PostForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState<PostResult, FormData>(
    async (prev, formData) => {
      const result = await addDataCenterPost(prev, formData);
      if (!result) formRef.current?.reset();
      return result;
    },
    undefined
  );

  return (
    <form
      ref={formRef}
      action={action}
      className="flex flex-col gap-3 rounded-df border border-df-line bg-df-panel p-6"
    >
      <h2 className="font-heading text-lg uppercase tracking-tight">
        Adicionar novo item
      </h2>
      <label className="flex flex-col gap-1 text-sm">
        Título
        <input name="title" required className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Texto
        <textarea name="body" rows={4} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Link de uma imagem (opcional)
        <input
          name="imageUrl"
          type="url"
          placeholder="https://…"
          className={inputClass}
        />
      </label>
      {state?.error && (
        <p className="rounded-df border border-df-red/50 bg-df-red/10 px-4 py-3 text-sm text-red-300">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-1 self-start rounded-df bg-df-red px-5 py-2.5 text-sm font-semibold text-white hover:bg-df-red-hover disabled:opacity-60"
      >
        {pending ? "Salvando…" : "Publicar"}
      </button>
    </form>
  );
}
