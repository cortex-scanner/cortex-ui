export default defineNuxtRouteMiddleware(() => {
  const pageHeaderStore = usePageHeaderStore();
  pageHeaderStore.pageTitle = "";
  pageHeaderStore.resetActions();
});
