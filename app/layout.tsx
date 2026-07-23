import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { DevSignature } from "@/components/dev-signature";
import { ScrollToTop } from "@/components/scroll-to-top";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dataflexbr.com"),
  title: "DataFlex by Tael — Programação Profissional de ECU e TCM",
  description:
    "Solução 100% Master em reprogramação automotiva de alta performance. Cobertura OBD, Bench e Boot focada no mercado brasileiro e Mercosul.",
  openGraph: {
    title: "DataFlex by Tael — Programação Profissional de ECU e TCM",
    description: "Solução 100% Master em reprogramação automotiva de alta performance. Cobertura OBD, Bench e Boot focada no mercado brasileiro e Mercosul.",
    url: "https://dataflexbr.com",
    siteName: "DataFlex by Tael",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/img/maleta-hero.webp",
        width: 1200,
        height: 630,
        alt: "Equipamento DataFlex by Tael",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DataFlex by Tael — Programação Profissional de ECU e TCM",
    description: "Solução 100% Master em reprogramação automotiva de alta performance.",
    images: ["/img/maleta-hero.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-df-dark text-white">
        <CartProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
          <WhatsAppFloat />
          <ScrollToTop />
          <DevSignature />
        </CartProvider>
      </body>
    </html>
  );
}
