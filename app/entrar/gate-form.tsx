"use client";

import { useActionState, useState } from "react";
import {
  registerLead,
  verifyRegistrationCode,
  loginLead,
  type GateResult,
  type CodeResult,
} from "@/lib/gate-actions";

const inputClass =
  "rounded-df border border-df-line bg-df-panel px-4 py-3 text-base outline-none focus:border-df-red";

export function GateForm({ voltar }: { voltar: string }) {
  const [mode, setMode] = useState<"cadastro" | "login">("cadastro");
  const [regState, regAction, regPending] = useActionState<
    CodeResult,
    FormData
  >(registerLead, undefined);
  const [verifyState, verifyAction, verifyPending] = useActionState<
    GateResult,
    FormData
  >(verifyRegistrationCode, undefined);
  const [logState, logAction, logPending] = useActionState<
    GateResult,
    FormData
  >(loginLead, undefined);

  const tabClass = (active: boolean) =>
    `flex-1 rounded-df px-4 py-2 text-sm font-semibold transition ${
      active
        ? "bg-df-red text-white"
        : "border border-df-line text-df-muted hover:border-white/40"
    }`;

  if (regState?.codeToken) {
    return (
      <form action={verifyAction} className="mt-8 flex flex-col gap-4">
        <input type="hidden" name="voltar" value={voltar} />
        <input type="hidden" name="codeToken" value={regState.codeToken} />
        <p className="text-sm text-df-muted">
          Enviamos um código de 6 dígitos pelo WhatsApp para{" "}
          <span className="text-white">{regState.phone}</span>. Confirme
          abaixo para liberar seu acesso.
        </p>
        <label className="flex flex-col gap-1 text-sm">
          Código de acesso
          <input
            name="code"
            required
            inputMode="numeric"
            maxLength={6}
            autoFocus
            placeholder="000000"
            className={`${inputClass} text-center text-lg tracking-[0.5em]`}
          />
        </label>
        {verifyState?.error && (
          <p className="rounded-df border border-df-red/50 bg-df-red/10 px-4 py-3 text-sm text-red-300">
            {verifyState.error}
          </p>
        )}
        <button
          type="submit"
          disabled={verifyPending}
          className="mt-1 rounded-df bg-df-red px-4 py-3 font-semibold text-white hover:bg-df-red-hover disabled:opacity-60"
        >
          {verifyPending ? "Confirmando…" : "Confirmar código"}
        </button>
      </form>
    );
  }

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
          <label className="flex items-start gap-2 text-xs text-df-muted">
            <input type="checkbox" name="privacy" required className="mt-0.5" />
            <span>
              Li e aceito a política de privacidade e o recebimento de
              comunicações da DataFlex.
            </span>
          </label>
          {regState?.error && (
            <p className="rounded-df border border-df-red/50 bg-df-red/10 px-4 py-3 text-sm text-red-300">
              {regState.error}
            </p>
          )}
          <button
            type="submit"
            disabled={regPending}
            className="mt-1 rounded-df bg-df-red px-4 py-3 font-semibold text-white hover:bg-df-red-hover disabled:opacity-60"
          >
            {regPending ? "Enviando código…" : "Continuar"}
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
            <p className="rounded-df border border-df-red/50 bg-df-red/10 px-4 py-3 text-sm text-red-300">
              {logState.error}
            </p>
          )}
          <button
            type="submit"
            disabled={logPending}
            className="mt-1 rounded-df bg-df-red px-4 py-3 font-semibold text-white hover:bg-df-red-hover disabled:opacity-60"
          >
            {logPending ? "Entrando…" : "Entrar"}
          </button>
        </form>
      )}
    </div>
  );
}
