"use client";

import { useActionState } from "react";
import { signIn, type AuthResult } from "@/lib/auth-actions";

export function LoginForm({ voltar }: { voltar: string }) {
  const [state, formAction, pending] = useActionState<AuthResult, FormData>(
    signIn,
    undefined
  );

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-4">
      <input type="hidden" name="voltar" value={voltar} />
      <label className="flex flex-col gap-1 text-sm">
        Email
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-base outline-none focus:border-red-500"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Senha
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-base outline-none focus:border-red-500"
        />
      </label>
      {state?.error && (
        <p className="rounded-lg border border-red-900 bg-red-950 px-4 py-3 text-sm text-red-300">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
