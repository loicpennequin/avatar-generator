<script setup lang="ts"></script>

<template>
  <nav class="bottom-navigation">
    <ul>
      <li>
        <button>
          <Icon name="material-symbols:home-sharp" />
          <span>Home</span>
        </button>
      </li>

      <li>
        <button>
          <Icon name="ph:currency-circle-dollar-bold" />
          <span>Add credits</span>
        </button>
      </li>
      <li>
        <button>
          <Icon name="material-symbols:rocket-launch-outline-rounded" />
          <span>Generate</span>
        </button>
      </li>
      <li>
        <button>
          <Icon name="icomoon-free:images" />
          <span>Collection</span>
        </button>
      </li>
      <li>
        <button>
          <Icon name="ph:users-three-fill" />
          <span>Community</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="postcss">
@import '~/styles/medias.css';
.bottom-navigation {
  position: sticky;
  bottom: 0;
  background-color: var(--surface-1);
  padding: 0 var(--size-2) var(--size-2);

  @media (--md-n-above) {
    display: none;
  }

  & > ul {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
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
