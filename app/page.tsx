import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { GalleryCarousel } from "@/components/gallery-carousel";
import { FEATURE_ICONS, type FeatureIconName } from "@/components/feature-icons";
import { WHATSAPP_NUMBER } from "@/lib/products";
import { ScrollReveal } from "@/components/scroll-reveal";
import { PRODUCTS, formatPrice } from "@/lib/products";
import { FaqSection } from "@/components/faq-section";

export const metadata = {
  title: "DataFlex by Tael — Reprogramação de ECU e TCM",
  description:
    "Programação profissional de ECU e TCM em OBD, Bench e Boot, com arquivo aberto e feita para a frota brasileira. Conheça o DataFlex Master.",
};

const PRESENTATION_VIDEOS: { youtubeId: string; title: string }[] = [
  { youtubeId: "wZhh8OtkE3c", title: "DataFlex — Campanha de lançamento" },
  { youtubeId: "MW2ZP65VeXM", title: "DataFlex — Valor base" },
  { youtubeId: "1Vuc1no-esY", title: "DataFlex — Equipamento completo" },
];

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
    q: "O Tael DataFlex é uma cópia do Magic Flex, Scanmatik, FoxFlasher ou de outro programador?",
    a: "Não, de maneira alguma. O Tael DataFlex é um sistema profissional de programação de ECU desenvolvido com hardware e software próprios. Embora execute funções semelhantes às de ferramentas conhecidas do mercado — como leitura e gravação de ECU via OBD, Bench e Boot — ele é uma plataforma independente, criada e customizada para atender especialmente às necessidades do mercado do Brasil e Argentina. O sistema opera em arquitetura Master, garantindo ao usuário controle total sobre os arquivos da ECU, sem bloqueios ou dependência de terceiros. Foi desenvolvido respeitando a realidade das oficinas mecânicas e programadores da região, com custo de entrada e atualização bem mais acessível.",
  },
  {
    q: "Comprando o Tael DataFlex eu preciso adquirir outras calculadoras, como o Editec da AutoLuiz.net?",
    a: "Entenda que são ferramentas com propostas diferentes que se complementam. O DataFlex já possui calculadora integrada, permitindo executar funções diretamente durante leitura e gravação da ECU via DataCenter. Já o Editec foca em manipulação e edição avançada de arquivos, com recursos automatizados como Stage 1 e Stage 1 Plus para diversos sistemas, e variedade ampla de funções extras de desabilitação. Ambos irão desabilitar DTC, EGR, DPF, FAP, SONDA e IMMO — no entanto, o Editec pode fazer isso em qualquer sistema de injeção, já o DataFlex somente terá essas funções quando o padrão do mapa for o mesmo para todas as variações de ID de um mesmo sistema. O recomendável é utilizar as duas ferramentas, formando um conjunto mais completo para o profissional de chiptuning.",
  },
  {
    q: "Qual é a política de atualização? Possui taxa anual de assinatura?",
    a: "Sim. Ao adquirir o DataFlex você recebe 1 ano de atualizações incluídas, além de acesso ao DataCenter e suporte técnico. Após esse período, existe uma taxa anual de atualização que mantém: novos protocolos, melhorias do software, novas funções, acesso ao DataCenter e suporte técnico. Caso o usuário opte por não renovar, o equipamento continua funcionando normalmente, mantendo leitura, gravação e protocolos já existentes — porém calculadoras avançadas, suporte técnico e serviços via DataCenter ficam indisponíveis até a renovação. Inclusive seus desenvolvedores assumiram publicamente o compromisso de atualização de 17 sistemas específicos para o mercado brasileiro dentro dos 12 primeiros meses de implantação, e caso não atingirmos esse número ou as centrais propostas, iremos abrir mão da cobrança de atualizações até a inserção dos sistemas prometidos.",
  },
  {
    q: "É indicado para iniciantes?",
    a: "Sim. O DataFlex foi desenvolvido para ser uma ferramenta profissional acessível, podendo ser utilizado tanto por técnicos iniciantes quanto por profissionais experientes. A interface foi projetada para ser simples e intuitiva. Importante lembrar que programação de ECU e chiptuning exigem conhecimento técnico, sendo recomendável que o usuário possua noções básicas de eletrônica automotiva e sistemas de injeção.",
  },
  {
    q: "Acompanha treinamento?",
    a: "Sim. Os usuários recebem acesso ao ecossistema de treinamento da TAEL / AutoLuiz, que inclui vídeos técnicos de utilização, conteúdos educacionais, orientações de uso da ferramenta e acesso à plataforma EAD. Além disso, a primeira instalação do sistema é realizada com acompanhamento técnico, garantindo o uso correto desde o início.",
  },
  {
    q: "Quais tipos de ECU o DataFlex suporta?",
    a: "Bosch, Marelli, Continental, Denso, Delphi, Kefico, Mitsubishi, Valeo, Sagem, AC Delco e outras. Além disso, o sistema possui suporte específico para variações regionais utilizadas no Brasil e na América Latina, que muitas vezes possuem diferenças em relação às versões globais.",
  },
  {
    q: "Permite leitura completa da ECU?",
    a: "Sim. Dependendo do sistema de injeção e do protocolo utilizado, o DataFlex permite leitura completa da ECU, incluindo memória de programa (Flash), dados de configuração e outras áreas disponíveis da central (eeprom). A possibilidade depende do tipo de ECU e do modo de comunicação (seja modo OBD, modo Bench ou modo Boot).",
  },
  {
    q: "Possui proteção contra falhas durante gravação?",
    a: "Sim. O sistema foi desenvolvido com diversos mecanismos de segurança: verificação de integridade do arquivo, correção automática de checksum, protocolos de comunicação validados e controle de gravação seguro — tornando o processo mais confiável.",
  },
  {
    q: "O sistema identifica automaticamente a ECU?",
    a: "Em muitos protocolos, sim. O DataFlex possui identificação automática da ECU, reconhecendo informações como fabricante, versão de software, ID da ECU e outras informações técnicas, facilitando a seleção do protocolo correto.",
  },
  {
    q: "Para quem o DataFlex foi desenvolvido?",
    a: "Para profissionais que trabalham com eletrônica automotiva e programação de ECU: oficinas mecânicas especializadas, programadores de ECU, centros de chiptuning, especialistas em diagnóstico avançado e profissionais de eletrônica automotiva — com foco no mercado da América Latina.",
  },
  {
    q: "Funciona com qualquer software de remapeamento?",
    a: "Sim. Como o DataFlex é uma ferramenta Master, os arquivos lidos da ECU pertencem ao usuário e podem ser utilizados em diversos softwares de edição de mapas, como WinOLS, ECM Titanium, Bit Edit, BFlash, Race e Editec. Cada técnico utiliza sua própria metodologia de desenvolvimento de arquivos.",
  },
  {
    q: "O sistema recebe novos protocolos?",
    a: "Sim. O DataFlex recebe atualizações constantes, com novos protocolos sendo adicionados regularmente. O desenvolvimento prioriza veículos do mercado da América Latina, novos sistemas de injeção, melhorias em protocolos já existentes e expansão da cobertura de ECUs. Inclusive seus desenvolvedores assumiram publicamente o compromisso de atualização de 17 sistemas específicos para o mercado brasileiro dentro dos 12 primeiros meses de implantação, e caso não atingirmos esse número ou as centrais propostas, iremos abrir mão da cobrança de atualizações até a inserção dos sistemas prometidos.",
  },
  {
    q: "Posso trabalhar apenas com OBD? Ele baixa arquivos do servidor?",
    a: "Depende da ECU. Alguns sistemas permitem leitura e gravação diretamente via OBD, outros exigem acesso em modo Bench ou Boot. O DataFlex suporta os três modos. Atualmente o sistema possui forte cobertura em Bench e Boot, enquanto os protocolos via OBD continuam sendo ampliados. Outro detalhe: trabalhamos com leitura REAL, não com banco de arquivos (outros programadores identificam o ID do soft e baixam de seus servidores um arquivo original).",
  },
  {
    q: "Suporta veículos diesel e gasolina?",
    a: "Sim. Suporta ECUs presentes em veículos a gasolina, flex e diesel. Além disso, a plataforma também está expandindo fortemente o suporte para aplicações agrícolas e veículos pesados, muito presentes no mercado latino-americano. Linha SUV, veículos leves, veículos comerciais diesel ou camionetas/vans, truck (caminhões e ônibus), além da linha moto e náutica.",
  },
  {
    q: "É uma ferramenta de chiptuning?",
    a: "É principalmente um programador de ECU, utilizado para realizar leitura e gravação dos arquivos da central eletrônica. Esses arquivos podem então ser modificados em softwares de edição de mapas para otimização de desempenho, correções técnicas, desabilitação de funções específicas e ajustes de calibração. Ao contrário de alguns programadores, o DataFlex corrige automaticamente o CheckSum na gravação e faz a leitura da área de ImmoData que muitos programadores ignoram.",
  },
  {
    q: "O Dataflex corrige o checksum automaticamente?",
    a: "Sim. O software realiza a correção automática de checksum durante a leitura e gravação da ECU, garantindo a integridade do arquivo em cada operação. Caso você esteja trabalhando com um sistema recém-lançado que ainda não possua a correção disponível, basta abrir um chamado com nosso suporte técnico solicitando a implementação — nossa equipe de engenharia analisa e prioriza conforme a demanda do mercado.",
  },
  {
    q: "O Dataflex precisa de internet para funcionar?",
    a: "Sim, para o funcionamento completo o sistema requer conexão com internet. Ela é necessária para validação de protocolos, comunicação com os servidores e execução das funções avançadas via DataCenter. Recomendamos uma conexão estável para garantir a melhor experiência durante o uso. Os requisitos mínimos recomendados são: Windows 10 ou Windows 11, mínimo de 8GB de RAM e conexão com internet estável.",
  },
  {
    q: "Qual computador preciso para rodar o Dataflex?",
    a: "O sistema foi desenvolvido para rodar em qualquer notebook ou desktop com Windows 10 ou Windows 11, mínimo de 8GB de RAM e conexão com internet estável. Não é necessário um computador de alta performance — o processamento pesado fica nos nossos servidores via DataCenter.",
  },
  {
    q: "O Dataflex acompanha suporte técnico?",
    a: "Sim. Ao adquirir o Dataflex você passa a ter acesso a um ecossistema completo de suporte, que inclui sistema interno de tickets técnicos, atendimento especializado e, quando necessário, encaminhamento direto para a equipe de engenharia. Não é um suporte genérico — é um time que conhece a ferramenta profundamente e entende a realidade do mercado brasileiro.",
  },
  {
    q: "Qual é o compromisso de atualização do Dataflex? E se não for cumprido?",
    a: "Ao adquirir o Dataflex, você recebe 1 ano de atualizações incluídas, com acesso ao DataCenter e suporte técnico. Após esse período, existe uma taxa anual que mantém tudo funcionando: novos protocolos, melhorias de software, novas funções, DataCenter e suporte. Caso opte por não renovar, o equipamento continua funcionando normalmente com leitura, gravação e todos os protocolos já existentes — apenas as calculadoras avançadas, DataCenter e suporte técnico ficam pausados até a renovação. Você nunca perde o que já tem. E tem mais: nossos desenvolvedores assumiram publicamente o compromisso de entregar 17 sistemas específicos para o mercado brasileiro dentro dos primeiros 12 meses. Caso esse número não seja atingido ou alguma das centrais prometidas não seja entregue no prazo, a cobrança de atualização fica suspensa até que todos os sistemas prometidos sejam implementados.",
  },
  {
    q: "O Dataflex lê a área de IMMO DATA da ECU?",
    a: "Sim. Dependendo do sistema de injeção e do protocolo utilizado, o Dataflex realiza leitura completa da ECU, incluindo memória de programa (Flash), dados de configuração e outras áreas disponíveis da central — incluindo a área de IMMO DATA em sistemas de linhas como BMW, Chevrolet, Audi e Volkswagen. Essa leitura permite não apenas visualizar, mas também editar os dados de imobilizador diretamente, abrindo possibilidade para serviços avançados de programação de chaves e desbloqueio de imobilizador. A disponibilidade depende do modelo específico da ECU e do modo de comunicação utilizado — OBD, Bench ou Boot.",
  },
];

export default function Home() {
  const master = PRODUCTS.find((p) => p.id === "master")!;
  const atualizacao = PRODUCTS.find((p) => p.id === "atualizacao-anual")!;

  return (
    <main>
      {/* Hero */}
      <section className="grid min-h-[calc(100vh-64px)] lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col justify-center items-center bg-df-panel px-6 py-20 md:px-10 md:py-28 lg:py-32">
          <span aria-hidden="true" className="h-1 w-16 bg-df-red" />
          <h1 className="mt-6 font-heading text-4xl uppercase leading-tight md:text-5xl text-center">
            Tael DataFlex
          </h1>
          <p className="mt-2 font-heading text-lg uppercase text-df-muted md:text-xl text-center">
            Bem-vindo ao mundo Master do chiptuning.
          </p>
          <p className="mt-6 max-w-md text-df-muted text-center">
            Slave é limitação. É Master. É original. É liberdade.
            <br />
            Você escolhe!
            <br />
            Se desplugue da era Slave e venha ser Master.
            <br />
            A solução definitiva em reprogramação automotiva de alta
            performance.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
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
            <p className="text-xs font-medium uppercase tracking-wide text-df-muted">
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

      {/* Funções avançadas */}
      <section className="grid border-t border-df-line lg:grid-cols-2">
        <div className="relative min-h-[320px] h-full">
          <Image
            src="/img/produto-topo.png"
            alt="Equipamento DataFlex by Tael visto de cima"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center bg-df-panel px-6 py-20 md:px-10 md:py-24">
          <span aria-hidden="true" className="h-1 w-16 bg-df-red" />
          <p className="mt-6 text-xs font-medium uppercase tracking-wide text-df-muted">
            Funções avançadas integradas
          </p>
          <h2 className="mt-2 text-center font-heading text-3xl uppercase md:text-4xl lg:text-5xl">
            Direto pelo software.<br />Rápido e seguro.
          </h2>
          <p className="mt-4 max-w-lg text-center text-sm leading-relaxed text-df-muted">
            Dependendo do sistema, o DataFlex executa desabilitações nativamente, sem plugins e sem extras. Correção de checksum automática na gravação e DataCenter online para funções em tempo real.
          </p>

          <div className="mt-8 w-full space-y-5">
            <div className="mx-auto grid max-w-lg grid-cols-2 gap-2.5">
              {FUNCTIONS.map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-2 rounded-df bg-df-dark px-4 py-3 text-xs font-bold uppercase tracking-wide text-white ring-1 ring-white/10 transition hover:ring-df-red/50"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-df-red" />
                  {f}
                </span>
              ))}
            </div>

            <Link
              href="/compatibilidade"
              className="mx-auto mt-6 flex w-full max-w-lg items-center justify-center gap-2 rounded-df bg-df-red px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-df-red-hover"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 6h16M4 12h16M4 18h7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Ver lista de aplicação
            </Link>
          </div>
        </div>
      </section>

      {/* CEO */}
      <section className="border-t border-df-line px-6 py-20 md:px-10">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-df-muted">
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

        <div className="mx-auto mt-12 grid w-full max-w-5xl gap-5 sm:grid-cols-3">
          {PRESENTATION_VIDEOS.map((video) => (
            <a
              key={video.youtubeId}
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-video overflow-hidden rounded-df border border-df-line bg-df-panel"
            >
              <Image
                src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                alt={video.title}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-df-red text-white shadow-lg transition group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
              <p className="absolute inset-x-0 bottom-0 p-3 text-left text-xs font-medium leading-snug text-white">
                {video.title}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* OBD + Bench + Boot */}
      <section className="border-t border-df-line px-6 py-20 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-df-muted">
              Uma ferramenta, três caminhos
            </p>
            <h2 className="mt-2 font-heading text-2xl uppercase md:text-3xl">
              OBD + Bench + Boot
            </h2>
            <p className="mt-4 text-df-muted">
              DataFlex combina três modos de operação de ECU e TCM em uma
              única ferramenta.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-df border border-df-line bg-df-panel p-6">
              <span className="text-xs font-bold uppercase tracking-wide text-df-red">
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
              <span className="text-xs font-bold uppercase tracking-wide text-df-red">
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
              <span className="text-xs font-bold uppercase tracking-wide text-df-red">
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

      {/* Kit incluído */}
      <section className="grid border-t border-df-line lg:grid-cols-2">
        <div className="relative min-h-[480px] h-full">
          <Image
            src="/img/maleta.webp"
            alt="Maleta de transporte DataFlex"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-df-panel px-6 py-20 md:px-10 md:py-24">
          <span aria-hidden="true" className="h-1 w-16 bg-df-red" />
          <p className="mt-6 text-xs font-medium uppercase tracking-wide text-df-muted">
            O que está incluído
          </p>
          <h2 className="mt-2 font-heading text-3xl uppercase leading-tight md:text-4xl lg:text-5xl">
            Pronto para trabalhar de imediato
          </h2>
          <p className="mt-4 max-w-md text-sm text-df-muted">
            Tudo que você precisa para começar a programar com segurança e
            profissionalismo.
          </p>

          <ul className="mt-8 flex max-w-md flex-col gap-4">
            {INCLUDED.map((item) => {
              const [title, description] = item.split(" — ");
              return (
                <li key={item} className="flex gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="mt-0.5 h-5 w-5 shrink-0 text-df-red"
                    fill="currentColor"
                  >
                    <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                  </svg>
                  <p className="text-sm">
                    <span className="font-semibold text-white">{title}</span>
                    {description && (
                      <span className="text-df-muted"> — {description}</span>
                    )}
                  </p>
                </li>
              );
            })}
          </ul>

          <Link
            href="#precos"
            className="mt-8 flex w-full max-w-md items-center justify-center gap-2 rounded-df bg-df-red px-6 py-3.5 text-sm font-medium uppercase tracking-wide text-white transition hover:bg-df-red-hover"
          >
            Ver preços e comprar
          </Link>
        </div>
      </section>

      {/* Galeria */}
      <section className="border-t border-df-line px-6 py-20 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-df-muted">
              Galeria
            </p>
            <h2 className="mt-2 font-heading text-3xl uppercase md:text-4xl lg:text-5xl">
              O equipamento de perto
            </h2>
          </div>
          <GalleryCarousel />
        </div>
      </section>

      {/* Preços */}
      <section id="precos" className="border-t border-df-line px-6 py-20 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="text-center flex flex-col items-center">
            <p className="text-xs font-medium uppercase tracking-wide text-df-muted">
              Investimento
            </p>
            <h2 className="mt-2 font-heading text-3xl uppercase md:text-4xl lg:text-5xl text-white">
              Configure seu Equipamento
            </h2>
          </div>

          <div className="mt-10 grid gap-8 grid-cols-1 md:grid-cols-3 items-stretch">
            {/* Card 1: Slave */}
            <div className="group relative rounded-df border border-df-line bg-gradient-to-b from-df-panel to-df-panel/85 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-white/10 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
              <div>
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold text-df-muted">$</span>
                    <span className="text-6xl font-extrabold text-white tracking-tight">0</span>
                  </div>
                  <div className="mt-2.5">
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 bg-zinc-800/50 px-3 py-1 rounded-md border border-zinc-700/50">
                      Slave
                    </span>
                  </div>
                </div>
                
                <ul className="mt-8 divide-y divide-df-line border-y border-df-line text-sm">
                  <li className="flex items-start gap-3 py-3.5 text-df-muted">
                    <svg className="h-4 w-4 text-df-red shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Depender de terceiros.</span>
                  </li>
                  <li className="flex items-start gap-3 py-3.5 text-df-muted">
                    <svg className="h-4 w-4 text-df-red shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Limitado a leitura e gravação.</span>
                  </li>
                  <li className="flex items-start gap-3 py-3.5 text-df-muted">
                    <svg className="h-4 w-4 text-df-red shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Seu Master ganha mais.</span>
                  </li>
                  <li className="flex items-start gap-3 py-3.5 text-df-muted">
                    <svg className="h-4 w-4 text-df-red shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Seu lucro indo embora.</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                disabled
                className="mt-8 w-full py-3 px-5 rounded-df bg-white/5 border border-white/10 text-white/20 text-xs font-bold uppercase tracking-wider cursor-not-allowed select-none transition-all duration-300"
              >
                Indisponível
              </button>
            </div>

            {/* Card 2: Master */}
            <div className="group relative rounded-df border-2 border-df-red bg-gradient-to-b from-df-panel to-df-panel/85 p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(178,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(178,0,0,0.2)] md:scale-[1.03] z-10">
              <span className="absolute -top-3 left-6 rounded-df bg-gradient-to-r from-df-red to-[#d10000] px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                Equipamento completo
              </span>
              <div>
                <div className="flex flex-col items-center justify-center text-center mt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold text-df-muted">R$</span>
                    <span className="text-6xl font-extrabold text-white tracking-tight">18.400</span>
                  </div>
                  <div className="mt-2.5">
                    <span className="text-xs font-bold uppercase tracking-widest text-df-red bg-df-red/10 px-3 py-1 rounded-md border border-df-red/20">
                      Master
                    </span>
                  </div>
                </div>
                
                <ul className="mt-8 divide-y divide-df-line border-y border-df-line text-sm">
                  <li className="flex items-start gap-3 py-3.5 text-white/90">
                    <svg className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">É master, é você no controle.</span>
                  </li>
                  <li className="flex items-start gap-3 py-3.5 text-white/90">
                    <svg className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-emerald-400 font-bold tracking-wide">+ Lucro</span>
                  </li>
                  <li className="flex items-start gap-3 py-3.5 text-df-muted">
                    <svg className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Datacenter incluso.</span>
                  </li>
                  <li className="flex items-start gap-3 py-3.5 text-df-muted">
                    <svg className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Correção checksum.</span>
                  </li>
                  <li className="flex items-start gap-3 py-3.5 text-df-muted">
                    <svg className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>
                      <strong className="text-white/80">Truck, agro, linha leve, flex e diesel</strong>, SUV, comerciais, moto e náutica.
                    </span>
                  </li>
                </ul>
              </div>

              <AddToCartButton
                productId={master.id}
                className="mt-8 w-full py-3 px-5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-df-red/20 transition-all duration-300 hover:shadow-df-red/40"
              >
                Falar com o Consultor
              </AddToCartButton>
            </div>

            {/* Card 3: Atualizações */}
            <div className="group relative rounded-df border border-df-line bg-gradient-to-b from-df-panel to-df-panel/85 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-white/10 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
              <div>
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold text-df-muted">R$</span>
                    <span className="text-6xl font-extrabold text-white tracking-tight">2.250</span>
                  </div>
                  <div className="mt-2.5">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                      Atualizações Anuais
                    </span>
                  </div>
                </div>
                
                <ul className="mt-8 divide-y divide-df-line border-y border-df-line text-sm">
                  <li className="flex items-start gap-3 py-3.5 text-df-muted">
                    <svg className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Funções Immo, Sonda, EGR, DPF.</span>
                  </li>
                  <li className="flex items-start gap-3 py-3.5 text-df-muted">
                    <svg className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Acesso ao Datacenter.</span>
                  </li>
                  <li className="flex items-start gap-3 py-3.5 text-df-muted">
                    <svg className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Atualizações de sistemas.</span>
                  </li>
                  <li className="flex items-start gap-3 py-3.5 text-df-muted">
                    <svg className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Portal EAD de treinamento.</span>
                  </li>
                  <li className="flex items-start gap-3 py-3.5 text-df-muted">
                    <svg className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Metade do valor do mercado.</span>
                  </li>
                </ul>
              </div>

              <AddToCartButton
                productId={atualizacao.id}
                variant="outline"
                className="mt-8 w-full py-3 px-5 text-xs font-bold uppercase tracking-wider transition-all duration-300"
              >
                Imbatível
              </AddToCartButton>
            </div>
          </div>

          <p className="mt-6 text-xs text-df-muted">
            O carrinho monta o pedido e envia o resumo direto para o
            WhatsApp da DataFlex — a venda fecha na conversa.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative overflow-hidden border-t border-df-line px-6 py-24 md:px-10">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-df-red/4 blur-[100px]" />
          <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-df-red/3 blur-[100px]" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl">
          {/* Header row */}
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
            {/* Left — sticky heading */}
            <div className="lg:w-80 lg:shrink-0 lg:sticky lg:top-24">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-df-red">
                Perguntas frequentes
              </p>
              <h2 className="mt-3 font-heading text-3xl uppercase leading-tight md:text-4xl">
                Tire suas
                <br />
                <span className="text-df-red">dúvidas.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-df-muted">
                Tudo que você precisa saber antes de se tornar independente e Master.
              </p>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-df-line bg-df-panel px-4 py-3">
                  <p className="text-2xl font-extrabold text-white tabular-nums">{FAQS.length}</p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-wide text-df-muted">Perguntas</p>
                </div>
                <div className="rounded-xl border border-df-line bg-df-panel px-4 py-3">
                  <p className="text-2xl font-extrabold text-df-red">100%</p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-wide text-df-muted">Transparência</p>
                </div>
              </div>
            </div>

            {/* Right — accordion list */}
            <div className="flex-1 min-w-0">
              <FaqSection faqs={FAQS} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-df-line px-6 py-20 text-center md:px-10">
        <div className="mx-auto w-full max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wide text-df-muted">
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
              className="rounded-df bg-df-red px-8 py-4 text-base font-medium text-white transition hover:bg-df-red-hover"
            >
              Comprar agora
            </Link>
            <Link
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-df border border-white/30 px-8 py-4 text-base font-medium text-white transition hover:border-white/60"
            >
              Falar no WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
