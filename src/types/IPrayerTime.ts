export interface PrayerTime {
  zone: string
  year: number
  month: string
  month_number: number
  last_updated: string | null
  prayers: Array<{
    day: string
    hijri: string
    fajr: number
    syuruk: number
    dhuhr: number
    asr: number
    maghrib: number
    isha: number
  }>
}
