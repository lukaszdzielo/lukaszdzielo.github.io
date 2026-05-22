export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const [year, monthStr] = dateStr.split('-');
  if (!year || !monthStr) return dateStr;
  const month = parseInt(monthStr, 10);
  if (!Number.isInteger(month) || month < 1 || month > 12) return dateStr;
  const date = new Date(Date.UTC(parseInt(year, 10), month - 1, 1));
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
};
