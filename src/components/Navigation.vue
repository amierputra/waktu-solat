<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'

const items = [
  {
    id: 1,
    label: 'Utama',
    href: '/',
    trigger: false,
  },
]
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <template v-for="item in items" :key="item.id">
        <NavigationMenuItem v-if="item.trigger">
          <NavigationMenuTrigger>
            <span class="text-xl">{{ item.label }}</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink :href="item.href">{{ item.label }}</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem v-else>
          <NavigationMenuLink :href="item.href">
            <span class="text-xl">{{ item.label }}</span>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </template>
    </NavigationMenuList>
  </NavigationMenu>
</template>
