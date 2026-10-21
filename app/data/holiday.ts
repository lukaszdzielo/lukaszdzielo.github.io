// Przerwa świąteczna: w tych dniach (włącznie) w miejscach z „72 godzinami” strona pisze o przerwie –
// formularz kontaktowy, komunikat po wysłaniu, strona dla firm (przy formularzu i w kroku „Wiadomość”).
// Dzień liczony przy budowaniu strony, jak promocje (usePricingDay) – tekst przełącza się sam przy nocnym buildzie i sam wraca.
// Na kolejny rok wystarczy zmienić daty. Podgląd w `npm run dev`: ?day=2026-12-23
export const holidayBreak = { from: '2026-12-22', to: '2027-01-02' } as const
