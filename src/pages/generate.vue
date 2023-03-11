<script setup lang="ts">
import { toFormValidator } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { GenerateImageDto, generateImageDto } from '../server/dtos/image';

definePageMeta({ middleware: 'auth' });

const { t } = useI18n();
const { handleSubmit } = useForm<GenerateImageDto>({
  validationSchema: toFormValidator(generateImageDto)
});

const client = useTrpc();
const {
  mutate: generate,
  isLoading,
  error
} = useMutation(['generateImage'], client.image.generate.mutate, {
  onSuccess(data) {
    console.log(data);
  }
});
const onSubmit = handleSubmit((values) => {
  generate(values);
});

const submitErrorMessage = useSubmitError(error);
</script>

<template>
  <UiContainer size="md">
    <UiSurface as="form" @submit.prevent="onSubmit">
      <h2>{{ t('title') }}</h2>
      <UiFormControl
        id="generate-prompt"
        v-slot="slotProps"
        name="prompt"
        :label="t('labels.prompt')"
      >
        <UiInputText v-bind="slotProps" />
      </UiFormControl>

      <UiFormControl
        id="generate-color"
        v-slot="slotProps"
        name="color"
        :label="t('labels.color')"
        is-group
      >
        <UiInputRadio v-bind="slotProps" id="generate-color-red" value="red">
          Red
        </UiInputRadio>
        <UiInputRadio v-bind="slotProps" id="generate-color-blue" value="blue">
          Blue
        </UiInputRadio>
        <UiInputRadio
          v-bind="slotProps"
          id="generate-color-yellow"
          value="yellow"
        >
          Yellow
        </UiInputRadio>
      </UiFormControl>

      <UiFormControl
        id="generate-style"
        v-slot="slotProps"
        name="style"
        :label="t('labels.style')"
        is-group
      >
        <UiInputRadio v-bind="slotProps" id="generate-style-red" value="anime">
          Anime
        </UiInputRadio>
        <UiInputRadio
          v-bind="slotProps"
          id="generate-style-blue"
          value="comics"
        >
          Comics
        </UiInputRadio>
        <UiInputRadio
          v-bind="slotProps"
          id="generate-color-yellow"
          value="realistic"
        >
          Realistic
        </UiInputRadio>
      </UiFormControl>

      <UiButton :is-loading="isLoading">Generate</UiButton>
      <UiFormError v-if="error" :error="submitErrorMessage" />
    </UiSurface>
  </UiContainer>
</template>

<style scoped lang="postcss">
form {
  display: flex;
  flex-direction: column;
  max-width: var(--size-sm);
  width: 100%;
  gap: var(--size-3);
}
</style>

<i18n lang="json">
{
  "en": {
    "title": "Generate",
    "labels": {
      "prompt": "Describe your avatar",
      "color": "Choose a dominant color",
      "style": "Choose an art style"
    },
    "submit": "Generate Image"
  },
  "fr": {
    "title": "Génerer",
    "labels": {
      "prompt": "Décrivez votre avatar",
      "color": "Choisissez une couleur principale",
      "style": "Choose un style artistique"
    },
    "submit": "Génerer l'image"
  }
}
</i18n>
