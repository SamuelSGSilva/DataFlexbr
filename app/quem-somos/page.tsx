import Link from "next/link";

export const metadata = {
  title: "Quem somos — DataFlex",
  description:
    "DataFlex by Tael é desenvolvido pelo Grupo AutoLuiz, com 45 anos de mercado automotivo, em Foz do Iguaçu (PR).",
};

const REASONS = [
  {
    title: "100% Master",
    text: "Trabalhe com autonomia total. Seus arquivos são seus, permitindo trabalhar com suas próprias ferramentas e metodologia.",
  },
  {
    title: "OBD · Bench · Boot",
    text: "Uma única plataforma para diferentes formas de comunicação com a ECU.",
  },
  {
    title: "DataCenter integrado",
    text: "Funções avançadas diretamente pelo software, trazendo mais agilidade ao profissional.",
  },
  {
    title: "Correção de checksum",
    text: "Sistema preparado para garantir integridade durante processos de gravação.",
  },
  {
    title: "Ampla cobertura",
    text: "Compatível com diversas famílias de ECUs utilizadas no Brasil e na América Latina.",
  },
  {
    title: "Suporte profissional",
    text: "Treinamento e suporte técnico especializado para acompanhar sua evolução.",
  },
];

const AUDIENCE = [
  {
    title: "Chiptuning",
    text: "Ferramenta essencial para leitura e gravação dos arquivos utilizados em projetos de calibração.",
  },
  {
    title: "Oficinas avançadas",
    text: "Mais autonomia para serviços eletrônicos e programação automotiva.",
  },
  {
    title: "Programadores de ECU",
    text: "Uma plataforma profissional para ampliar capacidade técnica e produtividade.",
  },
];

export default function QuemSomosPage() {
  return (
    <main>
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-df-red">
            Grupo AutoLuiz · Foz do Iguaçu, PR
          </p>
          <h1 className="mt-3 font-heading text-3xl uppercase leading-tight md:text-4xl">
            45 anos de mercado por trás de cada equipamento
          </h1>
          <p className="mt-5 text-df-muted">
            O DataFlex by Tael nasce do Grupo AutoLuiz, empresa brasileira no
            mercado automotivo desde 1982. Fernando Possamai, CEO do grupo,
            assumiu um compromisso público: 17 sistemas novos implementados
            para o mercado brasileiro a cada 12 meses — se não entregarmos,
            você não paga atualização.
          </p>
        </div>
      </section>

      <section className="border-t border-df-line px-6 py-20 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-wide text-df-red">
            Por que escolher o DataFlex
          </p>
          <h2 className="mt-2 font-heading text-2xl uppercase md:text-3xl">
            A nova geração da programação de ECU automotiva
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map((r) => (
              <div
                key={r.title}
                className="rounded-df border border-df-line bg-df-panel p-5"
              >
                <h3 className="text-sm font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-df-muted">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-df-line px-6 py-20 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-wide text-df-red">
            Para quem é
          </p>
          <h2 className="mt-2 font-heading text-2xl uppercase md:text-3xl">
            Profissionais que buscam evolução
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {AUDIENCE.map((a) => (
              <div
                key={a.title}
                className="rounded-df border border-df-line bg-df-panel p-6"
              >
                <h3 className="font-heading text-lg uppercase">{a.title}</h3>
                <p className="mt-2 text-sm text-df-muted">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-df-line px-6 py-20 text-center md:px-10">
        <div className="mx-auto w-full max-w-2xl">
          <h2 className="font-heading text-3xl uppercase md:text-4xl">
            Seja Master, fique no controle
          </h2>
          <p className="mt-4 text-df-muted">
            Entre para uma nova fase da programação automotiva com o
            DataFlex.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/#precos"
              className="rounded-df bg-df-red px-6 py-3 text-sm font-medium text-white transition hover:bg-df-red-hover"
            >
              Quero ser Master
            </Link>
            <Link
              href="/fale-conosco"
              className="rounded-df border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:border-white/60"
            >
              Solicitar atendimento
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
