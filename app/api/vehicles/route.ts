import { NextResponse } from "next/server";
import { getVehicles } from "@/lib/vehicles";
import { getLeadSession } from "@/lib/gate-actions";

export const dynamic = "force-dynamic";

// Quantos veículos o visitante NÃO cadastrado consegue ver (prévia).
const PREVIEW_COUNT = 30;

export async function GET() {
  const all = getVehicles();
  const gateConfigured = Boolean(process.env.ACCESS_TOKEN_SECRET);
  const leadId = await getLeadSession();
  const authed = !gateConfigured || leadId != null;

  if (authed) {
    return NextResponse.json({ vehicles: all });
  }

  // Sem cadastro: manda só a prévia (o resto nem sai do servidor),
  // mas os totais (veículos/marcas) sempre são os reais.
  return NextResponse.json({
    vehicles: all.slice(0, PREVIEW_COUNT),
    total: all.length,
    totalBrands: new Set(all.map((v) => v.brand)).size,
    preview: true,
  });
}
