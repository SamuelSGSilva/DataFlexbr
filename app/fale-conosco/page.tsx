import Image from "next/image";
import Link from "next/link";
import { FEATURE_ICONS } from "@/components/feature-icons";
import { WHATSAPP_NUMBER } from "@/lib/products";

export const metadata = {
  title: "Fale conosco — DataFlex",
  description:
    "Nossa equipe está pronta para lhe atender. Fale com a DataFlex by Tael em Foz do Iguaçu, PR.",
};

const CONTACT_CARDS = [
  {
    icon: "mapPin" as const,
    title: "Onde estamos",
    value: "Foz do Iguaçu — Paraná, Brasil",
  },
  {
    icon: "mail" as const,
    title: "Email",
    value: "taelauto@gmail.com",
    href: "mailto:taelauto@gmail.com",
  },
  {
    icon: "headset" as const,
    title: "WhatsApp",
    value: "+55 (45) 9.901-6090",
    href: "https://wa.me/554599016090",
    external: true,
  },
];

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

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {CONTACT_CARDS.map((card) => (
          <div
            key={card.title}
            className="rounded-df border border-df-line bg-df-panel p-6 transition hover:border-white/20"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-df bg-df-red/15 text-df-red">
              {FEATURE_ICONS[card.icon]}
            </span>
            <h2 className="mt-4 text-xs font-semibold uppercase tracking-wide text-df-muted">
              {card.title}
            </h2>
            {card.href ? (
              <a
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                className="mt-1 block font-medium text-white transition hover:text-df-red"
              >
                {card.value}
              </a>
            ) : (
              <p className="mt-1 font-medium text-white">{card.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Vendedores */}
      <div className="mt-16 border-t border-df-line pt-16">
        <p className="text-xs font-medium uppercase tracking-wide text-df-red">
          Conheça nossa equipe
        </p>
        <h2 className="mt-2 font-heading text-3xl uppercase tracking-tight md:text-4xl">
          Fale direto com nossos consultores
        </h2>
        <p className="mt-3 max-w-2xl text-df-muted">
          Clique no card do vendedor para conversar diretamente pelo WhatsApp.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center rounded-df border border-df-line bg-df-panel p-6 transition hover:border-df-red hover:bg-df-red/5"
          >
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-df-red/30 transition group-hover:border-df-red">
              <Image
                src="/img/nicolas.webp"
                alt="Nicolas - Consultor DataFlex"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 text-center font-heading text-lg uppercase text-white transition group-hover:text-df-red">
              Nicolas
            </h3>
            <p className="mt-1 text-center text-xs text-df-muted">Consultor de Vendas</p>
            <p className="mt-3 text-center text-xs font-medium uppercase tracking-wide text-df-red">
              Clique para conversar
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
