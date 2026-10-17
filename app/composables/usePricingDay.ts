import { today } from '~/data/pricing'

// Dzień, według którego liczymy ceny i promocje – ustalony przy budowaniu strony i zapisany w payloadzie.
// Przeglądarka używa tej samej wartości, więc po północy (przed porannym buildem) nic się nie przełącza.
export const usePricingDay = () => useState('pricing-day', () => today())
