<script setup lang="ts">
const { t } = useI18n();

const localePath = useLocalePath();
</script>

<template>
  <div class="layout">
    <header>
      <UiContainer size="xl" class="header-inner">
        <h1><NuxtLink :to="localePath('/')">Avatar Generator</NuxtLink></h1>

        <HeaderNav />
      </UiContainer>
    </header>

    <slot />

    <footer>
      <UiContainer size="xl">
        <i18n-t keypath="footer" tag="span">
          <template #link>
            <a
              href="https://github.com/loicpennequin"
              target="_blank"
              rel="noopener noreferrer"
            >
              Daria aka "CEO of Based"
            </a>
          </template>
        </i18n-t>
        <UiLink :to="localePath({ name: 'terms-of-service' })">
          {{ t('tos') }}
        </UiLink>
      </UiContainer>
    </footer>

    <BottomNavigation />
  </div>
</template>

<style lang="postcss" scoped>
@import '~/styles/medias.css';
.layout {
  display: grid;
  grid-template-rows: auto 1fr auto auto;
  min-height: 100vh;

  & header {
    background-color: var(--surface-1);
    box-shadow: var(--shadow-2);
    position: sticky;
    top: 0;
    z-index: 1;
    padding-block: var(--size-2);
  }

  & footer > div {
    display: flex;
    justify-content: space-between;
    padding: var(--size-5);
  }
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--size-2) var(--size-5);

  & h1 {
    font-size: var(--size-5);

    & a {
      text-decoration: none;
    }
  }
}
</style>

<i18n lang="json">
{
  "en": {
    "footer": "© Copyright {link}",
    "tos": "Terms and Conditions"
  },
  "fr": {
    "footer": "© Copyright {link}",
    "tos": "conditions d'utilisation"
  }
}
</i18n>
