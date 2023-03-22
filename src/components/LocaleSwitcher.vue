<script setup lang="ts">
const props = defineProps<{ showLabel?: boolean }>();

const switchLocalePath = useSwitchLocalePath();
const { t, locale, locales } = useI18n();
const availableLocales = computed(
  () => locales.value as { code: string; icon: string; label: string }[]
);

const currentLocaleLabel = computed(
  () => availableLocales.value.find((l) => l.code === locale.value)?.label
);
const isLocaleDropdownOpened = ref(false);
</script>

<template>
  <UiDropdown
    v-model:is-opened="isLocaleDropdownOpened"
    placement="bottom-start"
  >
    <template #toggle="{ ref, props: toggleProps }">
      <UiButton
        v-if="props.showLabel"
        :ref="ref"
        v-bind="toggleProps"
        variant="ghost"
        :title="t('selectLanguage')"
        right-icon="ph:globe"
      >
        {{ currentLocaleLabel }}
      </UiButton>
      <UiIconButton
        v-else
        :ref="ref"
        v-bind="toggleProps"
        :title="t('selectLanguage')"
        icon="ph:globe"
      />
    </template>

    <template #menu>
      <UiDropdownItem
        v-for="lang in availableLocales"
        :key="lang.code"
        :to="switchLocalePath(lang.code)"
        :icon="lang.icon"
        class="dropdown-item"
      >
        {{ lang.label }}
      </UiDropdownItem>
    </template>
  </UiDropdown>
</template>

<style scoped lang="postcss">
.dropdown-item {
  text-transform: capitalize;
}
</style>

<i18n lang="json">
{
  "en": {
    "selectLanguage": "Select Language"
  },
  "fr": {
    "selectLanguage": "Choisir la langue"
  }
}
</i18n>
