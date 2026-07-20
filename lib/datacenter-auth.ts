/**
 * Login simples (usuário/senha único, compartilhado) para a área
 * DataCenter. Reaproveita o ACCESS_TOKEN_SECRET já usado no cookie de
 * leads, mas com nome de cookie e payload próprios.
 */

export const DATACENTER_COOKIE = "dfx_datacenter";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 dias

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

export function checkCredentials(user: string, password: string): boolean {
  const expectedUser = process.env.DATACENTER_USER ?? "";
  const expectedPassword = process.env.DATACENTER_PASSWORD ?? "";
  if (!expectedUser || !expectedPassword) return false;
  return user === expectedUser && password === expectedPassword;
}

export async function createDataCenterToken(): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const payload = `dc.${exp}`;
  const sig = await hmacHex(payload, secret);
  return `${payload}.${sig}`;
}

export async function verifyDataCenterToken(
  token: string | undefined
): Promise<boolean> {
  const secret = getSecret();
  if (!secret || !token) return false;

  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "dc") return false;
  const [, expPart, sig] = parts;

  const exp = Number(expPart);
  if (!Number.isInteger(exp) || exp < Math.floor(Date.now() / 1000)) return false;

  const expected = await hmacHex(`dc.${expPart}`, secret);
  if (sig.length !== expected.length) return false;

  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export { MAX_AGE as DATACENTER_MAX_AGE };
