import { holidayBreak } from '~/data/holiday'

// Czy w dniu budowania strony trwa przerwa świąteczna (app/data/holiday.ts) i daty do tekstów w języku strony:
// PL – from „22.12”, to „2.01”, back „2 stycznia”; EN – „22 Dec”, „2 Jan”, „2 January”.
export const useHolidayBreak = () => {
  const day = usePricingDay()
  const { lang } = useContentLocale()

  const active = computed(() => day.value >= holidayBreak.from && day.value <= holidayBreak.to)

  const dates = computed(() => {
    const pl = lang.value === 'pl'
    const format = (iso: string, options: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(pl ? 'pl-PL' : 'en-GB', { ...options, timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`))
    const short: Intl.DateTimeFormatOptions = pl ? { day: 'numeric', month: '2-digit' } : { day: 'numeric', month: 'short' }
    return {
      from: format(holidayBreak.from, short),
      to: format(holidayBreak.to, short),
      back: format(holidayBreak.to, { day: 'numeric', month: 'long' }),
    }
  })

  return { active, dates }
}
