// Kliknięcie w link do miejsca, w którym już jesteśmy, nie zmienia trasy, więc router nie przewija strony.
// Tu przewijamy ręcznie (płynnie, chyba że w systemie włączone „ogranicz ruch”):
// – ta sama kotwica (np. „Projekty”, gdy adres to już /#projects) → do sekcji,
// – ta sama strona bez kotwicy (np. logo na stronie głównej, „Strony dla firm” na stronie dla firm) → na górę.
const trim = (path: string) => path.replace(/\/$/, '') || '/'

export default defineNuxtPlugin(() => {
  document.addEventListener('click', (event) => {
    // NuxtLink sam blokuje domyślną akcję – zwykłe <a href="#…"> przewija przeglądarka
    if (!event.defaultPrevented || event.button !== 0) return

    const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
    if (!link || link.origin !== location.origin) return
    if (trim(link.pathname) !== trim(location.pathname) || link.search !== location.search) return
    if (link.hash !== location.hash) return // inna kotwica – przewija router (app/router.options.ts)

    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    if (link.hash) document.querySelector(decodeURIComponent(link.hash))?.scrollIntoView({ behavior })
    else window.scrollTo({ top: 0, behavior })
  })
})
