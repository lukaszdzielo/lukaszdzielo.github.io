// Miesiąc i rok w języku strony, np. „styczeń 2024” / „January 2024” (daty w treści: RRRR-MM lub RRRR-MM-DD).
// locale: kod języka z useI18n() ('en' | 'pl').
export const formatDate = (dateStr: string, locale: string = 'en'): string => {
  if (!dateStr) return '';
  const [year, monthStr] = dateStr.split('-');
  if (!year || !monthStr) return dateStr;
  const month = parseInt(monthStr, 10);
  if (!Number.isInteger(month) || month < 1 || month > 12) return dateStr;
  const date = new Date(Date.UTC(parseInt(year, 10), month - 1, 1));
  return new Intl.DateTimeFormat(locale === 'pl' ? 'pl-PL' : 'en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
};
