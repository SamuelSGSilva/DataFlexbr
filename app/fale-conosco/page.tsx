import { ContactForm } from "./contact-form";

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
      <h1 className="mt-2 font-heading text-3xl uppercase tracking-tight">
        Nossa equipe está pronta para lhe atender
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-6">
          <div className="rounded-df border border-df-line bg-df-panel p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-df-muted">
              Onde estamos
            </h2>
            <p className="mt-2">Foz do Iguaçu — Paraná, Brasil</p>
          </div>

          <div className="rounded-df border border-df-line bg-df-panel p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-df-muted">
              Email
            </h2>
            <a
              href="mailto:taelauto@gmail.com"
              className="mt-2 block text-df-red hover:underline"
            >
              taelauto@gmail.com
            </a>
          </div>

          <div className="rounded-df border border-df-line bg-df-panel p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-df-muted">
              WhatsApp
            </h2>
            <a
              href="https://wa.me/554599016090"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-df-red hover:underline"
            >
              +55 (45) 9.901-6090
            </a>
          </div>
        </div>

        <div className="rounded-df border border-df-line bg-df-panel p-6 md:p-8">
          <h2 className="font-heading text-lg uppercase">Mande uma mensagem</h2>
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
