// Treści w aktualnym języku: kolekcje content_en / content_pl (itd.) i ścieżki z przedrostkiem /pl.
// Klucze useAsyncData muszą zawierać język (lang), inaczej po przełączeniu wróciłyby dane z drugiej wersji.
export function useContentLocale() {
  // globalny język aplikacji (useI18n() w komponencie z blokiem <i18n> zwróciłby zakres lokalny)
  const locale = useNuxtApp().$i18n.locale
  const lang = computed(() => (locale.value === 'pl' ? 'pl' : 'en') as 'en' | 'pl')
  // nazwa kolekcji w aktualnym języku; typ jak dla wersji angielskiej (obie mają ten sam schemat)
  const col = <T extends 'content' | 'blog' | 'projects'>(name: T) => `${name}_${lang.value}` as `${T}_en`
  // adres w wersji angielskiej (np. '/projects/2026/reblyx') → adres w aktualnym języku ('/pl/projekty/2026/reblyx')
  const withLocale = (path: string) => (lang.value === 'en' ? path : `/pl${path === '/' ? '' : toPlPath(path)}`)
  // adres bez przedrostka języka, z angielskimi nazwami części ('/pl/projekty/x' → '/projects/x') – do porównań i linków z danych
  const withoutLocale = (path: string) => {
    const bare = path.replace(/^\/pl(?=\/|$)/, '') || '/'
    return bare === path ? path : fromPlPath(bare)
  }
  // adres strony bez ukośnika na końcu (GitHub Pages serwuje /projects/x/, treści mają /projects/x)
  const clean = (path: string) => path.replace(/\/+$/, '') || '/'
  return { lang, col, withLocale, withoutLocale, clean }
}
