"use client";

import { GateForm } from "@/app/entrar/gate-form";

/**
 * Deixa o visitante ver um trechinho do conteúdo dentro de um contêiner de
 * altura FIXA com overflow-hidden — o corte é físico (em px), então nada
 * vaza para o rodapé nem aparece com zoom out, diferente de usar vh/%.
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
    <div className="relative h-[620px] overflow-hidden rounded-df border border-df-line">
      {/* Prévia (só o topo fica visível, o resto é cortado de verdade) */}
      <div className="pointer-events-none select-none" aria-hidden="true">
        {children}
      </div>

      {/* Cobertura sólida com o card de cadastro */}
      <div className="absolute inset-x-0 bottom-0 top-[160px] flex items-start justify-center bg-gradient-to-b from-transparent via-df-dark/95 to-df-dark px-4 pt-8">
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
