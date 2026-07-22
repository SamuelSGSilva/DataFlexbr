import Image from "next/image";
import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/lib/products";

export const metadata = {
  title: "Fale conosco — DataFlex",
  description:
    "Nossa equipe está pronta para lhe atender. Fale com a DataFlex by Tael em Foz do Iguaçu, PR.",
};

export default function FaleConoscoPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-24 flex flex-col items-center text-center">
      <p className="text-xs font-medium uppercase tracking-wide text-df-red">
        Fale conosco
      </p>
      <h1 className="mt-2 font-heading text-3xl uppercase tracking-tight md:text-4xl">
        Nossa equipe está pronta para lhe atender
      </h1>
      <p className="mt-3 max-w-2xl text-df-muted">
        Dúvidas sobre compatibilidade, preços ou suporte técnico? Fale direto
        com a gente pelo canal abaixo.
      </p>

      {/* Card do vendedor centralizado */}
      <div className="mt-16 w-full max-w-sm">
        <Link
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center rounded-df border border-df-line bg-df-panel p-8 transition hover:border-df-red hover:bg-df-red/5 shadow-xl"
        >
          <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-df-red/30 transition group-hover:border-df-red">
            <Image
              src="/img/nicolas.webp"
              alt="Nicolas - Consultor DataFlex"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="mt-6 text-center font-heading text-xl uppercase text-white transition group-hover:text-df-red">
            Nicolas
          </h3>
          <p className="mt-1 text-center text-sm text-df-muted">Consultor de Vendas</p>
          <p className="mt-6 text-center text-xs font-bold uppercase tracking-widest text-df-red bg-df-red/10 px-4 py-2 rounded-full border border-df-red/20">
            Clique para conversar
          </p>
        </Link>
      </div>
    </main>
  );
}
