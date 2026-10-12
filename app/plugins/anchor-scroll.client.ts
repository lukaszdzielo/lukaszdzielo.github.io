// Ponowne kliknięcie w link do tej samej kotwicy (np. „Projekty”, gdy adres to już /#projects)
// nie zmienia trasy, więc router nie przewija strony. Tu przewijamy ręcznie.
// Płynność bierze się z `scroll-behavior: smooth` na <html> (main.css), więc „ogranicz ruch” jest respektowane.
export default defineNuxtPlugin(() => {
  document.addEventListener('click', (event) => {
    // NuxtLink sam blokuje domyślną akcję – zwykłe <a href="#…"> przewija przeglądarka
    if (!event.defaultPrevented || event.button !== 0) return

    const link = (event.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null
    if (!link || !link.hash || link.pathname !== location.pathname || link.hash !== location.hash) return

    document.querySelector(decodeURIComponent(link.hash))?.scrollIntoView()
  })
})
