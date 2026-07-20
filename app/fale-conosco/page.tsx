import { FEATURE_ICONS } from "@/components/feature-icons";
import { ContactForm } from "./contact-form";

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

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-4">
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

        <div className="rounded-df border border-df-line bg-df-panel p-6 md:p-8">
          <span aria-hidden="true" className="h-1 w-16 bg-df-red" />
          <h2 className="mt-6 font-heading text-lg uppercase">
            Mande uma mensagem
          </h2>
          <p className="mt-1 text-sm text-df-muted">
            Preencha os campos abaixo — sua mensagem abre pronta no WhatsApp,
            você só confirma o envio.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
