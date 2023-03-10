<script setup lang="ts">
useI18n();

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

    <aside class="app-bar">
      <button>
        <Icon name="material-symbols:home-sharp" />
        <span>Home</span>
      </button>
      <button>
        <Icon name="ph:currency-circle-dollar-bold" />
        <span>Add credits</span>
      </button>
      <button>
        <Icon name="material-symbols:rocket-launch-outline-rounded" />
        <span>Generate</span>
      </button>
      <button>
        <Icon name="icomoon-free:images" />
        <span>Collection</span>
      </button>
      <button>
        <Icon name="ph:users-three-fill" />
        <span>Community</span>
      </button>
    </aside>
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

    & a {
      text-decoration: none;
    }
  }
}

.app-bar {
  position: sticky;
  bottom: 0;
  background-color: var(--surface-1);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  padding: var(--size-2);

  @media (--md-n-above) {
    display: none;
  }

  & button {
    background-color: transparent;
    color: inherit;
    font-size: var(--font-size-4);

    & > span {
      font-size: var(--font-size-0);
      display: block;
      text-align: center;
    }
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
