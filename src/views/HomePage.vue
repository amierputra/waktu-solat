<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useZonesStore } from '../stores/zones'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { usePrayerTimeStore } from '@/stores/prayerTime'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { usePrayerTimeFormat } from '@/composables/usePrayerTimeFormat'

const { formatHijriDate, formatMasihiDate, formatUnixTime } = usePrayerTimeFormat()

const today = new Date()

const isToday = (day: string): boolean => {
  const pt = prayerTimeStore.prayerTime
  if (!pt) return false
  return (
    pt.year === today.getFullYear() &&
    pt.month_number === today.getMonth() + 1 &&
    Number(day) === today.getDate()
  )
}

const zonesStore = useZonesStore()
const prayerTimeStore = usePrayerTimeStore()

onMounted(async () => {
  await zonesStore.fetchAllZones()
})

watch(
  () => zonesStore.selectedCode,
  async (code) => {
    await prayerTimeStore.fetchPrayerTime(code)
  },
  { immediate: true },
)
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-4 w-2/3">
    <h1>Waktu Solat</h1>
    <NativeSelect v-model="zonesStore.selectedCode" class="w-96">
      <NativeSelectOption
        v-for="zone in zonesStore.zones"
        :key="zone.jakimCode"
        :value="zone.jakimCode"
      >
        {{ zone.negeri }} - {{ zone.daerah }}
      </NativeSelectOption>
    </NativeSelect>
    <div class="w-full">
      <Table>
        <TableCaption>Prayer times</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead>Hijri</TableHead>
            <TableHead>Subuh</TableHead>
            <TableHead>Syuruk</TableHead>
            <TableHead>Zohor</TableHead>
            <TableHead>Asar</TableHead>
            <TableHead>Maghrib</TableHead>
            <TableHead>Isyak</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <!-- Loading -->
          <template v-if="prayerTimeStore.isLoading">
            <TableRow v-for="n in 10" :key="n">
              <TableCell v-for="col in 8" :key="col">
                <Skeleton class="h-4 w-full" />
              </TableCell>
            </TableRow>
          </template>
          <!-- Data -->
          <template v-else-if="prayerTimeStore.prayerTime">
            <TableRow
              v-for="prayer in prayerTimeStore.prayerTime.prayers"
              :key="prayer.day"
              :class="isToday(prayer.day) ? 'bg-primary/10 font-semibold' : ''"
            >
              <TableCell>{{
                formatMasihiDate(
                  prayerTimeStore.prayerTime!.year,
                  prayerTimeStore.prayerTime!.month_number,
                  Number(prayer.day),
                )
              }}</TableCell>
              <TableCell>{{ formatHijriDate(prayer.hijri) }}</TableCell>
              <TableCell>{{ formatUnixTime(prayer.fajr) }}</TableCell>
              <TableCell>{{ formatUnixTime(prayer.syuruk) }}</TableCell>
              <TableCell>{{ formatUnixTime(prayer.dhuhr) }}</TableCell>
              <TableCell>{{ formatUnixTime(prayer.asr) }}</TableCell>
              <TableCell>{{ formatUnixTime(prayer.maghrib) }}</TableCell>
              <TableCell>{{ formatUnixTime(prayer.isha) }}</TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
