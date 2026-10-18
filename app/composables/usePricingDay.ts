import { today } from '~/data/pricing'

// Dzień, według którego liczymy ceny i promocje – ustalony przy budowaniu strony i zapisany w payloadzie.
// Przeglądarka używa tej samej wartości, więc po północy (przed porannym buildem) nic się nie przełącza.
// Tylko w `npm run dev`: podgląd cen z innego dnia przez ?day=RRRR-MM-DD,
// np. /pl/strony-dla-firm?day=2026-11-24 pokaże promocję zaplanowaną na ten dzień. Na produkcji parametr nic nie robi.
export const usePricingDay = () => {
  const route = useRoute()
  return useState('pricing-day', () => {
    const day = import.meta.dev ? String(route.query.day ?? '') : ''
    return /^\d{4}-\d{2}-\d{2}$/.test(day) ? day : today()
  })
}
