<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const menuItems = ref<NavigationMenuItem[][]>([
  [
    {
      label: "Dashboard",
      icon: "i-lucide-home",
      to: "/"
    }
  ]
]);
</script>

<template>
    <div class="flex flex-col flex-1">
      <AppHeader />
      <div class="flex">
        <UNavigationMenu orientation="vertical" :items="menuItems" />
        <div class="p-1">
          <slot />
        </div>
      </div>
      <AppFooter />
  </div>
</template>
