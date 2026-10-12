// Cennik strony dla firm – ceny netto w zł. Zmieniasz liczby tutaj, strona aktualizuje się sama.
//
// Promocja: gdy `active: true` i dzień `until` jeszcze trwa, karty pokazują przekreśloną cenę
// regularną, cenę promocyjną i etykietę z datą. Sprawdzamy to przy budowaniu strony (na serwerze
// GitHuba), a nie na urządzeniu odwiedzającego – zmiana daty w telefonie nic nie da.
// GitHub Actions buduje stronę codziennie rano (.github/workflows/nuxtjs.yml, `schedule`),
// więc dzień po `until` promocja znika sama.
export const promo = {
  active: false,
  label: 'Promocja',
  until: '2026-11-30', // ostatni dzień promocji (włącznie)
}

export type PriceId = 'card' | 'company' | 'care' | 'careHours' | 'hour'

export const prices: Record<PriceId, { regular: number; promo?: number; period?: string }> = {
  card: { regular: 2000, promo: 1700 }, // wizytówka
  company: { regular: 4000, promo: 3400 }, // strona firmowa
  care: { regular: 120, promo: 99, period: 'mies.' }, // opieka – pakiet podstawowy
  careHours: { regular: 290, promo: 249, period: 'mies.' }, // opieka – pakiet z 2 h zmian
  hour: { regular: 100, promo: 90 }, // dodatkowa godzina
}

// Czy promocja trwa – liczone w strefie czasowej Polski (koniec dnia `until`)
export function promoIsOn(now = new Date()) {
  if (!promo.active) return false
  const end = new Date(`${promo.until}T23:59:59+01:00`)
  return now.getTime() <= end.getTime()
}

// Spacja co trzy cyfry także w kwotach czterocyfrowych („2 000 zł”), twarda spacja (\u00a0), żeby kwota się nie łamała
const zl = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0')}\u00a0zł`

// Cena do wyświetlenia: { now: '1 700 zł', before: '2 000 zł' } albo { now: '2 000 zł' }
export function price(id: PriceId, on = promoIsOn()) {
  const p = prices[id]
  return on && p.promo ? { now: zl(p.promo), before: zl(p.regular) } : { now: zl(p.regular) }
}

export const promoUntilLabel = () =>
  new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'numeric' }).format(new Date(promo.until))
