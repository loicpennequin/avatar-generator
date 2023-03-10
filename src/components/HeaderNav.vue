<script setup lang="ts">
const { data } = await useSession();

const localePath = useLocalePath();
const { t } = useI18n();
</script>

<template>
  <div class="mobile-nav">
    <HeaderMenu />
  </div>

  <nav class="desktop-nav">
    <ul>
      <template v-if="data?.user">
        <li>
          <UiButton>{{ t('buy') }}</UiButton>
        </li>
        <li>
          <UserDropdown />
        </li>
        <li>
          <LocaleSwitcher />
        </li>
      </template>
      <template v-else>
        <li>
          <UiButton :to="localePath({ name: 'signup' })">
            {{ t('signup') }}
          </UiButton>
        </li>
        <li>
          <UiButton variant="ghost" :to="localePath({ name: 'signin' })">
            {{ t('signin') }}
          </UiButton>
        </li>
        <li>
          <DarkModeToggle />
        </li>
        <li>
          <LocaleSwitcher />
        </li>
      </template>
    </ul>
  </nav>
</template>

<style scoped lang="postcss">
@import '~/styles/medias.css';

ul,
li {
  display: flex;
  align-items: center;
}

ul {
  gap: var(--size-2);
}
.desktop-nav {
  @media (--md-n-below) {
    display: none;
  }
}
.mobile-nav {
  @media (--md-n-above) {
    display: none;
  }
}
</style>
<i18n lang="json">
{
  "en": {
    "signup": "Get Started",
    "signin": "Sign in",
    "buy": "Add credits"
  },
  "fr": {
    "signup": "Inscription",
    "signin": "Connexion",
    "buy": "Ajouter des crédits"
  }
}
</i18n>
