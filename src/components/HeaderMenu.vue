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
        <template v-if="!session?.user">
          <li>
            <UiButton
              :to="localePath({ name: 'signup' })"
              class="cta"
              @click="isOpened = false"
            >
              {{ t('signup') }}
            </UiButton>
          </li>
          <li>
            <UiButton
              variant="outlined"
              :to="localePath({ name: 'signin' })"
              class="cta"
              @click="isOpened = false"
            >
              {{ t('signin') }}
            </UiButton>
          </li>
        </template>

        <li v-if="session?.user">
          <button @click="onSignout">{{ t('signoff') }}</button>
        </li>

        <li class="dark-mode">
          {{ t('theme') }}

          <DarkModeToggle is-switch />
        </li>
      </ul>
    </nav>
  </UiDrawer>
</template>

<style scoped lang="postcss">
ul {
  display: flex;
  flex-direction: column;
  gap: var(--size-4);
}

.dark-mode {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cta {
  width: 12rem;
  margin-inline: auto;
}
</style>

<i18n lang="json">
{
  "en": {
    "title": "Menu",
    "signup": "Get Started",
    "signin": "Sign in",
    "signoff": "Sign off",
    "theme": "Theme"
  },
  "fr": {
    "title": "Menu",
    "signup": "Inscription",
    "signin": "Connexion",
    "signoff": "Déconnexion",
    "theme": "Thème"
  }
}
</i18n>
