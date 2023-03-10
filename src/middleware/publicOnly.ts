export default defineNuxtRouteMiddleware(async () => {
  const session = await useSession();

  if (session.data.value?.user) return navigateTo('/');
});
