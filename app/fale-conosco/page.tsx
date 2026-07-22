import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/lib/products";

export const metadata = {
  title: "Fale conosco — DataFlex",
  description:
    "Nossa equipe está pronta para lhe atender. Fale com a DataFlex by Tael em Foz do Iguaçu, PR.",
};

export default function FaleConoscoPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <p className="text-xs font-medium uppercase tracking-wide text-df-red">
        Fale conosco
      </p>
      <h1 className="mt-2 font-heading text-3xl uppercase tracking-tight md:text-4xl">
        Nossa equipe está pronta para lhe atender
      </h1>
      <p className="mt-3 max-w-2xl text-df-muted">
        Dúvidas sobre compatibilidade, preços ou suporte técnico? Fale direto
        com a gente por qualquer um dos canais abaixo.
      </p>
    </main>
  );
}
