<script setup lang="ts">

export interface PageAction {
  id?: string;
  label: string;
  icon: string;
  color?: "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
  disabled?: boolean;
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
      <UButton v-for="action in actionsStart" :key="action.id || action.label" :icon="action.icon" :color="action.color || 'neutral'" :disabled="action.disabled" variant="ghost" class="py-2" @click="action.action">
        {{ action.label }}
      </UButton>
    </div>
    <div v-if="actionsEnd" class="flex gap-2">
      <UButton v-for="action in actionsEnd" :key="action.id || action.label" :icon="action.icon" :color="action.color || 'neutral'" :disabled="action.disabled" variant="ghost" class="py-2" @click="action.action">
        {{ action.label }}
      </UButton>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
