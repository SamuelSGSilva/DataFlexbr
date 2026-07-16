export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export const WHATSAPP_NUMBER = "554599016090";

export const PRODUCTS: Product[] = [
  {
    id: "master",
    name: "DataFlex Master",
    price: 18400,
    description:
      "Equipamento completo: OBD + Bench + Boot, maleta, DataCenter, treinamento e 1 ano de atualizações.",
  },
  {
    id: "atualizacao-anual",
    name: "Atualização anual",
    price: 2250,
    description:
      "Novos sistemas e protocolos, funções Immo/EGR/DPF, DataCenter e portal EAD por 1 ano.",
  },
];

export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  });
}

export type CartItem = { productId: string; quantity: number };

/** Monta o link do WhatsApp com o resumo do pedido pronto para enviar. */
export function buildWhatsAppOrderUrl(items: CartItem[]): string {
  const lines = ["Olá! Quero fazer um pedido pelo site:", ""];
  let total = 0;

  for (const item of items) {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    if (!product) continue;
    const subtotal = product.price * item.quantity;
    total += subtotal;
    lines.push(
      `• ${item.quantity}x ${product.name} — ${formatPrice(subtotal)}`
    );
  }

  lines.push("", `Total: ${formatPrice(total)}`);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lines.join("\n")
  )}`;
}
