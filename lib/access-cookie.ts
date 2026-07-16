/**
 * Passe de acesso do visitante cadastrado: um cookie assinado (HMAC)
 * com validade de 1 ano. Usa Web Crypto, então funciona tanto nas
 * server actions (Node) quanto no proxy.ts (Edge).
 */

export const ACCESS_COOKIE = "dfx_access";
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 365; // 1 ano

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

/** Gera o valor do cookie: "<leadId>.<expiraEm>.<assinatura>" */
export async function createAccessToken(leadId: number): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const exp = Math.floor(Date.now() / 1000) + ACCESS_MAX_AGE;
  const payload = `${leadId}.${exp}`;
  const sig = await hmacHex(payload, secret);
  return `${payload}.${sig}`;
}

/** Valida o cookie e devolve o id do lead, ou null se inválido/expirado. */
export async function verifyAccessToken(
  token: string | undefined
): Promise<number | null> {
  const secret = getSecret();
  if (!secret || !token) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [idPart, expPart, sig] = parts;

  const leadId = Number(idPart);
  const exp = Number(expPart);
  if (!Number.isInteger(leadId) || !Number.isInteger(exp)) return null;
  if (exp < Math.floor(Date.now() / 1000)) return null;

  const expected = await hmacHex(`${idPart}.${expPart}`, secret);
  if (sig.length !== expected.length) return null;

  // Comparação em tempo constante
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0 ? leadId : null;
}
