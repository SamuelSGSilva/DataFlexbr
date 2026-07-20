/** Envio de email transacional via API REST do Brevo (sem SDK). */

export async function sendEmail(
  to: string,
  subject: string,
  htmlContent: string
): Promise<{ error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !senderEmail) {
    return { error: "Brevo não configurado (BREVO_API_KEY/BREVO_SENDER_EMAIL)." };
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { email: senderEmail, name: "DataFlex" },
      to: [{ email: to }],
      subject,
      htmlContent,
    }),
  });

  if (!res.ok) return { error: "Não foi possível enviar o email agora." };
  return {};
}
