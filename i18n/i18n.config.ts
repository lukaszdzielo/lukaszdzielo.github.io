// Ustawienia vue-i18n. Teksty interfejsu są w komponentach (blok <i18n> + useI18n({ useScope: 'local' }))
// albo w plikach z danymi (app/data/*.ts, obiekty { en, pl } + useLocalized()).
// Liczba mnoga po polsku: t('key', n) z trzema formami „projekt | projekty | projektów”.
export default defineI18nConfig(() => ({
  fallbackLocale: 'en',
  pluralRules: {
    pl: (choice: number) => {
      if (choice === 1) return 0
      const ten = choice % 10, hundred = choice % 100
      return ten >= 2 && ten <= 4 && (hundred < 12 || hundred > 14) ? 1 : 2
    },
  },
}))
