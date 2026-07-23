/** Envio de mensagem via Evolution API (WhatsApp). */

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.startsWith("55") ? digits : `55${digits}`;
}

export async function sendWhatsAppMessage(
  phone: string,
  text: string
): Promise<{ error?: string }> {
  const baseUrl = process.env.EVOLUTION_API_URL;
  const apiKey = process.env.EVOLUTION_API_KEY;
  const instance = process.env.EVOLUTION_INSTANCE;
  if (!baseUrl || !apiKey || !instance) {
    return { error: "Evolution API não configurada." };
  }

  const res = await fetch(
    `${baseUrl}/message/sendText/${encodeURIComponent(instance)}`,
    {
      method: "POST",
      headers: {
        apikey: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number: normalizePhone(phone),
        text,
      }),
    }
  );

  if (!res.ok) return { error: "Não foi possível enviar a mensagem agora." };
  return {};
}
