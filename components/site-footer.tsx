import Image from "next/image";
import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/lib/products";

const LINKS = [
  { href: "/compatibilidade", label: "Tabela de aplicação" },
  { href: "/treinamentos", label: "Treinamentos" },
  { href: "/quem-somos", label: "Quem somos" },
  { href: "/fale-conosco", label: "Contato" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-df-line bg-df-panel">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/img/logo-white.png"
              alt="DataFlex by Tael"
              width={160}
              height={30}
              className="h-6 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm text-df-muted">
              Nossa equipe está pronta para lhe atender.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-white">
              Navegação
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-df-muted transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-white">
              Contato
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-df-muted">
              <li>Foz do Iguaçu — Paraná, Brasil</li>
              <li>
                <a
                  href="mailto:taelauto@gmail.com"
                  className="transition hover:text-white"
                >
                  taelauto@gmail.com
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  +55 (45) 9.901-6090
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-df-line pt-6 text-xs text-df-muted">
          © {new Date().getFullYear()} DataFlex by Tael. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
}
