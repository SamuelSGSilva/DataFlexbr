import { Suspense } from "react";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Entrar — DataFlex",
  description: "Acesso exclusivo para clientes DataFlex.",
};

export default async function EntrarPage(props: PageProps<"/entrar">) {
  const searchParams = await props.searchParams;
  const voltar =
    typeof searchParams.voltar === "string" ? searchParams.voltar : "";

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-6 py-16">
      <h1 className="text-2xl font-bold">Acesso exclusivo DataFlex</h1>
      <p className="mt-2 text-sm text-neutral-400">
        Entre com o email e a senha fornecidos na compra do seu equipamento.
      </p>
      <Suspense>
        <LoginForm voltar={voltar} />
      </Suspense>
    </main>
  );
}
