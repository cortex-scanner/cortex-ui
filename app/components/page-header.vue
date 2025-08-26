<script setup lang="ts">

export interface PageAction {
  label: string;
  icon: string;
  color?: "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
  action: () => void | Promise<void>;
}

interface Props {
  title: string;
  actionsStart?: PageAction[];
  actionsEnd?: PageAction[];
}

const { title, actionsStart = [], actionsEnd = [] } = defineProps<Props>();

</script>

<template>
<div class="flex  flex-col">
  <span class="text-2xl mb-3">{{ title }}</span>
  <div class="flex items-center justify-between">
    <div v-if="actionsStart" class="flex gap-1">
      <UButton v-for="action in actionsStart" :key="action.label" :icon="action.icon" :color="action.color || 'neutral'" variant="ghost" class="py-2" @click="action.action">
        {{ action.label }}
      </UButton>
    </div>
    <div v-if="actionsEnd" class="flex gap-2">
      <UButton v-for="action in actionsEnd" :key="action.label" :icon="action.icon" :color="action.color || 'neutral'" variant="ghost" class="py-2" @click="action.action">
        {{ action.label }}
      </UButton>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
