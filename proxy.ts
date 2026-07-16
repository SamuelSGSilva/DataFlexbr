import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, verifyAccessToken } from "@/lib/access-cookie";

/**
 * Protege as áreas exclusivas para cadastrados (treinamentos e tabela
 * de compatibilidade): sem passe válido, redireciona para /entrar.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected =
    pathname.startsWith("/treinamentos") ||
    pathname.startsWith("/compatibilidade");
  if (!isProtected) return NextResponse.next();

  // Sem segredo configurado (ambiente de desenvolvimento inicial), não bloqueia.
  if (!process.env.ACCESS_TOKEN_SECRET) return NextResponse.next();

  const leadId = await verifyAccessToken(
    request.cookies.get(ACCESS_COOKIE)?.value
  );
  if (leadId) return NextResponse.next();

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/entrar";
  loginUrl.searchParams.set("voltar", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/treinamentos/:path*", "/compatibilidade/:path*"],
};
