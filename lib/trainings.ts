import { createClient } from "@/lib/supabase/server";
import trainingsFile from "@/data/trainings.json";

export type Lesson = {
  slug: string;
  title: string;
  moduleSlug: string;
  youtubeId: string;
  order: number;
};

export type Module = {
  slug: string;
  title: string;
  order: number;
  lessons: Lesson[];
};

type Row = {
  slug: string;
  title: string;
  module_slug: string;
  youtube_id: string;
  sort: number;
};

/**
 * Retorna os módulos com suas aulas.
 * Fonte preferida: tabelas `modules`/`lessons` no Supabase (editáveis pelo painel).
 * Fallback: data/trainings.json (conteúdo extraído do site antigo), para o site
 * funcionar antes do Supabase estar configurado ou populado.
 */
export async function getModules(): Promise<Module[]> {
  const fromDb = await getModulesFromSupabase();
  if (fromDb && fromDb.length > 0) return fromDb;
  return getModulesFromFile();
}

async function getModulesFromSupabase(): Promise<Module[] | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const [mods, lessons] = await Promise.all([
    supabase.from("modules").select("slug,title,sort").order("sort"),
    supabase
      .from("lessons")
      .select("slug,title,module_slug,youtube_id,sort")
      .order("sort"),
  ]);
  if (mods.error || lessons.error || !mods.data?.length) return null;

  return mods.data.map((m) => ({
    slug: m.slug,
    title: m.title,
    order: m.sort,
    lessons: (lessons.data as Row[])
      .filter((l) => l.module_slug === m.slug)
      .map((l) => ({
        slug: l.slug,
        title: l.title,
        moduleSlug: l.module_slug,
        youtubeId: l.youtube_id,
        order: l.sort,
      })),
  }));
}

function getModulesFromFile(): Module[] {
  const { modules, lessons } = trainingsFile as {
    modules: { slug: string; title: string; order: number }[];
    lessons: Lesson[];
  };
  return modules.map((m) => ({
    ...m,
    lessons: lessons.filter((l) => l.moduleSlug === m.slug),
  }));
}
