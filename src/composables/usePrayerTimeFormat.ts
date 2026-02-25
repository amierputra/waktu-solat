import moment from 'moment'

export const formatUnixTime = (timestamp: number, format: string = 'hh:mm A'): string => {
  return moment.unix(timestamp).format(format)
}

export const formatDate = (timestamp: number, format: string = 'dddd, D MMM YYYY'): string => {
  return moment.unix(timestamp).format(format)
}

const HIJRI_MONTHS = [
  'Muharram',
  'Safar',
  'Rabiʿul Awwal',
  'Rabiʿul Akhir',
  'Jamadilawal',
  'Jamadilakhir',
  'Rejab',
  'Syaaban',
  'Ramadan',
  'Syawal',
  'Zulkaedah',
  'Zulhijjah',
]

// Accepts hijri string in "YYYY-MM-DD" format e.g. "1446-12-04"
export const formatHijriDate = (hijri: string): string => {
  const [year = 0, month = 0, day = 0] = hijri.split('-').map(Number)
  const monthName = HIJRI_MONTHS[month - 1] ?? ''
  return `${day} ${monthName} ${year}`
}

// Accepts Gregorian year, month (1-based), and day as numbers
export const formatMasihiDate = (
  year: number,
  month: number,
  day: number,
  format: string = 'D MMM YYYY',
): string => {
  return moment({ year, month: month - 1, day }).format(format)
}

export function usePrayerTimeFormat() {
  return { formatUnixTime, formatDate, formatHijriDate, formatMasihiDate }
}
