<script setup lang="ts">
import { type TypedNuxtLinkProps } from '~~/.nuxt/typed-router/typed-router';
import { NuxtLink } from '#components';

const props = defineProps<{
  to?: TypedNuxtLinkProps['to'];
}>();

const is = computed(() => (props.to ? NuxtLink : 'button'));
</script>
<template>
  <component :is="is" :to="props.to" prefetch class="ui-link">
    <slot />
  </component>
</template>

<style scoped>
.ui-link {
  text-decoration: underline;
}
</style>
