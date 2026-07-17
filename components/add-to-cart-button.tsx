"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export function AddToCartButton({
  productId,
  variant = "solid",
  className = "",
}: {
  productId: string;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    add(productId);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const base =
    "inline-flex items-center justify-center gap-2 rounded-df px-5 py-3 text-sm font-medium transition";
  const solid = "bg-df-red text-white hover:bg-df-red-hover";
  const outline = "border border-white/30 text-white hover:border-white/60";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${base} ${variant === "solid" ? solid : outline} ${className}`}
    >
      {added ? (
        <>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
          </svg>
          Adicionado
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="10" cy="21" r="1" />
            <circle cx="18" cy="21" r="1" />
          </svg>
          Adicionar ao carrinho
        </>
      )}
    </button>
  );
}
