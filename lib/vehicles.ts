import vehiclesFile from "@/data/vehicles.json";

export type Vehicle = {
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

type VehiclesFile = {
  generated_at: string;
  total: number;
  brands: string[];
  vehicles: Vehicle[];
};

const data = vehiclesFile as unknown as VehiclesFile;

export function getVehicles(): Vehicle[] {
  return data.vehicles;
}

export function getBrands(): string[] {
  return data.brands;
}

export function getVehicleStats() {
  return { total: data.vehicles.length, brands: data.brands.length };
}
