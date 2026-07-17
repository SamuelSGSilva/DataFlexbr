import { Suspense } from "react";
import { GateForm } from "./gate-form";

export const metadata = {
  title: "Acesso exclusivo — DataFlex",
  description:
    "Cadastre-se gratuitamente para acessar a tabela de compatibilidade e os treinamentos DataFlex.",
};

export default async function EntrarPage(props: PageProps<"/entrar">) {
  const searchParams = await props.searchParams;
  const voltar =
    typeof searchParams.voltar === "string" ? searchParams.voltar : "";

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-6 py-16">
      <h1 className="font-heading text-3xl uppercase tracking-tight">
        Acesso exclusivo DataFlex
      </h1>
      <p className="mt-2 text-sm text-df-muted">
        Preencha os dados abaixo para liberar o acesso gratuito à tabela de
        compatibilidade e aos treinamentos.
      </p>
      <Suspense>
        <GateForm voltar={voltar} />
      </Suspense>
      <p className="mt-6 text-xs text-df-muted">
        100% gratuito. Seus dados são usados apenas para liberar o acesso e
        contato comercial.
      </p>
    </main>
  );
}
