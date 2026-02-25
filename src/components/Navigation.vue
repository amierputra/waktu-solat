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
    label: 'Home',
    href: '/',
    trigger: false,
  },
  {
    id: 2,
    label: 'Dashboard',
    href: '/dashboard',
    trigger: false,
  },
  {
    id: 3,
    label: 'Settings',
    href: '/settings',
    trigger: false,
  },
]
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <template v-for="item in items" :key="item.id">
        <NavigationMenuItem v-if="item.trigger">
          <NavigationMenuTrigger>{{ item.label }}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink :href="item.href">Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem v-else>
          <NavigationMenuLink :href="item.href">{{ item.label }}</NavigationMenuLink>
        </NavigationMenuItem>
      </template>
    </NavigationMenuList>
  </NavigationMenu>
</template>
