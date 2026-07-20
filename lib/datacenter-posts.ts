import { createClient } from "@/lib/supabase/server";

export type DataCenterPost = {
  id: number;
  title: string;
  body: string;
  imageUrl: string | null;
  createdAt: string;
};

export async function getDataCenterPosts(): Promise<DataCenterPost[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("datacenter_posts")
    .select("id,title,body,image_url,created_at")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    body: row.body,
    imageUrl: row.image_url,
    createdAt: row.created_at,
  }));
}

export async function createDataCenterPost(
  title: string,
  body: string,
  imageUrl: string
): Promise<{ error?: string }> {
  const supabase = await createClient();
  if (!supabase) return { error: "Supabase não configurado." };

  const { error } = await supabase.from("datacenter_posts").insert({
    title,
    body,
    image_url: imageUrl || null,
  });

  if (error) return { error: "Não foi possível salvar. Tente novamente." };
  return {};
}

export async function deleteDataCenterPost(id: number): Promise<void> {
  const supabase = await createClient();
  if (!supabase) return;
  await supabase.from("datacenter_posts").delete().eq("id", id);
}
