"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export function CartButton() {
  const { totalCount } = useCart();

  return (
    <Link
      href="/carrinho"
      aria-label="Carrinho de compras"
      className="relative flex h-9 w-9 items-center justify-center rounded-df border border-df-line text-white transition hover:border-white/40"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="21" r="1" />
        <circle cx="18" cy="21" r="1" />
      </svg>
      {totalCount > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-df-red px-1 text-[10px] font-semibold text-white">
          {totalCount}
        </span>
      )}
    </Link>
  );
}
