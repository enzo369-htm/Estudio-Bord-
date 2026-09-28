/** Written on <html> so the 3D chunk and the page share one value. */
export function readHeroProgress() {
  if (typeof document === "undefined") return 0;
  const raw = document.documentElement.dataset.hero;
  const value = raw ? Number(raw) : 0;
  return Number.isFinite(value) ? value : 0;
}

export function writeHeroProgress(value: number) {
  document.documentElement.dataset.hero = String(value);
}
