"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  ACCESS_COOKIE,
  ACCESS_MAX_AGE,
  createAccessToken,
  verifyAccessToken,
} from "@/lib/access-cookie";

export type GateResult = { error: string } | undefined;

async function grantAccess(leadId: number, voltar: string): Promise<never> {
  const token = await createAccessToken(leadId);
  if (token) {
    const cookieStore = await cookies();
    cookieStore.set(ACCESS_COOKIE, token, {
      maxAge: ACCESS_MAX_AGE,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }
  redirect(voltar.startsWith("/") ? voltar : "/treinamentos");
}

/** Novo cadastro: salva o lead e libera o acesso na hora. */
export async function registerLead(
  _prev: GateResult,
  formData: FormData
): Promise<GateResult> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const accepted = formData.get("privacy") === "on";
  const voltar = String(formData.get("voltar") ?? "") || "/treinamentos";

  if (name.length < 2) return { error: "Informe seu nome completo." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return { error: "Informe um email válido." };
  if (phone.replace(/\D/g, "").length < 10)
    return { error: "Informe um WhatsApp válido, com DDD." };
  if (!accepted)
    return { error: "É preciso aceitar a política de privacidade." };

  const supabase = await createClient();
  if (!supabase)
    return {
      error:
        "Cadastro indisponível: o Supabase ainda não foi configurado no .env.local.",
    };

  const { data, error } = await supabase.rpc("register_lead", {
    p_name: name,
    p_phone: phone,
    p_email: email,
  });
  if (error || !data) {
    return { error: "Não foi possível concluir o cadastro. Tente novamente." };
  }

  return grantAccess(Number(data), voltar);
}

/** "Já tenho cadastro": localiza pelo email e libera de novo. */
export async function loginLead(
  _prev: GateResult,
  formData: FormData
): Promise<GateResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const voltar = String(formData.get("voltar") ?? "") || "/treinamentos";

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return { error: "Informe um email válido." };

  const supabase = await createClient();
  if (!supabase)
    return {
      error:
        "Acesso indisponível: o Supabase ainda não foi configurado no .env.local.",
    };

  const { data, error } = await supabase.rpc("login_lead", { p_email: email });
  if (error) {
    return { error: "Não foi possível verificar agora. Tente novamente." };
  }
  if (!data) {
    return {
      error: "Não encontramos esse email. Faça um novo cadastro — é rápido.",
    };
  }

  return grantAccess(Number(data), voltar);
}

/** Sai da conta neste navegador. */
export async function signOutGate(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_COOKIE);
  redirect("/");
}

/** Id do lead com passe válido nesta sessão, ou null. */
export async function getLeadSession(): Promise<number | null> {
  const cookieStore = await cookies();
  return verifyAccessToken(cookieStore.get(ACCESS_COOKIE)?.value);
}
