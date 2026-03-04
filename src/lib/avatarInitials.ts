export function getAvatarInitials(name: string): string {
  if (!name || typeof name !== "string") return "";

  const words = name
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  if (words.length === 0) return "";
  if (words.length === 1) return words[0][0].toUpperCase();

  return (words[0][0] + words[1][0]).toUpperCase();
}
