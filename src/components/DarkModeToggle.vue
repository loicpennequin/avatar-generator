<script setup lang="ts">
const props = defineProps<{ isSwitch?: boolean }>();

const colorMode = useColorMode();
const colorModeIcon = computed(() =>
  colorMode.preference === 'dark' ? 'ph:sun-fill' : 'ph:moon-fill'
);
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

const isDark = useDarkMode();

const vModel = computed({
  get() {
    return isDark.value;
  },
  set() {
    toggleColorMode();
  }
});

const { t } = useI18n();
</script>

<template>
  <UiInputSwitch v-if="props.isSwitch" id="dark-mode-switch" v-model="vModel">
    <template #on><Icon name="ph:moon-fill" class="icon" /></template>
    <template #off><Icon name="ph:sun-fill" class="icon" /></template>
  </UiInputSwitch>
  <UiIconButton
    v-else
    :title="t('label')"
    :icon="colorModeIcon"
    @click="toggleColorMode"
  />
</template>

<style scoped lang="postcss">
.icon {
  font-size: var(--font-size-3);
}
</style>

<i18n lang="json">
{
  "en": {
    "label": "Toggle dark mode"
  },
  "fr": {
    "label": "Activer le thème sombre"
  }
}
</i18n>
