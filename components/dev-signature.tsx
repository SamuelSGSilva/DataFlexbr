"use client";

import { useEffect } from "react";

/**
 * Easter egg: assinatura do desenvolvedor no console do navegador.
 * Invisível para o usuário comum; só quem abre o DevTools (F12) vê.
 */
export function DevSignature() {
  useEffect(() => {
    const title = "%c⚡ DataFlex by Tael";
    const titleStyle = [
      "color:#fff",
      "background:#b20000",
      "font-size:20px",
      "font-weight:bold",
      "padding:8px 16px",
      "border-radius:5px",
    ].join(";");

    const credit =
      "%cDesenvolvido por Samuel Santos\n%c→ github.com/SamuelSGSilva";
    const creditStyle = "color:#fff;font-size:13px;font-weight:600";
    const linkStyle = "color:#b20000;font-size:13px";

    // eslint-disable-next-line no-console
    console.log(title, titleStyle);
    // eslint-disable-next-line no-console
    console.log(credit, creditStyle, linkStyle);
  }, []);

  return null;
}
