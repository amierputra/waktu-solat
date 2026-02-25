<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next'
import { Card, CardContent } from '@/components/ui/card'

defineProps<{
  name: string
  time: string
  icon: any
  isActive?: boolean
}>()
</script>

<template>
  <Card
    class="glass-card flex flex-col items-center justify-center p-0 overflow-hidden"
    :class="{ 'ring-2 ring-primary bg-primary/20 scale-105 shadow-lg': isActive }"
  >
    <CardContent class="flex flex-col items-center justify-center gap-3 p-6 text-center">
      <component
        :is="icon"
        class="h-6 w-6"
        :class="isActive ? 'text-primary' : 'text-muted-foreground'"
      />
      <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{{
        name
      }}</span>
      <span class="text-xl font-bold">{{ time }}</span>
    </CardContent>
  </Card>
</template>
