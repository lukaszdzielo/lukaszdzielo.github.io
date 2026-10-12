// Ponowne kliknięcie w link do tej samej kotwicy (np. „Projekty”, gdy adres to już /#projects)
// nie zmienia trasy, więc router nie przewija strony. Tu przewijamy ręcznie.
// Płynnie, chyba że w systemie włączone „ogranicz ruch”.
export default defineNuxtPlugin(() => {
  document.addEventListener('click', (event) => {
    // NuxtLink sam blokuje domyślną akcję – zwykłe <a href="#…"> przewija przeglądarka
    if (!event.defaultPrevented || event.button !== 0) return

    const link = (event.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null
    if (!link || !link.hash || link.pathname !== location.pathname || link.hash !== location.hash) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.querySelector(decodeURIComponent(link.hash))?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  })
})
