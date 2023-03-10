<script setup lang="ts"></script>

<template>
  <UiCenter>
    <UiSurface>
      <section class="hero">
        <h2>Dumbass title</h2>
        <p>Dumbass tagline</p>

        <UiButton>Get Started</UiButton>
      </section>
    </UiSurface>
  </UiCenter>
</template>

<style scoped lang="postcss">
.hero {
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
  text-align: center;
  & button {
    align-self: center;
  }
}
</style>
