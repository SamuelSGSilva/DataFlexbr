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
import { createCodeToken, generateCode, verifyCodeToken } from "@/lib/login-code";
import { sendEmail } from "@/lib/brevo";

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

export type CodeResult =
  | { error: string; codeToken?: undefined }
  | { error?: undefined; codeToken: string; email: string }
  | undefined;

/** Gera o código, assina o token e envia por email. Comum às duas telas. */
async function sendAccessCode(
  leadId: number,
  email: string
): Promise<CodeResult> {
  const code = generateCode();
  const codeToken = await createCodeToken(leadId, code);
  if (!codeToken) {
    return {
      error: "Login indisponível: ACCESS_TOKEN_SECRET não configurado.",
    };
  }

  const { error: mailError } = await sendEmail(
    email,
    "Seu código de acesso DataFlex",
    `<p>Seu código de acesso é:</p><p style="font-size:28px;font-weight:bold;letter-spacing:4px">${code}</p><p>Válido por 10 minutos.</p>`
  );
  if (mailError) return { error: mailError };

  return { codeToken, email };
}

/**
 * Novo cadastro, etapa 1: salva o lead e envia o código de confirmação
 * por email. O acesso só é liberado depois que o código é confirmado.
 */
export async function registerLead(
  _prev: CodeResult,
  formData: FormData
): Promise<CodeResult> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const accepted = formData.get("privacy") === "on";

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

  return sendAccessCode(Number(data), email);
}

/** "Já tenho cadastro": localiza pelo email e libera o acesso na hora. */
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

/** Etapa 2 do cadastro novo: confere o código digitado e libera o acesso. */
export async function verifyLoginCode(
  _prev: GateResult,
  formData: FormData
): Promise<GateResult> {
  const code = String(formData.get("code") ?? "");
  const codeToken = String(formData.get("codeToken") ?? "");
  const voltar = String(formData.get("voltar") ?? "") || "/treinamentos";

  const leadId = await verifyCodeToken(codeToken, code);
  if (!leadId) return { error: "Código inválido ou expirado." };

  return grantAccess(leadId, voltar);
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
