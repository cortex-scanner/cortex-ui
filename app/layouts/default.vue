<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const menuItems = ref<NavigationMenuItem[][]>([
  [
    {
      label: "Dashboard",
      icon: "i-lucide-home",
      to: "/"
    }
  ],
  [
    {
      label: "Scans",
      icon: "i-lucide-scan-search",
      to: "/scans"
    }
  ]
]);
</script>

<template>
    <div class="flex flex-col flex-1">
      <AppHeader />
      <div class="flex">
        <UNavigationMenu orientation="vertical" :items="menuItems" />
        <div class="p-1 w-full">
          <slot />
        </div>
      </div>
      <AppFooter />
  </div>
</template>
