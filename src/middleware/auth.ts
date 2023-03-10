import { defineNuxtRouteMiddleware } from '#app';

export default defineNuxtRouteMiddleware(() => {
  const { status } = useSession();
  if (status.value === 'authenticated') {
    return;
  }

  return navigateTo('/signin');
});
