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

  function setActionDisabled(actionId: string, disabled: boolean) {
    const actionStart = actionsStart.value.findIndex(a => a.id === actionId);
    if (actionStart !== -1 && actionsStart.value[actionStart]) {
      actionsStart.value[actionStart].disabled = disabled;
      return;
    }

    const actionEnd = actionsEnd.value.findIndex(a => a.id === actionId);
    if (actionEnd !== -1 && actionsEnd.value[actionEnd]) {
      actionsEnd.value[actionEnd].disabled = disabled;
    }
  }

  function resetActions() {
    actionsStart.value = [];
    actionsEnd.value = [];
  }

  return { pageTitle, actionsStart, actionsEnd, setupActions, setActionDisabled, resetActions };
});
