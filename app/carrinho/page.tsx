"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { PRODUCTS, formatPrice, buildWhatsAppOrderUrl } from "@/lib/products";

export default function CarrinhoPage() {
  const { items, setQuantity, remove } = useCart();

  const rows = items
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      if (!product) return null;
      return { ...item, product };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  const total = rows.reduce(
    (sum, r) => sum + r.product.price * r.quantity,
    0
  );

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="font-heading text-3xl uppercase tracking-tight">
        Seu carrinho
      </h1>

      {rows.length === 0 ? (
        <div className="mt-10 rounded-df border border-df-line bg-df-panel p-10 text-center">
          <p className="text-df-muted">Seu carrinho está vazio.</p>
          <Link
            href="/#precos"
            className="mt-6 inline-block rounded-df bg-df-red px-6 py-3 text-sm font-medium text-white transition hover:bg-df-red-hover"
          >
            Ver produtos
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-8 flex flex-col gap-4">
            {rows.map((row) => (
              <div
                key={row.productId}
                className="flex flex-col gap-4 rounded-df border border-df-line bg-df-panel p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 className="font-heading text-base uppercase">
                    {row.product.name}
                  </h2>
                  <p className="mt-1 text-sm text-df-muted">
                    {formatPrice(row.product.price)} cada
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-df border border-df-line">
                    <button
                      type="button"
                      aria-label="Diminuir quantidade"
                      onClick={() =>
                        setQuantity(row.productId, row.quantity - 1)
                      }
                      className="px-3 py-2 text-df-muted hover:text-white"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums">
                      {row.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Aumentar quantidade"
                      onClick={() =>
                        setQuantity(row.productId, row.quantity + 1)
                      }
                      className="px-3 py-2 text-df-muted hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  <p className="w-28 text-right text-sm font-medium tabular-nums">
                    {formatPrice(row.product.price * row.quantity)}
                  </p>

                  <button
                    type="button"
                    aria-label={`Remover ${row.product.name}`}
                    onClick={() => remove(row.productId)}
                    className="text-df-muted transition hover:text-df-red"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-df-line pt-6">
            <span className="text-sm text-df-muted">Total</span>
            <span className="text-2xl font-semibold tabular-nums">
              {formatPrice(total)}
            </span>
          </div>

          <a
            href={buildWhatsAppOrderUrl(items)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-df bg-df-red px-6 py-4 text-sm font-medium text-white transition hover:bg-df-red-hover"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12.04 2c-5.5 0-10 4.5-10 10 0 1.77.46 3.44 1.27 4.89L2 22l5.25-1.28A9.96 9.96 0 0 0 12.04 22c5.5 0 10-4.5 10-10s-4.5-10-10-10Zm5.8 14.24c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.05.24-3.53-.74-2.99-1.19-4.9-4.24-5.05-4.44-.15-.2-1.22-1.62-1.22-3.1s.78-2.2 1.05-2.5c.28-.3.6-.37.8-.37h.58c.19 0 .43-.03.67.51.24.55.83 1.9.9 2.04.07.14.12.3.02.5-.1.2-.15.32-.3.5-.15.17-.3.38-.44.5-.15.15-.3.3-.13.6.17.3.76 1.25 1.64 2.03 1.13 1 2.08 1.32 2.38 1.47.3.15.48.13.65-.08.17-.2.73-.86.93-1.15.2-.3.4-.24.66-.14.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.13.07.75-.17 1.43Z" />
            </svg>
            Finalizar pedido no WhatsApp
          </a>
          <p className="mt-3 text-center text-xs text-df-muted">
            Você será redirecionado para o WhatsApp com o pedido já
            preenchido — a venda fecha na conversa com nosso consultor.
          </p>
        </>
      )}
    </main>
  );
}
