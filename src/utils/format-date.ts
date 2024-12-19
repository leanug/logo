export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return `Posted on ${date.toLocaleDateString('en-GB', options)}`;
}
