import { cookies } from "next/headers";
import {
  DATACENTER_COOKIE,
  verifyDataCenterToken,
} from "@/lib/datacenter-auth";
import { logoutDataCenter } from "./actions";
import { DataCenterLoginForm } from "./login-form";

export const metadata = {
  title: "DataCenter — DataFlex",
  robots: { index: false, follow: false },
};

export default async function DataCenterPage() {
  const cookieStore = await cookies();
  const authenticated = await verifyDataCenterToken(
    cookieStore.get(DATACENTER_COOKIE)?.value
  );

  if (!authenticated) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-6 py-16">
        <p className="text-xs font-medium uppercase tracking-wide text-df-red">
          Área restrita
        </p>
        <h1 className="mt-2 font-heading text-3xl uppercase tracking-tight">
          Acesso DataCenter
        </h1>
        <p className="mt-2 text-sm text-df-muted">
          Login exclusivo para parceiros DataFlex.
        </p>
        <DataCenterLoginForm />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-df-red">
            Área restrita
          </p>
          <h1 className="mt-2 font-heading text-3xl uppercase tracking-tight">
            DataCenter
          </h1>
        </div>
        <form action={logoutDataCenter}>
          <button className="rounded-df border border-white/30 bg-df-dark/60 px-4 py-2 text-sm text-white hover:border-white/60">
            Sair
          </button>
        </form>
      </div>

      <div className="mt-10 rounded-df border border-df-line bg-df-panel px-6 py-10 text-center text-df-muted">
        Em construção. Em breve esta área permitirá adicionar conteúdo ao
        DataCenter.
      </div>
    </main>
  );
}
