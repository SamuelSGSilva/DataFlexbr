"use client";

import { GateForm } from "@/app/entrar/gate-form";

/**
 * Deixa o visitante ver um trecho do conteúdo e cobre o restante com um
 * overlay (full-width) que traz o card de cadastro. Como o overlay cobre
 * tudo abaixo de ~20% da prévia, o zoom não revela o resto da tabela.
 */
export function PreviewGate({
  gated,
  voltar,
  children,
}: {
  gated: boolean;
  voltar: string;
  children: React.ReactNode;
}) {
  if (!gated) return <>{children}</>;

  return (
    <div>
      {/* Prévia (só um pedaço fica visível no topo) */}
      <div
        className="pointer-events-none max-h-[45vh] select-none overflow-hidden"
        aria-hidden="true"
      >
        {children}
      </div>

      {/* Cobertura full-width no fluxo normal (nunca invade o footer) */}
      <div className="-mt-24 flex justify-center bg-gradient-to-b from-transparent to-df-dark to-40% px-4 pb-8 pt-24">
        <div className="w-full max-w-md rounded-df border border-df-line bg-df-panel p-6 shadow-2xl shadow-black/50">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-df-red">
            Conteúdo exclusivo
          </p>
          <h2 className="mt-2 font-heading text-2xl uppercase leading-tight">
            Cadastre-se para continuar
          </h2>
          <p className="mt-2 text-sm text-df-muted">
            Faça um cadastro rápido e gratuito para liberar o acesso completo.
          </p>
          <GateForm voltar={voltar} />
        </div>
      </div>
    </div>
  );
}
