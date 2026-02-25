<script setup lang="ts">
import ModeToggle from '@/components/ModeToggle.vue'
import Navigation from '@/components/Navigation.vue'
</script>

<template>
  <div>
    <nav class="flex justify-between items-center p-4 border-b-2 border-secondary">
      <Navigation />
      <ModeToggle />
    </nav>
  </div>
  <main class="p-4">
    <router-view />
  </main>
</template>
