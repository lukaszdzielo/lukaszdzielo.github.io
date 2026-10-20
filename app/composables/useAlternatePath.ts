// Adres tej samej strony w drugim języku – do przełącznika języka i hreflang (app.vue).
// Wpis ma w każdym języku adres z tytułu: pary EN → PL (wspólne translationKey) liczy nuxt.config.ts
// i podaje w runtimeConfig.public.postPairs, np. '/blog/2026/table-like-a-spreadsheet' → '/wpisy/2026/tabela-jak-arkusz'.
// Mapa jest ta sama na serwerze i w przeglądarce, więc adres zgadza się już w HTML (bez poprawiania po starcie).
// Pozostałe strony – switchLocalePath z @nuxtjs/i18n.
export function useAlternatePath() {
  const route = useRoute()
  const switchLocalePath = useSwitchLocalePath()
  const pairs = useRuntimeConfig().public.postPairs as Record<string, string>

  return (code: 'en' | 'pl') => {
    const path = route.path.replace(/\/+$/, '') || '/'
    if (/^\/blog\/\d{4}\//.test(path) && pairs[path]) {
      return code === 'pl' ? `/pl${pairs[path]}` : path
    }
    if (/^\/pl\/wpisy\/\d{4}\//.test(path)) {
      const plPath = path.slice(3)
      const enPath = Object.keys(pairs).find(key => pairs[key] === plPath)
      if (enPath) return code === 'en' ? enPath : path
    }
    return switchLocalePath(code)
  }
}
