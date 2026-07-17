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
