<script setup lang="ts">
import ModeToggle from '@/components/ModeToggle.vue'
import Navigation from '@/components/Navigation.vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <div>
    <nav class="flex justify-between items-center p-4 border-b-2 border-secondary">
      <Navigation />
      <ModeToggle />
    </nav>
  </div>
  <main class="p-4 flex justify-center w-full">
    <router-view />
  </main>
  <footer class="flex justify-center p-4">
    <p>© {{ currentYear }} Waktu Solat. All rights reserved.</p>
  </footer>
</template>
