import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Recebe o formulário de interesse (nome, telefone, email) e grava na
 * tabela `leads` do Supabase — mesmo papel da captação do site antigo.
 */
export async function POST(request: Request) {
  let body: { name?: string; phone?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo inválido." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const email = (body.email ?? "").trim().toLowerCase();

  if (name.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { error: "Preencha nome e um email válido." },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Cadastro indisponível no momento. Fale conosco pelo WhatsApp." },
      { status: 503 }
    );
  }

  const { error } = await supabase
    .from("leads")
    .insert({ name, phone, email });

  if (error) {
    // 23505 = email repetido (unique_violation): tratamos como sucesso.
    if (error.code === "23505") {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { error: "Não foi possível salvar. Tente novamente." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
