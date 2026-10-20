// Kotwice sekcji w języku strony: anchor('contact') → 'contact', a po polsku 'kontakt'.
// Nazwy w kodzie są angielskie, polskie odpowiedniki – PL_ANCHORS w app/utils/localeRoutes.ts.
export function useAnchor() {
  // globalny język aplikacji (useI18n() w komponencie z blokiem <i18n> zwróciłby zakres lokalny)
  const locale = useNuxtApp().$i18n.locale
  return (id: string) => (locale.value === 'pl' ? toPlAnchor(id) : id)
}
