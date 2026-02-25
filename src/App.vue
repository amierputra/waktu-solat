<script setup lang="ts">
import ModeToggle from '@/components/ModeToggle.vue'
import Navigation from '@/components/Navigation.vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="min-h-screen flex flex-col relative overflow-hidden">
    <!-- Decorative background elements -->
    <div
      class="absolute -top-48 -left-48 w-[600px] h-[600px] bg-primary/30 dark:bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse transition-colors duration-700"
    ></div>
    <div
      class="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-accent/30 dark:bg-accent/15 rounded-full blur-[100px] -z-10 transition-colors duration-700"
    ></div>
    <div
      class="absolute bottom-0 -left-24 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl -z-10"
    ></div>

    <nav
      class="flex justify-between items-center px-6 py-4 glass border-b border-white/10 sticky top-0 z-50"
    >
      <div class="flex items-center gap-4">
        <Navigation />
      </div>
      <ModeToggle />
    </nav>

    <main class="grow p-4 md:p-8 flex justify-center w-full z-10">
      <router-view />
    </main>

    <footer class="flex justify-center p-6 glass border-t border-white/10 z-10">
      <p class="text-sm text-muted-foreground">
        © {{ currentYear }} Waktu Solat. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<style>
/* Custom transitions for page changes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
