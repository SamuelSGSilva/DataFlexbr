"use client";

import { useActionState, useState } from "react";
import { registerLead, loginLead, type GateResult } from "@/lib/gate-actions";

const inputClass =
  "rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-base outline-none focus:border-red-500";

export function GateForm({ voltar }: { voltar: string }) {
  const [mode, setMode] = useState<"cadastro" | "login">("cadastro");
  const [regState, regAction, regPending] = useActionState<
    GateResult,
    FormData
  >(registerLead, undefined);
  const [logState, logAction, logPending] = useActionState<
    GateResult,
    FormData
  >(loginLead, undefined);

  const tabClass = (active: boolean) =>
    `flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
      active
        ? "bg-red-600 text-white"
        : "border border-neutral-700 text-neutral-300 hover:border-neutral-500"
    }`;

  return (
    <div className="mt-8">
      <div className="flex gap-2" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "cadastro"}
          className={tabClass(mode === "cadastro")}
          onClick={() => setMode("cadastro")}
        >
          Novo cadastro
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "login"}
          className={tabClass(mode === "login")}
          onClick={() => setMode("login")}
        >
          Já tenho cadastro
        </button>
      </div>

      {mode === "cadastro" ? (
        <form action={regAction} className="mt-6 flex flex-col gap-4">
          <input type="hidden" name="voltar" value={voltar} />
          <label className="flex flex-col gap-1 text-sm">
            Nome completo
            <input name="name" required autoComplete="name" className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Telefone / WhatsApp
            <input
              name="phone"
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder="(45) 99999-0000"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Email
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className={inputClass}
            />
          </label>
          <label className="flex items-start gap-2 text-xs text-neutral-400">
            <input type="checkbox" name="privacy" required className="mt-0.5" />
            <span>
              Li e aceito a política de privacidade e o recebimento de
              comunicações da DataFlex.
            </span>
          </label>
          {regState?.error && (
            <p className="rounded-lg border border-red-900 bg-red-950 px-4 py-3 text-sm text-red-300">
              {regState.error}
            </p>
          )}
          <button
            type="submit"
            disabled={regPending}
            className="mt-1 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {regPending ? "Liberando acesso…" : "Liberar meu acesso"}
          </button>
        </form>
      ) : (
        <form action={logAction} className="mt-6 flex flex-col gap-4">
          <input type="hidden" name="voltar" value={voltar} />
          <label className="flex flex-col gap-1 text-sm">
            Email do cadastro
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className={inputClass}
            />
          </label>
          {logState?.error && (
            <p className="rounded-lg border border-red-900 bg-red-950 px-4 py-3 text-sm text-red-300">
              {logState.error}
            </p>
          )}
          <button
            type="submit"
            disabled={logPending}
            className="mt-1 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {logPending ? "Entrando…" : "Entrar"}
          </button>
        </form>
      )}
    </div>
  );
}
