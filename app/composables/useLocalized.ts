// Dane w dwóch językach ({ en, pl } w app/data/*.ts) → wersja dla aktualnego języka (computed).
export function useLocalized<T>(data: { en: T; pl: T }) {
  // globalny język aplikacji (useI18n() w komponencie z blokiem <i18n> zwróciłby zakres lokalny)
  const locale = useNuxtApp().$i18n.locale
  return computed<T>(() => (locale.value === 'pl' ? data.pl : data.en))
}
