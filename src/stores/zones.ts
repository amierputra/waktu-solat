import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import api from '../lib/axios'
import type { Zone } from '../types/Izones'

export const useZonesStore = defineStore('zones', () => {
  const isLoading = ref(false)
  const error = ref(null)
  const zones = ref<Zone[]>([])
  const selectedCode = ref('WLY01')

  const zone = computed(() => zones.value.find((z) => z.jakimCode === selectedCode.value) ?? null)

  const fetchAllZones = async () => {
    isLoading.value = true
    try {
      const response = await api.get('/zones')
      zones.value = response.data
    } catch (error: any) {
      error.value = error
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    fetchAllZones,
    zones,
    zone,
    selectedCode,
  }
})
