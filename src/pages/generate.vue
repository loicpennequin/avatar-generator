<script setup lang="ts">
import { toFormValidator } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { GenerateImageDto, generateImageDto } from '../server/dtos/image';

definePageMeta({ middleware: 'auth' });

const { t } = useI18n();
const { getSession } = useSession();

const { handleSubmit } = useForm<GenerateImageDto>({
  validationSchema: toFormValidator(generateImageDto)
});

const client = useTrpc();

const url = ref<string>();

const {
  mutate: generate,
  isLoading,
  error
} = useMutation(['generateImage'], client.image.generate.mutate, {
  onSuccess(data) {
    getSession();
    url.value = data.url;
  }
});

const onSubmit = handleSubmit((values) => {
  generate(values);
});

const submitErrorMessage = useSubmitError(error);

const colors = [
  {
    value: 'red',
    color: '0 60% 56%',
    text: '#fff'
  },
  {
    value: 'blue',
    color: '230 70% 50%',
    text: '#fff'
  },
  {
    value: 'green',
    color: '123 66% 58%',
    text: '#000'
  },
  {
    value: 'yellow',
    color: '59 82% 52%',
    text: '#000'
  },
  {
    value: 'orange',
    color: '30 80% 55%',
    text: '#000'
  },
  {
    value: 'pink',
    color: '310 80% 65%',
    text: '#000'
  },
  {
    value: 'purple',
    color: '271 70% 46%',
    text: '#fff'
  },
  {
    value: 'teal',
    color: '183 70% 50%',
    text: '#000'
  },
  {
    value: 'black',
    color: '0 0% 0%',
    text: '#fff'
  },
  {
    value: 'white',
    color: '0 0% 100%',
    text: '#000'
  }
];

const artStyles = ['anime', 'comics', 'realistic', 'cartoon'];
</script>

<template>
  <UiCenter>
    <UiSurface as="section">
      <form as="form" @submit.prevent="onSubmit">
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
          <div class="colors-grid">
            <UiInputRadio
              v-for="color in colors"
              v-bind="slotProps"
              :id="`generate-color-${color.value}`"
              :key="color.value"
              :value="color.value"
              :style="{ '--color': color.color, '--text-color': color.text }"
            >
              {{ t(`colors.${color.value}`) }}
            </UiInputRadio>
          </div>
        </UiFormControl>

        <UiFormControl
          id="generate-style"
          v-slot="slotProps"
          name="style"
          :label="t('labels.style')"
          is-group
        >
          <UiInputRadio
            v-for="style in artStyles"
            v-bind="slotProps"
            :id="`${slotProps.id}-${style}`"
            :key="style"
            :value="style"
          >
            {{ t(`artStyles.${style}`) }}
          </UiInputRadio>
        </UiFormControl>

        <UiButton :is-loading="isLoading">
          Generate ( 1
          <Icon name="fa6-solid:gem" />
          )
        </UiButton>
        <UiFormError v-if="error" :error="submitErrorMessage" />
      </form>
      <img v-if="url" :src="url" alt="your generated image" />
      <div v-else class="no-image">
        <Icon name="ph:image-square-fill" />
        {{ t('empty') }}
      </div>
    </UiSurface>
  </UiCenter>
</template>

<style scoped lang="postcss">
section {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--size-4);
}
form {
  display: flex;
  flex-direction: column;
  max-width: var(--size-sm);
  width: 100%;
  gap: var(--size-3);
}

img {
  display: block;
  max-width: var(--size-sm);
  height: auto;
}

.no-image {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: var(--size-4);

  & > .icon {
    font-size: var(--font-size-8);
  }
}
.colors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--size-9), 1fr));
  gap: var(--size-3);

  & > label {
    background-color: hsl(var(--color));
    color: var(--text-color);
    aspect-ratio: 1;
    border-radius: var(--radius-3);
    border: solid 1px var(--border-dimmed);
    transform: scale(0.9);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--font-weight-5);
    transition: outline-offset 145ms var(--ease-2), transform 0.2s var(--ease-2);

    &:has(input:focus-visible) {
      outline-color: var(--brand, var(--link));
      outline-style: solid;
      outline-offset: 5px;
    }

    &:has(input:checked) {
      transform: scale(1.1);
      box-shadow: 0 0 1.5rem 0.25rem hsl(var(--color) / 0.5);
    }

    & > :deep(input) {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    }
  }
}
</style>

<i18n lang="json">
{
  "en": {
    "title": "Generate your Avatar",
    "empty": "Once generated, your image will appear here.",
    "labels": {
      "prompt": "Describe your avatar",
      "color": "Choose a dominant color",
      "style": "Choose an art style"
    },
    "submit": "Generate Image",
    "colors": {
      "blue": "Blue",
      "red": "Red",
      "green": "Green",
      "yellow": "Yellow",
      "orange": "Orange",
      "pink": "Pink",
      "purple": "Purple",
      "teal": "Teal",
      "black": "Black",
      "white": "White"
    },
    "artStyles": {
      "anime": "Anime",
      "comics": "Comic book",
      "realistic": "Realistic",
      "cartoon": "Cartoon"
    },
    "errors": {
      "400": "Invalid prompt. You may be using words that are disallowed by the safety system."
    }
  },
  "fr": {
    "title": "Génerer votre avatar",
    "empty": "Une fois générées, votre image apparaitra ici.",
    "labels": {
      "prompt": "Décrivez votre avatar",
      "color": "Choisissez une couleur principale",
      "style": "Choose un style artistique"
    },
    "submit": "Génerer l'image",
    "colors": {
      "blue": "Bleu",
      "red": "Rouge",
      "green": "Vert",
      "yellow": "Jaune",
      "orange": "Orange",
      "pink": "Rose",
      "purple": "Violet",
      "teal": "Turquoise",
      "black": "Noir",
      "white": "Blanc"
    },
    "artStyles": {
      "anime": "Anime",
      "comics": "Comic book",
      "realistic": "Realiste",
      "cartoon": "Dessin animé"
    },
    "errors": {
      "400": "Prompt invalide. Il est possible que vous utilisiez des mots non autorisés par le système de sécurité."
    }
  }
}
</i18n>
