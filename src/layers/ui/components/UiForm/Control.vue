<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps<{
  name: string;
  id: string;
  label?: string;
  isGroup?: boolean;
}>();
const { value, errorMessage, meta } = useField(toRef(props, 'name'));

const slotProps = computed(() => ({
  id: props.id,
  name: props.name,
  modelValue: value.value as any,
  'onUpdate:modelValue'(val: any) {
    value.value = val;
  },
  isError: !!errorMessage.value && meta.touched
}));
</script>

<template>
  <fieldset class="ui-form-control">
    <slot name="label">
      <UiFormLabel v-if="props.label" :for="props.id" :is-group="props.isGroup">
        {{ props.label }}
      </UiFormLabel>
    </slot>
    <slot v-bind="slotProps" />
    <UiFormError v-if="errorMessage && meta.touched" :error="errorMessage" />
  </fieldset>
</template>

<style scoped lang="postcss">
.ui-form-control {
  border: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
  & > legend {
    float: left;
  }
}
</style>
