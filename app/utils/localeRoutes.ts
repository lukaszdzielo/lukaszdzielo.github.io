// Adresy w dwóch językach. W kodzie i danych piszemy adresy wersji angielskiej bez przedrostka
// ('/projects/2025/superauto', '/blog'), a polska wersja dostaje polskie nazwy części adresu:
// /pl/projekty/…, /pl/wpisy/…, /pl/wpisy/strona/2. Ten plik czytają też nuxt.config.ts i content.config.ts,
// dlatego bez importów z Nuxt.

// Części adresu EN → PL; dłuższe najpierw (/blog/page przed /blog)
export const PL_SEGMENTS: ReadonlyArray<readonly [string, string]> = [
  ['/blog/page', '/wpisy/strona'],
  ['/blog', '/wpisy'],
  ['/projects', '/projekty'],
]

// Zamienia początek adresu, gdy pasuje cała część (/blog i /blog/…, ale nie /blogi)
const swap = (path: string, pairs: ReadonlyArray<readonly [string, string]>) => {
  for (const [from, to] of pairs) {
    if (path === from || path.startsWith(`${from}/`)) return to + path.slice(from.length)
  }
  return path
}

// '/projects/2025/superauto' → '/projekty/2025/superauto' (bez /pl)
export const toPlPath = (path: string) => swap(path, PL_SEGMENTS)

// '/projekty/2025/superauto' → '/projects/2025/superauto' (adres po usunięciu /pl)
export const fromPlPath = (path: string) => swap(path, PL_SEGMENTS.map(([en, pl]) => [pl, en] as const))
