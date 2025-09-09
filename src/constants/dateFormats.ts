// date format DD-MM-YYYY

export function isoToDisplay(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`; // or `${day}/${month}/${year}`
}
export function convertToISO(dateStr: string): string {
  const [day, month, year] = dateStr.split("-");
  return `${year}-${month}-${day}`; // or `${year}/${month}/${day}`
}
export function toLocalISO(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`; // YYYY-MM-DD in local time
}

export const today = toLocalISO(new Date());
