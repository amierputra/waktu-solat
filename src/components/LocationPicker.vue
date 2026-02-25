<script setup lang="ts">
import { useZonesStore } from '@/stores/zones'
import { MapPin } from 'lucide-vue-next'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const zonesStore = useZonesStore()
</script>

<template>
  <div class="relative w-full max-w-md">
    <Select v-model="zonesStore.selectedCode">
      <SelectTrigger
        class="w-full bg-white/5 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl py-6 pl-12 h-auto text-lg focus:ring-2 focus:ring-primary appearance-none cursor-pointer backdrop-blur-md transition-all hover:bg-white/10 dark:hover:bg-black/30"
      >
        <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <MapPin class="h-5 w-5 text-primary" />
        </div>
        <SelectValue placeholder="Pilih lokasi..." />
      </SelectTrigger>
      <SelectContent class="bg-background/95 backdrop-blur-md max-h-[400px]">
        <SelectGroup
          v-for="negeri in [...new Set(zonesStore.zones.map((z) => z.negeri))]"
          :key="negeri"
        >
          <SelectLabel
            class="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
          >
            {{ negeri }}
          </SelectLabel>
          <SelectItem
            v-for="zone in zonesStore.zones.filter((z) => z.negeri === negeri)"
            :key="zone.jakimCode"
            :value="zone.jakimCode"
          >
            {{ zone.daerah }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
