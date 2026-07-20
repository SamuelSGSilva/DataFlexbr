"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  DATACENTER_COOKIE,
  DATACENTER_MAX_AGE,
  checkCredentials,
  createDataCenterToken,
} from "@/lib/datacenter-auth";

export type LoginResult = { error: string } | undefined;

export async function loginDataCenter(
  _prev: LoginResult,
  formData: FormData
): Promise<LoginResult> {
  const user = String(formData.get("user") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!checkCredentials(user, password)) {
    return { error: "Usuário ou senha incorretos." };
  }

  const token = await createDataCenterToken();
  if (!token) {
    return {
      error: "Login indisponível: ACCESS_TOKEN_SECRET não configurado.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(DATACENTER_COOKIE, token, {
    maxAge: DATACENTER_MAX_AGE,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  redirect("/datacenter");
}

export async function logoutDataCenter(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(DATACENTER_COOKIE);
  redirect("/datacenter");
}
