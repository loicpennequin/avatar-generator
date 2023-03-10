<script setup lang="ts">
import { type TypedNuxtLinkProps } from '~~/.nuxt/typed-router/typed-router';
import { NuxtLink } from '#components';

const props = defineProps<{
  to?: TypedNuxtLinkProps['to'];
}>();

const attrs = useAttrs();
const tag = computed(() => {
  if (props.to) return NuxtLink;
  if (attrs.href) return 'a';

  return 'button';
});
</script>
<template>
  <component :is="tag" :to="props.to" prefetch class="ui-link">
    <slot />
  </component>
</template>

<style scoped>
.ui-link {
  text-decoration: underline;
}
</style>
