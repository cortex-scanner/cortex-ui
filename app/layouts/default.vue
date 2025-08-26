<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const pageHeaderStore = usePageHeaderStore();

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
        <div class="p-2 w-full space-y-2">
          <PageHeader :title="pageHeaderStore.pageTitle" :actions-start="pageHeaderStore.actionsStart" :actions-end="pageHeaderStore.actionsEnd" />
          <slot />
        </div>
      </div>
      <AppFooter />
  </div>
</template>
