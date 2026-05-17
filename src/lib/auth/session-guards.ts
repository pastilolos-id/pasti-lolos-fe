export function shouldTriggerSessionExpired(path: string): boolean {
  const normalized = path.split("?")[0] ?? path;
  if (normalized === "/auth/login" || normalized === "/auth/logout") {
    return false;
  }
  return true;
}
