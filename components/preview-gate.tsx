"use client";

import { GateForm } from "@/app/entrar/gate-form";

/**
 * Deixa o visitante ver um trecho do conteúdo (prévia com fade) e, logo
 * abaixo, sobe o card de cadastro para liberar o acesso completo.
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
    <div className="relative">
      {/* Prévia: mostra o topo do conteúdo e some com um degradê */}
      <div className="relative max-h-[65vh] overflow-hidden">
        <div className="pointer-events-none select-none" aria-hidden="true">
          {children}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-df-dark via-df-dark/90 to-transparent" />
      </div>

      {/* Card de cadastro sobreposto */}
      <div className="relative z-10 mx-auto -mt-16 w-full max-w-md rounded-df border border-df-line bg-df-panel p-6 shadow-2xl shadow-black/50">
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
  );
}
