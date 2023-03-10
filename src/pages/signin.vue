<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { z } from 'zod';
import { Translation } from 'vue-i18n';

definePageMeta({
  middleware: ['public-only']
});

const { t } = useI18n();
const localePath = useLocalePath();
const { signIn } = useSession();

const FormSchema = z.object({
  email: z.string(),
  password: z.string()
});

type FormSchema = z.infer<typeof FormSchema>;

const { handleSubmit } = useForm<FormSchema>({
  validationSchema: toFormValidator(FormSchema)
});

const onSubmit = handleSubmit((values) => {
  signIn('credentials', {
    ...values,
    callbackUrl: localePath('/')
  });
});

const route = useRoute();
const submitErrorMessage = computed(() => route.query.error as string);
</script>

<template>
  <UiCenter>
    <UiSurface as="form" @submit.prevent="onSubmit">
      <div v-if="submitErrorMessage" role="alert" class="submit-error">
        {{ t(`submitErrors.${submitErrorMessage}`) }}
      </div>

      <h2>{{ t('title') }}</h2>
      <UiFormControl
        id="signin-email"
        v-slot="slotProps"
        name="email"
        :label="t('labels.email')"
      >
        <UiInputText v-bind="slotProps" left-icon="mdi-email-outline" />
      </UiFormControl>

      <UiFormControl
        id="signin-password"
        v-slot="slotProps"
        name="password"
        :label="t('labels.password')"
      >
        <UiInputPassword v-bind="slotProps" left-icon="mdi:lock-outline" />
        <NuxtLink :to="localePath('/')">
          {{ t('forgotPasswordLink') }}
        </NuxtLink>
      </UiFormControl>

      <UiButton type="submit" is-pill>
        {{ t('buttons.submit') }}
      </UiButton>

      <span class="separator" aria-hidden="true">- {{ t('or') }} -</span>

      <UiButton
        type="button"
        variant="outlined"
        left-icon="logos:google-icon"
        is-pill
        @click="signIn('google')"
      >
        {{ t('buttons.google') }}
      </UiButton>
      <UiButton
        type="button"
        variant="outlined"
        left-icon="ri:github-fill"
        is-pill
        @click="signIn('github')"
      >
        {{ t('buttons.github') }}
      </UiButton>
      <UiButton
        type="button"
        variant="outlined"
        left-icon="carbon:logo-discord"
        is-pill
        @click="signIn('discord')"
      >
        {{ t('buttons.discord') }}
      </UiButton>

      <Translation keypath="noAccount.text" tag="p">
        <template #link>
          <UiLink :to="localePath('/signup')">
            {{ t('noAccount.link') }}
          </UiLink>
        </template>
      </Translation>
    </UiSurface>
  </UiCenter>
</template>

<style scoped lang="postcss">
form {
  display: flex;
  flex-direction: column;
  max-width: var(--size-sm);
  width: 100%;
  gap: var(--size-3);
}
.submit-error {
  background-color: var(--error);
  color: white;
  padding: var(--size-3);
  border-radius: var(--radius-2);
}

.separator {
  text-transform: uppercase;
}

p,
.separator {
  text-align: center;
}
</style>

<i18n lang="json">
{
  "en": {
    "title": "Sign in",
    "labels": {
      "email": "Email",
      "password": "Password"
    },
    "forgotPasswordLink": "I forgot my password",
    "or": "or",
    "buttons": {
      "submit": "Sign in",
      "github": "Sign in with Github",
      "google": "Sign in with Google",
      "discord": "Sign in with Discord"
    },
    "submitErrors": {
      "CredentialsSignin": "Your e-mail and password do not match. Please try again.",
      "OAuthSignin": "We were unable to lsign you in at the time. Please try again later.",
      "OAuthAccountNotLinked": "To confirm your identity, please sign in with the same account you used originally"
    },
    "noAccount": {
      "link": "Create one",
      "text": "No account ? {link}"
    }
  },
  "fr": {
    "title": "Connexion",
    "labels": {
      "email": "Adresse e-mail",
      "password": "Mot de passe"
    },
    "forgotPasswordLink": "J'ai oublié mon mot de passe",
    "or": "ou",
    "buttons": {
      "submit": "Continuer",
      "github": "Continuer avec Github",
      "google": "Continuer avec Google",
      "discord": "Continuer avec Discord"
    },
    "submitErrors": {
      "CredentialsSignin": "Your e-mail and password do not match. Please try again.",
      "OAuthSignin": "We were unable to lsign you in at the time. Please try again later.",
      "OAuthAccountNotLinked": "To confirm your identity, please sign in with the same account you used originally"
    },
    "noAccount": {
      "link": "Créer un compte",
      "text": "Pas encore inscrit ? {link}"
    }
  }
}
</i18n>
