import { getLeadSession } from "@/lib/gate-actions";
import { PreviewGate } from "@/components/preview-gate";
import { VehicleSearch } from "./vehicle-search";

export const metadata = {
  title: "Tabela de aplicação — DataFlex",
  description:
    "Consulte os veículos compatíveis com o DataFlex by Tael: marca, modelo, ECU e modos suportados (OBD, Bench, Boot).",
};

export default async function CompatibilidadePage() {
  const leadId = await getLeadSession();
  const gated = Boolean(process.env.ACCESS_TOKEN_SECRET) && !leadId;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <p className="text-xs font-medium uppercase tracking-wide text-df-red">
        Tabela de aplicação
      </p>
      <h1 className="mt-2 font-heading text-3xl uppercase tracking-tight">
        Veja se o seu carro é compatível
      </h1>
      <p className="mt-3 max-w-2xl text-df-muted">
        Busque por marca, modelo, ano ou ECU. Os resultados aparecem na
        hora, com os modos de comunicação suportados por cada sistema.
      </p>

      <PreviewGate gated={gated} voltar="/compatibilidade">
        <VehicleSearch />
      </PreviewGate>
    </main>
  );
}
