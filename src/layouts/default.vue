<script setup lang="ts">
useI18n();

const localePath = useLocalePath();
</script>

<template>
  <div class="layout">
    <header>
      <UiContainer size="xl" class="header-inner">
        <h1><NuxtLink :to="localePath('/')">Create V3 App UI</NuxtLink></h1>

        <HeaderNav />
      </UiContainer>
    </header>

    <slot />

    <i18n-t keypath="footer" tag="footer">
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
  </div>
</template>

<style lang="postcss" scoped>
@import '~/styles/medias.css';
.layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;

  & header {
    background-color: var(--surface-1);
    box-shadow: var(--shadow-2);
    position: sticky;
    top: 0;
    z-index: 1;
  }

  & footer {
    text-align: center;
  }
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--size-2) var(--size-5);

  & h1 {
    font-size: var(--size-5);
  }
}
</style>

<i18n lang="json">
{
  "en": {
    "footer": "Made with 💀 by {link}"
  },
  "fr": {
    "footer": "Fait avec 💀 par {link}"
  }
}
</i18n>
