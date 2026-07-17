/**
 * Miniatura oficial do YouTube para um vídeo. `maxresdefault` nem sempre
 * existe (depende da resolução original); `hqdefault` sempre existe e
 * é o mesmo fallback que o site antigo usava.
 */
export function youtubeThumbnail(
  youtubeId: string,
  quality: "hqdefault" | "maxresdefault" = "hqdefault"
): string {
  return `https://img.youtube.com/vi/${youtubeId}/${quality}.jpg`;
}

/**
 * IDs de vídeos que sabemos estar privados/indisponíveis no YouTube
 * (confirmado em 17/07/2026). Assim que o vídeo virar "não listado" no
 * YouTube Studio, é só remover o ID daqui — nenhuma outra mudança é
 * necessária.
 */
const UNAVAILABLE_YOUTUBE_IDS = new Set<string>([
  "KoMiW8kvIXE", // DataFlex - Campanha Inicial 02: marcado como privado
]);

export function isVideoUnavailable(youtubeId: string): boolean {
  return UNAVAILABLE_YOUTUBE_IDS.has(youtubeId);
}
