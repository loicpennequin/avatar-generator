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
      <template v-if="!data?.user">
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
      </template>

      <li>
        <DarkModeToggle />
      </li>
      <li>
        <LocaleSwitcher />
      </li>
      <li v-if="data?.user">
        <UserDropdown />
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="postcss">
@import '~/styles/medias.css';

ul {
  display: flex;
  align-items: center;
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
    "signin": "Sign in"
  },
  "fr": {
    "signup": "Inscription",
    "signin": "Connexion"
  }
}
</i18n>
