// Cennik strony dla firm – ceny netto. Zasady i przegląd co kwartał: archiwum zasady/cennik.md.
//
// Co ustawiasz:
// 1. Zmiana cen – NOWY wpis na końcu `regular` (starych nie zmieniasz ani nie usuwasz – to log cen).
// 2. Promocja – NOWY wpis na końcu `promos`: rodzaj z `presets`, pierwszy i ostatni dzień.
//    Można zaplanować z wyprzedzeniem – włączy się i wyłączy sama. Starych wpisów nie usuwasz.
// Reszta liczy się sama przy budowaniu strony (GitHub Actions buduje ją codziennie o 2:30 UTC):
// cena promocyjna, etykieta z datą i najniższa cena z 30 dni przed obniżką (przepisy o promocjach).
// Daty liczone w strefie czasowej Polski. Sprawdzamy je przy budowaniu na GitHubie, a nie na urządzeniu
// odwiedzającego – zmiana daty w telefonie nic nie da.

export type PriceId = 'card' | 'company' | 'care' | 'careHours' | 'hour'
export type Lang = 'en' | 'pl'
export type Currency = 'pln' | 'eur' | 'gbp'
type Table = Record<PriceId, number>

// Rodzaje promocji: nazwa w każdym języku i rabat w %
export const presets = {
  standard: { label: { pl: 'Promocja', en: 'Sale' }, discount: 15 },
  blackweb: { label: { pl: 'Black WEB', en: 'Black WEB' }, discount: 20 },
  christmascode: { label: { pl: 'Christmas CODE', en: 'Christmas CODE' }, discount: 15 },
} as const
export type PresetId = keyof typeof presets

// Log cen regularnych. EUR i GBP – stałe kwoty (nie kurs na żywo), przegląd co kwartał.
// GBP celowo wyżej niż przeliczenie z PLN (rynek brytyjski) – opis w zasady/cennik.md.
export const regular: { from: string; pln: Table; eur?: Table; gbp?: Table }[] = [
  { from: '2026-10-12', pln: { card: 2000, company: 4000, care: 120, careHours: 290, hour: 100 } },
  {
    from: '2026-10-17',
    pln: { card: 2500, company: 5000, care: 150, careHours: 350, hour: 120 },
    eur: { card: 590, company: 1190, care: 35, careHours: 85, hour: 29 },
    gbp: { card: 690, company: 1390, care: 39, careHours: 95, hour: 35 },
  },
]

// Log promocji (od najstarszej). Przykład:
// { preset: 'blackweb', from: '2026-11-23', until: '2026-11-30' }
export const promos: { preset: PresetId; from: string; until: string }[] = [
  // Bez Christmas CODE zaraz po Black WEB: obniżkę liczy się od najniższej ceny z 30 dni, a ta byłaby
  // ceną z Black WEB – cena świąteczna nie byłaby już obniżką
  { preset: 'blackweb', from: '2026-11-23', until: '2026-11-30' },
]

// Okres rozliczenia przy cenach miesięcznych
export const period: Partial<Record<PriceId, Record<Lang, string>>> = {
  care: { en: 'mo.', pl: 'mies.' },
  careHours: { en: 'mo.', pl: 'mies.' },
}

// ——— obliczenia ———

// Dzisiejsza data w Polsce: '2026-10-17'
export const today = (now = new Date()) =>
  new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Warsaw' }).format(now)

const addDays = (day: string, n: number) => {
  const d = new Date(`${day}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

// Ceny regularne obowiązujące danego dnia
const regularOn = (day: string) => [...regular].reverse().find((r) => r.from <= day) ?? regular[0]!

// Promocja trwająca danego dnia
const promoOn = (day: string) => [...promos].reverse().find((p) => p.from <= day && day <= p.until)

// Cena promocyjna: rabat od ceny regularnej z pierwszego dnia promocji, zaokrąglona w dół
// (powyżej 1000 do pełnych 50, powyżej 100 do pełnych 10, niżej do pełnych jednostek)
const step = (n: number) => (n >= 1000 ? 50 : n >= 100 ? 10 : 1)
const discounted = (base: number, discount: number) => {
  const raw = base * (1 - discount / 100)
  return Math.floor(raw / step(raw)) * step(raw)
}
const promoPrice = (p: (typeof promos)[number], id: PriceId, cur: Currency) => {
  const base = regularOn(p.from)[cur]?.[id]
  return base === undefined ? undefined : discounted(base, presets[p.preset].discount)
}

// Najniższa cena obowiązująca danego dnia (regularna albo promocyjna)
const lowestOn = (day: string, id: PriceId, cur: Currency) => {
  const reg = regularOn(day)[cur]?.[id]
  const p = promoOn(day)
  const pro = p ? promoPrice(p, id, cur) : undefined
  const all = [reg, pro].filter((n): n is number => n !== undefined)
  return all.length ? Math.min(...all) : undefined
}

// Najniższa cena z 30 dni przed rozpoczęciem promocji (bez dnia startu)
const lowest30 = (p: (typeof promos)[number], id: PriceId, cur: Currency) => {
  const all: number[] = []
  for (let i = 1; i <= 30; i++) {
    const n = lowestOn(addDays(p.from, -i), id, cur)
    if (n !== undefined) all.push(n)
  }
  return all.length ? Math.min(...all) : regularOn(p.from)[cur]?.[id]
}

// ——— wyświetlanie ———

// PL: „2 500 zł” (spacja co trzy cyfry także w kwotach czterocyfrowych), EN: „€590 · £690”.
// Twarda spacja ( ), żeby kwota się nie łamała.
const group = (n: number, sep: string) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep)
const money = (values: Partial<Record<Currency, number>>, lang: Lang) =>
  lang === 'pl'
    ? `${group(values.pln!, ' ')} zł`
    : [values.eur !== undefined ? `€${group(values.eur, ',')}` : '', values.gbp !== undefined ? `£${group(values.gbp, ',')}` : '']
        .filter(Boolean)
        .join(' · ') || `${group(values.pln!, ',')} PLN`

const currencies = (lang: Lang): Currency[] => (lang === 'pl' ? ['pln'] : ['eur', 'gbp'])
const pick = (lang: Lang, f: (cur: Currency) => number | undefined) =>
  Object.fromEntries([...currencies(lang), 'pln' as Currency].map((c) => [c, f(c)])) as Partial<Record<Currency, number>>

// Aktywna promocja w dniu budowania strony (albo undefined)
export const activePromo = (day = today()) => promoOn(day)

// Cena do wyświetlenia:
// bez promocji { now: '2 500 zł' }, w promocji { now: '2 100 zł', before: '2 500 zł', lowest: '2 500 zł' }
export function price(id: PriceId, lang: Lang, day = today()) {
  const p = promoOn(day)
  const reg = regularOn(day)
  const now = money(pick(lang, (c) => reg[c]?.[id]), lang)
  if (!p) return { now }
  return {
    now: money(pick(lang, (c) => promoPrice(p, id, c)), lang),
    before: now,
    lowest: money(pick(lang, (c) => lowest30(p, id, c)), lang),
  }
}

// Kwota do danych strukturalnych (JSON-LD): najniższa cena w głównej walucie języka
export function priceValue(id: PriceId, lang: Lang, day = today()) {
  const cur: Currency = lang === 'pl' ? 'pln' : 'eur'
  const p = promoOn(day)
  const value = (p ? promoPrice(p, id, cur) : undefined) ?? regularOn(day)[cur]?.[id] ?? regularOn(day).pln[id]
  return { value, currency: regularOn(day)[cur] ? cur.toUpperCase() : 'PLN' }
}

// Etykieta promocji: PL „Black WEB do 30.11”, EN „Black WEB until Nov 30”. Data bez godziny to północ UTC –
// formatujemy w UTC, żeby w strefach na zachód od Greenwich nie wyszedł dzień wcześniej.
export function promoLabel(lang: Lang, day = today()) {
  const p = promoOn(day)
  if (!p) return undefined
  const date = new Intl.DateTimeFormat(
    lang === 'pl' ? 'pl-PL' : 'en-US',
    lang === 'pl' ? { day: 'numeric', month: 'numeric', timeZone: 'UTC' } : { day: 'numeric', month: 'short', timeZone: 'UTC' },
  ).format(new Date(p.until))
  return { label: presets[p.preset].label[lang], date }
}
