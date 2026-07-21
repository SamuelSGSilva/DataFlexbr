"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  DATACENTER_COOKIE,
  DATACENTER_MAX_AGE,
  checkCredentials,
  createDataCenterToken,
  verifyDataCenterToken,
} from "@/lib/datacenter-auth";
import {
  createDataCenterPost,
  deleteDataCenterPost,
} from "@/lib/datacenter-posts";

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
    secure: process.env.COOKIE_SECURE === "true",
    path: "/",
  });

  redirect("/datacenter");
}

export async function logoutDataCenter(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(DATACENTER_COOKIE);
  redirect("/datacenter");
}

async function requireSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyDataCenterToken(cookieStore.get(DATACENTER_COOKIE)?.value);
}

export type PostResult = { error: string } | undefined;

export async function addDataCenterPost(
  _prev: PostResult,
  formData: FormData
): Promise<PostResult> {
  if (!(await requireSession())) return { error: "Sessão expirada." };

  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();

  if (!title) return { error: "Informe um título." };

  const { error } = await createDataCenterPost(title, body, imageUrl);
  if (error) return { error };

  revalidatePath("/datacenter");
  return undefined;
}

export async function removeDataCenterPost(id: number): Promise<void> {
  if (!(await requireSession())) return;
  await deleteDataCenterPost(id);
  revalidatePath("/datacenter");
}
