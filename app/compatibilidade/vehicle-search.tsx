"use client";

import { useEffect, useMemo, useState } from "react";

type Vehicle = {
  brand: string;
  model: string;
  year: string;
  ecu: string;
  chip: string;
  obd: boolean;
  bench: boolean;
  boot: boolean;
  crc: boolean;
  extras: string;
};

const PER_PAGE = 50;

const PROTOCOL_LABELS: { key: "obd" | "bench" | "boot" | "crc"; label: string }[] = [
  { key: "obd", label: "OBD" },
  { key: "bench", label: "Bench" },
  { key: "boot", label: "Boot" },
  { key: "crc", label: "Checksum" },
];

function deburr(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function ProtocolCell({ active }: { active: boolean }) {
  return (
    <span
      className={
        active
          ? "inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-950 text-green-400"
          : "inline-flex h-6 w-6 items-center justify-center rounded-full text-df-muted/40"
      }
      title={active ? "Suportado" : "Não disponível"}
    >
      {active ? <CheckIcon /> : <DashIcon />}
    </span>
  );
}

export function VehicleSearch() {
  const [vehicles, setVehicles] = useState<Vehicle[] | null>(null);
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [protocols, setProtocols] = useState({
    obd: false,
    bench: false,
    boot: false,
    crc: false,
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/data/vehicles.json")
      .then((r) => r.json())
      .then((data: { vehicles: Vehicle[] }) => setVehicles(data.vehicles))
      .catch(() => setVehicles([]));
  }, []);

  const brands = useMemo(() => {
    if (!vehicles) return [];
    const counts = new Map<string, number>();
    for (const v of vehicles) counts.set(v.brand, (counts.get(v.brand) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [vehicles]);

  const tokens = useMemo(
    () => deburr(query.trim()).split(/\s+/).filter(Boolean),
    [query]
  );
  const anyProto =
    protocols.obd || protocols.bench || protocols.boot || protocols.crc;

  const filtered = useMemo(() => {
    if (!vehicles) return [];
    return vehicles.filter((v) => {
      if (brand && v.brand !== brand) return false;
      if (anyProto) {
        if (protocols.obd && !v.obd) return false;
        if (protocols.bench && !v.bench) return false;
        if (protocols.boot && !v.boot) return false;
        if (protocols.crc && !v.crc) return false;
      }
      if (tokens.length) {
        const haystack = deburr(
          [v.brand, v.model, v.year, v.ecu, v.chip, v.extras].join(" ")
        );
        for (const t of tokens) if (!haystack.includes(t)) return false;
      }
      return true;
    });
  }, [vehicles, brand, protocols, anyProto, tokens]);

  useEffect(() => {
    setPage(1);
  }, [query, brand, protocols]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  function toggleProtocol(key: "obd" | "bench" | "boot" | "crc") {
    setProtocols((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function resetFilters() {
    setQuery("");
    setBrand("");
    setProtocols({ obd: false, bench: false, boot: false, crc: false });
  }

  const hasActiveFilters = query || brand || anyProto;

  return (
    <div className="mt-8">
      {/* Busca e filtros */}
      <div className="rounded-df border border-df-line bg-df-panel p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-df-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busque por marca, modelo, ano ou ECU…"
              className="w-full rounded-df border border-df-line bg-df-dark py-2.5 pl-10 pr-4 text-sm outline-none focus:border-df-red"
            />
          </div>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="rounded-df border border-df-line bg-df-dark px-4 py-2.5 text-sm outline-none focus:border-df-red sm:w-56"
          >
            <option value="">
              Todas as marcas {vehicles ? `(${vehicles.length})` : ""}
            </option>
            {brands.map(([name, count]) => (
              <option key={name} value={name}>
                {name} ({count})
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {PROTOCOL_LABELS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              aria-pressed={protocols[key]}
              onClick={() => toggleProtocol(key)}
              className={`rounded-df border px-3 py-1.5 text-xs font-medium uppercase tracking-wide transition ${
                protocols[key]
                  ? "border-df-red bg-df-red text-white"
                  : "border-df-line text-df-muted hover:border-white/40"
              }`}
            >
              {label}
            </button>
          ))}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="ml-1 text-xs text-df-muted underline-offset-2 hover:text-white hover:underline"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* Estatísticas */}
      <p className="mt-4 text-sm text-df-muted">
        {vehicles === null ? (
          "Carregando lista de veículos…"
        ) : filtered.length === vehicles.length ? (
          <>
            <span className="font-semibold text-white">
              {vehicles.length.toLocaleString("pt-BR")}
            </span>{" "}
            veículos compatíveis
          </>
        ) : (
          <>
            Mostrando{" "}
            <span className="font-semibold text-white">
              {filtered.length.toLocaleString("pt-BR")}
            </span>{" "}
            de {vehicles.length.toLocaleString("pt-BR")} veículos
          </>
        )}
      </p>

      {/* Tabela */}
      <div className="mt-3 overflow-x-auto rounded-df border border-df-line">
        <table className="w-full min-w-[820px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-df-line bg-df-panel text-left text-xs uppercase tracking-wide text-df-muted">
              <th className="px-4 py-3 font-medium">Marca</th>
              <th className="px-4 py-3 font-medium">Modelo</th>
              <th className="px-4 py-3 font-medium">Ano</th>
              <th className="px-4 py-3 font-medium">ECU</th>
              <th className="px-4 py-3 text-center font-medium">OBD</th>
              <th className="px-4 py-3 text-center font-medium">Bench</th>
              <th className="px-4 py-3 text-center font-medium">Boot</th>
              <th className="px-4 py-3 font-medium">Extras</th>
            </tr>
          </thead>
          <tbody>
            {vehicles === null && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-df-muted">
                  Carregando lista de veículos…
                </td>
              </tr>
            )}
            {vehicles !== null && pageRows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-df-muted">
                  Nenhum veículo encontrado. Ajuste a busca ou os filtros.
                </td>
              </tr>
            )}
            {pageRows.map((v, i) => (
              <tr
                key={`${v.brand}-${v.model}-${v.ecu}-${i}`}
                className="border-b border-df-line last:border-0 odd:bg-df-panel/40"
              >
                <td className="px-4 py-3 font-medium">{v.brand}</td>
                <td className="px-4 py-3">{v.model}</td>
                <td className="px-4 py-3 tabular-nums text-df-muted">{v.year}</td>
                <td className="px-4 py-3 text-df-muted">{v.ecu}</td>
                <td className="px-4 py-3 text-center">
                  <ProtocolCell active={v.obd} />
                </td>
                <td className="px-4 py-3 text-center">
                  <ProtocolCell active={v.bench} />
                </td>
                <td className="px-4 py-3 text-center">
                  <ProtocolCell active={v.boot} />
                </td>
                <td className="px-4 py-3">
                  {v.extras ? (
                    <div className="flex flex-wrap gap-1">
                      {v.extras.split(",").map((tag) => (
                        <span
                          key={tag}
                          className="rounded-df bg-df-panel px-2 py-0.5 text-xs text-df-muted"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-df-muted/50">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {filtered.length > PER_PAGE && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-df border border-df-line px-4 py-2 text-df-muted transition hover:border-white/40 hover:text-white disabled:opacity-30"
          >
            Anterior
          </button>
          <span className="text-df-muted">
            Página <span className="text-white">{currentPage}</span> de{" "}
            {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-df border border-df-line px-4 py-2 text-df-muted transition hover:border-white/40 hover:text-white disabled:opacity-30"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}
