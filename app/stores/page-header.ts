import type { PageAction } from "~/components/page-header.vue";

export const usePageHeaderStore = defineStore("page-header", () => {
  const pageTitle = ref("");

  const actionsStart: Ref<PageAction[]> = ref([]);
  const actionsEnd: Ref<PageAction[]> = ref([]);

  function setupActions(actions: {
    start?: PageAction[];
    end?: PageAction[];
  }) {
    actionsStart.value = actions.start || [];
    actionsEnd.value = actions.end || [];
  }

  function resetActions() {
    actionsStart.value = [];
    actionsEnd.value = [];
  }

  return { pageTitle, actionsStart, actionsEnd, setupActions, resetActions };
});
