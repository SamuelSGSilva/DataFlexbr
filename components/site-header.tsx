import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/quem-somos", label: "Quem somos" },
  { href: "/compatibilidade", label: "Tabela de aplicação" },
  { href: "/treinamentos", label: "Treinamentos" },
  { href: "/fale-conosco", label: "Fale conosco" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-df-line bg-df-dark/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="shrink-0">
          <Image
            src="/img/logo-white.png"
            alt="DataFlex by Tael"
            width={160}
            height={30}
            className="h-6 w-auto"
            priority
          />
        </Link>
        <nav className="hidden gap-7 text-sm text-df-muted md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
