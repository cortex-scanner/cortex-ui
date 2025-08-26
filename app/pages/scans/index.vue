<script setup lang="ts">

import { Icons } from "~/utils/icons";

const pageHeaderStore = usePageHeaderStore();
pageHeaderStore.pageTitle = "Scans";

pageHeaderStore.setupActions({
  start: [
    {
      id: "create",
      label: "Create",
      icon: Icons.ADD,
      action: () => {
        console.log("New Scan");
      }
    }
  ]
});

</script>

<template>
<div>Scans</div>
</template>

<style scoped>

</style>
