// Cennik strony dla firm – ceny netto w zł. Zmieniasz liczby tutaj, strona aktualizuje się sama.
//
// Promocja: gdy `active: true` i dzień `until` jeszcze trwa, karty pokazują przekreśloną cenę
// regularną, cenę promocyjną i etykietę z datą. Sprawdzamy to przy budowaniu strony (na serwerze
// GitHuba), a nie na urządzeniu odwiedzającego – zmiana daty w telefonie nic nie da.
// GitHub Actions buduje stronę codziennie rano (.github/workflows/nuxtjs.yml, `schedule`),
// więc dzień po `until` promocja znika sama.
export const promo = {
  active: false,
  label: { en: 'Sale', pl: 'Promocja' }, // etykieta w każdym języku
  until: '2026-11-30', // ostatni dzień promocji (włącznie)
}

export type PriceId = 'card' | 'company' | 'care' | 'careHours' | 'hour'
export type Lang = 'en' | 'pl'

export const prices: Record<PriceId, { regular: number; promo?: number; period?: Record<Lang, string> }> = {
  card: { regular: 2000, promo: 1700 }, // wizytówka
  company: { regular: 4000, promo: 3400 }, // strona firmowa
  care: { regular: 120, promo: 99, period: { en: 'mo.', pl: 'mies.' } }, // opieka – pakiet podstawowy
  careHours: { regular: 290, promo: 249, period: { en: 'mo.', pl: 'mies.' } }, // opieka – pakiet z 2 h zmian
  hour: { regular: 100, promo: 90 }, // dodatkowa godzina
}

// Czy promocja trwa – liczone w strefie czasowej Polski (koniec dnia `until`)
export function promoIsOn(now = new Date()) {
  if (!promo.active) return false
  const end = new Date(`${promo.until}T23:59:59+01:00`)
  return now.getTime() <= end.getTime()
}

// Kwota w języku strony, twarda spacja (\u00a0), żeby kwota się nie łamała.
// PL: spacja co trzy cyfry także w kwotach czterocyfrowych („2 000 zł”) – Intl dla pl-PL by jej nie dał.
// EN: przecinek co trzy cyfry i waluta po kwocie („2,000 PLN”).
const money = (n: number, lang: Lang) =>
  lang === 'pl'
    ? `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0')}\u00a0zł`
    : `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}\u00a0PLN`

// Cena do wyświetlenia: { now: '1 700 zł', before: '2 000 zł' } albo { now: '2 000 zł' } (EN: '1,700 PLN')
export function price(id: PriceId, lang: Lang, on = promoIsOn()) {
  const p = prices[id]
  return on && p.promo ? { now: money(p.promo, lang), before: money(p.regular, lang) } : { now: money(p.regular, lang) }
}

// Ostatni dzień promocji: PL „30.11”, EN „Nov 30”. Data bez godziny to północ UTC – formatujemy w UTC,
// żeby w strefach na zachód od Greenwich nie wyszedł dzień wcześniej.
export const promoUntilLabel = (lang: Lang) =>
  new Intl.DateTimeFormat(
    lang === 'pl' ? 'pl-PL' : 'en-US',
    lang === 'pl' ? { day: 'numeric', month: 'numeric', timeZone: 'UTC' } : { day: 'numeric', month: 'short', timeZone: 'UTC' },
  ).format(new Date(promo.until))
