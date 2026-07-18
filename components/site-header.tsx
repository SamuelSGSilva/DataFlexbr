import Image from "next/image";
import Link from "next/link";
import { CartButton } from "@/components/cart-button";
import { MobileNav } from "@/components/mobile-nav";
import { WHATSAPP_NUMBER } from "@/lib/products";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/quem-somos", label: "Quem somos" },
  { href: "/compatibilidade", label: "Tabela de aplicação" },
  { href: "/treinamentos", label: "Treinamentos" },
  { href: "/fale-conosco", label: "Fale conosco" },
];

export function SiteHeader() {
  return (
    <header className="relative border-b border-df-line bg-df-dark/95 backdrop-blur sticky top-0 z-40">
      <div className="flex h-16 w-full items-center justify-between px-6 md:px-10">
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
        <div className="flex items-center gap-4 md:gap-6">
          <nav className="hidden gap-6 text-xs font-medium uppercase tracking-wide text-df-muted md:flex">
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
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-df bg-df-red/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-df-red transition hover:bg-df-red hover:text-white lg:flex"
          >
            WhatsApp
          </a>
          <CartButton />
          <MobileNav links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
