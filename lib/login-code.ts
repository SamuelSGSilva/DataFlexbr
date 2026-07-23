/**
 * Código de verificação por WhatsApp no cadastro novo.
 * Sem tabela no banco: o código fica embutido num token assinado (HMAC)
 * que volta num campo oculto do formulário — o servidor só reconfere a
 * assinatura e a validade (10 minutos).
 */

const CODE_MAX_AGE = 60 * 10; // 10 minutos

function getSecret(): string {
  return process.env.ACCESS_TOKEN_SECRET ?? "";
}

async function hmacHex(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function generateCode(): string {
  return String(crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000).padStart(6, "0");
}

/** Token: "<leadId>.<exp>.<code>.<assinatura>" */
export async function createCodeToken(
  leadId: number,
  code: string
): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const exp = Math.floor(Date.now() / 1000) + CODE_MAX_AGE;
  const payload = `${leadId}.${exp}.${code}`;
  const sig = await hmacHex(payload, secret);
  return `${payload}.${sig}`;
}

export async function verifyCodeToken(
  token: string | undefined,
  submittedCode: string
): Promise<number | null> {
  const secret = getSecret();
  if (!secret || !token) return null;

  const parts = token.split(".");
  if (parts.length !== 4) return null;
  const [idPart, expPart, code, sig] = parts;

  const leadId = Number(idPart);
  const exp = Number(expPart);
  if (!Number.isInteger(leadId) || !Number.isInteger(exp)) return null;
  if (exp < Math.floor(Date.now() / 1000)) return null;

  const expected = await hmacHex(`${idPart}.${expPart}.${code}`, secret);
  if (sig.length !== expected.length) return null;

  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  if (diff !== 0) return null;

  return code === submittedCode.trim() ? leadId : null;
}
