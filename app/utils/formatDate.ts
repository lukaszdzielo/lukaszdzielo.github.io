// Data w języku strony: z dniem, gdy jest w treści („14 października 2026” / „October 14, 2026”),
// bez dnia przy samym miesiącu („styczeń 2024”). Daty w treści: RRRR-MM lub RRRR-MM-DD.
// locale: kod języka z useI18n() ('en' | 'pl').
export const formatDate = (dateStr: string, locale: string = 'en'): string => {
  if (!dateStr) return '';
  const [year, monthStr, dayStr] = dateStr.split('-');
  if (!year || !monthStr) return dateStr;
  const month = parseInt(monthStr, 10);
  if (!Number.isInteger(month) || month < 1 || month > 12) return dateStr;
  const day = dayStr ? parseInt(dayStr, 10) : NaN;
  const hasDay = Number.isInteger(day) && day >= 1 && day <= 31;
  const date = new Date(Date.UTC(parseInt(year, 10), month - 1, hasDay ? day : 1));
  return new Intl.DateTimeFormat(locale === 'pl' ? 'pl-PL' : 'en-US', {
    ...(hasDay ? { day: 'numeric' } : {}),
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
};
