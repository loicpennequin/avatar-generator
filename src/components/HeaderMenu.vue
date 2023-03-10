<script setup lang="ts">
const { isMobile } = useDevice();
const isSmallScreen = useMediaQuery('(max-width: 40rem)');

const isOpened = ref(false);
watchEffect(() => {
  if (!isSmallScreen.value && !isMobile) isOpened.value = false;
});

const { data: session, signOut } = await useSession();
const { t } = useI18n();

const localePath = useLocalePath();

const onSignout = () => {
  signOut();
  isOpened.value = false;
};
</script>

<template>
  <UiIconButton
    :title="t('title')"
    icon="uil:bars"
    v-bind="$attrs"
    @click="isOpened = !isOpened"
  />

  <UiDrawer v-model:is-opened="isOpened" :title="t('title')">
    <nav>
      <ul>
        <template v-if="session?.user">
          <li>
            <button>{{ t('buy') }}</button>
          </li>
          <li>
            {{ t('theme') }}
            <DarkModeToggle is-switch />
          </li>

          <li>
            {{ t('language') }}
            <LocaleSwitcher show-label />
          </li>
          <li>
            <button @click="onSignout">{{ t('signoff') }}</button>
          </li>
        </template>

        <template v-else>
          <li>
            <NuxtLink
              :to="localePath({ name: 'signup' })"
              @click="isOpened = false"
            >
              {{ t('signup') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              variant="outlined"
              :to="localePath({ name: 'signin' })"
              @click="isOpened = false"
            >
              {{ t('signin') }}
            </NuxtLink>
          </li>
          <li>
            {{ t('theme') }}
            <DarkModeToggle is-switch />
          </li>

          <li>
            {{ t('language') }}
            <LocaleSwitcher show-label />
          </li>
        </template>
      </ul>
    </nav>
  </UiDrawer>
</template>

<style scoped lang="postcss">
ul {
  display: flex;
  flex-direction: column;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px var(--border-dimmed);
  padding-block: var(--size-2);
}

a,
button {
  background-color: transparent;
  color: inherit;
  padding: var(--size-2) 0;
  margin: 0;
  text-decoration: none;
}
</style>

<i18n lang="json">
{
  "en": {
    "title": "Menu",
    "signup": "Sign up",
    "signin": "Sign in",
    "signoff": "Sign off",
    "theme": "Theme",
    "language": "Language",
    "buy": "Add credits"
  },
  "fr": {
    "title": "Menu",
    "signup": "Inscription",
    "signin": "Connexion",
    "signoff": "Déconnexion",
    "theme": "Thème",
    "language": "Langue",
    "buy": "Ajouter des  credits"
  }
}
</i18n>
