"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthResult = { error: string } | undefined;

export async function signIn(
  _prev: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const supabase = await createClient();
  if (!supabase) {
    return {
      error:
        "O login ainda não foi configurado. Configure o Supabase no .env.local (veja o README).",
    };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    return { error: "Informe email e senha." };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return { error: "Email ou senha incorretos. Verifique e tente de novo." };
  }

  const voltar = String(formData.get("voltar") ?? "") || "/treinamentos";
  redirect(voltar.startsWith("/") ? voltar : "/treinamentos");
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  redirect("/");
}
