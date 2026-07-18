import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { FEATURE_ICONS, type FeatureIconName } from "@/components/feature-icons";
import { WHATSAPP_NUMBER } from "@/lib/products";
import { ScrollReveal } from "@/components/scroll-reveal";
import { PRODUCTS, formatPrice } from "@/lib/products";

export const metadata = {
  title: "DataFlex by Tael — Reprogramação de ECU e TCM",
  description:
    "Programação profissional de ECU e TCM em OBD, Bench e Boot, com arquivo aberto e feita para a frota brasileira. Conheça o DataFlex Master.",
};

const FEATURES: { title: string; text: string; icon: FeatureIconName }[] = [
  {
    title: "Plataforma Master",
    text: "Programação completa de ECU e TCM com velocidade e precisão, seja na flash ou na eeprom.",
    icon: "cpu",
  },
  {
    title: "Leitura e gravação",
    text: "Leitura de eeprom e flash completa, com correção de checksum e parâmetros para clonagem.",
    icon: "save",
  },
  {
    title: "Modos OBD · Bench · Boot",
    text: "Os três modos de comunicação cobertos numa única plataforma, sem cabos ou caixinhas extras.",
    icon: "plug",
  },
  {
    title: "Checksum",
    text: "Verificação na leitura e correção de checksum na gravação, garantindo integridade dos arquivos.",
    icon: "shieldCheck",
  },
  {
    title: "Calculadora integrada",
    text: "Execute funções técnicas diretamente no software, como edição ou desabilitações.",
    icon: "calculator",
  },
  {
    title: "DataCenter online",
    text: "Processamento online de funções avançadas e serviços em tempo real para DTC ou outras desabilitações.",
    icon: "cloud",
  },
  {
    title: "Ampla cobertura de ECUs",
    text: "Bosch, Marelli, Continental, Denso, Delphi e AC Delco, incluindo variações regionais do Brasil e Argentina.",
    icon: "layers",
  },
  {
    title: "Compatível com softwares profissionais",
    text: "Arquivos abertos para WinOLS, Bit Edit, Race, ECM Titanium, Editec e outros.",
    icon: "puzzle",
  },
  {
    title: "Atualizações constantes",
    text: "Novos protocolos e melhorias sendo adicionados regularmente. Truck, agro, camionetes, SUV, comerciais, moto e náutica.",
    icon: "refresh",
  },
  {
    title: "Foco no Brasil e Mercosul",
    text: "Suporte específico para protocolos e sistemas de injeção presentes no Brasil e no Mercosul.",
    icon: "mapPin",
  },
  {
    title: "Interface intuitiva",
    text: "Software com operação simplificada e fácil busca por sistema ou veículo, com boots e ligações no próprio software.",
    icon: "cursorClick",
  },
  {
    title: "Suporte especializado",
    text: "Treinamento EAD, entrega técnica durante a primeira instalação e suporte especializado.",
    icon: "headset",
  },
];

const FUNCTIONS = [
  "Immo off",
  "DTC off",
  "DPF off",
  "EGR off",
  "Lambda off",
  "Alteração de VIN",
  "Ajuste marcha lenta",
];

const INCLUDED = [
  "Equipamento DataFlex — hardware dedicado para OBD, Bench e Boot",
  "Maleta de transporte profissional",
  "1 ano de atualizações, com novos protocolos e funções",
  "Acesso ao DataCenter para funções avançadas online",
  "Treinamento EAD, entrega técnica e suporte especializado",
  "Compromisso público de atualização — se não entregar, você não paga",
];

const TESTIMONIALS = [
  {
    quote:
      "Fui slave por anos sem saber o que estava perdendo. Quando migrei pro Master entendi: eu tava pagando pra trabalhar preso. Com o Dataflex o arquivo é meu, uso no WinOLS e no Editec — trabalho do meu jeito, com minha metodologia. Isso é liberdade de verdade.",
    author: "Ricardo Mendes",
    role: "Mecatrônica e tuning, São Paulo/SP",
  },
  {
    quote:
      "Cheguei a gastar R$ 28 mil numa ferramenta slave, e todo o carro eu gastava com meu master para fazer o arquivo de EGR e DPF. Com o Dataflex investi bem menos, cubro Bench, Boot e OBD, e ainda tenho DataCenter. Foi o melhor negócio que eu fiz para minha oficina.",
    author: "Thiago Carvalho",
    role: "Programador autônomo, Curitiba/PR",
  },
  {
    quote:
      "Aqui no Amazonas a frota é diferente, tem muita variação regional que ferramenta gringa ignora. O Dataflex é a única que trata o mercado brasileiro com seriedade. Suporte responde, atualização chega, e o equipamento funciona.",
    author: "Marcos Oliveira",
    role: "Eletricista automotivo, Manaus/AM",
  },
];

const FAQS = [
  {
    q: "O Tael DataFlex é uma cópia de outro programador?",
    a: "Não. É um projeto próprio, com hardware dedicado e software desenvolvido para a realidade do mercado brasileiro e do Mercosul.",
  },
  {
    q: "Preciso adquirir outras calculadoras, como o Editec?",
    a: "Não para as funções integradas: Immo, DTC, DPF, EGR e Lambda saem direto pelo software ou pelo DataCenter, conforme o sistema. Calculadoras de terceiros continuam compatíveis se você já usa.",
  },
  {
    q: "Qual é a política de atualização? Tem taxa anual obrigatória?",
    a: "O primeiro ano de atualizações está incluso no equipamento. Depois, a assinatura anual custa R$ 2.250 — com compromisso público: se os sistemas prometidos não forem entregues, você não paga a atualização.",
  },
  {
    q: "É indicado para iniciantes?",
    a: "Sim. O kit acompanha entrega técnica na primeira instalação, portal EAD com aulas em vídeo e suporte especializado.",
  },
  {
    q: "Funciona com qualquer software de remapeamento?",
    a: "Os arquivos são abertos e compatíveis com WinOLS, Bit Edit, Race, ECM Titanium, Editec e outros — você trabalha com a sua metodologia.",
  },
];

export default function Home() {
  const master = PRODUCTS.find((p) => p.id === "master")!;
  const atualizacao = PRODUCTS.find((p) => p.id === "atualizacao-anual")!;

  return (
    <main>
      {/* Hero */}
      <section className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-df-panel px-6 py-20 md:px-10 md:py-28 lg:py-32">
          <span aria-hidden="true" className="h-1 w-16 bg-df-red" />
          <h1 className="mt-6 font-heading text-4xl uppercase leading-tight md:text-5xl">
            Tael DataFlex
          </h1>
          <p className="mt-2 font-heading text-lg uppercase text-df-muted md:text-xl">
            Bem-vindo ao mundo Master do chiptuning.
          </p>
          <p className="mt-6 max-w-md text-df-muted">
            Slave é limitação. É Master. É original. É liberdade.
            <br />
            Você escolhe!
            <br />
            Se desplugue da era Slave e venha ser Master.
            <br />
            A solução definitiva em reprogramação automotiva de alta
            performance.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-df bg-df-red px-6 py-3 text-sm font-medium uppercase tracking-wide text-white transition hover:bg-df-red-hover"
            >
              Quero ser Master
            </Link>
            <Link
              href="/compatibilidade"
              className="rounded-df border border-white/30 px-6 py-3 text-sm font-medium uppercase tracking-wide text-white transition hover:border-white/60"
            >
              Aplicação
            </Link>
          </div>
        </div>
        <div className="relative min-h-[420px] h-full">
          <Image
            src="/img/maleta-hero.webp"
            alt="Maleta DataFlex by Tael"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-df-line px-6 py-20 md:px-10">
        <ScrollReveal className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-df-red">
              O equipamento
            </p>
            <h2 className="mt-2 font-heading text-3xl uppercase md:text-4xl lg:text-5xl">
              Equipamento Profissional para ECU e TCM
            </h2>
            <p className="mt-4 text-df-muted">
              Nosso equipamento é 100% Master — porque acreditamos que quem
              investe merece autonomia total, sem dependências e sem
              limitações. Hardware dedicado de alta performance combinado com
              software profissional, pensado para a realidade do mercado
              brasileiro.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-df border border-df-line bg-df-panel p-5 transition hover:border-white/20"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-df bg-df-red/15 text-df-red">
                  {FEATURE_ICONS[f.icon]}
                </span>
                <h3 className="mt-3 text-sm font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-df-muted">{f.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* OBD + Bench + Boot */}
      <section className="border-t border-df-line px-6 py-20 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-wide text-df-red">
            Uma ferramenta, três caminhos
          </p>
          <h2 className="mt-2 font-heading text-2xl uppercase md:text-3xl">
            OBD + Bench + Boot
          </h2>
          <p className="mt-4 max-w-2xl text-df-muted">
            DataFlex combina três modos de operação de ECU e TCM em uma única
            ferramenta.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-df border border-df-line bg-df-panel p-6">
              <span className="text-xs font-medium uppercase tracking-wide text-df-red">
                OBD
              </span>
              <h3 className="mt-2 font-heading text-lg uppercase">
                Pela porta de diagnóstico
              </h3>
              <p className="mt-2 text-sm text-df-muted">
                Comunicação direta via porta de diagnóstico do veículo. Ideal
                para protocolos onde a leitura/gravação é permitida pelo
                barramento. Cobertura em expansão constante.
              </p>
            </div>
            <div className="rounded-df border border-df-line bg-df-panel p-6">
              <span className="text-xs font-medium uppercase tracking-wide text-df-red">
                Bench
              </span>
              <h3 className="mt-2 font-heading text-lg uppercase">
                Na bancada
              </h3>
              <p className="mt-2 text-sm text-df-muted">
                Comunicação na bancada com a ECU removida do veículo. Forte
                cobertura para sistemas Bosch, Marelli, Continental e mais.
              </p>
            </div>
            <div className="rounded-df border border-df-line bg-df-panel p-6">
              <span className="text-xs font-medium uppercase tracking-wide text-df-red">
                Boot
              </span>
              <h3 className="mt-2 font-heading text-lg uppercase">
                Direto no microcontrolador
              </h3>
              <p className="mt-2 text-sm text-df-muted">
                Acesso direto ao microcontrolador da ECU via modo de boot.
                Para sistemas onde a leitura por OBD ou Bench não é possível.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Funções avançadas */}
      <section className="grid border-t border-df-line lg:grid-cols-2">
        <div className="relative min-h-[320px] h-full">
          <Image
            src="/img/produto-hero.webp"
            alt="Conector do equipamento DataFlex by Tael"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center bg-df-panel px-6 py-20 md:px-10 md:py-24">
          <span aria-hidden="true" className="h-1 w-16 bg-df-red" />
          <p className="mt-6 text-xs font-medium uppercase tracking-wide text-df-red">
            Funções avançadas integradas
          </p>
          <h2 className="mt-2 text-center font-heading text-3xl uppercase md:text-4xl lg:text-5xl">
            Direto pelo software.<br />Rápido e seguro.
          </h2>
          <p className="mt-4 max-w-lg text-center text-sm leading-relaxed text-df-muted">
            Dependendo do sistema, o DataFlex executa desabilitações nativamente, sem plugins e sem extras. Correção de checksum automática na gravação e DataCenter online para funções em tempo real.
          </p>

          <div className="mt-8 w-full space-y-5">
            <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
              {FUNCTIONS.map((f) => (
                <div
                  key={f}
                  className="group relative rounded-df border border-df-line bg-gradient-to-br from-df-dark to-df-panel px-4 py-3.5 transition hover:border-df-red/50 hover:shadow-lg hover:shadow-df-red/10"
                >
                  <div className="absolute inset-0 rounded-df bg-df-red/0 transition group-hover:bg-df-red/5" />
                  <div className="relative flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-df-red/20 text-df-red transition group-hover:bg-df-red/30">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                      </svg>
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-white">{f}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/compatibilidade"
              className="mt-6 flex max-w-lg w-full items-center justify-center gap-2 rounded-df bg-gradient-to-r from-df-red to-df-red px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-df-red/30 transition hover:shadow-xl hover:shadow-df-red/40 hover:from-df-red-hover hover:to-df-red-hover mx-auto"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 6h16M4 12h16M4 18h7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Lista de Aplicação
            </Link>
          </div>
        </div>
      </section>

      {/* Kit incluído */}
      <section className="grid border-t border-df-line lg:grid-cols-2">
        <div className="relative min-h-[420px] h-full">
          <Image
            src="/img/maleta.webp"
            alt="Maleta de transporte DataFlex"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center bg-df-panel px-6 py-20 md:px-10 md:py-24">
          <span aria-hidden="true" className="h-1 w-16 bg-df-red" />
          <p className="mt-6 text-xs font-medium uppercase tracking-wide text-df-red">
            O que está incluído
          </p>
          <h2 className="mt-2 text-center font-heading text-4xl uppercase leading-tight md:text-5xl lg:text-6xl">
            Pronto para trabalhar<br />de imediato.
          </h2>
          <p className="mt-4 max-w-lg text-center text-sm leading-relaxed text-df-muted">
            Tudo que você precisa para começar a programar com segurança e profissionalismo.
          </p>

          <div className="mt-10 w-full max-w-lg space-y-3">
            {INCLUDED.map((item) => (
              <div
                key={item}
                className="group relative rounded-df border border-df-line bg-gradient-to-br from-df-dark to-df-panel px-5 py-4 transition duration-300 hover:border-df-red/50 hover:shadow-lg hover:shadow-df-red/10"
              >
                <div className="absolute inset-0 rounded-df bg-df-red/0 transition group-hover:bg-df-red/5" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-df-red/20 text-df-red transition group-hover:bg-df-red/30">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-df-muted group-hover:text-white transition">
                    {item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="border-t border-df-line px-6 py-20 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-wide text-df-red">
            Galeria
          </p>
          <h2 className="mt-2 font-heading text-2xl uppercase md:text-3xl">
            O equipamento de perto
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Image
              src="/img/equipamento.webp"
              alt="Equipamento DataFlex — vista de conectores"
              width={1024}
              height={1260}
              className="h-auto w-full rounded-df border border-df-line lg:col-span-2 lg:row-span-2"
            />
            <Image
              src="/img/produto-vertical.webp"
              alt="Equipamento DataFlex — vista vertical"
              width={1000}
              height={1500}
              className="h-auto w-full rounded-df border border-df-line"
            />
            <Image
              src="/img/maleta.webp"
              alt="Maleta DataFlex"
              width={1000}
              height={1500}
              className="h-auto w-full rounded-df border border-df-line"
            />
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-gradient-to-b from-[#cc0404] to-df-red px-6 py-20 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
              Quem já é Master
            </p>
            <h2 className="mt-2 font-heading text-3xl uppercase text-white md:text-4xl">
              Feito por quem trabalha com isso todo dia
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.author}
                className="relative flex flex-col rounded-df bg-df-dark p-7 pt-9 shadow-xl shadow-black/30 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40"
              >
                <span className="absolute -top-5 left-7 flex h-10 w-10 items-center justify-center rounded-full bg-df-red text-white shadow-lg">
                  <svg
                    viewBox="0 0 32 24"
                    className="h-4 w-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M0 24V14.4C0 6.4 4.8 1.2 12.8 0l1.6 4c-4.8 1.6-7.2 4.4-7.2 8.4h6.4V24H0Zm17.6 0V14.4c0-8 4.8-13.2 12.8-14.4L32 4c-4.8 1.6-7.2 4.4-7.2 8.4H32V24H17.6Z" />
                  </svg>
                </span>
                <blockquote className="flex-1 text-sm leading-relaxed text-neutral-300">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-df-line pt-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-df-red/15 text-xs font-bold text-df-red ring-2 ring-df-red/40">
                    {t.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span className="text-xs">
                    <span className="block text-sm font-semibold uppercase tracking-wide">
                      {t.author}
                    </span>
                    <span className="text-df-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CEO */}
      <section className="border-t border-df-line px-6 py-20 md:px-10">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-df-red">
            Apresentação DataFlex by Tael
          </p>
          <blockquote className="mt-4 font-heading text-xl uppercase leading-snug md:text-2xl">
            45 anos de mercado têm um peso que não se negocia. O DataFlex
            carrega esse peso — e junto com ele, um compromisso público: 17
            sistemas implementados para o mercado brasileiro nos próximos 12
            meses. Se não entregarmos, você não paga atualização.
          </blockquote>
          <p className="mt-6 text-sm text-df-muted">
            — Fernando Possamai, CEO do Grupo AutoLuiz
          </p>
        </div>
      </section>

      {/* Preços */}
      <section id="precos" className="border-t border-df-line px-6 py-20 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-wide text-df-red">
            Investimento
          </p>
          <h2 className="mt-2 font-heading text-2xl uppercase md:text-3xl">
            Escolha sua Versão
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="relative rounded-df border-2 border-df-red bg-df-panel p-8">
              <span className="absolute -top-3 left-8 rounded-df bg-df-red px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                Equipamento completo
              </span>
              <h3 className="mt-2 font-heading text-lg uppercase">
                {master.name}
              </h3>
              <p className="mt-2 text-3xl font-semibold">
                {formatPrice(master.price)}
              </p>
              <p className="mt-1 text-xs text-df-muted">
                pagamento combinado com o consultor
              </p>
              <p className="mt-4 text-sm text-df-muted">{master.description}</p>
              <AddToCartButton
                productId={master.id}
                className="mt-6 w-full"
              />
            </div>

            <div className="rounded-df border border-df-line bg-df-panel p-8">
              <h3 className="font-heading text-lg uppercase">
                {atualizacao.name}
              </h3>
              <p className="mt-2 text-3xl font-semibold">
                {formatPrice(atualizacao.price)}
              </p>
              <p className="mt-1 text-xs text-df-muted">
                por ano, a partir do segundo ano
              </p>
              <p className="mt-4 text-sm text-df-muted">
                {atualizacao.description}
              </p>
              <AddToCartButton
                productId={atualizacao.id}
                variant="outline"
                className="mt-6 w-full"
              />
            </div>
          </div>

          <p className="mt-6 text-xs text-df-muted">
            O carrinho monta o pedido e envia o resumo direto para o
            WhatsApp da DataFlex — a venda fecha na conversa.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-df-line px-6 py-20 md:px-10">
        <div className="mx-auto w-full max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-wide text-df-red">
            Perguntas frequentes
          </p>
          <h2 className="mt-2 font-heading text-2xl uppercase md:text-3xl">
            O que você quer saber antes de ser Master
          </h2>
          <div className="mt-8 flex flex-col gap-3">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-df border border-df-line bg-df-panel px-5 py-4"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                  {faq.q}
                  <span className="shrink-0 text-df-red transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-df-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-df-line px-6 py-20 text-center md:px-10">
        <div className="mx-auto w-full max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wide text-df-red">
            Hora de evoluir
          </p>
          <h2 className="mt-2 font-heading text-3xl uppercase md:text-4xl">
            Eleve o nível da sua oficina. Seja Master.
          </h2>
          <p className="mt-4 text-df-muted">
            Garanta o seu DataFlex by Tael e entre para o mercado de
            programação de ECU com a ferramenta certa, suporte profissional e
            atualizações constantes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="#precos"
              className="rounded-df bg-df-red px-6 py-3 text-sm font-medium text-white transition hover:bg-df-red-hover"
            >
              Comprar agora
            </Link>
            <Link
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-df border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:border-white/60"
            >
              Falar no WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
