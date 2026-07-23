"use client";

import { useActionState } from "react";
import { loginDataCenter, type LoginResult } from "./actions";

const inputClass =
  "rounded-df border border-df-line bg-df-panel px-4 py-3 text-base outline-none focus:border-df-red";

export function DataCenterLoginForm() {
  const [state, action, pending] = useActionState<LoginResult, FormData>(
    loginDataCenter,
    undefined
  );

  return (
    <form action={action} className="mt-8 flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Usuário
        <input
          name="user"
          required
          autoComplete="username"
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Senha
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
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
        className="mt-1 rounded-df bg-df-red px-4 py-3 font-semibold text-white hover:bg-df-red-hover disabled:opacity-60"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
