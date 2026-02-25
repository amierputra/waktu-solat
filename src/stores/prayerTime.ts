import api from '@/lib/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PrayerTime } from '@/types/IPrayerTime'

export const usePrayerTimeStore = defineStore('prayerTime', () => {
  const prayerTime = ref<PrayerTime>()
  const isLoading = ref(false)

  const fetchPrayerTime = async (jakimCode: string) => {
    isLoading.value = true
    try {
      const response = await api.get(`/v2/solat/${jakimCode}`)
      prayerTime.value = response.data
    } finally {
      isLoading.value = false
    }
  }

  return {
    prayerTime,
    isLoading,
    fetchPrayerTime,
  }
})
