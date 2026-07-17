"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type CartItem } from "@/lib/products";

const STORAGE_KEY = "dfx_cart";

type CartContextValue = {
  items: CartItem[];
  totalCount: number;
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // localStorage indisponível ou dado corrompido: começa vazio.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalCount: items.reduce((sum, i) => sum + i.quantity, 0),
      add: (productId, quantity = 1) => {
        if (!PRODUCTS.some((p) => p.id === productId)) return;
        setItems((prev) => {
          const existing = prev.find((i) => i.productId === productId);
          if (existing) {
            return prev.map((i) =>
              i.productId === productId
                ? { ...i, quantity: i.quantity + quantity }
                : i
            );
          }
          return [...prev, { productId, quantity }];
        });
      },
      remove: (productId) => {
        setItems((prev) => prev.filter((i) => i.productId !== productId));
      },
      setQuantity: (productId, quantity) => {
        setItems((prev) => {
          if (quantity <= 0) return prev.filter((i) => i.productId !== productId);
          return prev.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          );
        });
      },
      clear: () => setItems([]),
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return ctx;
}
