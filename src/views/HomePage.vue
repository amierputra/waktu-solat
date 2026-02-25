<script setup lang="ts">
import { onMounted, watch, computed, ref } from 'vue'
import { useZonesStore } from '../stores/zones'
import { usePrayerTimeStore } from '@/stores/prayerTime'
import { Skeleton } from '@/components/ui/skeleton'
import { usePrayerTimeFormat } from '@/composables/usePrayerTimeFormat'
import LocationPicker from '@/components/LocationPicker.vue'
import PrayerCard from '@/components/PrayerCard.vue'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Sunrise,
  Sun,
  Sunset,
  Moon,
  CloudSun,
  Clock,
  Calendar as CalendarIcon,
} from 'lucide-vue-next'

const { formatHijriDate, formatMasihiDate, formatUnixTime } = usePrayerTimeFormat()

const zonesStore = useZonesStore()
const prayerTimeStore = usePrayerTimeStore()

const now = ref(new Date())
setInterval(() => {
  now.value = new Date()
}, 1000)

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

const todayPrayer = computed(() => {
  if (!prayerTimeStore.prayerTime) return null
  return prayerTimeStore.prayerTime.prayers.find((p) => {
    const d = new Date()
    return Number(p.day) === d.getDate()
  })
})

const PRAYER_NAMES = ['Subuh', 'Syuruk', 'Zohor', 'Asar', 'Maghrib', 'Isyak']
const PRAYER_KEYS = ['fajr', 'syuruk', 'dhuhr', 'asr', 'maghrib', 'isha']
const PRAYER_ICONS = [Sunrise, CloudSun, Sun, Sun, Sunset, Moon]

const nextPrayer = computed(() => {
  if (!todayPrayer.value) return null

  const currentTime = now.value.getTime() / 1000

  for (let i = 0; i < PRAYER_KEYS.length; i++) {
    const time = todayPrayer.value[PRAYER_KEYS[i] as keyof typeof todayPrayer.value]
    if (typeof time === 'number' && time > currentTime) {
      return {
        name: PRAYER_NAMES[i],
        time: formatUnixTime(time),
        rawTime: time,
        icon: PRAYER_ICONS[i],
      }
    }
  }

  // If all prayers today passed, return the first one of tomorrow or just indicate next day
  return null
})

const timeToNext = computed(() => {
  if (!nextPrayer.value) return ''
  const diff = nextPrayer.value.rawTime - now.value.getTime() / 1000
  const hours = Math.floor(diff / 3600)
  const minutes = Math.floor((diff % 3600) / 60)
  const seconds = Math.floor(diff % 60)

  return `${hours}j ${minutes}m ${seconds}s`
})
</script>

<template>
  <div class="w-full max-w-5xl flex flex-col gap-12 py-8 animate-in fade-in duration-700">
    <!-- Header Section -->
    <header class="flex flex-col md:flex-row justify-between items-end gap-6">
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <Badge
            variant="outline"
            class="text-primary border-primary/30 bg-primary/10 dark:bg-primary/5 uppercase tracking-widest px-3 py-1 font-bold shadow-sm"
          >
            <CalendarIcon class="h-3 w-3 mr-2" />
            {{ todayPrayer ? formatHijriDate(todayPrayer.hijri) : 'Loading...' }}
          </Badge>
        </div>
        <h1 class="text-5xl md:text-6xl font-black tracking-tighter drop-shadow-sm">Waktu Solat</h1>
        <p
          class="text-muted-foreground dark:text-muted-foreground/80 text-lg md:text-xl italic font-medium"
        >
          {{
            todayPrayer
              ? formatMasihiDate(
                  prayerTimeStore.prayerTime!.year,
                  prayerTimeStore.prayerTime!.month_number,
                  Number(todayPrayer.day),
                )
              : ''
          }}
        </p>
      </div>
      <LocationPicker />
    </header>

    <!-- Hero Next Prayer -->
    <Card
      v-if="nextPrayer"
      class="glass-card border-none shadow-xl dark:shadow-none bg-primary/15 dark:bg-primary/10 relative overflow-hidden group rounded-2xl"
    >
      <div
        class="absolute -right-12 -bottom-12 opacity-5 dark:opacity-5 transition-transform group-hover:scale-110 duration-700 pointer-events-none"
      >
        <component :is="nextPrayer.icon" class="w-72 h-72" />
      </div>

      <CardContent
        class="relative z-10 p-8 md:p-14 flex flex-col md:flex-row justify-between items-center gap-8"
      >
        <div class="flex flex-col gap-1 text-center md:text-left">
          <span
            class="text-primary dark:text-primary font-bold uppercase tracking-[0.3em] text-xs md:text-sm"
            >Seterusnya</span
          >
          <h2 class="text-6xl md:text-7xl font-black text-foreground drop-shadow-md">
            {{ nextPrayer.name }}
          </h2>
          <div class="flex items-center gap-3 text-2xl md:text-3xl font-bold mt-4">
            <div class="p-2 bg-primary/20 rounded-xl">
              <Clock class="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
            <span>{{ nextPrayer.time }}</span>
          </div>
        </div>

        <div
          class="flex flex-col items-center md:items-end gap-2 bg-white/40 dark:bg-black/20 p-6 md:p-8 rounded-3xl backdrop-blur-md border border-white/50 dark:border-white/10 shadow-lg"
        >
          <span
            class="text-muted-foreground dark:text-muted-foreground font-bold uppercase text-[10px] md:text-xs tracking-widest"
            >Akan datang dalam</span
          >
          <div class="text-4xl md:text-5xl font-mono font-black tracking-tighter text-primary">
            {{ timeToNext }}
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Daily Grid -->
    <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <template v-if="prayerTimeStore.isLoading">
        <Skeleton v-for="n in 6" :key="n" class="h-32 w-full rounded-2xl" />
      </template>
      <template v-else-if="todayPrayer">
        <PrayerCard
          v-for="(name, index) in PRAYER_NAMES"
          :key="name"
          :name="name"
          :time="
            formatUnixTime(Number(todayPrayer[PRAYER_KEYS[index] as keyof typeof todayPrayer]))
          "
          :icon="PRAYER_ICONS[index]"
          :isActive="nextPrayer?.name === name"
        />
      </template>
    </section>

    <!-- Monthly Table (Optional or collapsed by default in a real app, here we keep it styled) -->
    <section class="mt-8">
      <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
        <div class="p-2 glass rounded-lg">
          <CalendarIcon class="h-5 w-5 text-primary" />
        </div>
        Jadual Bulanan
      </h3>
      <Card class="glass rounded-3xl overflow-hidden border border-white/10 shadow-none">
        <div class="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow class="bg-white/5 border-white/10 hover:bg-white/5">
                <TableHead class="p-4 font-bold text-xs uppercase tracking-wider">Hari</TableHead>
                <TableHead class="p-4 font-bold text-xs uppercase tracking-wider">Hijrah</TableHead>
                <TableHead
                  v-for="name in PRAYER_NAMES"
                  :key="name"
                  class="p-4 font-bold text-xs uppercase tracking-wider"
                >
                  {{ name }}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="prayer in prayerTimeStore.prayerTime?.prayers"
                :key="prayer.day"
                class="border-white/5 hover:bg-white/5 transition-colors"
                :class="{ 'bg-primary/10 font-bold': Number(prayer.day) === now.getDate() }"
              >
                <TableCell class="p-4 whitespace-nowrap text-sm">
                  {{
                    formatMasihiDate(
                      prayerTimeStore.prayerTime!.year,
                      prayerTimeStore.prayerTime!.month_number,
                      Number(prayer.day),
                    )
                  }}
                </TableCell>
                <TableCell class="p-4 whitespace-nowrap text-sm text-muted-foreground">{{
                  formatHijriDate(prayer.hijri)
                }}</TableCell>
                <TableCell class="p-4 text-sm">{{ formatUnixTime(prayer.fajr) }}</TableCell>
                <TableCell class="p-4 text-sm">{{ formatUnixTime(prayer.syuruk) }}</TableCell>
                <TableCell class="p-4 text-sm">{{ formatUnixTime(prayer.dhuhr) }}</TableCell>
                <TableCell class="p-4 text-sm">{{ formatUnixTime(prayer.asr) }}</TableCell>
                <TableCell class="p-4 text-sm">{{ formatUnixTime(prayer.maghrib) }}</TableCell>
                <TableCell class="p-4 text-sm">{{ formatUnixTime(prayer.isha) }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    </section>
  </div>
</template>
